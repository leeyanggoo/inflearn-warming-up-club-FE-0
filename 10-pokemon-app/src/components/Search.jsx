import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDebounce } from '../hooks/useDebounce';

const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearch = useDebounce(searchValue, 1000);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = e => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    if (debouncedSearch) {
      navigate(`/search?q=${debouncedSearch.toLowerCase()}`);
    }
  }, [debouncedSearch]);

  useEffect(() => {
    if (location.pathname === '/' && !location.search) {
      setSearchValue('');
    }
  }, [location]);

  return (
    <div className='my-10 text-center'>
      <input
        type='text'
        className='w-1/2 px-5 py-4 rounded-lg shadow-md'
        value={searchValue}
        onChange={e => handleSearch(e)}
        placeholder='Enter the name of the Pokemon you are looking for'
      />
    </div>
  );
};

export default Search;
