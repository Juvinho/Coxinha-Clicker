import React, { useState, useEffect } from 'react';
import '../styles/CoxinhaMenuClean.css';
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
      {/* Progress Bar - Top Animated */}
      <div className="progress-bar" style={{
        width: `${Math.min((stats.perSecond || 0) / 1000 * 100, 100)}%`
      }}></div>

      {/* Animated Particles Background */}
      <div className="particles">
        {particles}
      </div>

      {/* Sidebar Toggle Button */}
      <button 
        className="sidebar-toggle-btn" 
        onClick={() => setSidebarOpen(!sidebarOpen)}
        title="Pesquisa e Sistemas"
      >
        📊
      </button>

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
        <aside className={`right-sidebar ${sidebarOpen ? 'open' : ''}`}>
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
  const [volume, setVolume] = React.useState(70);
  const [musicEnabled, setMusicEnabled] = React.useState(true);
  const [sfxEnabled, setSfxEnabled] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(true);

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
        background: 'linear-gradient(135deg, rgba(230,126,34,0.15) 0%, rgba(155,89,182,0.1) 100%)',
        backdropFilter: 'blur(15px)',
        border: '2px solid rgba(243,156,18,0.3)',
        borderRadius: '16px',
        padding: '32px',
        maxWidth: '450px',
        width: '90%',
        boxShadow: '0 12px 48px rgba(0,0,0,0.5)',
        maxHeight: '85vh',
        overflowY: 'auto'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px'
        }}>
          <h2 style={{ margin: 0, color: '#F39C12', fontSize: '22px', fontWeight: '700', letterSpacing: '1px' }}>
            ⚙️ CONFIGURAÇÕES
          </h2>
          <button onClick={onClose} style={{
            background: 'none',
            border: 'none',
            color: '#F39C12',
            fontSize: '28px',
            cursor: 'pointer',
            transition: 'transform 0.2s ease',
            padding: '4px'
          }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2) rotate(90deg)'}
             onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}>✕</button>
        </div>

        {/* Settings Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* AUDIO Section */}
          <div style={{
            background: 'rgba(243, 156, 18, 0.08)',
            border: '1px solid rgba(243, 156, 18, 0.2)',
            borderRadius: '12px',
            padding: '16px',
          }}>
            <h3 style={{ margin: '0 0 16px 0', color: '#F39C12', fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>
              🔊 ÁUDIO
            </h3>

            {/* Volume Slider */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', alignItems: 'center' }}>
                <label style={{ color: '#E0D5FF', fontSize: '13px', fontWeight: '600' }}>Volume</label>
                <span style={{ color: '#F39C12', fontSize: '12px', fontWeight: '700' }}>{volume}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={volume}
                onChange={(e) => setVolume(parseInt(e.target.value))}
                style={{
                  width: '100%',
                  height: '6px',
                  borderRadius: '3px',
                  background: 'linear-gradient(90deg, #E67E22 0%, #F39C12 ' + volume + '%, rgba(255, 255, 255, 0.1) ' + volume + '%, rgba(255, 255, 255, 0.1) 100%)',
                  outline: 'none',
                  cursor: 'pointer',
                  appearance: 'none',
                  WebkitAppearance: 'none'
                }}
              />
            </div>

            {/* Music Toggle */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <label style={{ color: '#E0D5FF', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                🎵 Música de Fundo
              </label>
              <button
                onClick={() => setMusicEnabled(!musicEnabled)}
                style={{
                  background: musicEnabled ? 'linear-gradient(135deg, #10b981, #059669)' : 'rgba(99, 102, 241, 0.2)',
                  border: 'none',
                  width: '44px',
                  height: '24px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  boxShadow: musicEnabled ? '0 0 12px rgba(16, 185, 129, 0.4)' : 'none'
                }}
              >
                <div style={{
                  position: 'absolute',
                  width: '20px',
                  height: '20px',
                  background: 'white',
                  borderRadius: '50%',
                  top: '2px',
                  left: musicEnabled ? '22px' : '2px',
                  transition: 'left 0.3s ease',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }} />
              </button>
            </div>

            {/* SFX Toggle */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ color: '#E0D5FF', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                🔔 Efeitos Sonoros
              </label>
              <button
                onClick={() => setSfxEnabled(!sfxEnabled)}
                style={{
                  background: sfxEnabled ? 'linear-gradient(135deg, #10b981, #059669)' : 'rgba(99, 102, 241, 0.2)',
                  border: 'none',
                  width: '44px',
                  height: '24px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  boxShadow: sfxEnabled ? '0 0 12px rgba(16, 185, 129, 0.4)' : 'none'
                }}
              >
                <div style={{
                  position: 'absolute',
                  width: '20px',
                  height: '20px',
                  background: 'white',
                  borderRadius: '50%',
                  top: '2px',
                  left: sfxEnabled ? '22px' : '2px',
                  transition: 'left 0.3s ease',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }} />
              </button>
            </div>
          </div>

          {/* DISPLAY Section */}
          <div style={{
            background: 'rgba(155, 89, 182, 0.08)',
            border: '1px solid rgba(155, 89, 182, 0.2)',
            borderRadius: '12px',
            padding: '16px',
          }}>
            <h3 style={{ margin: '0 0 16px 0', color: '#B19CD9', fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>
              🎨 DISPLAY
            </h3>

            {/* Dark Mode Toggle */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ color: '#E0D5FF', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                🌙 Modo Escuro
              </label>
              <button
                onClick={() => setDarkMode(!darkMode)}
                style={{
                  background: darkMode ? 'linear-gradient(135deg, #10b981, #059669)' : 'rgba(99, 102, 241, 0.2)',
                  border: 'none',
                  width: '44px',
                  height: '24px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  boxShadow: darkMode ? '0 0 12px rgba(16, 185, 129, 0.4)' : 'none'
                }}
              >
                <div style={{
                  position: 'absolute',
                  width: '20px',
                  height: '20px',
                  background: 'white',
                  borderRadius: '50%',
                  top: '2px',
                  left: darkMode ? '22px' : '2px',
                  transition: 'left 0.3s ease',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }} />
              </button>
            </div>
          </div>

          {/* Game Info */}
          <div style={{
            background: 'rgba(6, 182, 212, 0.08)',
            border: '1px solid rgba(6, 182, 212, 0.2)',
            borderRadius: '12px',
            padding: '16px',
            textAlign: 'center'
          }}>
            <p style={{ margin: '0 0 8px 0', color: '#06b6d4', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase' }}>
              Coxinha Clicker
            </p>
            <p style={{ color: '#a0aec0', fontSize: '12px', margin: 0 }}>
              v1.0.0 - Próxima atualização em breve! 🚀
            </p>
          </div>
        </div>

        {/* Close Button */}
        <button onClick={onClose} style={{
          marginTop: '32px',
          width: '100%',
          padding: '12px 24px',
          background: 'linear-gradient(135deg, #E67E22 0%, #D35400 100%)',
          border: '2px solid #F39C12',
          borderRadius: '10px',
          color: 'white',
          cursor: 'pointer',
          fontWeight: '700',
          fontSize: '14px',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          transition: 'all 0.3s ease',
          boxShadow: '0 6px 20px rgba(230, 126, 34, 0.3)'
        }} 
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 8px 28px rgba(230, 126, 34, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(230, 126, 34, 0.3)';
        }}>
          ✓ FECHAR CONFIGURAÇÕES
        </button>
      </div>
    </div>
  );
};

export default CoxinhaMenu;
