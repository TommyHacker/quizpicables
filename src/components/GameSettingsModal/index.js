import React, {useState, useEffect} from "react";
import './GameSettings.css';
import { useDispatch } from "react-redux";
import { settingsModalActions } from "../../redux-toolkit/store/modal-slice";
//import useAxios from "../../hooks/useAxios";
import { getCategories } from "../../hooks/useAxios";
import { changeAmount, changeCategory, changeDifficulty } from "../../redux-toolkit/store/questions-slice";
import  { useNavigate }  from "react-router-dom";

//MATERIAL UI
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const SettingsModal = () => {

   //const {response, error, loading } = useAxios({url: "/api_category.php"});
   const [number, setNumber] = useState(0);
   const [difficulty, setDifficulty] = useState('');
   const [category, setCategory] = useState('');

   const navigate = useNavigate();

   const [categories, setCategories] = useState([]);

   useEffect(() => {
    getCategories().then((categoriesFromApi) => {
      setCategories(categoriesFromApi.trivia_categories);
    });
  }, []);

    const categoryId = (categoryName) => {
        let id = 0;
        for(let i=0; i<categories.length; i++){
            if(categories[i].name === categoryName){
                id = categories[i].id;
            }
        }
        return id; 
    }

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


    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/question");

    }

    const handleNumber = (e) => {
        setNumber(e.target.value);
        dispatch(changeAmount(e.target.value));
    }

    const handleDifficulty = (e) => {
        setDifficulty(e.target.value);
        dispatch(changeDifficulty(e.target.value));
    }

    const handleCategory = (e) => {
        e.preventDefault();
        setCategory(e.target.value);
        const id = categoryId(e.target.value);
        dispatch(changeCategory(id));
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
                            <div className='modal-item'>
                            <label htmlFor='category'>Choose a category</label>
                             <select onChange={handleCategory}>
                            {categories.map((category) => {
                            return (<option key={category.id}> {category.name}</option>
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
                                <Button onClick={handleSubmit}variant="contained" style={{fontWeight:'bold', height: '50px'}} sx={{ p: 3, m: 2.6 }} >Get Started!</Button>
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
