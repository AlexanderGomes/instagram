const express = require("express");
const router = express.Router();



const {
  addComment,
  deleteComment,
  getComment,
  updateComment
} = require("../controllers/comment");

router.post("/", addComment);
router.delete("/:id",deleteComment);
router.get("/:postId",getComment);
router.put("/:id",updateComment);




module.exports = router;