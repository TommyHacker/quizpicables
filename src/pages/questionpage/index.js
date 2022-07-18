import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { increment, noChange } from "../../redux-toolkit/counter"

const questionPage = () => {

    const { userScore } = useSelector((state) => state.scoreCounter);
    const  dispatch = useDispatch();

    return (
    <>
    {/* TEST LAYOUT FOR PRODUCTION ONLY*/}
      <h1>Question Page!</h1>
      <h2> The user score is: { userScore }</h2>
      <button onClick={() => dispatch(incorrect())}>Answer A</button>
      <button onClick={() => dispatch(incorrect())}>Answer B</button>
      <button onClick={() => dispatch(correct())}>Answer C - Correct Answer</button>
      <button onClick={() => dispatch(nochange())}>Answer D</button>
    </>

)};

export default questionPage;