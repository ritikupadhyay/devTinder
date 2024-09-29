const express = require("express");
const {userAuth} =require("../middlewares/auth");
const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
    res.send("Sending connection request ");
  });
  

module.exports = requestRouter;