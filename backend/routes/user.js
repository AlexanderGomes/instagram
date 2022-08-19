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
router.get("/all", getAllUsers);//check
router.put("/:id/follow", followUser);//check
router.put("/:id/unfollow", unfollowUser);//check
router.get("/followers/:id", getUsersFollowings);//check
router.get("/followings/:id", getUsersFollowers);//check
router.get("/:id", getSingleUser);//check
router.get("/username/:username", getUserByUsername);//check
router.put("/savedPosts/:id", saveFavoritePost);//check
router.get("/favorite/:id", getUserSavedPosts);//check
module.exports = router;