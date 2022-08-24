const Comment = require("../models/comment");
const asyncHandler = require("express-async-handler");
const redis = require('redis');
const REDIS_PORT = process.env.PORT || 6379;
const client = redis.createClient(REDIS_PORT);
client.connect();


   const addComment = asyncHandler(async(req, res) => {
    const newComment = new Comment(req.body);
    try {
      const savedComment = await newComment.save();
      res.status(200).json(savedComment);
    } catch (error) {
      res.status(400).json(error.message);
    }
    });
    
    const deleteComment =asyncHandler(async(req, res) => {
        try {
            const comment = await Comment.findById(req.params.id)
            if(comment.userId.toString() === req.body.userId) {
                await comment.deleteOne(comment);
                res.status(200).json({comment, message: 'post has been deleted'})
            }
        } catch (error) {
            res.status(400).json(error.message)
        }
    });
    

    const updateComment = asyncHandler(async(req, res) => {
        try {
            const comment = await Comment.findById(req.params.id)
            if(comment.userId.toString() === req.body.userId) {
                await comment.updateOne({$set: req.body}, {new: true});
                res.status(200).json({comment, message: 'comment has been updated'})
            }
        } catch (error) {
            res.status(400).json(error.message)
        }
    });
    

    const getComment = asyncHandler(async(req, res) => {
        try {
          const cached = await client.get('comments')
          if(cached) {
            return res.json(JSON.parse(cached))
          } else {
            const comments = await Comment.find({ postId: req.params.postId });
            const savedComment = await client.set('comments', JSON.stringify(comments))
            res.status(200).json(comments);
          }
          } catch (err) {
            res.status(500).json({message: 'error'})
          }
    });
  
    const likeComment = asyncHandler(async (req, res) => {
        try {
          const comment = await Comment.findById(req.params.id);
          if (!comment.likes.includes(req.body.userId)) {
            await comment.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json("The comment has been liked");
          } else {
            await comment.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json("The comment has been disliked");
          }
        } catch (err) {
          res.status(500).json(err);
        }
      });

      const deslikeComment = asyncHandler(async (req, res) => {
        try {
            const comment = await Comment.findById(req.params.id);
            if (!comment.deslikes.includes(req.body.userId)) {
              await comment.updateOne({ $push: { deslikes: req.body.userId } });
              res.status(200).json("deslike has been added");
            } else {
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
  deslikeComment
    }