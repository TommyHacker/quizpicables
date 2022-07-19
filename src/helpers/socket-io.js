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

// to display notifications from socket server e.g. User Joined
import { setSystemMessage } from "../redux-toolkit/store/quizMessage";

let socket;

const dispatch = useDispatch();

const Socket = () => {
  // state will auto join or disconnect from server.
  const { connected } = useSelector((state) => state.connected);
  const { setSystemMessage } = useSelector((state) => state.systemMessage);

  useEffect(() => {
    if (connected) {
      // connect socket
      console.log("CONNECTED STATE TRUE, RUNNING CONNECT ");
      connectionHandler();

      // if server sends update_username method, update the usernameState
      socket.on("update_username", ({ data }) => {
        dispatch(usernameActions.setUsername(data));
      });

      socket.on("message", ({ data }) => {});
    } else if (!connected) {
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
