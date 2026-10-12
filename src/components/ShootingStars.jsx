import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const ShootingStars = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // Generate periodic shooting stars
    const spawnStar = () => {
      const id = Date.now() + Math.random();
      const startX = Math.random() * 80 + 20; // 20% to 100% of viewport width
      const startY = Math.random() * 40;      // 0% to 40% of viewport height
      const length = Math.random() * 120 + 100;
      const duration = Math.random() * 0.8 + 0.8;
      const angle = 45;

      const newStar = {
        id,
        startX,
        startY,
        length,
        duration,
        angle,
      };

      setStars((prev) => [...prev.slice(-6), newStar]);

      setTimeout(() => {
        setStars((prev) => prev.filter((s) => s.id !== id));
      }, (duration + 0.2) * 1000);
    };

    spawnStar();
    const interval = setInterval(() => {
      spawnStar();
      if (Math.random() > 0.6) {
        setTimeout(spawnStar, 300);
      }
    }, 2400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
      <AnimatePresence>
        {stars.map((star) => (
          <motion.div
            key={star.id}
            initial={{
              x: `${star.startX}vw`,
              y: `${star.startY}vh`,
              opacity: 0,
              scale: 0.6,
            }}
            animate={{
              x: `${star.startX - 35}vw`,
              y: `${star.startY + 35}vh`,
              opacity: [0, 1, 1, 0],
              scale: [0.6, 1.2, 1, 0.4],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: star.duration,
              ease: 'easeOut',
            }}
            style={{
              position: 'absolute',
              transform: `rotate(-${star.angle}deg)`,
              transformOrigin: 'right center',
            }}
            className="flex items-center"
          >
            {/* Glowing Meteor Head (Trắng + vầng sáng Cyan) */}
            <div className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_12px_#38bdf8,0_0_24px_#a855f7] -mr-1 z-10" />

            {/* Glowing Comet Tail: Cyan to Purple */}
            <div
              className="h-[2px] bg-gradient-to-r from-cyan-300 via-purple-500 to-transparent"
              style={{ width: `${star.length}px` }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ShootingStars;
