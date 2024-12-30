import User from "../models/users.schema.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.lib.js";

export const signUpController = async (req, res) => {
  const { email, fullName, password, contactNumber } = req.body;
  try {
    if (!email || !fullName || !password || !contactNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) return res.status(400).json({ message: "Password must be at least 6 characters" });
    if (contactNumber.length < 6) return res.status(400).json({ message: "Contact Number must be atleast 10 characters" });

    const existingUser = await User.findOne({ email, contactNumber });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      fullName,
      contactNumber,
      password: hashPass,
    });

    if (newUser) {
      //generating jwt token
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        contactNumber: newUser.contactNumber,
        email: newUser.email,
        profilePicture: newUser.profilePicture,
        message: "User created successfully",
      });
    } else {
      res.status(400).json({ message: "Invalid User Data" });
    }
  } catch (error) {
    console.log("Error in sign-up controller: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const loginController = (req, res) => {
  const { email, password } = req.body;
};

export const logoutController = (req, res) => {
  res.send("logout");
  console.log("working");
};
