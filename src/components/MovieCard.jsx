import React from 'react';

const MovieCard = ({ movie, onClick }) => {
  return (
    <div
      className="w-full max-w-[90%] sm:max-w-[12rem] md:max-w-[14rem] lg:max-w-[16rem] xl:max-w-[18rem] bg-white text-black border rounded-lg overflow-hidden shadow-md cursor-pointer hover:scale-105 transition-transform duration-300 mx-auto"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      <img
        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/fallback.jpg'}
        alt={movie.title}
        className="w-full aspect-[2/3] object-cover"
      />
      <div className="p-2 text-center font-semibold text-sm sm:text-base truncate">
        {movie.title || 'Untitled'}
      </div>
    </div>
  );
};

export default MovieCard;
