import React from 'react';

const SortDropDown = ({ sortOption, setSortOption }) => {
  return (
    <select
      value={sortOption}
      onChange={(e) => setSortOption(e.target.value)}
      className="w-full sm:w-auto px-3 py-2 border rounded-md text-black text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
    >
      <option value="">Sort</option>
      <option value="popular">Popular</option>
      <option value="top_rated">Top Rated</option>
      <option value="upcoming">Upcoming</option>
    </select>
  );
};

export default SortDropDown;
