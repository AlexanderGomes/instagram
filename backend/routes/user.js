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
getUserByUsername
} = require("../controllers/user");


router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/all", getAllUsers);
router.get("/followers/:id", getUsersFollowings);
router.get("/followings/:id", getUsersFollowers);
router.get("/savedPosts/:id", getUserSavedPosts);
router.get("/:id", getSingleUser);
router.get("/username/:username", getUserByUsername);
router.put("/:id/follow", followUser);
router.put("/:id/unfollow", unfollowUser);

module.exports = router;