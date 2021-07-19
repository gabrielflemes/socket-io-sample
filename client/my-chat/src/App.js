import React, { useState, useEffect } from "react";
import './App.css';

//npm i socket.io-client
import io from "socket.io-client";
const socket = io('http://localhost:4000');

function App() {

  const [msg, setMsg] = useState("");
  const [name, setName] = useState("");
  const [history, setHistory] = useState([]);

  //send msg to server
  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit('chatMessage', {
      user: name,
      msg: msg
    })
  }

  //chat messgae event
  socket.on('chatMessage', (msg) => {
    setHistory([...history, msg]);
  });

  //handler form
  const handlerForm = (e) => {
    setMsg(e.target.value)
  }
  const handlerName = (e) => {
    setName(e.target.value)
  }


  //render chat
  const renderChat = () => {
    return history.map((value) => {
      return <li>{value.user} : {value.msg}</li>
    })
  }





  return (
    <div>
      <h1>Type your name:</h1>
      <input type='text' value={name} onChange={handlerName} placeholder='type here your name'></input>

      <input type='text' value={msg} onChange={handlerForm} placeholder='type here your message'></input>
      <input type='button' onClick={sendMessage} value='send'></input>

      <ul>
        {renderChat()}
      </ul>
    </div>
  );
}

export default App;
