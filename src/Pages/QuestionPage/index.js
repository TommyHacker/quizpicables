import React, { useEffect, useCallback, useState } from 'react';
import UserAvatar from '../../components/UserAvatar';
import background from '../../assets/images/background8.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { changeScore } from '../../redux-toolkit/store/questions-slice';
import { playerMovesCountActions } from '../../redux-toolkit/store/playerMovesCount';
import { useNavigate } from 'react-router-dom';
import { decode } from 'html-entities';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './style.css';
import { scoreActions } from '../../redux-toolkit/store/user';

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
	const [howMany, setHowMany] = useState(0);

	const { question_category, question_difficulty, amount_of_questions } =
		useSelector((state) => state.questions);
	const { score } = useSelector((state) => state.score);

	const { username } = useSelector((state) => state.username);
	const { isHost } = useSelector((state) => state.isHost);
	const { playerMovesCount } = useSelector((state) => state.playerMovesCount);
	const [endGame, setEndGame] = useState(false);

	useEffect(() => {
		socket.on('turns_logged', ({ data }) => {
			dispatch(playerMovesCountActions.increment(data));
		});
	}, [handleTurn]);

	useEffect(() => {
		socket.on('reset', ({ data }) => {
			dispatch(playerMovesCountActions.reset());
		});
	}, [handleReset]);

	useEffect(() => {
		socket.on('setup_quiz', async ({ data, howMany }) => {
			if (!isHost) {
				// this may or may not be working.
				setQuestions(data);
				setHowMany({ howMany });
			}
		});
	}, [handleSetup]);

	useEffect(() => {
		// if recieved socket "increment_question"
		socket.on('increment_question', () => {
			// increment the redux state
			setQuestionIndex((prev) => prev + 1);
			// reset turn taken to allow button interaction
			setTurnTaken(false);
		});
		// if function has been triggered /\
	}, [handleNextQuestion]);

	const handleNextQuestion = useCallback(() => {
		// trigger next question to socket.io
		socket.emit('next_question');
	});

	const handleTurn = useCallback(() => {
		socket.emit('turn_taken', { data: playerMovesCount });
	});
	const handleReset = useCallback(() => {
		socket.emit('reset_turns');
	});

	const handleSetup = useCallback(async () => {
		if (isHost) {
			const questions = await fetchData();
			socket.emit('setup_quiz', {
				data: questions,
			});
		}
	});

	// once host has quiz data, request that host passes it through socket.

	useEffect(() => {
		if (!isHost) {
			socket.on('setup_quiz', ({ data, howMany }) => {
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
		const tempScores = [];
		if (endGame) {
			players.map((player) =>
				tempScores.push({ username: player.username, score: player.score })
			);
			window.localStorage.removeItem('oldscores');
			window.localStorage.setItem('oldscores', JSON.stringify({ tempScores }));
			navigate('/finalresult');
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
		console.log('e.target.textContent', e.target.textContent);
		console.log('question.correct_answer', question.correct_answer);
		if (e.target.textContent == question.correct_answer) {
			dispatch(scoreActions.setScore(score + 1));
			console.log('That was a correct answer!');
			let tempArr = [];
			const result = players.map((player) => {
				if (player.username === username) {
					tempArr.push({ username, isHost, score: score + 1 });
				} else {
					tempArr.push({
						username: player.username,
						isHost: player.isHost,
						score: player.score,
					});
				}
			});
			socket.emit('update_score', { data: tempArr });
		}
		if (questionIndex + 1 < questions.length) {
			if (playerMovesCount + 1 < players.length) {
				handleTurn();
			} else {
				handleNextQuestion();
				handleReset();
			}
		} else {
			console.log('end game');
			setEndGame(true);
		}
	};

	return (
		<>
			<div
				className='race-container'
				style={{
					height: '45%',
					background: '#ccc',
					padding: '15px',
					backgroundImage: `url(${background})`,
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
					width: '100%',
					padding: '4px',
				}}
			>
				{players &&
					players.map((player, i) => {
						return (
							<UserAvatar
								key={i + 50}
								player={player}
								index={i}
								questions={questions.length}
								avatarSrc={`userAvatar${i}.json`}
							/>
						);
					})}
			</div>

			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					flexDirection: 'column',
				}}
			>
				<Typography variant='h3' component='h3' sx={{ textAlign: 'center' }}>
					Question {questionIndex + 1}
				</Typography>

				<Typography component='h2' variant='h2' sx={{ textAlign: 'center' }}>
					{decode(questions[questionIndex].question)}
				</Typography>

				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						flexDirection: 'row',
						flexWrap: 'wrap',
					}}
				>
					{decode(
						options.map((data, id) => (
							<Button
								disabled={turnTaken}
								onClick={handleClickAnswer}
								variant='contained'
								style={{
									flex: '34%',
									minWidth: '320px',
									fontSize: '1.4em',
									fontWeight: 'bold',
								}}
								sx={{ p: 2, m: 2.6 }}
								key={id}
							>
								{data}
							</Button>
						))
					)}
				</div>

				<div>
					<Typography
						style={{
							fontSize: '1.5em',
							textAlign: 'center',
							fontWeight: 'bold',
						}}
					>
						Score: {score} / {questions.length}
					</Typography>
				</div>
			</div>
		</>
	);
};

export default QuestionPage;
