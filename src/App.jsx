import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import CharacterList from './components/CharacterList';
import Pagination from './components/Pagination';
import CharacterModal from './components/CharacterModal';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import Starfield from './components/Starfield';
import {
  fetchCharacters,
  fetchPlanet,
  fetchMultiple,
} from './services/api';

function App() {
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

  // Fetch characters data
  const loadCharacters = useCallback(async (url = null) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchCharacters(url);
      const charactersWithDetails = await Promise.all(
        data.results.map(async (character) => {
          let homeworldName = 'Unknown';
          let starshipsCount = character.starships?.length || 0;

          if (character.homeworld) {
            try {
              const planet = await fetchPlanet(character.homeworld);
              homeworldName = planet.name || 'Unknown';
            } catch (err) {
              console.error('Error fetching planet:', err);
            }
          }

          return {
            ...character,
            homeworldName,
            starshipsCount,
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
      console.error('Error fetching characters:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadCharacters();
  }, [loadCharacters]);

  // Filter characters based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredCharacters(characters);
    } else {
      const filtered = characters.filter((character) =>
        character.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCharacters(filtered);
    }
  }, [searchQuery, characters]);

  // Handle pagination
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

  // Handle page number click - calculate URL from page number
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

          if (character.homeworld) {
            try {
              const planet = await fetchPlanet(character.homeworld);
              homeworldName = planet.name || 'Unknown';
            } catch (err) {
              console.error('Error fetching planet:', err);
            }
          }

          return {
            ...character,
            homeworldName,
            starshipsCount,
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
      console.error('Error fetching characters:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle character card click
  const handleCardClick = async (character) => {
    setSelectedCharacter(character);
    console.log(character , "character");
    setIsModalOpen(true);

    try {
      // Fetch films and starships details
      const [films, starships] = await Promise.all([
        character.films && character.films.length > 0
          ? fetchMultiple(character.films)
          : Promise.resolve([]),
        character.starships && character.starships.length > 0
          ? fetchMultiple(character.starships)
          : Promise.resolve([]),
      ]);

      setSelectedCharacter({
        ...character,
        films,
        starshipsNames: starships,
      });
    } catch (err) {
      console.error('Error fetching character details:', err);
      // Still show modal even if details fail
    }
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCharacter(null);
  };

  return (
    <div className="min-h-screen text-foreground relative overflow-hidden">
      <Starfield />

      <div className="relative z-10 min-h-screen">
        <Navbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <main className="container mx-auto py-8">
        {loading && <LoadingSpinner />}
        
        {error && !loading && (
          <ErrorMessage message={error} onRetry={() => loadCharacters()} />
        )}

        {!loading && !error && (
          <>
            <CharacterList
              characters={filteredCharacters}
              onCardClick={handleCardClick}
            />
            
            {!searchQuery && (
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

export default App;

