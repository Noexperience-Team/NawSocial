import { Avatar } from "@material-ui/core";
import React from "react";
import "./Story.css";
const Story = ({ image, profileSrc, title, theme }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        filter: `${theme ? "invert(1)" : "invert(0)"}`,
      }}
      className="story"
    >
      <Avatar src={profileSrc} className="story__avatar" />
      <h4>{title}</h4>
    </div>
  );
};

export default Story;
