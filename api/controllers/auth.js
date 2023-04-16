import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// create function to get web3 address

// Registering a user
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      ProfilePicpath,
      friends,
      location,
      occupation,
      // viewedProfile,
      // impressions,
    } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      // walletAddr,
      password: hashedPassword,
      ProfilePicpath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 1000),
      impressions: Math.floor(Math.random() * 1000),
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
    console.log(
      `${savedUser} saved this user to the database  - - saim you are great chal ab login ka bana `
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err + "error in register Fuck off do it again now");
  }
};

// login Started
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // console.log(req.body);
    const user = await User.findOne({ email: email });
    console.log(email);
    if (!user)
      return res
        .status(400)
        .json({ msg: "bhai user hai hi nhi not exist error" });

    const isMAtch = await bcrypt.compare(password, user.password);
    if (!isMAtch) return res.status(400).json({ msg: "Credentials not valid" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password; // delete it so that cant be sent backto front end
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
