import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Widget.css";
const Widget = () => {
  const dispatch = useDispatch();
  const { auth, theme } = useSelector((state) => state);
  return (
    <div className="widgets">
      <iframe
        src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fdata.isitcom%2F&tabs=timeline&width=340&height=1500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
        width="340"
        height="700"
        style={{
          border: "none",
          overflow: "hidden",
          filter: `${theme ? "invert(1)" : "invert(0)"}`,
        }}
        scrolling="no"
        frameBorder="0"
        allowTransparency="true"
        allow="encrypted-media"
      ></iframe>
    </div>
  );
};

export default Widget;
