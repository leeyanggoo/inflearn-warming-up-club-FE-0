import React, { useEffect, useState } from "react";

//
import "./Row.css";
import instance from "../api/axios";
import MovieModal from "./MovieModal";

// import Swiper core and required modules
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Mousewheel,
} from "swiper/modules";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/mousewheel";

const Row = ({ title, id, fetchUrl, isLargeRow = false }) => {
  const [rowMovies, setRowMovies] = useState([]);
  const [rowModalOpen, setRowModalOpen] = useState(false);
  const [rowSelectedMovie, setRowSelectedMovie] = useState({});

  useEffect(() => {
    fetchRowMoiveData();
  }, [fetchUrl]);

  const fetchRowMoiveData = async () => {
    const request = await instance.get(fetchUrl);
    setRowMovies(request.data.results);
    return request;
  };

  const handleRowMovieClick = (movie) => {
    setRowModalOpen(true);
    setRowSelectedMovie(movie);
  };

  return (
    <section className="row">
      <h2>{title}</h2>
      <div id={id} className="row__posters">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Mousewheel]}
          loop={true}
          breakpoints={{
            1378: {
              slidesPerView: 6,
              slidesPerGroup: 6,
            },
            998: {
              slidesPerView: 5,
              slidesPerGroup: 5,
            },
            625: {
              slidesPerView: 4,
              slidesPerGroup: 4,
            },
            0: {
              slidesPerView: 3,
              slidesPerGroup: 3,
            },
          }}
          navigation
          pagination={{ clickable: true }}
          mousewheel
          speed={1000}
          spaceBetween={10}
        >
          {rowMovies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <div className="row__poster__wrap">
                <img
                  className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                  src={`${process.env.REACT_APP_IMAGE_URL}/${
                    (isLargeRow ? movie.poster_path : movie.backdrop_path) ||
                    movie.poster_path
                  }`}
                  alt={movie.name}
                  loading="lazy"
                  onClick={() => handleRowMovieClick(movie)}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {rowModalOpen && (
        <MovieModal {...rowSelectedMovie} setModalOpen={setRowModalOpen} />
      )}
    </section>
  );
};

export default Row;
