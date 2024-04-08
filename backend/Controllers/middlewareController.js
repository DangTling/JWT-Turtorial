const jwt = require("jsonwebtoken");

const middlewareController = {
  verifyToken: async (req, res, next) => {
    const token = req.headers.token;
    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, process.env.SECRET_KEY, (error, user) => {
        if (error) {
          return res.status(403).json("Invalid Token");
        }
        req.user = user;
        next();
      });
    } else {
      res.status(401).json("You are not authenticated!");
    }
  },
  verifyTokenAndAdmin: async (req, res, next) => {
    middlewareController.verifyToken(req, res, () => {
      if (req.user.id == req.params.id || req.user.admin) {
        next();
      } else {
        return res.status(403).json("You are not allowed to delete this user!");
      }
    });
  },
};

module.exports = middlewareController;
