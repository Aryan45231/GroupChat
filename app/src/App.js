  import React, { useState } from 'react';
import { io } from 'socket.io-client';       // FOR CLIENT SIDE SOCKET CONNECTION
const socket = io.connect("http://localhost:2000")    // MAKING CONNECTION WITH BACKEND USING URL
import './App.css';
import Chat from './compnents/Chat';

const App = () => {
  const [userName, setUserName] = useState("")
  const [room, setRoom] = useState("")
  const [show, setShow] = useState(false)
  const joinRoom = async () => {
    console.log(room)
    if (userName !== "" && room !== "") {
      await socket.emit("join-room", room)      // EMITING  AN EVENT   CREATED ON BACKEND ADN SENDIGN THE DATA
      setShow(true)
    }
  }
  return <div>
    {!show ?
      (
        <div className='userDetail'>
          <h1>
            Join the Chat
          </h1>
          <input type='text' onChange={
            event => {
              setUserName(event.target.value)
            }
          } placeholder=' enter your name' />
          <input type='text' onChange={(event) => { setRoom(event.target.value) }} placeholder='Enter the Room Number ' />
          <button onClick={joinRoom}> Join The Chat</button>
        </div>
      )
      :
      <Chat socket={socket} userName={userName} room={room} />
    }


  </div>

}
export default App;
