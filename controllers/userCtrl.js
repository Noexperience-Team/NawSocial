const Users = require("../models/userModel");
const userCtrl = {
  searchUser: async (req, res) => {
    try {
      const users = await Users.find({
        username: { $regex: req.query.username },
      })
        .limit(10)
        .select("fullname username avatar");
      res.json({ users });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await Users.findById(req.params.id).select("-password");
      if (!user) return res.status(400).json({ msg: "ما فماش منو" });
      res.json({ user });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateUser: async (req, res) => {
    try {
      const {
        avatar,
        coverture,
        fullname,
        mobile,
        address,
        story,
        website,
        gender,
      } = req.body;
      if (!fullname) {
        return res.status(400).json({ msg: "نسيت إسمك" });
      }
      await Users.findOneAndUpdate(
        { _id: req.user._id },
        { avatar, coverture, fullname, mobile, address, story, website, gender }
      );
      res.json({ msg: "تمت العملية بنجاح" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  follow: async (req, res) => {
    try {
      const user = await Users.find({
        _id: req.params.id,
        followers: req.user._id,
      });
      if (user.length > 0)
        return res.status(500).json({ msg: " ديجا تبع فيه" });
      await Users.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { followers: req.user._id } },
        { new: true }
      );
      await Users.findOneAndUpdate(
        { _id: req.user._id },
        { $push: { following: req.params._id } },
        { new: true }
      );
      res.json({ msg: "مريقل هاك تبع فيه" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  unfollow: async (req, res) => {
    try {
      await Users.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { followers: req.user._id } },
        { new: true }
      );
      await Users.findOneAndUpdate(
        { _id: req.user._id },
        { $pull: { following: req.user._id } },
        { new: true }
      );
      res.json({ msg: "مريقل هاك ماعادش تبع فيه" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};
module.exports = userCtrl;
