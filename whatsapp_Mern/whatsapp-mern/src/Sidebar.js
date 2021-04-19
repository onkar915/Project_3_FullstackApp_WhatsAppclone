import React from 'react'
import './Sidebar.css'
import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Avatar,IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import SidebarChat from './SidebarChat';
function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar_header"> 
            <Avatar src="https://i.pinimg.com/originals/b3/a2/6b/b3a26b630f8e5ab7a4f0928c17c047f0.jpg"/>
            
            <div className="sidebar_headerRight">
                <IconButton>
<ChatIcon/>
</IconButton>
  <IconButton>
<DonutLargeIcon/>
</IconButton>
<IconButton>
<MoreVertIcon/>
</IconButton>
            </div>
            </div>
            <div className="sidebar_search">
             <div className="sidebar_searchContainer">
<SearchOutlined/>
<input placeholder="Search or start new chat" type ="text"/>
             </div>
            </div>

       <div className="sidebar_chats">
           <SidebarChat/>
           <SidebarChat/>
           <SidebarChat/>

           </div>     
        </div>
    )
}

export default Sidebar
