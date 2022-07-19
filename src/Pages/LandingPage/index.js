import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { JoinModal, SettingsModal } from '../../components';
import { joinModalActions, settingsModalActions } from '../../redux-toolkit/store/modal-slice';


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
        <button onClick={toggleSettingsModal}> Create Room </button>
        <button onClick={toggleJoinModal}>Join Room</button>
        {closeJoinModal && <JoinModal />}
        {closeSettingsModal && <SettingsModal />}
        </>
    )}

    export default LandingPage;
