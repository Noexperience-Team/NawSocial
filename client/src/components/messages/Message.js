import { Avatar } from "@material-ui/core";
import React, { forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import "../../style/Message.css";
import ReactEmoji from "react-emoji";

const Message = forwardRef(({ id, sender, message, timestamp }, ref) => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div
      ref={ref}
      className={`message ${
        auth.user.email === sender.email && "message__sender"
      }`}
    >
      <Avatar className="message__photo" src={sender.avatar} />
      <p>{ReactEmoji.emojify(message)}</p>
      <small>{new Date(parseInt(timestamp)).toDateString()}</small>
    </div>
  );
});

export default Message;
