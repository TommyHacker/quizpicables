import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usernameActions } from "../../redux-toolkit/store/user";
const UsernameComponent = () => {

    const dispatch = useDispatch();
    const { username } = useSelector((state) => state.username);
    
    useEffect(() => {
        
    })

  return <>{username && username}</>;
};

export default UsernameComponent;
