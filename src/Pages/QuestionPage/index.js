import React from "react";
import UserAvatar  from '../../components/UserAvatar';
import background from '../../assets/images/space-background.png'
import { useDispatch, useSelector } from "react-redux";
import { correct, incorrect } from "../../redux-toolkit/store/counter";

const QuestionPage = () => {
  const { score } = useSelector((state) => state.scoreCounter);
  const dispatch = useDispatch();


  return (
    <>
     <div class='race-container' style={{height: '40%', background: '#ccc', padding: '15px', backgroundImage: `url(${background})`, backgroundRepeat:"no-repeat",backgroundSize:"cover", width:'100vw'}}>
       <UserAvatar/>
      </div>
       <h1>Q page</h1>
      
    </>
  );
}

export default QuestionPage;
