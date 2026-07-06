import { useEffect } from 'react';
import { getMovies } from '../services/movieService';
import { setMovies, setTotalPages } from '../slices/movieSlice';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import Pages from '../components/Pages';

const Home = ({
  loading,
  setLoading,
  error,
  setError,
  movies,
  totalPages,
  pageParam,
  queryParam,
  handleSearch,
  handlePageChange,
  isFavorite,
  handleViewDetails,
  toggleFavorite,
  dispatch,
}) => {
  useEffect(() => {
    const fetchMoviesData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getMovies(queryParam, pageParam);
        dispatch(setMovies(data.results || []));
        dispatch(setTotalPages(data.total_pages || 0));
      } catch (err) {
        setError('Failed to fetch movies.');
      } finally {
        setLoading(false);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchMoviesData();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [queryParam, pageParam, dispatch, setLoading, setError]);

  return (
    <>
      <div className="flex justify-center w-full mb-8">
        <div className="w-full max-w-md">
          <SearchBar onSearch={handleSearch} initialValue={queryParam} />
        </div>
      </div>

      {loading && <div className="text-xl my-4">Loading movies...</div>}
      {error && <div className="text-red-500 my-4">{error}</div>}

      {!loading && !error && movies.length === 0 && (
        <div className="text-center my-16 bg-neutral p-8 rounded-2xl max-w-md mx-auto shadow-md">
          <p className="text-2xl mb-2">🔍</p>
          <h3 className="text-xl font-bold text-white mb-1">No Movies Found</h3>
          <p className="text-gray-400 text-sm">
            We couldn't find anything matching{' '}
            <span className="text-primary font-semibold">
              "{queryParam || 'your search'}"
            </span>
            . Check your spelling or try another keyword!
          </p>
        </div>
      )}

      {!loading && !error && movies.length > 0 && (
        <main className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onToggleFavorite={(m) => dispatch(toggleFavorite(m))}
                isFavorite={isFavorite(movie.id)}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </main>
      )}

      {totalPages > 1 && !loading && !error && (
        <div className="mt-6">
          <Pages
            currentPage={pageParam}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
};

export default Home;
