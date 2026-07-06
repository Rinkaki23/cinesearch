import MovieCard from '../components/MovieCard';

const FavoritesPage = ({
  favorites,
  isFavorite,
  handleViewDetails,
  toggleFavorite,
  dispatch,
}) => {
  return (
    <main className="w-full">
      {favorites.length === 0 ? (
        <div className="text-xl text-gray-500 my-12">
          No favorite movies saved yet!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
          {favorites.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onToggleFavorite={(m) => dispatch(toggleFavorite(m))}
              isFavorite={isFavorite(movie.id)}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default FavoritesPage;
