import { useEffect, useState } from 'react';
import {
  Routes,
  Route,
  Link,
  useLocation,
  useSearchParams,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  setMovies,
  setTotalPages,
  setSelectedMovie,
  toggleFavorite,
  saveSearchHistory,
} from './slices/movieSlice';
import { getMovies, getMovieDetails } from './services/movieService';

// Navigation pages router
import Home from './pages/Home';
import FavoritesPage from './pages/FavoritesPage';
import NotFoundPage from './pages/NotFoundPage';

import MovieDetailsModal from './components/MovieDetailsModal';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    movies,
    favorites,
    totalPages,
    selectedMovie,
    savedQuery,
    savedPage,
  } = useSelector((state) => state.movieApp);

  const queryParam = searchParams.get('q') || '';
  const pageParam = parseInt(searchParams.get('page')) || 1;
  const isFavoritesView = location.pathname === '/favorites';

  useEffect(() => {
    if (isFavoritesView) return;

    const fetchMoviesData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getMovies(queryParam, pageParam);
        dispatch(setMovies(data.results || []));
        dispatch(setTotalPages(data.total_pages || 0));
        dispatch(saveSearchHistory({ query: queryParam, page: pageParam }));
      } catch (err) {
        setError('Failed to fetch movies.');
      } finally {
        setLoading(false);
      }
    };

    // delaying for fetching API.
    const delayDebounce = setTimeout(() => {
      fetchMoviesData();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [queryParam, pageParam, isFavoritesView, dispatch]);

  const handleViewDetails = async (movieId) => {
    try {
      const details = await getMovieDetails(movieId);
      dispatch(setSelectedMovie(details));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = (term) => {
    setSearchParams({ q: term, page: '1' });
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setSearchParams({ q: queryParam, page: newPage.toString() });
    }
  };

  const isFavorite = (movieId) => favorites.some((f) => f.id === movieId);

  return (
    <div className="container mx-auto p-4 flex flex-col items-center text-center">
      {/* Navigation */}
      <nav className="w-full flex justify-end mb-4 navbar bg-base-300 shadow-lg rounded-2xl sticky top-0 z-10 opacity-90">
        <Link to='/' className="self-center mr-auto text-4xl font-extrabold text-red-600">
          CS
        </Link>
        <div className="tabs tabs-box tabs-md ">
          <Link
            to={`/?q=${savedQuery}&page=${savedPage}`}
            className={`tab text-lg ${!isFavoritesView ? 'tab-active ' : ''}`}
          >
            Search / Popular
          </Link>
          <Link
            to="/favorites"
            className={`tab text-lg ${isFavoritesView ? 'tab-active' : ''}`}
          >
            Favorites ({favorites.length})
          </Link>
        </div>
      </nav>

      {/* HEADER */}
      <header className="text-center mb-8">
        <h1 className="text-6xl font-extrabold drop-shadow-2xl inline-block">
          <span className="text-red-600">C</span>ine
          <span className="text-red-600">S</span>earch
        </h1>
      </header>

      {/* Router pages */}
      <Routes>
        <Route
          path="/"
          element={
            <Home
              loading={loading}
              setLoading={setLoading}
              error={error}
              setError={setError}
              movies={movies}
              totalPages={totalPages}
              pageParam={pageParam}
              queryParam={queryParam}
              handleSearch={handleSearch}
              handlePageChange={handlePageChange}
              isFavorite={isFavorite}
              handleViewDetails={handleViewDetails}
              toggleFavorite={toggleFavorite}
              dispatch={dispatch}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <FavoritesPage
              favorites={favorites}
              isFavorite={isFavorite}
              handleViewDetails={handleViewDetails}
              toggleFavorite={toggleFavorite}
              dispatch={dispatch}
            />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {/* Modal Details */}
      {selectedMovie && (
        <MovieDetailsModal
          movie={selectedMovie}
          onClose={() => dispatch(setSelectedMovie(null))}
          isFavorite={isFavorite(selectedMovie.id)}
          onToggleFavorite={() => dispatch(toggleFavorite(selectedMovie))}
        />
      )}
    </div>
  );
};

export default App;
