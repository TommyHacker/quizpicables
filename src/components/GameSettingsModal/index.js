import React, {useState, useEffect} from "react";
import './GameSettings.css';
import { useDispatch } from "react-redux";
import { settingsModalActions } from "../../redux-toolkit/store/modal-slice";
import useAxios from "../../hooks/useAxios";
import axios from "axios";

//MATERIAL UI
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const SettingsModal = () => {

    const {response, error, loading } = useAxios({url: "/api_category.php"});
   
     console.log(response);
    // // console.log(response.trivia_categories.map((category) => category.name));
    // console.log(response.trivia_categories[0]);


    //axios.defaults.baseURL = 'https://opentdb.com';
     //const {response, error, loading } = useAxios({url: "/api_category.php"});

    // const [response, setResponse] = useState();
    // const [error, setError] = useState("");
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {

    //     const fetchData = async (url) => {
    //       return await axios
    //             .get(url)
    //                 .then(res => res.data)
    //                 .catch(err => setError(err))
    //                 .finally(() => setLoading(false))

    //     }
    //     fetchData("/api_category.php").then(data => setResponse(data));
    // }, [response]);
    
    //console.log(response.trivia_categories);

    const difficultyOptions = [
        {id: "easy", name:"Easy"},
        {id: "medium", name:"Medium"},
        {id: "hard", name:"Hard"},
    ]

    const dispatch = useDispatch();

    const toggleModal = (e) => {
        e.preventDefault();
        dispatch(settingsModalActions.toggleSettingsModal());
    }


    const handleSubmit =   (e) => {
        e.preventDefault();
    }

    const handleChnage = (e) => {

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
                        <form onSubmit={handleSubmit}>
                            <div className='modal-item'>
                            <label htmlFor='category'>Choose category</label>
                            <select name='category' id='category'>
                            {/* {response.trivia_categories.map((category) => <option>{category.name}</option>)} */}
                                {/* <option value='science'>{response.trivia_categories.map((category) => <option>{category.name}</option>)}</option> */}
                        
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
                            <div className='modal-item'>
                            <label htmlFor="number">Number of questions</label>
                            <input onChange={handleChnage} type='number' id="number" name='number'></input>
                            </div>
                            <div>
                            <Grid className="button-container" style={{ display:'flex', alignItems:'center', justifyContent:'center', margin:'auto', height:'100px' }}>
                                <Button variant="contained" style={{fontWeight:'bold', height: '50px'}} sx={{ p: 3, m: 2.6 }} >Get Started!</Button>
                            </Grid>    
                            </div>
                        </form>
                    </div>
                </div>  
            </div>
        </>
    )
}

export default SettingsModal;
