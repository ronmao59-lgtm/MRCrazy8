import React from 'react';
import { motion } from 'motion/react';
import { CardData, Suit } from '../types';
import { getSuitSymbol, getSuitColor } from '../constants';

interface CardProps {
  card?: CardData;
  isFaceUp?: boolean;
  onClick?: () => void;
  isPlayable?: boolean;
  className?: string;
  index?: number;
}

export const Card: React.FC<CardProps> = ({
  card,
  isFaceUp = true,
  onClick,
  isPlayable = false,
  className = '',
  index = 0,
}) => {
  const content = card ? (
    <div className={`w-full h-full bg-white rounded-lg flex flex-col justify-between p-2 relative ${getSuitColor(card.suit)}`}>
      <div className="flex flex-col items-center leading-none">
        <span className="text-lg font-bold font-display">{card.rank}</span>
        <span className="text-sm">{getSuitSymbol(card.suit)}</span>
      </div>
      
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-4xl opacity-20">{getSuitSymbol(card.suit)}</span>
      </div>

      <div className="flex flex-col items-center leading-none self-end rotate-180">
        <span className="text-lg font-bold font-display">{card.rank}</span>
        <span className="text-sm">{getSuitSymbol(card.suit)}</span>
      </div>
    </div>
  ) : (
    <div className="w-full h-full bg-zinc-900 rounded-lg border-4 border-[#d4af37] flex items-center justify-center overflow-hidden">
      <div className="w-full h-full opacity-10" style={{
        backgroundImage: 'repeating-linear-gradient(45deg, #d4af37, #d4af37 10px, transparent 10px, transparent 20px)'
      }} />
      <div className="absolute text-[#d4af37] font-display font-black text-2xl tracking-tighter">MR</div>
    </div>
  );

  return (
    <motion.div
      layout
      initial={{ scale: 0.8, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      whileHover={isPlayable ? { y: -20, scale: 1.1, zIndex: 50 } : {}}
      whileTap={isPlayable ? { scale: 0.95 } : {}}
      onClick={isPlayable ? onClick : undefined}
      className={`
        relative w-20 h-28 sm:w-24 sm:h-36 rounded-lg card-shadow cursor-pointer transition-all duration-300
        ${isPlayable ? 'ring-4 ring-[#d4af37] animate-gold-pulse z-10' : 'z-0'}
        ${className}
      `}
    >
      {isFaceUp ? content : (
        <div className="w-full h-full bg-[#1a1a1a] rounded-lg border-2 border-[#d4af37]/30 flex items-center justify-center overflow-hidden">
           <div className="w-full h-full opacity-20" style={{
            backgroundImage: 'radial-gradient(circle, #d4af37 1px, transparent 1px)',
            backgroundSize: '12px 12px'
          }} />
          <div className="absolute flex flex-col items-center">
            <div className="text-[#d4af37] font-display font-black text-3xl mb-1">MR</div>
            <div className="text-[#d4af37]/40 font-display font-bold text-[10px] tracking-[0.2em] uppercase">Crazy 8s</div>
          </div>
        </div>
      )}
    </motion.div>
  );
};
