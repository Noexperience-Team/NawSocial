import React, { useEffect, useState } from "react";
import "../../style/Chat.css";
import SendIcon from "@material-ui/icons/Send";
import EmojiIcon from "@material-ui/icons/EmojiEmotions";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import { selectChatId, selectChatName } from "./features/chatSlice";
import { selectUser } from "./features/userSlice";
import FlipMove from "react-flip-move";
import axios from "./axios.js";
import Pusher from "pusher-js";
import Picker from "emoji-picker-react";
import Dropdown from "react-bootstrap/Dropdown";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import { useRef } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
const pusher = new Pusher("09af0cdb1b580cee3f74", {
  cluster: "eu",
});

function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const { auth } = useSelector((state) => state);

  const chatId = useSelector((state) => state.chat.chatId);
  const chatName = useSelector(selectChatName);

  const dispatch = useDispatch();

  const user = auth.user;

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };
  window.HTMLElement.prototype.scrollIntoView = function () {};
  const getConversation = (chatId) => {
    if (chatId) {
      axios.get(`/get/conversation?id=${chatId}`).then((res) => {
        setMessages(res.data[0].conversation);
      });
    }
  };
  let ell = useRef(null);
  useEffect(() => {
    getConversation(chatId);
    console.log(ell.current);
    const scroll = ell.current?.scrollHeight - ell.current?.clientHeight;
    ell.current?.scrollTo(0, scroll);

    const channel = pusher.subscribe("messages");
    console.log("triggerMsg");
    channel.bind("newMessage", function (data) {
      getConversation(chatId);
    });
    const channel2 = pusher.subscribe("delete");
    channel2.bind("deleted", (data) => {
      setMessages([]);
    });
  }, [chatId]);

  const sendMessage = (e) => {
    e.preventDefault();
    axios.post(`/new/message?id=${chatId}`, {
      message: input,
      timestamp: Date.now(),
      user: user,
    });

    setInput("");
  };

  const sendThumb = (e) => {
    e.preventDefault();
    axios.post(`/new/message?id=${chatId}`, {
      message: "👍",
      timestamp: Date.now(),
      user: user,
    });
  };

  const deleteConversation = (e) => {
    if (chatId) {
      axios.delete(`/delete/conversation?id=${chatId}`).then((res) => {
        //setMessages(res.data[0].conversation)

        console.log("chat deleted");
      });
    }
  };

  return (
    <div className="chat">
      {/* chat header */}
      <div className="chat__header">
        <h4>
          To:
          <span className="chat__name"> {chatName}</span>
        </h4>

        <div
          className="delete__me"
          disabled={!chatName}
          onClick={deleteConversation}
        >
          Delete me
        </div>
      </div>

      {/* chat messages */}

      <div className="chat__messages">
        <ScrollToBottom>
          <FlipMove className="bb">
            {messages.map(({ user, _id, message, timestamp }) => (
              <Message
                key={_id}
                id={_id}
                sender={user}
                message={message}
                timestamp={timestamp}
                ref={ell}
              />
            ))}
          </FlipMove>
        </ScrollToBottom>
      </div>

      {/* chat input */}
      <div className="chat__input">
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="ikteb hneye"
            type="text"
          />

          <button onClick={sendMessage}>Send Message</button>
        </form>

        <SendIcon
          className="send__icon"
          disabled={!input}
          type="submit"
          onClick={sendMessage}
        />

        <ThumbUpIcon className="thumb__icon" onClick={sendThumb} />

        <Dropdown drop="up">
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            <EmojiIcon />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Picker onEmojiClick={onEmojiClick} />
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}

export default Chat;
