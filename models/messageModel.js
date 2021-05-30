const mongoose = require("mongoose");

const imessageSchema = mongoose.Schema({
  chatName: String,
  conversation: [
    {
      message: String,
      timestamp: String,
      user: {
        fullname: String,
        email: String,
        avatar: String,
        _id: String,
      },
    },
  ],
});

module.exports = mongoose.model("conversations", imessageSchema);
