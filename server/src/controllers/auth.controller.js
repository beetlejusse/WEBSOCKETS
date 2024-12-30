import User from "../models/users.schema.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.lib.js";
// import otpGenerator from "otp-generator";
// import twilio from "twilio";

// const accountSid = process.env.TWILIO_ACCOUNT_SID;

// let storeOTP = {};

export const signUpController = async (req, res) => {
  const { email, fullName, password, contactNumber } = req.body;
  try {
    if (!email || !fullName || !password || !contactNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    if (contactNumber.length < 6)
      return res
        .status(400)
        .json({ message: "Contact Number must be atleast 10 characters" });

    const existingUser = await User.findOne({ email, contactNumber });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

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
        password: newUser.password,
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

// export const sendOTPController = async (req, res) => {
//   const {contactNumber} = req.body;
//   try {
//     if(!contactNumber) return res.status(400).json({message: "Contact Number is required"});

//     const otp = otpGenerator.generate(6, {
//       upperCaseAlphabets: false, specialChars: false, alphabets: false
//     });
//     storeOTP[contactNumber] = otp;
//     await twilio(accountSid, process.env.TWILIO_AUTH_TOKEN).messages.create({
//       body: `Your OTP is ${otp}`,
//       from: process.env.TWILIO_PHONE_NUMBER,
//       to: contactNumber
//     });

//   } catch (error) {
//     console.log("Error in sending otp controller:", error);
//     res.status(500).json({message: "Internal Server Error(here at sendOTPController)"});
//   }
// };

export const loginController = async (req, res) => {
  const { email, password, contactNumber } = req.body;
  if ((email || contactNumber) && password) {
    try {
      let user;

      //login using email and password
      if (email && password) {
        user = await User.findOne({ email });
        if (!user)
          return res.status(400).json({
            message: "Invalid Credentials as for Emails",
          });
      } else if (contactNumber && password) {
        user = await User.findOne({ contactNumber });
        if (!user)
          return res.status(400).json({
            message: "Invalid Credentials as for Contact number",
          });
      } else {
        return res
          .status(400)
          .json({ message: "Email/Contact number and password are required" });
      }

      const matchPassword = await bcrypt.compare(password, user.password);
      if (!matchPassword)
        return res.status(400).json({ message: "Password not Matched" });

      generateToken(user._id, res);

      res.status(200).json({
        _id: user._id,
        fullname: user.fullName,
        email: user.email,
        profilePicture: user.profilePicture,
        contactNumber: user.contactNumber,
        message: "User logged in successfully",
      });
    } catch (error) {
      console.log("Error in login controller: ", error);
      res
        .status(500)
        .json({ message: "Internal Server Error(at login controller)" });
    }
  }
};

export const logoutController = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
