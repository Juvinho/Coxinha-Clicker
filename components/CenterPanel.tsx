import React from 'react';
import BigCoxinha from './BigCoxinha';

interface CenterPanelProps {
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  cursorCount: number;
  floatingTexts: Array<{id: number; x: number; y: number; text: string; color: string; isBig?: boolean}>;
  particles: Array<{id: number; x: number; y: number; size: number; opacity: number; color: string}>;
}

const CenterPanel: React.FC<CenterPanelProps> = ({
  onClick,
  cursorCount,
  floatingTexts,
  particles
}) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center relative bg-[#1a1a1a]">
      {/* Floating Numbers */}
      {floatingTexts.map((text) => (
        <div
          key={text.id}
          style={{
            position: 'fixed',
            left: text.x,
            top: text.y,
            color: text.color,
            fontSize: text.isBig ? '2rem' : '1.2rem',
            fontWeight: 'bold',
            pointerEvents: 'none',
            animation: 'float-up 1.2s ease-out forwards',
            textShadow: '0 0 10px rgba(0,0,0,0.8)'
          }}
        >
          {text.text}
        </div>
      ))}

      {/* Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'fixed',
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            background: p.color,
            borderRadius: '50%',
            pointerEvents: 'none',
            boxShadow: `0 0 ${p.size}px ${p.color}`
          }}
        />
      ))}

      {/* Big Coxinha */}
      <div className="cursor-pointer select-none">
        <BigCoxinha onClick={onClick} cursorCount={cursorCount} />
      </div>

      <style>{`
        @keyframes float-up {
          0% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-100px);
          }
        }
      `}</style>
    </div>
  );
};

export default CenterPanel;
