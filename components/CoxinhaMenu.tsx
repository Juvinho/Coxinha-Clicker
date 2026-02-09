import React, { useState, useEffect } from 'react';
import '../styles/CoxinhaMenu.css';

interface CoxinhaMenuProps {
  onStartGame: () => void;
  onContinueGame: () => void;
  hasSave?: boolean;
  stats?: {
    balance?: number;
    perSecond?: number;
    perClick?: number;
    bonus?: number;
  };
}

const CoxinhaMenu: React.FC<CoxinhaMenuProps> = ({ 
  onStartGame, 
  onContinueGame, 
  hasSave = false,
  stats = {
    balance: 697,
    perSecond: 0,
    perClick: 1,
    bonus: 0
  }
}) => {
  const [showSettings, setShowSettings] = useState(false);
  const [particles, setParticles] = useState<React.ReactNode[]>([]);
  const [galaxyUnlocked, setGalaxyUnlocked] = useState(false);
  const [galaxyData, setGalaxyData] = useState({
    current: 'Via Láctea',
    system: 'Sistema Solar',
    planet: 'Terra',
    progress: 0,
    galaxiesDiscovered: 0,
    planetsVisited: 0
  });

  // Create floating particles on mount
  useEffect(() => {
    const particleElements = Array.from({ length: 50 }, (_, i) => (
      <div
        key={i}
        className="particle"
        style={{
          left: Math.random() * 100 + '%',
          animationDelay: Math.random() * 20 + 's',
          animationDuration: (15 + Math.random() * 10) + 's'
        }}
      />
    ));
    setParticles(particleElements);
  }, []);

  // Check galaxy unlock status and load galaxy data
  useEffect(() => {
    const checkGalaxyUnlock = () => {
      try {
        const saveData = localStorage.getItem('coxinha_clicker_ultimate_2026');
        if (!saveData) {
          setGalaxyUnlocked(false);
          return;
        }

        const save = JSON.parse(saveData);
        
        // Requirements: 10 ascensions, 100 portals, 1 septillion coxinhas
        const prestigeLevel = save.prestigeLevel || 0;
        const portalCount = save.buildings?.find((b: any) => b.id === 'portal')?.count || 0;
        const totalCoxinhas = save.totalCoxinhas || 0;

        const isUnlocked = prestigeLevel >= 10 && portalCount >= 100 && totalCoxinhas >= 1e24;
        setGalaxyUnlocked(isUnlocked);

        // Load galaxy data if exists
        if (save.galaxy) {
          setGalaxyData(prev => ({
            ...prev,
            ...save.galaxy
          }));
        }
      } catch (e) {
        console.error('Error checking galaxy unlock:', e);
        setGalaxyUnlocked(false);
      }
    };

    checkGalaxyUnlock();
  }, []);

  const handleNavigate = (path: string) => {
    console.log(`Navegando para: ${path}`);
    // Será expandido quando houver múltiplas páginas
    alert(`🚧 ${path} em desenvolvimento!`);
  };

  const handleContinue = () => {
    if (hasSave) {
      onContinueGame();
    } else {
      alert('❌ Nenhum save encontrado!\n\nComece um novo jogo primeiro.');
    }
  };

  const handleLeaderboard = () => {
    alert('🏆 LEADERBOARD\n\nEste modo será lançado em breve!');
  };

  const handleAchievements = () => {
    alert('⭐ CONQUISTAS\n\nGanhe conquistas ao atingir marcos específicos!');
  };

  const handleMultiplayer = () => {
    alert('👥 MULTIPLAYER EM DESENVOLVIMENTO\n\nDisponível na versão 1.0!');
  };

  const handleCredits = () => {
    handleNavigate('Créditos');
  };

  const handleGalaxyExplorer = () => {
    if (galaxyUnlocked) {
      console.log('Abrir Exploração Galáctica');
      alert('🌌 EXPLORAÇÃO GALÁCTICA\n\nCarregando sistema de exploração galáctica...\n\n✨ Acesse 100+ galáxias\n💫 Descubra novos recursos cósmicos\n🛸 Recrute aliados alienígenas');
    } else {
      alert(
        '🌌 EXPLORAÇÃO GALÁCTICA\n\n' +
        '🔒 Desbloqueie explorando o espaço!\n\n' +
        'Requisitos:\n' +
        '• Ascender 10 vezes (0/10)\n' +
        '• Construir 100 Portais Dimensionais (0/100)\n' +
        '• Produzir 1 Septilhão de coxinhas (0/1e24)\n\n' +
        '✨ Recompensas:\n' +
        '• Acesso a 100+ galáxias\n' +
        '• Novos recursos cósmicos\n' +
        '• Upgrades interdimensionais\n' +
        '• Aliados alienígenas'
      );
    }
  };

  return (
    <div className="coxinha-menu">
      {/* Animated Particles Background */}
      <div className="particles">
        {particles}
      </div>

      {/* Settings Button */}
      <button 
        className="settings-btn" 
        onClick={() => setShowSettings(!showSettings)}
        title="Configurações"
      >
        ⚙️
      </button>

      <div className="menu-container">
        {/* Left Sidebar - Stats */}
        <aside className="left-sidebar">
          <div className="stats-box">
            <div className="stats-title">Saldo Atual</div>
            <div className="balance">{stats.balance?.toLocaleString('pt-BR')}</div>
            <div className="balance-label">Coxinhas</div>

            <div className="velocity">
              <div className="stats-title">Velocidade</div>
              <div className="velocity-value">
                {stats.perSecond || 0} Cx/s
              </div>
            </div>

            <div className="stats-row">
              <div className="stat-item">
                <div className="stat-value">{stats.perClick || 1}</div>
                <div className="stat-label">Por clique</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{stats.bonus || 0}%</div>
                <div className="stat-label">Bônus</div>
              </div>
            </div>
          </div>

          {/* Additional Stats */}
          <div className="stats-box" style={{ marginTop: '20px' }}>
            <div className="stats-title">Progresso</div>
            <div className="progress-item">
              <span>Computadores</span>
              <span className="progress-value">0</span>
            </div>
            <div className="progress-item">
              <span>Granjas</span>
              <span className="progress-value">0</span>
            </div>
            <div className="progress-item">
              <span>Fábricas</span>
              <span className="progress-value">0</span>
            </div>
          </div>

          {/* Galaxy Stats */}
          <div className="galaxy-stats">
            <div className="galaxy-title">
              <span className="galaxy-icon">🌌</span>
              Exploração Galáctica
            </div>
            
            <div className="current-galaxy">
              <div className="galaxy-name">{galaxyData.current}</div>
              <div className="galaxy-location">
                📍 {galaxyData.system} • {galaxyData.planet}
              </div>
            </div>

            <div className="galaxy-progress">
              <div className="galaxy-progress-label">
                <span>Progresso de Exploração</span>
                <span>{galaxyData.progress}%</span>
              </div>
              <div className="galaxy-progress-bar">
                <div 
                  className="galaxy-progress-fill" 
                  style={{ width: `${galaxyData.progress}%` }}
                />
              </div>
            </div>

            <div className="galaxy-quick-stats">
              <div className="galaxy-quick-stat">
                <div className="galaxy-quick-stat-value">{galaxyData.galaxiesDiscovered}</div>
                <div className="galaxy-quick-stat-label">Galáxias</div>
              </div>
              <div className="galaxy-quick-stat">
                <div className="galaxy-quick-stat-value">{galaxyData.planetsVisited}</div>
                <div className="galaxy-quick-stat-label">Planetas</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Center Area - Menu */}
        <main className="center-area">
          <div className="logo">
            <h1>🍗 COXINHA</h1>
            <div className="subtitle">CLICKER</div>
          </div>

          <div className="menu-buttons">
            <button className="menu-btn primary" onClick={onStartGame}>
              ▶ JOGAR
            </button>

            <button 
              className={`menu-btn ${!hasSave ? 'disabled' : ''}`} 
              onClick={handleContinue}
              disabled={!hasSave}
            >
              💾 CONTINUAR
            </button>

            <button 
              className="menu-btn galaxy" 
              onClick={handleGalaxyExplorer}
              title="Pressione G para abrir"
            >
              🌌 EXPLORAÇÃO GALÁCTICA
              <span className={`btn-badge ${galaxyUnlocked ? 'unlocked' : 'new'}`}>
                {galaxyUnlocked ? '✓ DESBLOQUEADO' : 'NOVO'}
              </span>
            </button>

            <button className="menu-btn" onClick={handleLeaderboard}>
              🏆 CLASSIFICAÇÃO
            </button>

            <button className="menu-btn" onClick={handleAchievements}>
              ⭐ CONQUISTAS
            </button>

            <button className="menu-btn disabled" onClick={handleMultiplayer}>
              👥 MULTIPLAYER
              <span style={{ fontSize: '14px', marginLeft: '10px' }}>(Em Breve)</span>
            </button>

            <button className="menu-btn" onClick={() => setShowSettings(true)}>
              ⚙️ CONFIGURAÇÕES
            </button>

            <button className="menu-btn" onClick={handleCredits}>
              📜 CRÉDITOS
            </button>
          </div>

          {/* Version Info */}
          <div className="version-info">
            <div>Coxinha Clicker v1.0.0 <span className="beta-badge">COMPLETO</span></div>
            <div style={{ marginTop: '5px', fontSize: '10px' }}>
              2,250+ Funcionalidades • 17 Sistemas • Infinito 🎮
            </div>
          </div>
        </main>

        {/* Right Sidebar - Research Preview */}
        <aside className="right-sidebar">
          <div className="research-panel">
            <div className="research-header">
              <span className="research-icon">🔬</span>
              <div>
                <div className="research-title">Pesquisa</div>
              </div>
            </div>

            <ResearchItem
              icon="🔥"
              name="Dedos Reforçados"
              desc="O cursor produz 2x mais coxinhas"
              price="100"
            />

            <ResearchItem
              icon="👵"
              name="Livro de Receitas"
              desc="Vovós produzem 2x mais coxinhas"
              price="1.000"
            />

            <ResearchItem
              icon="⚡"
              name="Dedo Elétrico"
              desc="Ainda trabalhando nessa tecnologia"
              price="???"
              locked={true}
            />

            <ResearchItem
              icon="🍴"
              name="Massa Perfeita"
              desc="Necessário: 100 Vovós"
              price="???"
              locked={true}
            />

            <ResearchItem
              icon="🚀"
              name="Foguete Coxinha"
              desc="Lança coxinhas para o espaço"
              price="???"
              locked={true}
            />
          </div>
        </aside>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <SettingsModal onClose={() => setShowSettings(false)} />
      )}
    </div>
  );
};

// Research Item Component
interface ResearchItemProps {
  icon: string;
  name: string;
  desc: string;
  price: string;
  locked?: boolean;
}

const ResearchItem: React.FC<ResearchItemProps> = ({ 
  icon, 
  name, 
  desc, 
  price, 
  locked = false 
}) => (
  <div className={`research-item ${locked ? 'locked' : ''}`}>
    <div className="research-item-icon">{icon}</div>
    <div className="research-item-info">
      <div className="research-item-name">{name}</div>
      <div className="research-item-desc">{desc}</div>
    </div>
    <div className="research-item-price">
      <div className="research-price-value">{price}</div>
      <div className="research-price-label">
        {locked ? 'Bloqueado' : 'Coxinhas'}
      </div>
    </div>
  </div>
);

// Settings Modal Component
interface SettingsModalProps {
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  const [volume, setVolume] = useState(70);
  const [sfx, setSfx] = useState(true);
  const [music, setMusic] = useState(true);

  return (
    <div className="settings-modal-overlay" onClick={onClose}>
      <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
        <div className="settings-header">
          <h2>⚙️ CONFIGURAÇÕES</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="settings-content">
          <div className="setting-group">
            <label>🔊 Volume</label>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={volume}
              onChange={(e) => setVolume(parseInt(e.target.value))}
              className="volume-slider"
            />
            <span className="volume-value">{volume}%</span>
          </div>

          <div className="setting-group">
            <label>
              <input 
                type="checkbox" 
                checked={music}
                onChange={() => setMusic(!music)}
              />
              🎵 Música de Fundo
            </label>
          </div>

          <div className="setting-group">
            <label>
              <input 
                type="checkbox" 
                checked={sfx}
                onChange={() => setSfx(!sfx)}
              />
              🔔 Efeitos Sonoros
            </label>
          </div>

          <div className="setting-group">
            <label>🌙 Modo Escuro</label>
            <input type="checkbox" defaultChecked className="toggle-checkbox" />
          </div>

          <div className="setting-group">
            <label>🎨 Qualidade Gráfica</label>
            <select className="settings-select">
              <option>Alta (60 FPS)</option>
              <option>Médio (30 FPS)</option>
              <option>Baixa (15 FPS)</option>
            </select>
          </div>
        </div>

        <div className="settings-footer">
          <button className="settings-btn-secondary" onClick={onClose}>✓ FECHAR</button>
        </div>
      </div>
    </div>
  );
};

export default CoxinhaMenu;
