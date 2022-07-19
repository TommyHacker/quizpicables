import React, { useEffect, useState } from "react";
import io from "socket.io-client";

let socket;

const SocketComponent = () => {
  // reusable to avoid a bug where the user disconnected and re-joined which kept two quiz answers chosen
  const resetAnswers = { a: false, b: false, c: false, d: false };

  // system messages e.g. player joined, player disconnected, its too hot right now etc....
  const [message, setMessage] = useState("");

  // disable ability to click answers once quiz answer choice has been made!
  const [answerLockedIn, setAnswerLockedIn] = useState(false);

  // how many players are in the room? that will stored in this state. good to know for waiting lobby or checking if a user has disconnected.
  const [userCount, setUserCount] = useState();

  // username will default to anonymous, would be cool to randomise this with some funky names.
  const [username, setUsername] = useState("anonymous");

  // state will determine if the user is or is not connected to the web-socket, good to know if connected so we can show the correct UI
  const [connected, setConnected] = useState(false);

  // for chosing between a b c and d quiz answers, default to resetAnswers object on line 8 up above /\.
  const [answer, setAnswer] = useState({ ...resetAnswers });

  // user can change this in the input to join specific "private" room/quiz.
  const [roomNumber, setRoomNumber] = useState(0);

  // is the user inside a quiz room yet? default is false, once joined its true and should hide options to join or set username etc.
  const [joinedRoom, setJoinedRoom] = useState(false);

  // open socket connection
  // clone https://github.com/tommyhacker/quizbicables-server for the express / socket.io backend
  // npm run dev on there will let this connect to localhost rather than the live version which most likely wont be latest version.
  const connectionHandler = () => {
    // change the below url to the quiz frontend if you want to use the live version with other players.
    socket = io.connect("http://localhost:4041");
  };

  useEffect(() => {
    // if connected state has changed to true "user has clicked connect which has switched connected state to true", connect to express backend socket server
    if (connected) {
      connectionHandler();
    } else if (!connected) {
      // if the user then clicks disconnect!?
      // socket exists in the first place ? then disconnect, otherwise : do nothing, they were not connected in the first place!
      socket && // socket exists?
        socket.emit("message", { data: `${username} has disconnected.` });
      socket && // socket exists?
        socket.disconnect();
      // reset joinedRoom state so the user can once again input the private room number and their chosen username.
      setJoinedRoom(false);
    }
  }, [connected]);

  useEffect(() => {
    // if socket connection is currently open
    if (connected) {
      // listen for "results" socket method from server, results shows what this user has selected from a, b, c, d
      socket.on("results", ({ choice }) => {
        // let the data decide what that user chose
        // e.g. players 1 2 and 3 can see what choice player 4 has made
        choiceHandler(choice);
      });

      // socket has sent to us a method of "players_roundup" with some data, lets decide what to do with it
      socket.on("players_roundup", (data) => {
        // update the NUM of players in the room
        setUserCount(data.players);
      });
      // socket has sent us a method of "announcement" with some data, lets decide what to do with it
      socket.on("announcement", (data) => {
        // change the newest message to display on the page.
        setMessage(data.message);
      });
      // socket has sent us the "next" method, which means someone pressed the "next question" button
      socket.on("next", () => {
        // set the newest message to
        setMessage("now on the next question");
        // reset answers chosen by players, because we are on a new question.
        setAnswer(resetAnswers);
      });
      // socket has sent us username, we must have sent a username to socket.
      socket.on("assign_username", ({ data }) => {
        // set our username to what the socket recieved from us before.
        setUsername(data);
      });
    }
  }, [connected]);

  const choiceHandler = (data) => {
    // Whatever choice has been made, update the state
    switch (data.toString()) {
      // ...resetAnswers sets them all to false as on line 8
      // but then sets the chosen answer to true.
      case "A":
        setAnswer({ ...resetAnswers, a: true });
        break;
      case "B":
        setAnswer({ ...resetAnswers, b: true });
        break;
      case "C":
        setAnswer({ ...resetAnswers, c: true });
        break;
      case "D":
        setAnswer({ ...resetAnswers, d: true });
        break;
      default:
        break;
    }
  };

  const joinRoomHandler = () => {
    // tell socket that we want to join room chosen within the input.
    socket.emit("join_room", { roomNumber, username });
    // set joined room state to true, which means we can now hide the join room UI
    setJoinedRoom(true);
  };

  const handleAnswer = (e) => {
    // send choice (a,b,c or d) to socket server with specific room number. Dont want to mess with other private quizes!
    socket.emit("answer", { choice: e.target.outerText, roomNumber });
    // disable ability to make another choice, otherwise the user might spam choices which is not good for our cheap servers.
    setAnswerLockedIn(true);
  };

  // someone pressed the next question button!
  const nextQHandler = () => {
    // allow user to click on answers again for next question
    setAnswerLockedIn(false);
    // tell the socket to tell all users we are now moving to next question
    socket.emit("next_question");
  };

  return (
    <>
      <h1>Testing the sockets</h1>
      {/* user clicks this button to join or disconnect from socket server */}
      <button onClick={() => setConnected(!connected)}>
        {connected ? "disconnect" : "connect"}
      </button>

      {/* quiz answer buttons A B C and D */}
      <button
        className={answer.a ? "btn chosen" : "btn"}
        onClick={handleAnswer}
      >
        A
      </button>
      <button
        className={answer.b ? "btn chosen" : "btn"}
        onClick={handleAnswer}
      >
        B
      </button>
      <button
        className={answer.c ? "btn chosen" : "btn"}
        onClick={handleAnswer}
      >
        C
      </button>
      <button
        className={answer.d ? "btn chosen" : "btn"}
        onClick={handleAnswer}
      >
        D
      </button>
      <h4>answers : {JSON.stringify(answer)}</h4>
      <h4>Players: {connected && userCount}</h4>

      {/* If user hasnt joinedRoom yet, display the following setup inputs */}
      {!joinedRoom && (
        <>
          {/* user types in room number */}
          <input
            placeholder="room number"
            onChange={(e) => setRoomNumber(e.target.value)}
          />
          {/* joins that private room  */}
          <button onClick={joinRoomHandler}>Join Room</button>
        </>
      )}

      {/* If user is not yet in a private room */}
      {!joinedRoom && (
        // Type in / choose their username
        <input
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
      )}
      <h4>username: {username}</h4>

      {/* moves to the next question */}
      <button onClick={nextQHandler}>next question</button>

      <hr />
      {/* Shows the latest anouncement from the backend socket server e.g. someone has disconnected or joined*/}

      <h4>{message && message}</h4>
    </>
  );
};

export default SocketComponent;
