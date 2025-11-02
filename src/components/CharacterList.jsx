import React from 'react';
import { motion } from 'framer-motion';
import CharacterCard from './CharacterCard';

function CharacterList({ characters, onCardClick }) {
  if (!characters || characters.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-muted-foreground font-rajdhani">No characters found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
      {characters.map((character, index) => (
        <motion.div
          key={character.url || index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <CharacterCard
            character={character}
            onCardClick={onCardClick}
            index={index}
          />
        </motion.div>
      ))}
    </div>
  );
}

export default CharacterList;
