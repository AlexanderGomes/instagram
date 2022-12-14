const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getAllUsers,
  getSingleUser,
  followUser,
  getUsersFollowers,
  getUsersFollowings,
  getUserSavedPosts,
getUserByUsername,
saveFavoritePost,
likeUser,
deslikeUser,
updateUser
} = require("../controllers/user");

router.post("/", registerUser); //check
router.post("/login", loginUser);//check
router.get("/all", getAllUsers);//check //
router.put("/:id/follow", followUser);//check
router.put('/:id/like', likeUser)//check
router.put('/update/:id', updateUser)//check
router.put('/:id/dislike',  deslikeUser)//check
router.get("/followers/:username", getUsersFollowers);//check //
router.get("/followings/:username", getUsersFollowings);//check //
router.get("/:id", getSingleUser);//check //redis
router.get("/username/:username", getUserByUsername);//check //
router.put("/saved/:id", saveFavoritePost);//check
router.get("/favorite/:id", getUserSavedPosts);//check //


module.exports = router;