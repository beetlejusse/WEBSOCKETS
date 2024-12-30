import User from "../models/users.schema.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.lib.js";

export const signUpController = async (req, res) => {
  const { email, fullName, password } = req.body;
  try {
    if (!email || !fullName || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      fullName,
      password: hashPass,
    });

    if (newUser) {
      //generating jwt token
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
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
  res.send("login");
  console.log("working");
};

export const logoutController = (req, res) => {
  res.send("logout");
  console.log("working");
};
