const Reply = require("../models/reply");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const Comment = require("../models/comment");
const dbConnect = require("../utils/dbConnect");
dbConnect();

const addReply = asyncHandler(async (req, res) => {
  const newReply = new Reply(req.body);

  try {
    const ownerOfReply = await User.findById(req.body.userId);
    const commentBeingReplyed = await Comment.findById(req.body.commentId);
    const commentOwner = await User.findById(commentBeingReplyed.userId);
    const commentReply = await commentOwner.updateOne({
      $push: {
        notifications: {
          commentReplyed: commentBeingReplyed,
          userReplyed: ownerOfReply,
          type: 'replyCreated'
        },
      },
    });
    await commentOwner.updateOne({ $push: { commentReply: commentReply } });

    const savedReply = await newReply.save();
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
  const reply = await Reply.findById(req.params.id);//reply
  const replyOwner = await User.findById(reply.userId);//reply owner
  const body = await User.findById(req.body.userId);//liking reply

  try {

    if (!reply.likes.includes(req.body.userId)) {

      const likedReply = await replyOwner.updateOne({
        $push: { notifications: { likedReply: reply, userLikedReply: body, type: 'replyLiked' } },
      });
      await replyOwner.updateOne({ $push: { likedReply: likedReply } });


      await reply.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The reply has been liked");
    } else {

      const likedReply = await replyOwner.updateOne({
        $pull: { notifications: { likedReply: reply, userLikedReply: body } },
      });
      await replyOwner.updateOne({ $pull: { likedReply: likedReply } });
      await reply.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The reply has been disliked");
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

const deslikeReply = asyncHandler(async (req, res) => {
  const reply = await Reply.findById(req.params.id);
  const body = await User.findById(req.body.userId);
  const replyOwner =  await User.findById(reply.userId)


  try {

    if (!reply.deslikes.includes(req.body.userId)) {
      const deslikeReply = await replyOwner.updateOne({
        $push: { notifications: { deslikedReply: reply, userDeslikedReply: body, type: 'replyDesliked' } },
      });

      await replyOwner.updateOne({ $push: { deslikedReply: deslikeReply } });

      await reply.updateOne({ $push: { deslikes: req.body.userId } });
      res.status(200).json("deslike has been added");
    } else {
      await reply.updateOne({ $pull: { deslikes: req.body.userId } });
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
