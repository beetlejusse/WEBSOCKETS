import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        fullName: {
            type: String,
            required: true,
            index: true,
        },
        contactNumber: {
            type: String,
            default: "",
            unique: true,
            index: true,
            required: [true, "Contact Number is Required"],
            minlength: [10, "Contact Number must be atleast 10 characters"],
        },
        password: {
            type: String,
            required: [true, "Password is Required"],
            minlength: [6, "Password must be at least 6 characters"],
        },
        profilePicture: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;