import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { correct, incorrect } from "../../redux-toolkit/store/counter";

const QuestionPage = () => {
  const { score } = useSelector((state) => state.scoreCounter);
  const dispatch = useDispatch();

  return (
    <>

    </>
  );
};

export default QuestionPage;
