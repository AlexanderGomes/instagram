const express = require("express");
const router = express.Router();



const {
  addReply,
  getreply,
  deleteReply,
  updatereply
} = require("../controllers/reply");


router.post("/", addReply);
router.delete("/:id",deleteReply);
router.get("/:postId",getreply);
router.put("/:id",updatereply);




module.exports = router;