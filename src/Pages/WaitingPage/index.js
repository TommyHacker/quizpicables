import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socketController } from "../../helpers/socketClass";
import { messagesActions } from "../../redux-toolkit/store/messages";

const WaitingPage = () => {
  const { username } = useSelector((state) => state.username);
  const { roomNumber } = useSelector((state) => state.roomNumber);
  const { messages } = useSelector((state) => state.messages);
  const dispatch = useDispatch();
  const [users, setUsers] = useState([{ username }]);

  const messageHandler = () => {
    socketController.sendMessage("this is a test");
  };

  useEffect(() => {
    socket.on("players", ({ data }) => {
      console.log(data);
      setUsers(data);
    });
  }, []);

  return (
    <>
      <button onClick={messageHandler}>message test</button>

      <h4>room number: {roomNumber}</h4>

      <h4>
        lateset socket message:{" "}
        {messages.length > 1 && messages[messages.length - 1]}
      </h4>
      <h3>users</h3>
      {users.map((user, index) => {
        return (
          <div key={index}>
            <h4>{user.username}</h4>
          </div>
        );
      })}
    </>
  );
};

export default WaitingPage;
