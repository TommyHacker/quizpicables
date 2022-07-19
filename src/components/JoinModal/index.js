import React from "react";
import './JoinModal.css';
import { useDispatch } from 'react-redux';
import { joinModalActions } from '../../redux-toolkit/store/modal-slice';

//MATERIAL UI
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const JoinModal = () => {

    const dispatch = useDispatch();

    const toggleModal = (e) => {
        e.preventDefault();
        dispatch(joinModalActions.toggleModal());
    }

    return (
        <>
        <div className="modal">
        <div className="modal-content">
        <div className="modal-header">
           <h4 className="modal-title">Game Settings</h4>
                        <Button className='closeButton' onClick={toggleModal} variant="contained" style={{fontWeight:'bold', height: '25px', width: '25px', minWidth: '25px'}} >X</Button>
         </div>
                <div className="modal-body">
                    <form>
                        <div className="modal-item">
                            <label htmlFor='username'>Username</label>
                            <input type='text' name='username' id='username'></input>
                        </div>
                        <div className="modal-item">
                            <label htmlFor='roomNumber'>Room number</label>
                            <input type='text' name='roomNumber' id='roomNumber'></input>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                     <Grid className="button-container" style={{ display:'flex', alignItems:'center', justifyContent:'center', margin:'auto', height:'100px' }}>
                         <Button variant="contained" style={{fontWeight:'bold', height: '50px'}} sx={{ p: 3, m: 2.6 }} >Get Started!</Button>
                         {/* REQUIRES ROUTE POINTING */}
                    </Grid>    
                </div>
            </div>
        </div>
    
    </>
    )
}

export default JoinModal;
