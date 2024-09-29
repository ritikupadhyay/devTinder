const mongoose = require("mongoose");

const connectDB= async()=>{
    await mongoose.connect("mongodb+srv://admin:%40Ritik1234@cluster0.zoky8zf.mongodb.net/devTinder");
};

module.exports=connectDB;