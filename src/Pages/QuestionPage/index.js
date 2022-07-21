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
  const { players } = useSelector((state) => state.players);
  const [turnTaken, setTurnTaken] = useState(false);

  const { question_category, question_difficulty, amount_of_questions, score } =
    useSelector((state) => state.questions);

  const { username } = useSelector((state) => state.username);
  const { isHost } = useSelector((state) => state.isHost);
  const { playerMovesCount } = useSelector((state) => state.playerMovesCount);
  const [endGame, setEndGame] = useState(false);

  useEffect(() => {
    socket.on("turns_logged", ({ data }) => {
      console.log("incrementing moves data:", data);
      dispatch(playerMovesCountActions.increment(data));
      console.log("incrementing moves");
    });
  }, [handleTurn]);

  useEffect(() => {
    socket.on("reset", ({ data }) => {
      dispatch(playerMovesCountActions.reset());
    });
  }, [handleReset]);

  useEffect(() => {
    socket.on("setup_quiz", async ({ data, howMany }) => {
      if (!isHost) {
        setQuestions(data);
        setHowMany({ howMany });
      }
    });
  }, [handleSetup]);

  useEffect(() => {
    socket.on("increment_question", () => {
      setQuestionIndex((prev) => prev + 1);
      console.log("next question triggered");
      setTurnTaken(false);
    });
  }, [handleNextQuestion]);

  const handleTurn = useCallback(() => {

    socket.emit("turn_taken", { data: playerMovesCount });
  });
  const handleReset = useCallback(() => {
    socket.emit("reset_turns");
  });

  const handleNextQuestion = useCallback(() => {
    socket.emit("next_question");
  });

  const handleSetup = useCallback(async () => {
    if (isHost) {
      const questions = await fetchData();
      socket.emit("setup_quiz", {
        data: questions,
      });
    }
  });

  // once host has quiz data, request that host passes it through socket.

  useEffect(() => {
    if (!isHost) {
      socket.on("setup_quiz", ({ data, howMany }) => {
        setQuestions(data);
        setHowMany(howMany);
      });
    }
  }, []);

  //Fetching quiz data:

  async function fetchData() {
    try {
      const response = await axios.get(
        `https://opentdb.com/api.php?amount=${amount_of_questions}&difficulty=${question_difficulty}&category=${question_category}`
      );
      const data = await response.data;
      setQuestions(data.results);
      return data.results;
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (endGame) {
      navigate("/finalresult");
    }
  }, [endGame]);

  useEffect(() => {
    if (isHost) {
      handleSetup();
    }
  }, []);
  // Adding a correct answer to an array of incorect answers at a random position
  useEffect(() => {
    if (questions.length) {
      const question = questions[questionIndex];
      let answers = [...question.incorrect_answers];
      answers.splice(
        getRandomInt(question.incorrect_answers.length),
        0,
        question.correct_answer
      );
      setOptions(answers);
    }
  }, [questions, questionIndex]);

  // Increasing score if the answer is correct and moving to the next question
  const handleClickAnswer = async (e) => {
    if (turnTaken) return;
    // dispatch(playerMovesCountActions.increment());
    setTurnTaken(true);
    const question = questions[questionIndex];
    if (e.target.textContent === question.correct_answer) {
      await dispatch(changeScore(score + 1));
      socket.emit("update_score", { username, score: score + 1 });
    }
    if (questionIndex + 1 < questions.length) {
      console.log(
        `questionindex: ${questionIndex} questionslength: ${questions.length}`
      );
      if (playerMovesCount + 1 < players.length) {
        handleTurn();
        console.log(
          `player move count ${playerMovesCount} players length ${players.length} still moves left, so wait for more moves`
        );
      } else {
        handleNextQuestion();
        handleReset();
        console.log("next questions!");
        console.log(
          `player move count ${playerMovesCount} players length ${players.length} still more questions, so handleNextQuestion`
        );
      }
    } else {
      console.log("end game");
      setEndGame(true);
    }

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
        {!turnTaken && (
          <div>
            {decode(
              options.map((data, id) => (
                <button onClick={handleClickAnswer} key={id}>
                  {data}
                </button>
              ))
            )}
          </div>
        )}
        <div>
          <p>
            Score: {score} / {questions.length}
          </p>
        </div>
      </div>
    </>
  );
};

export default QuestionPage;
