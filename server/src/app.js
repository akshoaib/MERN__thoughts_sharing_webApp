import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routers/auth.js";
// import path from "path";
import thoughtRoutes from "./routers/thought.js";
import followerRoutes from "./routers/follower.js";

import cors from "cors";
import { dirname } from "path";
import path from "path";
import { fileURLToPath } from "url";
// const __dirname = path.resolve(path.dirname(""));
const __dirname = dirname(fileURLToPath(import.meta.url));

console.log("pathsss", __dirname);
// console.log("/public", express.static(path.join(__dirname, "uploads")));

const app = express();
app.use(cors());
app.use("/public", express.static(path.join(__dirname, "uploads")));
// app.use(express.static(path.join("uploads")));

dotenv.config({
  path: "./config.env",
});
app.use(express.json());
app.use(
  express.urlencoded({
    limit: "30mb",
    extended: true,
  })
);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});
// app.use("public", express.static(path.join(__dirname, "uploads")));
// app.use(express.static(path.join(__dirname, "public")));

// console.log(__dirname);
app.use(authRoutes);
app.use(thoughtRoutes);
app.use(followerRoutes);

mongoose
  .connect(process.env.CONNECTION_URL, {
    useUnifiedTopology: true,
    useNewURLParser: true,
  })
  .then(() => {
    console.log("database conected");
  })
  .catch((error) => {
    console.log(error);
  });
