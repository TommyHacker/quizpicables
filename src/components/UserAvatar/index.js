import React, { useEffect, useRef } from "react";
import lottie from 'lottie-web';
// import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography'

const UserAvatar = () => {

    const user1 = 1;
    const user2 = 2;
    const user3 = 3;
    const user4 = 4;

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
          <div className='userRow' style={{height: '70px', display: 'flex', flexDirection: 'flex-start', }}>
            <div className='userName' style={{margin: 'auto 5px'}}>
                <Typography style={{ color: 'white', fontSize:'1.2em', fontWeight: 'bold', margin:'auto'}}>
                    {/* MERGE THROUGH USERNAME HERE */}
                    Tom <br/>
                    Score: 0   
                </Typography>
            </div>
            <div className='userContainer' ref={userContainer} style={{marginLeft: '0%'}}>
              {/* USER AVATAR GENERATES HERE */}
            </div>
          </div>
      

        {/* // DEMO VERISON ONLY */}

        <div className='userRow' style={{height: '70px', display: 'flex', flexDirection: 'flex-start', }}>
            <div className='userName' style={{margin: 'auto 5px'}}>
                <Typography style={{ color: 'white', fontSize:'1.2em', fontWeight: 'bold', margin:'auto'}}>
                    {/* MERGE THROUGH USERNAME HERE */}
                    Syed <br/>
                    Score: 0   
                </Typography>
            </div>
            <div className='userContainer' ref={userContainer} style={{marginLeft: '0%'}}>
              {/* USER AVATAR GENERATES HERE */}
            </div>
          </div>
          <div className='userRow' style={{height: '70px', display: 'flex', flexDirection: 'flex-start', }}>
          <div className='userName' style={{margin: 'auto 5px'}}>
              <Typography style={{ color: 'white', fontSize:'1.2em', fontWeight: 'bold', margin:'auto'}}>
                  {/* MERGE THROUGH USERNAME HERE */}
                  Vlada <br/>
                  Score: 0   
              </Typography>
          </div>
          <div className='userContainer' ref={userContainer} style={{marginLeft: '0%'}}>
            {/* USER AVATAR GENERATES HERE */}
          </div>
        </div>
        <div className='userRow' style={{height: '70px', display: 'flex', flexDirection: 'flex-start', }}>
            <div className='userName' style={{margin: 'auto 5px'}}>
                <Typography style={{ color: 'white', fontSize:'1.2em', fontWeight: 'bold', margin:'auto'}}>
                    {/* MERGE THROUGH USERNAME HERE */}
                    Stu <br/>
                    Score: 0   
                </Typography>
            </div>
            <div className='userContainer' ref={userContainer} style={{marginLeft: '0%'}}>
              {/* USER AVATAR GENERATES HERE */}
            </div>
          </div>
        

        {/* END OF DEMO */}
        </>
    )
}

export default UserAvatar