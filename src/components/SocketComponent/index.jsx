import React, { useEffect } from "react";
import SocketControl from "../../helpers/socketClass";
import { useSelector, useDispatch } from "react-redux";
import { setConnected } from "../../redux-toolkit/store/connected";
// import { setSystemMessage } from "../../redux-toolkit/store/quizMessage";
let newSocket;
const SocketComponent = () => {
  // const systemMessage = useSelector((state) => state.systemMessage);
  const dispatch = useDispatch();
  // this state can be switched on or off to connect or disconnect socket.
  const { connected } = useSelector((state) => state.connected);

  const { username } = useSelector((state) => state.username);
  const { isHost } = useSelector((state) => state.isHost);

  const connectionHandler = () => {
    newSocket = new SocketControl(username, isHost);
    // change the below url to the quiz frontend if you want to use the live version with other players.
    newSocket.connect();
  };

  useEffect(() => {
    if (!connected) return;
    dispatch(setConnected());
  }, [connected]);

  useEffect(() => {
    // if connected state has changed to true "user has clicked connect which has switched connected state to true", connect to express backend socket server
    if (connected) {
      connectionHandler();
    } else if (!connected) {
      // if the user then clicks disconnect!?
      // socket exists in the first place ? then disconnect, otherwise : do nothing, they were not connected in the first place!
      newSocket && // socket exists?
        newSocket.sendMessage(`${username} has disconnected.`);
      newSocket && // socket exists?
        newSocket.disconnect();
      // reset joinedRoom state so the user can once again input the private room number and their chosen username.
    }
  }, [connected]);
};

export default SocketComponent;
