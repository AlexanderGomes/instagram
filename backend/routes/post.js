const express = require("express");
const router = express.Router();
const {createPost, updatePost, deletePost, likePost, deslikePost, getPostByUsername, getPostById, getTimelinePost } = require('../controllers/post')


router.post('/',createPost)//check
router.put('/:id', updatePost)//check
router.get('/:id', getPostById)//check
router.get('/profile/:username',  getPostByUsername)//check
router.get('/timeline/:userId',   getTimelinePost)//check
router.delete('/:id', deletePost) //check
router.put('/:id/like', likePost)//check
router.put('/:id/dislike',  deslikePost)//check



module.exports = router;