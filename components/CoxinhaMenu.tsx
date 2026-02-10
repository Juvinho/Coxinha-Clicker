import React, { useState, useEffect } from 'react';
import '../styles/CoxinhaMenuModern.css';
import GalaxyModal from './GalaxyModal';
import { Settings, Play } from 'lucide-react';

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
  const [showGalaxyModal, setShowGalaxyModal] = useState(false);
  const [saveData, setSaveData] = useState<any>(null);
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
        setSaveData(save);
        
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
      setShowGalaxyModal(true);
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
        <Settings size={24} />
      </button>

      <div className="menu-container">
        {/* Center Area - Main Menu */}
        <main className="center-area">
          <div className="logo">
            <h1>🍗 COXINHA</h1>
            <div className="subtitle">CLICKER</div>
          </div>

          <div className="menu-buttons">
            {hasSave && (
              <button 
                className="menu-btn secondary" 
                onClick={handleContinue}
                title="Continuar seu jogo anterior"
              >
                ▶ CONTINUAR JOGO
              </button>
            )}

            <button 
              className="menu-btn primary" 
              onClick={onStartGame}
              title="Iniciar novo jogo"
            >
              <Play size={20} style={{ marginRight: '8px' }} />
              JOGAR
            </button>
          </div>

          {/* Galaxy Explorer Card */}
          <div className="galaxy-feature-card" onClick={handleGalaxyExplorer}>
            <div className="galaxy-card-header">
              <div className="galaxy-card-icon">⚡</div>
              <div className="galaxy-card-title">
                <div className="galaxy-card-main">EXPLORAÇÃO</div>
                <div className="galaxy-card-main">GALÁCTICA</div>
              </div>
              <div className="galaxy-card-badge">NOVO</div>
            </div>
            <div className="galaxy-card-content">
              <div className="galaxy-item">
                <span className="galaxy-item-name">Via Láctea</span>
                <span className="galaxy-item-progress">Exploração 0%</span>
              </div>
              <div className="galaxy-item-list">
                <div className="galaxy-item-sub">🌍 Sistema Solar</div>
                <div className="galaxy-item-sub">🌎 Terra</div>
              </div>
            </div>
          </div>

          <div className="menu-buttons secondary-actions">
            <button 
              className="menu-btn secondary" 
              onClick={handleLeaderboard}
              title="Ver ranking de jogadores"
            >
              🏆 RANKING
            </button>

            <button 
              className="menu-btn secondary" 
              onClick={handleAchievements}
              title="Ver suas conquistas"
            >
              ⭐ CONQUISTAS
            </button>

            <button 
              className="menu-btn secondary" 
              onClick={handleCredits}
              title="Créditos"
            >
              📜 CRÉDITOS
            </button>
          </div>
        </main>

        {/* Right Sidebar - Research/Features Preview */}
        <aside className="right-sidebar">
          {/* Core Systems */}
          <div className="research-section">
            <div className="research-title">
              <span className="research-icon">⚙️</span>
              Sistemas Principais
            </div>

            <div className="research-item">
              <div className="research-icon-box">🔄</div>
              <div className="research-info">
                <div className="research-name">Sistema de Rebirth</div>
                <div className="research-status unlocked">✓ Desbloqueado</div>
              </div>
            </div>

            <div className="research-item">
              <div className="research-icon-box">🎯</div>
              <div className="research-info">
                <div className="research-name">Missões Diárias</div>
                <div className="research-status unlocked">✓ Ativo</div>
              </div>
            </div>

            <div className="research-item">
              <div className="research-icon-box">🎭</div>
              <div className="research-info">
                <div className="research-name">Combos Dinâmicos</div>
                <div className="research-status unlocked">✓ Ativo</div>
              </div>
            </div>
          </div>

          {/* Features Available */}
          <div className="research-section">
            <div className="research-title">
              <span className="research-icon">✨</span>
              Recursos
            </div>

            <div className="research-item">
              <div className="research-icon-box">💾</div>
              <div className="research-info">
                <div className="research-name">Save/Load Automático</div>
                <div className="research-status unlocked">✓ Ativo</div>
              </div>
            </div>

            <div className="research-item">
              <div className="research-icon-box">🎵</div>
              <div className="research-info">
                <div className="research-name">Música Dinâmica</div>
                <div className="research-status unlocked">✓ Ativo</div>
              </div>
            </div>

            <div className="research-item">
              <div className="research-icon-box">📱</div>
              <div className="research-info">
                <div className="research-name">Cross Platform</div>
                <div className="research-status unlocked">✓ Ativo</div>
              </div>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="research-section">
            <div className="research-title">
              <span className="research-icon">📊</span>
              Estatística da Versão
            </div>

            <div style={{ padding: '8px', color: '#a0aec0', fontSize: '12px' }}>
              <div style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#c7d2fe' }}>v1.0.0</strong> - COMPLETO
              </div>
              <div style={{ fontSize: '11px', lineHeight: '1.6' }}>
                ✓ 2,450+ Funcionalidades<br/>
                ✓ 17 Sistemas Principais<br/>
                ✓ 200+ Minigames<br/>
                ✓ Infinito Replayability
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Bottom Stats Bar - Experience/Level */}
      <div className="bottom-stats-bar">
        {/* Main Stats Box */}
        <div className="stats-box bottom-stats">
          <div className="stats-title">Saldo Atual</div>
          <div className="balance">{stats.balance?.toLocaleString('pt-BR') || '0'}</div>
          <div className="balance-label">Coxinhas</div>

          <div className="velocity">
            <div className="stats-title" style={{ marginBottom: '8px' }}>Velocidade</div>
            <div className="velocity-value">
              {stats.perSecond?.toLocaleString('pt-BR') || '0'} Cx/s
            </div>
          </div>

          <div className="stats-row">
            <div className="stat-item">
              <div className="stat-value">{stats.perClick?.toLocaleString('pt-BR') || '1'}</div>
              <div className="stat-label">Por Clique</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{stats.bonus || '0'}%</div>
              <div className="stat-label">Bônus</div>
            </div>
          </div>
        </div>

        {/* Galaxy Stats Section */}
        {galaxyData && (
          <div className="galaxy-stats bottom-galaxy-stats">
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

            <div className="galaxy-progress" style={{ marginBottom: '8px' }}>
              <div className="galaxy-progress-label" style={{ fontSize: '11px', marginBottom: '6px' }}>
                <span>Exploração</span>
                <span>{galaxyData.progress || 0}%</span>
              </div>
              <div className="galaxy-progress-bar">
                <div 
                  className="galaxy-progress-fill" 
                  style={{ width: `${galaxyData.progress || 0}%` }}
                />
              </div>
            </div>

            <div className="galaxy-quick-stats">
              <div className="galaxy-quick-stat">
                <div className="galaxy-quick-stat-value">{galaxyData.galaxiesDiscovered || 0}</div>
                <div className="galaxy-quick-stat-label">Galáxias</div>
              </div>
              <div className="galaxy-quick-stat">
                <div className="galaxy-quick-stat-value">{galaxyData.planetsVisited || 0}</div>
                <div className="galaxy-quick-stat-label">Planetas</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Galaxy Modal */}
      <GalaxyModal 
        isOpen={showGalaxyModal} 
        onClose={() => setShowGalaxyModal(false)}
        save={saveData}
      />

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
  desc?: string;
  price?: string;
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
    <div className="research-icon-box">{icon}</div>
    <div className="research-info">
      <div className="research-name">{name}</div>
      {desc && <div className="research-status">{desc}</div>}
    </div>
  </div>
);

// Settings Modal Component
interface SettingsModalProps {
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  return (
    <div className="settings-modal-overlay" onClick={onClose} style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(4px)'
    }}>
      <div className="settings-modal" onClick={(e) => e.stopPropagation()} style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(139,92,246,0.05) 100%)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,200,100,0.2)',
        borderRadius: '16px',
        padding: '24px',
        maxWidth: '400px',
        width: '90%',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <h2 style={{ margin: 0, color: '#ffaa00', fontSize: '20px', fontWeight: '700' }}>
            ⚙️ CONFIGURAÇÕES
          </h2>
          <button onClick={onClose} style={{
            background: 'none',
            border: 'none',
            color: '#fbbf24',
            fontSize: '24px',
            cursor: 'pointer'
          }}>✕</button>
        </div>

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <p style={{ color: '#a0aec0', fontSize: '14px' }}>
            As configurações avançadas estarão disponíveis em breve! 🎮
          </p>
          <button onClick={onClose} style={{
            marginTop: '16px',
            padding: '10px 24px',
            background: 'linear-gradient(135deg, rgba(249,115,22,0.2), rgba(249,115,22,0.1))',
            border: '2px solid rgba(249,115,22,0.4)',
            borderRadius: '8px',
            color: '#ffaa00',
            cursor: 'pointer',
            fontWeight: '700',
            transition: 'all 0.3s ease'
          }} onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(249,115,22,0.3), rgba(249,115,22,0.2))';
          }} onMouseLeave={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(249,115,22,0.2), rgba(249,115,22,0.1))';
          }}>
            ✓ FECHAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoxinhaMenu;
