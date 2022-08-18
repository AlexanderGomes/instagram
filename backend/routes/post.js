const express = require("express");
const router = express.Router();
const {createPost, updatePost, deletePost, likePost, deslikePost, getPostByUsername, getPostById, getTimelinePost } = require('../controllers/post')


router.post('/',createPost)
router.put('/:id', updatePost)
router.get('/:id', getPostById)
router.get('/profile/:username',  getPostByUsername)
router.get('/timeline/:user',   getTimelinePost)
router.delete('/:id',   deletePost)
router.put('/like/:id',  likePost)
router.put('/deslike/:id',  deslikePost)



module.exports = router;