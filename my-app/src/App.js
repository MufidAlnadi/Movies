import axios from "axios";
import React, { useState, useEffect } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/movies")
      .then((response) => {
        const data = response.data;
        setMovies(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "" || movie.genre.includes(selectedCategory))
  );

  const categories = [...new Set(movies.map((movie) => movie.genre).flat())];

  return (
    <>
      <div className="flex justify-center p-4">
        <input
          type="text"
          placeholder="Search movies..."
          className="p-2 border border-gray-300 rounded-lg"
          value={searchTerm}
          onChange={handleSearch}
        />
        <select
          className="ml-4 p-2 border border-gray-300 rounded-lg"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-3 gap-4 p-4">
        {filteredMovies.map((movie) => (
          <div
            key={movie.id}
            className="bg-white rounded-lg shadow-lg p-4 overflow-hidden transform transition duration-300 hover:scale-105"
          >
            {movie.image && (
              <img src={movie.image} alt={movie.title} className="mb-5" />
            )}
            <h3 className="text-xl font-bold">{movie.title}</h3>
            <p>{movie.description}</p>
            <p>Rating: {movie.rating}</p>
            <p>Year: {movie.year}</p>
            <p>Genre: {movie.genre.join(", ")}</p>
            <p>Director: {movie.director.join(", ")}</p>
            <p>Writers: {movie.writers.join(", ")}</p>
            <div class="text-center m-5">
              <a
                href="{movie.trailer}"
                target="_blank"
                rel="noopener noreferrer"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
              >
                Watch Trailer
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
