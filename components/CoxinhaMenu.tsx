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
