// import jwt from "jsonwebtoken";
import thoughtSchema from "../models/thought.js";
import userSchema from "../models/auth.js";
import mongoose from "mongoose";

export const createThought = async (req, res) => {
  try {
    const _id = req.user._id;

    const addedBy = _id;
    const { name, detail } = req.body;
    const thoughtObj = { name, detail, addedBy };
    if (req.file) {
      thoughtObj.thoughtImage =
        process.env.API + "/public/" + req.file.filename;
    }
    console.log(thoughtObj);

    // console.log(req.file.filename);
    // const thoughtImage = process.env.API + "/public/" + req.file.filename;
    // const thoughtImage = process.env.API + "/" + req.file.filename;

    // const _id = req.user._id;
    const thought = new thoughtSchema(thoughtObj);
    // console.log("kk", name);
    // console.log(thoughtImage);
    const my = await thought.save();
    // const addtoUser = await userSchema.findByIdAndUpdate(
    //   _id,
    //   { $push: { thoughts: my } },
    //   { new: true }
    // );

    console.log(my);
    res.status(201).json({ message: "thought created successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const getThoughtById = async (req, res) => {
  try {
    const { _id } = req.params;
    console.log(_id.valueType);
    // console.log(Buffer.from(_id).length);

    const thought = await thoughtSchema.find({ _id: _id });
    if (thought) {
      res.status(200).json({ thought });
    } else {
      return res.status(400).json({ message: "thought not found" });
    }
  } catch (error) {
    console.log(error);
  }
};
export const getUserById = async (req, res) => {
  try {
    const { _id } = req.params;
    // console.log("iiiiii", _id);
    // console.log("ffff", Buffer.from(_id).length);
    const ID = _id.trim();
    // console.log(Buffer.from(ID).length);
    const userThoughts = await thoughtSchema
      .find({ addedBy: ID })
      .populate("addedBy")
      .populate("likedBy");

    if (userThoughts) {
      res.status(200).json({ userThoughts });
      console.log(userThoughts);
      // const y = userThought.map((val) => {
      //   return val.addedBy;
      // });
      // console.log(y);
      // res.status(200).json("success");
    } else {
      return res.status(400).json({ message: "userThoughts not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getThoughts = async (req, res) => {
  try {
    const thoughts = await thoughtSchema.find({}).populate("likedBy");
    if (thoughts) {
      res.status(200).json({ thoughts });
    } else {
      return res.status(400).json({ message: "not thoughts" });
    }
  } catch (error) {
    console.log(error);
  }
};
export const updateThought = async (req, res) => {
  try {
    const { _id } = req.params;
    const data = req.body;
    const isThought = await thoughtSchema.findOne({ _id: _id });
    if (isThought) {
      const updatedThought = await thoughtSchema.findByIdAndUpdate(
        { _id },
        data,
        { new: true }
      );
      console.log(updatedThought);
      res.status(201).json({ message: "thought updated successfully " });
    } else {
      return res.status(400).json({ error: "thought not exists" });
    }
  } catch (error) {
    console.log(error);
  }
};
export const deleteThought = async (req, res) => {
  console.log("jjjjjjjjj");
  try {
    const { _id } = req.params;
    // console.log("reqq", req.body);
    console.log(_id);
    // const { _id } = req.body;
    const isThought = await thoughtSchema.findOne({ _id: _id });
    if (isThought) {
      const deleted = await thoughtSchema.findByIdAndDelete({ _id });

      res.status(201).json({ message: "thought deleted successfully " });
    } else {
      return res.status(400).json({ error: "thought not exists" });
    }
  } catch (error) {
    console.log(error);
  }
};

// export const likeThought = async (req, res) => {
//   // console.log("00", req.user);
//   try {
//     const _id = req.body;
//     console.log(_id);
//     console.log("hghgh", req.user._id);

//     const likePresent = await thoughtSchema
//       .findOne({ _id })
//       .where("likedBy")
//       .in([req.user._id])
//       .count()
//       .exec();

//     console.log("baby", likePresent);
//     console.log("kkkkkkkk");
//     let updatedThought;
//     if (!likePresent) {
//       updatedThought = await thoughtSchema.findByIdAndUpdate(
//         _id,
//         {
//           $inc: { likeCount: 1 },
//           $push: { likedBy: req.user._id },
//         },

//         { new: true }
//       );
//     } else {
//       updatedThought = await thoughtSchema.findByIdAndUpdate(
//         _id,
//         {
//           $inc: { likeCount: -1 },
//           $pull: { likedBy: req.user._id },
//         },

//         { new: true }
//       );
//     }

//     console.log(updatedThought);
//     if (updatedThought) {
//       // const user = await userSchema.findOne({ _id: req.user._id });

//       const thoughts = await thoughtSchema.find({});
//       if (thoughts) {
//         res.status(201).json({ thoughts, name: user.name });
//       } else {
//         return res.status(404).json({ error: "no thought" });
//       }
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
export const likeThought = async (req, res) => {
  // console.log("00", req.user);
  try {
    const _id = req.body;
    console.log(_id);
    console.log(_id);
    console.log("hghgh", req.user._id);

    const likePresent = await thoughtSchema
      .findOne({ _id })
      .where("likedBy")
      .in([req.user._id])
      .count()
      .exec();

    console.log("baby", likePresent);
    console.log("kkkkkkkk");
    let updatedThought;
    if (!likePresent) {
      updatedThought = await thoughtSchema.findByIdAndUpdate(
        _id,
        {
          $inc: { likeCount: 1 },
          $push: { likedBy: req.user._id },
        },

        { new: true }
      );
    } else {
      updatedThought = await thoughtSchema.findByIdAndUpdate(
        _id,
        {
          $inc: { likeCount: -1 },
          $pull: { likedBy: req.user._id },
        },

        { new: true }
      );
    }

    console.log(updatedThought);
    if (updatedThought) {
      // const user = await userSchema.findOne({ _id: req.user._id });

      const thoughts = await thoughtSchema
        .find({})
        // .select("_id name detail likeCount likedBy")
        .populate("likedBy");
      if (thoughts) {
        res.status(201).json({ thoughts });
      } else {
        return res.status(404).json({ error: "no thought" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
export const signout = async (req, res) => {
  res.status(200).json({ message: "sinout success" });
};
