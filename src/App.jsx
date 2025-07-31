import React, { useEffect, useState } from 'react';
import MovieCard from './components/MovieCard';
import SortDropdown from './components/SortDropDown';
import MovieDetails from './components/MovieDetails';

const App = () => {
  const [movies, setMovies] = useState({
    popular: [],
    top_rated: [],
    upcoming: [],
    search: [],
    single: [],
  });

  const [sortOption, setSortOption] = useState('');
  const [search, setSearch] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);

  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  const fetchCategory = async (category) => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}`);
    const data = await res.json();
    return data.results || [];
  };

  const fetchAllCategories = async () => {
    const [popular, topRated, upcoming] = await Promise.all([
      fetchCategory('popular'),
      fetchCategory('top_rated'),
      fetchCategory('upcoming'),
    ]);
    setMovies({ popular, top_rated: topRated, upcoming, search: [], single: [] });
  };

  const fetchSearchResults = async () => {
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${search}&api_key=${apiKey}`);
    const data = await res.json();
    setMovies({ popular: [], top_rated: [], upcoming: [], search: data.results || [], single: [] });
  };

  const fetchSingleCategory = async (category) => {
    const data = await fetchCategory(category);
    setMovies({ popular: [], top_rated: [], upcoming: [], search: [], single: data });
  };

  useEffect(() => {
    if (search) {
      fetchSearchResults();
    } else if (!sortOption) {
      fetchAllCategories();
    } else {
      fetchSingleCategory(sortOption);
    }
  }, [sortOption]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      fetchSearchResults();
    } else {
      fetchAllCategories();
    }
  };

  const renderSection = (title, movieList) => {
    if (!movieList.length) return null;
    return (
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movieList.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onClick={() => setSelectedMovie(movie.id)} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 min-h-screen bg-gray-900 text-white">
      <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold">MovieDB</h1>
        <div className="flex gap-4">
          <SortDropdown sortOption={sortOption} setSortOption={setSortOption} />
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="p-2 rounded-md text-black border"
            />
          </form>
        </div>
      </div>

      {selectedMovie ? (
        <MovieDetails movieId={selectedMovie} onClose={() => setSelectedMovie(null)} />
      ) : (
        <>
          {search && renderSection(`Results for "${search}"`, movies.search)}
          {!search && !sortOption && (
            <>
              {renderSection("", movies.popular)}
              {renderSection("", movies.top_rated)}
              {renderSection("", movies.upcoming)}
            </>
          )}
          {!search && sortOption && renderSection(sortOption.replace('_', ' ').toUpperCase(), movies.single)}
        </>
      )}
    </div>
  );
};

export default App;
