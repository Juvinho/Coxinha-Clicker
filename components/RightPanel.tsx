import React, { useState } from 'react';
import { Building } from '../types';
import BuildingCard from './BuildingCard';

interface RightPanelProps {
  buildings: Building[];
  coxinhas: number;
  onBuyBuilding: (buildingId: string, amount: number) => void;
}

const RightPanel: React.FC<RightPanelProps> = ({
  buildings,
  coxinhas,
  onBuyBuilding
}) => {
  const [buyMode, setBuyMode] = useState(0); // 0=x1, 1=x10, 2=x100, 3=Max
  const BUY_LABELS = ['x1', 'x10', 'x100', 'Max'];

  return (
    <div className="w-80 bg-[#2a2a2a] border-l-2 border-[#1a1a1a] flex flex-col h-screen">
      {/* Header */}
      <div className="p-4 bg-[#1a1a1a] border-b-2 border-[#444]">
        <h2 className="font-bold text-[#e5e5e5] mb-3">🏭 ESTRUTURAS</h2>
        
        {/* Buy Mode Selector */}
        <div className="flex gap-1">
          {BUY_LABELS.map((label, idx) => (
            <button
              key={idx}
              onClick={() => setBuyMode(idx)}
              className={`flex-1 px-2 py-1 text-xs font-bold rounded transition-all ${
                buyMode === idx
                  ? 'bg-[#ffaa00] text-black'
                  : 'bg-[#3a3a3a] text-gray-300 hover:bg-[#4a4a4a]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Buildings List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-3">
        {buildings.map((building) => (
          <BuildingCard
            key={building.id}
            building={building}
            canAfford={coxinhas >= 0}
            onBuy={(amount) => onBuyBuilding(building.id, amount)}
            buyMode={buyMode}
          />
        ))}
      </div>
    </div>
  );
};

export default RightPanel;
