import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

const LIMIT = 20;

export const getPokemonList = async (pageParam = 0) => {
  const { data } = await instance.get(`/pokemon`, {
    params: {
      limit: LIMIT,
      offset: pageParam * LIMIT,
    },
  });
  return data;
};

export const getPokemonById = async (id) => {
  const { data } = await instance.get(`/pokemon/${id}`);
  return data;
};
