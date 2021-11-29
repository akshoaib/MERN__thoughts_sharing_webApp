import userSchema from "../models/auth.js";

import jwt from "jsonwebtoken";
export const signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const isEmail = await userSchema.findOne({ email: email });
    if (isEmail) {
      return res.status(400).json({ error: "user aready exists" });
    } else {
      const user = new userSchema({ email, password, name });
      await user.save();
      res.status(201).json({ message: "user created successfully" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const isEmail = await userSchema.findOne({ email: email });
    if (isEmail) {
      if (isEmail.password === password) {
        const token = jwt.sign(
          { _id: isEmail._id },
          process.env.SECRET_KEY,

          { expiresIn: "2h" }
        );
        console.log(isEmail);
        res.status(201).json({
          message: "signin success",
          token,
          _id: isEmail._id,
          name: isEmail.name,
        });
      } else {
        res.status(400).json({ message: "wrong credentials" });
      }
    } else {
      return res.status(400).json({ message: "user not registered" });
    }
  } catch (error) {
    console.log(error);
  }
};
export const getUserById = async (req, res) => {
  try {
    const { _id } = req.params;
    console.log(_id);
    const thought = await userSchema.find({
      _id: _id,
    });
    if (thought) {
      res.status(200).json({ thought });
      console.log(thought);
      // const y = thought.map((val) => {
      //   return val.addedBy;
      // });
      // console.log(y);
      // res.status(200).json("success");
    } else {
      return res.status(400).json({ message: "thought not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

