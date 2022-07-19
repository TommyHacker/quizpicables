import React, {useState} from "react";
import './JoinModal.css';
import { useDispatch } from 'react-redux';
import { joinModalActions } from '../../redux-toolkit/store/modal-slice';

const JoinModal = () => {
    const dispatch = useDispatch();

    const [username, setUserName] = useState('');
    const [room, setRoomNumber] = useState(0);


    const toggleModal = (e) => {
        e.preventDefault();
        dispatch(joinModalActions.toggleModal());
    }

    const handleUserName = (e) => {
        setUserName(e.target.value);
    }

    const handleRoomNumber = (e) => {
        setRoomNumber(e.target.value);
    
    }

    return (
        <>
        <div className="modal">
        <div className="modal-content">
            <div className='modal-header'>
                <h4 className="modal-title"> Join Room</h4>
                <div className="modal-body">
                    <form>
                    <div className="modal-item">
                    <label htmlFor='username'>Username</label>
                    <input onChange={handleUserName} type='text' name='username' id='username'></input>
                    </div>
                    <div className="modal-item">
                    <label htmlFor='roomNumber'>Room number</label>
                    <input onChange={handleRoomNumber} type='number' name='roomNumber' id='roomNumber'></input>
                    </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button className="button" onClick={toggleModal}>Close</button>
                    <button className="button">Enter</button>
                </div>
            </div>
        </div>
    </div>
    </>
    )
}

export default JoinModal;
