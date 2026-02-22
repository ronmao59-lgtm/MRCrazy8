import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Suit } from '../types';
import { getSuitSymbol, getSuitColor } from '../constants';

interface SuitSelectorProps {
  onSelect: (suit: Suit) => void;
}

export const SuitSelector: React.FC<SuitSelectorProps> = ({ onSelect }) => {
  const suits = [
    { type: Suit.HEARTS, label: 'Hearts' },
    { type: Suit.DIAMONDS, label: 'Diamonds' },
    { type: Suit.CLUBS, label: 'Clubs' },
    { type: Suit.SPADES, label: 'Spades' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full mx-4">
        <h2 className="text-2xl font-display font-bold text-slate-900 mb-6 text-center">
          Wild 8! Pick a Suit
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {suits.map((suit) => (
            <button
              key={suit.type}
              onClick={() => onSelect(suit.type)}
              className={`
                flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-slate-100
                hover:border-yellow-400 hover:bg-yellow-50 transition-all group
                ${getSuitColor(suit.type)}
              `}
            >
              <span className="text-5xl mb-2 group-hover:scale-125 transition-transform">
                {getSuitSymbol(suit.type)}
              </span>
              <span className="font-bold uppercase tracking-wider text-xs opacity-60">
                {suit.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
