import User from "../models/users.schema.js";
import Message from "../models/message.schema.js";

export const getUsersForSidebar = async(req, res) => {
    try {
        const loggedInUser = req.user._id;
        //find all the users except the logged in user
        const filteredUsers = await User.find({ _id: { $ne: loggedInUser } }).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in getUsersForSidebar controller: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getMessages = async(req, res) => {
    try {
        const {id:usertoChatID} = req.params;
        const senderId = req.user._id;
    
        const messages = await Message.find({
            $or: [
                {senderId: senderId, receiverId: usertoChatID},
                {senderId: usertoChatID, receiverId: senderId}
            ]
        })

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller: ", error);
        res.status(500).json({ message: "Internal Server Error" });
        
    }
}

export const sendMessage = async(req, res) => {
    try {
        const {text, image} = req.body;
        const {id: receiverID} = req.params;

        const senderID = req.user._id;
        let imageUrl;
        if(image){
            //upload base64 image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderID,
            receiverID,
            text,
            image: imageUrl
        })

        await newMessage.save();

        //realtime functionality will be written here with socket.io

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}