import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Maximize2 } from 'lucide-react';

export const FunnyPhotoCard = ({
  photo,
  index = 0,
  onSelect,
}) => {
  const [imageError, setImageError] = useState(false);

  // Fallback to picsum if local image is missing
  const fallbackUrl = `https://picsum.photos/400/400?random=${photo.id || index + 1}`;
  const displayUrl = imageError ? fallbackUrl : photo.url;

  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        zIndex: 50,
        boxShadow: '0 20px 40px -10px rgba(6, 182, 212, 0.4), 0 0 25px rgba(168, 85, 247, 0.5)',
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 350, damping: 22 }}
      onClick={() => onSelect && onSelect(photo)}
      className="group relative cursor-pointer select-none rounded-2xl p-1.5 sm:p-2 bg-gradient-to-b from-purple-900/20 via-black/40 to-black/80 backdrop-blur-md border border-purple-500/30 shadow-xl transition-all duration-300 w-full"
    >
      {/* Glow highlight behind card on hover: Chỉ Cyan & Purple */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-purple-600 to-cyan-500 rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-500 -z-10" />

      {/* Expand Icon indicator on hover */}
      <div className="absolute top-3 right-3 z-20 w-7 h-7 rounded-full bg-black/70 backdrop-blur-md border border-cyan-400/40 flex items-center justify-center text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity">
        <Maximize2 size={13} />
      </div>

      {/* Pure Image frame */}
      <div className="relative w-full aspect-square overflow-hidden rounded-xl bg-slate-950 border border-white/10">
        <img
          src={displayUrl}
          alt={`Meme Khoa ${photo.id || index + 1}`}
          loading="lazy"
          draggable={false}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-108 pointer-events-none"
        />

        {/* Subtle shine overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-40 group-hover:opacity-10 transition-opacity" />
      </div>
    </motion.div>
  );
};

export default FunnyPhotoCard;
