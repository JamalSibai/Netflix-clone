import React, { useState, useEffect } from "react";
import axios from "../axios";
import "./Row.css";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const base_url = "http://image.tmdb.org/t/p/original/";

  async function fetchData() {
    const request = await axios.get(fetchUrl);
    // console.log(request.data.results);
    setMovies(request.data.results);
  }

  useEffect(() => {
    fetchData();
    console.log(movies);
  }, [fetchUrl]);

  return (
    <div className="row">
      <h1>{title}</h1>
      <div className="row_posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
            onClick={() => console.log(movie?.title || movie?.name)}
          />
        ))}
      </div>
    </div>
  );
}

export default Row;
