import React from 'react';
import { motion } from 'framer-motion';
import { MousePointer2 } from 'lucide-react';

function CharacterCard({ character, onCardClick, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      onClick={onCardClick}
      className="group overflow-hidden border border-border bg-card hover:border-primary/70 transition-all duration-300 hover:shadow-[0_0_30px_hsl(48_100%_56%/0.3)] cursor-pointer animate-fade-up hover:scale-105 font-rajdhani rounded-lg"
    >
      {/* Card Header */}
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

      {/* Card Content */}
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
