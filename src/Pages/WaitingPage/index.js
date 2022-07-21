import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import background from '../../assets/images/background8.jpg';
import lottie from 'lottie-web';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const WaitingPage = () => {
	const navigate = useNavigate();
	const { username } = useSelector((state) => state.username);
	const { roomNumber } = useSelector((state) => state.roomNumber);
	// const { messages } = useSelector((state) => state.messages);
	const { players } = useSelector((state) => state.players);
	const { isHost } = useSelector((state) => state.isHost);

	const dispatch = useDispatch();

	const navigateHandler = () => {
		if (isHost) {
			socket.emit('start_game');
		}
	};

	const container = useRef(null);

	useEffect(() => {
		socket.on('start_game', () => navigate('/question'));
		lottie.loadAnimation({
			container: container.current,
			render: 'svg',
			loop: true,
			autoplay: true,
			animationData: require('../../assets/animations/loading-icon.json'),
		});
	});

	return (
		<>
			<div
				className='background-container'
				style={{
					backgroundImage: `url(${background})`,
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
					height: '100vh',
					width: '100vw',
					color: 'white',
					padding: '25px',
				}}
			>
				<Typography
					style={{
						fontSize: '4.2rem',
						textAlign: 'center',
						textShadow: '0px 0px 7px #665A9F,0px 0px 3px #665A9F',
					}}
				>
					Room number: {roomNumber}
				</Typography>
				<Typography
					style={{
						fontSize: '2rem',
						textShadow: '0px 0px 7px #665A9F,0px 0px 3px #665A9F',
					}}
				>
					Player Amount: {players.length}
				</Typography>
				{players &&
					players.map((player, index) => {
						return (
							<Typography
								style={{
									fontSize: '2rem',
									textShadow: '0px 0px 7px #665A9F,0px 0px 3px #665A9F',
								}}
								key={index}
							>
								{player.username}
							</Typography>
						);
					})}

				{/* <Typography style={{fontSize: '2rem' }}>
        latest socket message:
        <span style={{ marginLeft: "5px", fontWeight: "400" }}>
          {messages.length > 1 && messages[messages.length - 1]}
        </span>
      </Typography> */}
				{/* <Typography style={{fontSize: '2rem' }}>Players</Typography> */}
				{isHost && (
					<Button onClick={() => navigateHandler()}>Start Game</Button>
				)}

				<div
					style={{ display: 'flex', justifyContent: 'center', height: '350px' }}
				>
					<div ref={container}> </div>
				</div>
				<Typography
					style={{
						textAlign: 'center',
						fontSize: '5em',
						fontWeight: 'bold',
						letterSpacing: '3px',
						color: 'white',
						textShadow: '0px 0px 7px #665A9F,0px 0px 3px #665A9F',
					}}
				>
					- Loading Session -
				</Typography>
			</div>
		</>
	);
};

export default WaitingPage;
