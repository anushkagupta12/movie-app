import React from 'react';

const MovieCard = ({ movie, onClick }) => {
  return (
    <div
      className="w-full sm:w-[12rem] md:w-[14rem] lg:w-[16rem] xl:w-[18rem] bg-white text-black border rounded-lg overflow-hidden shadow cursor-pointer hover:scale-105 transition-transform duration-300"
      onClick={onClick}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full aspect-[2/3] object-cover"
      />
      <div className="p-2 text-center font-medium text-sm sm:text-base truncate">
        {movie.title}
      </div>
    </div>
  );
};

export default MovieCard;
