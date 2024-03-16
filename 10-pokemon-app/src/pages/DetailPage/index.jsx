import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { getColor } from '../../api/colors';
import { getDamageRelationsByType, getPokemonById } from '../../api/axios';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import Header from '../../components/Header';
import useLoading from '../../hooks/useLoading';
import isLoading from '../../hooks/useLoading';

const DetailPage = () => {
  const navegate = useNavigate();
  const { pokemonId } = useParams();
  const [pokemonData, setPokemonData] = useState({});
  const [damageData, setDamageData] = useState({});
  const [show, setShow] = useState(false);
  const damageModalRef = useRef();
  const containerRef = useRef();

  useOnClickOutside(damageModalRef, () => {
    setShow(false);
  });

  const getData = async id => {
    try {
      isLoading({ element: containerRef.current, state: false });
      const data = await getPokemonById(id);
      setPokemonData(data);

      const type = data.types[0].type.name;

      const damageData = await getDamageRelationsByType(type);
      const { double_damage_from, half_damage_from, no_damage_from } =
        damageData;

      setDamageData({
        weak: double_damage_from,
        resistant: half_damage_from,
        immune: no_damage_from,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData(pokemonId);
  }, [pokemonId]);

  function nextPokemon() {
    const nextId = Number(id) + 1;
    navegate(`/search/${nextId}`);
  }

  function prevPokemon() {
    if (id === 1) return;

    const prevId = Number(id) - 1;
    navegate(`/search/${prevId}`);
  }

  if (
    Object.keys(pokemonData).length === 0 &&
    Object.keys(damageData).length === 0
  )
    return;

  const { id, name, types, sprites, weight, height, abilities, stats } =
    pokemonData;
  const type = types[0].type.name;
  const sprite = sprites.other['official-artwork'].front_default;
  const color = getColor(type);

  return (
    <div className='w-full'>
      <Header />
      <div className='w-full lg:w-[1024px] py-24 px-10 mx-auto'>
        <div
          className='h-[85vh] relative text-white w-full flex flex-col items-center'
          style={{
            backgroundImage: `linear-gradient(
              to bottom,
              ${color} 0%,
              ${color} 30%,
              rgb(31 41 55) 30%,
              rgb(31 41 55) 100%
            )`,
          }}
          ref={containerRef}
        >
          {show ? (
            <div className='flex items-center justify-center w-full h-full font-bold text-black capitalize bg-gray-700'>
              <div
                className='w-1/2 p-5 bg-white rounded-lg'
                ref={damageModalRef}
              >
                <div className='flex flex-row items-center justify-between'>
                  <p>Damage Relations</p>
                  <button onClick={() => setShow(false)}>X</button>
                </div>
                <div className='flex flex-col items-center justify-center gap-2'>
                  {Object.keys(damageData).map(key => (
                    <div
                      key={key}
                      className='flex flex-col items-center justify-center gap-1'
                    >
                      <p className='text-gray-600'>{key}</p>
                      <div className='flex flex-row items-center justify-center gap-1'>
                        {damageData[key].length === 0 ? (
                          <p
                            key={`${key}-none`}
                            className={`py-1 px-3 rounded-full text-xs flex flex-row items-center gap-1`}
                            style={{ backgroundColor: getColor('default') }}
                          >
                            <span>{'None'}</span>
                          </p>
                        ) : (
                          damageData[key].map(weak => {
                            const { name } = weak;
                            const color = getColor(name);
                            return (
                              <p
                                key={name}
                                className={`py-1 px-3 rounded-full text-xs flex flex-row items-center gap-1`}
                                style={{ backgroundColor: color }}
                              >
                                <span>{name}</span>
                                {key !== 'immune' && (
                                  <span className='p-1 bg-gray-300 rounded-full'>
                                    {key === 'weak'
                                      ? '2x'
                                      : key === 'resistant' && '1/2x'}
                                  </span>
                                )}
                              </p>
                            );
                          })
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className='flex flex-row items-center justify-between w-full p-5 font-bold'>
                <h3 className='text-2xl uppercase'>{name}</h3>
                <span>{`#${String(id).padStart(3, '0')}`}</span>
              </div>
              <div className='flex items-center justify-center h-60'>
                <img
                  src={sprite}
                  alt={name}
                  loading='lazy'
                  className='h-full cursor-pointer'
                  onClick={() => setShow(true)}
                />
              </div>
              <div className='flex flex-col items-center justify-center w-1/2 gap-1'>
                <span
                  className={`py-1 px-5 rounded-full block w-fit mx-auto`}
                  style={{ backgroundColor: color }}
                >
                  {type}
                </span>
                <p
                  className={`py-1 px-5 block w-fit mx-auto font-semibold`}
                  style={{ color: color }}
                >
                  {'Infomation'}
                </p>
                <div className='flex flex-row gap-8 mx-auto text-center w-fit'>
                  <div className='flex flex-col gap-1'>
                    <span className='text-sm text-gray-400'>Weight</span>
                    <p className='font-bold'>{`${weight / 10}kg`}</p>
                  </div>
                  <div className='flex flex-col gap-1'>
                    <span className='text-sm text-gray-400'>Height</span>
                    <p className='font-bold'>{`${height / 10}m`}</p>
                  </div>
                  <div className='flex flex-col gap-1'>
                    <span className='text-sm text-gray-400'>Abilities</span>
                    {abilities.map(abilities => {
                      const { ability } = abilities;
                      const { name } = ability;

                      return (
                        <p
                          key={name}
                          className='text-xs capitalize'
                        >{`${name}`}</p>
                      );
                    })}
                  </div>
                </div>
                <p
                  className={`py-1 px-5 block w-fit mx-auto font-semibold`}
                  style={{ color: color }}
                >
                  {'Stats'}
                </p>
                {stats.map(stats => {
                  const { base_stat, stat } = stats;
                  const { name } = stat;
                  return (
                    <div
                      key={name}
                      className='flex flex-row items-center justify-center w-full gap-5'
                    >
                      <p className='w-4/12 font-bold capitalize'>{name}</p>
                      <p className='w-1/12 font-bold capitalize'>{base_stat}</p>
                      <p className='w-6/12 h-3 bg-gray-500 rounded-xl'>
                        <span
                          style={{
                            display: 'block',
                            backgroundColor: `${color}`,
                            width: `${(base_stat / 255) * 100}%`,
                            height: '100%',
                            borderRadius: '0.75rem',
                          }}
                        ></span>
                      </p>
                      <p className='w-1/12 font-bold capitalize'>{'255'}</p>
                    </div>
                  );
                })}
              </div>
              <button
                onClick={prevPokemon}
                className='absolute top-[50%] left-10 translate-x-[-50%] translate-y-[-50%] text-5xl'
              >
                {'<'}
              </button>
              <button
                onClick={nextPokemon}
                className='absolute top-[50%] right-10 translate-x-[50%] translate-y-[-50%] text-5xl'
              >
                {'>'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
