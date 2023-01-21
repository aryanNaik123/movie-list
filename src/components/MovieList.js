import "./MovieList.css";

import React, { useState, useEffect } from "react";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState("");
  const [moviePoster, setMoviePoster] = useState("");

  useEffect(() => {
    if (newMovie) {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=2510c5af0fcc26c77ad4be499ab60e37&query=${newMovie}`
      )
        .then((response) => response.json())
        .then((data) => {
          const posterPath = data.results[0].poster_path;
          setMoviePoster(`https://image.tmdb.org/t/p/w200${posterPath}`);
        });
    }
  }, [newMovie]);

  function handleSubmit(e) {
    e.preventDefault();
    setMovies([...movies, { name: newMovie, poster: moviePoster }]);
    setNewMovie("");
    setMoviePoster("");
  }

  const handleRemove = (index) => {
    const updatedMovies = [...movies];
    updatedMovies.splice(index, 1);
    setMovies(updatedMovies);
  };

  return (
    <div className="container">
      <h2>My Favorite Movies:</h2>
      <div className="form-container">
        <form className="movie-form" onSubmit={handleSubmit}>
          <label>
            Add a movie:
            <input
              type="text"
              value={newMovie}
              onChange={(e) => setNewMovie(e.target.value)}
            />
          </label>
          <button type="submit" className="movie-submit-button">
            Add
          </button>
        </form>
      </div>
      <div className="movie-list-container">
        <ul className="movie-list">
          {movies.map((movie, index) => (
            <div className="movie-item">
              <li key={index}>
                <img
                  src={movie.poster}
                  alt={movie.name}
                  className="movie-poster"
                />
                <p className="movie-name">{movie.name}</p>
                <button
                  className="movie-remove"
                  onClick={() => handleRemove(index)}
                >
                  Remove
                </button>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MovieList;
