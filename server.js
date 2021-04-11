require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
const publicPath = path.join(__dirname, "..", "/client/public");
app.use(express.static(publicPath));
app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});
//Routes
app.use("/api", require("./routes/authRouter"));
app.use;
const URI = process.env.MONGODB_URL;
mongoose.connect(
  URI,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("connected to mongo babyy");
  }
);
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server is runninig on port ", port);
});
