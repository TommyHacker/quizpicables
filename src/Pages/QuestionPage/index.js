import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeScore } from "../../redux-toolkit/store/questions-slice";
import { playerMovesCountActions } from "../../redux-toolkit/store/playerMovesCount";
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
  const [turnsCounter, setTurnsCounter] = useState(0);
  const { players } = useSelector((state) => state.players);
  const [playersLength, setplayersLength] = useState(players.length);
  const [turns, setTurns] = useState(0);

  const { question_category, question_difficulty, amount_of_questions, score } =
    useSelector((state) => state.questions);

  const { username } = useSelector((state) => state.username);
  const { isHost } = useSelector((state) => state.isHost);
  const { playerMovesCount } = useSelector((state) => state.playerMovesCount);
  const [howMany, setHowMany] = useState(0);

  useEffect(() => {
    socket.on("turns_logged", (data) => {
      console.log("next move triggered");
      dispatch(playerMovesCountActions.increment());
      // setTurns(data);
    });
  }, [handleTurn]);

  useEffect(() => {
    socket.on("reset", ({ data }) => {
      console.log("reset triggered");

      dispatch(playerMovesCountActions.reset());
      // setTurns(0);
    });
  }, [handleReset]);

  useEffect(() => {
    // setup triggered
    if (!isHost) {
      // if socket sends user "setup-quiz" method
      socket.on("setup_quiz", async ({ data, howMany }) => {
        console.log("setup-triggered");
        // store quiz data in questions state
        setQuestions(data);
        setHowMany({ howMany });
      });
    }
  }, [handleSetup]);

  useEffect(() => {
    socket.on("increment_question", () => {
      console.log("next question triggered");
      setQuestionIndex(questionIndex + 1);
    });
  }, [handleNextQuestion, questionIndex]);

  const handleTurn = useCallback(() => {
    socket.emit("turn_taken", { data: turns });
  });
  const handleReset = useCallback(() => {
    socket.emit("reset_turns");
  });

  const handleNextQuestion = useCallback(() => {
    socket.emit("next_question");
  });

  const handleSetup = useCallback(() => {
    socket.emit("setup_quiz", {
      data: questions,
    });
  });

  // once host has quiz data, request that host passes it through socket.

  useEffect(() => {
    if (isHost) {
      socket.on("setup_quiz", ({ data, howMany }) => {
        setHowMany(howMany);
      });
    }
  }, [handleSetup]);

  //Fetching quiz data:
  useEffect(() => {
    if (isHost) {
      async function fetchData() {
        try {
          const response = await axios.get(
            `https://opentdb.com/api.php?amount=${amount_of_questions}&difficulty=${question_difficulty}&category=${question_category}`
          );
          const data = await response.data;
          setQuestions(data.results);
        } catch (err) {
          console.log(err);
        }
      }
      fetchData();
    }
    handleSetup();
  }, []);

  // Adding a correct answer to an array of incorect answers at a random position
  useEffect(() => {
    if (questions.length > 1) {
      const question = questions[questionIndex];
      let answers = [...question.incorrect_answers];
      answers.splice(
        getRandomInt(question.incorrect_answers.length),
        0,
        question.correct_answer
      );
      setOptions(answers);
    }
  }, [questions.length]);

  // Increasing score if the answer is correct and moving to the next question
  const handleClickAnswer = async (e) => {
    const question = questions[questionIndex];
    if (e.target.textContent === question.correct_answer) {
      await dispatch(changeScore(score + 1));
      socket.emit("update_score", { username, score: score + 1 });
    }
    console.log(
      "questionindex: ",
      questionIndex,
      "questions length: ",
      questions.length
    );
    if (questionIndex + 1 < questions.length) {
      console.log("still more questions, so handleNextQuestion");
      handleNextQuestion();
    } else {
      console.log("no more questions left, finishing the game");
      navigate("/finalresult");
    }

    // if (questionIndex + 1 < questions.length) {
    //   handleTurn();
    //   if (turns + 1 == playersLength) {
    //     setQuestionIndex(questionIndex + 1);

    //     handleReset();
    //   }
    // } else {
    //   navigate("/finalresult");
    // }
  };

  return (
    <>
      <div>
        <h4>Question {questionIndex + 1}</h4>
        {questions[questionIndex] ? (
          <h4>{decode(questions[questionIndex].question)}</h4>
        ) : (
          ""
        )}
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
          <p>{turnsCounter}</p>
        </div>
      </div>
    </>
  );
};

export default QuestionPage;
