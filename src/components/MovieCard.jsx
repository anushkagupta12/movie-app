import React from 'react';

const MovieCard = ({ movie, onClick }) => {
  return (
    <div
      className="border rounded-lg overflow-hidden shadow bg-white text-black w-64 cursor-pointer hover:scale-105 transition"
      onClick={onClick}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="h-80 w-full object-cover"
      />
      <div className="p-2 text-center font-medium">
        {movie.title}
      </div>
    </div>
  );
};

export default MovieCard;
