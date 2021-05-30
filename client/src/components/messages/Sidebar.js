import React, { useEffect, useState } from "react";
import "../../style/Sidebar.css";
import { IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import MessageIcon from "@material-ui/icons/Message";
import SidebarChat from "./SidebarChat";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "./features/userSlice";
import axios from "./axios.js";
import Pusher from "pusher-js";

const pusher = new Pusher("09af0cdb1b580cee3f74", {
  cluster: "eu",
});

function Sidebar() {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const user = auth.user;
  const [chats, setChats] = useState([]);

  const getChats = () => {
    axios.get("/get/conversationList").then((res) => {
      setChats(res.data);
    });
  };

  useEffect(() => {
    getChats();
    const channel = pusher.subscribe("chats");
    channel.bind("newChat", function (data) {
      getChats();
    });
    const channel2 = pusher.subscribe("delete");
    channel2.bind("deleted", (data) => {
      getChats();
    });
  }, []);

  const addChat = (e) => {
    e.preventDefault();

    const chatName = prompt("Please enter a chat name");
    const firstMsg = prompt("Please send a welcome message");

    if (chatName && firstMsg) {
      let chatId = "";

      axios
        .post("/new/conversation", {
          chatName: chatName,
        })
        .then((res) => {
          chatId = res.data._id;
        })
        .then(() => {
          axios.post(`/new/message?id=${chatId}`, {
            message: firstMsg,
            timestamp: Date.now(),
            user: user,
          });
        });
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__input">
          <SearchIcon />
          <input placeholder="search" />
        </div>

        <IconButton
          variant="outlined"
          className="sidebar__inputButton"
          onClick={addChat}
        >
          <MessageIcon />
        </IconButton>
      </div>

      <div className="sidebar__chats">
        {/*<IconButton className='delete__icon'>
                        <DeleteIcon />
                  </IconButton> */}

        {chats.map(({ id, name, timestamp }) => (
          <SidebarChat key={id} id={id} chatName={name} timestamp={timestamp} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
