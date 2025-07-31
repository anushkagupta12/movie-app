import React from 'react';

const SortDropDown = ({ sortOption, setSortOption }) => {
  return (
    <select
      value={sortOption}
      onChange={(e) => setSortOption(e.target.value)}
      className="p-2 border rounded-md text-black"
    >
      <option value="">Sort</option>
      <option value="popular">Popular</option>
      <option value="top_rated">Top Rated</option>
      <option value="upcoming">Upcoming</option>
    </select>
  );
};

export default SortDropDown;
