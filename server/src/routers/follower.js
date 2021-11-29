import express from "express";
import { addFollowing, getFollowing } from "../controllers/follower.js";
import { isSignin } from "../middleware/auth.js";

const router = express.Router();
console.log("hh");
router.post("/followUser/:_id", isSignin, addFollowing);
router.get("/getFollowing", isSignin, getFollowing);

export default router;
