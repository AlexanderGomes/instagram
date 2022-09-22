const mongoose = require("mongoose")


const userSchema = mongoose.Schema (
    {
        name: {
            type: String,
            required: [true, "Please add your name"],
          },
          username: {
            type: String,
            required: [true, "please add your username"],
          },
          email: {
            type: String,
            required: [true, "Please add your email"],
          },
          password: {
            type: String,
            required: [true, "Please add your password"],
          },
          profilePicture: {
            type: String,
            default: "",
          },
          coverPicture: {
            type: String,
            default: "",
          },
          followers: {
            type: Array,
            default: [],
          },
          followings: {
            type: Array,
            default: [],
          },
          love: {
            type: Array,
            default: [],
          },
          hate: {
            type: Array,
            default: [],
          },
          desc: {
            type: String,
            max: 50,
          },
          savedPost: {
            type: Array,
            default: [],
          },
          notifications: {
            type: Array,
            default: [],
          },
        },
        {
          timestamps: true,
        }
    
)

module.exports = mongoose.model("User", userSchema);