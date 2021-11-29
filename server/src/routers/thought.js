import express from "express";
import {
  createThought,
  deleteThought,
  getThoughtById,
  getThoughts,
  getUserById,
  likeThought,
  updateThought,
} from "../controllers/thought.js";

import { isSignin } from "../middleware/auth.js";
const router = express.Router();
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import shortid from "shortid";
const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(__dirname);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const upload = multer({ storage });
router.post(
  "/createthought",
  isSignin,
  upload.single("thoughtImage"),
  createThought
);
console.log("pppppp");
router.get("/getallthoughts", isSignin, getThoughts);
router.patch("/likethought", isSignin, likeThought);

router.patch("/updatethought/:_id", isSignin, updateThought);
router.delete("/deletethought/:_id", isSignin, deleteThought);
router.get("/getthoughtbyid/:_id", isSignin, getThoughtById);
router.get("/getuserbyid/:_id", getUserById);

export default router;
