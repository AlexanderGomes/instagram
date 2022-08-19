const express = require("express");
const router = express.Router();



const {
  addReply,
  getreply,
  deleteReply,
  updatereply,
  likeReply,
  deslikeReply
} = require("../controllers/reply");


router.post("/", addReply);//check
router.delete("/:id",deleteReply);//check
router.get("/:commentId", getreply);//check
router.put("/:id", updatereply);//check
router.put("/:id/like", likeReply);//check
router.put("/:id/deslike", deslikeReply);//check




module.exports = router;