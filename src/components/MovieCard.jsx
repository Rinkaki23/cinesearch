import React, { useState } from 'react';

const MovieCard = ({ movie, onToggleFavorite, isFavorite, onViewDetails }) => {
  const [isOpen, setIsOpen] = useState(false);

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : `https://dummyimage.com/500x750/cccccc/000000.png&text=No+Image`;

  const handleCardClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 cursor-default"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(false);
          }}
        ></div>
      )}

      <div
        onClick={handleCardClick}
        className="relative group rounded-2xl overflow-hidden shadow-lg aspect-[2/3] w-full bg-neutral cursor-pointer"
      >
        {/* Poster Image */}
        <img
          className="w-full h-full object-cover group-hover:scale-110 duration-300"
          src={posterUrl}
          alt={movie.title}
        />

        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/70 duration-300 flex flex-col justify-center items-center text-center p-4 transition-opacity ${
            isOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}
        >
          <h2 className="text-xl font-bold text-white mb-2">{movie.title}</h2>
          <div className="flex flex-row gap-4">
            <p className="text-gray-400">
              {movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'}
            </p>
            <p className="text-yellow-400 font-bold mb-4">
              ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
            </p>
          </div>
          <p className="text-gray-400 mb-4 line-clamp-3">
            {movie.overview ? movie.overview : 'N/A'}
          </p>
          <div className="flex gap-2">
            <button
              className="btn btn-sm btn-primary"
              onClick={() => onViewDetails(movie.id)}
            >
              Details...
            </button>
            <button
              onClick={() => onToggleFavorite(movie)}
              className={`btn btn-sm ${isFavorite ? 'btn-error text-white' : 'btn-accent'}`}
            >
              {isFavorite ? 'Remove' : '❤️ Add to Favorite'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
