import React, { useMemo } from 'react';
import GalaxyCard from './GalaxyCard';
import { RebirthSystem, Galaxy } from '../systems/RebirthSystem';
import '../styles/RebirthSystem.css';

interface GalaxyExplorerProps {
  rebirthSystem: RebirthSystem;
  hotOilFragments: number;
  currentGalaxy: string;
  stats: any;
  onBuyGalaxy: (galaxyId: string) => void;
  onExploreGalaxy: (galaxyId: string) => void;
  onTravelGalaxy: (galaxyId: string) => void;
  onRequirementsShow: (galaxy: Galaxy) => void;
}

const GalaxyExplorer: React.FC<GalaxyExplorerProps> = ({
  rebirthSystem,
  hotOilFragments,
  currentGalaxy,
  stats,
  onBuyGalaxy,
  onExploreGalaxy,
  onTravelGalaxy,
  onRequirementsShow
}) => {
  const galaxyList = useMemo(() => {
    return Object.values(rebirthSystem.galaxies);
  }, [rebirthSystem]);

  const currentGalaxyData = rebirthSystem.galaxies[currentGalaxy];

  return (
    <div className="galaxy-explorer">
      <div className="galaxy-nav">
        <h2>🌌 EXPLORAÇÃO GALÁCTICA</h2>
        <div className="current-galaxy-info">
          <span className="label">Galáxia Atual:</span>
          <span className="value">
            {currentGalaxyData?.icon} {currentGalaxyData?.name}
          </span>
        </div>
      </div>

      <div className="galaxy-grid">
        {galaxyList.map((galaxy) => {
          const isLocked = !rebirthSystem.checkGalaxyRequirements(galaxy, stats);
          const canAfford = hotOilFragments >= galaxy.cost;
          const isCurrentGalaxy = currentGalaxy === galaxy.id;

          return (
            <GalaxyCard
              key={galaxy.id}
              galaxy={galaxy}
              canAfford={canAfford}
              isLocked={isLocked}
              onBuyClick={() => {
                if (isLocked) {
                  onRequirementsShow(galaxy);
                } else {
                  onBuyGalaxy(galaxy.id);
                }
              }}
              onExploreClick={() => onExploreGalaxy(galaxy.id)}
              onTravelClick={() => onTravelGalaxy(galaxy.id)}
              isCurrentGalaxy={isCurrentGalaxy}
            />
          );
        })}
      </div>

      <div className="galaxy-legend">
        <div className="legend-item">
          <span className="legend-badge">Comum</span>
          <span>Galáxia padrão</span>
        </div>
        <div className="legend-item special">
          <span className="legend-badge special">Especial</span>
          <span>Bônus únicos</span>
        </div>
        <div className="legend-item legendary">
          <span className="legend-badge legendary">Lendária</span>
          <span>Multiplicadores extremos</span>
        </div>
        <div className="legend-item endgame">
          <span className="legend-badge endgame">Endgame</span>
          <span>Meta final</span>
        </div>
      </div>
    </div>
  );
};

export default GalaxyExplorer;
