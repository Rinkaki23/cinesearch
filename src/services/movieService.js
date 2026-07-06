import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const getMovies = async (searchTerm, page = 1) => {
  if (searchTerm) {
    const res = await axios.get(
      'https://api.themoviedb.org/3/search/movie?api_key=' +
        API_KEY +
        '&query=' +
        searchTerm +
        '&page=' +
        page,
    );
    console.log('Fetched search movies:', res.data);
    return res.data;
  } else {
    const res = await axios.get(
      'https://api.themoviedb.org/3/movie/popular?api_key=' +
        API_KEY +
        '&page=' +
        page,
    );
    console.log('Fetched popular movies:', res.data);
    return res.data;
  }
};

export const getMovieDetails = async (movieId) => {
  const res = await axios.get(
    'https://api.themoviedb.org/3/movie/' + movieId + '?api_key=' + API_KEY,
  );
  console.log('Fetched movie details:', res.data);
  return res.data;
};
