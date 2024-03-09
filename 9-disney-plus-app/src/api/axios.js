import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  params: {
    api_key: process.env.REACT_APP_API_KEY,
    language: "ko-KR",
    // disney plus network id
    with_networks: "2739",
  },
});

export default instance;
