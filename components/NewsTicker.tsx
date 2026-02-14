import React from 'react';
import { NEWS_HEADLINES } from '../gameData';

const NewsTicker: React.FC = () => {
  const text = NEWS_HEADLINES.join("  +++  ");

  return (
    <div className="absolute top-0 left-0 w-full z-50 pointer-events-none">
      <div className="ticker-wrap h-8 flex items-center bg-black/80 border-b border-amber-800">
        <div className="ticker text-sm text-amber-100 font-mono tracking-wide">
          {text}  +++  {text}
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;
