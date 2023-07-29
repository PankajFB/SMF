import React, { useEffect, useState ,useRef } from "react";
import styles from "@/styles/Chat.module.css";
import { useSocket } from "@/Context/SocketContext";
import Image from "next/image";

function Chat(props) {

  console.log(props.chatWith.name);
  console.log(props.chatWith);

  const socket = useSocket();

  //   out outgoing message
  const [outGoingMessage, setOutGoingMessage] = useState("");

  const [IncomingMessage, setIncomingMessage] = useState("");


  const messageEndRef = useRef(null)

  
  useEffect(() => {

    if (messageEndRef.current) {
      messageEndRef.current.scrollTop = messageEndRef.current.scrollHeight;
    }
  }, [outGoingMessage,IncomingMessage,setIncomingMessage]);

  useEffect(() => {
    socket.on("message", (data) => {
      console.log("Message recieved is : " + data);
      setIncomingMessage(data);
      //   <div className={`${styles.message} ${styles.response}`}>hi</div>
      const newElement = document.createElement("div");
      newElement.classList.add(styles.message, styles.joke);
      newElement.innerText = data;
      console.log("we need this");
      console.log(typeof newElement);

      const existingElement = document.getElementById("chat");
      existingElement.insertAdjacentElement("beforeend", newElement);
    });

    return () => {
      socket.off("message");
    };
  }, [socket]);

  //   useEffect(() => {

  //     sendMessageToServer();
  //   }, []);

  const sendMessageToServer = (event) => {
    // socket.emit("message", {
    //   message: outGoingMessage,
    //   email : props.chatWith.friendEmail,
    // });

    if (event.key === 'Enter') {
      console.log('Enter key was pressed');
      socket.emit("message", {
        message: outGoingMessage,
        email : props.chatWith.friendEmail,
      });

      const newElement = document.createElement("div");
      newElement.classList.add(styles.message, styles.response);
      newElement.innerText = outGoingMessage;
      console.log("we need this");
      console.log(typeof newElement);

      const existingElement = document.getElementById("chat");
      existingElement.insertAdjacentElement("beforeend", newElement);


    setOutGoingMessage("");


    }


  };

  return (
    <>
     {props.chatWith.name?  <div className={styles.container}>
        <div className={styles.header}>
          <Image
            src="https://cdn-icons-png.flaticon.com/512/2233/2233922.png"
            alt=""
            height={65}
            width={65}
            className={styles.avatar}
          />
          <h3>{props.chatWith.name}</h3>
         <button >
         <Image
            src="/assets/call.png"
            alt="Call Icon"
            height={65}
            width={65}
            className={styles.avatar}
          />
         </button>
        
          <Image
            src="/assets/video-call.png"
            alt="Call Icon"
            height={65}
            width={65}
            className={styles.avatar}
          />

          {/* <i className="fa-solid fa-video"></i> */}
          {/* <i className="fa-solid fa-ellipsis-vertical"></i> */}
        </div>
        <div id="chat"  className={styles.chat} ref={messageEndRef} >
          <p>Today</p>
          
        </div>
        <div className={styles.input}>
          <input
            type="text"
            placeholder="Type your message here"
            className={styles.inputText}
            value={outGoingMessage}
            onChange={(e) => setOutGoingMessage(e.target.value)}
            onKeyUp={sendMessageToServer}
          />
          <button
            id="jokeBtn"
            className={styles.btn}
            // onClick={sendMessageToServer}
          >
            Send
          </button>
        </div>
      </div> : <></> }

    </>
  );
}

export default Chat;
