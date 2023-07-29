import React, { useEffect, useState } from "react";
import { Peer } from "peerjs";
import { useSocket } from "@/Context/SocketContext";
import styles from "@/styles/Call.module.css";




function AudioCall(props) {
  console.log(props.callWith.name);
  console.log(props.callWith.friendEmail);

  const socket = useSocket();

  var peer = new Peer();

  let localVideoStream;

  let peerID;

  let remoteid;

  const [callAnswer, setcallAnswer] = useState({});

  let [status, setstatus] = useState("");




    const getLocalVideo = async () => {

        let abc= window.navigator;

      const stream = await abc.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      localVideoStream = stream;
      console.log(stream);
      const video = document.getElementById("localstream");
      video.srcObject = stream;
      video.addEventListener("loadedmetadata", () => {
        video.play();
      });
    
  }








 

  if ((status = "calling")) {
    getLocalVideo();
  }


// useEffect(() => {
//     // to the the camera and microphone of the user
//     const getLocalVideo = async () => {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: true,
//         audio: true,
//       });
//       localVideoStream = stream;
//       console.log(stream);
//       const video = document.getElementById("localstream");
//       video.srcObject = stream;
//       video.addEventListener("loadedmetadata", () => {
//         video.play();
//       });
//     };

//     if ((status = "calling")) {
//       getLocalVideo();
//     }
 
// }, [])


  

  useEffect(() => {
    peer.on("open", (id) => {
      console.log("My peer ID is: " + id);
      peerID = peer.id;
      console.log(peerID);
      socket.emit("call_req", {
        peerId: peerID,
        email: props.callWith.friendEmail,
      });
      setstatus("calling");
    });

    peer.on("call", (call) => {
      console.log("call received");
      call.answer(localVideoStream);
      call.on("stream", (stream) => {
        const video = document.getElementById("remotestream");
        video.srcObject = stream;
        video.addEventListener("loadedmetadata", () => {
          video.play();
        });
      });
    });
  }, []);

  useEffect(() => {
    socket.on("call_req", (data) => {
      console.log("Call Request recieved is : " + data);
      remoteid = data;
      setstatus("SomeoneCalling");
      acceptCall();
    });

    return () => {
      socket.off("call_req");
    };
  }, []);

  useEffect(() => {}, []);

  const acceptCall = () => {
    const call = peer.call(remoteid, localVideoStream);

    if(call){
      call.on("stream", (remoteStream) => {
        console.log("video stream is coming");
        const remotevideo = document.getElementById("remotestream");
        remotevideo.srcObject = remoteStream;
        remotevideo.addEventListener("loadedmetadata", () => {
          remotevideo.play();
        });
      });
  
      //   this will be executed when the connection is established
      call.on("open", () => {
        console.log("connection established");
  
        console.log(video);
      });
  
      //   to recieve the data from the other peer
      call.on("data", (data) => {
        console.log("Received data", data);
      });
    }

    
  };

  if ((status = "SomeoneCalling")) {
    return (
      <>
        <div className="card">
          <div className="card-body">
            <video
              type="video"
              className={styles.localStream}
              src=""
              id="localstream"
              height="100px"
              muted
            ></video>
            <br />
            <video
              type="video"
              className={styles.remoteStream}
              src=""
              id="remotestream"
              height="200px"
            ></video>
          </div>
        </div>
      </>
    );
  }

  if ((status = "calling")) {
    return (
      <>
        <div className="card">
          <div className="card-body">
            <video
              type="video"
              src=""
              id="localstream"
              height="100px"
              muted
            ></video>
            <br />
            <video type="video" src="" id="remotestream" height="200px"></video>
          </div>
        </div>
      </>
    );
  }
}

export default AudioCall;
