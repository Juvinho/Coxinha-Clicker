import React, { useState } from 'react';
import { Building } from '../types';
import { calculateBuildingCost, formatNumber } from '../utils';

interface BuildingCardProps {
  building: Building;
  canAfford: boolean;
  onBuy: (amount: number) => void;
  buyMode: number; // 0=x1, 1=x10, 2=x100, 3=Max
}

const BUY_MODES = [1, 10, 100, 'Max'] as const;

const BuildingCard: React.FC<BuildingCardProps> = ({
  building,
  canAfford,
  onBuy,
  buyMode
}) => {
  const nextCost = calculateBuildingCost(building.baseCost, building.count);
  const totalProduction = building.baseCps * building.count;
  const buyAmount = BUY_MODES[buyMode];

  const affordableCount = (coxinhas: number) => {
    let count = 0;
    let currentCost = nextCost;
    while (coxinhas >= currentCost && count < 1000) {
      coxinhas -= currentCost;
      currentCost = calculateBuildingCost(building.baseCost, building.count + count + 1);
      count++;
    }
    return count;
  };

  return (
    <div
      className={`p-4 mb-2 rounded-lg border-2 transition-all ${
        canAfford
          ? 'bg-[#2a2a2a] border-[#ffaa00]/50 hover:border-[#ffaa00] hover:bg-[#333]'
          : 'bg-[#1a1a1a] border-[#444] opacity-50'
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
        <div className="mb-3 px-2 py-1 bg-[#1a1a1a] rounded text-xs text-[#39ff14]">
          +{formatNumber(totalProduction)} Cx/s
        </div>
      )}

      {/* Buy Controls */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex-1 text-xs">
          <div className="text-gray-500 mb-1">Próximo Custo:</div>
          <div className="text-lg font-black text-[#ffaa00]">
            {formatNumber(nextCost)}
          </div>
        </div>
        <button
          onClick={() => onBuy(typeof buyAmount === 'string' ? 1000 : buyAmount)}
          disabled={!canAfford}
          className={`px-4 py-3 rounded font-bold text-xs transition-all ${
            canAfford
              ? 'bg-[#ffaa00] text-black hover:bg-[#ffcc00] active:scale-95'
              : 'bg-[#444] text-gray-600 cursor-not-allowed'
          }`}
        >
          COMPRAR
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-[#1a1a1a] rounded overflow-hidden border border-[#444]">
        <div
          className="h-full bg-gradient-to-r from-[#ffaa00] to-[#ffcc00]"
          style={{ width: '0%' }}
        />
      </div>
    </div>
  );
};

export default BuildingCard;
