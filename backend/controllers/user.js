const User = require("../models/user");
const Post = require("../models/post");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const { createClient } = require("redis");

const client = createClient();
client.connect()

const registerUser = asyncHandler(async (req, res) => {
  const { name, username, email, password } = req.body;

  if (!name || !username || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  const findUser = await User.findOne({ email });
  if (findUser) {
    return res.status(400).json({ msg: "User already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json("invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //finding user
  const user = await User.findOne({ email });

  //validation
  if (!user) {
    res.status(400).json("user do not exist");
  }

  //comparing hashed password and sending back information
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
      message: "user logged in",
    });
  }
});

const getSingleUser = asyncHandler(async (req, res) => {
  try {
    //finding user by id and sending it back
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(201).json({ token: generateToken(user._id), user });
    } else {
      res.status(400).json("invalid user data");
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});
const getUserByUsername = asyncHandler(async (req, res) => {
  try {
    //finding user by id and sending it back
    const user = await User.findOne({ username: req.params.username });
    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json("invalid user data");
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});

const followUser = asyncHandler(async (req, res) => {
  if (req.params.id !== req.body.userId) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you allready follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
});

const unfollowUser = asyncHandler(async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(400).json("you dont follow this user");
      }
    } catch (error) {
      res.status(402).json(error.message);
    }
  } else {
    res.status(403).json("you cant unfollow yourself");
  }
});

const getUsersFollowers = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const friends = await Promise.all(
      user.followers.map((friendId) => {
        return User.findById(friendId);
      })
    );

    let friendList = [];

    friends.map((friend) => {
      const { _id, username, name } = friend;
      friendList.push({ _id, username, name });
    });
    res.status(200).json(friendList);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

const getUsersFollowings = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const friends = await Promise.all(
      user.followers.map((friendId) => {
        return User.findById(friendId);
      })
    );

    let friendList = [];

    friends.map((friend) => {
      const { _id, username, name } = friend;
      friendList.push({ _id, username, name });
    });
    res.status(200).json(friendList);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

const saveFavoritePost = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user.savedPost.includes(req.body.postId)) {
      await user.updateOne({ $push: { savedPost: req.body.postId } });
      res.status(200).json("post has been saved");
    } else {
      res.status(403).json("post is already saved");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

const getUserSavedPosts = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const savedPosts = await Promise.all(
      user.savedPost.map((postId) => {
        return Post.findById(postId);
      })
    );

    let savedPostList = [];

    savedPosts.map((post) => {
      const { _id, text, img, userId, likes, deslikes } = post;
      savedPostList.push({ _id, text, img, userId, likes, deslikes });
    });

    res.status(200).json(savedPostList);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT__SECRET, {
    expiresIn: "30d",
  });
};

const redis_user = (req, res, next) => {
  client.get("users", (err, redis_data) => {
    if (err) {
      throw err;
    } else if (redis_data) {
      res.send(JSON.parse(redis_data));
    } else {
      next();
    }
  });
};

const getAllUserss = asyncHandler(async (req, res) => {
  try {
    const user = await User.find({});

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

const getAllUsers = async (req, res) => {
  try {
    const user = await User.find({});
    await client.set("user", 60, JSON.stringify(user));
    res.send(user)
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const redisUser = async (req, res, next) => {
 await client.get('user',(err, redis_data) => {
  if(err) {
    throw err
  } else if (redis_data) {
    res.send(JSON.parse(redis_data))
  } else {
    next()
  }
 })
}

module.exports = {
  registerUser,
  loginUser,
  getSingleUser,
  getAllUsers,
  getUsersFollowers,
  getUsersFollowings,
  getUserSavedPosts,
  getUserByUsername,
  followUser,
  unfollowUser,
  saveFavoritePost,
  redisUser
};
