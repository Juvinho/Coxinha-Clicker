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
  const [buyMode, setBuyMode] = useState(0);
  const BUY_LABELS = ['x1', 'x10', 'x100', 'Max'];
  const BUY_AMOUNTS = [1, 10, 100, 9999];

  const incrementBuyMode = () => {
    setBuyMode((prev) => (prev + 1) % BUY_LABELS.length);
  };

  const decrementBuyMode = () => {
    setBuyMode((prev) => (prev - 1 + BUY_LABELS.length) % BUY_LABELS.length);
  };

  return (
    <div className="w-96 bg-[#2a2a2a] border-l-2 border-[#1a1a1a] flex flex-col h-screen">
      {/* Header */}
      <div className="p-4 bg-[#1a1a1a] border-b-2 border-[#444]">
        <h2 className="font-bold text-[#e5e5e5] mb-4">🏭 ESTRUTURAS</h2>
        
        {/* Buy Mode Controls with Arrows */}
        <div className="flex items-center justify-between bg-[#2a2a2a] p-2 rounded border border-[#555]">
          {/* Up Arrow */}
          <button
            onClick={incrementBuyMode}
            className="w-10 h-10 flex items-center justify-center bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white font-bold rounded transition-colors text-lg"
            title="Próxima quantidade"
          >
            ▲
          </button>

          {/* Buy Mode Display */}
          <div className="flex-1 text-center">
            <div className="text-sm text-gray-400">Comprar</div>
            <div className="text-2xl font-black text-[#ffaa00]">{BUY_LABELS[buyMode]}</div>
          </div>

          {/* Down Arrow */}
          <button
            onClick={decrementBuyMode}
            className="w-10 h-10 flex items-center justify-center bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white font-bold rounded transition-colors text-lg"
            title="Quantidade anterior"
          >
            ▼
          </button>
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
            buyAmount={BUY_AMOUNTS[buyMode]}
            buyLabel={BUY_LABELS[buyMode]}
          />
        ))}
      </div>
    </div>
  );
};

export default RightPanel;
