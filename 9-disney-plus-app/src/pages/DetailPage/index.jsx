import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import instance from "../../api/axios";

const DetailPage = () => {
  let { movieId } = useParams();
  const [movieDetail, setMovieDetail] = useState(null);

  useEffect(() => {
    fetchMovieDetail();
  }, [movieId]);

  const fetchMovieDetail = async () => {
    try {
      const response = await instance.get(`/movie/${movieId}`);

      setMovieDetail(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return movieDetail ? (
    <section>
      <img
        className="modal__poster-img"
        src={`https://image.tmdb.org/t/p/original/${
          movieDetail.backdrop_path || movieDetail.poster_path
        }`}
        alt="poster"
      />
    </section>
  ) : (
    <div className="flex items-center justify-center w-full text-white h-96">
      Loading...
    </div>
  );
};

export default DetailPage;
