import Express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = Express.Router();

// read
router.get("/:id", verifyToken, getUser); // get user by id
router.get("/:id/friends", verifyToken, getUserFriends); // get user friends by id

// update
router.patch("/:id/:friendId", verifyToken, addRemoveFriend); // add or remove friend

export default router;
