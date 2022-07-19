// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setSystemMessage } from "../../redux-toolkit/store/quizMessage";
// import Socket from "../../helpers/socket-io";

// export default function SystemMessageComponent() {
// const { systemMessage } = useSelector((state) => state.systemMessage);
// const dispatch = useDispatch();

// const socket = Socket();
// useEffect(() => {
// socket.on("message", ({ data }) => {
// dispatch(setSystemMessage(data));
// });
// }, [socket]);

// return (
//   system messages examples...
// anonymousplayer has joined the game
// anonymousplayer has disconnected
// you have joined room 999!
// <div className="system-message">
// {
/* returns the last message in the array */
// }
// {systemMessage[systemMessage.length - 1]}
// </div>
// );
// }
