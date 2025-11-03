import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach } from '@jest/globals';
import CharacterModal from '../components/CharacterModal';

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}));

jest.mock('lucide-react', () => ({
  User: () => <span data-testid="user-icon">👤</span>,
  Calendar: () => <span data-testid="calendar-icon">📅</span>,
  Ruler: () => <span data-testid="ruler-icon">📏</span>,
  Weight: () => <span data-testid="weight-icon">⚖️</span>,
  Eye: () => <span data-testid="eye-icon">👁️</span>,
  Palette: () => <span data-testid="palette-icon">🎨</span>,
  X: () => <span data-testid="close-icon">✕</span>,
  Globe: () => <span data-testid="globe-icon">🌍</span>,
  Film: () => <span data-testid="film-icon">🎬</span>,
  Clock: () => <span data-testid="clock-icon">🕐</span>,
}));

jest.mock('../services/api', () => ({
  fetchCharacter: jest.fn(),
}));

describe('CharacterModal Integration Test', () => {
  const mockCharacter = {
    name: 'Luke Skywalker',
    birth_year: '19BBY',
    height: '172',
    mass: '77',
    eye_color: 'blue',
    skin_color: 'fair',
    gender: 'Male',
    homeworldName: 'Tatooine',
    speciesName: 'Human',
    url: 'https://swapi.dev/api/people/1/',
    films: ['https://swapi.dev/api/films/1/'],
    created: '2014-12-09T13:50:51.644000Z',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should open modal with correct character details', async () => {
    render(
      <CharacterModal
        selectedCharacter={mockCharacter}
        isOpen={true}
        onClose={() => {}}
      />
    );

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText(/Birth Year/i)).toBeInTheDocument();
      expect(screen.getByText('19BBY')).toBeInTheDocument();
    });

    // Verify character attributes are displayed
    expect(screen.getByText(/Height/i)).toBeInTheDocument();
    expect(screen.getByText(/Mass/i)).toBeInTheDocument();
    expect(screen.getByText(/Eye Color/i)).toBeInTheDocument();
    expect(screen.getByText(/Skin Color/i)).toBeInTheDocument();
  });

  it('should display height in meters correctly', async () => {
    render(
      <CharacterModal
        selectedCharacter={mockCharacter}
        isOpen={true}
        onClose={() => {}}
      />
    );

    await waitFor(() => {
      const heightElement = screen.getByText(/Height/i).closest('div');
      expect(heightElement).toHaveTextContent('1.72 m');
    });
  });

  it('should display date added in dd-MM-yyyy format', async () => {
    render(
      <CharacterModal
        selectedCharacter={mockCharacter}
        isOpen={true}
        onClose={() => {}}
      />
    );

    await waitFor(() => {
      expect(screen.getByText(/Date Added/i)).toBeInTheDocument();
      expect(screen.getByText(/09-12-2014/)).toBeInTheDocument();
    });
  });

  it('should not render modal when isOpen is false', () => {
    render(
      <CharacterModal
        selectedCharacter={mockCharacter}
        isOpen={false}
        onClose={() => {}}
      />
    );

    expect(screen.queryByText('Luke Skywalker')).not.toBeInTheDocument();
  });

  it('should display homeworld details when available', async () => {
    const characterWithHomeworld = {
      ...mockCharacter,
      homeworldData: {
        name: 'Tatooine',
        terrain: 'desert',
        climate: 'arid',
        population: '200000',
      },
    };

    render(
      <CharacterModal
        selectedCharacter={characterWithHomeworld}
        isOpen={true}
        onClose={() => {}}
      />
    );

    await waitFor(() => {
      expect(screen.getByText(/Homeworld Details/i)).toBeInTheDocument();
      expect(screen.getByText(/Tatooine/)).toBeInTheDocument();
      expect(screen.getByText(/desert/)).toBeInTheDocument();
      expect(screen.getByText(/arid/)).toBeInTheDocument();
    });
  });

  it('should call onClose when close button is clicked', async () => {
    const handleClose = jest.fn();
    
    render(
      <CharacterModal
        selectedCharacter={mockCharacter}
        isOpen={true}
        onClose={handleClose}
      />
    );

    await waitFor(() => {
      const closeButton = screen.getByTestId('close-icon').closest('button');
      closeButton.click();
      expect(handleClose).toHaveBeenCalled();
    });
  });
});

