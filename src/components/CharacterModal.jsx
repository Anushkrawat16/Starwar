import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Calendar, Ruler, Weight, Eye, Palette, X, Globe, Film, Clock } from 'lucide-react';
import { fetchCharacter } from '../services/api';

function CharacterModal({ selectedCharacter, isOpen, onClose }) {
  const [characterData, setCharacterData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && selectedCharacter) {
      setCharacterData(selectedCharacter);
      setError(null);
      
      if (selectedCharacter.url && !selectedCharacter.birth_year) {
        setLoading(true);
        fetchCharacter(selectedCharacter.url)
          .then((fullCharacterData) => {
            const mergedData = {
              ...selectedCharacter,
              ...fullCharacterData,
            };
            setCharacterData(mergedData);
            setLoading(false);
          })
          .catch((err) => {
            setError('Failed to load character details');
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    } else {
      setCharacterData(null);
      setLoading(false);
      setError(null);
    }
  }, [isOpen, selectedCharacter]);

  if (!isOpen || !selectedCharacter) return null;
  
  const displayData = characterData || selectedCharacter;

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
          className="bg-card border border-primary/30 rounded-lg font-rajdhani max-w-3xl w-full max-h-[70vh] overflow-y-auto shadow-2xl"
        >
          <div className="p-6 pb-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-3xl font-orbitron font-bold text-primary flex items-center gap-2">
                <User className="h-6 w-6" />
                {displayData?.name || 'Character'}
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
            {displayData && (
              <>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-rajdhani">
                    {displayData?.gender && 
                     displayData.gender.toLowerCase() !== 'unknown' && 
                     displayData.gender.toLowerCase() !== 'n/a'
                      ? displayData.gender 
                      : 'N/A'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                    <Calendar className="h-5 w-5 text-primary shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">Birth Year</p>
                      <p className="text-sm font-semibold text-foreground">
                        {displayData?.birth_year && 
                         displayData.birth_year.toLowerCase() !== 'unknown' && 
                         displayData.birth_year.toLowerCase() !== 'n/a'
                          ? displayData.birth_year 
                          : 'N/A'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                    <Ruler className="h-5 w-5 text-primary shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">Height</p>
                      <p className="text-sm font-semibold text-foreground">
                        {displayData?.height && 
                         displayData.height.toLowerCase() !== 'unknown' && 
                         displayData.height.toLowerCase() !== 'n/a'
                          ? `${(parseFloat(displayData.height) / 100).toFixed(2)} m`
                          : 'N/A'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                    <Weight className="h-5 w-5 text-primary shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">Mass</p>
                      <p className="text-sm font-semibold text-foreground">
                        {displayData?.mass && 
                         displayData.mass.toLowerCase() !== 'unknown' && 
                         displayData.mass.toLowerCase() !== 'n/a'
                          ? `${displayData.mass} kg`
                          : 'N/A'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                    <Eye className="h-5 w-5 text-primary shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">Eye Color</p>
                      <p className="text-sm font-semibold text-foreground capitalize">
                        {displayData?.eye_color && 
                         displayData.eye_color.toLowerCase() !== 'unknown' && 
                         displayData.eye_color.toLowerCase() !== 'n/a'
                          ? displayData.eye_color
                          : 'N/A'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                    <Palette className="h-5 w-5 text-primary shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">Skin Color</p>
                      <p className="text-sm font-semibold text-foreground capitalize">
                        {displayData?.skin_color && 
                         displayData.skin_color.toLowerCase() !== 'unknown' && 
                         displayData.skin_color.toLowerCase() !== 'n/a'
                          ? displayData.skin_color
                          : 'N/A'}
                      </p>
                    </div>
                  </div>

                  {displayData?.films && (
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                      <Film className="h-5 w-5 text-primary shrink-0" />
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground">Number of Films</p>
                        <p className="text-sm font-semibold text-foreground">
                          {displayData.films.length || 0}
                        </p>
                      </div>
                    </div>
                  )}

                  {displayData?.created && (
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                      <Clock className="h-5 w-5 text-primary shrink-0" />
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground">Date Added</p>
                        <p className="text-sm font-semibold text-foreground">
                          {(() => {
                            const date = new Date(displayData.created);
                            const day = String(date.getDate()).padStart(2, '0');
                            const month = String(date.getMonth() + 1).padStart(2, '0');
                            const year = date.getFullYear();
                            return `${day}-${month}-${year}`;
                          })()}
                        </p>
                      </div>
                    </div>
                  )}

                  {displayData?.homeworldData && (
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors md:col-span-2">
                      <Globe className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground mb-2">Homeworld Details</p>
                        <div className="space-y-1">
                          <p className="text-sm font-semibold text-foreground">
                            Name: {displayData.homeworldData.name || 'N/A'}
                          </p>
                          <p className="text-sm font-semibold text-foreground">
                            Terrain: {displayData.homeworldData.terrain && displayData.homeworldData.terrain !== 'unknown' && displayData.homeworldData.terrain !== 'n/a'
                              ? displayData.homeworldData.terrain
                              : 'N/A'}
                          </p>
                          <p className="text-sm font-semibold text-foreground">
                            Climate: {displayData.homeworldData.climate && displayData.homeworldData.climate !== 'unknown' && displayData.homeworldData.climate !== 'n/a'
                              ? displayData.homeworldData.climate
                              : 'N/A'}
                          </p>
                          <p className="text-sm font-semibold text-foreground">
                            Population: {displayData.homeworldData.population && displayData.homeworldData.population !== 'unknown' && displayData.homeworldData.population !== 'n/a'
                              ? displayData.homeworldData.population
                              : 'N/A'}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {displayData?.films && displayData.films.length > 0 && (
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors md:col-span-2">
                      <Film className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground mb-2">Films Appeared In</p>
                        <div className="flex flex-col gap-1">
                          {displayData.films.map((film, index) => (
                            <span 
                              key={film.url || index}
                              className="text-sm font-semibold text-foreground"
                            >
                              • {film.title || 'Unknown Film'}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
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
