import React from 'react';
import { Upgrade } from '../types';
import { formatNumber } from '../utils';

interface BottomPanelProps {
  upgrades: Upgrade[];
  coxinhas: number;
  onBuyUpgrade: (upgradeId: string) => void;
}

const BottomPanel: React.FC<BottomPanelProps> = ({
  upgrades,
  coxinhas,
  onBuyUpgrade
}) => {
  const availableUpgrades = upgrades.filter(u => !u.purchased);

  return (
    <div className="h-48 bg-[#2a2a2a] border-t-2 border-[#1a1a1a] flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 bg-[#1a1a1a] border-b-2 border-[#444]">
        <h3 className="font-bold text-[#e5e5e5]">⚡ Pesquisa & Desenvolvimento</h3>
      </div>

      {/* Upgrades Grid */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-3">
        <div className="grid grid-cols-10 gap-2">
          {availableUpgrades.map((upgrade) => {
            const canAfford = coxinhas >= upgrade.cost;

            return (
              <button
                key={upgrade.id}
                onClick={() => canAfford && onBuyUpgrade(upgrade.id)}
                disabled={!canAfford}
                title={upgrade.name}
                className={`w-16 h-16 rounded border-2 transition-all relative group ${
                  canAfford
                    ? 'bg-[#3a3a3a] border-[#555] hover:border-[#ffaa00] hover:scale-110'
                    : 'bg-[#1a1a1a] border-[#444] opacity-40 cursor-not-allowed'
                }`}
              >
                {/* Icon */}
                <div className="text-2xl">
                  {upgrade.type === 'click'
                    ? '👆'
                    : upgrade.type === 'building'
                    ? '🏢'
                    : upgrade.type === 'global'
                    ? '🌍'
                    : upgrade.type === 'golden'
                    ? '✨'
                    : '🔗'}
                </div>

                {/* Tooltip */}
                <div className="hidden group-hover:block absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-[#1a1a1a] rounded p-2 border border-[#555] text-xs whitespace-nowrap z-50 min-w-max">
                  <div className="font-bold text-[#ffaa00]">{upgrade.name}</div>
                  <div className="text-gray-400 text-[10px]">{upgrade.description}</div>
                  <div className="text-[#39ff14] text-[10px] mt-1">
                    {formatNumber(upgrade.cost)} Cx
                  </div>
                </div>

                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 animate-pulse rounded"></div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BottomPanel;
