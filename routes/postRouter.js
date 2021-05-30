const express = require("express");

const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const bodyParser = require("body-parser");
const path = require("path");
const Pusher = require("pusher");
const { resolve } = require("path");
const mongoPosts = require("../models/postModel.js");
Grid.mongo = mongoose.mongo;

const pusher = new Pusher({
  appId: "1173655",
  key: "09af0cdb1b580cee3f74",
  secret: "119fe2f7dd4ea043db3b",
  cluster: "eu",
  useTLS: true,
});
//middlewares
const app = express();
app.use(bodyParser.json());
app.use(cors());
//db config
const mongoURI =
  "mongodb+srv://fbclient:4qLvn3a59D3jyb65@cluster0.r0di2.mongodb.net/Naw-db?retryWrites=true&w=majority";
const conn = mongoose.createConnection(mongoURI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  console.log("DB Connected");
  const changeStream = mongoose.connection.collection("posts").watch();
  changeStream.on("change", (change) => {
    if (change.operationType === "insert") {
      pusher.trigger("posts", "inserted", {
        chnage: change,
      });
    }
  });
});
let gfs;
conn.once("open", () => {
  console.log("DB Connected");
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("images");
});
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = `image-${Date.now()}${path.extname(file.originalname)}`;
      const fileInfo = {
        filename: filename,
        bucketName: "images",
      };
      resolve(fileInfo);
    });
  },
});

const upload = multer({ storage });
app.get("/", (req, res) => res.status(200).send("hello world"));
app.post("/upload/image", upload.single("file"), (req, res) => {
  res.status(201).send(req.file);
});
app.post("/upload/post", (req, res) => {
  const dbPost = req.body;
  mongoPosts.create(dbPost, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});
app.get("/retrieve/posts", (req, res) => {
  mongoPosts.find((err, data) => {
    if (err) {
      req.status(500).send(err);
    } else {
      data.sort((b, a) => {
        return a.timestamp - b.timestamp;
      });
      res.status(200).send(data);
    }
  });
});
app.get("/retrieve/images/single", (req, res) => {
  gfs.files.findOne({ filename: req.query.name }, (err, file) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (!file || file.length === 0) {
        res.status(404).json({ err: "file not  found" });
      } else {
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
      }
    }
  });
});
module.exports = app;
