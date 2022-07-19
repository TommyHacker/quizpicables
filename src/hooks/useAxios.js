// import axios from "axios";
// import { useEffect, useState } from "react";

// axios.defaults.baseURL = "https://opentdb.com";


// const  useAxios = ({url}) => {
//     const [response, setResponse] = useState([]);
//     const [error, setError] = useState("");
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {

//         const fetchData = async () => {
//             try{
//             const result = await axios.get(url);
//             const data = await result.data;
//             setResponse(data);
//             return data;
            
//         } catch (error) {
//             console.error(error);
//         }
//         };
//         fetchData();
        
//     }, [url]);
    
//       return {
//         response, error, loading };
//   }

// export default useAxios;


import axios from "axios";

const openDb = axios.create({
  baseURL: "https://opentdb.com",
});

export const getCategories = () => {
  return openDb.get("/api_category.php").then(({ data }) => {
    return data;
  });
};

export const getQuestions = () => {
  return openDb.get("/api.php?amount=10").then(({ data }) => {
    return data;
  });
};
