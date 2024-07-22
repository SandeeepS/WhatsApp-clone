import React from 'react'
import "./Chat.css";
import { Avatar, IconButton } from '@mui/material';
import { AttachFile, MoreVert, SearchOutlined } from '@mui/icons-material';

function Chat() {
  return (
    <div className='chat'>
        <div className="chat__header">
            <Avatar/>

            <div className="chat__headerInfo">
                <h3>Room name</h3>
                <p>Last seen at ....</p>
            </div>

            <div className="chat__headerRight">
                <IconButton>
                    <SearchOutlined/>
                </IconButton>
                <IconButton>
                    <AttachFile/>
                </IconButton>
                <IconButton>
                    <MoreVert/>
                </IconButton>
            </div>
            
        </div>
    </div>
  )
}

export default Chat
