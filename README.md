# Star Wars Character Explorer

A modern, interactive web application for exploring Star Wars characters from the SWAPI (Star Wars API). Features character browsing, detailed information, filtering, and authentication.

## How to Run the Project

### Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn package manager

### Installation

1. Clone the repository or navigate to the project directory:
```bash
cd Starwar
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173`)

### Build for Production

```bash
npm run build
npm run preview
```

## What Was Implemented

### Core Requirements

#### 1. Fetch & Display Characters
- Integrated with SWAPI `/people` endpoint
- Implemented pagination to handle all characters across multiple pages
- Loading states with spinner component
- Error handling with retry functionality
- Displays character cards in a responsive grid layout

#### 2. Character Cards
- Each card displays character name, gender, and key attributes
- Random images from Picsum Photos (seeded by character name for consistency)
- Species-based background colors and borders
- Visual species badge overlay on images
- Hover effects and animations
- Click functionality to open detailed modal

#### 3. Character Details Modal
- Modal displays comprehensive character information:
  - Name (header)
  - Height in meters
  - Mass in kg
  - Date added (formatted as dd-MM-yyyy)
  - Number of films the character appears in
  - Birth year
  - Homeworld details (name, terrain, climate, population)
  - Full list of films with titles
- Responsive 2-column grid layout on desktop
- Smooth animations and transitions
- Click outside to close functionality

#### 4. Responsiveness
- Fully responsive design for mobile, tablet, and desktop
- Adaptive grid layouts
- Mobile-friendly navigation and modals
- Touch-optimized interactions

### Additional Features

#### Search Functionality
- Real-time search by character name with partial matching
- Search works across all loaded characters
- Case-insensitive search

#### Filtering System
- Filter by Homeworld (dropdown with all available planets)
- Filter by Species (dropdown with all available species)
- Filter by Film (dropdown showing all films)
- Combined search and filter support
- Filters dynamically populate based on available data
- Filters work together (AND logic)

#### Authentication System
- Separate login page with route protection
- Mock authentication with JWT token system
- Silent token refresh (auto-refreshes before expiration)
- Session persistence using localStorage
- Protected routes requiring authentication
- Logout functionality

**Demo Credentials:**
- Username: `admin` / Password: `password123`
- Username: `user` / Password: `user123`
- Username: `luke` / Password: `skywalker`

#### UI/UX Enhancements
- Starfield animated background
- Smooth page transitions and animations
- Loading states for async operations
- Error boundaries and user-friendly error messages
- Hover effects and visual feedback
- Consistent Star Wars themed design system

#### Performance Optimizations
- API response caching to reduce redundant requests
- Parallel data fetching for films, starships, and homeworld
- Optimized re-renders with React hooks
- Lazy loading of character images

#### Testing
- Integration test for CharacterModal component
- Tests verify modal opens with correct character details
- Validates data formatting and display

## Design Choices & Trade-offs

### Architecture
- **Component-based structure**: Modular React components for maintainability
- **Service layer separation**: API and auth logic separated from UI components
- **Routing**: React Router for navigation between login and main app

### State Management
- **Local state with hooks**: Used React useState and useEffect for state management instead of Redux for simplicity
- **Trade-off**: Simpler setup but may need refactoring if app scales significantly

### Data Fetching
- **Caching strategy**: Implemented in-memory cache for API responses to reduce network calls
- **Trade-off**: Cache only persists during session; data refreshes on page reload
- **Parallel fetching**: Films, species, and homeworld data fetched in parallel for better performance

### Authentication
- **Mock JWT tokens**: Implemented mock JWT system for demonstration
- **Trade-off**: No real backend integration; suitable for prototype/demo purposes
- **Token refresh**: Silent refresh every minute to keep tokens valid
- **Trade-off**: More frequent refresh than production systems typically use

### UI/UX Decisions
- **Modal for details**: Used modal instead of separate page to maintain context
- **Grid layout**: 2-column grid in modal for better space utilization
- **Species-based colors**: Visual distinction helps users quickly identify character types
- **Random images**: Picsum Photos provides consistent images without storing image URLs

### Performance Considerations
- **Pagination**: Only loads 10 characters per page to manage memory and API calls
- **Lazy loading**: Images loaded on demand
- **Memoization**: Used useMemo for expensive filter calculations

### Responsive Design
- **Mobile-first approach**: Design scales from mobile to desktop
- **Breakpoints**: Tailwind's responsive breakpoints for consistent experience
- **Trade-off**: Some complex layouts simplify on smaller screens

## Technology Stack

- **React 19.2** - UI framework
- **Vite** - Build tool and dev server
- **React Router DOM** - Routing and navigation
- **Framer Motion** - Animations and transitions
- **Tailwind CSS** - Styling and responsive design
- **Lucide React** - Icon library
- **SWAPI** - Star Wars API for data

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CharacterCard.jsx
│   ├── CharacterList.jsx
│   ├── CharacterModal.jsx
│   ├── Filters.jsx
│   ├── Login.jsx
│   ├── Navbar.jsx
│   └── ...
├── pages/              # Page components
│   ├── HomePage.jsx
│   └── LoginPage.jsx
├── services/           # Business logic and API
│   ├── api.js
│   └── auth.js
├── __tests__/         # Test files
└── App.jsx            # Main app with routing
```

## Future Enhancements

Potential improvements for production:
- Real backend authentication integration
- Persistent cache with IndexedDB
- Image optimization and CDN usage
- Advanced filtering (date ranges, multiple selections)
- Character favorites/bookmarks
- Export functionality
- Accessibility improvements (ARIA labels, keyboard navigation)

