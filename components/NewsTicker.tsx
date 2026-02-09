import React, { useState, useEffect } from 'react';

const NewsTicker: React.FC = () => {
  const newsList = [
    '🎉 Bem-vindo ao Coxinha Clicker!',
    '📰 Coxinhas fritas alcançam novo recorde!',
    '👨‍🍳 Chef Tradicional satisfeito com produção',
    '🌟 Golden Coxinhas avistadas no horizonte',
    '🚀 Tecnologia de fritura revolucionada',
    '🏆 Jogador atinge 1 milhão de coxinhas!',
    '💪 Vovó cozinheira ganhou promoção',
    '⚡ Frenesi de produção em andamento!',
    '🎯 Próximo objetivo: 1 Trilhão de Coxinhas',
    '🎪 Festival de Coxinha em São Paulo',
  ];

  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentNews = newsList[currentNewsIndex];
    
    if (!isDeleting) {
      if (displayedText.length < currentNews.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(currentNews.slice(0, displayedText.length + 1));
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        // Wait before starting to delete
        const timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 3000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayedText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 30);
        return () => clearTimeout(timeout);
      } else {
        setIsDeleting(false);
        setCurrentNewsIndex((prev) => (prev + 1) % newsList.length);
      }
    }
  }, [displayedText, isDeleting, currentNewsIndex, newsList]);

  return (
    <div className="w-full bg-[#120a06] border-b border-[#3d2211] p-3 z-20 overflow-hidden">
      <div className="flex items-center gap-3 text-center">
        <div className="text-xl animate-pulse">📢</div>
        <div className="flex-1 text-sm font-bold text-[#ffaa00] min-h-6 tracking-wide">
          {displayedText}
          <span className="animate-pulse">|</span>
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;
