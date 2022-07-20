import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socketController } from "../../helpers/socketClass";
import { messagesActions } from "../../redux-toolkit/store/messages";

const WaitingPage = () => {
  const { username } = useSelector((state) => state.username);
  const { roomNumber } = useSelector((state) => state.roomNumber);
  const { messages } = useSelector((state) => state.messages);
  const { players } = useSelector((state) => state.players);
  const dispatch = useDispatch();

  const messageHandler = () => {
    socketController.sendMessage("this is a test");
  };

  return (
    <>
      <button onClick={messageHandler}>message test</button>

      <h4>room number: {roomNumber}</h4>
      <h4>players: </h4>
      {players.map((player, index) => {
        return <div key={index}>{player.username}</div>;
      })}
      <h4>
        lateset socket message:{" "}
        {messages.length > 1 && messages[messages.length - 1]}
      </h4>
      <h3>players</h3>
    </>
  );
};

export default WaitingPage;
