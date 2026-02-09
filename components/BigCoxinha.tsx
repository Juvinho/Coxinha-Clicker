import React from 'react';

interface BigCoxinhaProps {
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  cursorCount?: number;
}

const BigCoxinha: React.FC<BigCoxinhaProps> = ({ onClick, cursorCount = 0 }) => {
  const cursorsToRender = Math.min(cursorCount, 36);
  const cursors = Array.from({ length: cursorsToRender });

  return (
    <div 
      id="bigCoxinhaCanvas"
      className="relative w-[280px] h-[360px] lg:w-[400px] lg:h-[520px] cursor-pointer select-none transition-transform duration-150 ease-out hover:scale-[1.03] hover:rotate-1 active:scale-[0.98] z-10"
      onClick={onClick}
      style={{
        filter: 'drop-shadow(0 30px 40px rgba(0,0,0,0.6))'
      }}
    >
      <style>{`
        .cursor-orbiter {
          --orbit-radius: 155px;
        }
        @media (min-width: 1024px) {
          .cursor-orbiter {
            --orbit-radius: 220px;
          }
        }
      `}</style>

      {/* Orbiting Cursors */}
      {cursors.length > 0 && (
        <div className="absolute inset-0 pointer-events-none animate-[spin_40s_linear_infinite] z-0">
          {cursors.map((_, i) => (
            <div
              key={i}
              className="cursor-orbiter absolute top-[65%] left-1/2 w-8 h-8 -ml-4 -mt-4 transition-transform duration-500"
              style={{
                transform: `rotate(${i * (360 / cursors.length)}deg) translateX(var(--orbit-radius)) rotate(-45deg)`
              }}
            >
              {/* White Mouse Cursor SVG */}
              <svg 
                viewBox="0 0 24 24" 
                width="32" 
                height="32" 
                style={{ filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.5))' }}
              >
                <path 
                  d="M5.5 2.5 L17.5 14.5 L11.5 15.5 L15.5 23.5 L12.5 24.5 L8.5 16.5 L3.5 20.5 Z" 
                  fill="white" 
                  stroke="#1a0f08" 
                  strokeWidth="1.5" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          ))}
        </div>
      )}

      {/* Main Coxinha SVG - TEARDROP SHAPE */}
      <svg viewBox="0 0 200 280" className="w-full h-full z-10 relative overflow-visible">
          <defs>
              {/* Crispy Texture Filter - More granular for dough */}
              <filter id="doughTexture" x="-20%" y="-20%" width="140%" height="140%">
                  <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise"/>
                  <feDiffuseLighting in="noise" lightingColor="#fff" surfaceScale="1.2">
                      <feDistantLight azimuth="45" elevation="30" />
                  </feDiffuseLighting>
                  <feComposite operator="in" in2="SourceGraphic"/>
                  <feBlend in="SourceGraphic" mode="multiply" />
              </filter>
              
              {/* Realistic Fried Dough Gradient (Golden -> Brown -> Burnt tips) */}
              <radialGradient id="coxinhaGradient" cx="35%" cy="65%" r="85%" fx="30%" fy="60%">
                  <stop offset="0%" stopColor="#ffc107" />   {/* Golden Yellow Spot */}
                  <stop offset="30%" stopColor="#ff8f00" />   {/* Deep Orange */}
                  <stop offset="70%" stopColor="#b45309" />   {/* Brown */}
                  <stop offset="100%" stopColor="#78350f" />  {/* Dark Crust */}
              </radialGradient>

              {/* Internal shine for grease */}
              <linearGradient id="greaseShine" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="white" stopOpacity="0.4"/>
                  <stop offset="100%" stopColor="white" stopOpacity="0"/>
              </linearGradient>
          </defs>

          {/* THE COXINHA SHAPE PATH */}
          <g filter="url(#doughTexture)">
             <path 
                d="M 100 10 
                   Q 100 10 100 10
                   C 100 10, 160 90, 180 160 
                   C 195 220, 165 265, 100 265 
                   C 35 265, 5 220, 20 160 
                   C 40 90, 100 10, 100 10 Z"
                fill="url(#coxinhaGradient)"
                stroke="rgba(120, 53, 15, 0.3)"
                strokeWidth="1"
             />
          </g>
          
          {/* Specular Highlight (Grease Shine on the curve) */}
          <path 
            d="M 70 140 Q 60 180 80 220" 
            stroke="url(#greaseShine)" 
            strokeWidth="12" 
            strokeLinecap="round" 
            fill="none" 
            opacity="0.3" 
            filter="blur(4px)"
            pointerEvents="none"
          />
          
          {/* Top Tip Highlight */}
          <circle cx="100" cy="25" r="8" fill="#ffd54f" opacity="0.4" filter="blur(6px)" pointerEvents="none" />
      </svg>
    </div>
  );
};

export default BigCoxinha;