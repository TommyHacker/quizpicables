import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import background from '../../assets/images/background8.jpg';
import lottie from 'lottie-web';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './style.css';

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
{/* ------------------------------ LEFT SIDE: ROOM / PLAYER INFO --------------------------------------------- */}    
     <div className="background-container" style={{ backgroundImage: `url(${background})`, backgroundRepeat:"no-repeat",backgroundSize:"cover", height:'100vh',width:'100vw', color: 'white', padding: '25px'  }}>
          <Typography className='mobile-remove' style={{fontSize: '4.2rem', textAlign: 'center', textShadow: '0px 0px 7px #665A9F,0px 0px 3px #665A9F'}}>
            Room Number: {roomNumber}
            </Typography>
            <div className="info-container">
              <Typography  className='mobile-remove' style={{fontSize: '2.5rem', textDecoration: 'underline', textShadow: '0px 0px 7px #665A9F,0px 0px 3px #665A9F'}}>
                Player Amount: {players.length} <br/>
              </Typography>
              {players.map((player, index) => {
                return <Typography style={{fontSize: '2.5rem', textShadow: '0px 0px 7px #665A9F,0px 0px 3px #665A9F' }} key={index}>{player.username}</Typography>;
              })}

              {/* <Typography style={{fontSize: '2rem' }}>
                latest socket message:
                <span style={{ marginLeft: "5px", fontWeight: "400" }}>
                  {messages.length > 1 && messages[messages.length - 1]}
                </span>
              </Typography> */}
              {/* <Typography style={{fontSize: '2rem' }}>Players</Typography> */}
              {isHost && <Button variant="contained"
                              style={{ fontWeight: "bold", height: "120px", width: '290px', fontSize: '2rem', marginTop: '25px' }} onClick={() => navigateHandler()}>LAUNCH GAME</Button>}
           </div>                   
    
 {/* ------------------------------ LOADING ANIMATIONn--------------------------------------------- */}               
      <div style={{display: 'flex', justifyContent: 'center', height: '350px', width: '300px', margin: 'auto'}}>
        <div ref={container}> </div>
      </div>

 {/* ------------------------------ MOBILE SCREEN --------------------------------------------- */}      
      <Typography  className='mobile-shrink' style={{textAlign: 'center', textWeight:'bold', letterSpacing: '3px', color: 'white', textShadow: '0px 0px 7px #665A9F,0px 0px 3px #665A9F,0px 0px 3px #665A9F,0px 0px 3px #665A9F ' }}>// Spooling Warp Drive:<br/> <span className='complete'>COMPLETE</span>
      <br/>
      <br/>
      // Cabin Pressure Test: <br/><span className='complete'>COMPLETE</span>
      <br/>
      <br/>
      // Fuel Level Max: <br/><span className='complete'>COMPLETE</span>
      <br/>
      <br/>
      // Importing useDispatch:<br/> <span className='complete'>COMPLETE</span>
      <br/>
      <br/>
      // Tests Complete
      // Your host will start the game shortly.
      </Typography>
         
 {/* ------------------------------ HOST SCREEN --------------------------------------------- */}
          <Typography className='host-screen' style={{textAlign: 'center', fontSize: '4rem', letterSpacing: '3px', color: 'white', textShadow: '0px 0px 7px #665A9F,0px 0px 3px #665A9F,0px 0px 3px #665A9F,0px 0px 3px #665A9F, 20px 20px 200px #000000 ' }}>
              Please Wait ...
        </Typography> 
      
      </div>
     
    </>
  );
};

export default WaitingPage;
