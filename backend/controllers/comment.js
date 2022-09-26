const Comment = require("../models/comment");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const Post = require('../models/post');
const dbConnect = require("../utils/dbConnect");
dbConnect();


const addComment = asyncHandler(async (req, res) => {
  const newComment = new Comment(req.body);

  try {
    const body = await Post.findById(req.body.postId)//post being commented on
    const user = await User.findById(body.userId) //owner of the post that is being notified
    const commenting = await User.findById(req.body.userId) // person making the comment
    const savedComment = await newComment.save();

    //put into a variable so you can pass two obj inside of one
    const likedComment = await user.updateOne({$push: {notifications: {postCommented: body, userCommented: commenting}}})
    await user.updateOne({$push: {likedComment: likedComment}})
    res.status(200).json(savedComment);
  } catch (error) {
    res.status(400).json(error.message);
  }
});


const deleteComment = asyncHandler(async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id); // comment

    const post = await Post.findById(comment.postId) // post being commented on
    const user = await User.findById(post.userId) // owner of the post
    const commenting = await User.findById(req.body.userId) // person making the comment


    if (comment.userId.toString() === req.body.userId) {
      const likedComment = await user.updateOne({$pull: {notifications: {postCommented: post, userCommented: commenting}}})

      await user.updateOne({$pull: {likedComment: likedComment}})
      
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
    res.status(500).json({ message: "error" });
  }
});


const likeComment = asyncHandler(async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);//comment being liked
    const body = await User.findById(req.body.userId)//user liking the comment
    const user = await User.findById(comment.userId)//person being notified


    if (!comment.likes.includes(req.body.userId)) {
      await comment.updateOne({ $push: { likes: req.body.userId } });

      //put into a variable so you can pass two obj inside of one
      const likedComment = await user.updateOne({$push: {notifications: {commentLiked: comment, userlikedComment: body}}})
      await user.updateOne({$push: {likedComment: likedComment}})
      
      
      res.status(200).json("The comment has been liked");
    } else {
      await comment.updateOne({ $pull: { likes: req.body.userId } });

      //put into a variable so you can pass two obj inside of one
      const likedComment = await user.updateOne({$pull: {notifications: {commentLiked: comment, userlikedComment: body}}})
      await user.updateOne({$pull: {likedComment: likedComment}})

      res.status(200).json("The comment has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


const deslikeComment = asyncHandler(async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);//comment being desliked
    const user = await User.findById(comment.userId) //person being notified
    const body = await User.findById(req.body.userId) //person desliking comment

    if (!comment.deslikes.includes(req.body.userId)) {

      //put into a variable so you can pass two objs inside of one
      const deslikedComment = await user.updateOne({$push: {notifications: {commentDesliked: comment, userDeslikedComment: body}}})
      await user.updateOne({$push: {deslikedComment: deslikedComment}})

      await comment.updateOne({ $push: { deslikes: req.body.userId } });
      res.status(200).json("deslike has been added");
    } else {

      //put into a variable so you can pass two obj inside of one
      const deslikedComment = await user.updateOne({$pull: {notifications: {commentDesliked: comment, userDeslikedComment: body}}})
      await user.updateOne({$pull: {deslikedComment: deslikedComment}})

      await comment.updateOne({ $pull: { deslikes: req.body.userId } });
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
