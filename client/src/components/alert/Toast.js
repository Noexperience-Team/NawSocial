import React from "react";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import IconButton from "@material-ui/core/IconButton";

const Toast = ({ msg, handleShow, bgColor }) => {
  return (
    <div
      className={`toast show position-fixed text-light ${bgColor}`}
      style={{ top: "5px", right: "5px", minWidth: "200px", zIndex: 50 }}
    >
      <div className={`toast-header text-light ${bgColor}`}>
        <strong className="mr-auto text-light ">{msg.title}</strong>
        <IconButton
          className="ml-2 mb-1 close text-light"
          style={{ right: "-50%" }}
          color="primary"
          aria-label="upload picture"
          component="span"
          onClick={handleShow}
        >
          <CloseOutlinedIcon />
        </IconButton>
      </div>
      <div className="toast-body">{msg.body}</div>
    </div>
  );
};

export default Toast;
