// ============================================================================
// COXINHA CLICKER - AAA MMO CLICKER - TYPE DEFINITIONS
// ============================================================================

// ── Core Game Types ──────────────────────────────────────────────────────────

export interface Building {
  id: string;
  name: string;
  description: string;
  icon: string;
  baseCost: number;
  baseCps: number;
  count: number;
  totalProduced: number;
  tier: BuildingTier;
  unlockCondition?: UnlockCondition;
}

export type BuildingTier = 'basic' | 'advanced' | 'epic' | 'legendary' | 'mythic' | 'cosmic' | 'divine' | 'void' | 'temporal' | 'elemental' | 'dimensional' | 'quantum_ii' | 'cosmic_ii' | 'transcendent' | 'infinite' | 'ultimate';

export interface Upgrade {
  id: string;
  name: string;
  description: string;
  type: UpgradeType;
  cost: number;
  multiplier: number;
  purchased: boolean;
  icon?: string;
  triggerBuildingId?: string;
  synergyTargetId?: string;
  unlockCondition?: UnlockCondition;
  tier: UpgradeTier;
}

export type UpgradeType = 'building' | 'click' | 'global' | 'golden' | 'synergy' | 'prestige' | 'research' | 'pet';
export type UpgradeTier = 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';

export interface UnlockCondition {
  type: 'building_count' | 'total_coxinhas' | 'cps' | 'clicks' | 'rebirth_count' | 'achievement_count' | 'level' | 'total_buildings' | 'cps_milestone' | 'total_clicks' | 'golden_clicked';
  targetId?: string;
  value: number;
}

// ── Achievement System ───────────────────────────────────────────────────────

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category?: AchievementCategory;
  tier?: AchievementTier;
  unlocked: boolean;
  unlockedAt?: number;
  reward: AchievementReward;
  condition: AchievementCondition;
  hidden?: boolean;
  progress?: number;
  rarity?: string;
}

export type AchievementCategory = 'clicking' | 'production' | 'buildings' | 'upgrades' | 'prestige' | 'exploration' | 'special' | 'secret';
export type AchievementTier = 'bronze' | 'silver' | 'gold' | 'diamond' | 'cosmic';

export interface AchievementReward {
  type: 'cps_mult' | 'click_mult' | 'golden_rate' | 'cost_reduction' | 'fragment_bonus' | 'flat_cps';
  value: number;
}

export interface AchievementCondition {
  type: 'total_clicks' | 'total_coxinhas' | 'cps' | 'building_count' | 'building_total' | 'upgrade_count' | 'rebirth_count' | 'combo' | 'golden_clicked' | 'quest_completed' | 'achievement_count' | 'play_time' | 'buildings_owned_total' | 'single_click' | 'night_owl' | 'speed_demon' | 'all_buildings_owned';
  targetId?: string;
  value: number;
}

// ── Skill Tree System ────────────────────────────────────────────────────────

export interface Skill {
  id: string;
  name: string;
  description: string;
  icon: string;
  branch: SkillBranch;
  tier: number;
  maxLevel: number;
  currentLevel: number;
  costPerLevel: number;
  effect: SkillEffect;
  prerequisites: string[];
  unlocked: boolean;
}

export type SkillBranch = 'clicker' | 'producer' | 'alchemist' | 'temporal' | 'elemental' | 'cosmic';

export interface SkillEffect {
  type: 'click_power' | 'cps_mult' | 'building_cost_reduction' | 'golden_duration' | 'golden_rate' | 'crit_chance' | 'crit_mult' | 'combo_duration' | 'combo_mult' | 'offline_mult' | 'fragment_mult' | 'all_mult' | 'building_cps';
  valuePerLevel: number;
  targetId?: string;
}

// ── Pet System ───────────────────────────────────────────────────────────────

export interface Pet {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: PetRarity;
  level: number;
  maxLevel: number;
  xp: number;
  xpToNext: number;
  ability: PetAbility;
  owned: boolean;
  active: boolean;
  discoveredAt?: number;
}

export type PetRarity = 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';

export interface PetAbility {
  type: 'auto_click' | 'cps_boost' | 'click_boost' | 'golden_boost' | 'cost_reduction' | 'crit_boost' | 'xp_boost' | 'fragment_boost' | 'combo_boost' | 'lucky_drops';
  baseValue: number;
  scalingPerLevel: number;
  description: string;
}

// ── Crafting System ──────────────────────────────────────────────────────────

export interface CraftingRecipe {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: CraftingCategory;
  ingredients: CraftingIngredient[];
  result: CraftingResult;
  craftTime: number;
  unlockCondition?: UnlockCondition;
  discovered: boolean;
  timesCrafted: number;
}

export type CraftingCategory = 'consumable' | 'equipment' | 'enchantment' | 'legendary';

export interface CraftingIngredient {
  type: 'coxinhas' | 'fragments' | 'stardust' | 'golden_essence' | 'cosmic_flour';
  amount: number;
}

export interface CraftingResult {
  type: 'temp_boost' | 'permanent_mult' | 'unlock_building' | 'pet_xp' | 'skill_point' | 'fragments';
  value: number;
  duration?: number;
  description?: string;
}

export interface CraftingQueue {
  recipeId: string;
  startedAt: number;
  completesAt: number;
}

// ── Challenge System ─────────────────────────────────────────────────────────

export interface Challenge {
  id: string;
  name: string;
  description: string;
  icon: string;
  difficulty?: ChallengeDifficulty;
  type: ChallengeType;
  duration?: number;
  active?: boolean;
  completed: boolean;
  bestTime?: number;
  completedCount: number;
  reward: ChallengeReward;
  condition?: ChallengeCondition;
  modifier?: ChallengeModifier;
  targetValue?: number;
  timeLimit?: number;
}

export type ChallengeDifficulty = 'easy' | 'medium' | 'hard' | 'nightmare' | 'impossible';
export type ChallengeType = 'speed' | 'endurance' | 'restriction' | 'boss' | 'collection';

export interface ChallengeReward {
  fragments?: number;
  skillPoints?: number;
  title?: string;
  petId?: string;
  type?: string;
  value?: number;
  description?: string;
}

export interface ChallengeCondition {
  type: 'reach_cps' | 'reach_total' | 'reach_clicks' | 'survive_time';
  value: number;
}

export interface ChallengeModifier {
  cpsMultiplier?: number;
  clickMultiplier?: number;
  costMultiplier?: number;
  noBuildingsAbove?: string;
  noUpgrades?: boolean;
}

// ── Season System ────────────────────────────────────────────────────────────

export interface Season {
  id: string;
  name: string;
  description: string;
  icon: string;
  theme: string;
  bonuses: SeasonBonus[];
  exclusiveUpgrades: string[];
  startDate: string;
  endDate: string;
  active: boolean;
}

export interface SeasonBonus {
  type: 'cps_mult' | 'click_mult' | 'golden_rate' | 'fragment_mult';
  value: number;
}

// ── Statistics Tracker ───────────────────────────────────────────────────────

export interface GameStatistics {
  totalClicks: number;
  totalCoxinhasEarned: number;
  totalCoxinhasSpent: number;
  totalBuildingsBought: number;
  totalUpgradesBought: number;
  totalRebirths: number;
  totalGoldenClicked: number;
  totalQuestsCompleted: number;
  totalAchievementsUnlocked: number;
  totalChallengesCompleted: number;
  totalPetsDiscovered: number;
  totalItemsCrafted: number;
  totalSkillPointsEarned: number;
  totalPlayTimeSeconds: number;
  totalOfflineEarnings: number;
  highestCps: number;
  highestClickDamage: number;
  highestCombo: number;
  longestSession: number;
  fastestRebirth: number;
  currentSessionStart: number;
  buildingStats: Record<string, { bought: number; totalProduced: number }>;
}

// ── Rebirth / Galaxy ─────────────────────────────────────────────────────────

export interface Galaxy {
  id: string;
  name: string;
  description: string;
  icon: string;
  cost: number;
  multiplier: number;
  unlocked: boolean;
  exploration: number;
  special?: boolean;
  legendary?: boolean;
  endgame?: boolean;
  discoveredPlanets: Planet[];
  requirements?: GalaxyRequirement[];
}

export interface GalaxyRequirement {
  type: 'rebirth_count' | 'fragments' | 'total_planets' | 'galaxy_exploration' | 'achievement_count';
  value: number;
  galaxyId?: string;
}

export interface Planet {
  id: string;
  name: string;
  type: PlanetType;
  resources: number;
  explored: boolean;
}

export type PlanetType = 'rocky' | 'gas' | 'ice' | 'lava' | 'crystal';

export interface GalaxyUpgrade {
  id: string;
  name: string;
  description: string;
  icon: string;
  cost: number;
  costType: 'fragments' | 'stardust' | 'cosmic_flour';
  effect: { type: string; value: number };
  purchased: boolean;
  requirement?: { type: string; value: number };
}

// ── UI Types ─────────────────────────────────────────────────────────────────

export interface FloatingText {
  id: number;
  text: string;
  x: number;
  y: number;
  color: string;
  size?: string;
  isCrit?: boolean;
}

export interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
}

export interface Notification {
  id: number;
  type: 'achievement' | 'quest' | 'level' | 'pet' | 'craft' | 'challenge' | 'season' | 'info';
  title: string;
  message: string;
  icon: string;
  color: string;
  timestamp: number;
  duration: number;
}

export type GameTab = 'buildings' | 'upgrades' | 'achievements' | 'skills' | 'pets' | 'crafting' | 'challenges' | 'statistics' | 'galaxy' | 'settings' | 'relics' | 'research' | 'spells' | 'expeditions' | 'bosses' | 'garden' | 'trading' | 'enchantments' | 'artifacts' | 'minigames' | 'automation';

// ── Quest System ─────────────────────────────────────────────────────────────

export interface Quest {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: QuestType;
  target: number;
  progress: number;
  completed: boolean;
  claimed: boolean;
  reward: QuestReward;
}

export type QuestType = 'clicks' | 'buildings_bought' | 'golden_clicked' | 'produced' | 'upgrades_bought' | 'combo_reached' | 'cps_reached';

export interface QuestReward {
  coxinhas?: number;
  fragments?: number;
  skillPoints?: number;
  petXp?: number;
}

// ── Random Events ────────────────────────────────────────────────────────────

export interface RandomEvent {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  duration: number;
  effect: EventEffect;
  chance: number;
}

export interface EventEffect {
  type: 'cps_mult' | 'click_mult' | 'cost_reduction' | 'golden_rate' | 'combo_boost' | 'cps_halt';
  value: number;
}

// ── Combo System ─────────────────────────────────────────────────────────────

export interface ComboState {
  count: number;
  multiplier: number;
  timeLeft: number;
  maxCombo: number;
}

// ── Resources ────────────────────────────────────────────────────────────────

export interface Resources {
  coxinhas: number;
  hotOilFragments: number;
  stardust: number;
  goldenEssence: number;
  cosmicFlour: number;
  skillPoints: number;
  mana: number;
  darkMatter: number;
  temporalShards: number;
  elementalCrystals: number;
  voidEssence: number;
  divineSparks: number;
  reputation: number;
  relicDust: number;
  researchPoints: number;
  gardenSeeds: number;
}

// ── Prestige Layer ───────────────────────────────────────────────────────────

export interface PrestigeState {
  rebirthCount: number;
  totalPrestige: number;
  currentGalaxy: string;
  galaxies: Record<string, Galaxy>;
  galaxyUpgrades: GalaxyUpgrade[];
  cosmicResources: Resources;
  lastRebirthTime: number;
  permanentBonuses: PermanentBonus[];
}

export interface PermanentBonus {
  id: string;
  type: 'cps_mult' | 'click_mult' | 'cost_reduction' | 'golden_rate';
  value: number;
  source: string;
}

// ── Active Effects/Buffs ─────────────────────────────────────────────────────

export interface ActiveBuff {
  id: string;
  name: string;
  icon: string;
  type: 'cps_mult' | 'click_mult' | 'golden_rate' | 'cost_reduction' | 'crit_chance' | 'combo_boost';
  value: number;
  expiresAt: number;
  source: string;
}

// ── Player Profile ───────────────────────────────────────────────────────────

export interface PlayerProfile {
  name: string;
  title: string;
  level: number;
  xp: number;
  xpToNext: number;
  totalPlayTime: number;
  joinDate: number;
  titles: string[];
}

// ── Complete Game State ──────────────────────────────────────────────────────

export interface GameState {
  version: number;
  player: PlayerProfile;
  resources: Resources;
  buildings: Building[];
  upgrades: Upgrade[];
  achievements: Achievement[];
  skills: Skill[];
  pets: Pet[];
  craftingRecipes: CraftingRecipe[];
  craftingQueue: CraftingQueue[];
  challenges: Challenge[];
  quests: Quest[];
  statistics: GameStatistics;
  prestige: PrestigeState;
  activeBuffs: ActiveBuff[];
  notifications: Notification[];
  settings: GameSettings;
  cps: number;
  clickPower: number;
  globalMultiplier: number;
  // New Systems
  relics: Relic[];
  research: ResearchNode[];
  spells: Spell[];
  expeditions: Expedition[];
  bosses: Boss[];
  activeBoss: Boss | null;
  artifacts: Artifact[];
  enchantments: Enchantment[];
  tradeOffers: TradeOffer[];
  miniGames: MiniGameState[];
  garden: GardenPlot[];
  weather: WeatherState | null;
  ascension: AscensionState;
  seasons: SeasonEvent[];
  autoBuyers: AutoBuyer[];
}

// ── Auto-Buyer System ────────────────────────────────────────────────────────

export interface AutoBuyer {
  id: string;
  buildingId: string;
  enabled: boolean;
  interval: number; // seconds between purchases
  lastBought: number; // timestamp
  priority: number; // lower = higher priority
  maxCount: number; // 0 = unlimited
  totalBought: number;
}

export interface GameSettings {
  soundEnabled: boolean;
  musicEnabled: boolean;
  volume: number;
  musicVolume: number;
  darkMode: boolean;
  showFloatingText: boolean;
  showParticles: boolean;
  autoSaveInterval: number;
  notificationsEnabled: boolean;
}

// ── Relic System ─────────────────────────────────────────────────────────────

export interface Relic {
  id: string; name: string; description: string; icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic' | 'divine';
  effect: { type: string; value: number; description: string };
  owned: boolean; equipped: boolean; level: number; maxLevel: number;
}

// ── Research System ──────────────────────────────────────────────────────────

export interface ResearchNode {
  id: string; name: string; description: string; icon: string;
  branch: 'production' | 'clicking' | 'prestige' | 'cosmic' | 'temporal' | 'quantum';
  tier: number;
  cost: { type: string; amount: number }[];
  effect: { type: string; value: number };
  prerequisites: string[];
  completed: boolean; repeatable: boolean; timesCompleted: number;
}

// ── Spell System ─────────────────────────────────────────────────────────────

export interface Spell {
  id: string; name: string; description: string; icon: string;
  school: 'fire' | 'ice' | 'lightning' | 'nature' | 'arcane' | 'holy' | 'void';
  manaCost: number; cooldown: number; duration: number;
  effect: { type: string; value: number; scaling: number };
  level: number; maxLevel: number; unlocked: boolean; lastCast: number;
}

// ── Expedition System ────────────────────────────────────────────────────────

export interface Expedition {
  id: string; name: string; description: string; icon: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'extreme' | 'legendary';
  duration: number; active: boolean; startedAt: number; completesAt: number;
  rewards: { type: string; amount: number; chance: number }[];
  requirements: { type: string; value: number }[];
  completed: boolean; timesCompleted: number;
}

// ── Boss System ──────────────────────────────────────────────────────────────

export interface Boss {
  id: string; name: string; description: string; icon: string;
  maxHp: number; currentHp: number; attack: number; defense: number;
  rewards: { type: string; amount: number }[];
  abilities: { name: string; type: string; value: number; cooldown: number }[];
  defeated: boolean; timesDefeated: number; tier: number;
}

// ── Artifact System ──────────────────────────────────────────────────────────

export interface Artifact {
  id: string; name: string; description: string; icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';
  setId?: string;
  effect: { type: string; value: number };
  owned: boolean; equipped: boolean;
}

export interface ArtifactSet {
  id: string; name: string; pieces: string[];
  bonuses: { piecesRequired: number; effect: { type: string; value: number } }[];
}

// ── Enchantment System ───────────────────────────────────────────────────────

export interface Enchantment {
  id: string; name: string; description: string; icon: string;
  targetType: 'building' | 'global' | 'click';
  targetId?: string;
  effect: { type: string; value: number };
  level: number; maxLevel: number;
  costPerLevel: { type: string; amount: number }[];
  unlocked: boolean;
}

// ── Trading System ───────────────────────────────────────────────────────────

export interface TradeOffer {
  id: string; name: string; icon: string;
  give: { type: string; amount: number };
  receive: { type: string; amount: number };
  available: boolean; timesTraded: number; maxTrades: number; refreshesAt: number;
}

// ── Mini-Game System ─────────────────────────────────────────────────────────

export interface MiniGameState {
  id: string; name: string; description: string; icon: string;
  type: 'lucky_wheel' | 'slots' | 'scratch' | 'trivia' | 'memory' | 'clicker_race';
  cost: { type: string; amount: number };
  cooldown: number; lastPlayed: number; timesPlayed: number; unlocked: boolean;
  totalWinnings: number;
}

// ── Garden System ────────────────────────────────────────────────────────────

export interface GardenPlot {
  id: number; seed: Seed | null; plantedAt: number; harvestAt: number;
  watered: boolean; fertilized: boolean;
}

export interface Seed {
  id: string; name: string; icon: string; growTime: number;
  yield: { type: string; amount: number }; rarity: string;
}

// ── Weather System ───────────────────────────────────────────────────────────

export interface WeatherState {
  current: WeatherType;
  changesAt: number;
  history: string[];
}

export interface WeatherType {
  id: string; name: string; description: string; icon: string;
  effects: { type: string; value: number }[];
  duration: number; rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

// ── Ascension System (Multi-layer Prestige) ──────────────────────────────────

export interface AscensionState {
  layers: AscensionLayer[];
  totalAscensions: number;
  ascensionPower: number;
}

export interface AscensionLayer {
  tier: number; name: string; count: number; totalPower: number;
  currency: string; multiplier: number; unlockedAt: number;
}

// ── Season Events ────────────────────────────────────────────────────────────

export interface SeasonEvent {
  id: string; name: string; description: string; icon: string;
  theme: string; bonuses: { type: string; value: number }[];
  exclusiveItems: string[]; startMonth: number; endMonth: number;
}

// ── Save Data ────────────────────────────────────────────────────────────────

export interface SaveData {
  version: number;
  timestamp: number;
  player: PlayerProfile;
  resources: Resources;
  buildings: Array<{ id: string; count: number; totalProduced: number }>;
  upgrades: string[];
  achievements: string[];
  skills: Array<{ id: string; level: number }>;
  pets: Array<{ id: string; level: number; xp: number; owned: boolean; active: boolean }>;
  craftingDiscovered: string[];
  craftingTimesCrafted: Record<string, number>;
  craftingQueue: CraftingQueue[];
  challenges: Array<{ id: string; completed: boolean; completedCount: number; bestTime?: number }>;
  quests: Array<{ id: string; progress: number; completed: boolean; claimed: boolean }>;
  statistics: GameStatistics;
  prestige: PrestigeState;
  activeBuffs: ActiveBuff[];
  settings: GameSettings;
  lastSaved: number;
}
