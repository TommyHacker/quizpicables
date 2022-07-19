const { io } = require("socket.io-client");

const randomRoomId = () => {
  return Math.floor(Math.random() * 399);
};

let socket;
class SocketControl {
  constructor(username = "anonymous", isHost = false) {
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

export const socketController = new SocketControl("anonymous", false);
