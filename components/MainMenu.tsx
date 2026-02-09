import React, { useEffect, useState } from 'react';
import { Play, Settings, Volume2, VolumeX, Zap, Star, Users } from 'lucide-react';
import '../styles/MainMenu.css';

interface MainMenuProps {
  onStart: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  musicPlaying: boolean;
  onToggleMusic: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({
  onStart,
  soundEnabled,
  onToggleSound,
  musicPlaying,
  onToggleMusic
}) => {
  const [selectedSystem, setSelectedSystem] = useState<string | null>(null);
  const [showSystems, setShowSystems] = useState(false);

  const systems = [
    { id: 'space', name: '🚀 Space System', desc: '70 Features', icon: '🌍' },
    { id: 'ocean', name: '🌊 Ocean Exploration', desc: '60 Features', icon: '🐚' },
    { id: 'battle_royale', name: '🏆 Battle Royale', desc: '55 Features', icon: '⚔️' },
    { id: 'arcade', name: '🎮 Arcade Games', desc: '60 Features', icon: '👾' },
    { id: 'casino', name: '🎰 Casino', desc: '35 Features', icon: '🎲' },
    { id: 'racing', name: '🏎️ Racing System', desc: '75 Features', icon: '🏁' },
    { id: 'band', name: '🎸 Band Manager', desc: '80 Features', icon: '🎵' },
    { id: 'zombie', name: '🧟 Zombie Survival', desc: '40 Features', icon: '💀' },
    { id: 'dungeon', name: '🏹 Dungeon Crawler', desc: '50 Features', icon: '⚡' },
    { id: 'rpg', name: '🎰 Full RPG', desc: '60 Features', icon: '🗡️' },
    { id: 'clicker', name: '🥐 Coxinha Clicker', desc: 'The Main Game', icon: '✨' }
  ];

  return (
    <div className="main-menu-container">
      {/* Background Animation */}
      <div className="menu-background">
        <div className="stars"></div>
        <div className="floating-coxinhas">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="floating-coxinha" style={{ animationDelay: `${i * 0.5}s` }}>
              🥐
            </div>
          ))}
        </div>
      </div>

      {/* Main Menu Content */}
      <div className="menu-content">
        {!showSystems ? (
          <>
            {/* Logo Section */}
            <div className="menu-header">
              <div className="logo-container">
                <div className="logo-spin">🥐</div>
                <h1 className="game-title">COXINHA CLICKER</h1>
                <p className="subtitle">2250+ FEATURES • 17 SYSTEMS • ULTIMATE EDITION</p>
              </div>
            </div>

            {/* Stats Display */}
            <div className="menu-stats">
              <div className="stat-box">
                <Zap size={24} />
                <span>2250+ Features</span>
              </div>
              <div className="stat-box">
                <Star size={24} />
                <span>17 Systems</span>
              </div>
              <div className="stat-box">
                <Users size={24} />
                <span>Infinite Gameplay</span>
              </div>
            </div>

            {/* Main Buttons */}
            <div className="menu-buttons">
              <button
                className="btn-primary btn-start"
                onClick={() => setShowSystems(true)}
              >
                <Play size={24} />
                SELECT YOUR ADVENTURE
              </button>

              <button
                className="btn-secondary"
                onClick={onToggleMusic}
              >
                {musicPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
                {musicPlaying ? 'Music On' : 'Music Off'}
              </button>

              <button
                className="btn-secondary"
                onClick={onToggleSound}
              >
                {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
                {soundEnabled ? 'Sounds On' : 'Sounds Off'}
              </button>
            </div>

            {/* Footer Info */}
            <div className="menu-footer">
              <p>💾 Save/Load Enabled • 🔊 Full Audio • 🎨 Beautiful UI</p>
              <p>Created with ❤️ • Version 2026 Ultimate</p>
            </div>
          </>
        ) : (
          <>
            {/* Systems Selection */}
            <div className="systems-grid-header">
              <h2>Choose Your System</h2>
              <button
                className="btn-back"
                onClick={() => setShowSystems(false)}
              >
                ← Back
              </button>
            </div>

            <div className="systems-grid">
              {systems.map((system) => (
                <div
                  key={system.id}
                  className={`system-card ${selectedSystem === system.id ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedSystem(system.id);
                    if (system.id === 'clicker') {
                      onStart();
                    }
                  }}
                >
                  <div className="system-icon">{system.icon}</div>
                  <h3>{system.name}</h3>
                  <p>{system.desc}</p>
                  {system.id === 'clicker' && (
                    <button
                      className="btn-play"
                      onClick={(e) => {
                        e.stopPropagation();
                        onStart();
                      }}
                    >
                      PLAY NOW
                    </button>
                  )}
                </div>
              ))}
            </div>

            <p className="systems-note">
              ⚠️ Other systems coming soon! Start with Coxinha Clicker to unlock them.
            </p>
          </>
        )}
      </div>

      {/* Floating Particles */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`
            }}
          >
            ✨
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainMenu;
