const axios = require("axios");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const options = {
  method: "GET",
  url: "https://imdb-top-100-movies.p.rapidapi.com/",
  headers: {
    "X-RapidAPI-Key": "8b18e7b6d0mshfb7ed501a547991p13e665jsncfb7e5a62f49",
    "X-RapidAPI-Host": "imdb-top-100-movies.p.rapidapi.com",
  },
};

app.get("/movies", (req, res) => {
  axios
    .request(options)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "An error occurred" });
    });
});

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});
 