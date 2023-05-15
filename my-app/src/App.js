import axios from "axios";
import React, { useState, useEffect } from "react";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/movies")
      .then((response) => {
        const data = response.data.d;
        setMovies(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {movies.map((movie, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-lg p-4 overflow-hidden transform transition duration-300 hover:scale-105"
        >
          {movie.i && movie.i.imageUrl && (
            <img src={movie.i.imageUrl} alt={movie.l} className="mb-4" />
          )}
          <h3 className="text-xl font-bold">{movie.l}</h3>
        </div>
      ))}
    </div>
  );
}

export default App;
