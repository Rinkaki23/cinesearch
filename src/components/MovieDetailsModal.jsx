import React from 'react';
const MovieDetailsModal = ({
  movie,
  onClose,
  isFavorite,
  onToggleFavorite,
}) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : `https://dummyimage.com/500x750/cccccc/000000.png&text=No+Image`;

  return (
    <div className="modal modal-open">
      <div className="modal-box w-full max-w-dvh sm:mx-w-3xl bg-base-100 shadow-xl">
        <h3 className="font-bold text-xl sm:text-2xl mb-4">{movie.title}</h3>
        {/* Poster */}
        <img
          src={posterUrl}
          alt={movie.title}
          className="rounded-xl mb-4 w-full object-contain max-h-95"
        />

        {/* Overview of movie */}
        <div className="text-left space-y-2">
          <p className="leading-relaxed">{movie.overview}</p>
          <p className="font-semibold">
            <span>Release Date: </span> {movie.release_date || 'N/A'}
          </p>
          <p>
            <span>Ratings: ⭐</span> {movie.vote_average.toFixed(1) || 'N/A'}
          </p>
          <p>
            <span>Genres: </span>{' '}
            {movie.genres ? movie.genres.map((g) => g.name).join(', ') : 'N/A'}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3 justify-end mt-6">
          <button
            onClick={onToggleFavorite}
            className={`btn text-white ${isFavorite ? 'btn-error' : 'btn-secondary'}`}
          >
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>

          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
      {/* Modal Onclick outside close */}
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
};

export default MovieDetailsModal;
