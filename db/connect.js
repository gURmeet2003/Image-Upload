const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI;

const connectDb = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Db connected");
  } catch (e) {
    console.log("Db Not Connected");
    process.exit(0);
  }
};

module.exports = connectDb;
