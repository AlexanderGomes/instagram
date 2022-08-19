const express = require("express");
const router = express.Router();



const {
  addReply,
  getreply,
  deleteReply,
  updatereply
} = require("../controllers/reply");


router.post("/", addReply);//check
router.delete("/:id",deleteReply);//check
router.get("/:commentId", getreply);//check
router.put("/:id", updatereply);//check




module.exports = router;