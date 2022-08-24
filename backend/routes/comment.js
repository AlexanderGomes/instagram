const express = require("express");
const router = express.Router();



const {
  addComment,
  deleteComment,
  getComment,
  updateComment,
  likeComment,
  deslikeComment
} = require("../controllers/comment");

router.post("/", addComment);//check
router.delete("/:id",deleteComment);//check
router.get("/:postId", getComment);//check
router.put("/:id",updateComment);//check
router.put("/:id/like", likeComment);//check
router.put("/:id/deslike", deslikeComment);//check





module.exports = router;