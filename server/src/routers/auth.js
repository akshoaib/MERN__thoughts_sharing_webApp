import express from "express";
import { getUserById, signin, signup } from "../controllers/auth.js";
import { signout } from "../controllers/thought.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signout);
router.get("/getuserbyid", getUserById);

export default router;
