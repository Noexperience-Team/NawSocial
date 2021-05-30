import { Avatar } from "@material-ui/core";
import { ExpandMoreOutlined } from "@material-ui/icons";
import React from "react";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import NearMeIcon from "@material-ui/icons/NearMe";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import "./Post.css";
const Post = ({ profilePic, imgName, username, timestamp, message, theme }) => {
  return (
    <div className="post">
      <div className="post__top">
        <Avatar
          src={profilePic}
          className="post__avatar"
          style={{ filter: `${theme ? "invert(1)" : "invert(0)"}` }}
        />
        <div className="post__topInfo">
          <h4>{username}</h4>
          <p>{new Date(parseInt(timestamp)).toUTCString()}</p>
        </div>
      </div>
      <div className="post__bottom">
        <p>{message}</p>
      </div>

      {imgName ? (
        <div className="post__image">
          <img
            src={`https://nawsocial.herokuapp.com/retrieve/images/single?name=${imgName}`}
            style={{ filter: `${theme ? "invert(1)" : "invert(0)"}` }}
          />
        </div>
      ) : (
        console.log("DEBUG >>> no image here")
      )}

      <div className="post__options">
        <div className="post__option">
          <ThumbUpIcon
            style={{ filter: `${theme ? "invert(1)" : "invert(0)"}` }}
          />
          <p>Like</p>
        </div>
        <div className="post__option">
          <ChatBubbleOutlineIcon
            style={{ filter: `${theme ? "invert(1)" : "invert(0)"}` }}
          />
          <p>Comment</p>
        </div>
        <div className="post__option">
          <NearMeIcon
            style={{ filter: `${theme ? "invert(1)" : "invert(0)"}` }}
          />
          <p>Share</p>
        </div>
        <div className="post__option">
          <AccountCircleIcon
            style={{ filter: `${theme ? "invert(1)" : "invert(0)"}` }}
          />
          <ExpandMoreOutlined
            style={{ filter: `${theme ? "invert(1)" : "invert(0)"}` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Post;
