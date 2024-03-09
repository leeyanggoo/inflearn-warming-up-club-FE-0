import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import instance from "../../api/axios";

import "./SearchPage.css";
import { useDebounce } from "../../hooks/useDebounce";

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const useQuery = () => new URLSearchParams(useLocation().search);
  const navigate = useNavigate();

  let query = useQuery();
  const searchTerm = query.get("q");
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchSearchMovie(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  const fetchSearchMovie = async (searchTerm) => {
    try {
      const request = await instance.get(`/search/multi?query=${searchTerm}`);
      setSearchResults(request.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  return searchResults.length > 0 ? (
    <section className="search-container">
      {searchResults.map((movie) => {
        if (movie.backdrop_path !== null && movie.media_type !== "person") {
          const movieImageUrl =
            "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
          return (
            <div className="movie" key={movie.id}>
              <div
                onClick={() => navigate(`/search/${movie.id}`)}
                className="movie__column-poster"
              >
                <img
                  src={movieImageUrl}
                  alt="movie"
                  className="movie__poster"
                />
              </div>
            </div>
          );
        }
      })}
    </section>
  ) : (
    <section className="no-results">
      <div className="no-results__text">
        <p>찾고자하는 검색어"{debouncedSearchTerm}"에 맞는 영화가 없습니다.</p>
      </div>
    </section>
  );
};

export default SearchPage;
