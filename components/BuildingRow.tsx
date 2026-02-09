import React from 'react';
import { Building } from '../types';
import { formatNumber, calculateBuildingCost } from '../utils';

interface BuildingRowProps {
  building: Building;
  canAfford: boolean;
  onBuy: () => void;
}

const BuildingRow: React.FC<BuildingRowProps> = ({ building, canAfford, onBuy }) => {
  const currentCost = calculateBuildingCost(building.baseCost, building.count);

  return (
    <div 
      className={`
        relative flex flex-col p-3 rounded-lg border-l-2 transition-all duration-200 group select-none mb-2
        ${canAfford 
          ? 'bg-[#1a0f08] border-[#ffaa00] hover:bg-[#25160b] hover:translate-x-1 cursor-pointer' 
          : 'bg-[#0f0705] border-[#3d2211] opacity-60 grayscale-[0.5] cursor-not-allowed'}
      `}
      style={{
        boxShadow: canAfford ? 'inset 0 1px 0 rgba(255,255,255,0.05), 0 4px 10px rgba(0,0,0,0.5)' : 'none'
      }}
      onClick={() => canAfford && onBuy()}
    >
      <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-3">
              <div className="text-3xl filter drop-shadow-md">{building.icon}</div>
              <div>
                  <div className="font-bold text-sm text-[#e5e5e5]">{building.name}</div>
                  <div className="text-[10px] text-gray-400 font-mono">
                     {building.count} possuídos
                  </div>
              </div>
          </div>
          <div className="text-right">
             <div className={`font-bold text-sm ${canAfford ? 'text-[#ffaa00]' : 'text-red-900'}`}>
                {formatNumber(currentCost)}
             </div>
          </div>
      </div>
      
      <div className="flex justify-between items-center border-t border-white/5 pt-1 mt-1">
          <div className="text-[10px] text-gray-500">
             Próx: <span className="text-gray-300">+{formatNumber(building.baseCps)} Cx/s</span>
          </div>
          {canAfford && <div className="text-[9px] text-[#ffaa00] animate-pulse font-bold tracking-wider">COMPRAR</div>}
      </div>

      {/* 3D Bevel Highlight */}
      <div className="absolute inset-0 rounded-lg shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)] pointer-events-none"></div>
    </div>
  );
};

export default BuildingRow;