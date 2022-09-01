const asyncHandler = require("express-async-handler");
const Post = require("../models/post");
const User = require("../models/user");

const redis = require('redis');
const REDIS_PORT = process.env.PORT || 6379;
const client = redis.createClient(REDIS_PORT);
client.connect();




const createPost = asyncHandler(async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

const updatePost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId.toString() === req.body.userId) {
      await post.updateOne({ $set: req.body }, { new: true });
      res.status(200).json({ post, message: "post has been updated" });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});

const deletePost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId.toString() === req.body.userId) {
      await post.deleteOne(post);
      res.status(200).json({ message: "post deleted" });
    } else {
      res.status(500).json({ message: "not your post" });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});

const likePost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

const deslikePost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post.dislikes.includes(req.body.userId)) {
      await post.updateOne({ $push: { dislikes: req.body.userId } });
      res.status(200).json("The post has been desliked");
    } else {
      await post.updateOne({ $pull: { dislikes: req.body.userId } });
      res.status(200).json("The  disliked has been removed");
    }
  } catch (err) {
    res.status(500).json({ message: "error" });
  }
});

const getPostByUsername = asyncHandler(async (req, res) => {
  try {
      const user = await User.findOne({ username: req.params.username });
      const posts = await Post.find({ userId: user._id });
      res.status(200).json(posts);

  } catch (err) {
    res.status(500).json(err.message);
  }
});

const getTimelinePost = asyncHandler(async (req, res) => {
  try {
      const currentUser = await User.findById(req.params.userId);
      const userPosts = await Post.find({ userId: currentUser._id });
      const friendPosts = await Promise.all(
        currentUser.followings.map((friendId) => {
          return Post.find({ userId: friendId });
        })
      );
      const posts = userPosts.concat(...friendPosts)
      res.status(200).json(posts);

  } catch (err) {
    res.status(500).json(err);
  }
});

const getPostById = asyncHandler(async (req, res) => {
  try {
      const post = await Post.findById(req.params.id);
      res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = {
  createPost,
  updatePost,
  deletePost,
  likePost,
  deslikePost,
  getPostByUsername,
  getTimelinePost,
  getPostById,
};
