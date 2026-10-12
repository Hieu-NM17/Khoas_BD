import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UniverseBackground } from './components/UniverseBackground';
import { ShootingStars } from './components/ShootingStars';
import { GiftBox3D } from './components/GiftBox3D';
import { PhotoExplosion } from './components/PhotoExplosion';
import { TypewriterText } from './components/TypewriterText';
import { photosData } from './data/photosData';
import soundManager from './utils/audio';
import {
  Sparkles,
  Gift,
  Volume2,
  VolumeX,
  RotateCcw,
  ArrowRight,
  Flame,
} from 'lucide-react';

export function App() {
  // Scene State: 1 = Universe Intro, 2 = 3D Gift Box, 3 = Photo Explosion Climax
  const [scene, setScene] = useState(1);
  const [recipientName, setRecipientName] = useState('Khoa');
  const [isExplodingBox, setIsExplodingBox] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Sound toggle handler
  const handleToggleSound = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      soundManager.playChime();
    }
  };

  // Transition from Scene 1 to Scene 2
  const handleStartJourney = () => {
    soundManager.playChime();
    setScene(2);
  };

  // Handle Box Click in Scene 2 -> Transition to Scene 3
  const handleOpenGiftBox = () => {
    if (isExplodingBox) return;
    setIsExplodingBox(true);
    soundManager.playExplosion();

    setTimeout(() => {
      setScene(3);
      setIsExplodingBox(false);
    }, 850);
  };

  // Replay entire experience
  const handleReset = () => {
    soundManager.playChime();
    setScene(1);
    setIsExplodingBox(false);
  };

  return (
    <div className="relative min-h-screen text-slate-100 font-sans selection:bg-cyan-500 selection:text-black flex flex-col justify-between overflow-x-hidden">
      {/* 1. TSParticles Dynamic Universe Background (Đen - Tím - Cyan) */}
      <UniverseBackground scene={scene} />

      {/* 2. Sao Băng định kỳ bay qua (Vệt sáng Cyan - Tím) */}
      <ShootingStars />

      {/* Subtle sci-fi scanlines overlay */}
      <div className="fixed inset-0 scanlines pointer-events-none z-10 opacity-30" />

      {/* Top Floating Navigation Bar */}
      <header className="relative z-40 w-full px-4 sm:px-8 py-5 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-400 p-[1.5px] shadow-lg shadow-purple-500/30">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles size={18} className="text-cyan-400 animate-spin" />
            </div>
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-wider text-white uppercase flex items-center gap-1.5">
              Happy birth day <span className="text-cyan-400 font-extrabold">2006-2026</span>
            </h1>
          </div>
        </motion.div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {scene === 3 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-950/40 hover:bg-purple-900/50 border border-purple-500/30 text-xs text-cyan-300 transition-colors"
              title="Xem lại từ đầu"
            >
              <RotateCcw size={14} />
              <span className="hidden sm:inline">Khám phá lại</span>
            </motion.button>
          )}

          {/* Audio toggle button */}
          <button
            onClick={handleToggleSound}
            className={`w-9 h-9 rounded-full border border-purple-500/30 flex items-center justify-center transition-all ${
              isMuted
                ? 'bg-purple-950/30 text-slate-500 border-purple-500/20'
                : 'bg-purple-950/50 text-cyan-300 hover:bg-purple-900/50'
            }`}
            title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-30 flex-1 flex flex-col items-center justify-center w-full">
        <AnimatePresence mode="wait">
          {/* =========================================
              SCENE 1: Vũ Trụ Của Anh/Em (Intro)
          ========================================== */}
          {scene === 1 && (
            <motion.section
              key="scene-1"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="w-full max-w-4xl px-4 py-16 flex flex-col items-center text-center my-auto"
            >
              {/* Main Headline with Typewriter */}
              <div className="min-h-[110px] sm:min-h-[140px] flex items-center justify-center">
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight text-white drop-shadow-lg">
                  <TypewriterText
                    text={`Chúc Mừng Sinh Nhật ${recipientName}! 🎂🚀`}
                    speed={60}
                    delay={400}
                    className="text-gradient-cosmic"
                    cursorClassName="text-cyan-400"
                  />
                </h1>
              </div>

              {/* Glowing CTA Button: MỞ QUÀ */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.7 }}
                className="mt-8"
              >
                <button
                  onClick={handleStartJourney}
                  className="group relative px-9 py-4 rounded-2xl bg-gradient-to-r from-purple-700 via-purple-600 to-cyan-500 text-white font-black text-lg sm:text-xl tracking-wider shadow-2xl hover:shadow-cyan-500/40 hover:scale-105 active:scale-95 transition-all duration-300 cosmic-glow-primary flex items-center gap-3 overflow-hidden cursor-pointer"
                >
                  <span className="relative z-10 flex items-center gap-2.5">
                    <Gift size={22} className="group-hover:rotate-12 transition-transform text-cyan-200" />
                    MỞ QUÀ
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform text-cyan-200" />
                  </span>

                  <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-25 group-hover:animate-laser-spin" />
                </button>
              </motion.div>
            </motion.section>
          )}

          {/* =========================================
              SCENE 2: Hộp Quà 3D (Interaction)
          ========================================== */}
          {scene === 2 && (
            <motion.section
              key="scene-2"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 2, filter: 'blur(16px)' }}
              transition={{ duration: 0.7 }}
              className="w-full max-w-4xl px-4 py-8 flex flex-col items-center text-center my-auto"
            >
              {/* Header guide */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="max-w-md mx-auto mb-2"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/30 text-cyan-300 text-xs font-semibold mb-2">
                  <Flame size={14} className="text-cyan-400" />
                  <span>VẬT PHẨM VŨ TRỤ BÍ ẨN</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Chiếc Hộp Chứa Đựng Chân Tướng
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm mt-1">
                  Click trực tiếp vào hộp quà hoặc xoay bằng chuột
                </p>
              </motion.div>

              {/* 3D Gift Box Canvas - Bấm thẳng vào hộp quà để mở */}
              <div className="w-full max-w-lg">
                <GiftBox3D
                  onOpenGift={handleOpenGiftBox}
                  isExploding={isExplodingBox}
                />
              </div>

              {/* Pulsing Instruction to Click */}
              <motion.div
                animate={{
                  scale: [1, 1.06, 1],
                  opacity: [0.85, 1, 0.85],
                }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                className="mt-2"
              >
                <button
                  onClick={handleOpenGiftBox}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-900/50 to-cyan-900/50 hover:from-purple-800/60 hover:to-cyan-800/60 border border-cyan-400/50 text-white text-sm font-semibold shadow-lg hover:shadow-cyan-500/30 cursor-pointer transition-all flex items-center gap-2"
                >
                  <Sparkles size={16} className="text-cyan-300" />
                  <span>Click vào hộp quà để nhận sự thật... ✨</span>
                </button>
              </motion.div>
            </motion.section>
          )}

          {/* =========================================
              SCENE 3: Bữa Tiệc Dìm Hàng & Pháo Hoa (Climax)
          ========================================== */}
          {scene === 3 && (
            <motion.section
              key="scene-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <PhotoExplosion
                photos={photosData}
                recipientName={recipientName}
              />
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Minimal Footer */}
      <footer className="relative z-30 w-full py-4 px-6 text-center text-slate-500 text-[11px] border-t border-purple-500/10 backdrop-blur-sm">
        <span>🚀 Happy birth day {recipientName} (2006-2026)</span>
      </footer>
    </div>
  );
}

export default App;
