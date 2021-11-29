import mongoose from "mongoose";

const thoughtSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  detail: {
    type: String,
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  thoughtImage: { type: String },
  // selectedFile: { type: String },
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("Thought", thoughtSchema);
