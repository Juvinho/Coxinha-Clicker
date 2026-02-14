// ============================================================================
// COXINHA CLICKER - GAME ENGINE
// Core engine: EventBus, GameLoop, Save/Load, State Management
// ============================================================================

import {
  GameState, GameSettings, Resources, Building, Upgrade, Achievement,
  Skill, Pet, CraftingRecipe, CraftingQueue, Challenge, Quest,
  ActiveBuff, Notification, GameStatistics, PlayerProfile, PrestigeState,
  FloatingText, ComboState, RandomEvent, EventEffect, Galaxy,
  Relic, ResearchNode, Spell, Expedition, Boss, Artifact, ArtifactSet,
  Enchantment, TradeOffer, MiniGameState, GardenPlot, Seed, WeatherState,
  WeatherType, AscensionState, SeasonEvent
} from '../types';
import {
  INITIAL_BUILDINGS, INITIAL_UPGRADES, INITIAL_ACHIEVEMENTS, INITIAL_SKILLS,
  INITIAL_PETS, INITIAL_RECIPES, INITIAL_CHALLENGES, QUEST_POOL, RANDOM_EVENTS,
  createDefaultResources, createDefaultStatistics, createDefaultSettings,
  createDefaultPlayer, createDefaultPrestige
} from '../gameData';
import {
  EXTRA_BUILDINGS, EXTRA_UPGRADES, EXTRA_ACHIEVEMENTS, EXTRA_SKILLS,
  EXTRA_PETS, EXTRA_RECIPES, EXTRA_CHALLENGES, EXTRA_QUESTS, EXTRA_EVENTS,
  EXTRA_GALAXIES, EXTRA_GALAXY_UPGRADES, EXTRA_HEADLINES
} from '../gameDataExpanded';
import {
  WEATHER_TYPES, INITIAL_RELICS, INITIAL_RESEARCH, INITIAL_SPELLS,
  INITIAL_EXPEDITIONS, INITIAL_BOSSES, INITIAL_ARTIFACTS, ARTIFACT_SETS,
  INITIAL_ENCHANTMENTS, INITIAL_TRADE_OFFERS, INITIAL_MINIGAMES, INITIAL_SEEDS,
  INITIAL_SEASONS, createDefaultWeather, createDefaultAscension, createDefaultGarden
} from '../gameSystems';

// ── EventBus ─────────────────────────────────────────────────────────────────

type EventHandler = (...args: any[]) => void;

export class EventBus {
  private handlers: Map<string, Set<EventHandler>> = new Map();

  on(event: string, handler: EventHandler): () => void {
    if (!this.handlers.has(event)) this.handlers.set(event, new Set());
    this.handlers.get(event)!.add(handler);
    return () => this.handlers.get(event)?.delete(handler);
  }

  emit(event: string, ...args: any[]): void {
    this.handlers.get(event)?.forEach(h => {
      try { h(...args); } catch (e) { console.error(`Event error [${event}]:`, e); }
    });
  }

  off(event: string, handler: EventHandler): void {
    this.handlers.get(event)?.delete(handler);
  }

  clear(): void {
    this.handlers.clear();
  }
}

// ── Save/Load ────────────────────────────────────────────────────────────────

const SAVE_KEY = 'coxinha_clicker_aaa_v2';
const SAVE_VERSION = 2;

// ── Sound System ─────────────────────────────────────────────────────────────

let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (!audioContext) {
    try {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch { return null; }
  }
  return audioContext;
}

export function playSound(type: 'click' | 'buy' | 'upgrade' | 'golden' | 'achievement' | 'levelup' | 'crit' | 'rebirth', volume: number = 0.3): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(volume, ctx.currentTime);
  gain.connect(ctx.destination);

  const osc = ctx.createOscillator();
  const now = ctx.currentTime;

  switch (type) {
    case 'click':
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.connect(gain);
      osc.start(now);
      osc.stop(now + 0.1);
      break;
    case 'crit':
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.05);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.2);
      gain.gain.setValueAtTime(volume * 0.6, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.connect(gain);
      osc.start(now);
      osc.stop(now + 0.25);
      break;
    case 'buy':
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.connect(gain);
      osc.start(now);
      osc.stop(now + 0.15);
      break;
    case 'upgrade':
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523, now);
      osc.frequency.setValueAtTime(659, now + 0.1);
      osc.frequency.setValueAtTime(784, now + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.connect(gain);
      osc.start(now);
      osc.stop(now + 0.3);
      break;
    case 'golden':
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.setValueAtTime(1100, now + 0.1);
      osc.frequency.setValueAtTime(1320, now + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.connect(gain);
      osc.start(now);
      osc.stop(now + 0.4);
      break;
    case 'achievement':
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.setValueAtTime(554, now + 0.15);
      osc.frequency.setValueAtTime(659, now + 0.3);
      osc.frequency.setValueAtTime(880, now + 0.45);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
      osc.connect(gain);
      osc.start(now);
      osc.stop(now + 0.6);
      break;
    case 'levelup':
      osc.type = 'square';
      osc.frequency.setValueAtTime(200, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.3);
      gain.gain.setValueAtTime(volume * 0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.connect(gain);
      osc.start(now);
      osc.stop(now + 0.4);
      break;
    case 'rebirth':
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(100, now);
      osc.frequency.exponentialRampToValueAtTime(2000, now + 0.5);
      osc.frequency.exponentialRampToValueAtTime(50, now + 1);
      gain.gain.setValueAtTime(volume * 0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1);
      osc.connect(gain);
      osc.start(now);
      osc.stop(now + 1);
      break;
  }
}

// ── Game Engine ──────────────────────────────────────────────────────────────

export class GameEngine {
  public events = new EventBus();
  public state: GameState;

  private tickInterval: number | null = null;
  private saveInterval: number | null = null;
  private playTimeInterval: number | null = null;
  private comboTimeout: number | null = null;
  private activeEventTimeout: number | null = null;
  private notificationId = 0;

  // Computed cache
  private _cps = 0;
  private _clickPower = 1;
  private _globalMult = 1;
  private _goldenSpawnRate = 1;
  private _critChance = 0.02;
  private _critMult = 7;
  private _comboState: ComboState = { count: 0, multiplier: 1, timeLeft: 0, maxCombo: 0 };
  private _activeEvent: RandomEvent | null = null;
  private _eventEffects: Map<string, number> = new Map();

  constructor() {
    this.state = this.createDefaultState();
    this.load();
    this.generateRebirthUpgrades();
    this.initializeAutoBuyers();
    this.recalculate();
  }

  // ── State Creation ───────────────────────────────────────────────────────

  private createDefaultState(): GameState {
    // Merge base + expanded galaxies
    const mergedGalaxies = [...Object.entries(
      JSON.parse(JSON.stringify(
        (() => { const p = createDefaultPrestige(); return p.galaxies; })()
      ))
    )];
    for (const [gId, gData] of Object.entries(EXTRA_GALAXIES)) {
      mergedGalaxies.push([gId, JSON.parse(JSON.stringify(gData))]);
    }
    const galaxiesObj = Object.fromEntries(mergedGalaxies) as Record<string, Galaxy>;

    const prestige = createDefaultPrestige();
    prestige.galaxies = galaxiesObj;
    prestige.galaxyUpgrades = [
      ...prestige.galaxyUpgrades,
      ...JSON.parse(JSON.stringify(EXTRA_GALAXY_UPGRADES))
    ];

    return {
      version: SAVE_VERSION,
      player: createDefaultPlayer(),
      resources: createDefaultResources(),
      buildings: JSON.parse(JSON.stringify([...INITIAL_BUILDINGS, ...EXTRA_BUILDINGS])),
      upgrades: JSON.parse(JSON.stringify([...INITIAL_UPGRADES, ...EXTRA_UPGRADES])),
      achievements: JSON.parse(JSON.stringify([...INITIAL_ACHIEVEMENTS, ...EXTRA_ACHIEVEMENTS])),
      skills: JSON.parse(JSON.stringify([...INITIAL_SKILLS, ...EXTRA_SKILLS])),
      pets: JSON.parse(JSON.stringify([...INITIAL_PETS, ...EXTRA_PETS])),
      craftingRecipes: JSON.parse(JSON.stringify([...INITIAL_RECIPES, ...EXTRA_RECIPES])),
      craftingQueue: [],
      challenges: JSON.parse(JSON.stringify([...INITIAL_CHALLENGES, ...EXTRA_CHALLENGES])),
      quests: this.generateDailyQuests(),
      statistics: createDefaultStatistics(),
      prestige,
      activeBuffs: [],
      notifications: [],
      settings: createDefaultSettings(),
      cps: 0,
      clickPower: 1,
      globalMultiplier: 1,
      // New Systems
      relics: JSON.parse(JSON.stringify(INITIAL_RELICS)),
      research: JSON.parse(JSON.stringify(INITIAL_RESEARCH)),
      spells: JSON.parse(JSON.stringify(INITIAL_SPELLS)),
      expeditions: JSON.parse(JSON.stringify(INITIAL_EXPEDITIONS)),
      bosses: JSON.parse(JSON.stringify(INITIAL_BOSSES)),
      activeBoss: null,
      artifacts: JSON.parse(JSON.stringify(INITIAL_ARTIFACTS)),
      enchantments: JSON.parse(JSON.stringify(INITIAL_ENCHANTMENTS)),
      tradeOffers: JSON.parse(JSON.stringify(INITIAL_TRADE_OFFERS)),
      miniGames: JSON.parse(JSON.stringify(INITIAL_MINIGAMES)),
      garden: createDefaultGarden(),
      weather: createDefaultWeather(),
      ascension: createDefaultAscension(),
      seasons: JSON.parse(JSON.stringify(INITIAL_SEASONS)),
      autoBuyers: [],
    };
  }

  // ── Game Loop ──────────────────────────────────────────────────────────

  start(): void {
    if (this.tickInterval) return;

    // Calculate offline progress
    this.calculateOfflineProgress();

    // Main game tick (100ms = 10 ticks/second)
    this.tickInterval = window.setInterval(() => this.tick(), 100);

    // Save every 30s
    this.saveInterval = window.setInterval(() => this.save(), 
      (this.state.settings.autoSaveInterval || 30) * 1000);

    // Play time tracker (1s)
    this.playTimeInterval = window.setInterval(() => {
      this.state.statistics.totalPlayTimeSeconds++;
      this.state.player.totalPlayTime++;
    }, 1000);

    this.events.emit('game:started');
  }

  stop(): void {
    if (this.tickInterval) { clearInterval(this.tickInterval); this.tickInterval = null; }
    if (this.saveInterval) { clearInterval(this.saveInterval); this.saveInterval = null; }
    if (this.playTimeInterval) { clearInterval(this.playTimeInterval); this.playTimeInterval = null; }
    if (this.comboTimeout) { clearTimeout(this.comboTimeout); this.comboTimeout = null; }
    if (this.activeEventTimeout) { clearTimeout(this.activeEventTimeout); this.activeEventTimeout = null; }
    this.save();
  }

  private tick(): void {
    const dt = 0.1; // 100ms in seconds

    // Production
    const production = this._cps * dt;
    if (production > 0) {
      this.state.resources.coxinhas += production;
      this.state.statistics.totalCoxinhasEarned += production;

      // Update building stats
      for (const b of this.state.buildings) {
        if (b.count > 0) {
          const bProduction = this.getBuildingCps(b) * dt;
          b.totalProduced += bProduction;
          if (!this.state.statistics.buildingStats[b.id]) {
            this.state.statistics.buildingStats[b.id] = { bought: b.count, totalProduced: 0 };
          }
          this.state.statistics.buildingStats[b.id].totalProduced += bProduction;
        }
      }
    }

    // Experience from production
    if (production > 0) {
      this.addXp(production * 0.001);
    }

    // Random events check
    this.checkRandomEvents();

    // Active buffs expiry
    this.tickBuffs();

    // Crafting queue
    this.tickCrafting();

    // Pet auto-click
    this.tickPets(dt);

    // Quest progress (production-based)
    this.updateQuestProgress('produced', production);

    // Achievement checks (throttled - every 10 ticks)
    if (Math.random() < 0.1) {
      this.checkAchievements();
    }

    // Track highest CPS
    if (this._cps > this.state.statistics.highestCps) {
      this.state.statistics.highestCps = this._cps;
    }

    // Stardust passive generation (from exploration)
    const explorationBonus = Object.values(this.state.prestige.galaxies)
      .reduce((sum, g) => sum + (g.unlocked ? g.exploration * 0.001 : 0), 0);
    if (explorationBonus > 0) {
      this.state.resources.stardust += explorationBonus * dt;
    }

    // ── New System Ticks ──

    // Mana regeneration (base 1/s + bonuses)
    const manaRegen = (1 + this.state.player.level * 0.1) * dt;
    this.state.resources.mana = Math.min(
      this.state.resources.mana + manaRegen,
      100 + this.state.player.level * 10
    );

    // Weather rotation
    if (this.state.weather && Date.now() >= this.state.weather.changesAt) {
      this.rotateWeather();
    }

    // Expedition completion
    this.tickExpeditions();

    // Garden growth
    this.tickGarden();

    // Spell cooldown tracking (handled via lastCast in spell objects)

    // Boss auto-damage (if boss active)
    if (this.state.activeBoss) {
      this.tickBoss(dt);
    }

    // Research points passive (1/s per completed research)
    const completedResearch = this.state.research.filter(r => r.completed).length;
    if (completedResearch > 0) {
      this.state.resources.researchPoints += completedResearch * 0.1 * dt;
    }

    // Trade offer refresh (every 10 minutes)
    this.tickTrades();

    // Auto-buyers
    this.tickAutoBuyers();

    this.events.emit('tick', { dt, cps: this._cps, production });
  }

  // ── Clicking ───────────────────────────────────────────────────────────

  click(x: number, y: number): { damage: number; isCrit: boolean; comboCount: number } {
    let damage = this._clickPower;
    const isCrit = Math.random() < this._critChance;

    if (isCrit) {
      damage *= this._critMult;
    }

    // Combo
    damage *= this._comboState.multiplier;

    // Event effects
    const clickMult = this._eventEffects.get('click_mult') || 1;
    damage *= clickMult;

    // Apply
    this.state.resources.coxinhas += damage;
    this.state.statistics.totalCoxinhasEarned += damage;
    this.state.statistics.totalClicks++;

    // Track highest single click
    if (damage > this.state.statistics.highestClickDamage) {
      this.state.statistics.highestClickDamage = damage;
    }

    // Combo management
    this.advanceCombo();

    // XP from clicking
    this.addXp(damage * 0.01);

    // Pet XP for active pets
    this.addPetXp(1);

    // Quest progress
    this.updateQuestProgress('clicks', 1);

    // Sound
    if (this.state.settings.soundEnabled) {
      playSound(isCrit ? 'crit' : 'click', this.state.settings.volume);
    }

    this.events.emit('click', { damage, isCrit, x, y, comboCount: this._comboState.count });
    return { damage, isCrit, comboCount: this._comboState.count };
  }

  // ── Combo System ───────────────────────────────────────────────────────

  private advanceCombo(): void {
    this._comboState.count++;
    if (this._comboState.count > this._comboState.maxCombo) {
      this._comboState.maxCombo = this._comboState.count;
    }
    if (this._comboState.count > this.state.statistics.highestCombo) {
      this.state.statistics.highestCombo = this._comboState.count;
    }

    // Calculate multiplier
    const c = this._comboState.count;
    const comboBonus = this.getSkillBonus('combo_mult');
    let mult = 1;
    if (c >= 250) mult = 10;
    else if (c >= 100) mult = 5;
    else if (c >= 50) mult = 3;
    else if (c >= 25) mult = 2;
    else if (c >= 10) mult = 1.5;
    this._comboState.multiplier = mult * (1 + comboBonus);

    // Reset timer
    const comboDuration = 3000 + this.getSkillBonus('combo_duration') * 1000;
    if (this.comboTimeout) clearTimeout(this.comboTimeout);
    this.comboTimeout = window.setTimeout(() => {
      this._comboState.count = 0;
      this._comboState.multiplier = 1;
      this.events.emit('combo:break');
    }, comboDuration);

    // Quest progress
    this.updateQuestProgress('combo_reached', this._comboState.count);

    if (this._comboState.count % 10 === 0 && this._comboState.count > 0) {
      this.events.emit('combo:milestone', this._comboState.count);
    }
  }

  // ── Building Management ────────────────────────────────────────────────

  getBuildingCost(building: Building): number {
    const costReduction = this.getSkillBonus('building_cost_reduction');
    const eventReduction = this._eventEffects.get('cost_reduction') || 1;
    return Math.ceil(building.baseCost * Math.pow(1.15, building.count) * (1 - costReduction) * eventReduction);
  }

  getBulkBuildingCost(building: Building, amount: number): number {
    const costReduction = this.getSkillBonus('building_cost_reduction');
    const eventReduction = this._eventEffects.get('cost_reduction') || 1;
    let total = 0;
    for (let i = 0; i < amount; i++) {
      total += Math.ceil(building.baseCost * Math.pow(1.15, building.count + i) * (1 - costReduction) * eventReduction);
    }
    return total;
  }

  getMaxAffordableBuildings(building: Building): number {
    let budget = this.state.resources.coxinhas;
    const costReduction = this.getSkillBonus('building_cost_reduction');
    const eventReduction = this._eventEffects.get('cost_reduction') || 1;
    let count = 0;
    while (count < 10000) { // safety cap
      const cost = Math.ceil(building.baseCost * Math.pow(1.15, building.count + count) * (1 - costReduction) * eventReduction);
      if (cost > budget) break;
      budget -= cost;
      count++;
    }
    return count;
  }

  buyBuildingBulk(buildingId: string, amount: number): number {
    const building = this.state.buildings.find(b => b.id === buildingId);
    if (!building) return 0;

    let bought = 0;
    for (let i = 0; i < amount; i++) {
      if (!this.buyBuilding(buildingId)) break;
      bought++;
    }
    return bought;
  }

  getBuildingCps(building: Building): number {
    let cps = building.baseCps * building.count;

    // Building-specific upgrades
    for (const u of this.state.upgrades) {
      if (u.purchased && u.type === 'building' && u.triggerBuildingId === building.id) {
        cps *= u.multiplier;
      }
      // Synergy
      if (u.purchased && u.type === 'synergy' && (u.triggerBuildingId === building.id || u.synergyTargetId === building.id)) {
        cps *= u.multiplier;
      }
    }

    // Building CPS skill bonus
    const buildingCpsBonus = this.getSkillBonus('building_cps');
    cps *= (1 + buildingCpsBonus);

    // Milestone bonus: every 50 buildings past 100, x1.5 (infinite scaling)
    if (building.count > 100) {
      const milestones = Math.floor((building.count - 100) / 50);
      cps *= Math.pow(1.5, milestones);
    }

    return cps;
  }

  buyBuilding(buildingId: string): boolean {
    const building = this.state.buildings.find(b => b.id === buildingId);
    if (!building) return false;

    const cost = this.getBuildingCost(building);
    if (this.state.resources.coxinhas < cost) return false;

    this.state.resources.coxinhas -= cost;
    this.state.statistics.totalCoxinhasSpent += cost;
    building.count++;
    this.state.statistics.totalBuildingsBought++;

    // Update building stats
    if (!this.state.statistics.buildingStats[buildingId]) {
      this.state.statistics.buildingStats[buildingId] = { bought: 0, totalProduced: 0 };
    }
    this.state.statistics.buildingStats[buildingId].bought = building.count;

    // Quest progress
    this.updateQuestProgress('buildings_bought', 1);

    this.recalculate();

    if (this.state.settings.soundEnabled) {
      playSound('buy', this.state.settings.volume);
    }

    this.events.emit('building:bought', { buildingId, count: building.count, cost });
    return true;
  }

  // ── Upgrade Management ─────────────────────────────────────────────────

  buyUpgrade(upgradeId: string): boolean {
    const upgrade = this.state.upgrades.find(u => u.id === upgradeId);
    if (!upgrade || upgrade.purchased) return false;

    // Prestige upgrades cost fragments
    if (upgrade.type === 'prestige') {
      if (this.state.resources.hotOilFragments < upgrade.cost) return false;
      this.state.resources.hotOilFragments -= upgrade.cost;
    } else {
      if (this.state.resources.coxinhas < upgrade.cost) return false;
      this.state.resources.coxinhas -= upgrade.cost;
      this.state.statistics.totalCoxinhasSpent += upgrade.cost;
    }

    upgrade.purchased = true;
    this.state.statistics.totalUpgradesBought++;

    // Quest progress
    this.updateQuestProgress('upgrades_bought', 1);

    this.recalculate();

    if (this.state.settings.soundEnabled) {
      playSound('upgrade', this.state.settings.volume);
    }

    // Show effect notification
    const effectDesc = upgrade.type === 'building'
      ? `x${upgrade.multiplier} para ${this.state.buildings.find(b => b.id === upgrade.triggerBuildingId)?.name || upgrade.triggerBuildingId}`
      : upgrade.type === 'click' ? `Poder de clique x${upgrade.multiplier}`
      : upgrade.type === 'global' ? `Produção global x${upgrade.multiplier}`
      : upgrade.type === 'golden' ? `Coxinhas douradas x${upgrade.multiplier}`
      : upgrade.type === 'synergy' ? `Sinergia x${upgrade.multiplier}`
      : upgrade.type === 'prestige' ? `Bônus de prestige x${upgrade.multiplier}`
      : `Multiplicador x${upgrade.multiplier}`;
    this.addNotification('info', `✨ ${upgrade.name}`, effectDesc, upgrade.icon || '✨', '#4CAF50');

    this.events.emit('upgrade:bought', { upgradeId });
    return true;
  }

  isUpgradeVisible(upgrade: Upgrade): boolean {
    if (upgrade.purchased) return false;
    if (!upgrade.unlockCondition) return true;

    const cond = upgrade.unlockCondition;
    switch (cond.type) {
      case 'building_count': {
        const b = this.state.buildings.find(b => b.id === cond.targetId);
        return (b?.count ?? 0) >= cond.value;
      }
      case 'total_coxinhas': return this.state.statistics.totalCoxinhasEarned >= cond.value;
      case 'cps': return this._cps >= cond.value;
      case 'clicks': return this.state.statistics.totalClicks >= cond.value;
      case 'total_clicks': return this.state.statistics.totalClicks >= cond.value;
      case 'rebirth_count': return this.state.prestige.rebirthCount >= cond.value;
      case 'achievement_count': return this.state.statistics.totalAchievementsUnlocked >= cond.value;
      case 'level': return this.state.player.level >= cond.value;
      case 'total_buildings': {
        const total = this.state.buildings.reduce((sum, b) => sum + b.count, 0);
        return total >= cond.value;
      }
      case 'cps_milestone': return this._cps >= cond.value;
      case 'golden_clicked': return this.state.statistics.totalGoldenClicked >= cond.value;
      default: return true;
    }
  }

  // ── Golden Coxinha ─────────────────────────────────────────────────────

  clickGolden(): { type: 'frenzy' | 'lucky' | 'stardust' | 'essence'; value: number } {
    this.state.statistics.totalGoldenClicked++;
    this.updateQuestProgress('golden_clicked', 1);

    const roll = Math.random();
    let result: { type: 'frenzy' | 'lucky' | 'stardust' | 'essence'; value: number };

    if (roll < 0.4) {
      // Frenzy: CPS x7 for 77s (modified by skills)
      const duration = 77000 + this.getSkillBonus('golden_duration') * 1000;
      this.addBuff('golden_frenzy', 'Frenesi Dourado', '🔥', 'cps_mult', 7, duration, 'golden');
      result = { type: 'frenzy', value: 7 };
    } else if (roll < 0.7) {
      // Lucky: 10% of bank
      const value = Math.max(this.state.resources.coxinhas * 0.1, this._cps * 60);
      this.state.resources.coxinhas += value;
      this.state.statistics.totalCoxinhasEarned += value;
      result = { type: 'lucky', value };
    } else if (roll < 0.9) {
      // Stardust
      const amount = Math.max(1, Math.floor(this.state.prestige.rebirthCount * 2 + 1));
      this.state.resources.stardust += amount;
      result = { type: 'stardust', value: amount };
    } else {
      // Golden Essence
      const amount = Math.max(1, Math.floor(this.state.prestige.rebirthCount + 1));
      this.state.resources.goldenEssence += amount;
      result = { type: 'essence', value: amount };
    }

    if (this.state.settings.soundEnabled) {
      playSound('golden', this.state.settings.volume);
    }

    this.events.emit('golden:clicked', result);
    return result;
  }

  // ── Skill Tree ─────────────────────────────────────────────────────────

  upgradeSkill(skillId: string): boolean {
    const skill = this.state.skills.find(s => s.id === skillId);
    if (!skill || !skill.unlocked || skill.currentLevel >= skill.maxLevel) return false;

    const cost = skill.costPerLevel;
    if (this.state.resources.skillPoints < cost) return false;

    this.state.resources.skillPoints -= cost;
    skill.currentLevel++;

    // Unlock dependents
    for (const s of this.state.skills) {
      if (!s.unlocked && s.prerequisites.every(pid => {
        const prereq = this.state.skills.find(sk => sk.id === pid);
        return prereq && prereq.currentLevel > 0;
      })) {
        s.unlocked = true;
      }
    }

    this.recalculate();
    this.events.emit('skill:upgraded', { skillId, level: skill.currentLevel });
    return true;
  }

  getSkillBonus(effectType: string): number {
    let total = 0;
    for (const skill of this.state.skills) {
      if (skill.currentLevel > 0 && skill.effect.type === effectType) {
        total += skill.effect.valuePerLevel * skill.currentLevel;
      }
    }
    return total;
  }

  // ── Pet System ─────────────────────────────────────────────────────────

  activatePet(petId: string): void {
    for (const pet of this.state.pets) {
      pet.active = pet.id === petId && pet.owned;
    }
    this.recalculate();
    this.events.emit('pet:activated', petId);
  }

  private addPetXp(amount: number): void {
    const activePet = this.state.pets.find(p => p.active && p.owned);
    if (!activePet) return;

    activePet.xp += amount;
    while (activePet.xp >= activePet.xpToNext && activePet.level < activePet.maxLevel) {
      activePet.xp -= activePet.xpToNext;
      activePet.level++;
      activePet.xpToNext = Math.floor(activePet.xpToNext * 1.15);
      this.recalculate();
      this.addNotification('pet', `${activePet.icon} ${activePet.name}`, `Subiu para nível ${activePet.level}!`, activePet.icon, '#9C27B0');
    }
  }

  getPetBonus(abilityType: string): number {
    let total = 0;
    for (const pet of this.state.pets) {
      if (pet.owned && pet.active && pet.ability.type === abilityType) {
        total += pet.ability.baseValue + pet.ability.scalingPerLevel * (pet.level - 1);
      }
    }
    return total;
  }

  private tickPets(dt: number): void {
    const autoClick = this.getPetBonus('auto_click');
    if (autoClick > 0) {
      const damage = this._clickPower * autoClick * dt;
      this.state.resources.coxinhas += damage;
      this.state.statistics.totalCoxinhasEarned += damage;
    }
  }

  discoverPet(petId: string): void {
    const pet = this.state.pets.find(p => p.id === petId);
    if (!pet || pet.owned) return;
    pet.owned = true;
    pet.discoveredAt = Date.now();
    this.state.statistics.totalPetsDiscovered++;
    this.addNotification('pet', 'Novo Pet!', `Descobriu ${pet.icon} ${pet.name}!`, pet.icon, '#9C27B0');
    this.events.emit('pet:discovered', petId);
  }

  // ── Crafting System ────────────────────────────────────────────────────

  startCrafting(recipeId: string): boolean {
    const recipe = this.state.craftingRecipes.find(r => r.id === recipeId);
    if (!recipe || !recipe.discovered) return false;
    if (this.state.craftingQueue.length >= 3) return false;

    // Check ingredients
    for (const ing of recipe.ingredients) {
      const available = this.getResourceAmount(ing.type);
      if (available < ing.amount) return false;
    }

    // Consume ingredients
    for (const ing of recipe.ingredients) {
      this.consumeResource(ing.type, ing.amount);
    }

    const now = Date.now();
    this.state.craftingQueue.push({
      recipeId: recipe.id,
      startedAt: now,
      completesAt: now + recipe.craftTime * 1000
    });

    this.events.emit('craft:started', recipeId);
    return true;
  }

  private tickCrafting(): void {
    const now = Date.now();
    const completed: CraftingQueue[] = [];

    this.state.craftingQueue = this.state.craftingQueue.filter(item => {
      if (now >= item.completesAt) {
        completed.push(item);
        return false;
      }
      return true;
    });

    for (const item of completed) {
      const recipe = this.state.craftingRecipes.find(r => r.id === item.recipeId);
      if (!recipe) continue;

      recipe.timesCrafted++;
      this.state.statistics.totalItemsCrafted++;
      this.applyCraftingResult(recipe);
      this.addNotification('craft', 'Crafting Completo!', `${recipe.icon} ${recipe.name} pronto!`, recipe.icon, '#4CAF50');
      this.events.emit('craft:completed', recipe.id);
    }
  }

  private applyCraftingResult(recipe: CraftingRecipe): void {
    const result = recipe.result;
    switch (result.type) {
      case 'temp_boost':
        this.addBuff(`craft_${recipe.id}`, recipe.name, recipe.icon, 'cps_mult', result.value, (result.duration || 60) * 1000, 'crafting');
        break;
      case 'permanent_mult':
        this.state.prestige.permanentBonuses.push({
          id: `craft_${recipe.id}_${recipe.timesCrafted}`,
          type: 'cps_mult',
          value: result.value,
          source: recipe.name
        });
        this.recalculate();
        break;
      case 'pet_xp':
        this.addPetXp(result.value);
        break;
      case 'skill_point':
        this.state.resources.skillPoints += result.value;
        this.state.statistics.totalSkillPointsEarned += result.value;
        break;
      case 'fragments':
        this.state.resources.hotOilFragments += result.value;
        break;
    }
  }

  private getResourceAmount(type: string): number {
    switch (type) {
      case 'coxinhas': return this.state.resources.coxinhas;
      case 'fragments': return this.state.resources.hotOilFragments;
      case 'stardust': return this.state.resources.stardust;
      case 'golden_essence': return this.state.resources.goldenEssence;
      case 'cosmic_flour': return this.state.resources.cosmicFlour;
      case 'skillPoints': return this.state.resources.skillPoints;
      case 'mana': return this.state.resources.mana;
      case 'darkMatter': return this.state.resources.darkMatter;
      case 'temporalShards': return this.state.resources.temporalShards;
      case 'elementalCrystals': return this.state.resources.elementalCrystals;
      case 'voidEssence': return this.state.resources.voidEssence;
      case 'divineSparks': return this.state.resources.divineSparks;
      case 'reputation': return this.state.resources.reputation;
      case 'relicDust': return this.state.resources.relicDust;
      case 'researchPoints': return this.state.resources.researchPoints;
      case 'gardenSeeds': return this.state.resources.gardenSeeds;
      default: return 0;
    }
  }

  private consumeResource(type: string, amount: number): void {
    switch (type) {
      case 'coxinhas': this.state.resources.coxinhas -= amount; this.state.statistics.totalCoxinhasSpent += amount; break;
      case 'fragments': this.state.resources.hotOilFragments -= amount; break;
      case 'stardust': this.state.resources.stardust -= amount; break;
      case 'golden_essence': this.state.resources.goldenEssence -= amount; break;
      case 'cosmic_flour': this.state.resources.cosmicFlour -= amount; break;
      case 'skillPoints': this.state.resources.skillPoints -= amount; break;
      case 'mana': this.state.resources.mana -= amount; break;
      case 'darkMatter': this.state.resources.darkMatter -= amount; break;
      case 'temporalShards': this.state.resources.temporalShards -= amount; break;
      case 'elementalCrystals': this.state.resources.elementalCrystals -= amount; break;
      case 'voidEssence': this.state.resources.voidEssence -= amount; break;
      case 'divineSparks': this.state.resources.divineSparks -= amount; break;
      case 'reputation': this.state.resources.reputation -= amount; break;
      case 'relicDust': this.state.resources.relicDust -= amount; break;
      case 'researchPoints': this.state.resources.researchPoints -= amount; break;
      case 'gardenSeeds': this.state.resources.gardenSeeds -= amount; break;
    }
  }

  private addResource(type: string, amount: number): void {
    switch (type) {
      case 'coxinhas': this.state.resources.coxinhas += amount; this.state.statistics.totalCoxinhasEarned += amount; break;
      case 'fragments': this.state.resources.hotOilFragments += amount; break;
      case 'stardust': this.state.resources.stardust += amount; break;
      case 'golden_essence': this.state.resources.goldenEssence += amount; break;
      case 'cosmic_flour': this.state.resources.cosmicFlour += amount; break;
      case 'skillPoints': this.state.resources.skillPoints += amount; this.state.statistics.totalSkillPointsEarned += amount; break;
      case 'mana': this.state.resources.mana += amount; break;
      case 'darkMatter': this.state.resources.darkMatter += amount; break;
      case 'temporalShards': this.state.resources.temporalShards += amount; break;
      case 'elementalCrystals': this.state.resources.elementalCrystals += amount; break;
      case 'voidEssence': this.state.resources.voidEssence += amount; break;
      case 'divineSparks': this.state.resources.divineSparks += amount; break;
      case 'reputation': this.state.resources.reputation += amount; break;
      case 'relicDust': this.state.resources.relicDust += amount; break;
      case 'researchPoints': this.state.resources.researchPoints += amount; break;
      case 'gardenSeeds': this.state.resources.gardenSeeds += amount; break;
    }
  }

  // ── Quest System ───────────────────────────────────────────────────────

  private generateDailyQuests(): Quest[] {
    const allQuests = [...QUEST_POOL, ...EXTRA_QUESTS];
    const shuffled = allQuests.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 5).map(q => ({
      ...q,
      id: `${q.id}_${Date.now()}`,
      progress: 0,
      completed: false,
      claimed: false
    }));
  }

  updateQuestProgress(type: string, amount: number): void {
    for (const quest of this.state.quests) {
      if (quest.completed || quest.claimed) continue;
      if (quest.type === type) {
        quest.progress = Math.min(quest.progress + amount, quest.target);
        if (quest.progress >= quest.target && !quest.completed) {
          quest.completed = true;
          this.addNotification('quest', 'Missão Completa!', `${quest.icon} ${quest.name}`, '📋', '#4CAF50');
          this.events.emit('quest:completed', quest.id);
        }
      }
    }
  }

  claimQuest(questId: string): boolean {
    const quest = this.state.quests.find(q => q.id === questId);
    if (!quest || !quest.completed || quest.claimed) return false;

    quest.claimed = true;
    this.state.statistics.totalQuestsCompleted++;

    if (quest.reward.coxinhas) {
      this.state.resources.coxinhas += quest.reward.coxinhas;
      this.state.statistics.totalCoxinhasEarned += quest.reward.coxinhas;
    }
    if (quest.reward.fragments) this.state.resources.hotOilFragments += quest.reward.fragments;
    if (quest.reward.skillPoints) {
      this.state.resources.skillPoints += quest.reward.skillPoints;
      this.state.statistics.totalSkillPointsEarned += quest.reward.skillPoints;
    }
    if (quest.reward.petXp) this.addPetXp(quest.reward.petXp);

    this.events.emit('quest:claimed', questId);
    return true;
  }

  refreshQuests(): void {
    this.state.quests = this.generateDailyQuests();
    this.events.emit('quests:refreshed');
  }

  // ── Random Events ──────────────────────────────────────────────────────

  private checkRandomEvents(): void {
    if (this._activeEvent) return;

    const allEvents = [...RANDOM_EVENTS, ...EXTRA_EVENTS];
    for (const event of allEvents) {
      if (Math.random() < event.chance) {
        this.triggerEvent(event);
        break;
      }
    }
  }

  private triggerEvent(event: RandomEvent): void {
    this._activeEvent = event;
    this._eventEffects.set(event.effect.type, event.effect.value);
    this.recalculate();

    this.addNotification('info', event.name, event.description, event.icon, event.color);

    if (this.activeEventTimeout) clearTimeout(this.activeEventTimeout);
    this.activeEventTimeout = window.setTimeout(() => {
      this._activeEvent = null;
      this._eventEffects.delete(event.effect.type);
      this.recalculate();
      this.events.emit('event:ended', event.id);
    }, event.duration);

    this.events.emit('event:started', event);
  }

  // ── Achievement System ─────────────────────────────────────────────────

  private checkAchievements(): void {
    for (const ach of this.state.achievements) {
      if (ach.unlocked) continue;

      let progress = 0;
      let met = false;
      const cond = ach.condition;

      switch (cond.type) {
        case 'total_clicks': progress = this.state.statistics.totalClicks; met = progress >= cond.value; break;
        case 'total_coxinhas': progress = this.state.statistics.totalCoxinhasEarned; met = progress >= cond.value; break;
        case 'cps': progress = this._cps; met = progress >= cond.value; break;
        case 'building_count': {
          const b = this.state.buildings.find(b => b.id === cond.targetId);
          progress = b?.count ?? 0;
          met = progress >= cond.value;
          break;
        }
        case 'buildings_owned_total': {
          progress = this.state.buildings.reduce((sum, b) => sum + b.count, 0);
          met = progress >= cond.value;
          break;
        }
        case 'upgrade_count': progress = this.state.statistics.totalUpgradesBought; met = progress >= cond.value; break;
        case 'rebirth_count': progress = this.state.prestige.rebirthCount; met = progress >= cond.value; break;
        case 'combo': progress = this.state.statistics.highestCombo; met = progress >= cond.value; break;
        case 'golden_clicked': progress = this.state.statistics.totalGoldenClicked; met = progress >= cond.value; break;
        case 'quest_completed': progress = this.state.statistics.totalQuestsCompleted; met = progress >= cond.value; break;
        case 'achievement_count': progress = this.state.statistics.totalAchievementsUnlocked; met = progress >= cond.value; break;
        case 'play_time': progress = this.state.statistics.totalPlayTimeSeconds; met = progress >= cond.value; break;
        case 'single_click': progress = this.state.statistics.highestClickDamage; met = progress >= cond.value; break;
        case 'night_owl': {
          const hour = new Date().getHours();
          met = hour >= 2 && hour < 5;
          progress = met ? 1 : 0;
          break;
        }
        case 'speed_demon': {
          met = this._cps >= cond.value && this.state.statistics.totalPlayTimeSeconds < 1800;
          progress = this._cps;
          break;
        }
        case 'all_buildings_owned': {
          const allOwned = this.state.buildings.every(b => b.count >= 1);
          met = allOwned;
          progress = allOwned ? 1 : 0;
          break;
        }
      }

      ach.progress = Math.min(progress / cond.value, 1);

      if (met) {
        ach.unlocked = true;
        ach.unlockedAt = Date.now();
        this.state.statistics.totalAchievementsUnlocked++;

        this.addNotification('achievement', 'Conquista!', `${ach.icon} ${ach.name}`, ach.icon, '#FFD700');

        if (this.state.settings.soundEnabled) {
          playSound('achievement', this.state.settings.volume);
        }

        this.recalculate();
        this.events.emit('achievement:unlocked', ach.id);
      }
    }
  }

  // ── Rebirth / Prestige ─────────────────────────────────────────────────

  calculateRebirthFragments(): number {
    const total = this.state.statistics.totalCoxinhasEarned;
    if (total < 1e12) return 0;
    const base = Math.sqrt(total / 1e12);
    const prestigeBonus = 1 + this.state.prestige.totalPrestige / 10;
    const fragmentMult = 1 + this.getSkillBonus('fragment_mult');
    const petBonus = 1 + this.getPetBonus('fragment_boost');
    const achievementBonus = this.getAchievementBonus('fragment_bonus');
    // Bonus for harder rebirths
    const difficultyBonus = 1 + this.state.prestige.rebirthCount * 0.15;
    return Math.floor(base * prestigeBonus * fragmentMult * petBonus * achievementBonus * difficultyBonus);
  }

  getRebirthRequirements(): { tiers: { name: string; buildingIds: string[]; required: number }[]; totalCoxinhasRequired: number; met: boolean } {
    const rc = this.state.prestige.rebirthCount;
    const tiers: { name: string; buildingIds: string[]; required: number }[] = [];

    // Basic tier always required
    tiers.push({ name: 'Básico', buildingIds: ['cursor','grandma','stand','pastry','fryer'], required: Math.min(300, 25 + rc * 25) });

    // Advanced unlocks at rebirth 1+
    if (rc >= 1) {
      tiers.push({ name: 'Avançado', buildingIds: ['truck','restaurant','factory','lab','portal'], required: Math.min(200, 10 + (rc - 1) * 15) });
    }

    // Epic unlocks at rebirth 3+
    if (rc >= 3) {
      tiers.push({ name: 'Épico', buildingIds: ['time_machine','antimatter','prism','quantum','cortex'], required: Math.min(150, 5 + (rc - 3) * 10) });
    }

    // Legendary unlocks at rebirth 5+
    if (rc >= 5) {
      tiers.push({ name: 'Lendário', buildingIds: ['temple','dimension','singularity','multiverse','cosmic_oven'], required: Math.min(100, 3 + (rc - 5) * 5) });
    }

    // Mythic unlocks at rebirth 8+
    if (rc >= 8) {
      tiers.push({ name: 'Mítico', buildingIds: ['nebula_fryer','galactic_chain','universe_bakery','reality_engine','omniscience'], required: Math.min(75, 1 + (rc - 8) * 3) });
    }

    const totalCoxinhasRequired = 1e12 * Math.pow(100, rc);
    let allMet = this.state.statistics.totalCoxinhasEarned >= totalCoxinhasRequired;
    for (const tier of tiers) {
      if (!allMet) break;
      for (const id of tier.buildingIds) {
        const b = this.state.buildings.find(bl => bl.id === id);
        if (!b || b.count < tier.required) { allMet = false; break; }
      }
    }
    return { tiers, totalCoxinhasRequired, met: allMet };
  }

  private generateRebirthUpgrades(): void {
    const rc = this.state.prestige.rebirthCount;
    if (rc === 0) return;
    const newUpgrades: Upgrade[] = [];

    // Per-rebirth click power upgrades
    for (let i = 1; i <= rc && i <= 50; i++) {
      const id = `rebirth_click_${i}`;
      if (this.state.upgrades.find(u => u.id === id)) continue;
      newUpgrades.push({
        id, name: `Poder Renascido ${i}`, description: `Herança do ${i}º renascimento. Clique x${2 + i}.`,
        type: 'click', cost: 1e6 * Math.pow(50, i - 1), multiplier: 2 + i, purchased: false,
        tier: i <= 5 ? 'rare' : i <= 15 ? 'epic' : i <= 30 ? 'legendary' : 'mythic', icon: '🔥',
        unlockCondition: { type: 'total_coxinhas', value: 1e5 * Math.pow(50, i - 1) },
      });
    }

    // Per-rebirth global production upgrades
    for (let i = 1; i <= rc && i <= 50; i++) {
      const id = `rebirth_global_${i}`;
      if (this.state.upgrades.find(u => u.id === id)) continue;
      newUpgrades.push({
        id, name: `Sabedoria Ancestral ${i}`, description: `Memória do ${i}º ciclo. Produção x${(1.5 + i * 0.5).toFixed(1)}.`,
        type: 'global', cost: 1e8 * Math.pow(50, i - 1), multiplier: 1.5 + i * 0.5, purchased: false,
        tier: i <= 5 ? 'rare' : i <= 15 ? 'epic' : i <= 30 ? 'legendary' : 'mythic', icon: '🌟',
        unlockCondition: { type: 'total_coxinhas', value: 1e7 * Math.pow(50, i - 1) },
      });
    }

    // Per-rebirth golden upgrades (1 per 3 rebirths)
    for (let i = 1; i <= Math.floor(rc / 3) && i <= 20; i++) {
      const id = `rebirth_golden_${i}`;
      if (this.state.upgrades.find(u => u.id === id)) continue;
      newUpgrades.push({
        id, name: `Brilho Eterno ${i}`, description: `Coxinhas douradas x${1 + i}.`,
        type: 'golden', cost: 1e7 * Math.pow(100, i - 1), multiplier: 1 + i, purchased: false,
        tier: i <= 3 ? 'epic' : i <= 8 ? 'legendary' : 'mythic', icon: '✨',
        unlockCondition: { type: 'total_coxinhas', value: 1e6 * Math.pow(100, i - 1) },
      });
    }

    // Per-rebirth building boosts (every 2 rebirths, boost a random tier)
    const boostTiers = ['cursor','grandma','stand','pastry','fryer','truck','restaurant','factory','lab','portal'];
    for (let i = 1; i <= Math.floor(rc / 2) && i <= 30; i++) {
      const bId = boostTiers[(i - 1) % boostTiers.length];
      const id = `rebirth_building_${bId}_${Math.ceil(i / boostTiers.length)}`;
      if (this.state.upgrades.find(u => u.id === id)) continue;
      const bName = this.state.buildings.find(b => b.id === bId)?.name || bId;
      newUpgrades.push({
        id, name: `${bName} Renascido ${Math.ceil(i / boostTiers.length)}`,
        description: `${bName} produz x3 pela memória do rebirth.`,
        type: 'building', cost: 1e9 * Math.pow(20, i - 1), multiplier: 3, purchased: false,
        triggerBuildingId: bId,
        tier: i <= 10 ? 'epic' : i <= 20 ? 'legendary' : 'mythic', icon: '🏗️',
        unlockCondition: { type: 'total_coxinhas', value: 1e8 * Math.pow(20, i - 1) },
      });
    }

    if (newUpgrades.length > 0) {
      this.state.upgrades.push(...newUpgrades);
    }
  }

  performRebirth(): boolean {
    const reqs = this.getRebirthRequirements();
    if (!reqs.met) return false;
    const fragments = this.calculateRebirthFragments();
    if (fragments <= 0) return false;

    // Record time
    const rebirthTime = (Date.now() - this.state.statistics.currentSessionStart) / 1000;
    if (rebirthTime < this.state.statistics.fastestRebirth) {
      this.state.statistics.fastestRebirth = rebirthTime;
    }

    // Add fragments & prestige
    this.state.resources.hotOilFragments += fragments;
    this.state.prestige.rebirthCount++;
    this.state.prestige.totalPrestige += fragments;
    this.state.prestige.lastRebirthTime = Date.now();
    this.state.statistics.totalRebirths++;

    // Skill points per rebirth
    const skillPointsEarned = Math.max(1, Math.floor(fragments / 10));
    this.state.resources.skillPoints += skillPointsEarned;
    this.state.statistics.totalSkillPointsEarned += skillPointsEarned;

    // Cosmic flour from rebirths
    if (this.state.prestige.rebirthCount >= 5) {
      const flour = Math.floor(this.state.prestige.rebirthCount / 5);
      this.state.resources.cosmicFlour += flour;
    }

    // Check for pet discoveries on rebirth
    this.checkPetDiscovery();

    // Reset (keep: prestige, skills, pets, achievements, statistics, settings, galaxy, relics, research, enchantments, ascension)
    this.state.resources.coxinhas = 0;
    this.state.buildings = JSON.parse(JSON.stringify([...INITIAL_BUILDINGS, ...EXTRA_BUILDINGS]));
    this.state.upgrades = JSON.parse(JSON.stringify([...INITIAL_UPGRADES, ...EXTRA_UPGRADES]));
    this.generateRebirthUpgrades();
    this.state.quests = this.generateDailyQuests();
    this.state.craftingQueue = [];
    this.state.activeBuffs = [];
    this._comboState = { count: 0, multiplier: 1, timeLeft: 0, maxCombo: this._comboState.maxCombo };
    this._activeEvent = null;
    this._eventEffects.clear();

    // Discover crafting recipes based on rebirths
    this.discoverRecipes();

    this.recalculate();

    if (this.state.settings.soundEnabled) {
      playSound('rebirth', this.state.settings.volume);
    }

    this.addNotification('level', 'REBIRTH!', `+${fragments} fragmentos! +${skillPointsEarned} SP!`, '🔥', '#FF6F00');
    this.events.emit('rebirth', { fragments, rebirthCount: this.state.prestige.rebirthCount });
    this.save();
    return true;
  }

  private checkPetDiscovery(): void {
    const rc = this.state.prestige.rebirthCount;
    // Common pets at early rebirths
    if (rc >= 1) this.discoverPet('pet_cat');
    if (rc >= 2) this.discoverPet('pet_dog');
    if (rc >= 3) this.discoverPet('pet_hamster');
    // Rare pets
    if (rc >= 5) this.discoverPet('pet_parrot');
    if (rc >= 7) this.discoverPet('pet_owl');
    if (rc >= 10) this.discoverPet('pet_fox');
    // Epic pets
    if (rc >= 15) this.discoverPet('pet_dragon');
    if (rc >= 20) this.discoverPet('pet_phoenix');
    if (rc >= 25) this.discoverPet('pet_unicorn');
    // Legendary
    if (rc >= 35) this.discoverPet('pet_cosmic_cat');
    if (rc >= 45) this.discoverPet('pet_golden_goose');
    // Expanded common/rare (early)
    if (rc >= 4) this.discoverPet('pet_bunny');
    if (rc >= 6) this.discoverPet('pet_turtle');
    if (rc >= 8) this.discoverPet('pet_bat');
    if (rc >= 9) this.discoverPet('pet_penguin');
    if (rc >= 11) this.discoverPet('pet_wolf');
    if (rc >= 12) this.discoverPet('pet_eagle');
    if (rc >= 13) this.discoverPet('pet_dolphin');
    if (rc >= 14) this.discoverPet('pet_panda');
    // Expanded epic
    if (rc >= 18) this.discoverPet('pet_gryphon');
    if (rc >= 22) this.discoverPet('pet_hydra');
    if (rc >= 26) this.discoverPet('pet_kraken');
    if (rc >= 28) this.discoverPet('pet_cerberus');
    if (rc >= 30) this.discoverPet('pet_chimera');
    if (rc >= 32) this.discoverPet('pet_leviathan');
    if (rc >= 34) this.discoverPet('pet_djinn');
    if (rc >= 36) this.discoverPet('pet_golem');
    if (rc >= 38) this.discoverPet('pet_sphinx');
    if (rc >= 40) this.discoverPet('pet_pegasus');
    // Expanded legendary
    if (rc >= 42) this.discoverPet('pet_god_cat');
    if (rc >= 48) this.discoverPet('pet_time_dragon');
    if (rc >= 55) this.discoverPet('pet_void_serpent');
    if (rc >= 60) this.discoverPet('pet_celestial_whale');
    if (rc >= 65) this.discoverPet('pet_quantum_wolf');
    if (rc >= 70) this.discoverPet('pet_star_phoenix');
    if (rc >= 75) this.discoverPet('pet_dimension_cat');
    if (rc >= 80) this.discoverPet('pet_world_turtle');
    if (rc >= 85) this.discoverPet('pet_chaos_dragon');
    if (rc >= 90) this.discoverPet('pet_infinity_bird');
    // Mythic
    if (rc >= 100) this.discoverPet('pet_ouroboros');
    if (rc >= 120) this.discoverPet('pet_elder_god');
    if (rc >= 140) this.discoverPet('pet_reality_weaver');
    if (rc >= 160) this.discoverPet('pet_entropy_eater');
    if (rc >= 180) this.discoverPet('pet_genesis_spark');
    if (rc >= 200) this.discoverPet('pet_big_bang_cat');
    if (rc >= 250) this.discoverPet('pet_omega_wolf');
    if (rc >= 300) this.discoverPet('pet_coxinha_spirit');
    if (rc >= 400) this.discoverPet('pet_absolute_dragon');
    if (rc >= 500) this.discoverPet('pet_the_one');
  }

  private discoverRecipes(): void {
    const rc = this.state.prestige.rebirthCount;
    for (const recipe of this.state.craftingRecipes) {
      if (recipe.discovered) continue;
      if (recipe.category === 'consumable' && rc >= 1) recipe.discovered = true;
      if (recipe.category === 'equipment' && rc >= 3) recipe.discovered = true;
      if (recipe.category === 'enchantment' && rc >= 8) recipe.discovered = true;
      if (recipe.category === 'legendary' && rc >= 15) recipe.discovered = true;
    }
  }

  // ── Galaxy Exploration ─────────────────────────────────────────────────

  buyGalaxy(galaxyId: string): boolean {
    const galaxy = this.state.prestige.galaxies[galaxyId];
    if (!galaxy || galaxy.unlocked) return false;
    if (this.state.resources.hotOilFragments < galaxy.cost) return false;

    // Check requirements
    if (galaxy.requirements) {
      for (const req of galaxy.requirements) {
        switch (req.type) {
          case 'rebirth_count':
            if (this.state.prestige.rebirthCount < req.value) return false;
            break;
          case 'fragments':
            if (this.state.resources.hotOilFragments < req.value) return false;
            break;
          case 'achievement_count':
            if (this.state.statistics.totalAchievementsUnlocked < req.value) return false;
            break;
        }
      }
    }

    this.state.resources.hotOilFragments -= galaxy.cost;
    galaxy.unlocked = true;
    this.addNotification('info', 'Galáxia Desbloqueada!', `${galaxy.icon} ${galaxy.name}`, galaxy.icon, '#9C27B0');
    this.events.emit('galaxy:unlocked', galaxyId);
    return true;
  }

  exploreGalaxy(galaxyId: string): void {
    const galaxy = this.state.prestige.galaxies[galaxyId];
    if (!galaxy || !galaxy.unlocked || galaxy.exploration >= 100) return;

    galaxy.exploration = Math.min(100, galaxy.exploration + Math.random() * 5 + 1);

    // Chance to discover planet
    if (Math.random() < 0.3) {
      const types: Array<'rocky' | 'gas' | 'ice' | 'lava' | 'crystal'> = ['rocky', 'gas', 'ice', 'lava', 'crystal'];
      const planet = {
        id: `planet_${Date.now()}`,
        name: `${galaxy.name} ${String.fromCharCode(65 + galaxy.discoveredPlanets.length)}`,
        type: types[Math.floor(Math.random() * types.length)],
        resources: Math.floor(Math.random() * 100) + 10,
        explored: false
      };
      galaxy.discoveredPlanets.push(planet);
      this.addNotification('info', 'Planeta Descoberto!', `${planet.name} (${planet.type})`, '🪐', '#2196F3');
    }

    this.events.emit('galaxy:explored', galaxyId);
  }

  travelToGalaxy(galaxyId: string): void {
    const galaxy = this.state.prestige.galaxies[galaxyId];
    if (!galaxy || !galaxy.unlocked) return;
    this.state.prestige.currentGalaxy = galaxyId;
    this.recalculate();
    this.events.emit('galaxy:traveled', galaxyId);
  }

  // ── Weather System ─────────────────────────────────────────────────────

  private rotateWeather(): void {
    // Weighted random based on rarity
    const weights: Record<string, number> = { common: 40, rare: 25, epic: 15, legendary: 5 };
    const totalWeight = WEATHER_TYPES.reduce((s, w) => s + (weights[w.rarity] || 10), 0);
    let roll = Math.random() * totalWeight;
    let chosen = WEATHER_TYPES[0];
    for (const wt of WEATHER_TYPES) {
      roll -= weights[wt.rarity] || 10;
      if (roll <= 0) { chosen = wt; break; }
    }
    this.state.weather = {
      current: JSON.parse(JSON.stringify(chosen)),
      changesAt: Date.now() + chosen.duration,
      history: [...(this.state.weather?.history || []).slice(-19), chosen.id]
    };
    this.recalculate();
    this.addNotification('info', `Clima: ${chosen.icon} ${chosen.name}`, chosen.description, chosen.icon, '#64B5F6');
    this.events.emit('weather:changed', chosen.id);
  }

  // ── Spell System ───────────────────────────────────────────────────────

  castSpell(spellId: string): boolean {
    const spell = this.state.spells.find(s => s.id === spellId);
    if (!spell || !spell.unlocked) return false;
    const now = Date.now();
    if (now - spell.lastCast < spell.cooldown) return false;
    if (this.state.resources.mana < spell.manaCost) return false;

    this.state.resources.mana -= spell.manaCost;
    spell.lastCast = now;

    // Apply spell effect as buff
    const effectValue = spell.effect.value + spell.effect.scaling * (spell.level - 1);
    const buffType = spell.effect.type === 'cost_reduction' ? 'cost_reduction' :
      spell.effect.type === 'golden_rate' ? 'golden_rate' :
      spell.effect.type === 'click_mult' ? 'click_mult' :
      spell.effect.type === 'combo_boost' ? 'combo_boost' : 'cps_mult';
    this.addBuff(`spell_${spell.id}`, spell.name, spell.icon, buffType as any, effectValue, spell.duration, 'spell');

    this.events.emit('spell:cast', spellId);
    return true;
  }

  upgradeSpell(spellId: string): boolean {
    const spell = this.state.spells.find(s => s.id === spellId);
    if (!spell || spell.level >= spell.maxLevel) return false;
    const cost = spell.manaCost * spell.level * 5;
    if (this.state.resources.mana < cost) return false;
    this.state.resources.mana -= cost;
    spell.level++;
    this.events.emit('spell:upgraded', spellId);
    return true;
  }

  // ── Relic System ───────────────────────────────────────────────────────

  equipRelic(relicId: string): boolean {
    const relic = this.state.relics.find(r => r.id === relicId);
    if (!relic || !relic.owned) return false;
    const equippedCount = this.state.relics.filter(r => r.equipped).length;
    if (!relic.equipped && equippedCount >= 5) return false; // max 5 equipped
    relic.equipped = !relic.equipped;
    this.recalculate();
    this.events.emit('relic:toggled', relicId);
    return true;
  }

  upgradeRelic(relicId: string): boolean {
    const relic = this.state.relics.find(r => r.id === relicId);
    if (!relic || !relic.owned || relic.level >= relic.maxLevel) return false;
    const cost = (relic.level + 1) * 10;
    if (this.state.resources.relicDust < cost) return false;
    this.state.resources.relicDust -= cost;
    relic.level++;
    this.recalculate();
    this.events.emit('relic:upgraded', relicId);
    return true;
  }

  // ── Research System ────────────────────────────────────────────────────

  conductResearch(nodeId: string): boolean {
    const node = this.state.research.find(r => r.id === nodeId);
    if (!node || (node.completed && !node.repeatable)) return false;
    // Check prerequisites
    if (!node.prerequisites.every(pid => this.state.research.find(r => r.id === pid)?.completed)) return false;
    // Check cost
    for (const c of node.cost) {
      if (this.getResourceAmount(c.type) < c.amount) return false;
    }
    // Pay cost
    for (const c of node.cost) {
      this.consumeResource(c.type, c.amount);
    }
    node.completed = true;
    node.timesCompleted++;
    this.recalculate();
    this.addNotification('info', 'Pesquisa Concluída!', `${node.icon} ${node.name}`, node.icon, '#2196F3');
    this.events.emit('research:completed', nodeId);
    return true;
  }

  // ── Expedition System ──────────────────────────────────────────────────

  startExpedition(expId: string): boolean {
    const exp = this.state.expeditions.find(e => e.id === expId);
    if (!exp || exp.active) return false;
    // Check if any expedition already active
    if (this.state.expeditions.some(e => e.active)) return false;
    // Check requirements
    for (const req of exp.requirements) {
      if (req.type === 'level' && this.state.player.level < req.value) return false;
    }
    const now = Date.now();
    exp.active = true;
    exp.startedAt = now;
    exp.completesAt = now + exp.duration;
    this.addNotification('info', 'Expedição Iniciada!', `${exp.icon} ${exp.name}`, exp.icon, '#FF9800');
    this.events.emit('expedition:started', expId);
    return true;
  }

  private tickExpeditions(): void {
    const now = Date.now();
    for (const exp of this.state.expeditions) {
      if (!exp.active || now < exp.completesAt) continue;
      exp.active = false;
      exp.completed = true;
      exp.timesCompleted++;
      // Grant rewards
      for (const reward of exp.rewards) {
        if (Math.random() < reward.chance) {
          if (reward.type === 'relic') {
            // Discover a random unowned relic
            const unowned = this.state.relics.filter(r => !r.owned);
            if (unowned.length > 0) {
              const relic = unowned[Math.floor(Math.random() * unowned.length)];
              relic.owned = true;
              this.addNotification('info', 'Relíquia Encontrada!', `${relic.icon} ${relic.name}`, relic.icon, '#FFD700');
            }
          } else {
            this.addResource(reward.type, reward.amount);
          }
        }
      }
      this.addNotification('info', 'Expedição Concluída!', `${exp.icon} ${exp.name} retornou!`, exp.icon, '#4CAF50');
      this.events.emit('expedition:completed', exp.id);
    }
  }

  // ── Boss System ────────────────────────────────────────────────────────

  startBossFight(bossId: string): boolean {
    if (this.state.activeBoss) return false;
    const boss = this.state.bosses.find(b => b.id === bossId);
    if (!boss) return false;
    // Reset HP
    boss.currentHp = boss.maxHp;
    this.state.activeBoss = boss;
    this.addNotification('info', 'BOSS!', `${boss.icon} ${boss.name} apareceu!`, boss.icon, '#F44336');
    this.events.emit('boss:started', bossId);
    return true;
  }

  attackBoss(): number {
    if (!this.state.activeBoss) return 0;
    const damage = Math.max(1, this._clickPower * 0.1 + this._cps * 0.01);
    this.state.activeBoss.currentHp -= damage;
    if (this.state.activeBoss.currentHp <= 0) {
      this.defeatBoss();
    }
    this.events.emit('boss:attacked', damage);
    return damage;
  }

  private tickBoss(dt: number): void {
    if (!this.state.activeBoss) return;
    // Auto-damage from CPS
    const autoDmg = this._cps * 0.005 * dt;
    this.state.activeBoss.currentHp -= autoDmg;
    if (this.state.activeBoss.currentHp <= 0) {
      this.defeatBoss();
    }
  }

  private defeatBoss(): void {
    const boss = this.state.activeBoss;
    if (!boss) return;
    boss.currentHp = 0;
    boss.defeated = true;
    boss.timesDefeated++;
    // Grant rewards
    for (const reward of boss.rewards) {
      if (reward.type === 'relic') {
        const unowned = this.state.relics.filter(r => !r.owned);
        if (unowned.length > 0) {
          const relic = unowned[Math.floor(Math.random() * unowned.length)];
          relic.owned = true;
          this.addNotification('info', 'Relíquia do Boss!', `${relic.icon} ${relic.name}`, relic.icon, '#FFD700');
        }
      } else {
        this.addResource(reward.type, reward.amount);
      }
    }
    this.state.activeBoss = null;
    this.addNotification('info', 'Boss Derrotado!', `${boss.icon} ${boss.name} foi derrotado!`, boss.icon, '#4CAF50');
    this.events.emit('boss:defeated', boss.id);
  }

  // ── Garden System ──────────────────────────────────────────────────────

  plantSeed(plotIndex: number, seedId: string): boolean {
    if (plotIndex < 0 || plotIndex >= this.state.garden.length) return false;
    const plot = this.state.garden[plotIndex];
    if (plot.seed) return false;
    const seedData = INITIAL_SEEDS.find(s => s.id === seedId);
    if (!seedData) return false;
    // Check if we have seeds (simplified: costs coxinhas)
    const seedCost = seedData.rarity === 'common' ? 1e6 : seedData.rarity === 'rare' ? 1e10 : seedData.rarity === 'epic' ? 1e15 : seedData.rarity === 'legendary' ? 1e20 : 1e25;
    if (this.state.resources.coxinhas < seedCost) return false;
    this.state.resources.coxinhas -= seedCost;

    const now = Date.now();
    plot.seed = JSON.parse(JSON.stringify(seedData));
    plot.plantedAt = now;
    plot.harvestAt = now + seedData.growTime;
    plot.watered = false;
    plot.fertilized = false;
    this.events.emit('garden:planted', { plotIndex, seedId });
    return true;
  }

  waterPlot(plotIndex: number): boolean {
    const plot = this.state.garden[plotIndex];
    if (!plot?.seed || plot.watered) return false;
    plot.watered = true;
    // Watering reduces grow time by 20%
    const timeRemaining = plot.harvestAt - Date.now();
    plot.harvestAt -= timeRemaining * 0.2;
    this.events.emit('garden:watered', plotIndex);
    return true;
  }

  harvestPlot(plotIndex: number): boolean {
    const plot = this.state.garden[plotIndex];
    if (!plot?.seed || Date.now() < plot.harvestAt) return false;
    // Grant yield
    const seed = plot.seed;
    let amount = seed.yield.amount;
    if (plot.watered) amount *= 1.5;
    if (plot.fertilized) amount *= 2;
    this.addResource(seed.yield.type, amount);
    // Reset plot
    plot.seed = null;
    plot.plantedAt = 0;
    plot.harvestAt = 0;
    plot.watered = false;
    plot.fertilized = false;
    this.addNotification('info', 'Colheita!', `${seed.icon} ${seed.name} colhido!`, seed.icon, '#4CAF50');
    this.events.emit('garden:harvested', plotIndex);
    return true;
  }

  private tickGarden(): void {
    // Just emit for UI updates; harvest is manual
  }

  // ── Trading System ─────────────────────────────────────────────────────

  makeTrade(tradeId: string): boolean {
    const trade = this.state.tradeOffers.find(t => t.id === tradeId);
    if (!trade || !trade.available || trade.timesTraded >= trade.maxTrades) return false;
    if (this.getResourceAmount(trade.give.type) < trade.give.amount) return false;
    this.consumeResource(trade.give.type, trade.give.amount);
    this.addResource(trade.receive.type, trade.receive.amount);
    trade.timesTraded++;
    if (trade.timesTraded >= trade.maxTrades) trade.available = false;
    this.state.resources.reputation += 1;
    this.events.emit('trade:completed', tradeId);
    return true;
  }

  private tickTrades(): void {
    const now = Date.now();
    for (const trade of this.state.tradeOffers) {
      if (!trade.available && trade.refreshesAt > 0 && now >= trade.refreshesAt) {
        trade.available = true;
        trade.timesTraded = 0;
        trade.refreshesAt = 0;
      }
      if (!trade.available && trade.refreshesAt === 0) {
        trade.refreshesAt = now + 600000; // 10 min
      }
    }
  }

  // ── Enchantment System ─────────────────────────────────────────────────

  upgradeEnchantment(encId: string): boolean {
    const enc = this.state.enchantments.find(e => e.id === encId);
    if (!enc || !enc.unlocked || enc.level >= enc.maxLevel) return false;
    // Check cost scaled by level
    for (const c of enc.costPerLevel) {
      const scaledAmount = c.amount * (enc.level + 1);
      if (this.getResourceAmount(c.type) < scaledAmount) return false;
    }
    for (const c of enc.costPerLevel) {
      this.consumeResource(c.type, c.amount * (enc.level + 1));
    }
    enc.level++;
    // Unlock next enchantments at certain levels
    if (enc.level >= 5) {
      for (const e of this.state.enchantments) {
        if (!e.unlocked) { e.unlocked = true; break; }
      }
    }
    this.recalculate();
    this.events.emit('enchantment:upgraded', encId);
    return true;
  }

  // ── Mini-Game System ───────────────────────────────────────────────────

  playMiniGame(gameId: string): { won: boolean; reward: number } {
    const game = this.state.miniGames.find(g => g.id === gameId);
    if (!game || !game.unlocked) return { won: false, reward: 0 };
    const now = Date.now();
    if (now - game.lastPlayed < game.cooldown) return { won: false, reward: 0 };
    if (this.getResourceAmount(game.cost.type) < game.cost.amount) return { won: false, reward: 0 };

    this.consumeResource(game.cost.type, game.cost.amount);
    game.lastPlayed = now;
    game.timesPlayed++;

    // Simple luck-based outcome
    const roll = Math.random();
    let multiplier = 0;
    if (game.type === 'lucky_wheel') {
      multiplier = roll < 0.1 ? 10 : roll < 0.3 ? 5 : roll < 0.6 ? 2 : roll < 0.8 ? 1 : 0;
    } else if (game.type === 'slots') {
      multiplier = roll < 0.05 ? 50 : roll < 0.15 ? 10 : roll < 0.4 ? 3 : 0;
    } else if (game.type === 'scratch') {
      multiplier = roll < 0.2 ? 5 : roll < 0.5 ? 2 : roll < 0.8 ? 1 : 0;
    } else {
      multiplier = roll < 0.3 ? 5 : roll < 0.6 ? 2 : 0;
    }

    const reward = game.cost.amount * multiplier;
    if (reward > 0) {
      this.addResource(game.cost.type, reward);
      game.totalWinnings += reward;
    }

    const won = multiplier > 0;
    this.events.emit('minigame:played', { gameId, won, reward });
    return { won, reward };
  }

  // ── Ascension (Multi-layer Prestige) ───────────────────────────────────

  canAscend(): boolean {
    return this.state.prestige.rebirthCount >= 50;
  }

  performAscension(): boolean {
    if (!this.canAscend()) return false;
    const layer = this.state.ascension.layers[0]; // First layer = Rebirth
    layer.count++;
    layer.totalPower += this.state.prestige.rebirthCount;
    layer.multiplier = 1 + layer.totalPower * 0.1;

    this.state.ascension.totalAscensions++;
    this.state.ascension.ascensionPower += this.state.prestige.rebirthCount * 10;

    // Super reset: reset prestige too
    this.state.prestige.rebirthCount = 0;
    this.state.prestige.totalPrestige = 0;
    this.state.resources = createDefaultResources();
    this.state.buildings = JSON.parse(JSON.stringify([...INITIAL_BUILDINGS, ...EXTRA_BUILDINGS]));
    this.state.upgrades = JSON.parse(JSON.stringify([...INITIAL_UPGRADES, ...EXTRA_UPGRADES]));
    this.state.quests = this.generateDailyQuests();
    this.state.craftingQueue = [];
    this.state.activeBuffs = [];

    this.recalculate();
    this.addNotification('level', 'ASCENSÃO!', `Poder de ascensão: ${this.state.ascension.ascensionPower}!`, '🌟', '#FFD700');
    this.events.emit('ascension', { power: this.state.ascension.ascensionPower });
    this.save();
    return true;
  }

  // ── Artifact System ────────────────────────────────────────────────────

  equipArtifact(artifactId: string): boolean {
    const art = this.state.artifacts.find(a => a.id === artifactId);
    if (!art || !art.owned) return false;
    const equippedCount = this.state.artifacts.filter(a => a.equipped).length;
    if (!art.equipped && equippedCount >= 6) return false;
    art.equipped = !art.equipped;
    this.recalculate();
    this.events.emit('artifact:toggled', artifactId);
    return true;
  }

  getArtifactSetBonuses(): { type: string; value: number }[] {
    const bonuses: { type: string; value: number }[] = [];
    for (const set of ARTIFACT_SETS) {
      const equippedPieces = set.pieces.filter(pid =>
        this.state.artifacts.find(a => a.id === pid && a.equipped)
      ).length;
      for (const bonus of set.bonuses) {
        if (equippedPieces >= bonus.piecesRequired) {
          bonuses.push(bonus.effect);
        }
      }
    }
    return bonuses;
  }

  // ── XP / Level System ─────────────────────────────────────────────────

  private addXp(amount: number): void {
    if (amount <= 0) return;
    const xpBonus = this.getPetBonus('xp_boost');
    const finalXp = amount * (1 + xpBonus);
    this.state.player.xp += finalXp;

    while (this.state.player.xp >= this.state.player.xpToNext) {
      this.state.player.xp -= this.state.player.xpToNext;
      this.state.player.level++;
      this.state.player.xpToNext = Math.floor(100 * Math.pow(1.2, this.state.player.level - 1));

      // Skill point every level
      this.state.resources.skillPoints++;
      this.state.statistics.totalSkillPointsEarned++;

      // Titles
      if (this.state.player.level >= 50 && !this.state.player.titles.includes('Veterano')) {
        this.state.player.titles.push('Veterano');
      }
      if (this.state.player.level >= 100 && !this.state.player.titles.includes('Mestre')) {
        this.state.player.titles.push('Mestre');
      }

      this.addNotification('level', 'Level Up!', `Nível ${this.state.player.level}! +1 SP`, '⬆️', '#4CAF50');
      if (this.state.settings.soundEnabled) playSound('levelup', this.state.settings.volume);
      this.events.emit('player:levelup', this.state.player.level);
    }
  }

  // ── Buffs ──────────────────────────────────────────────────────────────

  addBuff(id: string, name: string, icon: string, type: ActiveBuff['type'], value: number, duration: number, source: string): void {
    // Remove existing buff with same id
    this.state.activeBuffs = this.state.activeBuffs.filter(b => b.id !== id);
    this.state.activeBuffs.push({
      id, name, icon, type, value,
      expiresAt: Date.now() + duration,
      source
    });
    this.recalculate();
  }

  private tickBuffs(): void {
    const now = Date.now();
    const before = this.state.activeBuffs.length;
    this.state.activeBuffs = this.state.activeBuffs.filter(b => b.expiresAt > now);
    if (this.state.activeBuffs.length !== before) {
      this.recalculate();
    }
  }

  // ── Notifications ──────────────────────────────────────────────────────

  addNotification(type: Notification['type'], title: string, message: string, icon: string, color: string): void {
    if (!this.state.settings.notificationsEnabled) return;
    this.state.notifications.push({
      id: ++this.notificationId,
      type, title, message, icon, color,
      timestamp: Date.now(),
      duration: 4000
    });
    // Keep only last 20
    if (this.state.notifications.length > 20) {
      this.state.notifications = this.state.notifications.slice(-20);
    }
    this.events.emit('notification', { type, title, message, icon, color });
  }

  dismissNotification(id: number): void {
    this.state.notifications = this.state.notifications.filter(n => n.id !== id);
  }

  // ── Recalculate ────────────────────────────────────────────────────────

  private getAchievementBonus(type: string): number {
    let mult = 1;
    for (const ach of this.state.achievements) {
      if (ach.unlocked && ach.reward.type === type) {
        mult *= ach.reward.value;
      }
    }
    return mult;
  }

  recalculate(): void {
    // CPS
    let totalCps = 0;
    for (const b of this.state.buildings) {
      totalCps += this.getBuildingCps(b);
    }

    // Global upgrades
    let globalMult = 1;
    for (const u of this.state.upgrades) {
      if (u.purchased && u.type === 'global') {
        globalMult *= u.multiplier;
      }
    }

    // Skill bonuses
    const cpsMult = 1 + this.getSkillBonus('cps_mult');
    const allMult = 1 + this.getSkillBonus('all_mult');

    // Pet bonuses
    const petCps = 1 + this.getPetBonus('cps_boost');

    // Achievement bonuses
    const achCpsMult = this.getAchievementBonus('cps_mult');
    const achFlatCps = this.state.achievements.reduce((sum, a) => 
      sum + (a.unlocked && a.reward.type === 'flat_cps' ? a.reward.value : 0), 0);

    // Prestige bonuses
    const prestigeMult = 1 + this.state.prestige.totalPrestige * 0.01;

    // Galaxy multiplier
    const currentGalaxy = this.state.prestige.galaxies[this.state.prestige.currentGalaxy];
    const galaxyMult = currentGalaxy?.multiplier ?? 1;

    // Galaxy upgrades
    let galaxyUpgradeMult = 1;
    for (const gu of this.state.prestige.galaxyUpgrades) {
      if (gu.purchased && gu.effect.type === 'cps_mult') {
        galaxyUpgradeMult *= gu.effect.value;
      }
    }

    // Permanent bonuses
    let permanentMult = 1;
    for (const pb of this.state.prestige.permanentBonuses) {
      if (pb.type === 'cps_mult') permanentMult *= pb.value;
    }

    // Buff bonuses
    let buffCpsMult = 1;
    for (const buff of this.state.activeBuffs) {
      if (buff.type === 'cps_mult') buffCpsMult *= buff.value;
    }

    // Event effects
    const eventCpsMult = this._eventEffects.get('cps_mult') || 1;
    const cpsHalt = this._eventEffects.has('cps_halt');

    // Weather effects
    let weatherCpsMult = 1;
    let weatherClickMult = 1;
    let weatherGoldenMult = 1;
    if (this.state.weather?.current) {
      for (const eff of this.state.weather.current.effects) {
        if (eff.type === 'cps_mult') weatherCpsMult *= eff.value;
        if (eff.type === 'click_mult') weatherClickMult *= eff.value;
        if (eff.type === 'golden_rate') weatherGoldenMult *= eff.value;
      }
    }

    // Relic bonuses
    let relicCpsMult = 1;
    let relicClickMult = 1;
    let relicGoldenMult = 1;
    for (const relic of this.state.relics) {
      if (relic.owned && relic.equipped && relic.level > 0) {
        const val = relic.effect.value * relic.level;
        if (relic.effect.type === 'cps_mult') relicCpsMult += val;
        if (relic.effect.type === 'click_mult') relicClickMult += val;
        if (relic.effect.type === 'golden_rate') relicGoldenMult += val;
      }
    }

    // Research bonuses
    let researchCpsMult = 1;
    let researchClickMult = 1;
    for (const node of this.state.research) {
      if (node.completed) {
        if (node.effect.type === 'cps_mult') researchCpsMult += node.effect.value;
        if (node.effect.type === 'click_mult') researchClickMult += node.effect.value;
      }
    }

    // Enchantment bonuses
    let enchCpsMult = 1;
    let enchClickMult = 1;
    let enchGoldenMult = 1;
    for (const enc of this.state.enchantments) {
      if (enc.level > 0) {
        const val = enc.effect.value * enc.level;
        if (enc.effect.type === 'cps_mult') enchCpsMult += val;
        if (enc.effect.type === 'click_mult') enchClickMult += val;
        if (enc.effect.type === 'golden_rate') enchGoldenMult += val;
      }
    }

    // Artifact set bonuses
    let artifactCpsMult = 1;
    let artifactGoldenMult = 1;
    for (const art of this.state.artifacts) {
      if (art.owned && art.equipped) {
        if (art.effect.type === 'cps_mult') artifactCpsMult += art.effect.value;
        if (art.effect.type === 'click_mult') enchClickMult += art.effect.value;
        if (art.effect.type === 'golden_rate') artifactGoldenMult += art.effect.value;
      }
    }
    const setBonuses = this.getArtifactSetBonuses();
    for (const b of setBonuses) {
      if (b.type === 'cps_mult') artifactCpsMult += b.value;
      if (b.type === 'golden_rate') artifactGoldenMult += b.value;
    }

    // Ascension power
    const ascensionMult = 1 + this.state.ascension.ascensionPower * 0.01;

    this._globalMult = globalMult * cpsMult * allMult * petCps * achCpsMult * prestigeMult * galaxyMult * galaxyUpgradeMult * permanentMult * buffCpsMult * eventCpsMult * weatherCpsMult * relicCpsMult * researchCpsMult * enchCpsMult * artifactCpsMult * ascensionMult;
    this._cps = cpsHalt ? 0 : (totalCps * this._globalMult + achFlatCps);

    // Click Power
    let clickPower = 1;
    const clickSkillBonus = 1 + this.getSkillBonus('click_power');
    const petClickBonus = 1 + this.getPetBonus('click_boost');
    const achClickMult = this.getAchievementBonus('click_mult');
    let clickUpgradeMult = 1;
    for (const u of this.state.upgrades) {
      if (u.purchased && u.type === 'click') {
        clickUpgradeMult *= u.multiplier;
      }
    }
    // Galaxy click upgrade
    let galaxyClickMult = 1;
    for (const gu of this.state.prestige.galaxyUpgrades) {
      if (gu.purchased && gu.effect.type === 'click_mult') {
        galaxyClickMult *= gu.effect.value;
      }
    }

    clickPower = clickUpgradeMult * clickSkillBonus * petClickBonus * achClickMult * allMult * galaxyClickMult * prestigeMult * weatherClickMult * relicClickMult * researchClickMult * enchClickMult * ascensionMult;
    // Add 1% of CPS as click power
    clickPower += this._cps * 0.01;
    this._clickPower = Math.max(1, clickPower);

    // Critical hit
    this._critChance = 0.02 + this.getSkillBonus('crit_chance') + this.getPetBonus('crit_boost');
    this._critMult = 7 + this.getSkillBonus('crit_mult');

    // Golden spawn rate
    let goldenRate = 1;
    for (const u of this.state.upgrades) {
      if (u.purchased && u.type === 'golden') goldenRate *= u.multiplier;
    }
    goldenRate *= (1 + this.getSkillBonus('golden_rate'));
    goldenRate *= (1 + this.getPetBonus('golden_boost'));
    goldenRate *= this.getAchievementBonus('golden_rate');
    for (const gu of this.state.prestige.galaxyUpgrades) {
      if (gu.purchased && gu.effect.type === 'golden_rate') goldenRate *= gu.effect.value;
    }
    goldenRate *= weatherGoldenMult * relicGoldenMult * enchGoldenMult * artifactGoldenMult;
    this._goldenSpawnRate = goldenRate;

    // Update state computed values
    this.state.cps = this._cps;
    this.state.clickPower = this._clickPower;
    this.state.globalMultiplier = this._globalMult;

    this.events.emit('recalculated');
  }

  // ── Getters ────────────────────────────────────────────────────────────

  get cps(): number { return this._cps; }
  get clickPower(): number { return this._clickPower; }
  get globalMultiplier(): number { return this._globalMult; }
  get goldenSpawnRate(): number { return this._goldenSpawnRate; }
  get critChance(): number { return this._critChance; }
  get critMult(): number { return this._critMult; }
  get comboState(): ComboState { return this._comboState; }
  get activeEvent(): RandomEvent | null { return this._activeEvent; }

  // ── Auto-Buyer System ──────────────────────────────────────────────────

  private tickAutoBuyers(): void {
    const now = Date.now();
    for (const ab of this.state.autoBuyers) {
      if (!ab.enabled) continue;
      if (ab.maxCount > 0) {
        const building = this.state.buildings.find(b => b.id === ab.buildingId);
        if (building && building.count >= ab.maxCount) continue;
      }
      if (now - ab.lastBought >= ab.interval * 1000) {
        const success = this.buyBuilding(ab.buildingId);
        if (success) {
          ab.lastBought = now;
          ab.totalBought++;
        }
      }
    }
  }

  initializeAutoBuyers(): void {
    // Create auto-buyers for all buildings if they don't exist
    for (const b of this.state.buildings) {
      if (!this.state.autoBuyers.find(ab => ab.buildingId === b.id)) {
        this.state.autoBuyers.push({
          id: `ab_${b.id}`,
          buildingId: b.id,
          enabled: false,
          interval: 10, // 10 seconds
          lastBought: 0,
          priority: this.state.buildings.indexOf(b),
          maxCount: 0,
          totalBought: 0,
        });
      }
    }
  }

  toggleAutoBuyer(buildingId: string): boolean {
    let ab = this.state.autoBuyers.find(a => a.buildingId === buildingId);
    if (!ab) {
      this.initializeAutoBuyers();
      ab = this.state.autoBuyers.find(a => a.buildingId === buildingId);
    }
    if (!ab) return false;
    ab.enabled = !ab.enabled;
    this.events.emit('autobuyer:toggled', { buildingId, enabled: ab.enabled });
    return ab.enabled;
  }

  setAutoBuyerInterval(buildingId: string, interval: number): void {
    const ab = this.state.autoBuyers.find(a => a.buildingId === buildingId);
    if (ab) ab.interval = Math.max(1, interval);
  }

  toggleAllAutoBuyers(enabled: boolean): void {
    if (this.state.autoBuyers.length === 0) this.initializeAutoBuyers();
    for (const ab of this.state.autoBuyers) {
      ab.enabled = enabled;
    }
    this.events.emit('autobuyer:toggled', { all: true, enabled });
  }

  // ── Offline Progress ───────────────────────────────────────────────────

  private calculateOfflineProgress(): void {
    const lastSaved = this.state.statistics.currentSessionStart;
    if (!lastSaved) return;

    const now = Date.now();
    const offlineSeconds = Math.min((now - lastSaved) / 1000, 86400); // max 24h
    if (offlineSeconds < 60) return; // min 1 minute

    const offlineMult = 0.1 + this.getSkillBonus('offline_mult'); // Base 10% of CPS
    const offlineEarnings = this._cps * offlineSeconds * offlineMult;

    if (offlineEarnings > 0) {
      this.state.resources.coxinhas += offlineEarnings;
      this.state.statistics.totalCoxinhasEarned += offlineEarnings;
      this.state.statistics.totalOfflineEarnings += offlineEarnings;

      this.addNotification('info', 'Ganhos Offline!', 
        `Enquanto esteve fora, produziu ${formatNumber(offlineEarnings)} coxinhas!`, '💤', '#2196F3');
    }

    this.state.statistics.currentSessionStart = now;
  }

  // ── Save / Load ────────────────────────────────────────────────────────

  save(): void {
    try {
      const saveData = {
        version: SAVE_VERSION,
        timestamp: Date.now(),
        player: this.state.player,
        resources: this.state.resources,
        buildings: this.state.buildings.map(b => ({ id: b.id, count: b.count, totalProduced: b.totalProduced })),
        upgrades: this.state.upgrades.filter(u => u.purchased).map(u => u.id),
        achievements: this.state.achievements.filter(a => a.unlocked).map(a => a.id),
        skills: this.state.skills.map(s => ({ id: s.id, level: s.currentLevel })),
        pets: this.state.pets.map(p => ({ id: p.id, level: p.level, xp: p.xp, owned: p.owned, active: p.active })),
        craftingDiscovered: this.state.craftingRecipes.filter(r => r.discovered).map(r => r.id),
        craftingTimesCrafted: Object.fromEntries(this.state.craftingRecipes.map(r => [r.id, r.timesCrafted])),
        craftingQueue: this.state.craftingQueue,
        challenges: this.state.challenges.map(c => ({ id: c.id, completed: c.completed, completedCount: c.completedCount, bestTime: c.bestTime })),
        quests: this.state.quests.map(q => ({ id: q.id, progress: q.progress, completed: q.completed, claimed: q.claimed })),
        statistics: this.state.statistics,
        prestige: this.state.prestige,
        activeBuffs: this.state.activeBuffs,
        settings: this.state.settings,
        // New systems
        relics: this.state.relics.map(r => ({ id: r.id, owned: r.owned, equipped: r.equipped, level: r.level })),
        research: this.state.research.map(r => ({ id: r.id, completed: r.completed, timesCompleted: r.timesCompleted })),
        spells: this.state.spells.map(s => ({ id: s.id, level: s.level, unlocked: s.unlocked, lastCast: s.lastCast })),
        expeditions: this.state.expeditions.map(e => ({ id: e.id, completed: e.completed, timesCompleted: e.timesCompleted, active: e.active, startedAt: e.startedAt, completesAt: e.completesAt })),
        bosses: this.state.bosses.map(b => ({ id: b.id, defeated: b.defeated, timesDefeated: b.timesDefeated })),
        artifacts: this.state.artifacts.map(a => ({ id: a.id, owned: a.owned, equipped: a.equipped })),
        enchantments: this.state.enchantments.map(e => ({ id: e.id, level: e.level, unlocked: e.unlocked })),
        tradeOffers: this.state.tradeOffers.map(t => ({ id: t.id, timesTraded: t.timesTraded, available: t.available, refreshesAt: t.refreshesAt })),
        miniGames: this.state.miniGames.map(g => ({ id: g.id, timesPlayed: g.timesPlayed, lastPlayed: g.lastPlayed, unlocked: g.unlocked, totalWinnings: g.totalWinnings })),
        garden: this.state.garden,
        weather: this.state.weather,
        ascension: this.state.ascension,
        lastSaved: Date.now()
      };
      localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
      this.events.emit('game:saved');
    } catch (e) {
      console.error('Save failed:', e);
    }
  }

  load(): void {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) {
        // Try loading legacy save
        this.loadLegacy();
        return;
      }

      const data = JSON.parse(raw);
      if (!data || data.version !== SAVE_VERSION) {
        this.loadLegacy();
        return;
      }

      // Restore player
      if (data.player) Object.assign(this.state.player, data.player);

      // Restore resources
      if (data.resources) Object.assign(this.state.resources, data.resources);

      // Restore buildings
      if (data.buildings) {
        for (const saved of data.buildings) {
          const b = this.state.buildings.find(b => b.id === saved.id);
          if (b) { b.count = saved.count; b.totalProduced = saved.totalProduced || 0; }
        }
      }

      // Restore upgrades
      if (data.upgrades) {
        for (const id of data.upgrades) {
          const u = this.state.upgrades.find(u => u.id === id);
          if (u) u.purchased = true;
        }
      }

      // Restore achievements
      if (data.achievements) {
        for (const id of data.achievements) {
          const a = this.state.achievements.find(a => a.id === id);
          if (a) { a.unlocked = true; }
        }
      }

      // Restore skills
      if (data.skills) {
        for (const saved of data.skills) {
          const s = this.state.skills.find(s => s.id === saved.id);
          if (s) s.currentLevel = saved.level;
        }
        // Re-unlock skills based on prerequisites
        for (const skill of this.state.skills) {
          if (skill.prerequisites.length === 0) { skill.unlocked = true; continue; }
          skill.unlocked = skill.prerequisites.every(pid => {
            const prereq = this.state.skills.find(s => s.id === pid);
            return prereq && prereq.currentLevel > 0;
          });
        }
      }

      // Restore pets
      if (data.pets) {
        for (const saved of data.pets) {
          const p = this.state.pets.find(p => p.id === saved.id);
          if (p) { p.level = saved.level; p.xp = saved.xp; p.owned = saved.owned; p.active = saved.active; }
        }
      }

      // Restore crafting
      if (data.craftingDiscovered) {
        for (const id of data.craftingDiscovered) {
          const r = this.state.craftingRecipes.find(r => r.id === id);
          if (r) r.discovered = true;
        }
      }
      if (data.craftingTimesCrafted) {
        for (const [id, count] of Object.entries(data.craftingTimesCrafted)) {
          const r = this.state.craftingRecipes.find(r => r.id === id);
          if (r) r.timesCrafted = count as number;
        }
      }
      if (data.craftingQueue) this.state.craftingQueue = data.craftingQueue;

      // Restore challenges
      if (data.challenges) {
        for (const saved of data.challenges) {
          const c = this.state.challenges.find(c => c.id === saved.id);
          if (c) { c.completed = saved.completed; c.completedCount = saved.completedCount; c.bestTime = saved.bestTime; }
        }
      }

      // Restore quests
      if (data.quests && data.quests.length > 0) {
        // Re-generate quest structure, then overlay saved progress
        const freshQuests = this.state.quests;
        for (const saved of data.quests) {
          const match = freshQuests.find(q => q.id === saved.id);
          if (match) {
            match.progress = saved.progress ?? 0;
            match.completed = saved.completed ?? false;
            match.claimed = saved.claimed ?? false;
          }
        }
        // If the saved quest IDs don't match (e.g., quests were regenerated),
        // keep the freshly generated quests as-is
      }

      // Restore statistics
      if (data.statistics) Object.assign(this.state.statistics, data.statistics);

      // Restore prestige
      if (data.prestige) {
        this.state.prestige = { ...this.state.prestige, ...data.prestige };
      }

      // Restore buffs
      if (data.activeBuffs) this.state.activeBuffs = data.activeBuffs;

      // Restore settings
      if (data.settings) Object.assign(this.state.settings, data.settings);

      // ── Restore new systems ──

      // Relics
      if (data.relics) {
        for (const saved of data.relics) {
          const r = this.state.relics.find(r => r.id === saved.id);
          if (r) { r.owned = saved.owned; r.equipped = saved.equipped; r.level = saved.level; }
        }
      }

      // Research
      if (data.research) {
        for (const saved of data.research) {
          const r = this.state.research.find(r => r.id === saved.id);
          if (r) { r.completed = saved.completed; r.timesCompleted = saved.timesCompleted; }
        }
      }

      // Spells
      if (data.spells) {
        for (const saved of data.spells) {
          const s = this.state.spells.find(s => s.id === saved.id);
          if (s) { s.level = saved.level; s.unlocked = saved.unlocked; s.lastCast = saved.lastCast; }
        }
      }

      // Expeditions
      if (data.expeditions) {
        for (const saved of data.expeditions) {
          const e = this.state.expeditions.find(e => e.id === saved.id);
          if (e) { e.completed = saved.completed; e.timesCompleted = saved.timesCompleted; e.active = saved.active; e.startedAt = saved.startedAt; e.completesAt = saved.completesAt; }
        }
      }

      // Bosses
      if (data.bosses) {
        for (const saved of data.bosses) {
          const b = this.state.bosses.find(b => b.id === saved.id);
          if (b) { b.defeated = saved.defeated; b.timesDefeated = saved.timesDefeated; }
        }
      }

      // Artifacts
      if (data.artifacts) {
        for (const saved of data.artifacts) {
          const a = this.state.artifacts.find(a => a.id === saved.id);
          if (a) { a.owned = saved.owned; a.equipped = saved.equipped; }
        }
      }

      // Enchantments
      if (data.enchantments) {
        for (const saved of data.enchantments) {
          const e = this.state.enchantments.find(e => e.id === saved.id);
          if (e) { e.level = saved.level; e.unlocked = saved.unlocked; }
        }
      }

      // Trade offers
      if (data.tradeOffers) {
        for (const saved of data.tradeOffers) {
          const t = this.state.tradeOffers.find(t => t.id === saved.id);
          if (t) { t.timesTraded = saved.timesTraded; t.available = saved.available; t.refreshesAt = saved.refreshesAt; }
        }
      }

      // Mini-games
      if (data.miniGames) {
        for (const saved of data.miniGames) {
          const g = this.state.miniGames.find(g => g.id === saved.id);
          if (g) { g.timesPlayed = saved.timesPlayed; g.lastPlayed = saved.lastPlayed; g.unlocked = saved.unlocked; g.totalWinnings = saved.totalWinnings; }
        }
      }

      // Garden
      if (data.garden) this.state.garden = data.garden;

      // Weather
      if (data.weather) this.state.weather = data.weather;

      // Ascension
      if (data.ascension) this.state.ascension = data.ascension;

      // Update session start for offline calc
      if (data.lastSaved) this.state.statistics.currentSessionStart = data.lastSaved;

      this.events.emit('game:loaded');
    } catch (e) {
      console.error('Load failed:', e);
    }
  }

  private loadLegacy(): void {
    try {
      const raw = localStorage.getItem('coxinha_clicker_ultimate_2026');
      if (!raw) return;

      const data = JSON.parse(raw);
      if (!data) return;

      // Migrate old save
      if (data.coxinhas) this.state.resources.coxinhas = data.coxinhas;
      if (data.buildings) {
        for (const saved of data.buildings) {
          const b = this.state.buildings.find(b => b.id === saved.id);
          if (b) b.count = saved.count || 0;
        }
      }
      if (data.upgrades) {
        for (const saved of data.upgrades) {
          if (saved.purchased) {
            const u = this.state.upgrades.find(u => u.id === saved.id);
            if (u) u.purchased = true;
          }
        }
      }
      if (data.lifetimeCoxinhas) this.state.statistics.totalCoxinhasEarned = data.lifetimeCoxinhas;

      // Legacy rebirth
      const rebirthRaw = localStorage.getItem('coxinha_rebirth_system_2026');
      if (rebirthRaw) {
        const rb = JSON.parse(rebirthRaw);
        if (rb.hotOilFragments) this.state.resources.hotOilFragments = rb.hotOilFragments;
        if (rb.rebirthCount) this.state.prestige.rebirthCount = rb.rebirthCount;
        if (rb.totalPrestige) this.state.prestige.totalPrestige = rb.totalPrestige;
      }

      this.events.emit('game:legacy_loaded');
    } catch (e) {
      console.error('Legacy load failed:', e);
    }
  }

  resetAll(): void {
    localStorage.removeItem(SAVE_KEY);
    localStorage.removeItem('coxinha_clicker_ultimate_2026');
    localStorage.removeItem('coxinha_rebirth_system_2026');
    this.state = this.createDefaultState();
    this.recalculate();
    this.events.emit('game:reset');
  }
}

// ── Format Utility ───────────────────────────────────────────────────────────

export function formatNumber(num: number): string {
  if (!isFinite(num) || isNaN(num)) return '0';
  if (num < 0) return '-' + formatNumber(-num);
  if (num < 1000) return Math.floor(num).toString();

  const suffixes = ['', 'mil', 'mi', 'bi', 'tri', 'qua', 'qui', 'sex', 'sep', 'oct', 'non', 'dec', 'und', 'duo'];
  const tier = Math.floor(Math.log10(Math.max(num, 1)) / 3);

  if (tier >= suffixes.length) return num.toExponential(2);

  const suffix = suffixes[tier];
  const scale = Math.pow(10, tier * 3);
  const scaled = num / scale;

  if (scaled >= 100) return `${Math.floor(scaled)} ${suffix}`;
  if (scaled >= 10) return `${scaled.toFixed(1)} ${suffix}`;
  return `${scaled.toFixed(2)} ${suffix}`;
}

export function formatTime(seconds: number): string {
  if (!isFinite(seconds) || isNaN(seconds) || seconds < 0) return '--';
  if (seconds < 60) return `${Math.floor(seconds)}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${Math.floor(seconds % 60)}s`;
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${h}h ${m}m`;
}

export function formatPercent(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}
