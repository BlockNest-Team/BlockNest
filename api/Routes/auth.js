const router = require("express").Router();
const User = require("../models/User");
// const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {
  console.log(req.body);
  try {
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      location: req.body.location,
      occupation: req.body.occupation,
      DateOfBirth: req.body.DateOfBirth,
      email: req.body.email,
      profilePicture: req.body.profilepic, // Make sure to match the field name
      walletAddr: req.body.walletAddr,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ walletAddr: req.body.walletAddr });
    !user && res.status(404).json("user not founds");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
