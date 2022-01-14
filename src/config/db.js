//db user qpid_master pass qpid2021

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://qpid_master:qpid2021@labase.kr2cg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
