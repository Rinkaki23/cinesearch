import { createSlice } from '@reduxjs/toolkit';

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [], // list of movies
    favorites: JSON.parse(localStorage.getItem('favorites')) || [], // For Storing favorite movies
    totalPages: 0,
    selectedMovie: null, // For Modal
    savedQuery: '',
    savedPage: 1,
  },
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
    },

    setTotalPages: (state, action) => {
      state.totalPages = Math.min(action.payload || 0, 500);
    },

    setSelectedMovie: (state, action) => {
      state.selectedMovie = action.payload;
    },

    toggleFavorite: (state, action) => {
      const movie = action.payload;
      const isFav = state.favorites.some((f) => f.id === movie.id);

      if (isFav) {
        state.favorites = state.favorites.filter((f) => f.id !== movie.id);
      } else {
        state.favorites.push(movie);
      }
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },

    saveSearchHistory: (state, action) => {
      state.savedQuery = action.payload.query;
      state.savedPage = action.payload.page;
    },
  },
});

export const {
  setMovies,
  setTotalPages,
  setSelectedMovie,
  toggleFavorite,
  saveSearchHistory,
} = movieSlice.actions;

export default movieSlice.reducer;
