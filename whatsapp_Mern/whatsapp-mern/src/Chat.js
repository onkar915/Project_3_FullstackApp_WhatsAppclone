import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, Search, SearchOutlined } from '@material-ui/icons';
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MicIcon from "@material-ui/icons/Mic";
import React, { useState } from 'react'
import "./Chat.css"
import axios from "./axios"
function Chat({messages}) {



     const [input, setInput] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    await axios.post("/messages/new", {
      message: input,
      name: "yso",
      timestamp: "Just now",
      received: false,
    });

    setInput("");
  };
    return (
        <div className="chat">
           <div className="chat_header">
               <Avatar/>

               <div className="chat_headerInfo">

<h3 >Room Name</h3>
<p>Last Seen at...</p>
 </div>
<div className="chat_headerRight">
 <IconButton>
<SearchOutlined/>
</IconButton>
  <IconButton>
<AttachFile/>
</IconButton>
<IconButton>
<MoreVertIcon/>
</IconButton>


</div>
               </div> 

<div className="chat_body">
{messages.map((message) =>

<p className={`chat_message  ${message.received && "chat_receiver"}  `}>
    <span className="chat_name">{message.name}</span>
  {message.message}

    <span className="chat_timestamp">
        {new Date().toUTCString()
        }
    </span>
   </p>

)}

<p className="chat_message chat_receiver">
    <span className="chat_name">Onn </span>
   i am hardcoded

    <span className="chat_timestamp">
        {new Date().toUTCString()
        }
    </span>
   </p>


 
</div>
    <div className="chat__footer">
        <InsertEmoticonIcon />
        <form>
          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            type="text"
            placeholder="Type a message"
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <MicIcon />
      </div>
        </div>
    )
}

export default Chat
