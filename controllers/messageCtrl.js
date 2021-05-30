const { model } = require("mongoose");
const mongoData = require("../models/messageModel");
const messageCtrl = {
  conversation: async (req, res) => {
    const dbData = req.body;

    mongoData.create(dbData, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(data);
      }
    });
  },
  conversationList: async (req, res) => {
    mongoData.find((err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        data.sort((b, a) => {
          return a.timestamp - b.timestamp;
        });

        let conversations = [];

        data.map((conversationData) => {
          const conversationInfo = {
            id: conversationData._id,
            name: conversationData.chatName,
            timestamp: conversationData.conversation[0].timestamp,
          };

          conversations.push(conversationInfo);
        });

        res.status(200).send(conversations);
      }
    });
  },
  message: async (req, res) => {
    mongoData.updateMany(
      { _id: req.query.id },
      { $push: { conversation: req.body } },
      (err, data) => {
        if (err) {
          console.log("Error saving message...");
          console.log(err);

          res.status(500).send(err);
        } else {
          res.status(201).send(data);
        }
      }
    );
  },
  conversationGet: async (req, res) => {
    const id = req.query.id;

    mongoData.find({ _id: id }, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  },
  lastMessage: async (req, res) => {
    const id = req.query.id;

    mongoData.find({ _id: id }, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        console.log(data);
        let convData = data[0].conversation;

        convData.sort((b, a) => {
          return a.timestamp - b.timestamp;
        });

        res.status(200).send(convData[0]);
      }
    });
  },
  delete: async (req, res) => {
    const id = req.query.id;

    mongoData.findByIdAndDelete({ _id: id }, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send("deleted");
      }
    });
  },
};
module.exports = messageCtrl;
