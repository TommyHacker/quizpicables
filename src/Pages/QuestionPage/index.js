import React from "react";
import UserAvatar  from '../../components/UserAvatar';

import { useDispatch, useSelector } from "react-redux";
import { correct, incorrect } from "../../redux-toolkit/store/counter";

const QuestionPage = () => {
  const { score } = useSelector((state) => state.scoreCounter);
  const dispatch = useDispatch();


  return (
    <>
     <div class='race-container' style={{height: '40%', background: '#ccc', padding: '15px'}}>
       <UserAvatar/>
      </div>
       <h1>Q page</h1>
      
    </>
  );
}

export default QuestionPage;
