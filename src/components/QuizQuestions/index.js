import React from "react";
import axios from 'axios';
import { useEffect } from "react";
import {useState} from 'react';



const QuizQuestions = () => {

    const [questions, setQuestions] = useState({});

   // Get quiz data from an API
    useEffect(() => {
        async function getQuestions({number, category, level}) {
            try {
                const result = await axios.get(`https://opentdb.com/api.php?amount=${10}&category=${17}&difficulty=easy&type=multiple`);
                const quizData = result.data.results[0]
                console.log(quizData);
                setQuestions(quizData);
            } catch(err) {
                console.error(err);
            }
        }

        getQuestions();
    }, []);

    return (
        <>
            <h3>This is a question</h3>
            <ul> 
                <li>Answer 1</li>
                <li>Answer 2</li>
                <li>Answer 3</li>
                <li>Answer 4</li>
            </ul>
    
        </>
        
        
    );
}


export default QuizQuestions;
