import React from 'react';
import { Upgrade } from '../types';
import { formatNumber } from '../utils';
import { Zap } from 'lucide-react';

interface UpgradesProps {
  upgrades: Upgrade[];
  coxinhas: number;
  onBuy: (id: string, cost: number) => void;
}

const UpgradeCard: React.FC<{
  upgrade: Upgrade;
  canAfford: boolean;
  onBuy: () => void;
}> = ({ upgrade, canAfford, onBuy }) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'click':
        return 'border-blue-500/30 bg-blue-500/5';
      case 'building':
        return 'border-purple-500/30 bg-purple-500/5';
      case 'global':
        return 'border-green-500/30 bg-green-500/5';
      case 'golden':
        return 'border-yellow-500/30 bg-yellow-500/5';
      case 'synergy':
        return 'border-red-500/30 bg-red-500/5';
      default:
        return 'border-gray-500/30 bg-gray-500/5';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'click':
        return '👆';
      case 'building':
        return '🏢';
      case 'global':
        return '🌍';
      case 'golden':
        return '✨';
      case 'synergy':
        return '🔗';
      default:
        return '⭐';
    }
  };

  if (upgrade.purchased) {
    return (
      <div className={`p-3 rounded-lg border ${getTypeColor(upgrade.type)} opacity-50 opacity-30 bg-green-500/10 border-green-500/30`}>
        <div className="flex items-start gap-2">
          <span className="text-lg">{getTypeIcon(upgrade.type)}</span>
          <div>
            <h4 className="font-bold text-xs text-green-400">✓ {upgrade.name}</h4>
            <p className="text-[10px] text-gray-500">{upgrade.description}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={onBuy}
      disabled={!canAfford}
      className={`p-3 rounded-lg border text-left transition-all ${getTypeColor(upgrade.type)} ${
        canAfford
          ? 'hover:border-[#ffaa00] hover:bg-[#ffaa00]/10 cursor-pointer active:scale-95'
          : 'opacity-40 cursor-not-allowed'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2 flex-1">
          <span className="text-lg">{getTypeIcon(upgrade.type)}</span>
          <div>
            <h4 className="font-bold text-xs text-[#e5e5e5]">{upgrade.name}</h4>
            <p className="text-[10px] text-gray-500 line-clamp-2">{upgrade.description}</p>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="text-xs font-bold text-[#ffaa00]">{formatNumber(upgrade.cost)}</div>
          <div className="text-[8px] text-gray-500">Custo</div>
        </div>
      </div>
    </button>
  );
};

const Upgrades: React.FC<UpgradesProps> = ({ upgrades, coxinhas, onBuy }) => {
  const availableUpgrades = upgrades.filter(u => !u.purchased);
  const purchasedCount = upgrades.filter(u => u.purchased).length;

  return (
    <div className="space-y-2">
      {/* Purchased summary */}
      {purchasedCount > 0 && (
        <div className="text-[10px] text-gray-500 italic mb-3">
          {purchasedCount} pesquisa(s) concluída(s)
        </div>
      )}

      {/* Available upgrades grid */}
      <div className="grid grid-cols-1 gap-2">
        {availableUpgrades.map(upgrade => (
          <UpgradeCard
            key={upgrade.id}
            upgrade={upgrade}
            canAfford={coxinhas >= upgrade.cost}
            onBuy={() => onBuy(upgrade.id, upgrade.cost)}
          />
        ))}
      </div>

      {/* All completed message */}
      {availableUpgrades.length === 0 && purchasedCount > 0 && (
        <div className="text-center py-4 text-[10px] text-gray-500">
          <Zap size={20} className="mx-auto mb-2 text-[#ffaa00]" />
          <p>Todas as pesquisas foram concluídas!</p>
        </div>
      )}
    </div>
  );
};

export default Upgrades;
