import React from 'react';

interface BigCoxinhaProps {
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  cursorCount: number;
}

const BigCoxinha: React.FC<BigCoxinhaProps> = ({ onClick, cursorCount }) => {
  return (
    <div className="relative flex flex-col items-center">
      {/* Cursor count indicator */}
      {cursorCount > 0 && (
        <div className="absolute -top-20 text-center">
          <div className="text-xs text-gray-400 mb-1">Cliques automáticos ativos</div>
          <div className="text-2xl font-bold text-[#ffaa00] drop-shadow-lg">{cursorCount}</div>
        </div>
      )}

      {/* Main Coxinha */}
      <div
        onClick={onClick}
        className="relative cursor-pointer group transition-transform active:scale-95 hover:scale-110"
      >
        {/* Glow Effect */}
        <div className="absolute inset-0 blur-3xl bg-gradient-to-b from-[#ffaa00]/20 to-transparent rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity"></div>

        {/* Coxinha SVG/Emoji - Large clickable area */}
        <div className="relative z-10">
          <svg
            width="280"
            height="280"
            viewBox="0 0 280 280"
            className="drop-shadow-2xl"
          >
            {/* Base da Coxinha - cone shape */}
            <defs>
              <linearGradient id="coxinhaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#d4a574', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#8b5a2b', stopOpacity: 1 }} />
              </linearGradient>
              <linearGradient id="coxinhaHighlight" x1="0%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#ffcc99', stopOpacity: 0.8 }} />
                <stop offset="100%" style={{ stopColor: '#d4a574', stopOpacity: 0 }} />
              </linearGradient>
            </defs>

            {/* Main coxinha body (cone) */}
            <path
              d="M 140 40 Q 200 120 180 220 Q 140 240 100 220 Q 80 120 140 40 Z"
              fill="url(#coxinhaGradient)"
              stroke="#6b3d1f"
              strokeWidth="2"
            />

            {/* Highlight/shine */}
            <ellipse
              cx="130"
              cy="100"
              rx="35"
              ry="50"
              fill="url(#coxinhaHighlight)"
            />

            {/* Catupiry inside - cream filling visible */}
            <ellipse
              cx="140"
              cy="160"
              rx="30"
              ry="35"
              fill="#f5deb3"
              opacity="0.6"
            />

            {/* Top point detail */}
            <circle cx="140" cy="45" r="8" fill="#9d7e5f" opacity="0.8" />
          </svg>
        </div>

        {/* Text under coxinha */}
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center whitespace-nowrap">
          <p className="text-sm text-gray-400 font-bold">Clique para fritar!</p>
        </div>
      </div>

      {/* Particles burst effect on click - handled by parent App */}
    </div>
  );
};

export default BigCoxinha;
