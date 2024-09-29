const express = require("express");
const connectDB = require("./config/databse");
const User = require("./models/user");
const app = express();

app.use(express.json())
app.post("/signup",async(req,res)=>{
    const user= new User(req.body)
    try{
    await user.save();
    res.send("User added succesfully");
    }catch(err){
        res.status(400).send("Error saving the user:"+ err.message)
    }

})

connectDB()
  .then(() => {
    console.log("Database connected");
    app.listen(3000, () => {
      console.log("Server is running on port 3000.....");
    });
  })
  .catch((err) => {
    console.error("Database cannot be established");
  });
