import { useEffect, useState } from "react";
import "./App.css";
import Chat from "./Components/ChatComponent/Chat";
import Sidebar from "./Components/SideBar/Sidebar";
import Pusher from "pusher-js";
import axios from "./axios";

function App() {

  const [messages,setMessages] = useState([]);
  useEffect(() => {
    axios.get("/messages/sync").then((response) => {
      console.log(response.data);
      setMessages(response.data);
    });
  }, []);

  useEffect(() => {
    var pusher = new Pusher("5dad1c29f09dcee0dbf6", {
      cluster: "ap2",
   });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (newMessages) => {
      setMessages((currentMessages) => [...currentMessages, newMessages]); // Use functional update
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }
  }, [messages]);

  console.log(messages);

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat messages = {messages} />
      </div>
    </div> 
  );
}

export default App;
