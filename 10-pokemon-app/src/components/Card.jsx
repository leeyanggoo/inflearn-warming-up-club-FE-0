import React, { memo } from 'react';
import { getColor, colors } from '../api/colors';
import { Link } from 'react-router-dom';

// memo를 사용해서 id가 다른 경우만 렌더링
const Card = memo(function Card({ data }) {
  const { id, name, types, sprites } = data;
  const type = types[0].type.name;
  const sprite = sprites.other.showdown.front_default;
  const color = getColor(type);

  return (
    <div className='flex flex-col justify-between w-full h-full overflow-hidden text-sm bg-gray-800 rounded-xl'>
      <Link to={`search/${id}`} state={data}>
        <div className={`text-right py-2 px-3`} style={{ color: color }}>
          {`#${String(id).padStart(3, '0')}`}
        </div>
        <div className='flex items-center justify-center h-20'>
          <img src={sprite} alt={name} loading='lazy' />
        </div>
        <div
          className={`w-full py-1 px-3 truncate text-center text-white`}
          style={{ backgroundColor: color }}
        >
          {name}
        </div>
      </Link>
    </div>
  );
});

export default Card;
