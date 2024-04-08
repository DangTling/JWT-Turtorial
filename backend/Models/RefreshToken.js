const mongoose = require("mongoose");

const refreshTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      unique: true,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RefreshToken", refreshTokenSchema);
