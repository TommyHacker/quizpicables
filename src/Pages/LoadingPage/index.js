import React, { useEffect, useRef } from "react";
import background from '../../assets/images/background8.jpg';
import lottie from 'lottie-web';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography'



const loadingPage = () => {
    
    const container = useRef(null);

    useEffect(() => {
        lottie.loadAnimation({
            container: container.current,
            render: 'svg',
            loop: true,
            autoplay: true,
            animationData: require('../../assets/animations/loading-icon.json')
        })
    }, [])

    return (
        <>
            <div className="background-container" style={{ backgroundImage: `url(${background})`, backgroundRepeat:"no-repeat",backgroundSize:"cover", height:'100vh',width:'100vw'  }}>

           
            
            <Grid className="button-container" style={{ display:'flex', flexDirection: 'column', alignItems:'center', justifyContent:'center', margin:'auto', height: '90vh' }}>
                 <Typography style={{fontSize: '6em', fontWeight: 'bold', letterSpacing: '3px', color: 'white', textShadow: '0px 0px 8px #665A9F,0px 0px 18px #665A9F,0px 0px 8px #665A9F,0px 0px 10px #665A9F,0px 0px 10px #665A9F'}}>- Loading Session -</Typography>

                <div style={{height: '450px'}} className='container' ref={container}>
                </div>
             </Grid>   
            </div>
        </>
     )
}

export default loadingPage;