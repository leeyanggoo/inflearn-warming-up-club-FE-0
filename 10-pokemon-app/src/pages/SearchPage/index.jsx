import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDebounce } from '../../hooks/useDebounce';
import { getPokemonById } from '../../api/axios';
import Card from '../../components/Card';
import Search from '../../components/Search';

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState({});
  const useQuery = () => new URLSearchParams(useLocation().search);

  let query = useQuery();
  const searchTerm = query.get('q');
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchSearchPokemon(debouncedSearchTerm);
    }
    return () => setSearchResults({});
  }, [debouncedSearchTerm]);

  const fetchSearchPokemon = async searchTerm => {
    try {
      const data = await getPokemonById(searchTerm);
      setSearchResults(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className='flex items-center justify-center'>
      <Search />
      {Object.keys(searchResults).length > 0 ? (
        <div className='w-[170px]'>
          <Card data={searchResults} />
        </div>
      ) : (
        <p>A Pokémon called {debouncedSearchTerm} has not been born yet.</p>
      )}
    </section>
  );
};

export default SearchPage;
