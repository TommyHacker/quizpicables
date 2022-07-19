import React, { useEffect } from "react";
import io from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { setConnected } from "../../redux-toolkit/store/connected";
// import { setSystemMessage } from "../../redux-toolkit/store/quizMessage";
let socket;

const SocketComponent = () => {

  // const systemMessage = useSelector((state) => state.systemMessage);
  const dispatch = useDispatch();
  // this state can be switched on or off to connect or disconnect socket.
  const { connected } = useSelector((state) => state.connected);

  const connectionHandler = () => {
    // change the below url to the quiz frontend if you want to use the live version with other players.
    socket = io.connect("http://localhost:4041");
  };


  useEffect(() => {
    // onpageload, set turn on socket connection
    dispatch(setConnected())
  }, [])
  


  useEffect(() => {
    // if connected state has changed to true "user has clicked connect which has switched connected state to true", connect to express backend socket server
    if (connected) {
      connectionHandler();
    } else if (!connected) {
      // socket exists in the first place ? then disconnect, otherwise : do nothing, they were not connected in the first place!
      socket && // socket exists?
        socket.emit("message", { data: `${username} has disconnected.` });
      socket && // socket exists?
        socket.disconnect();
    }
  }, [connected]);
  
};

export default SocketComponent;
