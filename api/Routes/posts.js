import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/post.js";
import { verifyToken } from "../middleware/auth.js";
const router = express.Router();

// read

router.get("/", verifyToken, getFeedPosts); // getFeedPosts is a function which is getting all postsfrom data base so modify it so that it shows posts from only friends

router.get("/:userId/posts", verifyToken, getUserPosts);

// update
router.patch("/:id/like", verifyToken, likePost);

export default router;
