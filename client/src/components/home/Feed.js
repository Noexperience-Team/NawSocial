import { PostAddSharp } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import MessageSender from "./MessageSender";
import StoryReel from "./StoryReel";
import "./Feed.css";
import Post from "./Post";
import axios from "./axios";
import Pusher from "pusher-js";
import { useSelector, useDispatch } from "react-redux";

const pusher = new Pusher("09af0cdb1b580cee3f74", {
  cluster: "eu",
});
const Feed = () => {
  const { auth, theme } = useSelector((state) => state);
  const [profilePic, setProfilePic] = useState("");
  const [postsData, setPostsData] = useState([]);
  const dispatch = useDispatch();
  const syncFeed = () => {
    axios.get("/retrieve/posts").then((res) => {
      console.log(res.data);
      setPostsData(res.data);
    });
  };
  useEffect(() => {
    const channel = pusher.subscribe("posts");
    console.log("trigger1");
    channel.bind("inserted", function (data) {
      syncFeed();
    });
  });
  useEffect(() => {
    syncFeed();
  }, []);
  return (
    <div className="feed">
      <StoryReel />
      <MessageSender />

      {postsData.map((entry) => (
        <Post
          profilePic={entry.avatar}
          imgName={entry.imgName}
          username={entry.user}
          message={entry.text}
          timestamp={entry.timestamp}
          theme={theme}
        />
      ))}
    </div>
  );
};

export default Feed;
