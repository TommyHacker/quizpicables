import axios from "axios";
import { useSelector } from "react-redux";


const openDb = axios.create({
  baseURL: "https://opentdb.com",
});

export const getCategories = () => {
  return openDb.get("/api_category.php").then(({ data }) => {
    return data;
  });
};

