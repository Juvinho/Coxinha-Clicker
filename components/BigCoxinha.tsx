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

      {/* Orbiting Pointer Cursors */}
      {cursors.length > 0 && (
        <div
          className="absolute pointer-events-none z-0"
          style={{
            top: '50%',
            left: '50%',
            width: 0,
            height: 0,
            animation: 'cursorOrbit 40s linear infinite',
          }}
        >
          {cursors.map((_, i) => {
            const angle = (i * 360) / cursors.length;
            // Make pointer face inward toward the coxinha center
            const pointerRotation = angle + 130;
            return (
              <div
                key={i}
                className="absolute"
                style={{
                  transform: `rotate(${angle}deg) translateY(calc(-1 * var(--orbit-radius))) rotate(-${angle}deg)`,
                  transformOrigin: '0 0',
                }}
              >
                {/* Pointer Cursor SVG */}
                <svg
                  viewBox="0 0 24 24"
                  width="26"
                  height="26"
                  style={{
                    transform: `translate(-50%, -50%) rotate(${pointerRotation}deg)`,
                    filter: 'drop-shadow(0 0 6px rgba(255,170,0,0.7)) drop-shadow(0 2px 3px rgba(0,0,0,0.9))',
                  }}
                >
                  <path
                    d="M5 2 L5 18 L9.5 14 L14 22 L17 20.5 L12.5 12.5 L18 12 Z"
                    fill="#ffaa00"
                    stroke="#78350f"
                    strokeWidth="1"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 5 L7 14 L10 11.5"
                    fill="none"
                    stroke="#ffd54f"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    opacity="0.5"
                  />
                </svg>
              </div>
            );
          })}
        </div>
      )}

      <style>{`
        @keyframes cursorOrbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

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