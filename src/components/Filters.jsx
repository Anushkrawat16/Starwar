import React from 'react';
import { Filter } from 'lucide-react';

function Filters({ 
  homeworldFilter, 
  onHomeworldFilterChange,
  speciesFilter,
  onSpeciesFilterChange,
  filmFilter,
  onFilmFilterChange,
  availableHomeworlds,
  availableSpecies,
  availableFilms,
}) {
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 mb-6 border border-yellow-400/30">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-yellow-400" />
        <h2 className="text-lg font-orbitron font-bold text-yellow-400">Filters</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-rajdhani text-gray-300 mb-2">
            Filter by Homeworld
          </label>
          <select
            value={homeworldFilter}
            onChange={(e) => onHomeworldFilterChange(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-yellow-400/50 bg-gray-900/80 backdrop-blur-sm text-yellow-400 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all"
          >
            <option value="">All Homeworlds</option>
            {availableHomeworlds.map((homeworld) => (
              <option key={homeworld} value={homeworld}>
                {homeworld}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-rajdhani text-gray-300 mb-2">
            Filter by Species
          </label>
          <select
            value={speciesFilter}
            onChange={(e) => onSpeciesFilterChange(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-yellow-400/50 bg-gray-900/80 backdrop-blur-sm text-yellow-400 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all"
          >
            <option value="">All Species</option>
            {availableSpecies.map((species) => (
              <option key={species} value={species}>
                {species}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-rajdhani text-gray-300 mb-2">
            Filter by Film
          </label>
          <select
            value={filmFilter}
            onChange={(e) => onFilmFilterChange(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-yellow-400/50 bg-gray-900/80 backdrop-blur-sm text-yellow-400 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all"
          >
            <option value="">All Films</option>
            {availableFilms.map((film) => (
              <option key={film} value={film}>
                {film}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default Filters;

