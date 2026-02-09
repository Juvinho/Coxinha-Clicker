import React from 'react';
import { Upgrade } from '../types';
import { formatNumber } from '../utils';

interface UpgradesProps {
  upgrades: Upgrade[];
  coxinhas: number;
  onBuy: (id: string, cost: number) => void;
}

const Upgrades: React.FC<UpgradesProps> = ({ upgrades, coxinhas, onBuy }) => {
  const availableUpgrades = upgrades.filter(u => !u.purchased);
  
  if (availableUpgrades.length === 0) return (
      <div className="w-full h-full flex flex-col items-center justify-center text-[#5c3a21] italic">
          <span className="text-2xl mb-1 opacity-50">🔒</span>
          Tecnologias esgotadas
      </div>
  );

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 pb-8">
        {availableUpgrades.map(upgrade => {
            const canBuy = coxinhas >= upgrade.cost;
            return (
              <div
                key={upgrade.id}
                className={`
                  relative flex flex-col justify-between p-2 rounded border-b-2 transition-all duration-150 group overflow-hidden h-[100px]
                  ${canBuy 
                    ? 'bg-[#2a1810] border-[#ffaa00] hover:-translate-y-1 hover:bg-[#3d2211] cursor-pointer shadow-lg' 
                    : 'bg-[#120a06] border-[#3d2211] opacity-40 cursor-not-allowed'}
                `}
                onClick={() => canBuy && onBuy(upgrade.id, upgrade.cost)}
              >
                <div className="flex justify-between items-start mb-1">
                    <div className="bg-black/30 w-7 h-7 flex items-center justify-center rounded text-sm border border-white/5">✨</div>
                    <div className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${canBuy ? 'bg-[#ffaa00]/10 text-[#ffaa00]' : 'text-red-700'}`}>
                        {formatNumber(upgrade.cost)}
                    </div>
                </div>

                <div>
                    <div className="font-bold text-[#e5e5e5] text-[11px] leading-tight mb-0.5">{upgrade.name}</div>
                    <div className="text-[9px] text-gray-500 leading-tight line-clamp-2">{upgrade.description}</div>
                </div>
                
                {canBuy && <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-200 pointer-events-none"></div>}
              </div>
            );
        })}
    </div>
  );
};

export default Upgrades;