import React from 'react';
import { motion } from 'motion/react';
import { Play, Info } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center felt-texture p-8 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center text-center max-w-2xl"
      >
        {/* Decorative Cards */}
        <div className="relative h-48 w-full flex justify-center mb-12">
          <motion.div
            initial={{ rotate: -20, x: -50, opacity: 0 }}
            animate={{ rotate: -15, x: -30, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="absolute w-24 h-36 bg-zinc-900 rounded-lg border-2 border-[#d4af37]/30 shadow-2xl flex items-center justify-center overflow-hidden"
          >
             <div className="w-full h-full opacity-10" style={{
              backgroundImage: 'radial-gradient(circle, #d4af37 1px, transparent 1px)',
              backgroundSize: '10px 10px'
            }} />
            <span className="text-[#d4af37] font-display font-black text-2xl">MR</span>
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="absolute w-28 h-40 bg-zinc-900 rounded-xl border-4 border-[#d4af37] shadow-[0_0_30px_rgba(212,175,55,0.3)] z-10 flex flex-col items-center justify-center overflow-hidden"
          >
             <div className="w-full h-full opacity-20" style={{
              backgroundImage: 'repeating-linear-gradient(45deg, #d4af37, #d4af37 10px, transparent 10px, transparent 20px)'
            }} />
            <span className="absolute text-[#d4af37] font-display font-black text-4xl tracking-tighter">MR</span>
          </motion.div>

          <motion.div
            initial={{ rotate: 20, x: 50, opacity: 0 }}
            animate={{ rotate: 15, x: 30, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="absolute w-24 h-36 bg-zinc-900 rounded-lg border-2 border-[#d4af37]/30 shadow-2xl flex items-center justify-center overflow-hidden"
          >
             <div className="w-full h-full opacity-10" style={{
              backgroundImage: 'radial-gradient(circle, #d4af37 1px, transparent 1px)',
              backgroundSize: '10px 10px'
            }} />
            <span className="text-[#d4af37] font-display font-black text-2xl">MR</span>
          </motion.div>
        </div>

        {/* Title */}
        <h1 className="text-6xl sm:text-8xl font-display font-black tracking-tighter gold-text uppercase italic mb-4">
          MR CRAZY 8S
        </h1>
        
        <p className="text-[#d4af37]/60 font-medium tracking-[0.2em] uppercase text-sm mb-12">
          极致扑克体验
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-4 w-full max-w-xs">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(212,175,55,0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={onStart}
            className="bg-[#d4af37] text-black py-5 rounded-2xl font-display font-black text-xl flex items-center justify-center gap-3 shadow-xl transition-all"
          >
            <Play className="w-6 h-6 fill-current" />
            开始游戏
          </motion.button>
          
          <button className="bg-white/5 hover:bg-white/10 text-white/60 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all border border-white/5">
            <Info className="w-5 h-5" />
            玩法说明
          </button>
        </div>
      </motion.div>

      {/* Footer Branding */}
      <div className="absolute bottom-8 text-white/20 font-display font-bold tracking-widest text-xs uppercase">
        © 2026 MR 娱乐
      </div>
    </div>
  );
};
