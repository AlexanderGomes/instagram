const Reply = require("../models/reply");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const Comment = require("../models/comment");
const Post = require('../models/post')
const Noti = require('../models/notifications')
const dbConnect = require("../utils/dbConnect");
dbConnect();


const addReply = asyncHandler(async (req, res) => {
  const newReply = new Reply(req.body);

  const sender = await User.findById(req.body.userId); //making reply
  const post = await Post.findById(req.body.postId)//post
  const comment = await Comment.findById(newReply.commentId); //comment
  const reply = await User.findById(comment.userId)

  try {
    const savedReply = await newReply.save();

    const notification = await Noti.create({
      recipient: reply._id,
      eventId: post._id,
      sender: sender._id,
      type: "replyed to your comment on the post",
    });

    res.status(200).json(savedReply);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

const deleteReply = asyncHandler(async (req, res) => {
  try {
    const reply = await Reply.findById(req.params.id);
    if (reply.userId.toString() === req.body.userId) {
      await reply.deleteOne(reply);
      res.status(200).json({ reply, message: "reply has been deleted" });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});

const updatereply = asyncHandler(async (req, res) => {
  try {
    const reply = await Reply.findById(req.params.id);
    if (reply.userId.toString() === req.body.userId) {
      await reply.updateOne({ $set: req.body }, { new: true });
      res.status(200).json({ reply, message: "reply has been updated" });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});

const getreply = asyncHandler(async (req, res) => {
  try {
    const reply = await Reply.find({ commentId: req.params.commentId });
    res.status(200).json(reply);
  } catch (err) {
    next(err);
  }
});

const likeReply = asyncHandler(async (req, res) => {
  const reply = await Reply.findById(req.params.id); //reply

  const sender = await User.findById(req.body.userId); //liking reply
  const post = await Post.findById(reply.postId)//post
  const replyOwner = await User.findById(reply.userId); //reply owner

  try {
    if (!reply.likes.includes(req.body.userId)) {
      await reply.updateOne({ $push: { likes: req.body.userId } });

      const notification = await Noti.create({
        recipient: replyOwner._id,
        eventId: post._id,
        sender: sender._id,
        type: "liked your reply on the post",
      });
      res.status(200).json("The reply has been liked");
    } else {
      await reply.updateOne({ $pull: { likes: req.body.userId } });
      const notification = await Noti.deleteOne({
        recipient: replyOwner._id,
        eventId: post._id,
        sender: sender._id,
        type: "liked your reply on the post",
      });
      res.status(200).json("The reply has been disliked");
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});


const deslikeReply = asyncHandler(async (req, res) => {
  const reply = await Reply.findById(req.params.id);

  const sender = await User.findById(req.body.userId); //liking reply
  const post = await Post.findById(reply.postId)//post
  const replyOwner = await User.findById(reply.userId); //reply owner

  try {
    if (!reply.deslikes.includes(req.body.userId)) {
      await reply.updateOne({ $push: { deslikes: req.body.userId } });
      const notification = await Noti.create({
        recipient: replyOwner._id,
        eventId: post._id,
        sender: sender._id,
        type: "desliked your reply on the post",
      });

      res.status(200).json("deslike has been added");
    } else {
      await reply.updateOne({ $pull: { deslikes: req.body.userId } });

      const notification = await Noti.create({
        recipient: replyOwner._id,
        eventId: post._id,
        sender: sender._id,
        type: "desliked your reply on the post",
      });
      res.status(200).json("deslike has been removed");
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = {
  addReply,
  getreply,
  updatereply,
  deleteReply,
  likeReply,
  deslikeReply,
};
