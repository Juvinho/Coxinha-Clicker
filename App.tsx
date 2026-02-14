// ============================================================================
// COXINHA CLICKER AAA - MAIN APPLICATION
// Complete rewrite using GameEngine + Context architecture
// ============================================================================

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import type { FloatingText, Particle, GameTab } from './types';
import BigCoxinha from './components/BigCoxinha';
import GoldenCoxinha from './components/GoldenCoxinha';
import NewsTicker from './components/NewsTicker';
import CoxinhaMenu from './components/CoxinhaMenu';
import MusicPlayer from './components/MusicPlayer';
import {
  AchievementPanel,
  SkillTreePanel,
  PetPanel,
  CraftingPanel,
  QuestPanel,
  StatisticsPanel,
  ChallengePanel,
  RebirthPanelNew,
  NotificationToast,
  BuffBar,
  ResourcesBar,
} from './components/GamePanels';
import {
  WeatherDisplay,
  RelicPanel,
  ResearchPanel,
  SpellPanel,
  ExpeditionPanel,
  BossPanel,
  GardenPanel,
  TradingPanel,
  EnchantmentPanel,
  ArtifactPanel,
  MiniGamePanel,
  AscensionPanel,
} from './components/SystemPanels';
import {
  Save, RotateCcw, Volume2, VolumeX, TrendingUp, Trophy, Zap,
  MousePointer2, Sparkles, ChevronLeft, ChevronRight,
} from 'lucide-react';

// ── Tab Config ───────────────────────────────────────────────────────────────

const TABS: { id: GameTab; label: string; icon: string }[] = [
  { id: 'buildings', label: 'Edifícios', icon: '🏗️' },
  { id: 'upgrades', label: 'Upgrades', icon: '✨' },
  { id: 'achievements', label: 'Conquistas', icon: '🏆' },
  { id: 'skills', label: 'Skills', icon: '🌳' },
  { id: 'pets', label: 'Pets', icon: '🐾' },
  { id: 'crafting', label: 'Crafting', icon: '⚗️' },
  { id: 'challenges', label: 'Desafios', icon: '⚔️' },
  { id: 'statistics', label: 'Stats', icon: '📊' },
  { id: 'relics', label: 'Relíquias', icon: '🏺' },
  { id: 'research', label: 'Pesquisa', icon: '🔬' },
  { id: 'spells', label: 'Magias', icon: '🪄' },
  { id: 'expeditions', label: 'Expedições', icon: '🗺️' },
  { id: 'bosses', label: 'Bosses', icon: '👹' },
  { id: 'garden', label: 'Jardim', icon: '🌱' },
  { id: 'trading', label: 'Comércio', icon: '🤝' },
  { id: 'enchantments', label: 'Encantamentos', icon: '💎' },
  { id: 'artifacts', label: 'Artefatos', icon: '⚱️' },
  { id: 'minigames', label: 'Minigames', icon: '🎮' },
  { id: 'automation', label: 'Automação', icon: '🤖' },
];

// ── Floating Text / Particle System (UI-only) ───────────────────────────────

function useFloatingTexts() {
  const [texts, setTexts] = useState<FloatingText[]>([]);

  const addText = useCallback((x: number, y: number, text: string, color: string, isCrit = false) => {
    const id = Date.now() + Math.random();
    setTexts(prev => [...prev, { id, x, y, text, color, isCrit }]);
    setTimeout(() => setTexts(prev => prev.filter(t => t.id !== id)), 1200);
  }, []);

  return { texts, addText };
}

function useParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  const spawn = useCallback((x: number, y: number, color: string, count = 8) => {
    const colors = [color, '#ffaa00', '#d4a574'];
    const newP: Particle[] = [];
    for (let i = 0; i < count; i++) {
      newP.push({
        id: Date.now() + i + Math.random(),
        x, y,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 1) * 8 - 3,
        size: Math.random() * 5 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1,
        maxLife: 1,
      });
    }
    setParticles(prev => [...prev, ...newP]);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev =>
        prev.map(p => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy + 0.5,
          life: p.life - 0.04,
        })).filter(p => p.life > 0)
      );
    }, 16);
    return () => clearInterval(interval);
  }, []);

  return { particles, spawn };
}

// ── Building List Component ──────────────────────────────────────────────────

const BUY_AMOUNTS = [1, 10, 100, -1] as const; // -1 = max

const BuildingList: React.FC = () => {
  const { state, buyBuilding, buyBuildingBulk, getBuildingCost, getBulkBuildingCost, getMaxAffordableBuildings, formatNumber, cps } = useGame();
  const [buyAmount, setBuyAmount] = useState<number>(1);

  return (
    <div className="space-y-2">
      {/* Buy amount selector */}
      <div className="flex items-center justify-between bg-[#1a0f08] rounded-lg px-3 py-1.5 border border-[#3d2211]">
        <span className="text-[10px] text-gray-400">Comprar:</span>
        <div className="flex gap-1">
          {BUY_AMOUNTS.map(amt => (
            <button key={amt} onClick={() => setBuyAmount(amt)}
              className={`text-[9px] px-2 py-0.5 rounded font-bold transition-all ${
                buyAmount === amt ? 'bg-[#ffaa00] text-black' : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}>
              {amt === -1 ? 'MAX' : `x${amt}`}
            </button>
          ))}
        </div>
      </div>

      {state.buildings.map(b => {
        const cost1 = getBuildingCost(b);
        const effectiveAmount = buyAmount === -1 ? getMaxAffordableBuildings(b) : buyAmount;
        const totalCost = buyAmount === -1 ? getBulkBuildingCost(b, effectiveAmount) : getBulkBuildingCost(b, buyAmount);
        const canAfford = effectiveAmount > 0 && state.resources.coxinhas >= totalCost;
        // Only show buildings the player can nearly afford or already has
        if (b.count === 0 && cost1 > state.resources.coxinhas * 1000 && cps < b.baseCps * 0.1) return null;

        const handleBuy = () => {
          if (!canAfford) return;
          if (buyAmount === 1) {
            buyBuilding(b.id);
          } else {
            buyBuildingBulk(b.id, effectiveAmount);
          }
        };

        return (
          <div
            key={b.id}
            className={`relative flex flex-col p-3 rounded-lg border-l-2 transition-all duration-200 group select-none
              ${canAfford
                ? 'bg-[#1a0f08] border-[#ffaa00] hover:bg-[#25160b] hover:translate-x-1 cursor-pointer'
                : 'bg-[#0f0705] border-[#3d2211] opacity-60 cursor-not-allowed'}`}
            style={{ boxShadow: canAfford ? 'inset 0 1px 0 rgba(255,255,255,0.05), 0 4px 10px rgba(0,0,0,0.5)' : 'none' }}
            onClick={handleBuy}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-3">
                <div className="text-3xl filter drop-shadow-md">{b.icon}</div>
                <div>
                  <div className="font-bold text-sm text-[#e5e5e5]">{b.name}</div>
                  <div className="text-[10px] text-gray-400 font-mono">{b.count} possuídos</div>
                </div>
              </div>
              <div className="text-right">
                <div className={`font-bold text-sm ${canAfford ? 'text-[#ffaa00]' : 'text-red-900'}`}>
                  {formatNumber(totalCost)}
                </div>
                {effectiveAmount > 1 && (
                  <div className="text-[8px] text-gray-500">x{effectiveAmount}</div>
                )}
              </div>
            </div>
            <div className="flex justify-between items-center border-t border-white/5 pt-1 mt-1">
              <div className="text-[10px] text-gray-500">
                Cada: <span className="text-gray-300">+{formatNumber(b.baseCps)} Cx/s</span>
              </div>
              {canAfford && <div className="text-[9px] text-[#ffaa00] animate-pulse font-bold tracking-wider">
                {buyAmount === -1 ? `COMPRAR MAX (${effectiveAmount})` : buyAmount > 1 ? `COMPRAR ${buyAmount}` : 'COMPRAR'}
              </div>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ── Upgrade Grid Component ───────────────────────────────────────────────────

const UPGRADE_FILTERS = [
  { id: 'all', label: 'Todos', icon: '🔮' },
  { id: 'building', label: 'Edifícios', icon: '🏗️' },
  { id: 'click', label: 'Clique', icon: '🖱️' },
  { id: 'global', label: 'Global', icon: '🌍' },
  { id: 'golden', label: 'Dourado', icon: '⭐' },
  { id: 'synergy', label: 'Sinergia', icon: '🔗' },
  { id: 'prestige', label: 'Prestígio', icon: '🔥' },
] as const;

const UpgradeGrid: React.FC = () => {
  const { state, buyUpgrade, isUpgradeVisible, formatNumber } = useGame();
  const [filter, setFilter] = useState('all');
  const [showPurchased, setShowPurchased] = useState(false);

  const visibleUpgrades = useMemo(
    () => state.upgrades.filter(u => !u.purchased && isUpgradeVisible(u)),
    [state.upgrades, isUpgradeVisible]
  );

  const purchasedUpgrades = useMemo(
    () => state.upgrades.filter(u => u.purchased),
    [state.upgrades]
  );

  const filtered = useMemo(() => {
    if (filter === 'all') return visibleUpgrades;
    return visibleUpgrades.filter(u => u.type === filter);
  }, [visibleUpgrades, filter]);

  const purchasedFiltered = useMemo(() => {
    if (filter === 'all') return purchasedUpgrades;
    return purchasedUpgrades.filter(u => u.type === filter);
  }, [purchasedUpgrades, filter]);

  return (
    <div className="space-y-2">
      {/* Stats bar */}
      <div className="flex items-center justify-between bg-[#1a0f08] rounded-lg px-3 py-1.5 border border-[#3d2211]">
        <span className="text-[10px] text-gray-400">
          ✨ <span className="text-[#ffaa00] font-bold">{purchasedUpgrades.length}</span> comprados · <span className="text-green-400 font-bold">{visibleUpgrades.length}</span> disponíveis
        </span>
        <button onClick={() => setShowPurchased(!showPurchased)}
          className={`text-[9px] px-2 py-0.5 rounded ${showPurchased ? 'bg-[#ffaa00]/20 text-[#ffaa00]' : 'bg-white/5 text-gray-500 hover:text-gray-300'}`}>
          {showPurchased ? '📖 Esconder' : '📖 Ver comprados'}
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-1">
        {UPGRADE_FILTERS.map(f => {
          const count = f.id === 'all' ? (showPurchased ? purchasedUpgrades.length : visibleUpgrades.length) : (showPurchased ? purchasedUpgrades : visibleUpgrades).filter(u => u.type === f.id).length;
          if (count === 0 && f.id !== 'all') return null;
          return (
            <button key={f.id} onClick={() => setFilter(f.id)}
              className={`text-[9px] px-2 py-1 rounded-full transition-all ${filter === f.id ? 'bg-[#ffaa00] text-black font-bold' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>
              {f.icon} {f.label} <span className="opacity-60">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Purchased upgrades view */}
      {showPurchased ? (
        purchasedFiltered.length === 0 ? (
          <div className="text-center text-gray-500 text-sm py-4 italic">Nenhum upgrade comprado{filter !== 'all' ? ' nesta categoria' : ''}</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pb-4">
            {purchasedFiltered.map(u => (
              <div key={u.id} className="relative flex flex-col justify-between p-2 rounded border-b-2 h-[90px] bg-green-900/20 border-green-700/50">
                <div className="flex justify-between items-start mb-1">
                  <div className="bg-black/30 w-6 h-6 flex items-center justify-center rounded text-xs border border-green-500/20">
                    {u.icon || '✅'}
                  </div>
                  <div className="text-[9px] font-bold px-1 py-0.5 rounded bg-green-500/10 text-green-400">✓ Ativo</div>
                </div>
                <div>
                  <div className="font-bold text-green-200 text-[10px] leading-tight mb-0.5">{u.name}</div>
                  <div className="text-[8px] text-gray-500 leading-tight line-clamp-2">{u.description}</div>
                </div>
              </div>
            ))}
          </div>
        )
      ) : filtered.length === 0 ? (
        <div className="w-full flex flex-col items-center justify-center text-[#5c3a21] italic py-8">
          <span className="text-2xl mb-1 opacity-50">🔒</span>
          {filter === 'all' ? 'Nenhum upgrade disponível no momento' : 'Nenhum upgrade nesta categoria'}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pb-4">
          {filtered.map(u => {
            const canBuy = u.type === 'prestige'
              ? state.resources.hotOilFragments >= u.cost
              : state.resources.coxinhas >= u.cost;

            return (
              <div
                key={u.id}
                className={`relative flex flex-col justify-between p-2 rounded border-b-2 transition-all duration-150 group overflow-hidden h-[90px]
                  ${canBuy
                    ? 'bg-[#2a1810] border-[#ffaa00] hover:-translate-y-1 hover:bg-[#3d2211] cursor-pointer shadow-lg'
                    : 'bg-[#120a06] border-[#3d2211] opacity-60 cursor-not-allowed'}`}
                onClick={() => canBuy && buyUpgrade(u.id)}
              >
                <div className="flex justify-between items-start mb-1">
                  <div className="bg-black/30 w-6 h-6 flex items-center justify-center rounded text-xs border border-white/5">
                    {u.icon || '✨'}
                  </div>
                  <div className={`text-[9px] font-bold px-1 py-0.5 rounded ${canBuy ? 'bg-[#ffaa00]/10 text-[#ffaa00]' : 'text-red-700'}`}>
                    {u.type === 'prestige' ? '🔥' : ''}{formatNumber(u.cost)}
                  </div>
                </div>
                <div>
                  <div className="font-bold text-[#e5e5e5] text-[10px] leading-tight mb-0.5">{u.name}</div>
                  <div className="text-[8px] text-gray-500 leading-tight line-clamp-2">{u.description}</div>
                </div>
                {!canBuy && <div className="absolute top-1 left-1/2 -translate-x-1/2 text-[7px] text-red-500/70 font-bold">💰 CARO</div>}
                {canBuy && <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-200 pointer-events-none" />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ── Auto-Buyer Panel ─────────────────────────────────────────────────────────

const AutoBuyerPanel: React.FC = () => {
  const { state, toggleAutoBuyer, toggleAllAutoBuyers, formatNumber, getBuildingCost } = useGame();

  const anyEnabled = state.autoBuyers.some(ab => ab.enabled);
  const enabledCount = state.autoBuyers.filter(ab => ab.enabled).length;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-cyan-400">🤖 Automação</h2>
        <button onClick={() => toggleAllAutoBuyers(!anyEnabled)}
          className={`text-xs px-3 py-1 rounded font-bold ${anyEnabled ? 'bg-red-600 hover:bg-red-500' : 'bg-green-600 hover:bg-green-500'}`}>
          {anyEnabled ? '⏹ Desligar Todos' : '▶️ Ligar Todos'}
        </button>
      </div>
      <div className="text-sm text-gray-400 bg-gray-800/30 rounded-lg p-2">
        <p>Compra automática de edifícios a cada <span className="text-cyan-400 font-bold">10 segundos</span>.</p>
        <p className="text-xs mt-1 text-gray-500">{enabledCount} auto-buyers ativos</p>
      </div>
      <div className="grid grid-cols-1 gap-2">
        {state.buildings.map(b => {
          const ab = state.autoBuyers.find(a => a.buildingId === b.id);
          if (!ab) return null;
          const cost = getBuildingCost(b);
          return (
            <div key={b.id} className={`flex items-center gap-3 p-2 rounded-lg border transition-all ${ab.enabled ? 'bg-cyan-900/20 border-cyan-700' : 'bg-gray-800/50 border-gray-700'}`}>
              <span className="text-xl">{b.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-sm text-[#e5e5e5]">{b.name}</div>
                <div className="text-[10px] text-gray-400">
                  {b.count} uni · Custo: {formatNumber(cost)} · Auto: {ab.totalBought} comprados
                </div>
              </div>
              <button onClick={() => toggleAutoBuyer(b.id)}
                className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${ab.enabled ? 'bg-cyan-600 hover:bg-cyan-500 text-white' : 'bg-gray-600 hover:bg-gray-500 text-gray-300'}`}>
                {ab.enabled ? '✅ ON' : '❌ OFF'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ── Combo Display ────────────────────────────────────────────────────────────

const ComboDisplay: React.FC = () => {
  const { comboState } = useGame();

  if (comboState.count < 5) return null;

  return (
    <div className="absolute top-12 left-1/2 transform -translate-x-1/2 pointer-events-none z-40">
      <div
        className="text-4xl font-black drop-shadow-lg animate-bounce"
        style={{
          color: '#ffaa00',
          textShadow: '0 0 20px #ffaa00, 0 0 40px rgba(255,170,0,0.5)',
        }}
      >
        {comboState.count} COMBO! 🔥
      </div>
      {comboState.multiplier > 1 && (
        <div className="text-center text-sm font-bold mt-1" style={{ color: '#ffaa00' }}>
          x{comboState.multiplier.toFixed(1)}
        </div>
      )}
    </div>
  );
};

// ── Active Event Banner ──────────────────────────────────────────────────────

const EventBanner: React.FC = () => {
  const { activeEvent } = useGame();
  if (!activeEvent) return null;

  return (
    <div className="absolute top-16 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
      <div className="flex items-center gap-2 bg-black/70 px-4 py-2 rounded-full border animate-pulse"
        style={{ borderColor: activeEvent.color }}>
        <span className="text-lg">{activeEvent.icon}</span>
        <span className="text-sm font-bold" style={{ color: activeEvent.color }}>{activeEvent.name}</span>
      </div>
    </div>
  );
};

// ── XP Bar ───────────────────────────────────────────────────────────────────

const XpBar: React.FC = () => {
  const { state } = useGame();
  const pct = (state.player.xp / state.player.xpToNext) * 100;

  return (
    <div className="flex items-center gap-2 w-full">
      <span className="text-[10px] text-[#4CAF50] font-bold whitespace-nowrap">Nv.{state.player.level}</span>
      <div className="flex-1 h-1.5 bg-[#1a1a1a] rounded overflow-hidden">
        <div className="h-full bg-gradient-to-r from-[#4CAF50] to-[#8BC34A] transition-all duration-300" style={{ width: `${pct}%` }} />
      </div>
      <span className="text-[8px] text-gray-500 whitespace-nowrap">{Math.floor(state.player.xp)}/{state.player.xpToNext}</span>
    </div>
  );
};

// ── Main Game Interface ──────────────────────────────────────────────────────

const GameApp: React.FC = () => {
  const {
    state, engine, cps, clickPower, globalMultiplier, goldenSpawnRate,
    click, clickGolden, performRebirth, calculateRebirthFragments,
    resetAll, updateSettings, formatNumber, formatTime, buyGalaxy, exploreGalaxy, travelToGalaxy,
  } = useGame();

  const [gameStarted, setGameStarted] = useState(false);
  const [activeTab, setActiveTab] = useState<GameTab>('buildings');
  const [leftPanelOpen, setLeftPanelOpen] = useState(true);

  const { texts, addText } = useFloatingTexts();
  const { particles, spawn } = useParticles();

  // Check frenzy from active buffs
  const hasFrenzy = state.activeBuffs.some(b => b.id === 'golden_frenzy');

  // ── Click Handler ────────────────────────────────────────────────────────

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (navigator.vibrate) navigator.vibrate(10);

    const result = click(e.clientX, e.clientY);
    const rX = (Math.random() - 0.5) * 60;
    const rY = (Math.random() - 0.5) * 60;

    addText(
      e.clientX + rX,
      e.clientY - 60 + rY,
      `+${formatNumber(result.damage)}`,
      result.isCrit ? '#ffaa00' : '#fff',
      result.isCrit
    );

    spawn(e.clientX, e.clientY, '#ffaa00', result.isCrit ? 12 : 6);
  }, [click, addText, spawn, formatNumber]);

  // ── Golden Click Handler ─────────────────────────────────────────────────

  const handleGolden = useCallback(() => {
    if (navigator.vibrate) navigator.vibrate([50, 50, 50]);
    const result = clickGolden();

    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 3;

    switch (result.type) {
      case 'frenzy':
        addText(cx, cy, `FRENESI! x${result.value} 🔥`, '#ffaa00', true);
        break;
      case 'lucky':
        addText(cx, cy, `SORTE! +${formatNumber(result.value)} 🥟`, '#39ff14', true);
        break;
      case 'stardust':
        addText(cx, cy, `+${result.value} POEIRA ESTELAR ✨`, '#9C27B0', true);
        break;
      case 'essence':
        addText(cx, cy, `+${result.value} ESSÊNCIA DOURADA ⭐`, '#FFD700', true);
        break;
    }

    spawn(cx, window.innerHeight / 2, '#FFD700', 25);
  }, [clickGolden, addText, spawn, formatNumber]);

  // ── Save Handler ─────────────────────────────────────────────────────────

  const handleSave = useCallback(() => {
    engine.save();
    addText(window.innerWidth / 2, window.innerHeight / 2, '💾 Salvo!', '#4CAF50', false);
  }, [engine, addText]);

  // ── Reset Handler ────────────────────────────────────────────────────────

  const handleReset = useCallback(() => {
    if (confirm('Reiniciar o universo gastronômico? Todo progresso será perdido!')) {
      resetAll();
    }
  }, [resetAll]);

  // ── Pre-Game Menu ────────────────────────────────────────────────────────

  if (!gameStarted) {
    return (
      <>
        <CoxinhaMenu
          onStartGame={() => setGameStarted(true)}
          onContinueGame={() => setGameStarted(true)}
          hasSave={!!localStorage.getItem('coxinha_clicker_aaa_v2') || !!localStorage.getItem('coxinha_clicker_ultimate_2026')}
          stats={{
            balance: Math.floor(state.resources.coxinhas),
            perSecond: Math.floor(cps),
            perClick: Math.floor(clickPower),
            bonus: globalMultiplier > 1 ? Math.floor((globalMultiplier - 1) * 100) : 0,
          }}
        />
        <MusicPlayer enabled={state.settings.musicEnabled} volume={state.settings.musicVolume} />
      </>
    );
  }

  const cursorCount = state.buildings.find(b => b.id === 'cursor')?.count || 0;

  // ── Tab Content Render ───────────────────────────────────────────────────

  const renderTabContent = () => {
    switch (activeTab) {
      case 'buildings': return <BuildingList />;
      case 'upgrades': return <UpgradeGrid />;
      case 'achievements': return <AchievementPanel />;
      case 'skills': return <SkillTreePanel />;
      case 'pets': return <PetPanel />;
      case 'crafting': return <CraftingPanel />;
      case 'challenges': return <ChallengePanel />;
      case 'statistics': return <StatisticsPanel />;
      case 'relics': return <RelicPanel />;
      case 'research': return <ResearchPanel />;
      case 'spells': return <SpellPanel />;
      case 'expeditions': return <ExpeditionPanel />;
      case 'bosses': return <BossPanel />;
      case 'garden': return <GardenPanel />;
      case 'trading': return <TradingPanel />;
      case 'enchantments': return <EnchantmentPanel />;
      case 'artifacts': return <ArtifactPanel />;
      case 'minigames': return <MiniGamePanel />;
      case 'automation': return <AutoBuyerPanel />;
      default: return <BuildingList />;
    }
  };

  // ── Main Render ──────────────────────────────────────────────────────────

  return (
    <>
      <div className="h-screen w-screen flex flex-col overflow-hidden relative select-none bg-[#0a0604]">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
        {hasFrenzy && <div className="absolute inset-0 pointer-events-none animate-pulse bg-yellow-500/10 z-0" />}

        {/* Weather Display */}
        <WeatherDisplay />

        {/* News Ticker */}
        <NewsTicker />

        {/* Golden Coxinha */}
        <GoldenCoxinha onClick={handleGolden} spawnRateMultiplier={goldenSpawnRate} />

        {/* Notifications */}
        <NotificationToast />

        {/* Combo Display */}
        <ComboDisplay />

        {/* Event Banner */}
        <EventBanner />

        {/* Floating Texts */}
        {texts.map(t => (
          <div
            key={t.id}
            className="floating-text"
            style={{
              left: t.x, top: t.y, color: t.color,
              fontSize: t.isCrit ? '2rem' : '1.2rem',
            }}
          >
            {t.text}
          </div>
        ))}

        {/* Particles */}
        {particles.map(p => (
          <div
            key={p.id}
            className="particle"
            style={{
              left: p.x, top: p.y,
              width: p.size, height: p.size,
              opacity: p.life,
              background: p.color,
            }}
          />
        ))}

        {/* ── MASTER LAYOUT ────────────────────────────────────────────── */}
        <div className="flex-1 flex flex-col lg:flex-row h-full overflow-hidden relative z-10">

          {/* ── LEFT PANEL: Stats ──────────────────────────────────────── */}
          <div className={`${leftPanelOpen ? 'lg:w-[280px]' : 'lg:w-0 lg:overflow-hidden'} transition-all duration-300 p-3 flex flex-col gap-2 z-20 overflow-y-auto custom-scrollbar lg:border-r border-[#3d2211] glass-panel`}>
            
            {/* Toggle button */}
            <button
              className="hidden lg:flex absolute left-[275px] top-1/2 -translate-y-1/2 z-30 bg-[#1a0f08] border border-[#3d2211] rounded-r p-1 hover:bg-[#25160b]"
              onClick={() => setLeftPanelOpen(!leftPanelOpen)}
              style={{ left: leftPanelOpen ? '275px' : '0px' }}
            >
              {leftPanelOpen ? <ChevronLeft size={14} className="text-gray-500" /> : <ChevronRight size={14} className="text-gray-500" />}
            </button>

            {/* XP Bar */}
            <XpBar />

            {/* Player */}
            <div className="text-[9px] text-gray-500 text-center">
              {state.player.title || 'Cozinheiro'} · {state.player.name}
            </div>

            {/* Main Counters */}
            <div className="bg-[#1a0f08] p-3 rounded-xl border border-[#ffaa00]/30">
              <div className="text-gray-400 text-[10px] font-bold uppercase">Saldo</div>
              <div className="text-2xl font-black text-[#ffaa00] drop-shadow-lg truncate">{formatNumber(state.resources.coxinhas)}</div>
              <div className="text-[10px] text-gray-500">Coxinhas</div>
            </div>

            <div className={`bg-[#1a0f08] p-2 rounded-xl border ${hasFrenzy ? 'border-yellow-500 animate-pulse' : 'border-[#39ff14]/20'}`}>
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-gray-400 text-[9px] uppercase">Velocidade</div>
                  <div className="text-lg font-bold text-[#39ff14]">{formatNumber(cps)} <span className="text-[10px] text-gray-500">Cx/S</span></div>
                </div>
                <TrendingUp size={16} className="text-[#39ff14]" />
              </div>
            </div>

            {/* Sub Stats */}
            <div className="grid grid-cols-2 gap-1.5">
              <div className="bg-black/30 p-1.5 rounded border border-white/5">
                <div className="text-blue-400 mb-0.5"><MousePointer2 size={12} /></div>
                <div className="text-xs font-bold">{formatNumber(clickPower)}</div>
                <div className="text-[7px] uppercase opacity-50">Por Clique</div>
              </div>
              <div className="bg-black/30 p-1.5 rounded border border-white/5">
                <div className="text-purple-400 mb-0.5"><Zap size={12} /></div>
                <div className="text-xs font-bold">{Math.floor((globalMultiplier - 1) * 100)}%</div>
                <div className="text-[7px] uppercase opacity-50">Bônus</div>
              </div>
            </div>

            {/* Resources Bar */}
            <ResourcesBar />

            {/* Active Buffs */}
            <BuffBar />

            {/* Quests Mini */}
            <div className="border-t border-white/5 pt-2">
              <QuestPanel />
            </div>

            {/* Rebirth */}
            <div className="border-t border-white/5 pt-2">
              <RebirthPanelNew />
            </div>

            {/* Ascension */}
            <div className="border-t border-white/5 pt-2">
              <AscensionPanel />
            </div>

            {/* Bottom Actions */}
            <div className="mt-auto pt-2 border-t border-white/5 space-y-1.5">
              <div className="text-[8px] text-center opacity-30 font-mono">{formatNumber(state.statistics.totalCoxinhasEarned)} Total</div>
              <div className="flex gap-1">
                <button onClick={handleSave} className="flex-1 bg-[#2c1810] hover:bg-[#3d2211] text-[#d4a574] text-[9px] py-1.5 rounded border border-[#d4a574]/20 uppercase font-bold transition-colors">
                  <Save size={10} className="inline mr-1" />Salvar
                </button>
                <button onClick={handleReset} className="flex-1 bg-[#2c1810] hover:bg-red-900/30 text-red-400 text-[9px] py-1.5 rounded border border-red-900/20 uppercase font-bold transition-colors">
                  <RotateCcw size={10} className="inline mr-1" />Reset
                </button>
                <button
                  onClick={() => updateSettings({ soundEnabled: !state.settings.soundEnabled })}
                  className="w-7 bg-[#2c1810] text-[#d4a574] flex items-center justify-center rounded border border-[#d4a574]/20"
                >
                  {state.settings.soundEnabled ? <Volume2 size={10} /> : <VolumeX size={10} />}
                </button>
              </div>
            </div>
          </div>

          {/* ── CENTER: Big Coxinha ────────────────────────────────────── */}
          <div className="flex-1 flex items-center justify-center relative p-4 bg-radial-oil min-h-[300px]">
            <BigCoxinha onClick={handleClick} cursorCount={cursorCount} />
          </div>

          {/* ── RIGHT PANEL: Tabbed Content ────────────────────────────── */}
          <div className="lg:w-[380px] flex flex-col glass-panel lg:border-l border-[#3d2211] z-20">
            {/* Tab Bar */}
            <div className="flex flex-wrap bg-[#120a06] border-b border-[#3d2211] px-1 py-1 gap-0.5">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-[9px] px-2 py-1 rounded transition-all font-bold ${
                    activeTab === tab.id
                      ? 'bg-[#ffaa00] text-black'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                  title={tab.label}
                >
                  {tab.icon}
                </button>
              ))}
            </div>

            {/* Tab Title */}
            <div className="px-3 py-2 bg-[#120a06] border-b border-[#3d2211] flex items-center gap-2">
              <div className="w-1 h-3 bg-[#ffaa00] rounded" />
              <h2 className="font-bold text-[#e5e5e5] uppercase text-xs tracking-wide">
                {TABS.find(t => t.id === activeTab)?.label || activeTab}
              </h2>
              {activeTab === 'buildings' && (
                <div className="ml-auto text-[9px] bg-[#2a1810] px-2 py-0.5 rounded text-[#ffaa00] border border-[#ffaa00]/20">
                  {state.buildings.reduce((a, b) => a + b.count, 0)} Ativos
                </div>
              )}
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-3 custom-scrollbar bg-[#0f0705]">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>

      {/* Music Player */}
      <MusicPlayer enabled={state.settings.musicEnabled} volume={state.settings.musicVolume} />
    </>
  );
};

// ── App Root (wraps with GameProvider) ────────────────────────────────────────

const App: React.FC = () => {
  return (
    <GameProvider>
      <GameApp />
    </GameProvider>
  );
};

export default App;
