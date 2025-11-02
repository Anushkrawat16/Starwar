import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Calendar, Ruler, Weight, Eye, Palette, X } from 'lucide-react';

function CharacterModal({ selectedCharacter, isOpen, onClose }) {
  const [characterData, setCharacterData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && selectedCharacter) {
      setCharacterData(selectedCharacter);
      setLoading(false);
      setError(null);
    } else {
      setCharacterData(null);
    }
  }, [isOpen, selectedCharacter]);

  if (!isOpen || !selectedCharacter) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-card border border-primary/30 rounded-lg font-rajdhani max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        >
          <div className="p-6 pb-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-3xl font-orbitron font-bold text-primary flex items-center gap-2">
                <User className="h-6 w-6" />
                {characterData?.name || selectedCharacter?.name || 'Character'}
              </h2>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-secondary/50 transition-colors text-foreground"
              >
                <X className="h-4 w-4" /> 
              </button>
            </div>
            <p className="text-muted-foreground text-sm">
              Detailed character information from the Star Wars universe
            </p>
          </div>

          <div className="px-6 pb-6 space-y-4">
            {loading && (
              <div className="text-center py-4 text-muted-foreground">
                Loading character details...
              </div>
            )}
            {error && (
              <div className="text-center py-2 text-sm text-red-400">
                {error}
              </div>
            )}
            {!loading && characterData && (
              <>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-rajdhani">
                {characterData?.gender || 'N/A'}
              </span>
            </div>


            {/* Character Details */}
            <div className="space-y-3">
              {/* Birth Year */}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                <Calendar className="h-5 w-5 text-primary shrink-0" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Birth Year</p>
                  <p className="text-sm font-semibold text-foreground">{characterData?.birth_year || 'N/A'}</p>
                </div>
              </div>

              {/* Height */}                                                                                                                                                                                                      
              <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                <Ruler className="h-5 w-5 text-primary shrink-0" />
                <div className="flex-1">                        
                  <p className="text-xs text-muted-foreground">Height</p>
                  <p className="text-sm font-semibold text-foreground">{characterData?.height || 'N/A'} {characterData?.height && 'cm'}</p>
                </div>                        
              </div>

              {/* Mass */}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                <Weight className="h-5 w-5 text-primary shrink-0" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Mass</p>
                  <p className="text-sm font-semibold text-foreground">{characterData?.mass || 'N/A'} {characterData?.mass && 'kg'}</p>
                </div>
              </div>

              {/* Hair Color */}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                <Palette className="h-5 w-5 text-primary shrink-0" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Hair Color</p>
                  <p className="text-sm font-semibold text-foreground capitalize">{characterData?.hair_color || 'N/A'}</p>
                </div>
              </div>

              {/* Eye Color */}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                <Eye className="h-5 w-5 text-primary shrink-0" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Eye Color</p>
                  <p className="text-sm font-semibold text-foreground capitalize">{characterData?.eye_color || 'N/A'}</p>
                </div>
              </div>

              {/* Skin Color */}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                <Palette className="h-5 w-5 text-primary shrink-0" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Skin Color</p>
                  <p className="text-sm font-semibold text-foreground capitalize">{characterData?.skin_color || 'N/A'}</p>
                </div>
              </div>
            </div>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default CharacterModal;
