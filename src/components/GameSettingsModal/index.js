import React from "react";
import './GameSettings.css';
import { useDispatch } from "react-redux";
import { settingsModalActions } from "../../redux-toolkit/store/modal-slice";


const SettingsModal = () => {
    const dispatch = useDispatch();

    const toggleModal = (e) => {
        e.preventDefault();
        dispatch(settingsModalActions.toggleSettingsModal());
    }
    return (
        <>
            <div className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Game Settings</h4>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className='modal-item'>
                            <label htmlFor='category'>Choose category</label>
                            <select name='category' id='category'>
                                <option value='science'>Science</option>
                                <option value='history'>History</option>
                                <option value='art'>Art</option>
                            </select>
                            </div>
                            <div className='modal-item'>
                            <label htmlFor='difficulty'>Choose difficulty level</label>
                            <select name='difficulty' id='difficulty'>
                                <option value='easy'>Easy</option>
                                <option value='medium'>Medium</option>
                                <option value='hard'>Hard</option>
                            </select>
                            </div>
                            <div  className='modal-item'>
                            <label htmlFor="number">Number of questions</label>
                            <input type='number' id="number" name='number'></input>
                            </div>
                            <div>
                            <button onClick={toggleModal}>Close</button>
                            <button>Next</button>
                            </div>
                        </form>
                    </div>
                </div>  
            </div>
        </>
    )
}

export default SettingsModal;
