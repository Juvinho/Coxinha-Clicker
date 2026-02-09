import React, { useState, useMemo } from 'react';
import '../styles/RebirthSystem.css';

interface RebirthPanelProps {
  hotOilFragments: number;
  rebirthCount: number;
  totalCoxinhas: number;
  prestige: number;
  onRebirthClick: () => void;
  nextRebirthFragments: number;
}

const RebirthPanel: React.FC<RebirthPanelProps> = ({
  hotOilFragments,
  rebirthCount,
  totalCoxinhas,
  prestige,
  onRebirthClick,
  nextRebirthFragments
}) => {
  const [hovered, setHovered] = useState(false);

  const formattedFragments = useMemo(() => {
    return hotOilFragments.toLocaleString('pt-BR');
  }, [hotOilFragments]);

  const formattedNext = useMemo(() => {
    return nextRebirthFragments.toLocaleString('pt-BR');
  }, [nextRebirthFragments]);

  const canRebirth = nextRebirthFragments > 0;

  return (
    <div className="rebirth-panel">
      <div className="rebirth-header">
        <h2>🔥 REBIRTH</h2>
      </div>

      <div className="fragments-display">
        <span className={`fragment-icon ${hovered ? 'hover' : ''}`}>🔥</span>
        <div className="fragment-info">
          <span className="fragment-count">{formattedFragments}</span>
          <span className="fragment-label">Fragmentos de Óleo Quente</span>
        </div>
      </div>

      <div className="rebirth-info">
        <div className="info-row">
          <span className="info-label">Rebirths:</span>
          <span className="info-value">{rebirthCount}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Coxinhas totais:</span>
          <span className="info-value">{(totalCoxinhas / 1e24).toFixed(2)} Septilhões</span>
        </div>
        <div className="info-row">
          <span className="info-label">Prestige Level:</span>
          <span className="info-value">{prestige}</span>
        </div>
        <div className="info-row highlight">
          <span className="info-label">Próximo Rebirth:</span>
          <span className="info-value">{formattedNext} fragmentos</span>
        </div>
      </div>

      <button
        className={`rebirth-btn ${canRebirth ? '' : 'disabled'}`}
        onClick={onRebirthClick}
        disabled={!canRebirth}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        🔥 FAZER REBIRTH
      </button>

      <div className="rebirth-description">
        <p>
          ⚠️ <strong>Atenção:</strong> Rebirth reseta todas as coxinhas e prédios, mas você mantém:
        </p>
        <ul>
          <li>✅ Fragmentos de Óleo Quente</li>
          <li>✅ Galáxias desbloqueadas</li>
          <li>✅ Upgrades galácticos</li>
          <li>✅ Todas as conquistas</li>
        </ul>
      </div>
    </div>
  );
};

export default RebirthPanel;
