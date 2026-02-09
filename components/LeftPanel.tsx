import React from 'react';
import { formatNumber } from '../utils';

interface LeftPanelProps {
  coxinhas: number;
  cps: number;
  onSave: () => void;
  onLoad: () => void;
  onStats: () => void;
  onOptions: () => void;
}

const LeftPanel: React.FC<LeftPanelProps> = ({
  coxinhas,
  cps,
  onSave,
  onLoad,
  onStats,
  onOptions
}) => {
  return (
    <div className="w-64 bg-[#2a2a2a] border-r-2 border-[#1a1a1a] flex flex-col h-screen overflow-y-auto custom-scrollbar p-4">
      {/* Header */}
      <div className="mb-6 pb-4 border-b border-[#444]">
        <div className="text-lg font-bold text-[#e5e5e5] mb-2">🍗 MERCADÃO</div>
        <div className="text-sm text-gray-300 mb-1">v2.031</div>
      </div>

      {/* Big Numbers */}
      <div className="mb-6 p-3 bg-[#1a1a1a] rounded border border-[#444]">
        <div className="text-5xl font-black text-[#ffaa00] truncate">
          {formatNumber(coxinhas)}
        </div>
        <div className="text-xs text-gray-500 mt-1">Coxinhas</div>
      </div>

      {/* CPS Display */}
      <div className="mb-6 p-3 bg-[#1a1a1a] rounded border border-[#444]">
        <div className="text-2xl font-bold text-[#39ff14]">
          {formatNumber(cps)}
        </div>
        <div className="text-xs text-gray-500">Cx/s 📈</div>
      </div>

      {/* Menu Buttons */}
      <div className="space-y-2 mb-6">
        <button
          onClick={onSave}
          className="w-full px-3 py-2 bg-[#3a3a3a] hover:bg-[#4a4a4a] border border-[#555] text-gray-200 text-xs font-bold rounded transition-colors"
        >
          💾 Salvar
        </button>
        <button
          onClick={onLoad}
          className="w-full px-3 py-2 bg-[#3a3a3a] hover:bg-[#4a4a4a] border border-[#555] text-gray-200 text-xs font-bold rounded transition-colors"
        >
          📂 Carregar
        </button>
        <button
          onClick={onStats}
          className="w-full px-3 py-2 bg-[#3a3a3a] hover:bg-[#4a4a4a] border border-[#555] text-gray-200 text-xs font-bold rounded transition-colors"
        >
          📊 Estatísticas
        </button>
        <button
          onClick={onOptions}
          className="w-full px-3 py-2 bg-[#3a3a3a] hover:bg-[#4a4a4a] border border-[#555] text-gray-200 text-xs font-bold rounded transition-colors"
        >
          ⚙️ Opções
        </button>
      </div>

      {/* Divider */}
      <div className="border-t border-[#444] mb-6"></div>

      {/* Info Section */}
      <div className="text-xs text-gray-500 space-y-2">
        <div>
          <span className="text-gray-400">Build:</span> 2.031
        </div>
        <div>
          <span className="text-gray-400">Prestige:</span> 0
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;
