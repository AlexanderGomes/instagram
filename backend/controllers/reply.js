const Reply = require("../models/reply");
const asyncHandler = require("express-async-handler");

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
    const reply = await Reply.find({ commentId: req.params.commentId });
    res.status(200).json(reply);
  } catch (err) {
    next(err);
  }
});

module.exports = {
  addReply,
  getreply,
  updatereply,
  deleteReply,
};
