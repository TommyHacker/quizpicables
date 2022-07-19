import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { correct, incorrect } from "../../redux-toolkit/store/counter";
import { getQuestions } from "../../hooks/useAxios";

const QuestionPage = () => {
  //const { score } = useSelector((state) => state.scoreCounter);
  const dispatch = useDispatch();
  const [question, setQuestions] = useState([]);

  const {
    question_category, question_difficulty, question_type, amount_of_questions, score
  } = useSelector(state => state.questions);
  
  useEffect(() => {
    getQuestions().then((questionsFromAPI) => {
        setQuestions(questionsFromAPI.results)
    });
    }, [])

  return (
    <>
      <div>
        <h4>Question 1</h4>
        <h4>This is a question?</h4>
        <div>
          <button>Answer 1</button>
          <button>Answer 2</button>
          <button>Answer 3</button>
          <button>Answer 4</button>
        </div>
        <div>
          <p>Score: 2 / 5</p>
        </div>
      </div>
    </>
  );
};

export default QuestionPage;
