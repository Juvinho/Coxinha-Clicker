import React, { useEffect, useState } from 'react';

interface Requirement {
  completed: boolean;
  current: number;
  goal: number;
}

interface GalaxyModalProps {
  isOpen: boolean;
  onClose: () => void;
  save?: any;
}

const GalaxyModal: React.FC<GalaxyModalProps> = ({ isOpen, onClose, save = {} }) => {
  const [requirements, setRequirements] = useState<{
    prestige: Requirement;
    portals: Requirement;
    coxinhas: Requirement;
  }>({
    prestige: { completed: false, current: 0, goal: 10 },
    portals: { completed: false, current: 0, goal: 100 },
    coxinhas: { completed: false, current: 0, goal: 1e24 }
  });

  const formatNumber = (num: number): string => {
    if (num < 1000) return num.toString();
    
    const suffixes = [
      '', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'De'
    ];
    const tier = Math.floor(Math.log10(Math.max(num, 1)) / 3);
    
    if (tier >= suffixes.length) {
      return num.toExponential(2);
    }
    
    const suffix = suffixes[tier];
    const scale = Math.pow(10, tier * 3);
    const scaled = num / scale;
    
    return scaled.toFixed(2) + suffix;
  };

  useEffect(() => {
    if (isOpen && save) {
      const prestigeLevel = (save as any).prestigeLevel || 0;
      const portalCount = (save as any).buildings?.find((b: any) => b.id === 'portal')?.count || 0;
      const totalCoxinhas = (save as any).totalCoxinhas || 0;

      setRequirements({
        prestige: {
          completed: prestigeLevel >= 10,
          current: prestigeLevel,
          goal: 10
        },
        portals: {
          completed: portalCount >= 100,
          current: portalCount,
          goal: 100
        },
        coxinhas: {
          completed: totalCoxinhas >= 1e24,
          current: totalCoxinhas,
          goal: 1e24
        }
      });
    }
  }, [isOpen, save]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="galaxy-modal-overlay active"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="galaxy-modal-title"
    >
      <div className="galaxy-modal-box">
        {/* Particles */}
        <div className="galaxy-modal-particles">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="galaxy-modal-particle"
              style={{
                left: (i + 1) * 20 + '%',
                animationDelay: i + 's'
              }}
            />
          ))}
        </div>

        {/* Header */}
        <div className="galaxy-modal-header">
          <div className="galaxy-modal-icon">🌌</div>
          <div className="galaxy-modal-title-wrapper">
            <div className="galaxy-modal-title" id="galaxy-modal-title">
              EXPLORAÇÃO GALÁCTICA
            </div>
            <div className="galaxy-modal-subtitle">
              Desbloqueie explorando o espaço!
            </div>
          </div>
          <button
            className="galaxy-modal-close"
            onClick={onClose}
            aria-label="Fechar modal"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="galaxy-modal-body">
          <div className="galaxy-modal-lock">🔒</div>

          <p className="galaxy-modal-message">
            Desbloqueie o modo de Exploração Galáctica e conquiste o universo!
          </p>

          {/* Requirements */}
          <div className="requirements-box">
            <div className="requirements-title">📋 Requisitos:</div>

            <div
              className={`requirement-item ${
                requirements.prestige.completed ? 'completed' : ''
              }`}
            >
              <span className="requirement-icon">
                {requirements.prestige.completed ? '✅' : '🔄'}
              </span>
              <span>Ascender {requirements.prestige.goal} vezes</span>
              <span className="requirement-progress">
                {requirements.prestige.current}/{requirements.prestige.goal}
              </span>
            </div>

            <div
              className={`requirement-item ${
                requirements.portals.completed ? 'completed' : ''
              }`}
            >
              <span className="requirement-icon">
                {requirements.portals.completed ? '✅' : '🌀'}
              </span>
              <span>Construir {requirements.portals.goal} Portais Dimensionais</span>
              <span className="requirement-progress">
                {requirements.portals.current}/{requirements.portals.goal}
              </span>
            </div>

            <div
              className={`requirement-item ${
                requirements.coxinhas.completed ? 'completed' : ''
              }`}
            >
              <span className="requirement-icon">
                {requirements.coxinhas.completed ? '✅' : '🍗'}
              </span>
              <span>Produzir 1 Septilhão de coxinhas</span>
              <span className="requirement-progress">
                {formatNumber(requirements.coxinhas.current)}/
                {formatNumber(requirements.coxinhas.goal)}
              </span>
            </div>
          </div>

          {/* Rewards */}
          <div className="rewards-box">
            <div className="rewards-title">✨ Recompensas:</div>

            <div className="reward-item">
              <span className="reward-icon">🌌</span>
              <span>Acesso a 100+ galáxias</span>
            </div>

            <div className="reward-item">
              <span className="reward-icon">💎</span>
              <span>Novos recursos cósmicos</span>
            </div>

            <div className="reward-item">
              <span className="reward-icon">⚡</span>
              <span>Upgrades interdimensionais</span>
            </div>

            <div className="reward-item">
              <span className="reward-icon">👽</span>
              <span>Aliados alienígenas</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="galaxy-modal-footer">
          <button className="galaxy-modal-btn galaxy-modal-btn-secondary" onClick={onClose}>
            Voltar
          </button>
          <button className="galaxy-modal-btn galaxy-modal-btn-primary" onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default GalaxyModal;
