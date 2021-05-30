import React from "react";
import "../../style/IMessage.css";

import Sidebar from "./Sidebar";
import Chat from "./Chat";

function IMessage() {
  return (
    <div className="imessage">
      {/* Header */}

      {/* sidebar */}
      <div className="app__body">
        <Sidebar />

        {/* chat */}
        <Chat />
      </div>
    </div>
  );
}

export default IMessage;
