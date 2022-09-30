const Comment = require("../models/comment");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const Post = require("../models/post");
const Noti = require('../models/notifications')
const dbConnect = require("../utils/dbConnect");
dbConnect();

const addComment = asyncHandler(async (req, res) => {
  const newComment = new Comment(req.body);
  const post = await Post.findById(newComment.postId)
  const sender = await User.findById(req.body.userId); //making comment
  const recipient = await User.findById(post.userId); // post owner

  try {

    const notification = await Noti.create({
        recipient: recipient._id,
        eventId: post._id,
        sender: sender._id,
        type: "commented on your post",
      });

    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

const deleteComment = asyncHandler(async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id); // comment

    if (comment.userId.toString() === req.body.userId) {
      await comment.deleteOne(comment);
      res.status(200).json({ comment, message: "comment has been deleted" });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});

const updateComment = asyncHandler(async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (comment.userId.toString() === req.body.userId) {
      await comment.updateOne({ $set: req.body }, { new: true });
      res.status(200).json({ comment, message: "comment has been updated" });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});

const getComment = asyncHandler(async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

const likeComment = asyncHandler(async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id); //comment being liked
    const post = await Post.findById(comment.postId)
    const sender = await User.findById(req.body.userId); //liking comment
    const recipient = await User.findById(comment.userId); // comment owner


    if (!comment.likes.includes(req.body.userId)) {
      await comment.updateOne({ $push: { likes: req.body.userId } });

      const notification = await Noti.create({
        recipient: recipient._id,
        eventId: post._id,
        sender: sender._id,
        type: "liked your comment",
      });

      res.status(200).json("The comment has been liked");
    } else {
      await comment.updateOne({ $pull: { likes: req.body.userId } });

      const notification = await Noti.deleteOne({
        recipient: recipient._id,
        eventId: post._id,
        sender: sender._id,
        type: "liked your comment",
      });
      res.status(200).json("The comment has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

const deslikeComment = asyncHandler(async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id); //comment being desliked
    const post = await Post.findById(comment.postId)
    const sender = await User.findById(req.body.userId); //liking comment
    const recipient = await User.findById(comment.userId); // comment owner

    if (!comment.deslikes.includes(req.body.userId)) {
 
      await comment.updateOne({ $push: { deslikes: req.body.userId } });
      const notification = await Noti.create({
        recipient: recipient._id,
        eventId: post._id,
        sender: sender._id,
        type: "desliked your comment",
      });
      res.status(200).json("deslike has been added");
    } else {
   
      await comment.updateOne({ $pull: { deslikes: req.body.userId } });
      const notification = await Noti.deleteOne({
        recipient: recipient._id,
        eventId: post._id,
        sender: sender._id,
        type: "desliked your comment",
      });
      res.status(200).json("deslike has been removed");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = {
  addComment,
  deleteComment,
  updateComment,
  getComment,
  likeComment,
  deslikeComment,
};
