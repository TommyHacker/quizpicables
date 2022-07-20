import React, { useEffect, useRef } from "react";
import lottie from 'lottie-web';
// import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography'
import { useSelector } from "react-redux";

const UserAvatar = () => {

    const { players } = useSelector((state) => state.players);

    // FUNCTION TO DEFINE MOVEMENT
    const movementScore = () => {
        
    }
    

    const userContainer = useRef(null);

    // PASS IN { userID } to animationData: require('../../assets/userAvatar{ userID }.json')
    useEffect(() => {
        lottie.loadAnimation({
            container: userContainer.current,
            render: 'svg',
            loop: true,
            autoplay: true,
            animationData: require('../../assets/animations/userAvatar4.json')
        })
    }, [])


    return (
        <>
         
                    {/* MERGE THROUGH USERNAME HERE */}
                     {players &&
                            players.map((player, index) => {
                            return (
                                <div className='userRow' style={{height: '100px', display: 'flex', flexDirection: 'flex-start', }}>
                                <div className='userName' style={{margin: 'auto 5px'}}>
                                    <Typography style={{ color: 'white', fontSize:'1.2em', fontWeight: 'bold', margin:'auto'}}>
                                        {player.username} <br/>
                                        Score: { player.score } <br/>
                                        Index: { index }
                                    </Typography>
                                </div>
                                <div className='userContainer' ref={userContainer} style={{marginLeft: '0%'}}>
                                {/* USER AVATAR GENERATES HERE */}
                                </div>
                            </div>
                                
                            );
                            })}

        </>
    )
}

export default UserAvatar