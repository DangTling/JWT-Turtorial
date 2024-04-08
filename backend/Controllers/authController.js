const bcrypt = require("bcrypt");
const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const refreshToken = require("../Models/RefreshToken");
const RefreshToken = require("../Models/RefreshToken");

const authController = {
  registerUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);

      const newUser = await new User({
        userName: req.body.userName,
        password: hashed,
        email: req.body.email,
      });

      const user = await newUser.save();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  generateAccessToken: (user) => {
    const accessToken = jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.SECRET_KEY,
      { expiresIn: "20m" }
    );
    return accessToken;
  },

  generateRefreshToken: (user) => {
    const refreshToken = jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.REFRESH_KEY,
      { expiresIn: "60d" }
    );
    return refreshToken;
  },

  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ userName: req.body.userName });
      if (!user) {
        return res.status(404).json("Wrong User Name!");
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        return res.status(404).json("Wrong Password!");
      }
      if (user && validPassword) {
        const accessToken = authController.generateAccessToken(user);
        const refreshToken = authController.generateRefreshToken(user);
        const newRefreshToken = await new RefreshToken({
          token: refreshToken,
        });
        await newRefreshToken.save();
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });
        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, accessToken });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  requestRefreshToken: async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json("You're not authenticated!");
    }
    const foundToken = await RefreshToken.findOne({ token: refreshToken });
    if (!foundToken) {
      return res.status(404).json("Refresh token not found!");
    }
    jwt.verify(refreshToken, process.env.REFRESH_KEY, async (err, user) => {
      if (err) {
        return res.status(403).json("Have some troubles!");
      }
      await RefreshToken.findOneAndDelete({ token: refreshToken });
      const newAccessToken = authController.generateAccessToken(user);
      const newRefreshToken = authController.generateRefreshToken(user);
      const newToken = await new RefreshToken({
        token: newRefreshToken,
      });
      await newToken.save();
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        path: "/",
        secure: false,
        sameSite: "strict",
      });
      res.status(200).json({ accessToken: newAccessToken });
    });
  },

  logoutUser: async (req, res) => {
    await RefreshToken.findOneAndDelete({ token: req.cookies.refreshToken });
    res.clearCookie("refreshToken");
    res.status(200).json("Log Out Successfully!");
  },
};

module.exports = authController;
