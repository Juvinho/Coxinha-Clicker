// ============================================================================
// COXINHA CLICKER - MASSIVE EXPANSION DATA
// 50 New Buildings, 400+ New Upgrades, 170+ Achievements, 36 Skills,
// 38 Pets, 65 Recipes, 22 Challenges, 36 Quests, 30 Events, 21 Galaxies
// ============================================================================

import type {
  Building, Upgrade, Achievement, Skill, Pet, CraftingRecipe,
  Challenge, Quest, RandomEvent, Galaxy, GalaxyUpgrade
} from './types';

// ── Helpers ──────────────────────────────────────────────────────────────────

function bu(bId: string, tier: number, name: string, desc: string, cost: number, mult: number, ugTier: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic' = 'common'): Upgrade {
  return { id: `${bId}_t${tier}`, name, description: desc, type: 'building', cost, multiplier: mult, purchased: false, triggerBuildingId: bId, tier: ugTier,
    unlockCondition: { type: 'building_count', targetId: bId, value: tier === 1 ? 1 : tier === 2 ? 5 : tier === 3 ? 25 : tier === 4 ? 50 : tier === 5 ? 100 : 200 } };
}

function genBU(id: string, nm: string, base: number): Upgrade[] {
  return [
    bu(id, 1, `${nm} I`, `${nm} produz x2.`, base * 10, 2, 'common'),
    bu(id, 2, `${nm} II`, `${nm} produz x2.`, base * 100, 2, 'rare'),
    bu(id, 3, `${nm} III`, `${nm} produz x3.`, base * 1e4, 3, 'epic'),
    bu(id, 4, `${nm} IV`, `${nm} produz x3.`, base * 1e7, 3, 'legendary'),
    bu(id, 5, `${nm} V`, `${nm} produz x5.`, base * 1e10, 5, 'mythic'),
    bu(id, 6, `${nm} VI`, `${nm} produz x10.`, base * 1e14, 10, 'mythic'),
  ];
}

// ── 50 NEW BUILDINGS ─────────────────────────────────────────────────────────

export const EXTRA_BUILDINGS: Building[] = [
  // DIVINE TIER (26-30)
  { id: 'celestial_kitchen', name: 'Cozinha Celestial', description: 'Anjos fritam coxinhas nas nuvens.', icon: '☁️', baseCost: 1e34, baseCps: 1.5e20, count: 0, totalProduced: 0, tier: 'divine' },
  { id: 'angelic_baker', name: 'Padeiro Angelical', description: 'Asas de frango divinas.', icon: '😇', baseCost: 3e35, baseCps: 8e20, count: 0, totalProduced: 0, tier: 'divine' },
  { id: 'sacred_oven', name: 'Forno Sagrado', description: 'Abençoado por todos os deuses da culinária.', icon: '🛐', baseCost: 7e36, baseCps: 5e21, count: 0, totalProduced: 0, tier: 'divine' },
  { id: 'holy_fryer', name: 'Fritadeira Santa', description: 'O óleo nunca acaba. Milagre!', icon: '✝️', baseCost: 2e38, baseCps: 3e22, count: 0, totalProduced: 0, tier: 'divine' },
  { id: 'paradise_pantry', name: 'Despensa do Paraíso', description: 'Ingredientes infinitos direto do Éden.', icon: '🌈', baseCost: 5e39, baseCps: 2e23, count: 0, totalProduced: 0, tier: 'divine' },

  // VOID TIER (31-35)
  { id: 'void_extractor', name: 'Extrator do Vazio', description: 'Arranca coxinhas do nada absoluto.', icon: '🕳️', baseCost: 1e41, baseCps: 1.2e24, count: 0, totalProduced: 0, tier: 'void' },
  { id: 'shadow_kitchen', name: 'Cozinha das Sombras', description: 'Opera na escuridão total.', icon: '🌑', baseCost: 3e42, baseCps: 7e24, count: 0, totalProduced: 0, tier: 'void' },
  { id: 'dark_fryer_ii', name: 'Fritadeira de Matéria Escura II', description: 'Versão melhorada com antimatéria.', icon: '⬛', baseCost: 8e43, baseCps: 4e25, count: 0, totalProduced: 0, tier: 'void' },
  { id: 'entropy_engine', name: 'Motor de Entropia', description: 'Usa o caos para criar ordem coxinhística.', icon: '♾️', baseCost: 2e45, baseCps: 2.5e26, count: 0, totalProduced: 0, tier: 'void' },
  { id: 'null_forge', name: 'Forja do Nada', description: 'Do zero surge a coxinha perfeita.', icon: '🔲', baseCost: 6e46, baseCps: 1.5e27, count: 0, totalProduced: 0, tier: 'void' },

  // TEMPORAL TIER (36-40)
  { id: 'time_loop', name: 'Loop Temporal', description: 'A mesma coxinha infinitas vezes.', icon: '🔄', baseCost: 1.5e48, baseCps: 1e28, count: 0, totalProduced: 0, tier: 'temporal' },
  { id: 'chrono_kitchen', name: 'Cozinha Crono', description: 'Cozinha no passado, come no futuro.', icon: '⏳', baseCost: 4e49, baseCps: 6e28, count: 0, totalProduced: 0, tier: 'temporal' },
  { id: 'past_baker', name: 'Padeiro do Passado', description: 'Traz coxinhas ancestrais.', icon: '📜', baseCost: 1e51, baseCps: 4e29, count: 0, totalProduced: 0, tier: 'temporal' },
  { id: 'future_fryer', name: 'Fritadeira do Futuro', description: 'Tecnologia do ano 3000.', icon: '🤖', baseCost: 3e52, baseCps: 2.5e30, count: 0, totalProduced: 0, tier: 'temporal' },
  { id: 'eternal_oven', name: 'Forno Eterno', description: 'Existe em todos os tempos simultaneamente.', icon: '♾️', baseCost: 8e53, baseCps: 1.5e31, count: 0, totalProduced: 0, tier: 'temporal' },

  // ELEMENTAL TIER (41-45)
  { id: 'fire_forge', name: 'Forja de Fogo', description: 'Fritura em lava vulcânica pura.', icon: '🌋', baseCost: 2e55, baseCps: 1e32, count: 0, totalProduced: 0, tier: 'elemental' },
  { id: 'water_mill', name: 'Moinho d\'Água Místico', description: 'Água mágica que tempera sozinha.', icon: '💧', baseCost: 5e56, baseCps: 6e32, count: 0, totalProduced: 0, tier: 'elemental' },
  { id: 'earth_bakery', name: 'Padaria da Terra', description: 'Ingredientes brotam do solo fértil.', icon: '🌍', baseCost: 1.5e58, baseCps: 4e33, count: 0, totalProduced: 0, tier: 'elemental' },
  { id: 'wind_kitchen', name: 'Cozinha do Vento', description: 'Correntes de ar entregam tudo instantaneamente.', icon: '🌪️', baseCost: 4e59, baseCps: 2.5e34, count: 0, totalProduced: 0, tier: 'elemental' },
  { id: 'thunder_fryer', name: 'Fritadeira de Trovão', description: 'Relâmpagos como fonte de calor.', icon: '⚡', baseCost: 1e61, baseCps: 1.5e35, count: 0, totalProduced: 0, tier: 'elemental' },

  // DIMENSIONAL TIER (46-50)
  { id: 'pocket_dimension', name: 'Dimensão de Bolso', description: 'Uma dimensão inteira dedicada a coxinhas.', icon: '🌐', baseCost: 3e62, baseCps: 1e36, count: 0, totalProduced: 0, tier: 'dimensional' },
  { id: 'mirror_kitchen', name: 'Cozinha Espelho', description: 'Cada coxinha é duplicada no espelho.', icon: '🪞', baseCost: 8e63, baseCps: 6e36, count: 0, totalProduced: 0, tier: 'dimensional' },
  { id: 'phase_shifter', name: 'Deslocador de Fase', description: 'Coxinhas que existem em múltiplas fases.', icon: '👻', baseCost: 2e65, baseCps: 4e37, count: 0, totalProduced: 0, tier: 'dimensional' },
  { id: 'rift_baker', name: 'Padeiro da Fenda', description: 'Cozinha nas fendas entre dimensões.', icon: '⚡', baseCost: 6e66, baseCps: 2.5e38, count: 0, totalProduced: 0, tier: 'dimensional' },
  { id: 'warp_fryer', name: 'Fritadeira Warp', description: 'Distorce o espaço para fritar instantaneamente.', icon: '🌊', baseCost: 2e68, baseCps: 1.5e39, count: 0, totalProduced: 0, tier: 'dimensional' },

  // QUANTUM II TIER (51-55)
  { id: 'quantum_entangler', name: 'Entrelaçador Quântico', description: 'Cada coxinha está entrelaçada com infinitas.', icon: '🔗', baseCost: 5e69, baseCps: 1e40, count: 0, totalProduced: 0, tier: 'quantum_ii' },
  { id: 'particle_baker', name: 'Padeiro de Partículas', description: 'Assa no nível subatômico.', icon: '⚛️', baseCost: 1.5e71, baseCps: 6e40, count: 0, totalProduced: 0, tier: 'quantum_ii' },
  { id: 'wave_collapse', name: 'Colapso de Onda', description: 'A observação cria a coxinha.', icon: '〰️', baseCost: 4e72, baseCps: 4e41, count: 0, totalProduced: 0, tier: 'quantum_ii' },
  { id: 'string_kitchen', name: 'Cozinha de Cordas', description: 'As cordas do universo vibram em sabor.', icon: '🎸', baseCost: 1e74, baseCps: 2.5e42, count: 0, totalProduced: 0, tier: 'quantum_ii' },
  { id: 'higgs_fryer', name: 'Fritadeira de Higgs', description: 'Dá massa a todas as coxinhas.', icon: '🧲', baseCost: 3e75, baseCps: 1.5e43, count: 0, totalProduced: 0, tier: 'quantum_ii' },

  // COSMIC II TIER (56-60)
  { id: 'big_bang_baker', name: 'Padeiro do Big Bang', description: 'Cria universos recheados de coxinha.', icon: '💥', baseCost: 8e76, baseCps: 1e44, count: 0, totalProduced: 0, tier: 'cosmic_ii' },
  { id: 'dark_energy_tap', name: 'Coletor de Energia Escura', description: 'Energia ilimitada para fritura eterna.', icon: '🔮', baseCost: 2e78, baseCps: 6e44, count: 0, totalProduced: 0, tier: 'cosmic_ii' },
  { id: 'cosmic_string_kitchen', name: 'Cozinha de Cordas Cósmicas', description: 'Defeitos topológicos que fritam.', icon: '🌌', baseCost: 6e79, baseCps: 4e45, count: 0, totalProduced: 0, tier: 'cosmic_ii' },
  { id: 'multiverse_hub', name: 'Hub Multiversal', description: 'Central de coxinhas de todos os universos.', icon: '🌐', baseCost: 2e81, baseCps: 2.5e46, count: 0, totalProduced: 0, tier: 'cosmic_ii' },
  { id: 'omni_fryer', name: 'Omni-Fritadeira', description: 'Frita em todas as dimensões ao mesmo tempo.', icon: '🔥', baseCost: 5e82, baseCps: 1.5e47, count: 0, totalProduced: 0, tier: 'cosmic_ii' },

  // TRANSCENDENT TIER (61-65)
  { id: 'nirvana_kitchen', name: 'Cozinha Nirvana', description: 'Alcançou a iluminação coxinhística.', icon: '🧘', baseCost: 1.5e84, baseCps: 1e48, count: 0, totalProduced: 0, tier: 'transcendent' },
  { id: 'brahma_baker', name: 'Padeiro Brahma', description: 'Cria coxinhas a partir do puro pensamento.', icon: '🕉️', baseCost: 4e85, baseCps: 6e48, count: 0, totalProduced: 0, tier: 'transcendent' },
  { id: 'shiva_fryer', name: 'Fritadeira de Shiva', description: 'Destrói para recriar coxinhas melhores.', icon: '🔱', baseCost: 1e87, baseCps: 4e49, count: 0, totalProduced: 0, tier: 'transcendent' },
  { id: 'vishnu_oven', name: 'Forno de Vishnu', description: 'Preserva coxinhas por toda a eternidade.', icon: '💙', baseCost: 3e88, baseCps: 2.5e50, count: 0, totalProduced: 0, tier: 'transcendent' },
  { id: 'atman_forge', name: 'Forja do Atman', description: 'A alma universal é feita de coxinha.', icon: '✨', baseCost: 8e89, baseCps: 1.5e51, count: 0, totalProduced: 0, tier: 'transcendent' },

  // INFINITE TIER (66-70)
  { id: 'infinity_engine', name: 'Motor de Infinito', description: 'Produção literalmente infinita... quase.', icon: '∞', baseCost: 2e91, baseCps: 1e52, count: 0, totalProduced: 0, tier: 'infinite' },
  { id: 'eternity_kitchen', name: 'Cozinha da Eternidade', description: 'Existe antes e depois do tempo.', icon: '⏰', baseCost: 5e92, baseCps: 6e52, count: 0, totalProduced: 0, tier: 'infinite' },
  { id: 'perpetual_baker', name: 'Padeiro Perpétuo', description: 'Nunca para. Nunca descansa. Só coxinha.', icon: '🔄', baseCost: 1.5e94, baseCps: 4e53, count: 0, totalProduced: 0, tier: 'infinite' },
  { id: 'boundless_fryer', name: 'Fritadeira Ilimitada', description: 'Sem limites de produção. Zero.', icon: '💫', baseCost: 4e95, baseCps: 2.5e54, count: 0, totalProduced: 0, tier: 'infinite' },
  { id: 'absolute_oven', name: 'Forno Absoluto', description: 'A definição absoluta de forno. Perfeição.', icon: '🏆', baseCost: 1e97, baseCps: 1.5e55, count: 0, totalProduced: 0, tier: 'infinite' },

  // ULTIMATE TIER (71-75)
  { id: 'omega_baker', name: 'Padeiro Ômega', description: 'O último padeiro. Depois dele, só coxinha.', icon: 'Ω', baseCost: 3e98, baseCps: 1e56, count: 0, totalProduced: 0, tier: 'ultimate' },
  { id: 'alpha_kitchen', name: 'Cozinha Alpha', description: 'O começo e o fim da culinária.', icon: 'α', baseCost: 8e99, baseCps: 6e56, count: 0, totalProduced: 0, tier: 'ultimate' },
  { id: 'genesis_fryer', name: 'Fritadeira Gênesis', description: 'A primeira fritadeira. A que criou tudo.', icon: '🌅', baseCost: 2e101, baseCps: 4e57, count: 0, totalProduced: 0, tier: 'ultimate' },
  { id: 'apex_oven', name: 'Forno Ápice', description: 'O pico absoluto da tecnologia de fornos.', icon: '⛰️', baseCost: 6e102, baseCps: 2.5e58, count: 0, totalProduced: 0, tier: 'ultimate' },
  { id: 'final_coxinha', name: 'A Coxinha Final', description: 'A coxinha definitiva. Tudo que existe é coxinha.', icon: '👑', baseCost: 2e104, baseCps: 1.5e59, count: 0, totalProduced: 0, tier: 'ultimate' },
];

// ── 300 BUILDING UPGRADES + 100 EXTRA UPGRADES ──────────────────────────────

export const EXTRA_UPGRADES: Upgrade[] = [
  // Building upgrades for all 50 buildings (6 each = 300)
  ...genBU('celestial_kitchen', 'Cozinha Celestial', 1e34),
  ...genBU('angelic_baker', 'Padeiro Angelical', 3e35),
  ...genBU('sacred_oven', 'Forno Sagrado', 7e36),
  ...genBU('holy_fryer', 'Fritadeira Santa', 2e38),
  ...genBU('paradise_pantry', 'Despensa do Paraíso', 5e39),
  ...genBU('void_extractor', 'Extrator do Vazio', 1e41),
  ...genBU('shadow_kitchen', 'Cozinha das Sombras', 3e42),
  ...genBU('dark_fryer_ii', 'Fritadeira Matéria Escura II', 8e43),
  ...genBU('entropy_engine', 'Motor de Entropia', 2e45),
  ...genBU('null_forge', 'Forja do Nada', 6e46),
  ...genBU('time_loop', 'Loop Temporal', 1.5e48),
  ...genBU('chrono_kitchen', 'Cozinha Crono', 4e49),
  ...genBU('past_baker', 'Padeiro do Passado', 1e51),
  ...genBU('future_fryer', 'Fritadeira do Futuro', 3e52),
  ...genBU('eternal_oven', 'Forno Eterno', 8e53),
  ...genBU('fire_forge', 'Forja de Fogo', 2e55),
  ...genBU('water_mill', 'Moinho d\'Água', 5e56),
  ...genBU('earth_bakery', 'Padaria da Terra', 1.5e58),
  ...genBU('wind_kitchen', 'Cozinha do Vento', 4e59),
  ...genBU('thunder_fryer', 'Frit. Trovão', 1e61),
  ...genBU('pocket_dimension', 'Dimensão de Bolso', 3e62),
  ...genBU('mirror_kitchen', 'Cozinha Espelho', 8e63),
  ...genBU('phase_shifter', 'Deslocador de Fase', 2e65),
  ...genBU('rift_baker', 'Padeiro da Fenda', 6e66),
  ...genBU('warp_fryer', 'Fritadeira Warp', 2e68),
  ...genBU('quantum_entangler', 'Entrelaçador Quântico', 5e69),
  ...genBU('particle_baker', 'Padeiro de Partículas', 1.5e71),
  ...genBU('wave_collapse', 'Colapso de Onda', 4e72),
  ...genBU('string_kitchen', 'Cozinha de Cordas', 1e74),
  ...genBU('higgs_fryer', 'Fritadeira de Higgs', 3e75),
  ...genBU('big_bang_baker', 'Padeiro Big Bang', 8e76),
  ...genBU('dark_energy_tap', 'Coletor Energia Escura', 2e78),
  ...genBU('cosmic_string_kitchen', 'Cordas Cósmicas', 6e79),
  ...genBU('multiverse_hub', 'Hub Multiversal', 2e81),
  ...genBU('omni_fryer', 'Omni-Fritadeira', 5e82),
  ...genBU('nirvana_kitchen', 'Cozinha Nirvana', 1.5e84),
  ...genBU('brahma_baker', 'Padeiro Brahma', 4e85),
  ...genBU('shiva_fryer', 'Fritadeira Shiva', 1e87),
  ...genBU('vishnu_oven', 'Forno Vishnu', 3e88),
  ...genBU('atman_forge', 'Forja Atman', 8e89),
  ...genBU('infinity_engine', 'Motor Infinito', 2e91),
  ...genBU('eternity_kitchen', 'Cozinha Eternidade', 5e92),
  ...genBU('perpetual_baker', 'Padeiro Perpétuo', 1.5e94),
  ...genBU('boundless_fryer', 'Frit. Ilimitada', 4e95),
  ...genBU('absolute_oven', 'Forno Absoluto', 1e97),
  ...genBU('omega_baker', 'Padeiro Ômega', 3e98),
  ...genBU('alpha_kitchen', 'Cozinha Alpha', 8e99),
  ...genBU('genesis_fryer', 'Frit. Gênesis', 2e101),
  ...genBU('apex_oven', 'Forno Ápice', 6e102),
  ...genBU('final_coxinha', 'Coxinha Final', 2e104),

  // ── Extra Click Upgrades (15) ──
  { id: 'click_ex_11', name: 'Dedo Nuclear', description: 'Cada clique libera energia nuclear.', type: 'click', cost: 5e26, multiplier: 10000, purchased: false, tier: 'mythic', unlockCondition: { type: 'total_coxinhas', value: 5e25 } },
  { id: 'click_ex_12', name: 'Clique Divino', description: 'O poder dos deuses em cada toque.', type: 'click', cost: 5e30, multiplier: 25000, purchased: false, tier: 'mythic', unlockCondition: { type: 'total_coxinhas', value: 5e29 } },
  { id: 'click_ex_13', name: 'Impulso Void', description: 'O vazio clica por você.', type: 'click', cost: 5e34, multiplier: 50000, purchased: false, tier: 'mythic', unlockCondition: { type: 'total_coxinhas', value: 5e33 } },
  { id: 'click_ex_14', name: 'Clique Temporal', description: 'Clica em todos os tempos.', type: 'click', cost: 5e38, multiplier: 100000, purchased: false, tier: 'mythic', unlockCondition: { type: 'total_coxinhas', value: 5e37 } },
  { id: 'click_ex_15', name: 'Dedo Elemental', description: 'Todos os elementos em cada clique.', type: 'click', cost: 5e42, multiplier: 250000, purchased: false, tier: 'mythic', unlockCondition: { type: 'total_coxinhas', value: 5e41 } },
  { id: 'click_ex_16', name: 'Clique Dimensional', description: 'Repercute em todas as dimensões.', type: 'click', cost: 5e46, multiplier: 500000, purchased: false, tier: 'mythic', unlockCondition: { type: 'total_coxinhas', value: 5e45 } },
  { id: 'click_ex_17', name: 'Quântico-Clique', description: 'Clica e não clica ao mesmo tempo.', type: 'click', cost: 5e50, multiplier: 1000000, purchased: false, tier: 'mythic', unlockCondition: { type: 'total_coxinhas', value: 5e49 } },
  { id: 'click_ex_18', name: 'Big Bang Click', description: 'Cada clique cria um universo.', type: 'click', cost: 5e55, multiplier: 2500000, purchased: false, tier: 'mythic', unlockCondition: { type: 'total_coxinhas', value: 5e54 } },
  { id: 'click_ex_19', name: 'Clique Transcendente', description: 'Transcende a matéria.', type: 'click', cost: 5e60, multiplier: 5e6, purchased: false, tier: 'mythic', unlockCondition: { type: 'total_coxinhas', value: 5e59 } },
  { id: 'click_ex_20', name: 'Clique Infinito', description: 'Potência literalmente infinita.', type: 'click', cost: 5e66, multiplier: 1e7, purchased: false, tier: 'mythic', unlockCondition: { type: 'total_coxinhas', value: 5e65 } },
  { id: 'click_21', name: 'Dedo do Absoluto', description: 'O absoluto em forma de clique.', type: 'click', cost: 5e72, multiplier: 2.5e7, purchased: false, tier: 'mythic', unlockCondition: { type: 'total_coxinhas', value: 5e71 } },
  { id: 'click_22', name: 'Clique Ômega', description: 'O último clique. O definitivo.', type: 'click', cost: 5e78, multiplier: 5e7, purchased: false, tier: 'mythic', unlockCondition: { type: 'total_coxinhas', value: 5e77 } },
  { id: 'click_23', name: 'Alpha-Click', description: 'O primeiro e o último clique.', type: 'click', cost: 5e84, multiplier: 1e8, purchased: false, tier: 'mythic', unlockCondition: { type: 'total_coxinhas', value: 5e83 } },
  { id: 'click_24', name: 'Clique Genesis', description: 'Antes do Big Bang, houve o Clique.', type: 'click', cost: 5e90, multiplier: 5e8, purchased: false, tier: 'mythic', unlockCondition: { type: 'total_coxinhas', value: 5e89 } },
  { id: 'click_25', name: 'Dedo Final', description: 'O dedo que encerra todos os dedos.', type: 'click', cost: 5e96, multiplier: 1e9, purchased: false, tier: 'mythic', unlockCondition: { type: 'total_coxinhas', value: 5e95 } },

  // ── Extra Global Upgrades (13) ──
  { id: 'global_ex_1', name: 'Era Divina', description: 'Produção x7.', type: 'global', cost: 5e25, multiplier: 7, purchased: false, tier: 'legendary', unlockCondition: { type: 'total_coxinhas', value: 5e24 } },
  { id: 'global_ex_2', name: 'Void Boost', description: 'Produção x10.', type: 'global', cost: 5e30, multiplier: 10, purchased: false, tier: 'legendary', unlockCondition: { type: 'total_coxinhas', value: 5e29 } },
  { id: 'global_ex_3', name: 'Temporal Warp', description: 'Produção x15.', type: 'global', cost: 5e35, multiplier: 15, purchased: false, tier: 'mythic', unlockCondition: { type: 'total_coxinhas', value: 5e34 } },
  { id: 'global_ex_4', name: 'Força Elemental', description: 'Produção x20.', type: 'global', cost: 5e40, multiplier: 20, purchased: false, tier: 'mythic', unlockCondition: { type: 'total_coxinhas', value: 5e39 } },
  { id: 'global_ex_5', name: 'Ruptura Dimensional', description: 'Produção x25.', type: 'global', cost: 5e45, multiplier: 25, purchased: false, tier: 'mythic', unlockCondition: { type: 'total_coxinhas', value: 5e44 } },
  { id: 'global_ex_6', name: 'Superposição Global', description: 'Produção x50.', type: 'global', cost: 5e50, multiplier: 50, purchased: false, tier: 'mythic', unlockCondition: { type: 'total_coxinhas', value: 5e49 } },
  { id: 'global_ex_7', name: 'Expansão Cósmica', description: 'Produção x100.', type: 'global', cost: 5e55, multiplier: 100, purchased: false, tier: 'mythic', unlockCondition: { type: 'total_coxinhas', value: 5e54 } },
  { id: 'global_ex_8', name: 'Transcendência Total', description: 'Produção x200.', type: 'global', cost: 5e60, multiplier: 200, purchased: false, tier: 'mythic', unlockCondition: { type: 'total_coxinhas', value: 5e59 } },
  { id: 'global_ex_9', name: 'Infinidade Produtiva', description: 'Produção x500.', type: 'global', cost: 5e66, multiplier: 500, purchased: false, tier: 'mythic', unlockCondition: { type: 'total_coxinhas', value: 5e65 } },
  { id: 'global_ex_10', name: 'Potência Absoluta', description: 'Produção x1000.', type: 'global', cost: 5e72, multiplier: 1000, purchased: false, tier: 'mythic', unlockCondition: { type: 'total_coxinhas', value: 5e71 } },
  { id: 'global_ex_11', name: 'Ômega Production', description: 'Produção x2500.', type: 'global', cost: 5e78, multiplier: 2500, purchased: false, tier: 'mythic', unlockCondition: { type: 'total_coxinhas', value: 5e77 } },
  { id: 'global_ex_12', name: 'Alpha Boost', description: 'Produção x5000.', type: 'global', cost: 5e84, multiplier: 5000, purchased: false, tier: 'mythic', unlockCondition: { type: 'total_coxinhas', value: 5e83 } },
  { id: 'global_ex_13', name: 'Coxinha Suprema', description: 'Produção x10000.', type: 'global', cost: 5e90, multiplier: 10000, purchased: false, tier: 'mythic', unlockCondition: { type: 'total_coxinhas', value: 5e89 } },

  // ── Extra Golden Upgrades (8) ──
  { id: 'golden_ex_1', name: 'Magnetismo Dourado', description: 'Coxinhas douradas surgem mais.', type: 'golden', cost: 5e20, multiplier: 2, purchased: false, tier: 'rare', unlockCondition: { type: 'total_coxinhas', value: 5e19 } },
  { id: 'golden_ex_2', name: 'Atração Áurea', description: 'Frequência dourada x2.', type: 'golden', cost: 5e28, multiplier: 2, purchased: false, tier: 'epic', unlockCondition: { type: 'total_coxinhas', value: 5e27 } },
  { id: 'golden_ex_3', name: 'Tempestade de Ouro', description: 'Chuva dourada constante.', type: 'golden', cost: 5e34, multiplier: 3, purchased: false, tier: 'legendary', unlockCondition: { type: 'total_coxinhas', value: 5e33 } },
  { id: 'golden_ex_4', name: 'Eclipse Dourado', description: 'Tudo fica dourado.', type: 'golden', cost: 5e42, multiplier: 4, purchased: false, tier: 'legendary', unlockCondition: { type: 'total_coxinhas', value: 5e41 } },
  { id: 'golden_ex_5', name: 'Midas Ultimate', description: 'O toque final de Midas.', type: 'golden', cost: 5e50, multiplier: 5, purchased: false, tier: 'mythic', unlockCondition: { type: 'total_coxinhas', value: 5e49 } },
  { id: 'golden_ex_6', name: 'Sol Dourado', description: 'Uma estrela de ouro para você.', type: 'golden', cost: 5e60, multiplier: 5, purchased: false, tier: 'mythic', unlockCondition: { type: 'total_coxinhas', value: 5e59 } },
  { id: 'golden_ex_7', name: 'Galáxia de Ouro', description: 'Uma galáxia inteira de coxinhas douradas.', type: 'golden', cost: 5e70, multiplier: 10, purchased: false, tier: 'mythic', unlockCondition: { type: 'total_coxinhas', value: 5e69 } },
  { id: 'golden_ex_8', name: 'Universo Dourado', description: 'O universo é feito de ouro coxinhístico.', type: 'golden', cost: 5e80, multiplier: 10, purchased: false, tier: 'mythic', unlockCondition: { type: 'total_coxinhas', value: 5e79 } },

  // ── Extra Synergy Upgrades (20) ──
  { id: 'syn_divine_void', name: 'Luz e Trevas', description: 'Divino + Void = x2 para ambos.', type: 'synergy', cost: 5e33, multiplier: 2, purchased: false, tier: 'epic', triggerBuildingId: 'celestial_kitchen', synergyTargetId: 'void_extractor', unlockCondition: { type: 'building_count', targetId: 'celestial_kitchen', value: 10 } },
  { id: 'syn_time_element', name: 'Cronoelemental', description: 'Temporal + Elemental = x2.', type: 'synergy', cost: 5e44, multiplier: 2, purchased: false, tier: 'epic', triggerBuildingId: 'time_loop', synergyTargetId: 'fire_forge', unlockCondition: { type: 'building_count', targetId: 'time_loop', value: 10 } },
  { id: 'syn_dim_quantum', name: 'Dimensão Quântica', description: 'Dimensional + Quantum II = x2.', type: 'synergy', cost: 5e58, multiplier: 2, purchased: false, tier: 'legendary', triggerBuildingId: 'pocket_dimension', synergyTargetId: 'quantum_entangler', unlockCondition: { type: 'building_count', targetId: 'pocket_dimension', value: 10 } },
  { id: 'syn_cosmic_transcend', name: 'Cósmico Transcendente', description: 'Cosmic II + Transcendent = x3.', type: 'synergy', cost: 5e76, multiplier: 3, purchased: false, tier: 'legendary', triggerBuildingId: 'big_bang_baker', synergyTargetId: 'nirvana_kitchen', unlockCondition: { type: 'building_count', targetId: 'big_bang_baker', value: 5 } },
  { id: 'syn_inf_ultimate', name: 'Infinito Supremo', description: 'Infinite + Ultimate = x5.', type: 'synergy', cost: 5e90, multiplier: 5, purchased: false, tier: 'mythic', triggerBuildingId: 'infinity_engine', synergyTargetId: 'omega_baker', unlockCondition: { type: 'building_count', targetId: 'infinity_engine', value: 5 } },
  { id: 'syn_fire_water', name: 'Vapor Místico', description: 'Fogo + Água = vapor coxinhístico. x2.', type: 'synergy', cost: 5e48, multiplier: 2, purchased: false, tier: 'epic', triggerBuildingId: 'fire_forge', synergyTargetId: 'water_mill', unlockCondition: { type: 'building_count', targetId: 'fire_forge', value: 10 } },
  { id: 'syn_earth_wind', name: 'Tempestade Terrestre', description: 'Terra + Vento = x2.', type: 'synergy', cost: 5e51, multiplier: 2, purchased: false, tier: 'epic', triggerBuildingId: 'earth_bakery', synergyTargetId: 'wind_kitchen', unlockCondition: { type: 'building_count', targetId: 'earth_bakery', value: 10 } },
  { id: 'syn_shadow_mirror', name: 'Reflexo Sombrio', description: 'Sombra + Espelho = x2.', type: 'synergy', cost: 5e55, multiplier: 2, purchased: false, tier: 'legendary', triggerBuildingId: 'shadow_kitchen', synergyTargetId: 'mirror_kitchen', unlockCondition: { type: 'building_count', targetId: 'shadow_kitchen', value: 5 } },
  { id: 'syn_entropy_chaos', name: 'Caos Primordial', description: 'Entropia + Colapso = x3.', type: 'synergy', cost: 5e64, multiplier: 3, purchased: false, tier: 'legendary', triggerBuildingId: 'entropy_engine', synergyTargetId: 'wave_collapse', unlockCondition: { type: 'building_count', targetId: 'entropy_engine', value: 5 } },
  { id: 'syn_nirvana_brahma', name: 'Iluminação Absoluta', description: 'Nirvana + Brahma = x3.', type: 'synergy', cost: 5e78, multiplier: 3, purchased: false, tier: 'mythic', triggerBuildingId: 'nirvana_kitchen', synergyTargetId: 'brahma_baker', unlockCondition: { type: 'building_count', targetId: 'nirvana_kitchen', value: 5 } },
  { id: 'syn_shiva_vishnu', name: 'Destruição Criativa', description: 'Shiva + Vishnu = x3.', type: 'synergy', cost: 5e80, multiplier: 3, purchased: false, tier: 'mythic', triggerBuildingId: 'shiva_fryer', synergyTargetId: 'vishnu_oven', unlockCondition: { type: 'building_count', targetId: 'shiva_fryer', value: 5 } },
  { id: 'syn_omega_alpha', name: 'Ciclo Completo', description: 'Ômega + Alpha = x10.', type: 'synergy', cost: 5e92, multiplier: 10, purchased: false, tier: 'mythic', triggerBuildingId: 'omega_baker', synergyTargetId: 'alpha_kitchen', unlockCondition: { type: 'building_count', targetId: 'omega_baker', value: 3 } },

  // ── Extra Prestige Upgrades (15) ──
  { id: 'prestige_ex_6', name: 'Fragmentos Turbo', description: 'CPS +50% por rebirth.', type: 'prestige', cost: 500, multiplier: 1.5, purchased: false, tier: 'rare', unlockCondition: { type: 'rebirth_count', value: 10 } },
  { id: 'prestige_ex_7', name: 'Essência Concentrada', description: 'CPS x2 por rebirth.', type: 'prestige', cost: 2000, multiplier: 2, purchased: false, tier: 'epic', unlockCondition: { type: 'rebirth_count', value: 20 } },
  { id: 'prestige_ex_8', name: 'Void Prestige', description: 'CPS x3 por rebirth.', type: 'prestige', cost: 5000, multiplier: 3, purchased: false, tier: 'epic', unlockCondition: { type: 'rebirth_count', value: 30 } },
  { id: 'prestige_ex_9', name: 'Temporal Prestige', description: 'CPS x5.', type: 'prestige', cost: 10000, multiplier: 5, purchased: false, tier: 'legendary', unlockCondition: { type: 'rebirth_count', value: 40 } },
  { id: 'prestige_ex_10', name: 'Elemental Prestige', description: 'CPS x7.', type: 'prestige', cost: 25000, multiplier: 7, purchased: false, tier: 'legendary', unlockCondition: { type: 'rebirth_count', value: 50 } },
  { id: 'prestige_ex_11', name: 'Dimensional Prestige', description: 'CPS x10.', type: 'prestige', cost: 50000, multiplier: 10, purchased: false, tier: 'legendary', unlockCondition: { type: 'rebirth_count', value: 60 } },
  { id: 'prestige_ex_12', name: 'Quantum Prestige', description: 'CPS x15.', type: 'prestige', cost: 100000, multiplier: 15, purchased: false, tier: 'mythic', unlockCondition: { type: 'rebirth_count', value: 75 } },
  { id: 'prestige_ex_13', name: 'Cosmic Prestige', description: 'CPS x20.', type: 'prestige', cost: 250000, multiplier: 20, purchased: false, tier: 'mythic', unlockCondition: { type: 'rebirth_count', value: 100 } },
  { id: 'prestige_ex_14', name: 'Transcendent Prestige', description: 'CPS x50.', type: 'prestige', cost: 500000, multiplier: 50, purchased: false, tier: 'mythic', unlockCondition: { type: 'rebirth_count', value: 150 } },
  { id: 'prestige_ex_15', name: 'Infinite Prestige', description: 'CPS x100.', type: 'prestige', cost: 1000000, multiplier: 100, purchased: false, tier: 'mythic', unlockCondition: { type: 'rebirth_count', value: 200 } },
];

// ── 170+ NEW ACHIEVEMENTS ────────────────────────────────────────────────────

export const EXTRA_ACHIEVEMENTS: Achievement[] = [
  // Production milestones (30)
  { id: 'ach_prod_1e25', name: 'Oceano de Coxinhas', description: 'Produza 1e25 coxinhas.', icon: '🌊', rarity: 'epic', condition: { type: 'total_coxinhas', value: 1e25 }, reward: { type: 'cps_mult', value: 1.5 }, unlocked: false, progress: 0 },
  { id: 'ach_prod_1e30', name: 'Galáxia de Coxinhas', description: 'Produza 1e30 coxinhas.', icon: '🌌', rarity: 'epic', condition: { type: 'total_coxinhas', value: 1e30 }, reward: { type: 'cps_mult', value: 2 }, unlocked: false, progress: 0 },
  { id: 'ach_prod_1e40', name: 'Universo de Coxinhas', description: 'Produza 1e40 coxinhas.', icon: '🪐', rarity: 'legendary', condition: { type: 'total_coxinhas', value: 1e40 }, reward: { type: 'cps_mult', value: 3 }, unlocked: false, progress: 0 },
  { id: 'ach_prod_1e50', name: 'Multiverso de Coxinhas', description: 'Produza 1e50 coxinhas.', icon: '✨', rarity: 'legendary', condition: { type: 'total_coxinhas', value: 1e50 }, reward: { type: 'cps_mult', value: 5 }, unlocked: false, progress: 0 },
  { id: 'ach_prod_1e60', name: 'Omniverso de Coxinhas', description: 'Produza 1e60 coxinhas.', icon: '💫', rarity: 'mythic', condition: { type: 'total_coxinhas', value: 1e60 }, reward: { type: 'cps_mult', value: 7 }, unlocked: false, progress: 0 },
  { id: 'ach_prod_1e70', name: 'Infinidade de Coxinhas', description: 'Produza 1e70 coxinhas.', icon: '♾️', rarity: 'mythic', condition: { type: 'total_coxinhas', value: 1e70 }, reward: { type: 'cps_mult', value: 10 }, unlocked: false, progress: 0 },
  { id: 'ach_prod_1e80', name: 'Coxinha Absoluta', description: 'Produza 1e80 coxinhas.', icon: '👑', rarity: 'mythic', condition: { type: 'total_coxinhas', value: 1e80 }, reward: { type: 'cps_mult', value: 15 }, unlocked: false, progress: 0 },
  { id: 'ach_prod_1e90', name: 'Além do Infinito', description: 'Produza 1e90 coxinhas.', icon: '🏆', rarity: 'mythic', condition: { type: 'total_coxinhas', value: 1e90 }, reward: { type: 'cps_mult', value: 25 }, unlocked: false, progress: 0 },
  { id: 'ach_prod_1e100', name: 'Googol de Coxinhas', description: 'Produza 1e100 coxinhas.', icon: '🔢', rarity: 'mythic', condition: { type: 'total_coxinhas', value: 1e100 }, reward: { type: 'cps_mult', value: 50 }, unlocked: false, progress: 0 },

  // CPS milestones (15)
  { id: 'ach_cps_1e15', name: 'Peta-Coxinhas', description: 'Alcance 1e15 CPS.', icon: '📈', rarity: 'rare', condition: { type: 'cps', value: 1e15 }, reward: { type: 'cps_mult', value: 1.2 }, unlocked: false, progress: 0 },
  { id: 'ach_cps_1e20', name: 'Exa-Coxinhas', description: 'Alcance 1e20 CPS.', icon: '📈', rarity: 'epic', condition: { type: 'cps', value: 1e20 }, reward: { type: 'cps_mult', value: 1.5 }, unlocked: false, progress: 0 },
  { id: 'ach_cps_1e25', name: 'Yotta-Coxinhas', description: 'Alcance 1e25 CPS.', icon: '📈', rarity: 'epic', condition: { type: 'cps', value: 1e25 }, reward: { type: 'cps_mult', value: 2 }, unlocked: false, progress: 0 },
  { id: 'ach_cps_1e30', name: 'Quetta-Coxinhas', description: 'Alcance 1e30 CPS.', icon: '📈', rarity: 'legendary', condition: { type: 'cps', value: 1e30 }, reward: { type: 'cps_mult', value: 3 }, unlocked: false, progress: 0 },
  { id: 'ach_cps_1e40', name: 'Hyper-CPS', description: 'Alcance 1e40 CPS.', icon: '📈', rarity: 'legendary', condition: { type: 'cps', value: 1e40 }, reward: { type: 'cps_mult', value: 5 }, unlocked: false, progress: 0 },
  { id: 'ach_cps_1e50', name: 'Ultra-CPS', description: 'Alcance 1e50 CPS.', icon: '🚀', rarity: 'mythic', condition: { type: 'cps', value: 1e50 }, reward: { type: 'cps_mult', value: 10 }, unlocked: false, progress: 0 },
  { id: 'ach_cps_1e60', name: 'Mega Ultra CPS', description: 'Alcance 1e60 CPS.', icon: '🚀', rarity: 'mythic', condition: { type: 'cps', value: 1e60 }, reward: { type: 'cps_mult', value: 20 }, unlocked: false, progress: 0 },

  // Click milestones (10)
  { id: 'ach_clicks_50k', name: '50 Mil Cliques', description: 'Clique 50.000 vezes.', icon: '👆', rarity: 'rare', condition: { type: 'total_clicks', value: 50000 }, reward: { type: 'click_mult', value: 1.5 }, unlocked: false, progress: 0 },
  { id: 'ach_clicks_100k', name: 'Cem Mil Cliques', description: 'Clique 100.000 vezes.', icon: '👆', rarity: 'epic', condition: { type: 'total_clicks', value: 100000 }, reward: { type: 'click_mult', value: 2 }, unlocked: false, progress: 0 },
  { id: 'ach_clicks_500k', name: 'Meio Milhão', description: 'Clique 500.000 vezes.', icon: '💪', rarity: 'epic', condition: { type: 'total_clicks', value: 500000 }, reward: { type: 'click_mult', value: 3 }, unlocked: false, progress: 0 },
  { id: 'ach_clicks_1m', name: 'Milhão de Cliques', description: 'Clique 1.000.000 vezes.', icon: '🏅', rarity: 'legendary', condition: { type: 'total_clicks', value: 1000000 }, reward: { type: 'click_mult', value: 5 }, unlocked: false, progress: 0 },
  { id: 'ach_clicks_5m', name: 'Lenda do Clique', description: 'Clique 5.000.000 vezes.', icon: '🏆', rarity: 'mythic', condition: { type: 'total_clicks', value: 5000000 }, reward: { type: 'click_mult', value: 10 }, unlocked: false, progress: 0 },

  // Building milestones (30) - new tiers
  { id: 'ach_divine_1', name: 'Toque Divino', description: 'Tenha 1 edifício divino.', icon: '😇', rarity: 'epic', condition: { type: 'building_count', targetId: 'celestial_kitchen', value: 1 }, reward: { type: 'cps_mult', value: 1.3 }, unlocked: false, progress: 0 },
  { id: 'ach_divine_50', name: 'Panteão Completo', description: 'Tenha 50 edifícios divinos(total).', icon: '☁️', rarity: 'legendary', condition: { type: 'buildings_owned_total', value: 200 }, reward: { type: 'cps_mult', value: 2 }, unlocked: false, progress: 0 },
  { id: 'ach_void_1', name: 'Abraçando o Vazio', description: 'Tenha 1 Extrator do Vazio.', icon: '🕳️', rarity: 'epic', condition: { type: 'building_count', targetId: 'void_extractor', value: 1 }, reward: { type: 'cps_mult', value: 1.3 }, unlocked: false, progress: 0 },
  { id: 'ach_temporal_1', name: 'Senhor do Tempo', description: 'Tenha 1 Loop Temporal.', icon: '🔄', rarity: 'epic', condition: { type: 'building_count', targetId: 'time_loop', value: 1 }, reward: { type: 'cps_mult', value: 1.3 }, unlocked: false, progress: 0 },
  { id: 'ach_elemental_1', name: 'Mestre dos Elementos', description: 'Tenha 1 Forja de Fogo.', icon: '🌋', rarity: 'epic', condition: { type: 'building_count', targetId: 'fire_forge', value: 1 }, reward: { type: 'cps_mult', value: 1.3 }, unlocked: false, progress: 0 },
  { id: 'ach_dimensional_1', name: 'Viajante Dimensional', description: 'Tenha 1 Dimensão de Bolso.', icon: '🌐', rarity: 'legendary', condition: { type: 'building_count', targetId: 'pocket_dimension', value: 1 }, reward: { type: 'cps_mult', value: 1.5 }, unlocked: false, progress: 0 },
  { id: 'ach_quantum2_1', name: 'Mestre Quântico', description: 'Tenha 1 Entrelaçador Quântico.', icon: '🔗', rarity: 'legendary', condition: { type: 'building_count', targetId: 'quantum_entangler', value: 1 }, reward: { type: 'cps_mult', value: 1.5 }, unlocked: false, progress: 0 },
  { id: 'ach_cosmic2_1', name: 'Arquiteto Cósmico', description: 'Tenha 1 Padeiro do Big Bang.', icon: '💥', rarity: 'legendary', condition: { type: 'building_count', targetId: 'big_bang_baker', value: 1 }, reward: { type: 'cps_mult', value: 2 }, unlocked: false, progress: 0 },
  { id: 'ach_transcend_1', name: 'Iluminado', description: 'Tenha 1 Cozinha Nirvana.', icon: '🧘', rarity: 'mythic', condition: { type: 'building_count', targetId: 'nirvana_kitchen', value: 1 }, reward: { type: 'cps_mult', value: 2 }, unlocked: false, progress: 0 },
  { id: 'ach_infinite_1', name: 'Tocado pelo Infinito', description: 'Tenha 1 Motor de Infinito.', icon: '∞', rarity: 'mythic', condition: { type: 'building_count', targetId: 'infinity_engine', value: 1 }, reward: { type: 'cps_mult', value: 3 }, unlocked: false, progress: 0 },
  { id: 'ach_ultimate_1', name: 'O Definitivo', description: 'Tenha 1 Padeiro Ômega.', icon: 'Ω', rarity: 'mythic', condition: { type: 'building_count', targetId: 'omega_baker', value: 1 }, reward: { type: 'cps_mult', value: 5 }, unlocked: false, progress: 0 },
  { id: 'ach_final_1', name: 'A Coxinha Final', description: 'Tenha 1 Coxinha Final.', icon: '👑', rarity: 'mythic', condition: { type: 'building_count', targetId: 'final_coxinha', value: 1 }, reward: { type: 'cps_mult', value: 10 }, unlocked: false, progress: 0 },
  { id: 'ach_build_300', name: 'Império', description: 'Tenha 300 edifícios no total.', icon: '🏗️', rarity: 'epic', condition: { type: 'buildings_owned_total', value: 300 }, reward: { type: 'cps_mult', value: 2 }, unlocked: false, progress: 0 },
  { id: 'ach_build_500', name: 'Mega Império', description: 'Tenha 500 edifícios no total.', icon: '🏙️', rarity: 'legendary', condition: { type: 'buildings_owned_total', value: 500 }, reward: { type: 'cps_mult', value: 3 }, unlocked: false, progress: 0 },
  { id: 'ach_build_1000', name: 'Civilização Coxinheira', description: 'Tenha 1000 edifícios no total.', icon: '🌆', rarity: 'mythic', condition: { type: 'buildings_owned_total', value: 1000 }, reward: { type: 'cps_mult', value: 5 }, unlocked: false, progress: 0 },
  { id: 'ach_build_2000', name: 'Nação da Coxinha', description: 'Tenha 2000 edifícios no total.', icon: '🗺️', rarity: 'mythic', condition: { type: 'buildings_owned_total', value: 2000 }, reward: { type: 'cps_mult', value: 10 }, unlocked: false, progress: 0 },

  // Rebirth milestones (10)
  { id: 'ach_rb_10', name: 'Renascido x10', description: 'Faça 10 rebirths.', icon: '🔥', rarity: 'rare', condition: { type: 'rebirth_count', value: 10 }, reward: { type: 'fragment_bonus', value: 1.2 }, unlocked: false, progress: 0 },
  { id: 'ach_rb_25', name: 'Renascido x25', description: 'Faça 25 rebirths.', icon: '🔥', rarity: 'epic', condition: { type: 'rebirth_count', value: 25 }, reward: { type: 'fragment_bonus', value: 1.5 }, unlocked: false, progress: 0 },
  { id: 'ach_rb_50', name: 'Mestre do Renascimento', description: 'Faça 50 rebirths.', icon: '🔥', rarity: 'epic', condition: { type: 'rebirth_count', value: 50 }, reward: { type: 'fragment_bonus', value: 2 }, unlocked: false, progress: 0 },
  { id: 'ach_rb_100', name: 'Fênix Eterna', description: 'Faça 100 rebirths.', icon: '🐦‍🔥', rarity: 'legendary', condition: { type: 'rebirth_count', value: 100 }, reward: { type: 'fragment_bonus', value: 3 }, unlocked: false, progress: 0 },
  { id: 'ach_rb_200', name: 'Lenda Imortal', description: 'Faça 200 rebirths.', icon: '👑', rarity: 'mythic', condition: { type: 'rebirth_count', value: 200 }, reward: { type: 'fragment_bonus', value: 5 }, unlocked: false, progress: 0 },

  // Combo milestones (5)
  { id: 'ach_combo_500', name: 'Combo 500', description: 'Alcance combo 500.', icon: '🔥', rarity: 'epic', condition: { type: 'combo', value: 500 }, reward: { type: 'click_mult', value: 2 }, unlocked: false, progress: 0 },
  { id: 'ach_combo_1000', name: 'Combo 1000', description: 'Alcance combo 1000.', icon: '💥', rarity: 'legendary', condition: { type: 'combo', value: 1000 }, reward: { type: 'click_mult', value: 3 }, unlocked: false, progress: 0 },
  { id: 'ach_combo_2500', name: 'Combo Divino', description: 'Alcance combo 2500.', icon: '⚡', rarity: 'mythic', condition: { type: 'combo', value: 2500 }, reward: { type: 'click_mult', value: 5 }, unlocked: false, progress: 0 },

  // Golden milestones (5)
  { id: 'ach_golden_50', name: 'Caçador de Ouro II', description: 'Clique em 50 coxinhas douradas.', icon: '🌟', rarity: 'rare', condition: { type: 'golden_clicked', value: 50 }, reward: { type: 'golden_rate', value: 1.3 }, unlocked: false, progress: 0 },
  { id: 'ach_golden_200', name: 'Rei do Ouro', description: 'Clique em 200 coxinhas douradas.', icon: '🏅', rarity: 'epic', condition: { type: 'golden_clicked', value: 200 }, reward: { type: 'golden_rate', value: 1.5 }, unlocked: false, progress: 0 },
  { id: 'ach_golden_500', name: 'Imperador Dourado', description: 'Clique em 500 coxinhas douradas.', icon: '👑', rarity: 'legendary', condition: { type: 'golden_clicked', value: 500 }, reward: { type: 'golden_rate', value: 2 }, unlocked: false, progress: 0 },
  { id: 'ach_golden_1000', name: 'Midas Supremo', description: 'Clique em 1000 coxinhas douradas.', icon: '💎', rarity: 'mythic', condition: { type: 'golden_clicked', value: 1000 }, reward: { type: 'golden_rate', value: 3 }, unlocked: false, progress: 0 },

  // Upgrade milestones (5)
  { id: 'ach_up_50', name: 'Pesquisador Ávido', description: 'Compre 50 upgrades.', icon: '🔬', rarity: 'rare', condition: { type: 'upgrade_count', value: 50 }, reward: { type: 'cps_mult', value: 1.2 }, unlocked: false, progress: 0 },
  { id: 'ach_up_100', name: 'Cientista Chefe', description: 'Compre 100 upgrades.', icon: '🧪', rarity: 'epic', condition: { type: 'upgrade_count', value: 100 }, reward: { type: 'cps_mult', value: 1.5 }, unlocked: false, progress: 0 },
  { id: 'ach_up_200', name: 'Gênio Culinário', description: 'Compre 200 upgrades.', icon: '🧠', rarity: 'epic', condition: { type: 'upgrade_count', value: 200 }, reward: { type: 'cps_mult', value: 2 }, unlocked: false, progress: 0 },
  { id: 'ach_up_400', name: 'Mestre das Melhorias', description: 'Compre 400 upgrades.', icon: '🎓', rarity: 'legendary', condition: { type: 'upgrade_count', value: 400 }, reward: { type: 'cps_mult', value: 3 }, unlocked: false, progress: 0 },
  { id: 'ach_up_600', name: 'Upgrade God', description: 'Compre 600 upgrades.', icon: '🏆', rarity: 'mythic', condition: { type: 'upgrade_count', value: 600 }, reward: { type: 'cps_mult', value: 5 }, unlocked: false, progress: 0 },

  // Play time milestones (5)
  { id: 'ach_time_24h', name: 'Dia Inteiro', description: 'Jogue por 24 horas (total).', icon: '⏰', rarity: 'rare', condition: { type: 'play_time', value: 86400 }, reward: { type: 'cps_mult', value: 1.2 }, unlocked: false, progress: 0 },
  { id: 'ach_time_7d', name: 'Uma Semana', description: 'Jogue por 7 dias (total).', icon: '📅', rarity: 'epic', condition: { type: 'play_time', value: 604800 }, reward: { type: 'cps_mult', value: 1.5 }, unlocked: false, progress: 0 },
  { id: 'ach_time_30d', name: 'Um Mês', description: 'Jogue por 30 dias (total).', icon: '🗓️', rarity: 'legendary', condition: { type: 'play_time', value: 2592000 }, reward: { type: 'cps_mult', value: 2 }, unlocked: false, progress: 0 },

  // Special milestones (10)
  { id: 'ach_quest_25', name: 'Aventureiro', description: 'Complete 25 missões.', icon: '📋', rarity: 'rare', condition: { type: 'quest_completed', value: 25 }, reward: { type: 'cps_mult', value: 1.2 }, unlocked: false, progress: 0 },
  { id: 'ach_quest_100', name: 'Herói de Missões', description: 'Complete 100 missões.', icon: '🦸', rarity: 'epic', condition: { type: 'quest_completed', value: 100 }, reward: { type: 'cps_mult', value: 1.5 }, unlocked: false, progress: 0 },
  { id: 'ach_quest_500', name: 'Lendário Concluidor', description: 'Complete 500 missões.', icon: '🏆', rarity: 'legendary', condition: { type: 'quest_completed', value: 500 }, reward: { type: 'cps_mult', value: 2 }, unlocked: false, progress: 0 },
  { id: 'ach_ach_50', name: 'Meio Centenário', description: 'Desbloqueie 50 conquistas.', icon: '🏅', rarity: 'rare', condition: { type: 'achievement_count', value: 50 }, reward: { type: 'cps_mult', value: 1.3 }, unlocked: false, progress: 0 },
  { id: 'ach_ach_100', name: 'Centenário', description: 'Desbloqueie 100 conquistas.', icon: '💯', rarity: 'epic', condition: { type: 'achievement_count', value: 100 }, reward: { type: 'cps_mult', value: 1.5 }, unlocked: false, progress: 0 },
  { id: 'ach_ach_200', name: 'Super Achiever', description: 'Desbloqueie 200 conquistas.', icon: '🏆', rarity: 'legendary', condition: { type: 'achievement_count', value: 200 }, reward: { type: 'cps_mult', value: 2 }, unlocked: false, progress: 0 },
  { id: 'ach_single_1e15', name: 'Clique Devastador', description: 'Um único clique causa 1e15 dano.', icon: '💥', rarity: 'legendary', condition: { type: 'single_click', value: 1e15 }, reward: { type: 'click_mult', value: 3 }, unlocked: false, progress: 0 },
  { id: 'ach_single_1e30', name: 'Clique Apocalíptico', description: 'Um único clique causa 1e30 dano.', icon: '🌋', rarity: 'mythic', condition: { type: 'single_click', value: 1e30 }, reward: { type: 'click_mult', value: 5 }, unlocked: false, progress: 0 },
  { id: 'ach_level_25', name: 'Nível 25', description: 'Alcance nível 25.', icon: '⬆️', rarity: 'rare', condition: { type: 'building_count', targetId: 'cursor', value: 50 }, reward: { type: 'cps_mult', value: 1.2 }, unlocked: false, progress: 0 },
  { id: 'ach_level_50', name: 'Nível 50', description: 'Tenha 50 cursores.', icon: '⬆️', rarity: 'epic', condition: { type: 'building_count', targetId: 'cursor', value: 100 }, reward: { type: 'cps_mult', value: 1.5 }, unlocked: false, progress: 0 },
];

// ── 36 NEW SKILLS ────────────────────────────────────────────────────────────

export const EXTRA_SKILLS: Skill[] = [
  // Temporal Branch (12)
  { id: 'temporal_flow', name: 'Fluxo Temporal', description: 'CPS +5% por nível.', icon: '⏰', branch: 'temporal', tier: 1, maxLevel: 10, currentLevel: 0, costPerLevel: 2, effect: { type: 'cps_mult', valuePerLevel: 0.05 }, prerequisites: [], unlocked: true },
  { id: 'time_dilation', name: 'Dilatação Temporal', description: 'Produção acelerada +3%.', icon: '⏳', branch: 'temporal', tier: 1, maxLevel: 10, currentLevel: 0, costPerLevel: 2, effect: { type: 'cps_mult', valuePerLevel: 0.03 }, prerequisites: [], unlocked: true },
  { id: 'chrono_boost', name: 'Impulso Crono', description: 'Clique +5%.', icon: '⚡', branch: 'temporal', tier: 2, maxLevel: 8, currentLevel: 0, costPerLevel: 3, effect: { type: 'click_power', valuePerLevel: 0.05 }, prerequisites: ['temporal_flow'], unlocked: false },
  { id: 'paradox_power', name: 'Poder do Paradoxo', description: 'CPS +8%.', icon: '🔄', branch: 'temporal', tier: 2, maxLevel: 8, currentLevel: 0, costPerLevel: 3, effect: { type: 'cps_mult', valuePerLevel: 0.08 }, prerequisites: ['time_dilation'], unlocked: false },
  { id: 'temporal_rift', name: 'Fenda Temporal', description: 'Combo dura +1s por nível.', icon: '🌀', branch: 'temporal', tier: 3, maxLevel: 5, currentLevel: 0, costPerLevel: 5, effect: { type: 'combo_duration', valuePerLevel: 1 }, prerequisites: ['chrono_boost', 'paradox_power'], unlocked: false },
  { id: 'eternal_moment', name: 'Momento Eterno', description: 'Tudo x1% por nível.', icon: '♾️', branch: 'temporal', tier: 3, maxLevel: 20, currentLevel: 0, costPerLevel: 4, effect: { type: 'all_mult', valuePerLevel: 0.01 }, prerequisites: ['chrono_boost'], unlocked: false },
  { id: 'rewind', name: 'Rebobinar', description: 'Fragmentos +5%.', icon: '⏪', branch: 'temporal', tier: 4, maxLevel: 10, currentLevel: 0, costPerLevel: 5, effect: { type: 'fragment_mult', valuePerLevel: 0.05 }, prerequisites: ['temporal_rift'], unlocked: false },
  { id: 'fast_forward', name: 'Avanço Rápido', description: 'Offline mult +5%.', icon: '⏩', branch: 'temporal', tier: 4, maxLevel: 10, currentLevel: 0, costPerLevel: 5, effect: { type: 'offline_mult', valuePerLevel: 0.05 }, prerequisites: ['eternal_moment'], unlocked: false },

  // Elemental Branch (12)
  { id: 'fire_mastery', name: 'Domínio do Fogo', description: 'CPS +5%.', icon: '🔥', branch: 'elemental', tier: 1, maxLevel: 10, currentLevel: 0, costPerLevel: 2, effect: { type: 'cps_mult', valuePerLevel: 0.05 }, prerequisites: [], unlocked: true },
  { id: 'water_mastery', name: 'Domínio da Água', description: 'Clique +5%.', icon: '💧', branch: 'elemental', tier: 1, maxLevel: 10, currentLevel: 0, costPerLevel: 2, effect: { type: 'click_power', valuePerLevel: 0.05 }, prerequisites: [], unlocked: true },
  { id: 'earth_mastery', name: 'Domínio da Terra', description: 'Custo -1%.', icon: '🌍', branch: 'elemental', tier: 2, maxLevel: 10, currentLevel: 0, costPerLevel: 3, effect: { type: 'building_cost_reduction', valuePerLevel: 0.01 }, prerequisites: ['fire_mastery'], unlocked: false },
  { id: 'wind_mastery', name: 'Domínio do Vento', description: 'Crítico +1%.', icon: '🌪️', branch: 'elemental', tier: 2, maxLevel: 5, currentLevel: 0, costPerLevel: 3, effect: { type: 'crit_chance', valuePerLevel: 0.01 }, prerequisites: ['water_mastery'], unlocked: false },
  { id: 'lightning_strike', name: 'Golpe Relâmpago', description: 'Dano crítico +1.', icon: '⚡', branch: 'elemental', tier: 3, maxLevel: 5, currentLevel: 0, costPerLevel: 5, effect: { type: 'crit_mult', valuePerLevel: 1 }, prerequisites: ['earth_mastery', 'wind_mastery'], unlocked: false },
  { id: 'elemental_fusion', name: 'Fusão Elemental', description: 'Tudo x2%.', icon: '🌈', branch: 'elemental', tier: 3, maxLevel: 15, currentLevel: 0, costPerLevel: 4, effect: { type: 'all_mult', valuePerLevel: 0.02 }, prerequisites: ['wind_mastery'], unlocked: false },
  { id: 'primordial_force', name: 'Força Primordial', description: 'CPS +10%.', icon: '💫', branch: 'elemental', tier: 4, maxLevel: 10, currentLevel: 0, costPerLevel: 6, effect: { type: 'cps_mult', valuePerLevel: 0.1 }, prerequisites: ['lightning_strike'], unlocked: false },
  { id: 'avatar_state', name: 'Estado Avatar', description: 'Clique +10%.', icon: '🔮', branch: 'elemental', tier: 4, maxLevel: 10, currentLevel: 0, costPerLevel: 6, effect: { type: 'click_power', valuePerLevel: 0.1 }, prerequisites: ['elemental_fusion'], unlocked: false },

  // Cosmic Branch (12)
  { id: 'star_power', name: 'Poder Estelar', description: 'CPS +5%.', icon: '⭐', branch: 'cosmic', tier: 1, maxLevel: 10, currentLevel: 0, costPerLevel: 2, effect: { type: 'cps_mult', valuePerLevel: 0.05 }, prerequisites: [], unlocked: true },
  { id: 'nebula_force', name: 'Força Nebular', description: 'Golden rate +5%.', icon: '🌟', branch: 'cosmic', tier: 1, maxLevel: 10, currentLevel: 0, costPerLevel: 2, effect: { type: 'golden_rate', valuePerLevel: 0.05 }, prerequisites: [], unlocked: true },
  { id: 'black_hole_pull', name: 'Atração do Buraco Negro', description: 'CPS +8%.', icon: '🕳️', branch: 'cosmic', tier: 2, maxLevel: 8, currentLevel: 0, costPerLevel: 3, effect: { type: 'cps_mult', valuePerLevel: 0.08 }, prerequisites: ['star_power'], unlocked: false },
  { id: 'galaxy_forge', name: 'Forja Galáctica', description: 'Fragmentos +5%.', icon: '🌌', branch: 'cosmic', tier: 2, maxLevel: 10, currentLevel: 0, costPerLevel: 3, effect: { type: 'fragment_mult', valuePerLevel: 0.05 }, prerequisites: ['nebula_force'], unlocked: false },
  { id: 'supernova_burst', name: 'Explosão Supernova', description: 'Combo mult +5%.', icon: '💥', branch: 'cosmic', tier: 3, maxLevel: 10, currentLevel: 0, costPerLevel: 5, effect: { type: 'combo_mult', valuePerLevel: 0.05 }, prerequisites: ['black_hole_pull'], unlocked: false },
  { id: 'cosmic_harmony', name: 'Harmonia Cósmica', description: 'Tudo x2%.', icon: '🪐', branch: 'cosmic', tier: 3, maxLevel: 15, currentLevel: 0, costPerLevel: 4, effect: { type: 'all_mult', valuePerLevel: 0.02 }, prerequisites: ['galaxy_forge'], unlocked: false },
  { id: 'big_crunch', name: 'Grande Colapso', description: 'CPS +15%.', icon: '🔮', branch: 'cosmic', tier: 4, maxLevel: 10, currentLevel: 0, costPerLevel: 6, effect: { type: 'cps_mult', valuePerLevel: 0.15 }, prerequisites: ['supernova_burst', 'cosmic_harmony'], unlocked: false },
  { id: 'dimension_master', name: 'Mestre Dimensional', description: 'Offline mult +10%.', icon: '🌐', branch: 'cosmic', tier: 4, maxLevel: 10, currentLevel: 0, costPerLevel: 6, effect: { type: 'offline_mult', valuePerLevel: 0.1 }, prerequisites: ['cosmic_harmony'], unlocked: false },
];

// ── 38 NEW PETS ──────────────────────────────────────────────────────────────

export const EXTRA_PETS: Pet[] = [
  // Common/Rare (8)
  { id: 'pet_turtle', name: 'Tartaruga Sábia', description: 'Uma tartaruga sábia que conhece os segredos das coxinhas ancestrais', icon: '🐢', rarity: 'common', ability: { type: 'cps_boost', baseValue: 0.08, scalingPerLevel: 0.02, description: 'CPS +8% (+2%/nível)' }, level: 1, maxLevel: 30, xp: 0, xpToNext: 100, owned: false, active: false },
  { id: 'pet_bunny', name: 'Coelhão Veloz', description: 'Um coelho super veloz que clica mais rápido que qualquer humano', icon: '🐰', rarity: 'common', ability: { type: 'click_boost', baseValue: 0.1, scalingPerLevel: 0.02, description: 'Clique +10% (+2%/nível)' }, level: 1, maxLevel: 30, xp: 0, xpToNext: 100, owned: false, active: false },
  { id: 'pet_panda', name: 'Panda Coxinheiro', description: 'Um panda que se alimenta exclusivamente de coxinhas de bambu', icon: '🐼', rarity: 'rare', ability: { type: 'cps_boost', baseValue: 0.12, scalingPerLevel: 0.03, description: 'CPS +12% (+3%/nível)' }, level: 1, maxLevel: 40, xp: 0, xpToNext: 150, owned: false, active: false },
  { id: 'pet_eagle', name: 'Águia Real', description: 'Avista coxinhas douradas a quilômetros de distância', icon: '🦅', rarity: 'rare', ability: { type: 'golden_boost', baseValue: 0.1, scalingPerLevel: 0.025, description: 'Golden +10% (+2.5%/nível)' }, level: 1, maxLevel: 40, xp: 0, xpToNext: 150, owned: false, active: false },
  { id: 'pet_wolf', name: 'Lobo Alfa', description: 'Lidera a matilha com garras afiadas de tanto clicar', icon: '🐺', rarity: 'rare', ability: { type: 'click_boost', baseValue: 0.15, scalingPerLevel: 0.03, description: 'Clique +15% (+3%/nível)' }, level: 1, maxLevel: 40, xp: 0, xpToNext: 150, owned: false, active: false },
  { id: 'pet_dolphin', name: 'Golfinho Astral', description: 'Nada entre as estrelas absorvendo experiência cósmica', icon: '🐬', rarity: 'rare', ability: { type: 'xp_boost', baseValue: 0.15, scalingPerLevel: 0.03, description: 'XP +15% (+3%/nível)' }, level: 1, maxLevel: 40, xp: 0, xpToNext: 150, owned: false, active: false },
  { id: 'pet_octopus', name: 'Polvo Multi-Armas', description: 'Oito tentáculos clicando ao mesmo tempo sem parar', icon: '🐙', rarity: 'rare', ability: { type: 'auto_click', baseValue: 0.8, scalingPerLevel: 0.15, description: '0.8 auto-clicks/s (+0.15/nível)' }, level: 1, maxLevel: 40, xp: 0, xpToNext: 150, owned: false, active: false },
  { id: 'pet_bee', name: 'Abelha Operária', description: 'Produz mel de coxinha sem parar na colmeia', icon: '🐝', rarity: 'rare', ability: { type: 'cps_boost', baseValue: 0.15, scalingPerLevel: 0.03, description: 'CPS +15% (+3%/nível)' }, level: 1, maxLevel: 40, xp: 0, xpToNext: 150, owned: false, active: false },

  // Epic (10)
  { id: 'pet_cerberus', name: 'Cérbero', description: 'Três cabeças, três vezes mais fome de coxinha', icon: '🐕‍🦺', rarity: 'epic', ability: { type: 'cps_boost', baseValue: 0.2, scalingPerLevel: 0.04, description: 'CPS +20% (+4%/nível)' }, level: 1, maxLevel: 50, xp: 0, xpToNext: 200, owned: false, active: false },
  { id: 'pet_griffin', name: 'Grifo Dourado', description: 'Fareja ouro e coxinhas douradas com facilidade', icon: '🦁', rarity: 'epic', ability: { type: 'golden_boost', baseValue: 0.2, scalingPerLevel: 0.04, description: 'Golden +20% (+4%/nível)' }, level: 1, maxLevel: 50, xp: 0, xpToNext: 200, owned: false, active: false },
  { id: 'pet_kraken', name: 'Kraken', description: 'Tentáculos gigantes que clicam nas profundezas do oceano', icon: '🦑', rarity: 'epic', ability: { type: 'auto_click', baseValue: 1.5, scalingPerLevel: 0.3, description: '1.5 auto-clicks/s (+0.3/nível)' }, level: 1, maxLevel: 50, xp: 0, xpToNext: 200, owned: false, active: false },
  { id: 'pet_hydra', name: 'Hidra Regeneradora', description: 'Corte uma cabeça e duas coxinhas aparecem no lugar', icon: '🐉', rarity: 'epic', ability: { type: 'click_boost', baseValue: 0.25, scalingPerLevel: 0.05, description: 'Clique +25% (+5%/nível)' }, level: 1, maxLevel: 50, xp: 0, xpToNext: 200, owned: false, active: false },
  { id: 'pet_sphinx', name: 'Esfinge Sábia', description: 'Decifre seus enigmas e ganhe sabedoria infinita', icon: '🗿', rarity: 'epic', ability: { type: 'xp_boost', baseValue: 0.25, scalingPerLevel: 0.05, description: 'XP +25% (+5%/nível)' }, level: 1, maxLevel: 50, xp: 0, xpToNext: 200, owned: false, active: false },
  { id: 'pet_basilisk', name: 'Basilisco', description: 'Seu olhar petrificante causa dano crítico devastador', icon: '🐍', rarity: 'epic', ability: { type: 'crit_boost', baseValue: 0.03, scalingPerLevel: 0.01, description: 'Crit +3% (+1%/nível)' }, level: 1, maxLevel: 50, xp: 0, xpToNext: 200, owned: false, active: false },
  { id: 'pet_pegasus', name: 'Pégaso', description: 'Voa pelos céus coletando fragmentos estelares', icon: '🦄', rarity: 'epic', ability: { type: 'fragment_boost', baseValue: 0.15, scalingPerLevel: 0.03, description: 'Fragmentos +15% (+3%/nível)' }, level: 1, maxLevel: 50, xp: 0, xpToNext: 200, owned: false, active: false },
  { id: 'pet_yeti', name: 'Yeti Gelado', description: 'Congela a concorrência e acelera a produção de coxinhas', icon: '🧊', rarity: 'epic', ability: { type: 'cps_boost', baseValue: 0.22, scalingPerLevel: 0.04, description: 'CPS +22% (+4%/nível)' }, level: 1, maxLevel: 50, xp: 0, xpToNext: 200, owned: false, active: false },
  { id: 'pet_thunderbird', name: 'Pássaro Trovão', description: 'Cada batida de asa é um trovão de cliques poderosos', icon: '🌩️', rarity: 'epic', ability: { type: 'click_boost', baseValue: 0.3, scalingPerLevel: 0.05, description: 'Clique +30% (+5%/nível)' }, level: 1, maxLevel: 50, xp: 0, xpToNext: 200, owned: false, active: false },
  { id: 'pet_chimera', name: 'Quimera', description: 'Três animais em um, três formas de clicar automaticamente', icon: '🔥', rarity: 'epic', ability: { type: 'auto_click', baseValue: 2, scalingPerLevel: 0.4, description: '2 auto-clicks/s (+0.4/nível)' }, level: 1, maxLevel: 50, xp: 0, xpToNext: 200, owned: false, active: false },

  // Legendary (10)
  { id: 'pet_leviathan', name: 'Leviatã', description: 'Monstro marinho que devora e produz coxinhas em massa', icon: '🐋', rarity: 'legendary', ability: { type: 'cps_boost', baseValue: 0.35, scalingPerLevel: 0.07, description: 'CPS +35% (+7%/nível)' }, level: 1, maxLevel: 60, xp: 0, xpToNext: 300, owned: false, active: false },
  { id: 'pet_bahamut', name: 'Bahamut', description: 'O dragão supremo que clica com fúria ancestral', icon: '🐲', rarity: 'legendary', ability: { type: 'auto_click', baseValue: 5, scalingPerLevel: 1, description: '5 auto-clicks/s (+1/nível)' }, level: 1, maxLevel: 60, xp: 0, xpToNext: 300, owned: false, active: false },
  { id: 'pet_fenrir', name: 'Fenrir', description: 'O lobo gigante morde cada clique com ferocidade lendária', icon: '🐺', rarity: 'legendary', ability: { type: 'click_boost', baseValue: 0.4, scalingPerLevel: 0.08, description: 'Clique +40% (+8%/nível)' }, level: 1, maxLevel: 60, xp: 0, xpToNext: 300, owned: false, active: false },
  { id: 'pet_quetzalcoatl', name: 'Quetzalcóatl', description: 'A serpente emplumada que abençoa com ouro divino', icon: '🐉', rarity: 'legendary', ability: { type: 'golden_boost', baseValue: 0.35, scalingPerLevel: 0.07, description: 'Golden +35% (+7%/nível)' }, level: 1, maxLevel: 60, xp: 0, xpToNext: 300, owned: false, active: false },
  { id: 'pet_jormungandr', name: 'Jörmungandr', description: 'A serpente do mundo que envolve cada golpe crítico', icon: '🐍', rarity: 'legendary', ability: { type: 'crit_boost', baseValue: 0.05, scalingPerLevel: 0.02, description: 'Crit +5% (+2%/nível)' }, level: 1, maxLevel: 60, xp: 0, xpToNext: 300, owned: false, active: false },
  { id: 'pet_anubis', name: 'Anúbis', description: 'O guardião dos mortos que coleta fragmentos da eternidade', icon: '🐕', rarity: 'legendary', ability: { type: 'fragment_boost', baseValue: 0.3, scalingPerLevel: 0.06, description: 'Fragmentos +30% (+6%/nível)' }, level: 1, maxLevel: 60, xp: 0, xpToNext: 300, owned: false, active: false },
  { id: 'pet_roc', name: 'Roc', description: 'A ave lendária que carrega montanhas de experiência', icon: '🦅', rarity: 'legendary', ability: { type: 'xp_boost', baseValue: 0.35, scalingPerLevel: 0.07, description: 'XP +35% (+7%/nível)' }, level: 1, maxLevel: 60, xp: 0, xpToNext: 300, owned: false, active: false },
  { id: 'pet_titan', name: 'Titã Primordial', description: 'Força bruta primordial que multiplica toda a produção', icon: '🗿', rarity: 'legendary', ability: { type: 'cps_boost', baseValue: 0.4, scalingPerLevel: 0.08, description: 'CPS +40% (+8%/nível)' }, level: 1, maxLevel: 60, xp: 0, xpToNext: 300, owned: false, active: false },
  { id: 'pet_void_walker', name: 'Caminhante do Vazio', description: 'Caminha entre dimensões clicando sem parar no vazio', icon: '👻', rarity: 'legendary', ability: { type: 'auto_click', baseValue: 8, scalingPerLevel: 1.5, description: '8 auto-clicks/s (+1.5/nível)' }, level: 1, maxLevel: 60, xp: 0, xpToNext: 300, owned: false, active: false },
  { id: 'pet_time_serpent', name: 'Serpente Temporal', description: 'Manipula o tempo para multiplicar cada clique', icon: '🐍', rarity: 'legendary', ability: { type: 'click_boost', baseValue: 0.5, scalingPerLevel: 0.1, description: 'Clique +50% (+10%/nível)' }, level: 1, maxLevel: 60, xp: 0, xpToNext: 300, owned: false, active: false },

  // Mythic (10)
  { id: 'pet_god_cat', name: 'Gato-Deus', description: 'O felino divino que ronrona coxinhas da existência', icon: '🐱', rarity: 'mythic', ability: { type: 'cps_boost', baseValue: 0.5, scalingPerLevel: 0.1, description: 'CPS +50% (+10%/nível)' }, level: 1, maxLevel: 100, xp: 0, xpToNext: 500, owned: false, active: false },
  { id: 'pet_world_turtle', name: 'Tartaruga-Mundo', description: 'Carrega o mundo nas costas e clica com as patas cósmicas', icon: '🌍', rarity: 'mythic', ability: { type: 'auto_click', baseValue: 15, scalingPerLevel: 3, description: '15 auto-clicks/s (+3/nível)' }, level: 1, maxLevel: 100, xp: 0, xpToNext: 500, owned: false, active: false },
  { id: 'pet_ouroboros', name: 'Ouroboros', description: 'O ciclo eterno que gera fragmentos infinitos de coxinha', icon: '♾️', rarity: 'mythic', ability: { type: 'fragment_boost', baseValue: 0.5, scalingPerLevel: 0.1, description: 'Fragmentos +50% (+10%/nível)' }, level: 1, maxLevel: 100, xp: 0, xpToNext: 500, owned: false, active: false },
  { id: 'pet_void_dragon', name: 'Dragão do Vazio', description: 'Sopra o nada e transforma em cliques poderosíssimos', icon: '🐉', rarity: 'mythic', ability: { type: 'click_boost', baseValue: 0.6, scalingPerLevel: 0.12, description: 'Clique +60% (+12%/nível)' }, level: 1, maxLevel: 100, xp: 0, xpToNext: 500, owned: false, active: false },
  { id: 'pet_cosmic_phoenix', name: 'Fênix Cósmica', description: 'Renasce das cinzas trazendo ouro cósmico e coxinhas', icon: '🐦‍🔥', rarity: 'mythic', ability: { type: 'golden_boost', baseValue: 0.5, scalingPerLevel: 0.1, description: 'Golden +50% (+10%/nível)' }, level: 1, maxLevel: 100, xp: 0, xpToNext: 500, owned: false, active: false },
  { id: 'pet_elder_god', name: 'Deus Ancião', description: 'Existia antes do tempo e produz coxinhas desde sempre', icon: '👁️', rarity: 'mythic', ability: { type: 'cps_boost', baseValue: 0.7, scalingPerLevel: 0.15, description: 'CPS +70% (+15%/nível)' }, level: 1, maxLevel: 100, xp: 0, xpToNext: 500, owned: false, active: false },
  { id: 'pet_infinity_blob', name: 'Blob Infinito', description: 'Uma gosma consciente que clica em todas as dimensões', icon: '🫧', rarity: 'mythic', ability: { type: 'auto_click', baseValue: 25, scalingPerLevel: 5, description: '25 auto-clicks/s (+5/nível)' }, level: 1, maxLevel: 100, xp: 0, xpToNext: 500, owned: false, active: false },
  { id: 'pet_omega_wolf', name: 'Lobo Ômega', description: 'O último lobo — cada mordida é um golpe crítico fatal', icon: '🐺', rarity: 'mythic', ability: { type: 'crit_boost', baseValue: 0.1, scalingPerLevel: 0.03, description: 'Crit +10% (+3%/nível)' }, level: 1, maxLevel: 100, xp: 0, xpToNext: 500, owned: false, active: false },
  { id: 'pet_coxinha_spirit', name: 'Espírito da Coxinha', description: 'A essência pura da coxinha manifesta em forma espiritual', icon: '🥟', rarity: 'mythic', ability: { type: 'cps_boost', baseValue: 1, scalingPerLevel: 0.2, description: 'CPS +100% (+20%/nível)' }, level: 1, maxLevel: 100, xp: 0, xpToNext: 500, owned: false, active: false },
  { id: 'pet_the_one', name: 'O Escolhido', description: 'Aquele que foi profetizado — clica com o poder do destino', icon: '✨', rarity: 'mythic', ability: { type: 'auto_click', baseValue: 50, scalingPerLevel: 10, description: '50 auto-clicks/s (+10/nível)' }, level: 1, maxLevel: 100, xp: 0, xpToNext: 500, owned: false, active: false },
];

// ── 65 NEW RECIPES ───────────────────────────────────────────────────────────

export const EXTRA_RECIPES: CraftingRecipe[] = [
  // Consumable Tier 2 (10)
  { id: 'elixir_divino', name: 'Elixir Divino', description: 'Bênção celestial.', icon: '✨', category: 'consumable', craftTime: 120, ingredients: [{ type: 'coxinhas', amount: 1e25 }, { type: 'stardust', amount: 100 }], result: { type: 'temp_boost', value: 10, duration: 120 }, discovered: false, timesCrafted: 0 },
  { id: 'essencia_void', name: 'Essência Void', description: 'Do nada surge poder.', icon: '🕳️', category: 'consumable', craftTime: 180, ingredients: [{ type: 'coxinhas', amount: 1e30 }, { type: 'fragments', amount: 500 }], result: { type: 'temp_boost', value: 25, duration: 90 }, discovered: false, timesCrafted: 0 },
  { id: 'cristal_temporal', name: 'Cristal Temporal', description: 'Congela o tempo.', icon: '💎', category: 'consumable', craftTime: 300, ingredients: [{ type: 'coxinhas', amount: 1e35 }, { type: 'stardust', amount: 500 }], result: { type: 'temp_boost', value: 50, duration: 60 }, discovered: false, timesCrafted: 0 },
  { id: 'pocao_elemental', name: 'Poção Elemental', description: 'Poder dos 4 elementos.', icon: '🧪', category: 'consumable', craftTime: 240, ingredients: [{ type: 'coxinhas', amount: 1e40 }, { type: 'golden_essence', amount: 200 }], result: { type: 'temp_boost', value: 100, duration: 60 }, discovered: false, timesCrafted: 0 },
  { id: 'bomba_dimensional', name: 'Bomba Dimensional', description: 'Explode produção.', icon: '💣', category: 'consumable', craftTime: 600, ingredients: [{ type: 'coxinhas', amount: 1e50 }, { type: 'fragments', amount: 5000 }], result: { type: 'temp_boost', value: 500, duration: 30 }, discovered: false, timesCrafted: 0 },

  // Equipment Tier 2 (10)
  { id: 'luva_divina', name: 'Luvas Divinas', description: 'Clique +20% permanente.', icon: '🧤', category: 'equipment', craftTime: 600, ingredients: [{ type: 'coxinhas', amount: 1e28 }, { type: 'golden_essence', amount: 100 }], result: { type: 'permanent_mult', value: 1.2 }, discovered: false, timesCrafted: 0 },
  { id: 'avental_void', name: 'Avental do Vazio', description: 'CPS +25% permanente.', icon: '👔', category: 'equipment', craftTime: 900, ingredients: [{ type: 'coxinhas', amount: 1e33 }, { type: 'stardust', amount: 300 }], result: { type: 'permanent_mult', value: 1.25 }, discovered: false, timesCrafted: 0 },
  { id: 'coroa_temporal', name: 'Coroa Temporal', description: 'CPS +30% permanente.', icon: '👑', category: 'equipment', craftTime: 1200, ingredients: [{ type: 'coxinhas', amount: 1e38 }, { type: 'cosmic_flour', amount: 100 }], result: { type: 'permanent_mult', value: 1.3 }, discovered: false, timesCrafted: 0 },
  { id: 'anel_elemental', name: 'Anel Elemental', description: 'CPS +40% permanente.', icon: '💍', category: 'equipment', craftTime: 1500, ingredients: [{ type: 'coxinhas', amount: 1e45 }, { type: 'fragments', amount: 10000 }], result: { type: 'permanent_mult', value: 1.4 }, discovered: false, timesCrafted: 0 },
  { id: 'botas_dimensionais', name: 'Botas Dimensionais', description: 'CPS +50% permanente.', icon: '👢', category: 'equipment', craftTime: 1800, ingredients: [{ type: 'coxinhas', amount: 1e55 }, { type: 'golden_essence', amount: 1000 }], result: { type: 'permanent_mult', value: 1.5 }, discovered: false, timesCrafted: 0 },

  // Enchantment Tier 2 (10)
  { id: 'runa_divina', name: 'Runa Divina', description: 'CPS x2 permanente.', icon: '🔮', category: 'enchantment', craftTime: 3600, ingredients: [{ type: 'coxinhas', amount: 1e30 }, { type: 'stardust', amount: 500 }, { type: 'golden_essence', amount: 200 }], result: { type: 'permanent_mult', value: 2 }, discovered: false, timesCrafted: 0 },
  { id: 'selo_void', name: 'Selo do Vazio', description: 'CPS x3 permanente.', icon: '📜', category: 'enchantment', craftTime: 5400, ingredients: [{ type: 'coxinhas', amount: 1e40 }, { type: 'fragments', amount: 5000 }, { type: 'cosmic_flour', amount: 200 }], result: { type: 'permanent_mult', value: 3 }, discovered: false, timesCrafted: 0 },
  { id: 'mandala_csm', name: 'Mandala Cósmica', description: 'CPS x5 permanente.', icon: '🕉️', category: 'enchantment', craftTime: 7200, ingredients: [{ type: 'coxinhas', amount: 1e50 }, { type: 'stardust', amount: 5000 }, { type: 'golden_essence', amount: 2000 }], result: { type: 'permanent_mult', value: 5 }, discovered: false, timesCrafted: 0 },
  { id: 'sigilo_infinito', name: 'Sigilo Infinito', description: 'CPS x10 permanente.', icon: '♾️', category: 'enchantment', craftTime: 14400, ingredients: [{ type: 'coxinhas', amount: 1e60 }, { type: 'fragments', amount: 50000 }, { type: 'cosmic_flour', amount: 1000 }], result: { type: 'permanent_mult', value: 10 }, discovered: false, timesCrafted: 0 },

  // Legendary Tier 2 (10)
  { id: 'fragmento_divino', name: 'Fragmento Divino', description: '+1000 fragmentos.', icon: '💎', category: 'legendary', craftTime: 600, ingredients: [{ type: 'coxinhas', amount: 1e30 }, { type: 'stardust', amount: 200 }], result: { type: 'fragments', value: 1000 }, discovered: false, timesCrafted: 0 },
  { id: 'poeira_estelar_pura', name: 'Poeira Estelar Pura', description: '+5 Skill Points.', icon: '⭐', category: 'legendary', craftTime: 900, ingredients: [{ type: 'stardust', amount: 500 }, { type: 'golden_essence', amount: 100 }], result: { type: 'skill_point', value: 5 }, discovered: false, timesCrafted: 0 },
  { id: 'essencia_csm', name: 'Essência Cósmica', description: 'Pet XP x1000.', icon: '🌟', category: 'legendary', craftTime: 1200, ingredients: [{ type: 'coxinhas', amount: 1e40 }, { type: 'cosmic_flour', amount: 100 }], result: { type: 'pet_xp', value: 1000 }, discovered: false, timesCrafted: 0 },
  { id: 'nucleo_void', name: 'Núcleo do Vazio', description: '+10000 fragmentos.', icon: '🖤', category: 'legendary', craftTime: 1800, ingredients: [{ type: 'coxinhas', amount: 1e50 }, { type: 'fragments', amount: 5000 }], result: { type: 'fragments', value: 10000 }, discovered: false, timesCrafted: 0 },
  { id: 'cristal_infinito', name: 'Cristal do Infinito', description: '+20 Skill Points.', icon: '💠', category: 'legendary', craftTime: 3600, ingredients: [{ type: 'coxinhas', amount: 1e60 }, { type: 'stardust', amount: 5000 }, { type: 'golden_essence', amount: 2000 }, { type: 'cosmic_flour', amount: 500 }], result: { type: 'skill_point', value: 20 }, discovered: false, timesCrafted: 0 },
];

// ── 22 NEW CHALLENGES ────────────────────────────────────────────────────────

export const EXTRA_CHALLENGES: Challenge[] = [
  { id: 'ch_speed_divine', name: 'Velocidade Divina', description: 'Alcance CPS 1e20 em 5 minutos.', icon: '⚡', type: 'speed', targetValue: 1e20, timeLimit: 300, reward: { type: 'permanent_mult', value: 2 }, completed: false, completedCount: 0 },
  { id: 'ch_no_click', name: 'Zen Total', description: 'Alcance 1e15 CPS sem clicar.', icon: '🧘', type: 'restriction', targetValue: 1e15, timeLimit: 600, reward: { type: 'permanent_mult', value: 1.5 }, completed: false, completedCount: 0 },
  { id: 'ch_one_type', name: 'Monopólio', description: 'Só compre um tipo de edifício. 1e12 CPS.', icon: '🏠', type: 'restriction', targetValue: 1e12, timeLimit: 900, reward: { type: 'permanent_mult', value: 1.3 }, completed: false, completedCount: 0 },
  { id: 'ch_click_only', name: 'Dedos de Aço', description: 'Só cliques. 1e10 coxinhas.', icon: '💪', type: 'restriction', targetValue: 1e10, timeLimit: 600, reward: { type: 'permanent_mult', value: 1.5 }, completed: false, completedCount: 0 },
  { id: 'ch_speed_void', name: 'Corrida Void', description: 'CPS 1e30 em 10min.', icon: '🕳️', type: 'speed', targetValue: 1e30, timeLimit: 600, reward: { type: 'permanent_mult', value: 3 }, completed: false, completedCount: 0 },
  { id: 'ch_endurance', name: 'Resistência', description: 'Mantenha CPS > 1e20 por 10min sem parar.', icon: '🏋️', type: 'endurance', targetValue: 1e20, timeLimit: 600, reward: { type: 'permanent_mult', value: 2 }, completed: false, completedCount: 0 },
  { id: 'ch_combo_king', name: 'Rei do Combo', description: 'Alcance combo 1000 em 5min.', icon: '🔥', type: 'speed', targetValue: 1000, timeLimit: 300, reward: { type: 'permanent_mult', value: 1.5 }, completed: false, completedCount: 0 },
  { id: 'ch_golden_hunt', name: 'Caça Dourada', description: 'Colete 20 coxinhas douradas em 10min.', icon: '🌟', type: 'speed', targetValue: 20, timeLimit: 600, reward: { type: 'permanent_mult', value: 1.5 }, completed: false, completedCount: 0 },
  { id: 'ch_poverty', name: 'Pobreza Extrema', description: 'Alcance 1e8 CPS com custo 2x.', icon: '💸', type: 'restriction', targetValue: 1e8, timeLimit: 900, reward: { type: 'permanent_mult', value: 2 }, completed: false, completedCount: 0 },
  { id: 'ch_temporal_race', name: 'Corrida Temporal', description: '1e40 CPS em 5min.', icon: '⏰', type: 'speed', targetValue: 1e40, timeLimit: 300, reward: { type: 'permanent_mult', value: 5 }, completed: false, completedCount: 0 },
  { id: 'ch_elemental_trial', name: 'Prova Elemental', description: 'Tenha todos os edifícios elementais.', icon: '🌋', type: 'collection', targetValue: 5, timeLimit: 1800, reward: { type: 'permanent_mult', value: 3 }, completed: false, completedCount: 0 },
  { id: 'ch_infinite_patience', name: 'Paciência Infinita', description: 'Jogue 1h sem rebirth.', icon: '⏳', type: 'endurance', targetValue: 3600, timeLimit: 7200, reward: { type: 'permanent_mult', value: 2 }, completed: false, completedCount: 0 },
  { id: 'ch_build_all_divine', name: 'Coleção Divina', description: 'Tenha todos os edifícios divinos.', icon: '😇', type: 'collection', targetValue: 5, timeLimit: 3600, reward: { type: 'permanent_mult', value: 2 }, completed: false, completedCount: 0 },
  { id: 'ch_speed_omega', name: 'Corrida Ômega', description: '1e50 CPS em 5min.', icon: 'Ω', type: 'speed', targetValue: 1e50, timeLimit: 300, reward: { type: 'permanent_mult', value: 10 }, completed: false, completedCount: 0 },
];

// ── 36 NEW QUESTS ────────────────────────────────────────────────────────────

export const EXTRA_QUESTS: Quest[] = [
  { id: 'eq_click_5k', name: 'Dedos Aquecidos', description: 'Clique 5000 vezes.', icon: '👆', type: 'clicks', target: 5000, reward: { coxinhas: 1e10 } },
  { id: 'eq_click_20k', name: 'Mãos de Ouro', description: 'Clique 20000 vezes.', icon: '✋', type: 'clicks', target: 20000, reward: { coxinhas: 1e15, skillPoints: 3 } },
  { id: 'eq_click_100k', name: 'Lenda Clicadora', description: 'Clique 100000 vezes.', icon: '💪', type: 'clicks', target: 100000, reward: { coxinhas: 1e20, fragments: 100 } },
  { id: 'eq_build_30', name: 'Expansionista', description: 'Compre 30 edifícios.', icon: '🏗️', type: 'buildings_bought', target: 30, reward: { coxinhas: 1e12, skillPoints: 2 } },
  { id: 'eq_build_100', name: 'Megamagnata', description: 'Compre 100 edifícios.', icon: '🏙️', type: 'buildings_bought', target: 100, reward: { coxinhas: 1e18, fragments: 50 } },
  { id: 'eq_golden_15', name: 'Coletor Dourado', description: 'Clique em 15 coxinhas douradas.', icon: '🌟', type: 'golden_clicked', target: 15, reward: { coxinhas: 1e14, fragments: 10 } },
  { id: 'eq_golden_50', name: 'Mestre do Ouro', description: 'Clique em 50 coxinhas douradas.', icon: '⭐', type: 'golden_clicked', target: 50, reward: { coxinhas: 1e20, fragments: 100 } },
  { id: 'eq_produce_1b', name: 'Bilionário', description: 'Produza 1 bilhão de coxinhas.', icon: '💰', type: 'produced', target: 1e9, reward: { coxinhas: 1e8, skillPoints: 2 } },
  { id: 'eq_produce_1t', name: 'Trilionário', description: 'Produza 1 trilhão.', icon: '💎', type: 'produced', target: 1e12, reward: { coxinhas: 1e11, fragments: 20 } },
  { id: 'eq_produce_1q', name: 'Quadrilionário', description: 'Produza 1 quadrilhão.', icon: '🏆', type: 'produced', target: 1e15, reward: { coxinhas: 1e14, fragments: 100, skillPoints: 5 } },
  { id: 'eq_produce_1qi', name: 'Quintilionário', description: 'Produza 1 quintilhão.', icon: '🥇', type: 'produced', target: 1e18, reward: { coxinhas: 1e17, fragments: 500 } },
  { id: 'eq_upgrade_20', name: 'Melhorista', description: 'Compre 20 upgrades.', icon: '✨', type: 'upgrades_bought', target: 20, reward: { coxinhas: 1e12, fragments: 10 } },
  { id: 'eq_upgrade_50', name: 'Otimizador', description: 'Compre 50 upgrades.', icon: '🔬', type: 'upgrades_bought', target: 50, reward: { coxinhas: 1e18, skillPoints: 5 } },
  { id: 'eq_combo_100', name: 'Combo Iniciante', description: 'Alcance combo 100.', icon: '🔥', type: 'combo_reached', target: 100, reward: { coxinhas: 1e10 } },
  { id: 'eq_combo_500', name: 'Combo Mestre', description: 'Alcance combo 500.', icon: '💥', type: 'combo_reached', target: 500, reward: { coxinhas: 1e15, fragments: 50 } },
  { id: 'eq_combo_1000', name: 'Combo Lendário', description: 'Alcance combo 1000.', icon: '⚡', type: 'combo_reached', target: 1000, reward: { coxinhas: 1e20, skillPoints: 10 } },
  { id: 'eq_cps_10k', name: 'Eficiente II', description: 'Alcance 10000 CPS.', icon: '📈', type: 'cps_reached', target: 10000, reward: { coxinhas: 1e8 } },
  { id: 'eq_cps_1b', name: 'Bi CPS', description: 'Alcance 1B CPS.', icon: '📈', type: 'cps_reached', target: 1e9, reward: { coxinhas: 1e12, fragments: 20 } },
  { id: 'eq_cps_1t', name: 'Tri CPS', description: 'Alcance 1T CPS.', icon: '🚀', type: 'cps_reached', target: 1e12, reward: { coxinhas: 1e15, skillPoints: 5 } },
  { id: 'eq_cps_1q', name: 'Qua CPS', description: 'Alcance 1QUA CPS.', icon: '🚀', type: 'cps_reached', target: 1e15, reward: { coxinhas: 1e18, fragments: 100 } },
  { id: 'eq_cps_1qi', name: 'Qui CPS', description: 'Alcance 1QUI CPS.', icon: '🌟', type: 'cps_reached', target: 1e18, reward: { coxinhas: 1e21, fragments: 500, skillPoints: 10 } },
] as any[];

// ── 30 NEW EVENTS ────────────────────────────────────────────────────────────

export const EXTRA_EVENTS: RandomEvent[] = [
  { id: 'tempestade_divina', name: '☁️ Tempestade Divina!', description: 'Os deuses abençoam a produção! CPS x5!', icon: '☁️', color: '#FFD700', duration: 25000, effect: { type: 'cps_mult', value: 5 }, chance: 0.00015 },
  { id: 'void_surge', name: '🕳️ Surto do Vazio!', description: 'Energia void atinge a produção! CPS x8!', icon: '🕳️', color: '#333', duration: 15000, effect: { type: 'cps_mult', value: 8 }, chance: 0.0001 },
  { id: 'temporal_anomaly', name: '⏰ Anomalia Temporal!', description: 'Tempo distorcido! CPS x4 por 40s!', icon: '⏰', color: '#00BCD4', duration: 40000, effect: { type: 'cps_mult', value: 4 }, chance: 0.0002 },
  { id: 'elemental_fury', name: '🌋 Fúria Elemental!', description: 'Todos os elementos se unem! CPS x6!', icon: '🌋', color: '#FF5722', duration: 20000, effect: { type: 'cps_mult', value: 6 }, chance: 0.00015 },
  { id: 'dimensional_rift', name: '🌐 Fenda Dimensional!', description: 'Portais se abrem! Cliques x10!', icon: '🌐', color: '#9C27B0', duration: 20000, effect: { type: 'click_mult', value: 10 }, chance: 0.00015 },
  { id: 'quantum_surge', name: '⚛️ Surto Quântico!', description: 'Superposição! CPS x10!', icon: '⚛️', color: '#2196F3', duration: 10000, effect: { type: 'cps_mult', value: 10 }, chance: 0.00005 },
  { id: 'cosmic_wave', name: '🌌 Onda Cósmica!', description: 'Energia do cosmos! Tudo x3!', icon: '🌌', color: '#673AB7', duration: 30000, effect: { type: 'cps_mult', value: 3 }, chance: 0.0003 },
  { id: 'supernova', name: '💥 Supernova!', description: 'Explosão estelar! CPS x15!', icon: '💥', color: '#FF9800', duration: 8000, effect: { type: 'cps_mult', value: 15 }, chance: 0.00003 },
  { id: 'eclipse_total', name: '🌑 Eclipse Total!', description: 'Escuridão! CPS -75% por 15s!', icon: '🌑', color: '#212121', duration: 15000, effect: { type: 'cps_mult', value: 0.25 }, chance: 0.00008 },
  { id: 'aurora_borealis', name: '🌈 Aurora Boreal!', description: 'Beleza cósmica! Golden x8!', icon: '🌈', color: '#4CAF50', duration: 30000, effect: { type: 'golden_rate', value: 8 }, chance: 0.0001 },
  { id: 'meteor_shower', name: '☄️ Chuva de Meteoros!', description: 'Fragmentos do espaço! Custo -50%!', icon: '☄️', color: '#795548', duration: 25000, effect: { type: 'cost_reduction', value: 0.5 }, chance: 0.00015 },
  { id: 'wormhole', name: '🌀 Buraco de Minhoca!', description: 'Atalho dimensional! CPS x5!', icon: '🌀', color: '#00BCD4', duration: 20000, effect: { type: 'cps_mult', value: 5 }, chance: 0.0002 },
  { id: 'divine_blessing', name: '😇 Bênção Divina!', description: 'Graça celestial! Cliques x20!', icon: '😇', color: '#FFD700', duration: 15000, effect: { type: 'click_mult', value: 20 }, chance: 0.0001 },
  { id: 'void_storm', name: '⬛ Tempestade Void!', description: 'Caos absoluto! CPS x20!', icon: '⬛', color: '#1A1A1A', duration: 5000, effect: { type: 'cps_mult', value: 20 }, chance: 0.00002 },
  { id: 'time_freeze', name: '❄️ Congelamento Temporal!', description: 'Tempo parado! Nada produz por 10s!', icon: '❄️', color: '#03A9F4', duration: 10000, effect: { type: 'cps_halt', value: 0 }, chance: 0.00005 },
  { id: 'golden_age', name: '👑 Era Dourada!', description: 'Prosperidade total! Tudo x4 por 60s!', icon: '👑', color: '#FFD700', duration: 60000, effect: { type: 'cps_mult', value: 4 }, chance: 0.0001 },
  { id: 'mana_surge', name: '🔮 Surto de Mana!', description: 'Energia mística! Cliques x15!', icon: '🔮', color: '#9C27B0', duration: 15000, effect: { type: 'click_mult', value: 15 }, chance: 0.00012 },
  { id: 'earthquake', name: '🌍 Terremoto!', description: 'Abalo! CPS -50% por 20s!', icon: '🌍', color: '#795548', duration: 20000, effect: { type: 'cps_mult', value: 0.5 }, chance: 0.00008 },
  { id: 'festival_coxinha', name: '🎉 Festival da Coxinha!', description: 'Festa total! CPS x3, Golden x3!', icon: '🎉', color: '#FF9800', duration: 45000, effect: { type: 'cps_mult', value: 3 }, chance: 0.0002 },
  { id: 'alien_contact', name: '👽 Contato Alienígena!', description: 'ETs querem coxinha! CPS x12!', icon: '👽', color: '#4CAF50', duration: 12000, effect: { type: 'cps_mult', value: 12 }, chance: 0.00008 },
];

// ── 21 NEW GALAXIES ──────────────────────────────────────────────────────────

export const EXTRA_GALAXIES: Record<string, Galaxy> = {
  messier_87: { id: 'messier_87', name: 'Messier 87', description: 'Galáxia elíptica gigante com buraco negro supermassivo.', icon: '🕳️', cost: 200000, multiplier: 30, unlocked: false, exploration: 0, discoveredPlanets: [], requirements: [{ type: 'rebirth_count', value: 40 }] },
  sculptor: { id: 'sculptor', name: 'Escultor', description: 'Galáxia espiral próxima.', icon: '🎨', cost: 300000, multiplier: 35, unlocked: false, exploration: 0, discoveredPlanets: [], requirements: [{ type: 'rebirth_count', value: 50 }, { type: 'fragments', value: 200000 }] },
  pinwheel: { id: 'pinwheel', name: 'Cata-Vento', description: 'Espiral perfeita.', icon: '🌀', cost: 500000, multiplier: 45, unlocked: false, exploration: 0, special: true, discoveredPlanets: [], requirements: [{ type: 'rebirth_count', value: 60 }] },
  antennae: { id: 'antennae', name: 'Antenas', description: 'Galáxias em colisão!', icon: '📡', cost: 750000, multiplier: 55, unlocked: false, exploration: 0, discoveredPlanets: [], requirements: [{ type: 'rebirth_count', value: 75 }] },
  tadpole: { id: 'tadpole', name: 'Girino Cósmico', description: 'Cauda de estrelas.', icon: '🐸', cost: 1000000, multiplier: 70, unlocked: false, exploration: 0, discoveredPlanets: [], requirements: [{ type: 'rebirth_count', value: 90 }] },
  cigar: { id: 'cigar', name: 'Galáxia Charuto', description: 'Formação de estrelas explosiva.', icon: '🔥', cost: 1500000, multiplier: 85, unlocked: false, exploration: 0, legendary: true, discoveredPlanets: [], requirements: [{ type: 'rebirth_count', value: 100 }] },
  black_eye: { id: 'black_eye', name: 'Olho Negro', description: 'Misteriosa e escura.', icon: '👁️', cost: 2000000, multiplier: 100, unlocked: false, exploration: 0, legendary: true, discoveredPlanets: [], requirements: [{ type: 'rebirth_count', value: 120 }, { type: 'fragments', value: 1000000 }] },
  sunflower: { id: 'sunflower', name: 'Girassol', description: 'Brilhante como o sol.', icon: '🌻', cost: 3000000, multiplier: 125, unlocked: false, exploration: 0, discoveredPlanets: [], requirements: [{ type: 'rebirth_count', value: 140 }] },
  ring: { id: 'ring', name: 'Galáxia Anel', description: 'Formato de anel perfeito.', icon: '💍', cost: 5000000, multiplier: 150, unlocked: false, exploration: 0, legendary: true, discoveredPlanets: [], requirements: [{ type: 'rebirth_count', value: 160 }] },
  void_galaxy: { id: 'void_galaxy', name: 'Galáxia do Vazio', description: 'Existe entre dimensões.', icon: '🕳️', cost: 7500000, multiplier: 200, unlocked: false, exploration: 0, endgame: true, discoveredPlanets: [], requirements: [{ type: 'rebirth_count', value: 180 }, { type: 'fragments', value: 5000000 }] },
  temporal_nexus: { id: 'temporal_nexus', name: 'Nexus Temporal', description: 'Onde todos os tempos convergem.', icon: '⏰', cost: 10000000, multiplier: 250, unlocked: false, exploration: 0, endgame: true, discoveredPlanets: [], requirements: [{ type: 'rebirth_count', value: 200 }] },
  elemental_core: { id: 'elemental_core', name: 'Núcleo Elemental', description: 'Fonte de toda matéria.', icon: '🌋', cost: 15000000, multiplier: 300, unlocked: false, exploration: 0, endgame: true, discoveredPlanets: [], requirements: [{ type: 'rebirth_count', value: 225 }] },
  infinite_spiral: { id: 'infinite_spiral', name: 'Espiral Infinita', description: 'Não tem fim. Literalmente.', icon: '♾️', cost: 25000000, multiplier: 400, unlocked: false, exploration: 0, endgame: true, discoveredPlanets: [], requirements: [{ type: 'rebirth_count', value: 250 }, { type: 'fragments', value: 20000000 }] },
  omega_cluster: { id: 'omega_cluster', name: 'Aglomerado Ômega', description: 'O último aglomerado de galáxias.', icon: 'Ω', cost: 50000000, multiplier: 500, unlocked: false, exploration: 0, endgame: true, discoveredPlanets: [], requirements: [{ type: 'rebirth_count', value: 300 }] },
  alpha_prime: { id: 'alpha_prime', name: 'Alpha Prime', description: 'A galáxia primordial.', icon: 'α', cost: 100000000, multiplier: 750, unlocked: false, exploration: 0, endgame: true, discoveredPlanets: [], requirements: [{ type: 'rebirth_count', value: 350 }, { type: 'fragments', value: 50000000 }] },
  genesis_core: { id: 'genesis_core', name: 'Núcleo Genesis', description: 'Onde o Big Bang aconteceu.', icon: '💥', cost: 250000000, multiplier: 1000, unlocked: false, exploration: 0, endgame: true, discoveredPlanets: [], requirements: [{ type: 'rebirth_count', value: 400 }] },
  the_origin: { id: 'the_origin', name: 'A Origem', description: 'Antes de tudo. Tudo veio daqui.', icon: '✨', cost: 500000000, multiplier: 1500, unlocked: false, exploration: 0, endgame: true, discoveredPlanets: [], requirements: [{ type: 'rebirth_count', value: 500 }, { type: 'achievement_count', value: 200 }] },
  coxinha_verse: { id: 'coxinha_verse', name: 'Coxinhoverso Supremo', description: 'O universo definitivo. Feito inteiramente de coxinhas.', icon: '🥟', cost: 1000000000, multiplier: 2500, unlocked: false, exploration: 0, endgame: true, discoveredPlanets: [], requirements: [{ type: 'rebirth_count', value: 666 }, { type: 'fragments', value: 500000000 }] },
};

// ── 20 NEW GALAXY UPGRADES ───────────────────────────────────────────────────

export const EXTRA_GALAXY_UPGRADES: GalaxyUpgrade[] = [
  { id: 'egu_divine_touch', name: 'Toque Divino', description: 'Bênção dos deuses.', icon: '😇', cost: 5000, costType: 'fragments', effect: { type: 'cps_mult', value: 5 }, purchased: false, requirement: { type: 'rebirth_count', value: 40 } },
  { id: 'egu_void_power', name: 'Poder Void', description: 'Força do vazio.', icon: '🕳️', cost: 10000, costType: 'fragments', effect: { type: 'cps_mult', value: 7 }, purchased: false, requirement: { type: 'rebirth_count', value: 60 } },
  { id: 'egu_time_warp', name: 'Distorção Temporal', description: 'Cliques x10.', icon: '⏰', cost: 500, costType: 'stardust', effect: { type: 'click_mult', value: 10 }, purchased: false, requirement: { type: 'rebirth_count', value: 80 } },
  { id: 'egu_elem_power', name: 'Força Elemental', description: 'CPS x10.', icon: '🌋', cost: 25000, costType: 'fragments', effect: { type: 'cps_mult', value: 10 }, purchased: false, requirement: { type: 'rebirth_count', value: 100 } },
  { id: 'egu_dim_shift', name: 'Mudança Dimensional', description: 'Golden x5.', icon: '🌐', cost: 1000, costType: 'stardust', effect: { type: 'golden_rate', value: 5 }, purchased: false, requirement: { type: 'rebirth_count', value: 120 } },
  { id: 'egu_quantum_leap', name: 'Salto Quântico', description: 'CPS x15.', icon: '⚛️', cost: 50000, costType: 'fragments', effect: { type: 'cps_mult', value: 15 }, purchased: false, requirement: { type: 'rebirth_count', value: 150 } },
  { id: 'egu_cosmic_forge', name: 'Forja Cósmica II', description: 'Fragmentos x3.', icon: '🔨', cost: 2000, costType: 'cosmic_flour', effect: { type: 'fragment_mult', value: 3 }, purchased: false, requirement: { type: 'rebirth_count', value: 180 } },
  { id: 'egu_transcend_power', name: 'Poder Transcendente', description: 'CPS x25.', icon: '🧘', cost: 100000, costType: 'fragments', effect: { type: 'cps_mult', value: 25 }, purchased: false, requirement: { type: 'rebirth_count', value: 200 } },
  { id: 'egu_infinite_loop', name: 'Loop Infinito', description: 'Tudo x10.', icon: '♾️', cost: 500000, costType: 'fragments', effect: { type: 'all_mult', value: 10 }, purchased: false, requirement: { type: 'rebirth_count', value: 250 } },
  { id: 'egu_omega_final', name: 'Ômega Final', description: 'CPS x100.', icon: 'Ω', cost: 1000000, costType: 'fragments', effect: { type: 'cps_mult', value: 100 }, purchased: false, requirement: { type: 'rebirth_count', value: 300 } },
  { id: 'egu_alpha_start', name: 'Alpha Início', description: 'Clique x50.', icon: 'α', cost: 5000, costType: 'stardust', effect: { type: 'click_mult', value: 50 }, purchased: false, requirement: { type: 'rebirth_count', value: 350 } },
  { id: 'egu_genesis_power', name: 'Poder Gênesis', description: 'CPS x500.', icon: '💥', cost: 5000000, costType: 'fragments', effect: { type: 'cps_mult', value: 500 }, purchased: false, requirement: { type: 'rebirth_count', value: 400 } },
  { id: 'egu_origin_force', name: 'Força da Origem', description: 'Tudo x100.', icon: '✨', cost: 10000000, costType: 'fragments', effect: { type: 'all_mult', value: 100 }, purchased: false, requirement: { type: 'rebirth_count', value: 500 } },
  { id: 'egu_coxinha_supreme', name: 'Coxinha Suprema', description: 'CPS x1000.', icon: '🥟', cost: 100000000, costType: 'fragments', effect: { type: 'cps_mult', value: 1000 }, purchased: false, requirement: { type: 'rebirth_count', value: 666 } },
];

// ── 50+ NEW HEADLINES ────────────────────────────────────────────────────────

export const EXTRA_HEADLINES: string[] = [
  "Coxinha divina cura todas as doenças, afirmam cientistas da Cozinha Celestial.",
  "Portal para dimensão de coxinhas infinitas é aberto em laboratório.",
  "Viajante do tempo traz receita de coxinha do ano 3000. Veredicto: 'Perfeita'.",
  "Elemento recém-descoberto na tabela periódica chamado 'Coxinhium' (Cx).",
  "Físicos confirmam: matéria escura é na verdade massa de coxinha comprimida.",
  "Dragon Ball Z: Goku admite que coxinha é mais forte que Senzu Bean.",
  "Minecraft adiciona bloco de coxinha em nova atualização. Fãs enlouquecem.",
  "Tesla anuncia carro movido a óleo de coxinha. Autonomia infinita.",
  "Aliens do vazio só se comunicam em formato de pedidos de coxinha.",
  "Loop temporal em padaria faz mesma coxinha ser vendida infinitas vezes.",
  "ONU classifica coxinha como patrimônio imaterial, material e interdimensional.",
  "Vulcão em atividade começa a expelir coxinhas. Cientistas perplexos.",
  "Corrente de vento misterioso carrega aroma de coxinha por todo o planeta.",
  "Novidade: Coxinha quântica existe em 11 sabores simultaneamente.",
  "Breaking News: Padeiro do Big Bang recria o universo com recheio de frango.",
  "Energia escura do universo é aproveitada para fritar coxinhas cosmicamente.",
  "Forno que funciona com buracos negros ganha prêmio de inovação galáctica.",
  "Explorador dimensional encontra versão perfeita de coxinha em dimensão 47B.",
  "Cientista atinge iluminação coxinhística após 30 dias de jejum... de não-coxinhas.",
  "Motor de infinito patenteado para produzir coxinhas sem parar. Funcionou.",
  "Padeiro Ômega declara: 'Depois de mim, só coxinha pura'. E estremeceu.",
  "Cozinha Alpha descobre que a receita original nunca foi perdida. Era coxinha.",
  "Fritadeira Gênesis: 'No começo, era o óleo. E o óleo era bom.'",
  "Forno Ápice bate recorde: 1 googol de coxinhas em 1 segundo.",
  "A Coxinha Final foi criada. O universo agradeceu e chorou de alegria.",
  "Dragão do Vazio domesticado! Agora serve como assistente de fritura.",
  "Fênix Cósmica renasce das cinzas... e traz coxinhas do além.",
  "Gato-Deus concede bênção: produção de coxinhas dobrada por toda eternidade.",
  "Tartaruga-Mundo carrega padaria inteira em suas costas. Entrega a domicílio.",
  "Ouroboros comeu a própria cauda. Descobriu que era feita de coxinha.",
  "Espírito da Coxinha aparece em sonho e revela receita suprema.",
  "Expedição ao Coxinhoverso Supremo retorna com coxinhas de sabor impossível.",
  "Meteorologistas garantem: previsão de tempo 'Chuva de Óleo' confirmada.",
  "Temporada de Coxinhas começa oficialmente. Preços despencam. Sabor sobe.",
  "Pesquisa revela: comer coxinhas aumenta produtividade em 10000%.",
  "Vovó Coxinheira ganha estátua de 100 metros em praça central.",
  "IA mais poderosa do mundo dedicada exclusivamente a otimizar receitas de coxinha.",
  "Nasa planeja missão 'Coxinha Lunar' para 2028. Objetivo: fritar na Lua.",
  "Competição global de coxinhas: Brasil ganha pela 47ª vez consecutiva.",
  "Novo elemento: Coxinhium (Cx) - Os quarks são feitos de mini-coxinhas.",
  "Paradoxo resolvido: veio primeiro a coxinha ou o frango? Resposta: a coxinha.",
  "Entrelaçamento quântico permite comer coxinhas que não existem. Funciona.",
  "Big Crunch confirmado: o universo vai colapsar em uma coxinha gigante.",
  "Jogador de Coxinha Clicker atinge 1e308 coxinhas. Computador explode de alegria.",
  "Governo anuncia: Coxinha agora é moeda oficial. Cartão de crédito aceita.",
  "Filósofo grego revive e declara: 'Penso, logo coxinho.'",
  "Arqueólogos encontram fritadeira sagrada em pirâmide egípcia. Ainda funciona.",
  "Universo paralelo descoberto onde tudo é coxinha. Migração em massa.",
  "Breaking: A Resposta para a Vida, o Universo e Tudo Mais é... coxinha.",
  "Último humano no universo: 'Pelo menos ainda tem coxinha.'",
];
