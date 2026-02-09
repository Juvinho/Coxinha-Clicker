import React, { useState, useEffect } from 'react';

interface GoldenCoxinhaProps {
  onClick: () => void;
  spawnRateMultiplier: number;
}

interface GoldenInstance {
  id: number;
  x: number;
  y: number;
}

const GoldenCoxinha: React.FC<GoldenCoxinhaProps> = ({ onClick, spawnRateMultiplier }) => {
  const [goldenList, setGoldenList] = useState<GoldenInstance[]>([]);
  const [nextId, setNextId] = useState(0);

  // Spawn golden coxinhas at random intervals
  useEffect(() => {
    const baseInterval = 15000; // 15 seconds base
    const adjustedInterval = baseInterval / spawnRateMultiplier;

    const spawn = () => {
      const x = Math.random() * (window.innerWidth - 80) + 40;
      const y = Math.random() * (window.innerHeight * 0.6) + 40;
      
      const id = nextId;
      setNextId(prev => prev + 1);
      
      setGoldenList(prev => [...prev, { id, x, y }]);

      // Auto-remove after 8 seconds if not clicked
      const timeout = setTimeout(() => {
        setGoldenList(prev => prev.filter(g => g.id !== id));
      }, 8000);

      return () => clearTimeout(timeout);
    };

    const interval = setInterval(spawn, Math.max(adjustedInterval, 5000));
    
    // Initial spawn
    spawn();

    return () => clearInterval(interval);
  }, [spawnRateMultiplier, nextId]);

  const handleClick = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setGoldenList(prev => prev.filter(g => g.id !== id));
    onClick();
  };

  return (
    <>
      {goldenList.map(golden => (
        <div
          key={golden.id}
          onClick={(e) => handleClick(golden.id, e)}
          className="fixed w-20 h-20 cursor-pointer z-50 animate-bounce"
          style={{
            left: `${golden.x}px`,
            top: `${golden.y}px`,
          }}
        >
          {/* Glow aura */}
          <div className="absolute inset-0 rounded-full blur-2xl bg-yellow-400/40 animate-pulse"></div>
          
          {/* Golden Coxinha SVG */}
          <svg
            width="80"
            height="80"
            viewBox="0 0 280 280"
            className="relative z-10 drop-shadow-2xl"
          >
            <defs>
              <linearGradient id="goldenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#ffff00', stopOpacity: 1 }} />
                <stop offset="50%" style={{ stopColor: '#ffaa00', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#ff8800', stopOpacity: 1 }} />
              </linearGradient>
              <linearGradient id="goldenHighlight" x1="0%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 0.9 }} />
                <stop offset="100%" style={{ stopColor: '#ffff00', stopOpacity: 0 }} />
              </linearGradient>
            </defs>

            {/* Main coxinha body */}
            <path
              d="M 140 40 Q 200 120 180 220 Q 140 240 100 220 Q 80 120 140 40 Z"
              fill="url(#goldenGradient)"
              stroke="#ffff00"
              strokeWidth="3"
            />

            {/* Bright highlight */}
            <ellipse
              cx="130"
              cy="100"
              rx="35"
              ry="50"
              fill="url(#goldenHighlight)"
            />

            {/* Catupiry inside - golden */}
            <ellipse
              cx="140"
              cy="160"
              rx="30"
              ry="35"
              fill="#ffdd00"
              opacity="0.8"
            />

            {/* Sparkle points */}
            {[...Array(6)].map((_, i) => (
              <circle
                key={i}
                cx={140 + 60 * Math.cos((i * Math.PI) / 3)}
                cy={140 + 60 * Math.sin((i * Math.PI) / 3)}
                r="4"
                fill="#ffff00"
                opacity="0.7"
              />
            ))}
          </svg>
        </div>
      ))}
    </>
  );
};

export default GoldenCoxinha;
