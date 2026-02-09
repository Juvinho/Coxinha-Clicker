import React, { useEffect, useState, useRef } from 'react';

interface GoldenCoxinhaProps {
  onClick: () => void;
  spawnRateMultiplier?: number;
}

const GoldenCoxinha: React.FC<GoldenCoxinhaProps> = ({ onClick, spawnRateMultiplier = 1 }) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: '50%', left: '50%' });
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const scheduleNextSpawn = () => {
      // Base: random between 60s and 180s.
      // Multiplier > 1 reduces the time.
      const baseMin = 30000;
      const baseVar = 60000;
      
      const effectiveMin = baseMin / spawnRateMultiplier;
      const effectiveVar = baseVar / spawnRateMultiplier;

      const delay = Math.random() * effectiveVar + effectiveMin;
      
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      
      timeoutRef.current = setTimeout(() => {
        // Random position (padding 10% to avoid edges)
        const top = Math.random() * 80 + 10 + '%';
        const left = Math.random() * 80 + 10 + '%';
        setPosition({ top, left });
        setVisible(true);
        
        // Auto hide after 13 seconds if not clicked
        setTimeout(() => setVisible(false), 13000);
      }, delay);
    };

    if (!visible) {
      scheduleNextSpawn();
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [visible, spawnRateMultiplier]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setVisible(false);
    onClick();
  };

  if (!visible) return null;

  return (
    <div 
      className="absolute z-50 cursor-pointer animate-pulse hover:scale-110 transition-transform duration-200"
      style={{ top: position.top, left: position.left }}
      onClick={handleClick}
    >
      <div className="relative w-16 h-16 shine-effect">
         <svg viewBox="0 0 200 240" className="w-full h-full drop-shadow-[0_0_15px_rgba(255,215,0,0.8)]">
            <defs>
              <linearGradient id="goldenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fff7ed" />
                <stop offset="50%" stopColor="#fcd34d" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
            </defs>
            <path 
              d="M 100 10 C 100 10, 160 80, 175 130 C 190 180, 160 230, 100 235 C 40 230, 10 180, 25 130 C 40 80, 100 10, 100 10 Z" 
              fill="url(#goldenGradient)"
              stroke="#fff"
              strokeWidth="4"
            />
         </svg>
         <div className="absolute -inset-4 bg-yellow-400 rounded-full blur-xl opacity-30 animate-ping"></div>
      </div>
    </div>
  );
};

export default GoldenCoxinha;