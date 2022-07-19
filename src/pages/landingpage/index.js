import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { JoinModal, SettingsModal } from '../../components';
import { joinModalActions, settingsModalActions } from '../../redux-toolkit/store/modal-slice';

//MATERIAL UI FEATURES
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import './style.css';

//IMAGE ASSETS
import logo from '../../assets/images/logo_large.png';
import background from '../../assets/images/background8.jpg';



const LandingPage = () => {
    const dispatch = useDispatch();
    const closeJoinModal = useSelector(state => !state.joinModal.modalIsVisible);
    const closeSettingsModal = useSelector(state => !state.settingsModal.settingsModalIsVisible)
    
    const toggleJoinModal = (e) => {
        e.preventDefault();
        dispatch(joinModalActions.toggleModal());
    }

    const toggleSettingsModal = (e) => {
        e.preventDefault();
        dispatch(settingsModalActions.toggleSettingsModal());
    }

    return (
        <>
        <div className="background-container" style={{ backgroundImage: `url(${background})`, backgroundRepeat:"no-repeat",backgroundSize:"cover", height:'100vh',width:'100vw'  }} >
            <img className='main-logo' src={ logo } alt="main logo"/>
            <Grid className="button-container" style={{ display:'flex', alignItems:'center', justifyContent:'center', margin:'auto', height: '120px' }}>
                <Button onClick={toggleSettingsModal} variant="contained" style={{fontWeight:'bold'}} sx={{ p: 3, m: 2.6 }}>Create Room</Button>
                <Button onClick={toggleJoinModal} variant="contained" style={{fontWeight:'bold'}} sx={{ p: 3, m: 2.6 }}>Join Room</Button>
            </Grid>	
        </div> 

        {closeJoinModal && <JoinModal />}
        {closeSettingsModal && <SettingsModal />}
        </>
    )}

    export default LandingPage;
