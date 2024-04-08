const User = require("../Models/User");

const userController = {
  getAllUser: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const userNeedDelete = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Delete Successfully!");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = userController;
