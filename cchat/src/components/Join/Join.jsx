import React, { useState } from 'react';
import "./join.css";
import { Link } from "react-router-dom";
import logo1 from "../../images/logo1.png"
import logo2 from "../../images/logo2.png"

let user;

const Join = () => {

  const [name, setname] = useState("");
  const sendUser = () =>{
    user=document.getElementById('joinInput').value;
  }
  return (
    <div className='JoinPage'>
      <div className="JoinContainer">
        <div className="joinHeader">
          <img src={logo2} alt="" id='logo2' />
          <h1>C CHAT</h1>
        </div>
       
        <input type="text" id="joinInput"  onChange={(e)=>setname(e.target.value)}/>
        <Link onClick={(e)=>name ? null: e.preventDefault() } to="/chat"><button className="joinBtn" onClick={sendUser}>Login In</button></Link>
      </div>        
    </div>  
  )
}

export default Join;
export {user};