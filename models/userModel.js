const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
      maxlength: 30,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      maxlength: 30,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://cdn.trendhunterstatic.com/thumbs/human-facebook-default-avatar.jpeg",
    },
    coverture: {
      type: String,
      default:
        "http://2.bp.blogspot.com/-FhhuGrUAI_s/VEfIuD83P-I/AAAAAAAAasA/j4bOTM9m_4k/s1600/couverture-facebook-developer_06.jpg",
    },
    role: {
      type: String,
      default: "Student",
    },
    gender: { type: String, default: "male" },
    mobile: { type: String, default: "" },
    address: { type: String, default: "" },
    story: {
      type: String,
      default: "",
      maxlength: 200,
    },
    website: { type: String, default: "" },
    followers: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    following: [{ type: mongoose.Types.ObjectId, ref: "user" }],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("user", userSchema);
