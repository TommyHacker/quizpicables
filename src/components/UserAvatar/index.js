import React, { useEffect, useRef } from "react";
import lottie from 'lottie-web';
// import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography'
import { useSelector } from "react-redux";

const UserAvatar = () => {

    const { players } = useSelector((state) => state.players);

     const userContainer1 = useRef(null);
     
    useEffect(() => {

        console.log(userContainer1);
        lottie.loadAnimation({
            container: userContainer1.current,
            render: 'svg',
            loop: true,
            autoplay: true,
            animationData: require(`../../assets/animations/userAvatar0.json`)
        })
    }, [ players ])

   
    return (
        <>
           {players &&
               players.map((player, index) => {
                 
                   return (
                        <div key={index} className='userRow' style={{height: '98px', display: 'flex', flexDirection: 'flex-start' }}>
                            <div className='cart' style={{display: 'flex', marginLeft: `${player.score * 10 }vw`}}>   
                                <div className='userName' style={{ margin: 'auto 5px'}}>
                                    <Typography style={{ color: 'white', fontSize:'1.2em', fontWeight: 'bold', margin:'auto', textAlign: 'right' }}>
                                        {player.username} <br/>
                                        Score: { player.score } <br/>
                                        {/* Index: { index } */}
                                    </Typography>
                                </div>
                                <div ref={userContainer1} style={{ height: '98px', width: '165px'}}>
                                   {/* ------------- USER AVATAR GENERATES HERE ---------   */}
                                </div>
                            </div>
                      </div>
                       );
                    })}

        </>
    )
}

export default UserAvatar