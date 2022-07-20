import React, { useEffect, useRef } from "react";
import lottie from 'lottie-web';
// import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography'

const UserAvatar = () => {
    
    const userContainer = useRef(null);

    // PASS IN { userID } to animationData: require('../../assets/userAvatar{ userID }.json')
    useEffect(() => {
        lottie.loadAnimation({
            container: userContainer.current,
            render: 'svg',
            loop: true,
            autoplay: true,
            animationData: require('../../assets/userAvatar1.json')
        })
    }, [])

    return (
        <>
          <div className='userRow' style={{height: '70px', display: 'flex', flexDirection: 'flex-start', }}>
            <div className='userName' style={{margin: 'auto 5px'}}>
                <Typography style={{ fontSize:'1.2em', fontWeight: 'bold', margin:'auto'}}>
                    {/* MERGE THROUGH USERNAME HERE */}
                    Username
                </Typography>
            </div>
            <div className='userContainer' ref={userContainer} style={{marginLeft: '0%'}}>
              {/* USER AVATAR GENERATES HERE */}
            </div>
          </div>
        </>

    )
}

export default UserAvatar