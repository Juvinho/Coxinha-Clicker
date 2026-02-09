import React from 'react';
import { Building } from '../types';
import { calculateBuildingCost, formatNumber } from '../utils';
import { Plus, TrendingUp } from 'lucide-react';

interface BuildingRowProps {
  building: Building;
  canAfford: boolean;
  onBuy: () => void;
}

const BuildingRow: React.FC<BuildingRowProps> = ({ building, canAfford, onBuy }) => {
  const totalProduction = building.baseCps * building.count;
  const nextCost = calculateBuildingCost(building.baseCost, building.count);

  return (
    <div className="mb-3 p-3 bg-[#1a0f08] border border-[#3d2211] rounded-lg hover:border-[#ffaa00]/40 transition-colors group">
      {/* Header with icon and name */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-start gap-2 flex-1">
          <span className="text-2xl">{building.icon}</span>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-[#e5e5e5] text-sm truncate">{building.name}</h3>
            <p className="text-[10px] text-gray-500 line-clamp-2">{building.description}</p>
          </div>
        </div>
        <div className="text-right ml-2">
          <div className="text-lg font-black text-[#ffaa00]">{building.count}</div>
          <div className="text-[8px] text-gray-500 uppercase">Possui</div>
        </div>
      </div>

      {/* Production stats */}
      {building.count > 0 && (
        <div className="flex items-center gap-1 mb-2 px-2 py-1 bg-black/30 rounded text-[10px]">
          <TrendingUp size={12} className="text-[#39ff14]" />
          <span className="text-[#39ff14] font-bold">{formatNumber(totalProduction)} Cx/s</span>
          <span className="text-gray-500">({formatNumber(building.baseCps)}/un)</span>
        </div>
      )}

      {/* Buy button */}
      <button
        onClick={onBuy}
        disabled={!canAfford}
        className={`w-full py-2 rounded-lg font-bold text-xs uppercase transition-all flex items-center justify-between px-3 ${
          canAfford
            ? 'bg-[#ffaa00] hover:bg-[#ffcc00] text-black active:scale-95 shadow-lg'
            : 'bg-[#2c1810] text-gray-500 cursor-not-allowed opacity-50'
        }`}
      >
        <span>Comprar por</span>
        <div className="flex items-center gap-1">
          <Plus size={12} />
          <span className="font-black">{formatNumber(nextCost)}</span>
        </div>
      </button>
    </div>
  );
};

export default BuildingRow;
