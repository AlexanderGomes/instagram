const Reply = require("../models/reply");
const asyncHandler = require("express-async-handler");
const redis = require('redis')
const REDIS_PORT = process.env.PORT || 6379;
const client = redis.createClient(REDIS_PORT);
client.connect();

const addReply = asyncHandler(async (req, res) => {
  const newReply = new Reply(req.body);
  try {
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
    const cached = await client.get('reply')
    if(cached) {
      return res.json(JSON.parse(cached))
    } else {
      const reply = await Reply.find({ commentId: req.params.commentId });
      const savingReply = await client.set('reply', JSON.stringify(reply))
      res.status(200).json(reply);
    }
  } catch (err) {
    next(err);
  }
});

const likeReply = asyncHandler(async (req, res) => {
  try {
    const reply = await Reply.findById(req.params.id);
    if (!reply.likes.includes(req.body.userId)) {
      await reply.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The reply has been liked");
    } else {
      await reply.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The reply has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

const deslikeReply = asyncHandler(async (req, res) => {
  try {
      const reply = await Reply.findById(req.params.id);
      if (!reply.deslikes.includes(req.body.userId)) {
        await reply.updateOne({ $push: { deslikes: req.body.userId } });
        res.status(200).json("deslike has been added");
      } else {
        await reply.updateOne({ $pull: { deslikes: req.body.userId } });
        res.status(200).json("deslike has been removed");
      }
    } catch (err) {
      res.status(500).json(err);
    }
});


module.exports = {
  addReply,
  getreply,
  updatereply,
  deleteReply,
  likeReply,
  deslikeReply
};
