const express = require("express");
const connectDB = require("./config/databse");
const User = require("./models/user");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.json());



const authRouter=require("./routes/auth");
const profileRouter=require("./routes/profile");
const requestRouter=require("./routes/request"); 
const userRouter= require("./routes/user");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const user = await User.findOne({ emailId: userEmail });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.delete("/delete", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("User deleted succesfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = [
      "userId",
      "photoUrl",
      "about",
      "gender",
      "age",
      "skills",
    ];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("update not allowed");
    }

    if (data?.skills.length > 10) {
      throw new Error("Skills can not be more than 10");
    }
    await User.findByIdAndUpdate(userId, data, { runValidators: true });
    res.send("User Updated successfully");
  } catch (err) {
    res.status(400).send("Update failed" + err.message);
  }
});


connectDB()
  .then(() => {
    console.log("Database connected");
    app.listen(3001, () => {
      console.log("Server is running on port 3000.....");
    });
  })
  .catch((err) => {
    console.error("Database cannot be established");
  });
