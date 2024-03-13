import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { getColor } from '../../api/colors';

const DetailPage = () => {
  const location = useLocation();
  const data = location.state;

  const { id, name, types, sprites, weight, height, abilities } = data;
  const type = types[0].type.name;
  const sprite = sprites.other['official-artwork'].front_default;
  const color = getColor(type);

  return (
    <div className='h-[80dvh] p-5 relative'>
      <div className='flex flex-row items-center justify-between font-bold text-white'>
        <span>
          {'←'} {name}
        </span>
        <span>{`#${String(id).padStart(3, '0')}`}</span>
      </div>
      <div className='flex items-center justify-center h-60'>
        <img src={sprite} alt={name} loading='lazy' className='h-full' />
      </div>
      <span
        className={`py-1 px-5 rounded-full block w-fit mx-auto`}
        style={{ backgroundColor: color }}
      >
        {type}
      </span>
      <span
        className={`py-1 px-5 block w-fit mx-auto font-semibold`}
        style={{ color: color }}
      >
        {'정보'}
      </span>
      <div></div>

      <div
        className='absolute top-0 left-0 w-full h-1/4 -z-10'
        style={{ backgroundColor: color }}
      ></div>
      <div className='absolute bottom-0 left-0 w-full bg-gray-800 h-3/4 -z-10'></div>
    </div>
  );
};

export default DetailPage;
