import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { increment, noChange } from "../../redux-toolkit/store/counter";

const QuestionPage = () => {
  const { userScore } = useSelector((state) => state.scoreCounter);
  const dispatch = useDispatch();

  return (
    <>
    
    </>
  );
};

export default QuestionPage;
