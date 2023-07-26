//IMPORTS
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User.model.js");
const isAuthenticated = require("../middleware/isAuthenticated")

router.get("/dashboard", isAuthenticated, (req, res, next) => {

  res.status(200).send(`Welcome ${req.payload.username}`);
});

// Signup => POST "/signup"

router.post("/signup", async (req, res, next) =>{
  try {

    const {username, password} = req.body

    if (!username || !password) {
      res
        .status(400)
        .json({ errorMessage: "Please enter username and password" });
      return;
    }
    
    //!Username already exists
    const foundUser = await User.findOne({ username: username });
    if (foundUser) {
      res.status(400).json({ errorMessage: "Username is already in use" });
      return;
    }

    await User.create({username, password});
    res.json("User created");

  } catch (error) {
    next(error);
  }
})

// Login => "/login"

router.post("/login", async (req, res, next) =>{

  try {

    const {username, password}= req.body;
    const foundUser = await User.findOne({username:username});

    //! Username not Registered
    if (!foundUser){
      res.status(400).json({errorMessage: "Username is not registered"});
      return;
    }

    //! Password is not correct
    if(foundUser.password != password){
      res.status(400).json({errorMessage: "Wrong password"});
    }

    //! Token Creation and Auth
    const payload = {
      _id: foundUser._id,
      username: foundUser.username,
    };
    
    const authToken =  jwt.sign(payload, process.env.TOKEN_SECRET, {algorithm: "HS256",expiresIn: "7d"});
    res.json({authToken});

  } catch (error) {next(error)}
})

//Logout => "/logout"
router.get("/logout", async (req, res, next) =>{
  try {
    req.session.destroy();
  } catch (error) {
    next(error);
  }
})


module.exports = router;
