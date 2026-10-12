import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { FunnyPhotoCard } from './FunnyPhotoCard';
import { TypewriterText } from './TypewriterText';
import {
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight,
  Heart,
  Flame,
} from 'lucide-react';

export const PhotoExplosion = ({ photos = [], recipientName = 'Khoa' }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // 3 Màu confetti đồng bộ: Xanh Cyan (#06b6d4, #38bdf8), Tím (#8b5cf6, #c084fc), Trắng (#ffffff)
  const cosmicColors = ['#06b6d4', '#38bdf8', '#8b5cf6', '#c084fc', '#ffffff'];

  // Trigger continuous festive confetti
  useEffect(() => {
    const count = 160;
    const defaults = {
      origin: { y: 0.65 },
      zIndex: 9999,
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 30,
      startVelocity: 55,
      colors: cosmicColors,
    });
    fire(0.2, {
      spread: 60,
      colors: cosmicColors,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
      colors: cosmicColors,
    });
    fire(0.2, {
      spread: 120,
      startVelocity: 35,
      colors: cosmicColors,
    });

    const interval = setInterval(() => {
      confetti({
        particleCount: 18,
        angle: 60,
        spread: 45,
        origin: { x: 0.05, y: 0.7 },
        colors: cosmicColors,
      });
      confetti({
        particleCount: 18,
        angle: 120,
        spread: 45,
        origin: { x: 0.95, y: 0.7 },
        colors: cosmicColors,
      });
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  // Chia đầy đủ 23 ảnh thành 4 làn ngang (2 làn Trái qua Phải, 2 làn Phải qua Trái)
  const lane1 = useMemo(() => {
    const slice = photos.slice(0, 6);
    return [...slice, ...slice]; // Nhân đôi để loop vô tận mượt mà
  }, [photos]);

  const lane2 = useMemo(() => {
    const slice = photos.slice(6, 12);
    return [...slice, ...slice];
  }, [photos]);

  const lane3 = useMemo(() => {
    const slice = photos.slice(12, 18);
    return [...slice, ...slice];
  }, [photos]);

  const lane4 = useMemo(() => {
    const slice = photos.slice(18, 23);
    return [...slice, ...slice];
  }, [photos]);

  // Navigate lightbox photos
  const handlePrevPhoto = (e) => {
    e.stopPropagation();
    if (!selectedPhoto) return;
    const currentIndex = photos.findIndex((p) => p.id === selectedPhoto.id);
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
    setSelectedPhoto(photos[prevIndex]);
  };

  const handleNextPhoto = (e) => {
    e.stopPropagation();
    if (!selectedPhoto) return;
    const currentIndex = photos.findIndex((p) => p.id === selectedPhoto.id);
    const nextIndex = (currentIndex + 1) % photos.length;
    setSelectedPhoto(photos[nextIndex]);
  };

  return (
    <div className="relative w-full min-h-[calc(100vh-80px)] flex flex-col justify-between overflow-hidden py-4 select-none">
      {/* Màn mờ 2 bên viền màn hình để ảnh biến mất tự nhiên */}
      <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#030014] to-transparent z-25 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#030014] to-transparent z-25 pointer-events-none" />

      {/* ========================================================
          LÀN 1 (TRÊN CÙNG): Trôi từ TRÁI qua PHẢI (Left to Right)
      ========================================================= */}
      <div className="w-full overflow-hidden flex items-center z-15 py-1">
        <div className="flex gap-4 sm:gap-6 animate-drift-ltr pause-hover w-max">
          {lane1.map((photo, idx) => (
            <div key={`lane1-${photo.id}-${idx}`} className="w-32 sm:w-40 md:w-48 shrink-0">
              <FunnyPhotoCard
                photo={photo}
                index={idx}
                onSelect={(p) => setSelectedPhoto(p)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================
          LÀN 2 (TẦNG TRÊN GIỮA): Trôi từ PHẢI qua TRÁI (Right to Left)
      ========================================================= */}
      <div className="w-full overflow-hidden flex items-center z-15 py-1">
        <div className="flex gap-4 sm:gap-6 animate-drift-rtl-fast pause-hover w-max">
          {lane2.map((photo, idx) => (
            <div key={`lane2-${photo.id}-${idx}`} className="w-32 sm:w-40 md:w-48 shrink-0">
              <FunnyPhotoCard
                photo={photo}
                index={idx}
                onSelect={(p) => setSelectedPhoto(p)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================
          TRUNG TÂM: Hộp Lời Chúc "Happy birth day" Nổi Bật Ở Giữa
      ========================================================= */}
      <div className="relative z-30 max-w-xl w-full mx-auto px-4 my-2 flex flex-col items-center text-center">
        {/* Header Badge: Tím + Cyan */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/15 border border-cyan-400/30 text-cyan-300 text-xs font-semibold mb-2 shadow-lg backdrop-blur-md"
        >
          <Sparkles size={14} className="text-cyan-400 animate-spin" />
          <span>VỤ NỔ KHOẢNH KHẮC</span>
        </motion.div>

        {/* Main Title: Gradient Cyan to Purple */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-3 drop-shadow-2xl"
        >
          Vũ Trụ MEMEs <span className="text-gradient-cosmic">{recipientName}</span>
        </motion.h2>

        {/* Main Wishes Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-full rounded-3xl p-4 sm:p-6 bg-gradient-to-b from-purple-950/60 via-slate-950/90 to-black/95 backdrop-blur-2xl border border-purple-500/40 shadow-2xl relative overflow-hidden"
        >
          {/* Neon auras: Tím & Cyan */}
          <div className="absolute top-0 right-0 -mr-12 -mt-12 w-36 h-36 bg-purple-600/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-12 -mb-12 w-36 h-36 bg-cyan-500/25 rounded-full blur-3xl pointer-events-none" />

          {/* Title row */}
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-purple-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-500/30 shrink-0">
              <Flame size={18} className="text-cyan-200" />
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white text-gradient-cosmic tracking-wide">
              Happy birth day
            </h3>
          </div>

          {/* Typewriter text content */}
          <div className="text-slate-100 text-sm sm:text-base font-medium leading-relaxed p-3.5 sm:p-4 rounded-2xl bg-black/60 border border-purple-500/20 shadow-inner">
            <TypewriterText
              text="Chúc bro tuổi mới cu bớt to đái cho dễ, hay ăn chóng cao, đẹp trai và _ay hơn nhé !"
              speed={40}
              delay={400}
              className="text-cyan-50 font-semibold"
              cursorClassName="text-cyan-400"
            />
          </div>

          {/* Bottom tagline */}
          <div className="mt-3 pt-2.5 flex items-center justify-between text-xs text-slate-400 border-t border-purple-500/20 px-1">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Heart size={14} className="text-purple-400 fill-purple-400 animate-pulse" />
              From Hieu & Trung w/ luv
            </span>
            <span className="font-semibold text-cyan-400">
              #Khoa_2026 #ForeverYoung
            </span>
          </div>
        </motion.div>

        <p className="text-slate-400 text-[11px] sm:text-xs mt-2 backdrop-blur-sm bg-black/40 px-3 py-0.5 rounded-full border border-purple-500/20">
          ✨ Rê chuột vào ảnh để dừng trôi • Click vào ảnh để phóng to
        </p>
      </div>

      {/* ========================================================
          LÀN 3 (TẦNG DƯỚI GIỮA): Trôi từ TRÁI qua PHẢI (Left to Right)
      ========================================================= */}
      <div className="w-full overflow-hidden flex items-center z-15 py-1">
        <div className="flex gap-4 sm:gap-6 animate-drift-ltr-fast pause-hover w-max">
          {lane3.map((photo, idx) => (
            <div key={`lane3-${photo.id}-${idx}`} className="w-32 sm:w-40 md:w-48 shrink-0">
              <FunnyPhotoCard
                photo={photo}
                index={idx}
                onSelect={(p) => setSelectedPhoto(p)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================
          LÀN 4 (DƯỚI CÙNG): Trôi từ PHẢI qua TRÁI (Right to Left)
      ========================================================= */}
      <div className="w-full overflow-hidden flex items-center z-15 py-1">
        <div className="flex gap-4 sm:gap-6 animate-drift-rtl pause-hover w-max">
          {lane4.map((photo, idx) => (
            <div key={`lane4-${photo.id}-${idx}`} className="w-32 sm:w-40 md:w-48 shrink-0">
              <FunnyPhotoCard
                photo={photo}
                index={idx}
                onSelect={(p) => setSelectedPhoto(p)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================
          Lightbox Modal khi click vào ảnh
      ========================================================= */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-slate-950 border border-purple-500/40 rounded-3xl p-3 sm:p-4 shadow-2xl overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/70 border border-purple-500/40 text-cyan-300 flex items-center justify-center hover:bg-purple-900/40 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              {/* Prev / Next Buttons */}
              <button
                onClick={handlePrevPhoto}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/70 border border-purple-500/40 text-cyan-300 flex items-center justify-center hover:bg-purple-900/40 transition-colors cursor-pointer"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={handleNextPhoto}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/70 border border-purple-500/40 text-cyan-300 flex items-center justify-center hover:bg-purple-900/40 transition-colors cursor-pointer"
              >
                <ChevronRight size={20} />
              </button>

              {/* Clean Image View */}
              <div className="w-full aspect-square rounded-2xl overflow-hidden bg-black flex items-center justify-center border border-white/10">
                <img
                  src={selectedPhoto.url}
                  alt="Meme Khoa"
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PhotoExplosion;
