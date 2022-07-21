import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const WaitingPage = () => {
  const navigate = useNavigate();
  const { username } = useSelector((state) => state.username);
  const { roomNumber } = useSelector((state) => state.roomNumber);
  const { messages } = useSelector((state) => state.messages);
  const { players } = useSelector((state) => state.players);
  const { isHost } = useSelector((state) => state.isHost);

  const dispatch = useDispatch();

  const navigateHandler = () => {
    if (isHost) {
      socket.emit("start_game");
    }
  };

  useEffect(() => {
    socket.on("start_game", () => navigate("/question"));
  });


  return (
    <>
      <h4>room number: {roomNumber}</h4>
      <h4>players: {players.length}</h4>
      {players.map((player, index) => {
        return <div key={index}>{player.username}</div>;
      })}

      <h4>
        latest socket message:
        <span style={{ marginLeft: "5px", fontWeight: "400" }}>
          {messages.length > 1 && messages[messages.length - 1]}
        </span>
      </h4>
      <h3>players</h3>
      {isHost && <button onClick={() => navigateHandler()}>Start Game</button>}
    </>
  );
};

export default WaitingPage;
