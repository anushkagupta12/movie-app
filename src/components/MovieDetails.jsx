import React, { useEffect, useState } from 'react';

const MovieDetails = ({ movieId, onClose }) => {
  const [details, setDetails] = useState(null);
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchDetails = async () => {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);
      const data = await res.json();
      setDetails(data);
    };
    fetchDetails();
  }, [movieId]);

  if (!details) return <p>Loading...</p>;

  const duration = `${Math.floor(details.runtime / 60)} hour(s) and ${details.runtime % 60} minute(s)`;

  return (
    <div className="bg-white text-black p-6 rounded-lg shadow-lg max-w-6xl mx-auto">
      <button onClick={onClose} className="mb-4 px-4 py-2 bg-red-500 text-white rounded">Back</button>
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
          alt={details.title}
          className="w-72 rounded-lg"
        />
        <div>
          <h2 className="text-3xl font-bold mb-2">{details.title}</h2>
          <p className="mb-4">{details.overview}</p>

          <div className="mb-2 flex flex-wrap gap-2">
            {details.genres.map((g) => (
              <span key={g.id} className="px-2 py-1 bg-gray-200 rounded">{g.name}</span>
            ))}
          </div>

          <p className="mb-2">
            <strong>Languages:</strong>{" "}
            {details.spoken_languages.map((lang) => (
              <span key={lang.iso_639_1} className="px-2 py-1 bg-blue-200 text-sm rounded mr-1">
                {lang.english_name}
              </span>
            ))}
          </p>

          <p className="mb-2"><strong>Total Revenue:</strong> Rs.{details.revenue.toLocaleString()}</p>
          <p className="mb-2"><strong>Duration:</strong> {duration}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
