import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeScore } from "../../redux-toolkit/store/questions-slice";
import { useNavigate } from "react-router-dom";
import { decode } from "html-entities";
import axios from "axios";

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
      {isHost ? (
        <div>
          <h4>Question {questionIndex + 1}</h4>
          <h4>{decode(questions[questionIndex].question)}</h4>
          <div>
            {decode(
              options.map((data, id) => (
                <button onClick={handleClickAnswer} key={id}>
                  {data}
                </button>
              ))
            )}
          </div>
          <div>
            <p>
              Score: {score} / {questions.length}
            </p>
          </div>
        </div>
      ) : (
        <div>
          <h4>Question {questionIndex + 1}</h4>
          <h4>{decode(questions[questionIndex].question)}</h4>
          <div>
            {decode(
              options.map((data, id) => (
                <button onClick={handleClickAnswer} key={id}>
                  {data}
                </button>
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
};

export default QuestionPage;
