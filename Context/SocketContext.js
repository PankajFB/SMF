import React, { useEffect, useContext } from "react";
import { io } from "socket.io-client";

export const SocketContext = React.createContext(null);

export const useSocket = () => useContext(SocketContext);

export const socket = io("https://socailappbackend-production.up.railway.app/"); // Replace with your server URL
console.log(socket);


export const SocketProvider = (props) => {
  // let socket = null;

  // useEffect(() => {
  //   //  const socket = io("http://localhost:4000"); // Replace with your server URL
  //    console.log(socket);
  //   socket.on("connect", () => {
  //     console.log("Connected to Socket.IO server");
  //   });
  //   socket.on("disconnect", () => {
  //     console.log("Disconnected from Socket.IO server");
  //   });
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};
