import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { connectedActions } from '../../redux-toolkit/store/connected';
import { messagesActions } from '../../redux-toolkit/store/messages';
import { playersActions } from '../../redux-toolkit/store/players';

const SocketComponent = () => {
	// const systemMessage = useSelector((state) => state.systemMessage);
	const dispatch = useDispatch();
	// this state can be switched on or off to connect or disconnect socket.
	const { connected } = useSelector((state) => state.connected);
	const { messages } = useSelector((state) => state.messages);
	const { username } = useSelector((state) => state.username);
	const { isHost } = useSelector((state) => state.isHost);

	useEffect(() => {
		socket.on('players', ({ data }) =>
			dispatch(playersActions.setPlayers(data))
		);
		socket.on('message', ({ data }) => dispatch(messagesActions.update(data)));
	}, []);

	useEffect(() => {
		// if connected state has changed to true "user has clicked connect which has switched connected state to true", connect to express backend socket server
		if (connected) {
			// console.log("connected");
		} else if (!connected) {
			// if the user then clicks disconnect!?
			// socket exists in the first place ? then disconnect, otherwise : do nothing, they were not connected in the first place!
			socket.emit('message', { data: `${username} has disconnected.` });
			socket.disconnect();
			// reset joinedRoom state so the user can once again input the private room number and their chosen username.
			dispatch(connectedActions.setConnected());
		}
	}, [connected]);
};

export default SocketComponent;
