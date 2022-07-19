const { io } = require("socket.io-client");



const randomRoomId = () => {
  return Math.floor(Math.random() * 399);
};

let socket;
class SocketControl {
  constructor(username, isHost) {
    this.url = "http://localhost:4041";
    this.username = username;
    this.roomNumber = 0;
    this.isHost = isHost;
    socket = io.connect(this.url);
      socket.on("message", ({ data }) => console.log(data));
      
  }
  connect() {
    console.log("connecting to socket");
  }
  setRoomNumber(num) {
    this.roomNumber = num;
  }

  join() {
    socket.emit("join_room", {
      roomNumber: this.roomNumber,
      username: this.username,
    });
    console.log("connecting to room number ", this.roomNumber);
  }

  sendMessage(messageText) {
    socket.emit("message", { data: messageText });
    console.log("sending message");
  }

  giveAnswer(choice, correctAnswer) {
    const data = { choice, correctAnswer, username: this.username };
    socket.emit("giveAnswer", { data });
    console.log("giving answer");
  }
  createRoom() {
    this.isHost = true;
    this.join(randomRoomId());
  }
  disconnect() {
    console.log("disconnecting!");
    socket.emit("message", { data: `${this.username} has disconnected.` });
    socket.disconnect();
  }
}

// const newSocket = new SocketControl("tommyHacker", 999, false);

// setTimeout(() => {
//   newSocket.connect();
// }, 1000);

// setTimeout(() => {
//   newSocket.setRoomNumber(999);
//   newSocket.join();
// }, 2000);

// setTimeout(() => {
//   newSocket.giveAnswer("A", "B");
// }, 3000);

// setTimeout(() => {
//   newSocket.sendMessage("fuck the lot of you");
// }, 4000);

export default SocketControl;
