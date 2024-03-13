import React, { useEffect, useState } from 'react';
import { getPokemonById, getPokemonList } from '../api/axios';
import Card from './Card';

// const List = memo(function List({ pageParam }) {
const List = ({ pageParam }) => {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { results } = await getPokemonList(pageParam);
        const newList = [];
        // 비동기 함수 병렬 요청이라 순서 보장 X
        // results.map(async ({ name }) => {
        //   const data = await getPokemonById(name);
        //   setPokemonList((prev) => [...prev, data]);
        // });

        // 순서가 보장된 for문
        for (const { name } of results) {
          const data = await getPokemonById(name);
          newList.push(data);
        }

        setPokemonList(prev => [...prev, ...newList]);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [pageParam]);

  return (
    <section className='grid w-full gap-5 lg:grid-cols-5 md:grid-cols-3 justify-items-center'>
      {pokemonList.map(pokemon => {
        return <Card key={pokemon.name} data={pokemon} />;
      })}
    </section>
  );
};

export default List;
