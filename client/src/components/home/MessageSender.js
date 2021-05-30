import { Avatar, Input } from "@material-ui/core";
import VideocamIcon from "@material-ui/icons/Videocam";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import React, { useState } from "react";
import "./MessageSender.css";

import { useSelector, useDispatch } from "react-redux";
import axios from "./axios";
import FormData from "form-data";
const MessageSender = () => {
  const { auth, theme } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (image) {
      const imgForm = new FormData();
      imgForm.append("file", image, image.name);
      axios
        .post("/upload/image", imgForm, {
          headers: {
            accept: "application/json",
            "Accept-Language": "en-US,en;q=0.8",
            "Content-Type": `multipart/form-data;boundary=${imgForm._boundary}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          const postData = {
            text: input,
            imgName: res.data.filename,
            user: auth.user.fullname,
            avatar: auth.user.avatar,
            timestamp: Date.now(),
          };
          console.log(postData);
          savePost(postData);
        });
    } else {
      const postData = {
        text: input,
        user: auth.user.fullname,
        avatar: auth.user.avatar,
        timestamp: Date.now(),
      };
      console.log(postData);
      savePost(postData);
    }
    setImageUrl("");
    setInput("");
    setImage(null);
  };
  const savePost = async (postData) => {
    await axios.post("/upload/post", postData).then((resp) => {
      console.log(resp);
    });
  };

  return (
    <div className="messageSender">
      <div className="messageSender__top">
        <Avatar
          src={auth.user.avatar}
          style={{ filter: `${theme ? "invert(1)" : "invert(0)"}` }}
        />
        <form>
          <input
            type="text"
            className="messageSender__input"
            placeholder="فرغ قليبك"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <input
            type="file"
            className="messageSender__fileSelector"
            onChange={handleChange}
          />
          <button onClick={handleSubmit} type="submit">
            Hidden Submit
          </button>
        </form>
      </div>
      <div className="messageSender__bottom">
        <div className="messageSender__option">
          <VideocamIcon style={{ color: "red" }} />
          <h3>نحلو على المباشر</h3>
        </div>
        <div className="messageSender__option">
          <PhotoLibraryIcon style={{ color: "green" }} />
          <h3>تصاور و فيديوهات</h3>
        </div>
        <div className="messageSender__option">
          <InsertEmoticonIcon style={{ color: "orange" }} />
          <h3>شنية الجو؟</h3>
        </div>
      </div>
    </div>
  );
};

export default MessageSender;
