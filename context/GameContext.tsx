// ============================================================================
// COXINHA CLICKER - REACT CONTEXT & HOOKS
// Bridges GameEngine with React component tree
// ============================================================================

import React, { createContext, useContext, useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { GameEngine, formatNumber, formatTime } from '../engine/GameEngine';
import type { GameState, Building, Upgrade, Achievement, Skill, Pet, CraftingRecipe, Quest, Challenge, Notification, ActiveBuff, ComboState, RandomEvent } from '../types';

// ── Context ──────────────────────────────────────────────────────────────────

interface GameContextValue {
  engine: GameEngine;
  state: GameState;
  // Computed
  cps: number;
  clickPower: number;
  globalMultiplier: number;
  goldenSpawnRate: number;
  critChance: number;
  critMult: number;
  comboState: ComboState;
  activeEvent: RandomEvent | null;
  // Actions
  click: (x: number, y: number) => { damage: number; isCrit: boolean; comboCount: number };
  buyBuilding: (id: string) => boolean;
  buyUpgrade: (id: string) => boolean;
  clickGolden: () => { type: string; value: number };
  upgradeSkill: (id: string) => boolean;
  activatePet: (id: string) => void;
  startCrafting: (id: string) => boolean;
  claimQuest: (id: string) => boolean;
  refreshQuests: () => void;
  performRebirth: () => boolean;
  buyGalaxy: (id: string) => boolean;
  exploreGalaxy: (id: string) => void;
  travelToGalaxy: (id: string) => void;
  dismissNotification: (id: number) => void;
  resetAll: () => void;
  updateSettings: (settings: Partial<GameState['settings']>) => void;
  // New system actions
  castSpell: (id: string) => boolean;
  upgradeSpell: (id: string) => boolean;
  equipRelic: (id: string) => boolean;
  upgradeRelic: (id: string) => boolean;
  conductResearch: (id: string) => boolean;
  startExpedition: (id: string) => boolean;
  startBossFight: (id: string) => boolean;
  attackBoss: () => number;
  plantSeed: (plotIndex: number, seedId: string) => boolean;
  waterPlot: (plotIndex: number) => boolean;
  harvestPlot: (plotIndex: number) => boolean;
  makeTrade: (id: string) => boolean;
  upgradeEnchantment: (id: string) => boolean;
  playMiniGame: (id: string) => { won: boolean; reward: number };
  equipArtifact: (id: string) => boolean;
  performAscension: () => boolean;
  toggleAutoBuyer: (buildingId: string) => boolean;
  toggleAllAutoBuyers: (enabled: boolean) => void;
  // Utilities
  getBuildingCost: (building: Building) => number;
  getBulkBuildingCost: (building: Building, amount: number) => number;
  getMaxAffordableBuildings: (building: Building) => number;
  buyBuildingBulk: (buildingId: string, amount: number) => number;
  isUpgradeVisible: (upgrade: Upgrade) => boolean;
  calculateRebirthFragments: () => number;
  getRebirthRequirements: () => { tiers: { name: string; buildingIds: string[]; required: number }[]; totalCoxinhasRequired: number; met: boolean };
  formatNumber: (n: number) => string;
  formatTime: (s: number) => string;
  // Render trigger
  tick: number;
}

const GameContext = createContext<GameContextValue | null>(null);

// ── Provider ─────────────────────────────────────────────────────────────────

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const engineRef = useRef<GameEngine | null>(null);
  const [tick, setTick] = useState(0);

  // Initialize engine once
  if (!engineRef.current) {
    engineRef.current = new GameEngine();
  }

  const engine = engineRef.current;

  useEffect(() => {
    engine.start();

    // Force re-render on tick (10x/s for smooth UI)
    const unsubTick = engine.events.on('tick', () => {
      setTick(t => t + 1);
    });

    // Also re-render on important events
    const events = [
      'building:bought', 'upgrade:bought', 'achievement:unlocked',
      'skill:upgraded', 'pet:activated', 'pet:discovered',
      'craft:completed', 'quest:completed', 'quest:claimed',
      'rebirth', 'galaxy:unlocked', 'galaxy:explored', 'galaxy:traveled',
      'event:started', 'event:ended', 'player:levelup',
      'game:loaded', 'game:reset', 'recalculated',
      'spell:cast', 'relic:toggled', 'research:completed',
      'expedition:started', 'expedition:completed', 'boss:started', 'boss:defeated',
      'garden:planted', 'garden:harvested', 'trade:completed',
      'enchantment:upgraded', 'minigame:played', 'artifact:toggled',
      'weather:changed', 'ascension', 'autobuyer:toggled'
    ];
    const unsubs = events.map(e => engine.events.on(e, () => setTick(t => t + 1)));

    return () => {
      unsubTick();
      unsubs.forEach(u => u());
      engine.stop();
    };
  }, [engine]);

  // Memoized actions
  const click = useCallback((x: number, y: number) => engine.click(x, y), [engine]);
  const buyBuilding = useCallback((id: string) => engine.buyBuilding(id), [engine]);
  const buyUpgrade = useCallback((id: string) => engine.buyUpgrade(id), [engine]);
  const clickGolden = useCallback(() => engine.clickGolden(), [engine]);
  const upgradeSkill = useCallback((id: string) => engine.upgradeSkill(id), [engine]);
  const activatePet = useCallback((id: string) => engine.activatePet(id), [engine]);
  const startCrafting = useCallback((id: string) => engine.startCrafting(id), [engine]);
  const claimQuest = useCallback((id: string) => engine.claimQuest(id), [engine]);
  const refreshQuests = useCallback(() => engine.refreshQuests(), [engine]);
  const performRebirth = useCallback(() => engine.performRebirth(), [engine]);
  const buyGalaxyAction = useCallback((id: string) => engine.buyGalaxy(id), [engine]);
  const exploreGalaxy = useCallback((id: string) => engine.exploreGalaxy(id), [engine]);
  const travelToGalaxy = useCallback((id: string) => engine.travelToGalaxy(id), [engine]);
  const dismissNotification = useCallback((id: number) => engine.dismissNotification(id), [engine]);
  const resetAll = useCallback(() => engine.resetAll(), [engine]);
  const getBuildingCost = useCallback((b: Building) => engine.getBuildingCost(b), [engine]);
  const getBulkBuildingCost = useCallback((b: Building, n: number) => engine.getBulkBuildingCost(b, n), [engine]);
  const getMaxAffordableBuildings = useCallback((b: Building) => engine.getMaxAffordableBuildings(b), [engine]);
  const buyBuildingBulk = useCallback((id: string, n: number) => engine.buyBuildingBulk(id, n), [engine]);
  const isUpgradeVisible = useCallback((u: Upgrade) => engine.isUpgradeVisible(u), [engine]);
  const calculateRebirthFragments = useCallback(() => engine.calculateRebirthFragments(), [engine]);
  const getRebirthRequirements = useCallback(() => engine.getRebirthRequirements(), [engine]);
  const updateSettings = useCallback((s: Partial<GameState['settings']>) => {
    Object.assign(engine.state.settings, s);
    engine.events.emit('settings:changed');
    setTick(t => t + 1);
  }, [engine]);

  // New system actions
  const castSpell = useCallback((id: string) => engine.castSpell(id), [engine]);
  const upgradeSpell = useCallback((id: string) => engine.upgradeSpell(id), [engine]);
  const equipRelic = useCallback((id: string) => engine.equipRelic(id), [engine]);
  const upgradeRelic = useCallback((id: string) => engine.upgradeRelic(id), [engine]);
  const conductResearch = useCallback((id: string) => engine.conductResearch(id), [engine]);
  const startExpedition = useCallback((id: string) => engine.startExpedition(id), [engine]);
  const startBossFight = useCallback((id: string) => engine.startBossFight(id), [engine]);
  const attackBoss = useCallback(() => engine.attackBoss(), [engine]);
  const plantSeed = useCallback((plotIndex: number, seedId: string) => engine.plantSeed(plotIndex, seedId), [engine]);
  const waterPlot = useCallback((plotIndex: number) => engine.waterPlot(plotIndex), [engine]);
  const harvestPlot = useCallback((plotIndex: number) => engine.harvestPlot(plotIndex), [engine]);
  const makeTrade = useCallback((id: string) => engine.makeTrade(id), [engine]);
  const upgradeEnchantment = useCallback((id: string) => engine.upgradeEnchantment(id), [engine]);
  const playMiniGame = useCallback((id: string) => engine.playMiniGame(id), [engine]);
  const equipArtifact = useCallback((id: string) => engine.equipArtifact(id), [engine]);
  const performAscension = useCallback(() => engine.performAscension(), [engine]);
  const toggleAutoBuyer = useCallback((id: string) => engine.toggleAutoBuyer(id), [engine]);
  const toggleAllAutoBuyers = useCallback((enabled: boolean) => engine.toggleAllAutoBuyers(enabled), [engine]);

  const value = useMemo<GameContextValue>(() => ({
    engine,
    state: engine.state,
    cps: engine.cps,
    clickPower: engine.clickPower,
    globalMultiplier: engine.globalMultiplier,
    goldenSpawnRate: engine.goldenSpawnRate,
    critChance: engine.critChance,
    critMult: engine.critMult,
    comboState: engine.comboState,
    activeEvent: engine.activeEvent,
    click,
    buyBuilding,
    buyUpgrade,
    clickGolden,
    upgradeSkill,
    activatePet,
    startCrafting,
    claimQuest,
    refreshQuests,
    performRebirth,
    buyGalaxy: buyGalaxyAction,
    exploreGalaxy,
    travelToGalaxy,
    dismissNotification,
    resetAll,
    updateSettings,
    castSpell,
    upgradeSpell,
    equipRelic,
    upgradeRelic,
    conductResearch,
    startExpedition,
    startBossFight,
    attackBoss,
    plantSeed,
    waterPlot,
    harvestPlot,
    makeTrade,
    upgradeEnchantment,
    playMiniGame,
    equipArtifact,
    performAscension,
    toggleAutoBuyer,
    toggleAllAutoBuyers,
    getBuildingCost,
    getBulkBuildingCost,
    getMaxAffordableBuildings,
    buyBuildingBulk,
    isUpgradeVisible,
    calculateRebirthFragments,
    getRebirthRequirements,
    formatNumber,
    formatTime,
    tick
  }), [engine, tick, click, buyBuilding, buyUpgrade, clickGolden, upgradeSkill, activatePet,
    startCrafting, claimQuest, refreshQuests, performRebirth, buyGalaxyAction, exploreGalaxy,
    travelToGalaxy, dismissNotification, resetAll, updateSettings, getBuildingCost,
    getBulkBuildingCost, getMaxAffordableBuildings, buyBuildingBulk,
    isUpgradeVisible, calculateRebirthFragments, getRebirthRequirements, castSpell, upgradeSpell, equipRelic,
    upgradeRelic, conductResearch, startExpedition, startBossFight, attackBoss, plantSeed,
    waterPlot, harvestPlot, makeTrade, upgradeEnchantment, playMiniGame, equipArtifact, performAscension,
    toggleAutoBuyer, toggleAllAutoBuyers]);

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

// ── Hook ─────────────────────────────────────────────────────────────────────

export function useGame(): GameContextValue {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within <GameProvider>');
  return ctx;
}

export { formatNumber, formatTime };
