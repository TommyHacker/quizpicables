import React, {useState, useEffect} from "react";
import './GameSettings.css';
import { useDispatch } from "react-redux";
import { settingsModalActions } from "../../redux-toolkit/store/modal-slice";
//import useAxios from "../../hooks/useAxios";
import { getCategories } from "../../hooks/useAxios";

//MATERIAL UI
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const SettingsModal = () => {

   //const {response, error, loading } = useAxios({url: "/api_category.php"});
   const [number, setNumber] = useState(0);
   const [difficulty, setDifficulty] = useState('');
   const [category, setCategory] = useState('');

   const [categories, setCategories] = useState([]);

   useEffect(() => {
    getCategories().then((categoriesFromApi) => {
      setCategories(categoriesFromApi.trivia_categories);
    });
  }, []);



    const difficultyOptions = [
        {id: "easy", name:"Easy"},
        {id: "medium", name:"Medium"},
        {id: "hard", name:"Hard"},
    ]

    const dispatch = useDispatch();

    const toggleModal = (e) => {
        e.preventDefault();
        dispatch(settingsModalActions.toggleSettingsModal());
        console.log(response.trivia_categories);
        console.log(response.trivia_categories.map((category => category.name )));
    }


    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleNumber = (e) => {
        setNumber(e.target.value);
    }

    const handleDifficulty = (e) => {
        setDifficulty(e.target.value);
    }

    const handleCategory = (e) => {
        setCategory(e.target.value);
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
                            <label htmlFor='category'>Choose a category</label>
                            {/* <select name='category' id='category' onChange={handleCategory}>
                            {response.trivia_categories.map(({id, name}) => <option key={id} value={id}>{name}</option> )}
                            {/* <option>Option 1</option> 
                            <option></option>
                            </select> */}
                             <select onChange={handleCategory}>
                            {categories.map((category) => {
                            return (
                                <option key={category.id}>
                                    {category.name}
                                </option>
                            );
                            })}
                        </select>
                            </div>
                            <div className='modal-item'>
                            <label htmlFor='difficulty'>Choose difficulty level</label>
                            <select name='difficulty' id='difficulty' onChange={handleDifficulty}>
                            {difficultyOptions.map(({id, name}) => <option key={id} value={id}>{name}</option> )}
                            </select>
                            </div>
                            <div className='modal-item'>
                            <label htmlFor="number">Number of questions</label>
                            <input onChange={handleNumber} type='number' id="number" name='number'></input>
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
