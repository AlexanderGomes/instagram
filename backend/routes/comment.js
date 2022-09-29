const express = require("express");
const router = express.Router();



const {
  addComment,
  deleteComment,
  getComment,
  updateComment,
  likeComment,
  deslikeComment,
  getReply
} = require("../controllers/comment");

router.post("/", addComment);//check
router.delete("/:id",deleteComment);//check
router.get("/:postId", getComment);//check
router.get("/:postId/:parentId", getReply);//check
router.put("/:id",updateComment);//check
router.put("/like/:id", likeComment);//check
router.put("/deslike/:id", deslikeComment);//check





module.exports = router;