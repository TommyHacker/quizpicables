import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsername } from "../../redux-toolkit/user";
import { setSystemMessage } from "../../redux-toolkit/quizMessage";
import SystemMessageComponent from "../../components/SocketComponents/SystemMessageComponent";
import { setConnected } from "../../redux-toolkit/connected";

const WaitingPage = () => {
  const [temp, setTemp] = useState("nowt");

  // this works because we can see anonymous on line 11
  const { username } = useSelector((state) => state.username);

  const { connected } = useSelector((state) => state.connected);

  const dispatch = useDispatch();

  const usernameHandler = () => {
    try {
      dispatch(setUsername(temp));
    } catch (err) {
      console.log(err.message);
    }
  };

  const systemMessageHandler = () => {
    dispatch(
      setSystemMessage("new message from the server! through a fuccin socket!")
    );
  };

  return (
    <>
      <h1> Waiting Page!</h1>
      <h4>username : {username && username}</h4>
      <input type="text" onChange={(e) => setTemp(e.target.value)}></input>
      <button
        onClick={() => {
          usernameHandler();
        }}
      >
        save username
      </button>
      <h4>Connection status: {connected.toString()}</h4>
      <button onClick={() => dispatch(setConnected())}>
        {connected ? "disconnect" : "connect"}
      </button>
      <SystemMessageComponent />
    </>
  );
};

export default WaitingPage;
