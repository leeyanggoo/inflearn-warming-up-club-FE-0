import React, { useState } from 'react';
import List from '../../components/List';
import Search from '../../components/Search';

const MainPage = () => {
  const [pageParam, setPageParam] = useState(0);

  const handleParams = () => {
    setPageParam(pageParam => pageParam + 1);
  };

  return (
    <>
      {/* <Search /> */}
      <List pageParam={pageParam} />
      <button
        onClick={handleParams}
        className='block px-4 py-2 mx-auto mt-10 text-white bg-gray-800 rounded-xl'
      >
        더 보기
      </button>
    </>
  );
};

export default MainPage;
