const BASE_URL = 'https://swapi.dev/api';

const cache = new Map();

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

export async function fetchCharacters(url = null) {
  const apiUrl = url || `${BASE_URL}/people`;
  return fetchWithCache(apiUrl);
}

export async function fetchPlanet(planetUrl) {
  if (!planetUrl) return null;
  return fetchWithCache(planetUrl);
}

export async function fetchStarship(starshipUrl) {
  if (!starshipUrl) return null;
  return fetchWithCache(starshipUrl);
}

export async function fetchFilm(filmUrl) {
  if (!filmUrl) return null;
  return fetchWithCache(filmUrl);
}

export async function fetchCharacter(characterUrl) {
  if (!characterUrl) return null;
  return fetchWithCache(characterUrl);
}

export async function fetchSpecies(speciesUrl) {
  if (!speciesUrl) return null;
  return fetchWithCache(speciesUrl);
}

export async function fetchMultiple(urls) {
  if (!urls || urls.length === 0) return [];
  return Promise.all(urls.map(url => fetchWithCache(url)));
}

