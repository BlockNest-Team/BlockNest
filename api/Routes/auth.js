const router = require("express").Router();
const User = require("../models/User");
// const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    //generate new password
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      Location: req.body.Location,
      occupation: req.body.occupation,
      DateOfBirth: req.body.DateOfBirth,
      email: req.body.email,
      profilePicture: req.body.profilePicture,
      walletAddr: req.body.walletAddr,

      // password: hashedPassword,
    });

    //save user and respond
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Done in block chain no need to connect

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ walletAddr: req.body.walletAddr });
    !user && res.status(404).json("user not founds");

    // const validPassword = await bcrypt.compare(req.body.password, user.password)
    // !validPassword && res.status(400).json("wrong password")

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
