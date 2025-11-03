import React from 'react';
import { motion } from 'framer-motion';
import { MousePointer2 } from 'lucide-react';

function getSpeciesColor(speciesName) {
  const colors = {
    'Human': 'bg-blue-500/20 border-blue-500/30',
    'Droid': 'bg-gray-500/20 border-gray-500/30',
    'Wookiee': 'bg-amber-500/20 border-amber-500/30',
    'Rodian': 'bg-green-500/20 border-green-500/30',
    'Hutt': 'bg-yellow-500/20 border-yellow-500/30',
    'Yoda\'s species': 'bg-green-500/20 border-green-500/30',
    'Trandoshan': 'bg-red-500/20 border-red-500/30',
    'Mon Calamari': 'bg-cyan-500/20 border-cyan-500/30',
    'Ewok': 'bg-brown-500/20 border-brown-500/30',
    'Sullustan': 'bg-purple-500/20 border-purple-500/30',
  };
  return colors[speciesName] || 'bg-secondary/30 border-border';
}

function getCharacterImage(characterName, index) {
  const hash = characterName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const seed = (hash + index) % 1000;
  return `https://picsum.photos/seed/${seed}/400/300`;
}

function CharacterCard({ character, onCardClick, index }) {
  const handleClick = () => {
    onCardClick(character);
  };

  const speciesName = character.speciesName || 'Unknown';
  const speciesColor = getSpeciesColor(speciesName);
  const imageUrl = getCharacterImage(character.name, index);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      onClick={handleClick}
      className={`group overflow-hidden border-2 ${speciesColor} hover:border-primary/70 transition-all duration-300 hover:shadow-[0_0_30px_hsl(48_100%_56%/0.3)] cursor-pointer animate-fade-up hover:scale-105 font-rajdhani rounded-lg`}
    >
      <div className="relative w-full h-48 overflow-hidden">
        <img 
          src={imageUrl}
          alt={character.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            e.target.src = `https://picsum.photos/seed/${character.name}${index}/400/300`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-2 left-2">
          <span className="text-xs px-2 py-1 rounded-full bg-black/50 text-white font-rajdhani">
            {speciesName}
          </span>
        </div>
      </div>

      <div className="p-4 pb-3">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-orbitron font-bold text-primary group-hover:text-primary/90 transition-colors">
            {character.name}
          </h3>
          <MousePointer2 className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
        </div>
        <span className="inline-block px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-rajdhani w-fit mt-2">
          {character.gender || 'N/A'}
        </span>
      </div>

      <div className="px-4 pb-4 space-y-2 text-sm">
        <div className="flex justify-between py-1 border-b border-border/50">
          <span className="text-muted-foreground">Birth Year</span>
          <span className="text-foreground font-medium">{character.birth_year || 'N/A'}</span>
        </div>
        <div className="flex justify-between py-1 border-b border-border/50">
          <span className="text-muted-foreground">Height</span>
          <span className="text-foreground font-medium">{character.height || 'N/A'} {character.height && 'cm'}</span>
        </div>
        <div className="flex justify-between py-1 border-b border-border/50">
          <span className="text-muted-foreground">Mass</span>
          <span className="text-foreground font-medium">{character.mass || 'N/A'} {character.mass && 'kg'}</span>
        </div>
        <div className="flex justify-between py-1 border-b border-border/50">
          <span className="text-muted-foreground">Hair Color</span>
          <span className="text-foreground font-medium capitalize">{character.hair_color || 'N/A'}</span>
        </div>
        <div className="flex justify-between py-1 border-b border-border/50">
          <span className="text-muted-foreground">Eye Color</span>
          <span className="text-foreground font-medium capitalize">{character.eye_color || 'N/A'}</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-muted-foreground">Skin Color</span>
          <span className="text-foreground font-medium capitalize">{character.skin_color || 'N/A'}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default CharacterCard;
