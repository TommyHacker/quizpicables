import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  usernameActions,
  isHostActions,
  roomNumberActions,
  scoreActions,
} from "../../redux-toolkit/store/user";
import { setSystemMessage } from "../../redux-toolkit/store/quizMessage";
// import SystemMessageComponent from "../../components/SocketComponents/SystemMessageComponent";
import { setConnected } from "../../redux-toolkit/store/connected";

const WaitingPage = () => {
  const [inputUsername, setInputUsername] = useState("");
  const [turn, setTurn] = useState(false);

  // USER ////////////////////////////////////////////////////////
  const { username } = useSelector((state) => state.username);
  const { isHost } = useSelector((state) => state.isHost);
  const { score } = useSelector((state) => state.score);
  const { roomNumber } = useSelector((state) => state.roomNumber);
  ////////////////////////////////////////////////////////////////

  //  socket connection /////////////////////////////////////////
  const { connected } = useSelector((state) => state.connected);
  ////////////////////////////////////////////////////////////////

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

  const formHandler = (e) => {
    e.preventDefault();
    dispatch(usernameActions.setUsername(e.target.username.value));
    dispatch(scoreActions.setScore(e.target.score.value));
    dispatch(roomNumberActions.setRoomNumber(e.target.roomnumber.value));
    setTurn(true);
  };
  return (
    <>
      <h1> Waiting Page!</h1>
      <h4>isHost: {isHost.toString()}</h4>
      <button onClick={() => dispatch(setIsHost())}></button>
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
      {/* <SystemMessageComponent /> */}

      <form onSubmit={formHandler}>
        <input name="username" type="text" placeholder="username" />
        <input name="roomnumber" type="text" placeholder="room number" />
        <input name="score" type="number" placeholder="score" />
        <input type="submit" value="submit" />
      </form>

      <>
        <p>username {username && username}</p>
        <p>ishost {isHost.toString()}</p>
        <p>roomnumber {roomNumber}</p>
        <p>score {score}</p>
      </>
    </>
  );
};

export default WaitingPage;
