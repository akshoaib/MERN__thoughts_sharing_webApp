import followerSchema from "../models/follower.js";

export const addFollowing = async (req, res) => {
  try {
    const { _id } = req.params;
    let k;
    console.log("ddd", _id);
    const user = req.user._id;

    const userPresent = await followerSchema.findOne({ user: req.user._id });

    if (!userPresent) {
      console.log("oooo");
      const fg = { user, following: _id };
      const myuser = new followerSchema(fg);
      const as = await myuser.save();
      res.status(201).json({ as });
    } else {
      const isFollowingPresent = await followerSchema
        .findOne({ user })
        .where("following")
        .in([_id])
        .count()
        .exec();
      console.log(isFollowingPresent);

      if (!isFollowingPresent) {
        console.log("no");
        k = await followerSchema.findOneAndUpdate(
          user,
          {
            $push: { following: _id },
          },
          { new: true }
        );
      } else {
        console.log("yes");

        k = await followerSchema.findOneAndUpdate(
          user,
          {
            $pull: { following: _id },
          },
          { upsert: true }
        );
      }
    }

    if (k) {
      const following = await followerSchema.find({}).populate("followers");
      if (following) {
        res.status(201).json({ following });
      } else {
        return res.status(404).json({ error: "no following" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const getFollowing = async (req, res) => {
  try {
    console.log("jj");
    const following = await followerSchema
      .find({ user: req.user._id })
      .populate("following");
    if (following) {
      console.log(following);
      res.status(200).json({ following });
    }
  } catch (error) {
    console.log(error);
  }
};
