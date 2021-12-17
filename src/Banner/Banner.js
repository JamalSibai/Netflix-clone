import React, { useState, useEffect } from "react";
import axios from "../axios";
import requests from "../requests";
import "./Banner.css";

function Banner() {
  const [movie, setMovie] = useState([]);

  async function fetchData() {
    const request = await axios.get(requests.fetchNetflixOriginals);
    await setMovie(
      request.data.results[
        Math.floor(Math.random() * request.data.results.length - 1)
      ]
    );
  }

  function truncateString(str, num) {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  }

  useEffect(() => {
    fetchData();
    console.log("movie");
    console.log(movie);
  }, []);

  return movie.overview ? (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",

        backgroundImage: `url("https://image.tmdb.org/t/p/original/${
          movie?.poster_path || movie?.poster_path
        }")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner_ buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">My list</button>
        </div>
        <h1 className="banner_description">
          {truncateString(movie?.overview, 150)}
        </h1>
      </div>
      <div className="banner--fadebottom" />
    </header>
  ) : (
    <div></div>
  );
}

export default Banner;
