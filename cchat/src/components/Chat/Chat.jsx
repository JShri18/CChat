import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
import "./Chat.css";
import {user} from "../Join/Join";
import socketIo from "socket.io-client";
import Message from '../Message/Message';
import {ReactScrollToBottom} from "react-scroll-to-bottom";
import userA from "../../images/userA.png";

const ENDPOINT = "http://localhost:4500/";
let socket;
const Chat = () => {

    const [id, setid] = useState("");
    const [messages, setmessages] = useState([]);

    const send = ()=>{
        const message = document.getElementById('chatInput').value;
        socket.emit('message',{message,id});
        document.getElementById('chatInput').value="";

    }
 
    console.log(messages);
    useEffect(() => {
    socket = socketIo(ENDPOINT,{transport:['websocket']});
        socket.on('connect',()=>{
            alert('connected');
            setid(socket.id);
        });
        console.log(socket);

        socket.emit('joined',{user:user})//emit means sending user to backend
        socket.on('welcome',(data)=>{
            setmessages([...messages,data]);
            console.log(data.user,data.message);
        })

        socket.on('userJoined',(data)=>{
            setmessages([...messages,data]);
            console.log(data.user,data.message);
        })

        socket.on('leave',(data)=>{
            setmessages([...messages,data]);
            console.log(data.user,data.message);
        })
      return () => {
          socket.emit('disconnected');
          socket.off();
      }
    }, []);

    useEffect(() => {
      socket.on('sendMessage',(data)=>{
          setmessages([...messages,data]);
          console.log(data.user,data.message,data.id);
      })
    
      return () => {
        
      }
    }, [messages]);
    
    
    return ( 
        <div className='chatPage'>
            <div className="chatContainer">
                <div className="header">
                    <div className="userHead">
                        <img src={userA} alt="" id='userA'/>
                        <div className="user">{user}</div>
                    </div>
                </div>
                <div className="chatBox">
                    {
                        messages.map((e,i)=>
                                <Message user={e.id===id?'':e.user} message={e.message} classs={e.id===id ?'right':'left'}/>)
                    }
                </div>
                <div className="inputBox">
                    <input type="text" id="chatInput" placeholder='type your message' />
                    <button onClick={send} className="sendBtn">Send</button>
                </div>
            </div>
        </div>
  )
}
export default Chat;
