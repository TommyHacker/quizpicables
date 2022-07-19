import io from "socket.io-client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import {
  usernameActions,
  isHostActions,
  roomNumberActions,
  scoreActions,
} from "../../redux-toolkit/store/user";
import {setSystemMessage} from "../redux-toolkit/store/quizMessage"

let socket;
const dispatch = useDispatch();

const Socket = () => {
  const { connected } = useSelector((state) => state.connected);

  useEffect(() => {
    if (connected) {
      connectionHandler();

      socket.on("update_username", ({ data }) => {
        dispatch(usernameActions.setUsername(data));
      });
      socket.on("incoming_message", ({ data }) => {
        
      })

    } else if (!connected) {
      socket && socket.emit("message", { data: `someone has disconnected.` });
      socket && socket.disconnect();
      console.log("discon");
    }
  }, [connected]);

  // open socket connection
  // clone https://github.com/tommyhacker/quizbicables-server for the express / socket.io backend
  // npm run dev on there will let this connect to localhost rather than the live version which most likely wont be latest version.
  const connectionHandler = () => {
    // change the below url to the quiz frontend if you want to use the live version with other players.
    socket = io.connect("http://localhost:4041");
  };
};

export default Socket;
