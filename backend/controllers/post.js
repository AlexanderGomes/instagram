const asyncHandler = require("express-async-handler");
const Post = require("../models/post");
const User = require("../models/user");


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
      await post.deleteOne(post);
      res.status(200).json({ message: "post deleted" });
  } catch (error) {
    res.status(400).json(error.message);
  }
});



const likePost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);//post being liked
    const user = await User.findById(post.userId) // owner of the post
    const body = await User.findById(req.body.userId) //person liking the post

    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });

      //putting 2 objs inside of one, both the post being like and the person who liked it
      const likedPost = await user.updateOne({$push: {notifications: {postLiked: post._id, userlikedPost: body._id, type: 'postLike'}}})
      await user.updateOne({$push: {likedPost: likedPost}})


      res.status(200).json('post has been liked');
    } else {

      await post.updateOne({ $pull: { likes: req.body.userId } });
      const likedPost = await user.updateOne({$pull: {notifications: {postLiked: post._id, userlikedPost: body._id, type: 'postLike'}}})
      await user.updateOne({$pull: {likedPost: likedPost}})
      res.status(200).json('post has been desliked');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});



const deslikePost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);//post being liked
    const user = await User.findById(post.userId) // owner of the post
    const body = await User.findById(req.body.userId) //person liking the post

    if (!post.dislikes.includes(req.body.userId)) {
      await post.updateOne({ $push: { dislikes: req.body.userId } });

      const deslikedPost = await user.updateOne({$push: {notifications: {postDesLiked: post._id, userDeslikedPost: body._id, type: 'postDesliked'}}})
      await user.updateOne({$push: {deslikedPost: deslikedPost}})

      res.status(200).json("The post has been desliked");
    } else {
      const deslikedPost = await user.updateOne({$pull: {notifications: {postDesLiked: post._id, userDeslikedPost: body._id, type: 'postDesliked'}}})
      await user.updateOne({$pull: {deslikedPost: deslikedPost}})

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
