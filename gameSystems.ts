// ============================================================================
// COXINHA CLICKER - NEW GAME SYSTEMS DATA
// Weather, Relics, Research, Spells, Expeditions, Bosses, Artifacts,
// Enchantments, Trades, Mini-Games, Seeds/Garden, Seasons
// ============================================================================

import type {
  WeatherType, Relic, ResearchNode, Spell, Expedition, Boss,
  Artifact, ArtifactSet, Enchantment, TradeOffer, MiniGameState,
  Seed, SeasonEvent, WeatherState, AscensionState, GardenPlot
} from './types';

// ── WEATHER TYPES (20) ───────────────────────────────────────────────────────

export const WEATHER_TYPES: WeatherType[] = [
  { id: 'sunny', name: 'Ensolarado', description: 'Dia perfeito para fritar!', icon: '☀️', effects: [{ type: 'cps_mult', value: 1.2 }], duration: 300000, rarity: 'common' },
  { id: 'rainy', name: 'Chuvoso', description: 'Chuva amolece a massa...', icon: '🌧️', effects: [{ type: 'cps_mult', value: 0.9 }, { type: 'golden_rate', value: 1.5 }], duration: 240000, rarity: 'common' },
  { id: 'cloudy', name: 'Nublado', description: 'Dia neutro.', icon: '☁️', effects: [], duration: 300000, rarity: 'common' },
  { id: 'windy', name: 'Ventania', description: 'Vento espalha o aroma!', icon: '🌬️', effects: [{ type: 'click_mult', value: 1.3 }], duration: 200000, rarity: 'common' },
  { id: 'hot', name: 'Calor Intenso', description: 'Óleo ferve mais rápido!', icon: '🌡️', effects: [{ type: 'cps_mult', value: 1.4 }], duration: 250000, rarity: 'common' },
  { id: 'cold', name: 'Frio Glacial', description: 'Produção mais lenta.', icon: '❄️', effects: [{ type: 'cps_mult', value: 0.8 }, { type: 'cost_reduction', value: 0.9 }], duration: 200000, rarity: 'common' },
  { id: 'storm', name: 'Tempestade', description: 'Raios energizam tudo!', icon: '⛈️', effects: [{ type: 'cps_mult', value: 1.5 }, { type: 'click_mult', value: 1.5 }], duration: 150000, rarity: 'rare' },
  { id: 'fog', name: 'Neblina Mística', description: 'Mistério aumenta golden.', icon: '🌫️', effects: [{ type: 'golden_rate', value: 2 }], duration: 200000, rarity: 'rare' },
  { id: 'hail', name: 'Granizo', description: 'Pedras de gelo! CPS -20%.', icon: '🧊', effects: [{ type: 'cps_mult', value: 0.8 }], duration: 120000, rarity: 'rare' },
  { id: 'rainbow', name: 'Arco-Íris', description: 'Sorte dobrada!', icon: '🌈', effects: [{ type: 'golden_rate', value: 3 }, { type: 'cps_mult', value: 1.3 }], duration: 180000, rarity: 'rare' },
  { id: 'aurora', name: 'Aurora Boreal', description: 'Beleza que inspira!', icon: '🌌', effects: [{ type: 'cps_mult', value: 1.8 }, { type: 'xp_mult', value: 2 }], duration: 200000, rarity: 'epic' },
  { id: 'meteor_rain', name: 'Chuva de Meteoros', description: 'Fragmentos do espaço!', icon: '☄️', effects: [{ type: 'fragment_mult', value: 2 }, { type: 'cps_mult', value: 1.5 }], duration: 150000, rarity: 'epic' },
  { id: 'solar_flare', name: 'Erupção Solar', description: 'Energia extrema!', icon: '🌞', effects: [{ type: 'cps_mult', value: 2 }, { type: 'click_mult', value: 2 }], duration: 120000, rarity: 'epic' },
  { id: 'volcanic', name: 'Erupção Vulcânica', description: 'Lava e calor!', icon: '🌋', effects: [{ type: 'cps_mult', value: 2.5 }], duration: 100000, rarity: 'epic' },
  { id: 'eclipse', name: 'Eclipse', description: 'Escuridão poderosa.', icon: '🌑', effects: [{ type: 'cps_mult', value: 0.5 }, { type: 'golden_rate', value: 5 }], duration: 120000, rarity: 'epic' },
  { id: 'cosmic_storm', name: 'Tempestade Cósmica', description: 'Energia do cosmos!', icon: '💫', effects: [{ type: 'cps_mult', value: 3 }, { type: 'click_mult', value: 3 }], duration: 90000, rarity: 'legendary' },
  { id: 'void_rain', name: 'Chuva do Vazio', description: 'Matéria escura!', icon: '⬛', effects: [{ type: 'cps_mult', value: 4 }], duration: 60000, rarity: 'legendary' },
  { id: 'time_storm', name: 'Tempestade Temporal', description: 'Tempo distorcido!', icon: '⏰', effects: [{ type: 'cps_mult', value: 5 }, { type: 'golden_rate', value: 3 }], duration: 45000, rarity: 'legendary' },
  { id: 'divine_light', name: 'Luz Divina', description: 'Bênção celestial!', icon: '✨', effects: [{ type: 'cps_mult', value: 7 }, { type: 'click_mult', value: 5 }], duration: 30000, rarity: 'legendary' },
  { id: 'coxinha_rain', name: 'Chuva de Coxinhas', description: 'Literalmente chove coxinhas!', icon: '🥟', effects: [{ type: 'cps_mult', value: 10 }], duration: 15000, rarity: 'legendary' },
];

// ── RELICS (50) ──────────────────────────────────────────────────────────────

export const INITIAL_RELICS: Relic[] = [
  { id: 'rel_spoon', name: 'Colher da Vovó', description: 'A colher original.', icon: '🥄', rarity: 'common', effect: { type: 'cps_mult', value: 0.05, description: 'CPS +5% por nível' }, owned: false, equipped: false, level: 0, maxLevel: 10 },
  { id: 'rel_apron', name: 'Avental Antigo', description: 'Usado por gerações.', icon: '👔', rarity: 'common', effect: { type: 'click_mult', value: 0.05, description: 'Clique +5% por nível' }, owned: false, equipped: false, level: 0, maxLevel: 10 },
  { id: 'rel_recipe', name: 'Receita Ancestral', description: 'Manuscrito milenar.', icon: '📜', rarity: 'common', effect: { type: 'cps_mult', value: 0.08, description: 'CPS +8% por nível' }, owned: false, equipped: false, level: 0, maxLevel: 10 },
  { id: 'rel_oil_jar', name: 'Jarro de Óleo Sagrado', description: 'Óleo que nunca acaba.', icon: '🫙', rarity: 'common', effect: { type: 'cost_reduction', value: 0.02, description: 'Custo -2% por nível' }, owned: false, equipped: false, level: 0, maxLevel: 10 },
  { id: 'rel_flour_bag', name: 'Saco de Farinha Mágica', description: 'Farinha que se multiplica.', icon: '🎒', rarity: 'common', effect: { type: 'cps_mult', value: 0.06, description: 'CPS +6% por nível' }, owned: false, equipped: false, level: 0, maxLevel: 10 },
  { id: 'rel_golden_fork', name: 'Garfo Dourado', description: 'Brilha com poder.', icon: '🍴', rarity: 'rare', effect: { type: 'golden_rate', value: 0.1, description: 'Golden +10% por nível' }, owned: false, equipped: false, level: 0, maxLevel: 15 },
  { id: 'rel_crystal_salt', name: 'Sal de Cristal', description: 'Tempero mágico.', icon: '🧂', rarity: 'rare', effect: { type: 'cps_mult', value: 0.1, description: 'CPS +10% por nível' }, owned: false, equipped: false, level: 0, maxLevel: 15 },
  { id: 'rel_flame_ring', name: 'Anel de Chama', description: 'Queima com poder.', icon: '💍', rarity: 'rare', effect: { type: 'click_mult', value: 0.1, description: 'Clique +10% por nível' }, owned: false, equipped: false, level: 0, maxLevel: 15 },
  { id: 'rel_star_compass', name: 'Bússola Estelar', description: 'Guia para tesouros.', icon: '🧭', rarity: 'rare', effect: { type: 'xp_mult', value: 0.1, description: 'XP +10% por nível' }, owned: false, equipped: false, level: 0, maxLevel: 15 },
  { id: 'rel_frost_gem', name: 'Gema Glacial', description: 'Frio que preserva.', icon: '💎', rarity: 'rare', effect: { type: 'fragment_mult', value: 0.08, description: 'Fragmentos +8% por nível' }, owned: false, equipped: false, level: 0, maxLevel: 15 },
  { id: 'rel_dragon_scale', name: 'Escama de Dragão', description: 'Do dragão ancestral.', icon: '🐉', rarity: 'epic', effect: { type: 'cps_mult', value: 0.15, description: 'CPS +15% por nível' }, owned: false, equipped: false, level: 0, maxLevel: 20 },
  { id: 'rel_phoenix_feather', name: 'Pena de Fênix', description: 'Renasce em chamas.', icon: '🪶', rarity: 'epic', effect: { type: 'click_mult', value: 0.15, description: 'Clique +15% por nível' }, owned: false, equipped: false, level: 0, maxLevel: 20 },
  { id: 'rel_time_pearl', name: 'Pérola Temporal', description: 'Contém tempo.', icon: '🦪', rarity: 'epic', effect: { type: 'cps_mult', value: 0.2, description: 'CPS +20% por nível' }, owned: false, equipped: false, level: 0, maxLevel: 20 },
  { id: 'rel_void_shard', name: 'Fragmento do Vazio', description: 'Pedaço do nada.', icon: '🖤', rarity: 'epic', effect: { type: 'golden_rate', value: 0.15, description: 'Golden +15% por nível' }, owned: false, equipped: false, level: 0, maxLevel: 20 },
  { id: 'rel_elemental_core', name: 'Núcleo Elemental', description: 'Todos os elementos.', icon: '🌈', rarity: 'epic', effect: { type: 'cps_mult', value: 0.18, description: 'CPS +18% por nível' }, owned: false, equipped: false, level: 0, maxLevel: 20 },
  { id: 'rel_cosmic_crystal', name: 'Cristal Cósmico', description: 'Do núcleo do universo.', icon: '💠', rarity: 'legendary', effect: { type: 'cps_mult', value: 0.25, description: 'CPS +25% por nível' }, owned: false, equipped: false, level: 0, maxLevel: 25 },
  { id: 'rel_infinity_gem', name: 'Gema do Infinito', description: 'Poder sem limites.', icon: '♾️', rarity: 'legendary', effect: { type: 'click_mult', value: 0.25, description: 'Clique +25% por nível' }, owned: false, equipped: false, level: 0, maxLevel: 25 },
  { id: 'rel_gods_ladle', name: 'Concha dos Deuses', description: 'Usada por deidades.', icon: '🥄', rarity: 'legendary', effect: { type: 'cps_mult', value: 0.3, description: 'CPS +30% por nível' }, owned: false, equipped: false, level: 0, maxLevel: 25 },
  { id: 'rel_omega_stone', name: 'Pedra Ômega', description: 'Peça final do quebra-cabeça.', icon: '🪨', rarity: 'mythic', effect: { type: 'cps_mult', value: 0.5, description: 'CPS +50% por nível' }, owned: false, equipped: false, level: 0, maxLevel: 30 },
  { id: 'rel_coxinha_original', name: 'Coxinha Original', description: 'A primeira de todas.', icon: '🥟', rarity: 'divine', effect: { type: 'cps_mult', value: 1, description: 'CPS +100% por nível' }, owned: false, equipped: false, level: 0, maxLevel: 50 },
];

// ── RESEARCH NODES (40) ──────────────────────────────────────────────────────

export const INITIAL_RESEARCH: ResearchNode[] = [
  // Production Branch (8)
  { id: 'res_efficiency_1', name: 'Eficiência I', description: 'CPS +10%.', icon: '📈', branch: 'production', tier: 1, cost: [{ type: 'coxinhas', amount: 1e10 }], effect: { type: 'cps_mult', value: 0.1 }, prerequisites: [], completed: false, repeatable: false, timesCompleted: 0 },
  { id: 'res_efficiency_2', name: 'Eficiência II', description: 'CPS +15%.', icon: '📈', branch: 'production', tier: 2, cost: [{ type: 'coxinhas', amount: 1e15 }], effect: { type: 'cps_mult', value: 0.15 }, prerequisites: ['res_efficiency_1'], completed: false, repeatable: false, timesCompleted: 0 },
  { id: 'res_efficiency_3', name: 'Eficiência III', description: 'CPS +20%.', icon: '📈', branch: 'production', tier: 3, cost: [{ type: 'coxinhas', amount: 1e20 }], effect: { type: 'cps_mult', value: 0.2 }, prerequisites: ['res_efficiency_2'], completed: false, repeatable: false, timesCompleted: 0 },
  { id: 'res_mass_prod', name: 'Produção em Massa', description: 'CPS x2.', icon: '🏭', branch: 'production', tier: 4, cost: [{ type: 'coxinhas', amount: 1e25 }, { type: 'fragments', amount: 100 }], effect: { type: 'cps_mult', value: 1 }, prerequisites: ['res_efficiency_3'], completed: false, repeatable: false, timesCompleted: 0 },
  { id: 'res_automation', name: 'Automação Total', description: 'CPS x3.', icon: '🤖', branch: 'production', tier: 5, cost: [{ type: 'coxinhas', amount: 1e30 }, { type: 'fragments', amount: 500 }], effect: { type: 'cps_mult', value: 2 }, prerequisites: ['res_mass_prod'], completed: false, repeatable: false, timesCompleted: 0 },
  { id: 'res_quantum_prod', name: 'Produção Quântica', description: 'CPS x5.', icon: '⚛️', branch: 'production', tier: 6, cost: [{ type: 'coxinhas', amount: 1e40 }, { type: 'fragments', amount: 2000 }], effect: { type: 'cps_mult', value: 4 }, prerequisites: ['res_automation'], completed: false, repeatable: false, timesCompleted: 0 },

  // Clicking Branch (6)
  { id: 'res_precision', name: 'Precisão', description: 'Clique +20%.', icon: '🎯', branch: 'clicking', tier: 1, cost: [{ type: 'coxinhas', amount: 1e8 }], effect: { type: 'click_mult', value: 0.2 }, prerequisites: [], completed: false, repeatable: false, timesCompleted: 0 },
  { id: 'res_power_click', name: 'Clique Poderoso', description: 'Clique +50%.', icon: '💪', branch: 'clicking', tier: 2, cost: [{ type: 'coxinhas', amount: 1e13 }], effect: { type: 'click_mult', value: 0.5 }, prerequisites: ['res_precision'], completed: false, repeatable: false, timesCompleted: 0 },
  { id: 'res_crit_mastery', name: 'Maestria Crítica', description: 'Crit +5%.', icon: '⚡', branch: 'clicking', tier: 3, cost: [{ type: 'coxinhas', amount: 1e18 }], effect: { type: 'crit_chance', value: 0.05 }, prerequisites: ['res_power_click'], completed: false, repeatable: false, timesCompleted: 0 },
  { id: 'res_combo_mastery', name: 'Maestria de Combo', description: 'Combo +50%.', icon: '🔥', branch: 'clicking', tier: 4, cost: [{ type: 'coxinhas', amount: 1e23 }], effect: { type: 'combo_mult', value: 0.5 }, prerequisites: ['res_crit_mastery'], completed: false, repeatable: false, timesCompleted: 0 },
  { id: 'res_ultra_click', name: 'Ultra Clique', description: 'Clique x3.', icon: '☄️', branch: 'clicking', tier: 5, cost: [{ type: 'coxinhas', amount: 1e30 }, { type: 'fragments', amount: 300 }], effect: { type: 'click_mult', value: 2 }, prerequisites: ['res_combo_mastery'], completed: false, repeatable: false, timesCompleted: 0 },

  // Prestige Branch (6)
  { id: 'res_fragment_opt', name: 'Otimizar Fragmentos', description: 'Fragmentos +20%.', icon: '💎', branch: 'prestige', tier: 1, cost: [{ type: 'fragments', amount: 50 }], effect: { type: 'fragment_mult', value: 0.2 }, prerequisites: [], completed: false, repeatable: false, timesCompleted: 0 },
  { id: 'res_prestige_power', name: 'Poder do Prestígio', description: 'Bônus prestígio +50%.', icon: '👑', branch: 'prestige', tier: 2, cost: [{ type: 'fragments', amount: 200 }], effect: { type: 'prestige_mult', value: 0.5 }, prerequisites: ['res_fragment_opt'], completed: false, repeatable: false, timesCompleted: 0 },
  { id: 'res_eternal_legacy', name: 'Legado Eterno', description: 'Fragmentos x2.', icon: '🏆', branch: 'prestige', tier: 3, cost: [{ type: 'fragments', amount: 1000 }], effect: { type: 'fragment_mult', value: 1 }, prerequisites: ['res_prestige_power'], completed: false, repeatable: false, timesCompleted: 0 },
  { id: 'res_cosmic_prestige', name: 'Prestígio Cósmico', description: 'Fragmentos x3.', icon: '🌌', branch: 'prestige', tier: 4, cost: [{ type: 'fragments', amount: 5000 }, { type: 'stardust', amount: 200 }], effect: { type: 'fragment_mult', value: 2 }, prerequisites: ['res_eternal_legacy'], completed: false, repeatable: false, timesCompleted: 0 },

  // Cosmic Branch (6)
  { id: 'res_star_chart', name: 'Mapa Estelar', description: 'Exploração +20%.', icon: '🗺️', branch: 'cosmic', tier: 1, cost: [{ type: 'stardust', amount: 50 }], effect: { type: 'exploration_speed', value: 0.2 }, prerequisites: [], completed: false, repeatable: false, timesCompleted: 0 },
  { id: 'res_warp_drive', name: 'Motor Warp', description: 'Viagem galáctica.', icon: '🚀', branch: 'cosmic', tier: 2, cost: [{ type: 'stardust', amount: 200 }], effect: { type: 'galaxy_mult', value: 0.5 }, prerequisites: ['res_star_chart'], completed: false, repeatable: false, timesCompleted: 0 },
  { id: 'res_dyson_sphere', name: 'Esfera de Dyson', description: 'CPS x2.', icon: '☀️', branch: 'cosmic', tier: 3, cost: [{ type: 'stardust', amount: 1000 }, { type: 'fragments', amount: 500 }], effect: { type: 'cps_mult', value: 1 }, prerequisites: ['res_warp_drive'], completed: false, repeatable: false, timesCompleted: 0 },
  { id: 'res_multiverse_tap', name: 'Torneira Multiversal', description: 'CPS x5.', icon: '🌐', branch: 'cosmic', tier: 4, cost: [{ type: 'stardust', amount: 5000 }, { type: 'cosmic_flour', amount: 200 }], effect: { type: 'cps_mult', value: 4 }, prerequisites: ['res_dyson_sphere'], completed: false, repeatable: false, timesCompleted: 0 },

  // Temporal Branch (4)
  { id: 'res_time_mastery', name: 'Maestria Temporal', description: 'Offline +50%.', icon: '⏰', branch: 'temporal', tier: 1, cost: [{ type: 'coxinhas', amount: 1e15 }], effect: { type: 'offline_mult', value: 0.5 }, prerequisites: [], completed: false, repeatable: false, timesCompleted: 0 },
  { id: 'res_chrono_field', name: 'Campo Crono', description: 'CPS +50%.', icon: '⏳', branch: 'temporal', tier: 2, cost: [{ type: 'coxinhas', amount: 1e22 }], effect: { type: 'cps_mult', value: 0.5 }, prerequisites: ['res_time_mastery'], completed: false, repeatable: false, timesCompleted: 0 },
  { id: 'res_eternity_gate', name: 'Portão da Eternidade', description: 'CPS x3.', icon: '🚪', branch: 'temporal', tier: 3, cost: [{ type: 'coxinhas', amount: 1e30 }, { type: 'stardust', amount: 500 }], effect: { type: 'cps_mult', value: 2 }, prerequisites: ['res_chrono_field'], completed: false, repeatable: false, timesCompleted: 0 },

  // Quantum Branch (4)
  { id: 'res_superposition', name: 'Superposição', description: 'CPS +30%.', icon: '⚛️', branch: 'quantum', tier: 1, cost: [{ type: 'coxinhas', amount: 1e18 }], effect: { type: 'cps_mult', value: 0.3 }, prerequisites: [], completed: false, repeatable: false, timesCompleted: 0 },
  { id: 'res_entanglement', name: 'Entrelaçamento', description: 'Click +100%.', icon: '🔗', branch: 'quantum', tier: 2, cost: [{ type: 'coxinhas', amount: 1e25 }], effect: { type: 'click_mult', value: 1 }, prerequisites: ['res_superposition'], completed: false, repeatable: false, timesCompleted: 0 },
  { id: 'res_quantum_tunneling', name: 'Tunelamento', description: 'CPS x2.', icon: '🕳️', branch: 'quantum', tier: 3, cost: [{ type: 'coxinhas', amount: 1e35 }, { type: 'fragments', amount: 1000 }], effect: { type: 'cps_mult', value: 1 }, prerequisites: ['res_entanglement'], completed: false, repeatable: false, timesCompleted: 0 },
];

// ── SPELLS (30) ──────────────────────────────────────────────────────────────

export const INITIAL_SPELLS: Spell[] = [
  // Fire spells
  { id: 'sp_fireball', name: 'Bola de Fogo', description: 'Aquece a produção!', icon: '🔥', school: 'fire', manaCost: 10, cooldown: 30000, duration: 15000, effect: { type: 'cps_mult', value: 3, scaling: 0.5 }, level: 1, maxLevel: 10, unlocked: true, lastCast: 0 },
  { id: 'sp_inferno', name: 'Inferno', description: 'Queima TUDO!', icon: '🌋', school: 'fire', manaCost: 30, cooldown: 90000, duration: 10000, effect: { type: 'cps_mult', value: 10, scaling: 1 }, level: 1, maxLevel: 10, unlocked: false, lastCast: 0 },
  { id: 'sp_ember', name: 'Chama Perene', description: 'Cliques ardentes.', icon: '🕯️', school: 'fire', manaCost: 15, cooldown: 45000, duration: 20000, effect: { type: 'click_mult', value: 5, scaling: 0.5 }, level: 1, maxLevel: 10, unlocked: true, lastCast: 0 },

  // Ice spells
  { id: 'sp_frost', name: 'Geada', description: 'Congela custos.', icon: '❄️', school: 'ice', manaCost: 12, cooldown: 40000, duration: 20000, effect: { type: 'cost_reduction', value: 0.5, scaling: 0.05 }, level: 1, maxLevel: 10, unlocked: true, lastCast: 0 },
  { id: 'sp_blizzard', name: 'Nevasca', description: 'Tempestade gelada!', icon: '🌨️', school: 'ice', manaCost: 25, cooldown: 75000, duration: 15000, effect: { type: 'golden_rate', value: 5, scaling: 0.5 }, level: 1, maxLevel: 10, unlocked: false, lastCast: 0 },
  { id: 'sp_ice_wall', name: 'Muralha de Gelo', description: 'Protege produção.', icon: '🧊', school: 'ice', manaCost: 20, cooldown: 60000, duration: 30000, effect: { type: 'cps_mult', value: 2, scaling: 0.3 }, level: 1, maxLevel: 10, unlocked: false, lastCast: 0 },

  // Lightning spells
  { id: 'sp_lightning', name: 'Relâmpago', description: 'Clique elétrico!', icon: '⚡', school: 'lightning', manaCost: 15, cooldown: 35000, duration: 10000, effect: { type: 'click_mult', value: 10, scaling: 1 }, level: 1, maxLevel: 10, unlocked: true, lastCast: 0 },
  { id: 'sp_chain_light', name: 'Corrente Elétrica', description: 'CPS x5!', icon: '🌩️', school: 'lightning', manaCost: 35, cooldown: 80000, duration: 12000, effect: { type: 'cps_mult', value: 5, scaling: 0.7 }, level: 1, maxLevel: 10, unlocked: false, lastCast: 0 },
  { id: 'sp_thunder', name: 'Trovão', description: 'Combo boost!', icon: '🌩️', school: 'lightning', manaCost: 20, cooldown: 50000, duration: 20000, effect: { type: 'combo_boost', value: 3, scaling: 0.3 }, level: 1, maxLevel: 10, unlocked: false, lastCast: 0 },

  // Nature spells
  { id: 'sp_growth', name: 'Crescimento', description: 'Produção cresce!', icon: '🌱', school: 'nature', manaCost: 10, cooldown: 30000, duration: 30000, effect: { type: 'cps_mult', value: 2, scaling: 0.3 }, level: 1, maxLevel: 10, unlocked: true, lastCast: 0 },
  { id: 'sp_bloom', name: 'Florescimento', description: 'XP dobrado!', icon: '🌸', school: 'nature', manaCost: 15, cooldown: 60000, duration: 30000, effect: { type: 'xp_mult', value: 2, scaling: 0.2 }, level: 1, maxLevel: 10, unlocked: false, lastCast: 0 },
  { id: 'sp_harvest', name: 'Colheita', description: 'Fragmento boost!', icon: '🌾', school: 'nature', manaCost: 25, cooldown: 90000, duration: 20000, effect: { type: 'fragment_mult', value: 3, scaling: 0.3 }, level: 1, maxLevel: 10, unlocked: false, lastCast: 0 },

  // Arcane spells
  { id: 'sp_mana_surge', name: 'Surto de Mana', description: 'Tudo x3!', icon: '🔮', school: 'arcane', manaCost: 20, cooldown: 45000, duration: 10000, effect: { type: 'cps_mult', value: 3, scaling: 0.5 }, level: 1, maxLevel: 10, unlocked: true, lastCast: 0 },
  { id: 'sp_arcane_bolt', name: 'Raio Arcano', description: 'Clique x8!', icon: '💜', school: 'arcane', manaCost: 30, cooldown: 70000, duration: 12000, effect: { type: 'click_mult', value: 8, scaling: 1 }, level: 1, maxLevel: 10, unlocked: false, lastCast: 0 },
  { id: 'sp_time_warp', name: 'Distorção Temporal', description: 'CPS x7!', icon: '⏰', school: 'arcane', manaCost: 50, cooldown: 120000, duration: 8000, effect: { type: 'cps_mult', value: 7, scaling: 1 }, level: 1, maxLevel: 10, unlocked: false, lastCast: 0 },

  // Holy spells
  { id: 'sp_bless', name: 'Bênção', description: 'Golden x3!', icon: '✨', school: 'holy', manaCost: 15, cooldown: 45000, duration: 30000, effect: { type: 'golden_rate', value: 3, scaling: 0.3 }, level: 1, maxLevel: 10, unlocked: true, lastCast: 0 },
  { id: 'sp_divine', name: 'Intervenção Divina', description: 'CPS x10!', icon: '😇', school: 'holy', manaCost: 60, cooldown: 150000, duration: 10000, effect: { type: 'cps_mult', value: 10, scaling: 1.5 }, level: 1, maxLevel: 10, unlocked: false, lastCast: 0 },
  { id: 'sp_miracle', name: 'Milagre', description: 'Clique x20!', icon: '🌟', school: 'holy', manaCost: 80, cooldown: 180000, duration: 5000, effect: { type: 'click_mult', value: 20, scaling: 2 }, level: 1, maxLevel: 10, unlocked: false, lastCast: 0 },

  // Void spells
  { id: 'sp_void_tap', name: 'Toque do Vazio', description: 'CPS x2.', icon: '🕳️', school: 'void', manaCost: 10, cooldown: 30000, duration: 20000, effect: { type: 'cps_mult', value: 2, scaling: 0.3 }, level: 1, maxLevel: 10, unlocked: true, lastCast: 0 },
  { id: 'sp_null_field', name: 'Campo Nulo', description: 'Custo -70%!', icon: '⬛', school: 'void', manaCost: 40, cooldown: 100000, duration: 15000, effect: { type: 'cost_reduction', value: 0.3, scaling: 0.05 }, level: 1, maxLevel: 10, unlocked: false, lastCast: 0 },
  { id: 'sp_oblivion', name: 'Oblívio', description: 'Tudo x20!', icon: '🌑', school: 'void', manaCost: 100, cooldown: 300000, duration: 5000, effect: { type: 'cps_mult', value: 20, scaling: 3 }, level: 1, maxLevel: 10, unlocked: false, lastCast: 0 },
];

// ── EXPEDITIONS (25) ─────────────────────────────────────────────────────────

export const INITIAL_EXPEDITIONS: Expedition[] = [
  { id: 'exp_local_market', name: 'Feira Local', description: 'Busca ingredientes na feira.', icon: '🛒', difficulty: 'easy', duration: 60000, active: false, startedAt: 0, completesAt: 0, rewards: [{ type: 'coxinhas', amount: 1e6, chance: 1 }, { type: 'fragments', amount: 5, chance: 0.5 }], requirements: [], completed: false, timesCompleted: 0 },
  { id: 'exp_farm', name: 'Fazenda Orgânica', description: 'Ingredientes frescos.', icon: '🌾', difficulty: 'easy', duration: 120000, active: false, startedAt: 0, completesAt: 0, rewards: [{ type: 'coxinhas', amount: 1e8, chance: 1 }, { type: 'stardust', amount: 3, chance: 0.4 }], requirements: [], completed: false, timesCompleted: 0 },
  { id: 'exp_mountain', name: 'Montanha Mística', description: 'Ervas raras no topo.', icon: '⛰️', difficulty: 'medium', duration: 300000, active: false, startedAt: 0, completesAt: 0, rewards: [{ type: 'coxinhas', amount: 1e12, chance: 1 }, { type: 'fragments', amount: 20, chance: 0.6 }], requirements: [{ type: 'level', value: 5 }], completed: false, timesCompleted: 0 },
  { id: 'exp_ocean', name: 'Fundo do Oceano', description: 'Tesouros submarinos.', icon: '🌊', difficulty: 'medium', duration: 600000, active: false, startedAt: 0, completesAt: 0, rewards: [{ type: 'coxinhas', amount: 1e15, chance: 1 }, { type: 'golden_essence', amount: 10, chance: 0.5 }], requirements: [{ type: 'level', value: 10 }], completed: false, timesCompleted: 0 },
  { id: 'exp_volcano', name: 'Interior do Vulcão', description: 'Tempero no magma.', icon: '🌋', difficulty: 'hard', duration: 900000, active: false, startedAt: 0, completesAt: 0, rewards: [{ type: 'coxinhas', amount: 1e18, chance: 1 }, { type: 'fragments', amount: 50, chance: 0.7 }], requirements: [{ type: 'level', value: 15 }], completed: false, timesCompleted: 0 },
  { id: 'exp_ruins', name: 'Ruínas Antigas', description: 'Receitas ancestrais.', icon: '🏛️', difficulty: 'hard', duration: 1200000, active: false, startedAt: 0, completesAt: 0, rewards: [{ type: 'coxinhas', amount: 1e20, chance: 1 }, { type: 'stardust', amount: 50, chance: 0.6 }, { type: 'relic', amount: 1, chance: 0.2 }], requirements: [{ type: 'level', value: 20 }], completed: false, timesCompleted: 0 },
  { id: 'exp_space', name: 'Estação Espacial', description: 'Cozinha zero-gravidade.', icon: '🚀', difficulty: 'hard', duration: 1800000, active: false, startedAt: 0, completesAt: 0, rewards: [{ type: 'coxinhas', amount: 1e23, chance: 1 }, { type: 'cosmic_flour', amount: 20, chance: 0.5 }], requirements: [{ type: 'level', value: 25 }], completed: false, timesCompleted: 0 },
  { id: 'exp_dimension', name: 'Outra Dimensão', description: 'Receitas impossíveis.', icon: '🌐', difficulty: 'extreme', duration: 3600000, active: false, startedAt: 0, completesAt: 0, rewards: [{ type: 'coxinhas', amount: 1e28, chance: 1 }, { type: 'fragments', amount: 200, chance: 0.8 }, { type: 'relic', amount: 1, chance: 0.3 }], requirements: [{ type: 'level', value: 30 }], completed: false, timesCompleted: 0 },
  { id: 'exp_void', name: 'Vazio Absoluto', description: 'Do nada, coxinha.', icon: '🕳️', difficulty: 'extreme', duration: 5400000, active: false, startedAt: 0, completesAt: 0, rewards: [{ type: 'coxinhas', amount: 1e35, chance: 1 }, { type: 'stardust', amount: 500, chance: 0.7 }], requirements: [{ type: 'level', value: 40 }], completed: false, timesCompleted: 0 },
  { id: 'exp_time', name: 'Viagem Temporal', description: 'Coxinhas do passado.', icon: '⏰', difficulty: 'legendary', duration: 7200000, active: false, startedAt: 0, completesAt: 0, rewards: [{ type: 'coxinhas', amount: 1e40, chance: 1 }, { type: 'fragments', amount: 1000, chance: 0.8 }, { type: 'relic', amount: 1, chance: 0.5 }], requirements: [{ type: 'level', value: 50 }], completed: false, timesCompleted: 0 },
];

// ── BOSSES (20) ──────────────────────────────────────────────────────────────

export const INITIAL_BOSSES: Boss[] = [
  { id: 'boss_rat', name: 'Rato Gigante', description: 'Está comendo as coxinhas!', icon: '🐀', maxHp: 1000, currentHp: 1000, attack: 5, defense: 2, rewards: [{ type: 'coxinhas', amount: 1e8 }, { type: 'fragments', amount: 10 }], abilities: [{ name: 'Mordida', type: 'damage', value: 10, cooldown: 5000 }], defeated: false, timesDefeated: 0, tier: 1 },
  { id: 'boss_cockroach', name: 'Barata Mutante', description: 'Sobrevive a tudo!', icon: '🪳', maxHp: 5000, currentHp: 5000, attack: 10, defense: 5, rewards: [{ type: 'coxinhas', amount: 1e10 }, { type: 'fragments', amount: 25 }], abilities: [{ name: 'Infestação', type: 'damage', value: 20, cooldown: 8000 }], defeated: false, timesDefeated: 0, tier: 2 },
  { id: 'boss_health_inspector', name: 'Fiscal Sanitário Supremo', description: 'Vai fechar tudo!', icon: '📋', maxHp: 25000, currentHp: 25000, attack: 20, defense: 10, rewards: [{ type: 'coxinhas', amount: 1e13 }, { type: 'fragments', amount: 50 }], abilities: [{ name: 'Multa!', type: 'cps_reduce', value: 50, cooldown: 10000 }], defeated: false, timesDefeated: 0, tier: 3 },
  { id: 'boss_critic', name: 'Crítico Gastronômico Maligno', description: 'Detesta coxinhas!', icon: '🧑‍🍳', maxHp: 100000, currentHp: 100000, attack: 40, defense: 20, rewards: [{ type: 'coxinhas', amount: 1e16 }, { type: 'fragments', amount: 100 }], abilities: [{ name: 'Avaliação Negativa', type: 'cps_reduce', value: 30, cooldown: 7000 }], defeated: false, timesDefeated: 0, tier: 4 },
  { id: 'boss_dragon', name: 'Dragão Faminto', description: 'Quer comer TODAS as coxinhas!', icon: '🐉', maxHp: 500000, currentHp: 500000, attack: 80, defense: 40, rewards: [{ type: 'coxinhas', amount: 1e20 }, { type: 'fragments', amount: 300 }, { type: 'relic', amount: 1 }], abilities: [{ name: 'Bafo de Fogo', type: 'damage', value: 200, cooldown: 5000 }, { name: 'Voo', type: 'dodge', value: 50, cooldown: 15000 }], defeated: false, timesDefeated: 0, tier: 5 },
  { id: 'boss_void_lord', name: 'Senhor do Vazio', description: 'Quer destruir todas as coxinhas!', icon: '👿', maxHp: 2000000, currentHp: 2000000, attack: 150, defense: 80, rewards: [{ type: 'coxinhas', amount: 1e25 }, { type: 'fragments', amount: 1000 }, { type: 'relic', amount: 1 }], abilities: [{ name: 'Aniquilação', type: 'damage', value: 500, cooldown: 8000 }], defeated: false, timesDefeated: 0, tier: 6 },
  { id: 'boss_time_eater', name: 'Devorador de Tempo', description: 'Come o próprio tempo!', icon: '⏰', maxHp: 10000000, currentHp: 10000000, attack: 300, defense: 150, rewards: [{ type: 'coxinhas', amount: 1e30 }, { type: 'fragments', amount: 3000 }], abilities: [{ name: 'Parada Temporal', type: 'cps_reduce', value: 90, cooldown: 12000 }], defeated: false, timesDefeated: 0, tier: 7 },
  { id: 'boss_cosmic_horror', name: 'Horror Cósmico', description: 'Incompreensível e faminto.', icon: '🦑', maxHp: 50000000, currentHp: 50000000, attack: 500, defense: 250, rewards: [{ type: 'coxinhas', amount: 1e35 }, { type: 'fragments', amount: 10000 }, { type: 'relic', amount: 1 }], abilities: [{ name: 'Loucura', type: 'damage', value: 2000, cooldown: 6000 }], defeated: false, timesDefeated: 0, tier: 8 },
  { id: 'boss_infinity', name: 'Guardião do Infinito', description: 'Protege o infinito das coxinhas.', icon: '♾️', maxHp: 500000000, currentHp: 500000000, attack: 1000, defense: 500, rewards: [{ type: 'coxinhas', amount: 1e45 }, { type: 'fragments', amount: 50000 }], abilities: [{ name: 'Infinidade', type: 'damage', value: 10000, cooldown: 10000 }], defeated: false, timesDefeated: 0, tier: 9 },
  { id: 'boss_final', name: 'Anti-Coxinha', description: 'A negação da coxinha. O boss final.', icon: '💀', maxHp: 1e10, currentHp: 1e10, attack: 5000, defense: 2000, rewards: [{ type: 'coxinhas', amount: 1e55 }, { type: 'fragments', amount: 500000 }, { type: 'relic', amount: 1 }], abilities: [{ name: 'Anti-Fritura', type: 'damage', value: 50000, cooldown: 5000 }, { name: 'Negação', type: 'cps_reduce', value: 95, cooldown: 20000 }], defeated: false, timesDefeated: 0, tier: 10 },
];

// ── ARTIFACTS (20 + 5 SETS) ──────────────────────────────────────────────────

export const INITIAL_ARTIFACTS: Artifact[] = [
  { id: 'art_wooden_spoon', name: 'Colher de Pau', icon: '🥄', description: 'Simplicidade eficiente.', rarity: 'common', setId: 'set_kitchen', effect: { type: 'cps_mult', value: 0.1 }, owned: false, equipped: false },
  { id: 'art_iron_pot', name: 'Panela de Ferro', icon: '🍲', description: 'Resistente e confiável.', rarity: 'common', setId: 'set_kitchen', effect: { type: 'cps_mult', value: 0.12 }, owned: false, equipped: false },
  { id: 'art_chef_hat', name: 'Chapéu de Chef', icon: '👨‍🍳', description: 'Símbolo de maestria.', rarity: 'common', setId: 'set_kitchen', effect: { type: 'click_mult', value: 0.1 }, owned: false, equipped: false },
  { id: 'art_golden_whisk', name: 'Batedor Dourado', icon: '🥄', description: 'Ouro puro.', rarity: 'rare', setId: 'set_golden', effect: { type: 'golden_rate', value: 0.2 }, owned: false, equipped: false },
  { id: 'art_golden_tray', name: 'Bandeja Dourada', icon: '🍽️', description: 'Servir com luxo.', rarity: 'rare', setId: 'set_golden', effect: { type: 'cps_mult', value: 0.15 }, owned: false, equipped: false },
  { id: 'art_golden_knife', name: 'Faca Dourada', icon: '🔪', description: 'Corta com precisão.', rarity: 'rare', setId: 'set_golden', effect: { type: 'click_mult', value: 0.2 }, owned: false, equipped: false },
  { id: 'art_dragon_spatula', name: 'Espátula de Dragão', icon: '🐉', description: 'Escama de dragão.', rarity: 'epic', setId: 'set_mythic', effect: { type: 'cps_mult', value: 0.25 }, owned: false, equipped: false },
  { id: 'art_phoenix_ladle', name: 'Concha de Fênix', icon: '🐦‍🔥', description: 'Renasce melhor.', rarity: 'epic', setId: 'set_mythic', effect: { type: 'fragment_mult', value: 0.2 }, owned: false, equipped: false },
  { id: 'art_unicorn_bowl', name: 'Tigela de Unicórnio', icon: '🦄', description: 'Mágico e puro.', rarity: 'epic', setId: 'set_mythic', effect: { type: 'golden_rate', value: 0.3 }, owned: false, equipped: false },
  { id: 'art_void_pan', name: 'Frigideira do Vazio', icon: '🍳', description: 'Frita no vazio.', rarity: 'legendary', setId: 'set_cosmic', effect: { type: 'cps_mult', value: 0.4 }, owned: false, equipped: false },
  { id: 'art_time_oven', name: 'Forno Temporal', icon: '⏰', description: 'Assa em zero tempo.', rarity: 'legendary', setId: 'set_cosmic', effect: { type: 'cps_mult', value: 0.5 }, owned: false, equipped: false },
  { id: 'art_cosmic_fryer', name: 'Fritadeira Cósmica', icon: '🌌', description: 'Do espaço profundo.', rarity: 'legendary', setId: 'set_cosmic', effect: { type: 'click_mult', value: 0.5 }, owned: false, equipped: false },
  { id: 'art_omega_plate', name: 'Prato Ômega', icon: 'Ω', description: 'O último prato.', rarity: 'mythic', setId: 'set_ultimate', effect: { type: 'cps_mult', value: 1 }, owned: false, equipped: false },
  { id: 'art_alpha_cup', name: 'Cálice Alpha', icon: 'α', description: 'O primeiro cálice.', rarity: 'mythic', setId: 'set_ultimate', effect: { type: 'click_mult', value: 1 }, owned: false, equipped: false },
  { id: 'art_genesis_fork', name: 'Garfo Gênesis', icon: '🍴', description: 'Criou tudo.', rarity: 'mythic', setId: 'set_ultimate', effect: { type: 'golden_rate', value: 1 }, owned: false, equipped: false },
];

export const ARTIFACT_SETS: ArtifactSet[] = [
  { id: 'set_kitchen', name: 'Conjunto da Cozinha', pieces: ['art_wooden_spoon', 'art_iron_pot', 'art_chef_hat'], bonuses: [{ piecesRequired: 2, effect: { type: 'cps_mult', value: 0.2 } }, { piecesRequired: 3, effect: { type: 'cps_mult', value: 0.5 } }] },
  { id: 'set_golden', name: 'Conjunto Dourado', pieces: ['art_golden_whisk', 'art_golden_tray', 'art_golden_knife'], bonuses: [{ piecesRequired: 2, effect: { type: 'golden_rate', value: 0.5 } }, { piecesRequired: 3, effect: { type: 'cps_mult', value: 1 } }] },
  { id: 'set_mythic', name: 'Conjunto Mítico', pieces: ['art_dragon_spatula', 'art_phoenix_ladle', 'art_unicorn_bowl'], bonuses: [{ piecesRequired: 2, effect: { type: 'cps_mult', value: 0.5 } }, { piecesRequired: 3, effect: { type: 'fragment_mult', value: 1 } }] },
  { id: 'set_cosmic', name: 'Conjunto Cósmico', pieces: ['art_void_pan', 'art_time_oven', 'art_cosmic_fryer'], bonuses: [{ piecesRequired: 2, effect: { type: 'cps_mult', value: 1 } }, { piecesRequired: 3, effect: { type: 'cps_mult', value: 3 } }] },
  { id: 'set_ultimate', name: 'Conjunto Supremo', pieces: ['art_omega_plate', 'art_alpha_cup', 'art_genesis_fork'], bonuses: [{ piecesRequired: 2, effect: { type: 'cps_mult', value: 2 } }, { piecesRequired: 3, effect: { type: 'cps_mult', value: 10 } }] },
];

// ── ENCHANTMENTS (20) ────────────────────────────────────────────────────────

export const INITIAL_ENCHANTMENTS: Enchantment[] = [
  { id: 'enc_speed', name: 'Velocidade', description: 'CPS +5% por nível.', icon: '⚡', targetType: 'global', effect: { type: 'cps_mult', value: 0.05 }, level: 0, maxLevel: 20, costPerLevel: [{ type: 'coxinhas', amount: 1e10 }, { type: 'fragments', amount: 10 }], unlocked: true },
  { id: 'enc_power', name: 'Poder', description: 'Clique +5% por nível.', icon: '💪', targetType: 'click', effect: { type: 'click_mult', value: 0.05 }, level: 0, maxLevel: 20, costPerLevel: [{ type: 'coxinhas', amount: 1e10 }, { type: 'fragments', amount: 10 }], unlocked: true },
  { id: 'enc_fortune', name: 'Fortuna', description: 'Golden +5% por nível.', icon: '🍀', targetType: 'global', effect: { type: 'golden_rate', value: 0.05 }, level: 0, maxLevel: 15, costPerLevel: [{ type: 'coxinhas', amount: 1e12 }, { type: 'golden_essence', amount: 5 }], unlocked: true },
  { id: 'enc_wisdom', name: 'Sabedoria', description: 'XP +5% por nível.', icon: '📚', targetType: 'global', effect: { type: 'xp_mult', value: 0.05 }, level: 0, maxLevel: 15, costPerLevel: [{ type: 'coxinhas', amount: 1e12 }, { type: 'stardust', amount: 5 }], unlocked: true },
  { id: 'enc_economy', name: 'Economia', description: 'Custo -2% por nível.', icon: '💰', targetType: 'global', effect: { type: 'cost_reduction', value: 0.02 }, level: 0, maxLevel: 10, costPerLevel: [{ type: 'coxinhas', amount: 1e14 }, { type: 'fragments', amount: 25 }], unlocked: false },
  { id: 'enc_crit', name: 'Precisão', description: 'Crit +1% por nível.', icon: '🎯', targetType: 'click', effect: { type: 'crit_chance', value: 0.01 }, level: 0, maxLevel: 10, costPerLevel: [{ type: 'coxinhas', amount: 1e15 }, { type: 'golden_essence', amount: 10 }], unlocked: false },
  { id: 'enc_prestige', name: 'Prestígio', description: 'Fragmentos +5% por nível.', icon: '👑', targetType: 'global', effect: { type: 'fragment_mult', value: 0.05 }, level: 0, maxLevel: 15, costPerLevel: [{ type: 'fragments', amount: 50 }], unlocked: false },
  { id: 'enc_offline', name: 'Persistência', description: 'Offline +5% por nível.', icon: '💤', targetType: 'global', effect: { type: 'offline_mult', value: 0.05 }, level: 0, maxLevel: 10, costPerLevel: [{ type: 'coxinhas', amount: 1e16 }, { type: 'stardust', amount: 20 }], unlocked: false },
  { id: 'enc_combo', name: 'Frenesi', description: 'Combo +5% por nível.', icon: '🔥', targetType: 'click', effect: { type: 'combo_mult', value: 0.05 }, level: 0, maxLevel: 10, costPerLevel: [{ type: 'coxinhas', amount: 1e14 }, { type: 'fragments', amount: 20 }], unlocked: false },
  { id: 'enc_divine', name: 'Divindade', description: 'CPS +10% por nível.', icon: '✨', targetType: 'global', effect: { type: 'cps_mult', value: 0.1 }, level: 0, maxLevel: 30, costPerLevel: [{ type: 'coxinhas', amount: 1e20 }, { type: 'fragments', amount: 100 }, { type: 'golden_essence', amount: 20 }], unlocked: false },
];

// ── TRADE OFFERS (15) ────────────────────────────────────────────────────────

export const INITIAL_TRADE_OFFERS: TradeOffer[] = [
  { id: 'trade_cox_frag', name: 'Coxinhas → Fragmentos', icon: '💎', give: { type: 'coxinhas', amount: 1e12 }, receive: { type: 'fragments', amount: 10 }, available: true, timesTraded: 0, maxTrades: 10, refreshesAt: 0 },
  { id: 'trade_cox_star', name: 'Coxinhas → Stardust', icon: '⭐', give: { type: 'coxinhas', amount: 1e10 }, receive: { type: 'stardust', amount: 5 }, available: true, timesTraded: 0, maxTrades: 10, refreshesAt: 0 },
  { id: 'trade_frag_gold', name: 'Fragmentos → Essência', icon: '✨', give: { type: 'fragments', amount: 50 }, receive: { type: 'golden_essence', amount: 20 }, available: true, timesTraded: 0, maxTrades: 5, refreshesAt: 0 },
  { id: 'trade_star_flour', name: 'Stardust → Farinha', icon: '🌾', give: { type: 'stardust', amount: 30 }, receive: { type: 'cosmic_flour', amount: 10 }, available: true, timesTraded: 0, maxTrades: 5, refreshesAt: 0 },
  { id: 'trade_frag_cox', name: 'Fragmentos → Coxinhas', icon: '🥟', give: { type: 'fragments', amount: 10 }, receive: { type: 'coxinhas', amount: 1e15 }, available: true, timesTraded: 0, maxTrades: 5, refreshesAt: 0 },
  { id: 'trade_gold_frag', name: 'Essência → Fragmentos', icon: '💎', give: { type: 'golden_essence', amount: 20 }, receive: { type: 'fragments', amount: 100 }, available: true, timesTraded: 0, maxTrades: 3, refreshesAt: 0 },
  { id: 'trade_flour_star', name: 'Farinha → Stardust', icon: '⭐', give: { type: 'cosmic_flour', amount: 10 }, receive: { type: 'stardust', amount: 50 }, available: true, timesTraded: 0, maxTrades: 3, refreshesAt: 0 },
  { id: 'trade_bulk_frag', name: 'Mega Trade: Fragmentos', icon: '💰', give: { type: 'coxinhas', amount: 1e18 }, receive: { type: 'fragments', amount: 500 }, available: true, timesTraded: 0, maxTrades: 3, refreshesAt: 0 },
  { id: 'trade_sp', name: 'Fragmentos → Skill Point', icon: '📚', give: { type: 'fragments', amount: 100 }, receive: { type: 'skillPoints', amount: 1 }, available: true, timesTraded: 0, maxTrades: 5, refreshesAt: 0 },
  { id: 'trade_mega_cox', name: 'Tudo por Coxinhas', icon: '🥟', give: { type: 'fragments', amount: 500 }, receive: { type: 'coxinhas', amount: 1e25 }, available: true, timesTraded: 0, maxTrades: 1, refreshesAt: 0 },
];

// ── MINI-GAMES (6) ───────────────────────────────────────────────────────────

export const INITIAL_MINIGAMES: MiniGameState[] = [
  { id: 'mg_wheel', name: 'Roda da Sorte', description: 'Gire e ganhe!', icon: '🎡', type: 'lucky_wheel', cost: { type: 'coxinhas', amount: 1e8 }, cooldown: 60000, lastPlayed: 0, timesPlayed: 0, unlocked: true, totalWinnings: 0 },
  { id: 'mg_slots', name: 'Caça-Níquel Coxinheiro', description: '777 = Jackpot!', icon: '🎰', type: 'slots', cost: { type: 'coxinhas', amount: 1e10 }, cooldown: 30000, lastPlayed: 0, timesPlayed: 0, unlocked: true, totalWinnings: 0 },
  { id: 'mg_scratch', name: 'Raspadinha da Sorte', description: 'Raspe e descubra!', icon: '🎫', type: 'scratch', cost: { type: 'coxinhas', amount: 1e6 }, cooldown: 120000, lastPlayed: 0, timesPlayed: 0, unlocked: true, totalWinnings: 0 },
  { id: 'mg_trivia', name: 'Quiz Coxinhístico', description: 'Teste seus conhecimentos!', icon: '❓', type: 'trivia', cost: { type: 'coxinhas', amount: 1e9 }, cooldown: 300000, lastPlayed: 0, timesPlayed: 0, unlocked: false, totalWinnings: 0 },
  { id: 'mg_memory', name: 'Memória de Sabores', description: 'Combinação perfeita!', icon: '🧠', type: 'memory', cost: { type: 'coxinhas', amount: 1e11 }, cooldown: 180000, lastPlayed: 0, timesPlayed: 0, unlocked: false, totalWinnings: 0 },
  { id: 'mg_race', name: 'Corrida de Coxinhas', description: 'Quem chega primeiro!', icon: '🏁', type: 'clicker_race', cost: { type: 'coxinhas', amount: 1e12 }, cooldown: 600000, lastPlayed: 0, timesPlayed: 0, unlocked: false, totalWinnings: 0 },
];

// ── SEEDS (15) ───────────────────────────────────────────────────────────────

export const INITIAL_SEEDS: Seed[] = [
  { id: 'seed_wheat', name: 'Trigo', icon: '🌾', growTime: 60000, yield: { type: 'coxinhas', amount: 1e6 }, rarity: 'common' },
  { id: 'seed_potato', name: 'Batata', icon: '🥔', growTime: 120000, yield: { type: 'coxinhas', amount: 1e8 }, rarity: 'common' },
  { id: 'seed_onion', name: 'Cebola', icon: '🧅', growTime: 180000, yield: { type: 'coxinhas', amount: 1e10 }, rarity: 'common' },
  { id: 'seed_tomato', name: 'Tomate', icon: '🍅', growTime: 240000, yield: { type: 'fragments', amount: 5 }, rarity: 'rare' },
  { id: 'seed_pepper', name: 'Pimenta', icon: '🌶️', growTime: 300000, yield: { type: 'coxinhas', amount: 1e12 }, rarity: 'rare' },
  { id: 'seed_garlic', name: 'Alho Mágico', icon: '🧄', growTime: 600000, yield: { type: 'golden_essence', amount: 5 }, rarity: 'rare' },
  { id: 'seed_mushroom', name: 'Cogumelo Místico', icon: '🍄', growTime: 900000, yield: { type: 'stardust', amount: 10 }, rarity: 'epic' },
  { id: 'seed_crystal', name: 'Cristal Vegetal', icon: '💎', growTime: 1800000, yield: { type: 'fragments', amount: 50 }, rarity: 'epic' },
  { id: 'seed_star_fruit', name: 'Fruta Estelar', icon: '⭐', growTime: 3600000, yield: { type: 'stardust', amount: 100 }, rarity: 'legendary' },
  { id: 'seed_void_berry', name: 'Baga do Vazio', icon: '🖤', growTime: 7200000, yield: { type: 'fragments', amount: 500 }, rarity: 'legendary' },
  { id: 'seed_golden_apple', name: 'Maçã Dourada', icon: '🍎', growTime: 14400000, yield: { type: 'golden_essence', amount: 200 }, rarity: 'mythic' },
];

// ── SEASONS (4) ──────────────────────────────────────────────────────────────

export const INITIAL_SEASONS: SeasonEvent[] = [
  { id: 'season_spring', name: 'Primavera Coxinheira', description: 'Tudo floresce! Produção +20%.', icon: '🌸', theme: 'spring', bonuses: [{ type: 'cps_mult', value: 1.2 }, { type: 'garden_speed', value: 1.5 }], exclusiveItems: ['seed_cherry_blossom'], startMonth: 3, endMonth: 5 },
  { id: 'season_summer', name: 'Verão Fritoso', description: 'Calor perfeito para fritar! Cliques +30%.', icon: '☀️', theme: 'summer', bonuses: [{ type: 'click_mult', value: 1.3 }, { type: 'golden_rate', value: 1.2 }], exclusiveItems: ['seed_sunflower'], startMonth: 6, endMonth: 8 },
  { id: 'season_autumn', name: 'Outono Colheita', description: 'Época de colheita! Fragmentos +25%.', icon: '🍂', theme: 'autumn', bonuses: [{ type: 'fragment_mult', value: 1.25 }, { type: 'xp_mult', value: 1.2 }], exclusiveItems: ['seed_pumpkin'], startMonth: 9, endMonth: 11 },
  { id: 'season_winter', name: 'Inverno Nuclear', description: 'Frio que preserva! Golden x2.', icon: '❄️', theme: 'winter', bonuses: [{ type: 'golden_rate', value: 2 }, { type: 'cost_reduction', value: 0.9 }], exclusiveItems: ['seed_frost_berry'], startMonth: 12, endMonth: 2 },
];

// ── DEFAULT STATE HELPERS ────────────────────────────────────────────────────

export function createDefaultWeather(): WeatherState {
  const w = WEATHER_TYPES[0]; // sunny
  return { current: w, changesAt: Date.now() + w.duration, history: [] };
}

export function createDefaultAscension(): AscensionState {
  return {
    layers: [
      { tier: 1, name: 'Rebirth', count: 0, totalPower: 0, currency: 'fragments', multiplier: 1, unlockedAt: 0 },
      { tier: 2, name: 'Ascensão', count: 0, totalPower: 0, currency: 'stardust', multiplier: 0, unlockedAt: 0 },
      { tier: 3, name: 'Transcendência', count: 0, totalPower: 0, currency: 'cosmic_flour', multiplier: 0, unlockedAt: 0 },
    ],
    totalAscensions: 0,
    ascensionPower: 0,
  };
}

export function createDefaultGarden(): GardenPlot[] {
  return Array.from({ length: 6 }, (_, i) => ({
    id: i, seed: null, plantedAt: 0, harvestAt: 0, watered: false, fertilized: false
  }));
}
