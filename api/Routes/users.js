const User = require("../models/User");
const router = require("express").Router();
// const bcrypt = require("bcrypt");

//update user
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    // if (req.body.password) {
    //   try {
    //     const salt = await bcrypt.genSalt(10);
    //     req.body.password = await bcrypt.hash(req.body.password, salt);
    //   } catch (err) {
    //     return res.status(500).json(err);
    //   }
    // }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your account!");
  }
});

//delete user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete only your account!");
  }
});
//get a user with wallet address
// router.get("/:walletAddr", async (req, res) => {
//   const userId = req.params.id;
//   const walletAddr = req.params.walletAddr;
//   console.log("userId", userId);
//   try {
//     const user = userId
//       ? await User.findById(userId)
//       : await User.findOne({ walletAddr: walletAddr });
//     const { password, updatedAt, ...other } = user._doc; // add properties u want to not show when  querried by this api
//     res.status(200).json(other);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//get a user with wallet address as well as name
router.get("/search", async (req, res) => {
  const searchTerm = req.query.term;
  try {
    // Searching in firstName, lastName, and walletAddr
    const users = await User.find({
      $or: [
        { firstName: new RegExp(searchTerm, 'i') },
        { lastName: new RegExp(searchTerm, 'i') },
        { walletAddr: new RegExp(searchTerm, 'i') }
      ]
    });
    const results = users.map(user => {
      const { password, updatedAt, ...other } = user._doc;
      return other;
    });
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json(err);
  }
});


//get a user
// router.get("/", async (req, res) => {
//   const userId = req.query.userId;
//   const walletAddr = req.query.walletAddr;
//   try {
//     const user = userId
//       ? await User.findById(userId)
//       : await User.findOne({ walletAddr: walletAddr });
//     const { password, updatedAt, ...other } = user._doc; // add properties u want to not show when  querried by this api
//     res.status(200).json(other);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//get friends
router.get("/friends/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, walletAddr, profilePicture } = friend;
      friendList.push({ _id, walletAddr, profilePicture });
    });
    res.status(200).json(friendList);
  } catch (err) {
    res.status(500).json(err);
  }
});

//follow a user

router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
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

//unfollow a user

router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(403).json("you dont follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant unfollow yourself");
  }
});

module.exports = router;
