import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const handleSearch = e => {
    setSearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`);
  };

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
