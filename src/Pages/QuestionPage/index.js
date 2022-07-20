import UserAvatar  from '../../components/UserAvatar';
import background from '../../assets/images/space-background.png'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeScore } from "../../redux-toolkit/store/questions-slice";
import { useNavigate } from "react-router-dom";
import { decode } from "html-entities";
import axios from "axios";
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

//Generating a random number
const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const QuestionPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([{ incorrect_answers: [] }]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [options, setOptions] = useState([]);

  const { question_category, question_difficulty, amount_of_questions, score } =
    useSelector((state) => state.questions);

  const { username } = useSelector((state) => state.username);
  const { isHost } = useSelector((state) => state.isHost);

  //Fetching quiz data:
  useEffect(() => {
    if (!isHost) return;
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://opentdb.com/api.php?amount=${amount_of_questions}&difficulty=${question_difficulty}&category=${question_category}`
        );
        const data = await response.data;
        setQuestions(data.results);
      } catch (err) {
        console.err(error);
      }
    }
    fetchData();
  }, []);

  // Adding a correct answer to an array of incorect answers at a random position
  useEffect(() => {
    if (!isHost) return;
    if (questions.length) {
      const question = questions[questionIndex];
      let answers = [...question.incorrect_answers];
      answers.splice(
        getRandomInt(question.incorrect_answers.length),
        0,
        question.correct_answer
      );
      setOptions(answers);
      socket.emit("setup_quiz", { data: {...question,questionIndex: questionIndex + 1 } });
    }
  }, [questions, questionIndex]);

  // Increasing score if the answer is correct and moving to the next question
  const handleClickAnswer = async (e) => {
    const question = questions[questionIndex];
    if (e.target.textContent === question.correct_answer) {
      await dispatch(changeScore(score + 1));
      console.log("sending username and score", username, score + 1);
      socket.emit("update_score", { username, score: score + 1 });
    }
    if (questionIndex + 1 < questions.length) {
      setQuestionIndex(questionIndex + 1);
    } else {
      navigate("/finalresult");
    }
  };

  console.log(questions);


  return (
    <>
     <div class='race-container' style={{height: '40%', background: '#ccc', padding: '15px', backgroundImage: `url(${background})`, backgroundRepeat:"no-repeat",backgroundSize:"cover", width:'100vw'}}>
       <UserAvatar/>
      </div>
       
      {/* QUESTION: DOES THIS HIDE THE QUESTION -AND- ANSWERS FROM THE GUEST USERS? */}
      {isHost ? (
        
        <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
          <Typography style={{textAlign: 'center', fontSize: '1.3rem'}}>
             <h1>Question {questionIndex + 1}</h1>
             <h2>{decode(questions[questionIndex].question)}</h2>
          </Typography>
          
          <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap'}}>
            {decode(
              options.map((data, id) => (
                
                    <Button onClick={handleClickAnswer} 
                          variant="contained"
                          style={{ flex: '34%', width: '480px', fontSize: '1.4em', fontWeight: "bold" }}
                          sx={{ p: 5, m: 2.6 }}
                          key={id}>
                      {data}
                    </Button>
              ))
            )}
          </div>

          <div>
            <Typography style={{fontSize:'1.5em', textAlign: 'center', fontWeight: 'bold'}}>
              Score: {score} / {questions.length}
            </Typography>
          </div>
        </div>
      ) : (
        
        <div>
          <h4>Question {questionIndex + 1}</h4>
          <h4>{decode(questions[questionIndex].question)}</h4>
          <div>
            {decode(
              options.map((data, id) => (
                <Button onClick={handleClickAnswer} 
                      variant="contained"
                      style={{ fontWeight: "bold" }}
                      sx={{ p: 3, m: 2.6 }}
                      key={id}>
                  {data}
                </Button>
              ))
            )}
          </div>
          <div>
            <p>
              Score: {score} / {questions.length}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default QuestionPage;
