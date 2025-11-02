// API service for SWAPI
const BASE_URL = 'https://swapi.dev/api';

// Cache for storing fetched data
const cache = new Map();

// Helper to get cached data or fetch new data
async function fetchWithCache(url) {
  if (cache.has(url)) {
    return cache.get(url);
  }
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  cache.set(url, data);
  return data;
}

// Fetch all characters with pagination
export async function fetchCharacters(url = null) {
  const apiUrl = url || `${BASE_URL}/people`;
  return fetchWithCache(apiUrl);
}

// Fetch a single planet by URL
export async function fetchPlanet(planetUrl) {
  if (!planetUrl) return null;
  return fetchWithCache(planetUrl);
}

// Fetch starship data by URL
export async function fetchStarship(starshipUrl) {
  if (!starshipUrl) return null;
  return fetchWithCache(starshipUrl);
}

// Fetch film data by URL
export async function fetchFilm(filmUrl) {
  if (!filmUrl) return null;
  return fetchWithCache(filmUrl);
}

// Fetch a single character by URL
export async function fetchCharacter(characterUrl) {
  if (!characterUrl) return null;
  return fetchWithCache(characterUrl);
}

// Fetch multiple resources in parallel
export async function fetchMultiple(urls) {
  if (!urls || urls.length === 0) return [];
  return Promise.all(urls.map(url => fetchWithCache(url)));
}

