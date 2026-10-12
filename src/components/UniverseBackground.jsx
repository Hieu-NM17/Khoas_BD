import React, { useEffect, useState, useMemo } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

export const UniverseBackground = ({ scene = 1 }) => {
  const [init, setInit] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = useMemo(() => {
    // Dynamic particle count based on screen size
    const particleCount = isMobile ? 40 : (scene === 3 ? 100 : 75);
    const speed = scene === 1 ? 0.6 : scene === 2 ? 1.2 : 1.8;

    return {
      background: {
        color: {
          value: 'transparent',
        },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: ['grab', 'bubble'],
          },
          resize: {
            enable: true,
            delay: 0.5,
          },
        },
        modes: {
          grab: {
            distance: isMobile ? 100 : 140,
            links: {
              opacity: 0.7,
              color: '#38bdf8', // Cyan
            },
          },
          bubble: {
            distance: 180,
            size: 3.5,
            duration: 1.5,
            opacity: 0.85,
          },
        },
      },
      particles: {
        // Chỉ 3 màu: Trắng sao, Xanh Cyan (#38bdf8), Tím (#a855f7)
        color: {
          value: ['#ffffff', '#38bdf8', '#a855f7'],
        },
        links: {
          color: '#8b5cf6',
          distance: isMobile ? 90 : 125,
          enable: true,
          opacity: 0.25,
          width: 1,
        },
        move: {
          direction: 'none',
          enable: true,
          outModes: {
            default: 'out',
          },
          random: true,
          speed: speed,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: particleCount,
        },
        opacity: {
          value: { min: 0.2, max: 0.8 },
          animation: {
            enable: true,
            speed: 1,
            minimumValue: 0.2,
            sync: false,
          },
        },
        shape: {
          type: 'circle',
        },
        size: {
          value: { min: 1, max: 2.8 },
          animation: {
            enable: true,
            speed: 2,
            minimumValue: 0.5,
            sync: false,
          },
        },
      },
      detectRetina: true,
    };
  }, [scene, isMobile]);

  if (!init) {
    return (
      <div className="fixed inset-0 bg-[#030014] -z-10" />
    );
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-auto">
      {/* Deep universe space gradient backdrop: Dark Cosmic base with subtle Purple/Cyan aura */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(139,92,246,0.18),rgba(255,255,255,0))] -z-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#030014] via-[#08041d] to-[#030014] -z-30" />
      <Particles
        id="tsparticles"
        className="w-full h-full"
        options={options}
      />
    </div>
  );
};

export default UniverseBackground;
