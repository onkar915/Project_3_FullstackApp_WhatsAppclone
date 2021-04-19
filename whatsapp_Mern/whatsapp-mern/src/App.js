
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import Pusher from 'pusher-js'
import { useEffect, useState } from 'react';
import axios from "./axios";

function App() {

 const [messages, setMessages] = useState([]);
//fecthing
  useEffect(() => {
    axios.get("/messages/sync").then((response) => {
      setMessages(response.data);
    });
  }, []);

  useEffect(() => {
    const pusher = new Pusher('0db228770c7017211236', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe("message");
    channel.bind("inserted", (newMessage) => {
      //alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage]);
    });
//theres will be only one listenr means subscrieber
//spamm and new lsitenrr evertime
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  console.log(messages);



  return (
    <div className="app">
   <div className="app_body">

   {/*sidebar*/ }
    <Sidebar/>

<Chat messages={messages}/>

    {/**chat component */}

     
   </div>

  
    </div>
  );
}

export default App;
