import React, { useEffect, useState } from "react"
import "./Chat.css"
import ScrollToBottom from "react-scroll-to-bottom"
const Chat = ({ socket, userName, room }) => {

    const [messages, setMeddages] = useState("")    //  STORE MESSAGES  CLIENT WRITE
    const [messageList, setMessageList] = useState([])   // STORING ALL MESSAGES ON THE ARRAY 
    useEffect(async () => {
        const messageData = {
            messages: `${userName} Joined`, userName, room,
            time: new Date(Date.now()).getHours()
                + ":"
                + new Date(Date.now()).getMinutes()

        }
        await socket.emit("sendmessages", messageData)
    }, 1)
    const send = async () => {
        if (messages !== "") {
            const messageData = {
                messages, userName, room,
                time: new Date(Date.now()).getHours()
                    + ":"
                    + new Date(Date.now()).getMinutes()
            }

            await socket.emit("sendmessages", messageData)
            setMessageList(list => [...list, messageData])
            setMeddages("")
            document.getElementById("messageinput").value = ""
        }
    }
    useEffect(() => {
        console.log("running")
        socket.on("recive_message", (data) => {
            setMessageList(list => [...list, data])
        })
    }, [socket])
    return <div className="chatBoxContainer">
        <div className="chatHeader">
            <h1> Live Chat</h1>
        </div>
        <div className="chatbocy">
            < ScrollToBottom className="chatScrollCOntainer">
                {
                    messageList.map((messageCOntent) => {
                        return (
                            <div className="messageBox" id={messageCOntent.userName === userName ? "you" : "others"}>
                                <div className="messages">
                                    {messageCOntent.messages}
                                </div>
                                <h4>  {messageCOntent.userName}</h4>
                            </div>
                        )
                    })
                }
            </ScrollToBottom>
        </div>
        <div className="chatFooter">
            <input type="text" placeholder="messages" id="messageinput" onChange={
                event => {
                    setMeddages(event.target.value)
                }

            }
                onKeyUp={
                    event => {
                        if (event.key == "Enter") {
                            send()

                        }
                    }
                } />
            <button onClick={send}>   &#9658;</button>
        </div>
    </div>
}
export default Chat
