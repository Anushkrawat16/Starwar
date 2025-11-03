import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Navbar from '../components/Navbar';
import CharacterList from '../components/CharacterList';
import Pagination from '../components/Pagination';
import CharacterModal from '../components/CharacterModal';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import Starfield from '../components/Starfield';
import Filters from '../components/Filters';
import {
  fetchCharacters,
  fetchPlanet,
  fetchMultiple,
} from '../services/api';
import {
  isAuthenticated,
  getCurrentUser,
  logout as authLogout,
  startTokenRefresh,
} from '../services/auth';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [nextUrl, setNextUrl] = useState(null);
  const [previousUrl, setPreviousUrl] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [authState, setAuthState] = useState({
    isAuthenticated: isAuthenticated(),
    username: getCurrentUser()?.username || null,
  });
  
  const [homeworldFilter, setHomeworldFilter] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState('');
  const [filmFilter, setFilmFilter] = useState('');

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
    } else {
      startTokenRefresh();
    }
  }, [navigate]);

  const loadCharacters = useCallback(async (url = null) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchCharacters(url);
      const charactersWithDetails = await Promise.all(
        data.results.map(async (character) => {
          let homeworldName = 'Unknown';
          let starshipsCount = character.starships?.length || 0;
          let speciesName = 'Unknown';
          let filmsData = [];

          if (character.homeworld) {
            try {
              const planet = await fetchPlanet(character.homeworld);
              homeworldName = planet.name || 'Unknown';
            } catch (err) {
            }
          }

          if (character.species && character.species.length > 0) {
            try {
              const species = await fetchMultiple(character.species);
              speciesName = species[0]?.name || 'Unknown';
            } catch (err) {
            }
          }

          if (character.films && character.films.length > 0) {
            try {
              const fetchedFilms = await fetchMultiple(character.films);
              filmsData = fetchedFilms || [];
            } catch (err) {
              filmsData = [];
            }
          }

          return {
            ...character,
            homeworldName,
            starshipsCount,
            speciesName,
            filmsData,
          };
        })
      );

      setCharacters(charactersWithDetails);
      setFilteredCharacters(charactersWithDetails);
      setNextUrl(data.next);
      setPreviousUrl(data.previous);
      
      if (data.count) {
        setTotalCount(data.count);
        const calculatedPages = Math.ceil(data.count / 10);
        setTotalPages(calculatedPages);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch characters');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated()) {
      loadCharacters();
    }
  }, [loadCharacters]);

  const availableFilters = useMemo(() => {
    const homeworlds = [...new Set(characters.map(c => c.homeworldName).filter(h => h !== 'Unknown'))].sort();
    const species = [...new Set(characters.map(c => c.speciesName).filter(s => s !== 'Unknown'))].sort();
    const films = [...new Set(
      characters.flatMap(c => {
        const films = c.filmsData || [];
        return films.map(f => {
          if (typeof f === 'string') return f;
          return f?.title || '';
        }).filter(t => t);
      })
    )].sort();
    return { homeworlds, species, films };
  }, [characters]);

  useEffect(() => {
    let filtered = [...characters];

    if (searchQuery.trim()) {
      filtered = filtered.filter((character) =>
        character.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (homeworldFilter) {
      filtered = filtered.filter((character) =>
        character.homeworldName === homeworldFilter
      );
    }

    if (speciesFilter) {
      filtered = filtered.filter((character) =>
        character.speciesName === speciesFilter
      );
    }

    if (filmFilter) {
      filtered = filtered.filter((character) => {
        const films = character.filmsData || character.films || [];
        return films.some(film => {
          const filmTitle = typeof film === 'string' ? film : film?.title;
          return filmTitle === filmFilter;
        });
      });
    }

    setFilteredCharacters(filtered);
  }, [searchQuery, homeworldFilter, speciesFilter, filmFilter, characters]);

  const handleNext = () => {
    if (nextUrl) {
      setCurrentPage((prev) => prev + 1);
      loadCharacters(nextUrl);
    }
  };

  const handlePrevious = () => {
    if (previousUrl) {
      setCurrentPage((prev) => Math.max(1, prev - 1));
      loadCharacters(previousUrl);
    }
  };

  const handlePageChange = async (page) => {
    if (page === currentPage) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const pageUrl = `https://swapi.dev/api/people/?page=${page}`;
      const data = await fetchCharacters(pageUrl);
      
      const charactersWithDetails = await Promise.all(
        data.results.map(async (character) => {
          let homeworldName = 'Unknown';
          let starshipsCount = character.starships?.length || 0;
          let speciesName = 'Unknown';
          let filmsData = [];

          if (character.homeworld) {
            try {
              const planet = await fetchPlanet(character.homeworld);
              homeworldName = planet.name || 'Unknown';
            } catch (err) {
            }
          }

          if (character.species && character.species.length > 0) {
            try {
              const species = await fetchMultiple(character.species);
              speciesName = species[0]?.name || 'Unknown';
            } catch (err) {
            }
          }

          if (character.films && character.films.length > 0) {
            try {
              const fetchedFilms = await fetchMultiple(character.films);
              filmsData = fetchedFilms || [];
            } catch (err) {
              filmsData = [];
            }
          }

          return {
            ...character,
            homeworldName,
            starshipsCount,
            speciesName,
            filmsData,
          };
        })
      );

      setCharacters(charactersWithDetails);
      setFilteredCharacters(charactersWithDetails);
      setNextUrl(data.next);
      setPreviousUrl(data.previous);
      setCurrentPage(page);
    } catch (err) {
      setError(err.message || 'Failed to fetch characters');
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = async (character) => {
    setSelectedCharacter(character);
    setIsModalOpen(true);

    try {
      let films = character.filmsData || [];
      
      if (!films.length && character.films && character.films.length > 0) {
        films = await fetchMultiple(character.films);
      }

      const [starships, homeworld] = await Promise.all([
        character.starships && character.starships.length > 0
          ? fetchMultiple(character.starships)
          : Promise.resolve([]),
        character.homeworld
          ? fetchPlanet(character.homeworld)
          : Promise.resolve(null),
      ]);

      const updatedCharacter = {
        ...character,
        films,
        filmsData: films,
        starshipsNames: starships,
        homeworldData: homeworld,
      };
      
      setSelectedCharacter(updatedCharacter);
    } catch (err) {
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCharacter(null);
  };

  const handleLogout = () => {
    authLogout();
    setAuthState({
      isAuthenticated: false,
      username: null,
    });
    navigate('/login');
  };

  if (!isAuthenticated()) {
    return null;
  }

  return (
    <div className="min-h-screen text-foreground relative overflow-hidden">
      <Starfield />

      <div className="relative z-10 min-h-screen">
        <Navbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          isAuthenticated={authState.isAuthenticated}
          username={authState.username}
          onLoginClick={() => navigate('/login')}
          onLogout={handleLogout}
        />

        <main className="container mx-auto py-8 px-4">
          {loading && <LoadingSpinner />}
          
          {error && !loading && (
            <ErrorMessage message={error} onRetry={() => loadCharacters()} />
          )}

          {!loading && !error && (
            <>
              <Filters
                homeworldFilter={homeworldFilter}
                onHomeworldFilterChange={setHomeworldFilter}
                speciesFilter={speciesFilter}
                onSpeciesFilterChange={setSpeciesFilter}
                filmFilter={filmFilter}
                onFilmFilterChange={setFilmFilter}
                availableHomeworlds={availableFilters.homeworlds}
                availableSpecies={availableFilters.species}
                availableFilms={availableFilters.films}
              />

              <CharacterList
                characters={filteredCharacters}
                onCardClick={handleCardClick}
              />
              
              {!searchQuery && !homeworldFilter && !speciesFilter && !filmFilter && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  hasNext={!!nextUrl}
                  hasPrevious={!!previousUrl}
                  onNext={handleNext}
                  onPrevious={handlePrevious}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </main>

        <CharacterModal
          selectedCharacter={selectedCharacter}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
}

export default HomePage;

