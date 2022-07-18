import React from "react";
import { useDispatch, useSelector } from "react-redux";

const questionPage = () => {

    const { score } = useSelector((state) => state.scoreCounter);
    const  dispatch = useDispatch();

    return (
    <>
    {/* TEST LAYOUT FOR PRODUCTION ONLY*/}
      <h1>Question Page!</h1>
      <h2> The user score is: { score }</h2>
      <button onClick={() => dispatch(noChange())}>Wrong Answer</button>
      <button onClick={() => dispatch(noChange())}>Wrong Answer</button>
      <button onClick={() => dispatch(increment())}>Correct Answer</button>
      <button onClick={() => dispatch(nochange())}>Wrong Answer</button>
    </>

)};

export default questionPage;