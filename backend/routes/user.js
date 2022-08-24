const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getAllUsers,
  getSingleUser,
  followUser,
  unfollowUser,
  getUsersFollowers,
  getUsersFollowings,
  getUserSavedPosts,
getUserByUsername,
saveFavoritePost
} = require("../controllers/user");

router.post("/", registerUser); //check
router.post("/login", loginUser);//check
router.get("/all", getAllUsers);//check //redis
router.put("/:id/follow", followUser);//check
router.put("/:id/unfollow", unfollowUser);//check
router.get("/followers/:id", getUsersFollowings);//check //redis
router.get("/followings/:id", getUsersFollowers);//check //redis
router.get("/:id", getSingleUser);//check //redis
router.get("/username/:username", getUserByUsername);//check //redis
router.put("/savedPosts/:id", saveFavoritePost);//check
router.get("/favorite/:id", getUserSavedPosts);//check //redis
module.exports = router;