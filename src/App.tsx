import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from './components/Card';
import { SuitSelector } from './components/SuitSelector';
import { LandingPage } from './components/LandingPage';
import { useCrazyEights } from './hooks/useCrazyEights';
import { GameStatus, Suit } from './types';
import { getSuitSymbol, getSuitColor } from './constants';
import { Trophy, RotateCcw, Info, Layers } from 'lucide-react';

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const {
    playerHand,
    aiHand,
    discardPile,
    deck,
    status,
    activeSuit,
    winner,
    message,
    playCard,
    drawCard,
    selectWildSuit,
    initGame,
    topCard,
    isPlayable,
  } = useCrazyEights();

  const isPlayerTurn = status === GameStatus.PLAYER_TURN;

  if (!gameStarted) {
    return <LandingPage onStart={() => setGameStarted(true)} />;
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center p-4 sm:p-8 felt-texture overflow-hidden">
      {/* Header Title */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-none z-50">
        <h1 className="text-xl sm:text-2xl font-display font-black tracking-[0.3em] gold-text opacity-40 uppercase italic">
          MR Crazy 8s
        </h1>
      </div>

      {/* Main Game Area (Top 2/3) */}
      <div className="flex-grow w-full flex flex-col items-center justify-center gap-4 sm:gap-8">
        {/* AI Hand */}
        <div className="w-full flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 bg-black/20 px-4 py-1 rounded-full backdrop-blur-md">
            <span className="text-xs font-bold uppercase tracking-widest opacity-60">对手</span>
            <span className="text-sm font-mono font-bold">{aiHand.length} 张牌</span>
          </div>
          <div className="flex justify-center -space-x-4 sm:-space-x-6 h-32 sm:h-40">
            <AnimatePresence>
              {aiHand.map((card, idx) => (
                <Card 
                  key={card.id} 
                  isFaceUp={false} 
                  index={idx}
                  className="hover:z-50 transition-all"
                />
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Center Area: Deck and Discard Pile */}
        <div className="flex flex-col items-center gap-6 sm:gap-8">
          {/* Status Message */}
          <motion.div 
            key={message}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/40 backdrop-blur-xl px-8 py-3 rounded-[1.5rem] border border-[#d4af37]/30 text-center max-w-xs sm:max-w-2xl shadow-[0_0_40px_rgba(212,175,55,0.15)]"
          >
            <p className="text-lg sm:text-xl font-display font-black tracking-tighter gold-text uppercase italic">
              {message}
            </p>
          </motion.div>

          <div className="flex items-center gap-8 sm:gap-16">
            {/* Draw Pile */}
            <div className="flex flex-col items-center gap-2">
              <div className="relative group">
                {deck.length > 0 && (
                  <Card 
                    isFaceUp={false} 
                    isPlayable={isPlayerTurn && !playerHand.some(isPlayable)}
                    onClick={() => drawCard(true)}
                    className="shadow-2xl"
                  />
                )}
                {deck.length > 1 && (
                  <div className="absolute -bottom-1 -right-1 w-full h-full bg-zinc-800 rounded-lg -z-10 border border-[#d4af37]/20" />
                )}
                {deck.length > 2 && (
                  <div className="absolute -bottom-2 -right-2 w-full h-full bg-zinc-900 rounded-lg -z-20 border border-[#d4af37]/10" />
                )}
              </div>
              <span className="text-xs font-mono font-bold opacity-50">{deck.length} 剩余</span>
            </div>

            {/* Discard Pile */}
            <div className="flex flex-col items-center gap-2">
              <div className="relative">
                <AnimatePresence mode="popLayout">
                  <Card 
                    key={topCard?.id}
                    card={topCard} 
                    className="shadow-2xl"
                  />
                </AnimatePresence>
                
                {/* Active Suit Indicator (for Wild 8s) */}
                {activeSuit && topCard?.rank === '8' && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`absolute -top-4 -right-4 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-xl ${getSuitColor(activeSuit)}`}
                  >
                    {getSuitSymbol(activeSuit)}
                  </motion.div>
                )}
              </div>
              <span className="text-xs font-mono font-bold opacity-50">弃牌堆</span>
            </div>
          </div>
        </div>
      </div>

      {/* Player Hand Section (Bottom 1/3) */}
      <div className="w-full flex flex-col items-center gap-4 pb-12 sm:pb-20">
        <div className="flex justify-center gap-3 sm:gap-6 h-40 sm:h-52 overflow-x-auto w-full px-8 pb-4 scrollbar-hide">
          <AnimatePresence>
            {playerHand.map((card, idx) => (
              <Card 
                key={card.id} 
                card={card}
                isPlayable={isPlayerTurn && isPlayable(card)}
                onClick={() => playCard(card, true)}
                index={idx}
                className="hover:z-50 transition-all"
              />
            ))}
          </AnimatePresence>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2 bg-white/20 px-4 py-1 rounded-full backdrop-blur-md">
            <span className="text-xs font-bold uppercase tracking-widest opacity-60">你</span>
            <span className="text-sm font-mono font-bold">{playerHand.length} 张牌</span>
          </div>
          
          {/* Skip/End Turn Button (if drew a card and still can't play) */}
          {isPlayerTurn && !playerHand.some(isPlayable) && deck.length === 0 && (
             <button 
              onClick={() => drawCard(true)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-colors"
            >
              跳过回合
            </button>
          )}
        </div>
      </div>

      {/* Overlays */}
      <AnimatePresence>
        {status === GameStatus.SELECTING_SUIT && (
          <SuitSelector onSelect={selectWildSuit} />
        )}

        {winner && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white p-8 sm:p-12 rounded-[2.5rem] shadow-2xl max-w-md w-full text-center"
            >
              <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl font-display font-black text-slate-900 mb-2">
                {winner === 'PLAYER' ? '胜利！' : '失败'}
              </h2>
              <p className="text-slate-500 mb-8 font-medium">
                {winner === 'PLAYER' 
                  ? '你的牌技出神入化！MR 对你印象深刻。' 
                  : '这次 AI 技高一筹。再试一次？'}
              </p>
              <button
                onClick={initGame}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <RotateCcw className="w-5 h-5" />
                再玩一次
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Controls */}
      <div className="fixed top-4 right-4 flex gap-2">
        <button 
          onClick={initGame}
          className="p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md border border-white/10 transition-all"
          title="重新开始"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      {/* Game Info Modal (Optional) */}
      <div className="fixed bottom-4 left-4">
        <button className="p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md border border-white/10 transition-all">
          <Info className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
