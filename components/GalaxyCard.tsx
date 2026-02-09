import React, { useState } from 'react';
import { Galaxy } from '../systems/RebirthSystem';
import '../styles/RebirthSystem.css';

interface GalaxyCardProps {
  galaxy: Galaxy;
  canAfford: boolean;
  isLocked: boolean;
  onBuyClick: () => void;
  onExploreClick: () => void;
  onTravelClick: () => void;
  isCurrentGalaxy: boolean;
}

const GalaxyCard: React.FC<GalaxyCardProps> = ({
  galaxy,
  canAfford,
  isLocked,
  onBuyClick,
  onExploreClick,
  onTravelClick,
  isCurrentGalaxy
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getGalaxyClass = () => {
    let classes = 'galaxy-card';
    if (isLocked) classes += ' locked';
    if (galaxy.special) classes += ' special';
    if (galaxy.legendary) classes += ' legendary';
    if (galaxy.endgame) classes += ' endgame';
    if (isCurrentGalaxy) classes += ' current';
    return classes;
  };

  const getButtonsContent = () => {
    if (isLocked) {
      return (
        <div className="galaxy-buttons">
          <span className="lock-text">🔒 Bloqueado</span>
        </div>
      );
    }

    if (!galaxy.unlocked) {
      return (
        <button
          className={`galaxy-btn buy-btn ${canAfford ? '' : 'insufficient'}`}
          onClick={onBuyClick}
          disabled={!canAfford}
        >
          💳 {galaxy.cost} Fragmentos
        </button>
      );
    }

    return (
      <div className="galaxy-buttons">
        <button className="galaxy-btn explore-btn" onClick={onExploreClick}>
          🔍 Explorar ({galaxy.exploration}%)
        </button>
        <button
          className={`galaxy-btn travel-btn ${isCurrentGalaxy ? 'active' : ''}`}
          onClick={onTravelClick}
        >
          {isCurrentGalaxy ? '✓ Atual' : '🚀 Viajar'}
        </button>
      </div>
    );
  };

  return (
    <div
      className={getGalaxyClass()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {galaxy.legendary && <div className="legendary-aura" />}
      {galaxy.special && <div className="special-glow" />}

      <div className="galaxy-icon">{galaxy.icon}</div>

      <div className="galaxy-name">{galaxy.name}</div>

      <p className="galaxy-description">{galaxy.description}</p>

      {galaxy.unlocked && (
        <div className="galaxy-exploration">
          <div className="exploration-label">
            Exploração: <strong>{galaxy.exploration}%</strong>
          </div>
          <div className="exploration-bar">
            <div
              className="exploration-fill"
              style={{ width: `${galaxy.exploration}%` }}
            />
          </div>
        </div>
      )}

      <div className="galaxy-bonuses">
        <div className="bonus-title">Bônus:</div>
        <ul>
          {galaxy.bonuses.cps_mult && (
            <li>CpS x{galaxy.bonuses.cps_mult}</li>
          )}
          {galaxy.bonuses.click_mult && (
            <li>Clique x{galaxy.bonuses.click_mult}</li>
          )}
          {galaxy.bonuses.building_efficiency && (
            <li>Prédios x{galaxy.bonuses.building_efficiency}</li>
          )}
          {galaxy.bonuses.upgrade_discount && (
            <li>Upgrades -{(galaxy.bonuses.upgrade_discount * 100).toFixed(0)}%</li>
          )}
          {galaxy.bonuses.fragment_gain && (
            <li>Fragmentos x{galaxy.bonuses.fragment_gain}</li>
          )}
          {galaxy.bonuses.dark_matter_unlock && (
            <li>🌑 Matéria Escura desbloqueada</li>
          )}
          {galaxy.bonuses.cosmic_ascension && (
            <li>✨ Ascensão Cósmica</li>
          )}
        </ul>
      </div>

      <div className="galaxy-stats">
        <span className="stat">🪐 {galaxy.planets} Planetas</span>
        <span className="stat">⭐ {galaxy.systems.length} Sistemas</span>
      </div>

      {getButtonsContent()}
    </div>
  );
};

export default GalaxyCard;
