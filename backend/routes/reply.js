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
router.put("/like/:id", likeReply);//check
router.put("/deslike/:id", deslikeReply);//check




module.exports = router;