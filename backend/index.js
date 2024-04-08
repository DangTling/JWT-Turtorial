const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const authRoutes = require("./Routes/auth");
const userRouter = require("./Routes/user");

dotenv.config();
const app = express();

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
  }
}
connectToDB();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/v1/auth", authRoutes);
app.use("/v1/user", userRouter);

app.listen(8080, () => {
  console.log("Server is running ... ");
});
