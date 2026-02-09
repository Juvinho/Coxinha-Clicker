import React from 'react';
import { Building } from '../types';
import { calculateBuildingCost, formatNumber } from '../utils';

interface BuildingCardProps {
  building: Building;
  canAfford: boolean;
  onBuy: (amount: number) => void;
  buyAmount: number;
  buyLabel: string;
}

const BuildingCard: React.FC<BuildingCardProps> = ({
  building,
  canAfford,
  onBuy,
  buyAmount,
  buyLabel
}) => {
  const nextCost = calculateBuildingCost(building.baseCost, building.count);
  const totalProduction = building.baseCps * building.count;

  return (
    <div
      className={`p-4 mb-3 rounded-lg border-2 transition-all ${
        canAfford
          ? 'bg-[#2a2a2a] border-[#ffaa00]/50 hover:border-[#ffaa00] hover:bg-[#333]'
          : 'bg-[#1a1a1a] border-[#444]'
      }`}
    >
      {/* Top Row: Icon + Name + Count */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-start gap-3 flex-1">
          <span className="text-3xl">{building.icon}</span>
          <div className="flex-1">
            <div className="font-bold text-[#e5e5e5]">{building.name}</div>
            <div className="text-xs text-gray-500">{building.description}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-black text-[#ffaa00]">{building.count}</div>
          <div className="text-xs text-gray-500">Possui</div>
        </div>
      </div>

      {/* Production Info */}
      {building.count > 0 && (
        <div className="mb-3 px-2 py-1 bg-[#1a1a1a] rounded text-xs text-[#39ff14] border border-[#444]">
          +{formatNumber(totalProduction)} Cx/s
        </div>
      )}

      {/* Cost Section */}
      <div className="mb-3 p-2 bg-[#1a1a1a] rounded border border-[#444]">
        <div className="text-xs text-gray-500 mb-1">Próximo Custo:</div>
        <div className="text-lg font-black text-[#ffaa00]">
          {formatNumber(nextCost)}
        </div>
      </div>

      {/* Buy Button with Label */}
      <button
        onClick={() => onBuy(buyAmount)}
        className={`w-full py-3 rounded font-bold text-sm transition-all ${
          canAfford
            ? 'bg-[#ffaa00] text-black hover:bg-[#ffcc00] active:scale-95 shadow-lg'
            : 'bg-[#3a3a3a] text-gray-600 cursor-not-allowed opacity-50'
        }`}
      >
        COMPRAR {buyLabel}
      </button>
    </div>
  );
};

export default BuildingCard;
