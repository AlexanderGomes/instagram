const express = require("express");
const router = express.Router();



const {
  addComment,
  deleteComment,
  getComment,
  updateComment
} = require("../controllers/comment");

router.post("/", addComment);//check
router.delete("/:id",deleteComment);//check
router.get("/:postId",getComment);//check
router.put("/:id",updateComment);//check




module.exports = router;