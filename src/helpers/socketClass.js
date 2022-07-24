const io = require('socket.io-client');
const randomRoomId = () => {
	return Math.floor(Math.random() * 399);
};

class SocketControl {
	constructor(username = 'Host', isHost = false) {
		// this.url = 'https://quizpicable-server.herokuapp.com/';
		this.url = 'http://localhost:4040';
		this.username = username;
		this.roomNumber = 0;
		this.isHost = isHost;
		this.score = 0;
		this.messages = [''];
		this.gameData = {};
		this.playersCount = 1;
		this.playersInfo = [''];
		// global.socket = io.connect('https://quizpicable-server.herokuapp.com/');
		global.socket = io.connect('http://localhost:4040');
	}
	connect() {}
	updateRoomNumber(num) {
		this.roomNumber = num;
	}
	updateUsername(name) {
		this.username = name;
	}

	join(id = this.roomNumber) {
		socket.emit('join_room', {
			roomNumber: id,
			username: this.username,
			isHost: this.isHost,
			score: this.score,
		});
	}

	sendMessage(messageText) {
		try {
			socket.emit('message', { messageText });
		} catch (err) {
			console.log(err);
		}
	}

	giveAnswer(choice, correctAnswer) {
		const data = { choice, correctAnswer, username: this.username };
		socket.emit('giveAnswer', { data });
	}
	async createRoom() {
		const id = randomRoomId();
		this.isHost = true;
		this.roomNumber = id;
		this.join(id);
	}
	disconnect() {
		socket.emit('message', { data: `${this.username} has disconnected.` });
		socket.disconnect();
	}
	host(val) {
		switch (val) {
			case true:
				this.isHost = true;
				break;
			case false:
				this.isHost = false;
				break;
			default:
				return;
		}
	}
}

// socket.on("message", ({ data }) => {
//   console.log("message", data);
//   this.messages.push(data);
// });

// socket.on("initial_game_data", ({ data }) => {
//   console.log("quiz data", data);
//   this.gameData = data;
// });

// socket.on("players", ({ data }) => {
//   this.playersCount = data;
//   console.log("players", data);
// });

// socket.on("players_roundup", ({ data }) => {
//   this.playersInfo = data;
//   console.log("players", data);
// });
export const socketController = new SocketControl();
