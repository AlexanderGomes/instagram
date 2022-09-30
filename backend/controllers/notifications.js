const Noti = require('../models/notifications')
const User = require('../models/user')
const Post = require('../models/post')
const Comment = require('../models/comment')
const Reply = require('../models/reply')

const asyncHandler = require("express-async-handler");
const dbConnect = require("../utils/dbConnect");
dbConnect();

const getNotification = asyncHandler(async (req, res) => {
    try {
    const user = await User.findById(req.params.id);
    const noti = await Noti.find({recipient: user._id});
    console.log(noti)
    res.status(200).json(noti);
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = {
getNotification
};
