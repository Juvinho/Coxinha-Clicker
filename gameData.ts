// ============================================================================
// COXINHA CLICKER - AAA GAME DATA
// 25 Buildings, 150+ Upgrades, 80+ Achievements, Skills, Pets, Recipes, Challenges
// ============================================================================

import {
  Building, Upgrade, Achievement, Skill, Pet, CraftingRecipe,
  Challenge, Quest, RandomEvent, Galaxy, GalaxyUpgrade
} from './types';

// ── BUILDINGS (25) ───────────────────────────────────────────────────────────

export const INITIAL_BUILDINGS: Building[] = [
  // BASIC TIER (1-5)
  { id: 'cursor', name: 'Cursor Automático', description: 'Clica sozinho. Preguiça premium.', icon: '👆', baseCost: 15, baseCps: 0.1, count: 0, totalProduced: 0, tier: 'basic' },
  { id: 'grandma', name: 'Vovó Cozinheira', description: 'Faz coxinhas com receita secreta ancestral.', icon: '👵', baseCost: 100, baseCps: 1, count: 0, totalProduced: 0, tier: 'basic' },
  { id: 'stand', name: 'Barraquinha de Feira', description: 'Ponto estratégico na esquina movimentada.', icon: '🏪', baseCost: 1100, baseCps: 8, count: 0, totalProduced: 0, tier: 'basic' },
  { id: 'pastry', name: 'Pastelaria Artesanal', description: 'Para quem leva coxinha a sério.', icon: '🥟', baseCost: 12000, baseCps: 47, count: 0, totalProduced: 0, tier: 'basic' },
  { id: 'fryer', name: 'Fritadeira Industrial', description: 'Capacidade para 10.000 coxinhas/hora.', icon: '🍳', baseCost: 130000, baseCps: 260, count: 0, totalProduced: 0, tier: 'basic' },

  // ADVANCED TIER (6-10)
  { id: 'truck', name: 'Food Truck Gourmet', description: 'Coxinha artesanal sobre rodas.', icon: '🚚', baseCost: 1400000, baseCps: 1400, count: 0, totalProduced: 0, tier: 'advanced' },
  { id: 'restaurant', name: 'Restaurante 5 Estrelas', description: 'Haute cuisine de coxinhas.', icon: '🏨', baseCost: 20000000, baseCps: 7800, count: 0, totalProduced: 0, tier: 'advanced' },
  { id: 'factory', name: 'Fábrica de Coxinhas', description: 'Produção em escala industrial.', icon: '🏭', baseCost: 330000000, baseCps: 44000, count: 0, totalProduced: 0, tier: 'advanced' },
  { id: 'lab', name: 'Laboratório de Sabores', description: 'Pesquisa genética de sabores perfeitos.', icon: '🔬', baseCost: 5100000000, baseCps: 260000, count: 0, totalProduced: 0, tier: 'advanced' },
  { id: 'portal', name: 'Portal Dimensional', description: 'Importa coxinhas de dimensões paralelas.', icon: '🌀', baseCost: 75000000000, baseCps: 1600000, count: 0, totalProduced: 0, tier: 'advanced' },

  // EPIC TIER (11-15)
  { id: 'time_machine', name: 'Máquina do Tempo', description: 'Traz coxinhas do futuro pré-fritas.', icon: '⏰', baseCost: 1000000000000, baseCps: 10000000, count: 0, totalProduced: 0, tier: 'epic' },
  { id: 'antimatter', name: 'Condensador de Antimatéria', description: 'Converte antimatéria em massa de coxinha.', icon: '⚛️', baseCost: 14000000000000, baseCps: 65000000, count: 0, totalProduced: 0, tier: 'epic' },
  { id: 'prism', name: 'Prisma Cósmico', description: 'Refrata luz solar em coxinhas puras.', icon: '🔮', baseCost: 170000000000000, baseCps: 430000000, count: 0, totalProduced: 0, tier: 'epic' },
  { id: 'quantum', name: 'Computador Quântico', description: 'Calcula a coxinha perfeita em todas as realidades.', icon: '💻', baseCost: 2100000000000000, baseCps: 2900000000, count: 0, totalProduced: 0, tier: 'epic' },
  { id: 'cortex', name: 'Rede Neural Coxinheira', description: 'IA que sonha com coxinhas.', icon: '🧠', baseCost: 26000000000000000, baseCps: 21000000000, count: 0, totalProduced: 0, tier: 'epic' },

  // LEGENDARY TIER (16-20)
  { id: 'temple', name: 'Templo da Coxinha Sagrada', description: 'Monges dedicados à arte milenar da fritura.', icon: '⛩️', baseCost: 310000000000000000, baseCps: 150000000000, count: 0, totalProduced: 0, tier: 'legendary' },
  { id: 'dimension', name: 'Fenda Dimensional', description: 'Abre portais para o Coxinhoverso.', icon: '🌌', baseCost: 4100000000000000000, baseCps: 1100000000000, count: 0, totalProduced: 0, tier: 'legendary' },
  { id: 'singularity', name: 'Singularidade Fritosa', description: 'Um buraco negro que só produz coxinhas.', icon: '🕳️', baseCost: 57000000000000000000, baseCps: 8300000000000, count: 0, totalProduced: 0, tier: 'legendary' },
  { id: 'multiverse', name: 'Padaria Multiversal', description: 'Opera simultaneamente em infinitos universos.', icon: '🪐', baseCost: 780000000000000000000, baseCps: 64000000000000, count: 0, totalProduced: 0, tier: 'legendary' },
  { id: 'cosmic_oven', name: 'Fornalha Cósmica', description: 'Usa o calor de supernovas para fritar.', icon: '☀️', baseCost: 1e22, baseCps: 510000000000000, count: 0, totalProduced: 0, tier: 'legendary' },

  // MYTHIC TIER (21-25)
  { id: 'nebula_fryer', name: 'Fritadeira Nebular', description: 'Nebulosas inteiras convertidas em óleo sagrado.', icon: '🌟', baseCost: 1.4e24, baseCps: 4100000000000000, count: 0, totalProduced: 0, tier: 'mythic' },
  { id: 'galactic_chain', name: 'Rede Galáctica de Fast-Food', description: 'Franquias em todos os braços da galáxia.', icon: '🛸', baseCost: 2e26, baseCps: 33000000000000000, count: 0, totalProduced: 0, tier: 'mythic' },
  { id: 'universe_bakery', name: 'Panificadora Universal', description: 'O universo inteiro é uma grande coxinha.', icon: '✨', baseCost: 2.8e28, baseCps: 270000000000000000, count: 0, totalProduced: 0, tier: 'mythic' },
  { id: 'reality_engine', name: 'Motor da Realidade', description: 'Reescreve as leis da física pró-coxinha.', icon: '⚡', baseCost: 4e30, baseCps: 2.1e18, count: 0, totalProduced: 0, tier: 'mythic' },
  { id: 'omniscience', name: 'Onisciência Coxinheira', description: 'Transcendeu. Tudo é coxinha. Coxinha é tudo.', icon: '👁️', baseCost: 5.5e32, baseCps: 1.7e19, count: 0, totalProduced: 0, tier: 'mythic' },
];

// ── Helper to generate building upgrades ─────────────────────────────────────

function buildingUpgrade(buildingId: string, tier: number, name: string, desc: string, cost: number, mult: number, ugTier: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic' = 'common'): Upgrade {
  const unlockAt = tier === 1 ? 1 : tier === 2 ? 10 : tier === 3 ? 25 : tier === 4 ? 50 : tier === 5 ? 100 : tier === 6 ? 150 : tier === 7 ? 200 : 300;
  return {
    id: `${buildingId}_t${tier}`,
    name,
    description: desc,
    type: 'building',
    cost,
    multiplier: mult,
    purchased: false,
    triggerBuildingId: buildingId,
    tier: ugTier,
    unlockCondition: { type: 'building_count', targetId: buildingId, value: unlockAt }
  };
}

// ── UPGRADES (150+) ──────────────────────────────────────────────────────────

export const INITIAL_UPGRADES: Upgrade[] = [
  // ── Click Upgrades (10) ──
  { id: 'click_1', name: 'Dedos Reforçados', description: 'Cada clique produz 1 coxinha extra.', type: 'click', cost: 100, multiplier: 2, purchased: false, tier: 'common' },
  { id: 'click_2', name: 'Mãos de Ferro', description: 'Cliques 3x mais poderosos.', type: 'click', cost: 500, multiplier: 3, purchased: false, tier: 'common' },
  { id: 'click_3', name: 'Dedos de Aço', description: 'Força descomunal nos dedos.', type: 'click', cost: 5000, multiplier: 5, purchased: false, tier: 'rare' },
  { id: 'click_4', name: 'Luvas de Titânio', description: 'Proteção e poder em cada toque.', type: 'click', cost: 50000, multiplier: 10, purchased: false, tier: 'rare' },
  { id: 'click_5', name: 'Punhos Cósmicos', description: 'Seus dedos vibram com energia cósmica.', type: 'click', cost: 5e6, multiplier: 25, purchased: false, tier: 'epic' },
  { id: 'click_6', name: 'Toque de Midas Fritoso', description: 'Tudo que toca vira coxinha.', type: 'click', cost: 5e9, multiplier: 50, purchased: false, tier: 'epic' },
  { id: 'click_7', name: 'Dedo Quântico', description: 'Clica em todas as realidades ao mesmo tempo.', type: 'click', cost: 5e12, multiplier: 100, purchased: false, tier: 'legendary' },
  { id: 'click_8', name: 'Impulso Dimensional', description: 'Cada clique rasga o tecido do espaço-tempo.', type: 'click', cost: 5e15, multiplier: 250, purchased: false, tier: 'legendary' },
  { id: 'click_9', name: 'Singularidade Digital', description: 'Seu clique é uma força fundamental do universo.', type: 'click', cost: 5e18, multiplier: 1000, purchased: false, tier: 'mythic' },
  { id: 'click_10', name: 'OmniClique', description: 'Um clique para governar todos os cliques.', type: 'click', cost: 5e22, multiplier: 5000, purchased: false, tier: 'mythic' },

  // ── Cursor Upgrades (5) ──
  buildingUpgrade('cursor', 1, 'Clique Ambidestro', 'Cursores 2x mais rápidos.', 100, 2),
  buildingUpgrade('cursor', 2, 'Carpal Tunelizado', 'Cursores com turbo.', 500, 2, 'common'),
  buildingUpgrade('cursor', 3, 'Script AutoHotkey', 'Automação de cursores.', 10000, 3, 'rare'),
  buildingUpgrade('cursor', 4, 'Cursor Quântico', 'Clica antes de clicar.', 1e6, 5, 'epic'),
  buildingUpgrade('cursor', 5, 'Cursor Onipresente', 'Existe em todos os pixels.', 1e10, 10, 'legendary'),

  // ── Grandma Upgrades (5) ──
  buildingUpgrade('grandma', 1, 'Receita da Bisavó', 'Sabedoria ancestral +100%.', 1000, 2),
  buildingUpgrade('grandma', 2, 'Óculos de Precisão', 'Vovós com mira perfeita.', 5000, 2, 'common'),
  buildingUpgrade('grandma', 3, 'Bengala Turbo', 'Vovós velozes e furiosas.', 50000, 3, 'rare'),
  buildingUpgrade('grandma', 4, 'Exoesqueleto Geriátrico', 'Vovós cyberpunk.', 5e6, 5, 'epic'),
  buildingUpgrade('grandma', 5, 'Vovó Imortal', 'Transcendeu a mortalidade pela coxinha.', 5e10, 10, 'legendary'),

  // ── Stand Upgrades (5) ──
  buildingUpgrade('stand', 1, 'Toldo Maior', 'Mais espaço para clientes.', 11000, 2),
  buildingUpgrade('stand', 2, 'Letreiro Neon', 'Atrai clientes de longe.', 55000, 2, 'common'),
  buildingUpgrade('stand', 3, 'Drive-Thru de Calçada', 'Conveniência máxima.', 550000, 3, 'rare'),
  buildingUpgrade('stand', 4, 'Franquia Municipal', 'Uma barraquinha em cada esquina.', 55e6, 5, 'epic'),
  buildingUpgrade('stand', 5, 'Barraquinha Dimensional', 'Existe em múltiplas dimensões.', 55e10, 10, 'legendary'),

  // ── Pastry Upgrades (5) ──
  buildingUpgrade('pastry', 1, 'Forno Turbo', 'Assa mais rápido.', 120000, 2),
  buildingUpgrade('pastry', 2, 'Massa Premium', 'Ingredientes de primeira.', 600000, 2, 'common'),
  buildingUpgrade('pastry', 3, 'Chef Estrela Michelin', 'Pastelaria gourmet.', 6e6, 3, 'rare'),
  buildingUpgrade('pastry', 4, 'Fornalha Mágica', 'Forno encantado.', 6e9, 5, 'epic'),
  buildingUpgrade('pastry', 5, 'Pastelaria Etérea', 'Transcende o plano material.', 6e13, 10, 'legendary'),

  // ── Fryer Upgrades (5) ──
  buildingUpgrade('fryer', 1, 'Óleo Premium', 'Fritura perfeita sempre.', 1300000, 2),
  buildingUpgrade('fryer', 2, 'Temperatura Quântica', 'Fritura na temperatura exata.', 6.5e6, 2, 'common'),
  buildingUpgrade('fryer', 3, 'Fritadeira Air Ultra', 'Tecnologia de ponta.', 65e6, 3, 'rare'),
  buildingUpgrade('fryer', 4, 'Banho de Plasma', 'Fritura com plasma estelar.', 65e9, 5, 'epic'),
  buildingUpgrade('fryer', 5, 'Fritadeira da Eternidade', 'Frita no tempo zero.', 65e13, 10, 'legendary'),

  // ── Truck Upgrades (5) ──
  buildingUpgrade('truck', 1, 'GPS Inteligente', 'Rotas otimizadas por IA.', 14000000, 2),
  buildingUpgrade('truck', 2, 'Motor V12', 'Mais entregas, mais rápido.', 70e6, 2, 'common'),
  buildingUpgrade('truck', 3, 'Frota Completa', 'Uma armada de food trucks.', 700e6, 3, 'rare'),
  buildingUpgrade('truck', 4, 'Truck Volador', 'Food truck voador.', 700e9, 5, 'epic'),
  buildingUpgrade('truck', 5, 'Truck Interdimensional', 'Entrega em qualquer dimensão.', 700e12, 10, 'legendary'),

  // ── Restaurant Upgrades (5) ──
  buildingUpgrade('restaurant', 1, 'Decoração VIP', 'Ambiente luxuoso.', 200000000, 2),
  buildingUpgrade('restaurant', 2, 'Carta de Vinhos', 'Harmonização perfeita.', 1e9, 2, 'common'),
  buildingUpgrade('restaurant', 3, 'Estrela Michelin', 'Reconhecimento mundial.', 1e10, 3, 'rare'),
  buildingUpgrade('restaurant', 4, 'Resort Coxinhístico', 'Destino gastronômico.', 1e13, 5, 'epic'),
  buildingUpgrade('restaurant', 5, 'Restaurante Orbital', 'Fine dining no espaço.', 1e16, 10, 'legendary'),

  // ── Factory Upgrades (4) ──
  buildingUpgrade('factory', 1, 'Esteira Automatizada', 'Produção 24/7.', 3.3e9, 2),
  buildingUpgrade('factory', 2, 'Robôs de Linha', 'Zero erro humano.', 33e9, 2, 'common'),
  buildingUpgrade('factory', 3, 'Mega Fábrica', 'Ocupa uma cidade inteira.', 33e12, 3, 'rare'),
  buildingUpgrade('factory', 4, 'Nanotecnologia', 'Nanobots fazendo coxinhas.', 33e15, 5, 'epic'),

  // ── Lab Upgrades (4) ──
  buildingUpgrade('lab', 1, 'Espectrômetro de Sabor', 'Análise molecular do gosto.', 51e9, 2),
  buildingUpgrade('lab', 2, 'CRISPR Coxinheiro', 'Edição genética de ingredientes.', 51e12, 2, 'rare'),
  buildingUpgrade('lab', 3, 'Acelerador de Partículas', 'Física aplicada à fritura.', 51e15, 3, 'epic'),
  buildingUpgrade('lab', 4, 'Lab Interdimensional', 'Pesquisa em infinitas realidades.', 51e18, 5, 'legendary'),

  // ── Portal Upgrades (4) ──
  buildingUpgrade('portal', 1, 'Portal Estável', 'Conexão permanente.', 750e9, 2),
  buildingUpgrade('portal', 2, 'Multi-Portal', 'Vários portais simultâneos.', 750e12, 2, 'rare'),
  buildingUpgrade('portal', 3, 'Buraco de Minhoca', 'Atalho cósmico.', 750e15, 3, 'epic'),
  buildingUpgrade('portal', 4, 'Portal Omniversal', 'Acessa todos os universos.', 750e18, 5, 'legendary'),

  // ── Time Machine Upgrades (3) ──
  buildingUpgrade('time_machine', 1, 'Paradoxo Temporal', 'Coxinhas do passado e futuro.', 1e13, 2, 'rare'),
  buildingUpgrade('time_machine', 2, 'Cronofritor', 'Frita antes de existir.', 1e16, 3, 'epic'),
  buildingUpgrade('time_machine', 3, 'Loop Temporal Infinito', 'Coxinha infinita.', 1e19, 5, 'legendary'),

  // ── Antimatter Upgrades (3) ──
  buildingUpgrade('antimatter', 1, 'Contenção Magnética', 'Antimatéria estável.', 14e13, 2, 'rare'),
  buildingUpgrade('antimatter', 2, 'Reator de Fusão', 'Energia ilimitada para fritura.', 14e16, 3, 'epic'),
  buildingUpgrade('antimatter', 3, 'Aniquilação Controlada', 'Matéria + antimatéria = coxinha.', 14e19, 5, 'legendary'),

  // ── Prism Upgrades (3) ──
  buildingUpgrade('prism', 1, 'Lente Galáctica', 'Capta luz de outras galáxias.', 17e14, 2, 'rare'),
  buildingUpgrade('prism', 2, 'Fóton Coxinheiro', 'Cada fóton carrega sabor.', 17e17, 3, 'epic'),
  buildingUpgrade('prism', 3, 'Arco-Íris Infinito', 'Espectro total de coxinhas.', 17e20, 5, 'legendary'),

  // ── Quantum Upgrades (3) ──
  buildingUpgrade('quantum', 1, 'Superposição', 'Coxinha existe e não existe.', 21e15, 2, 'epic'),
  buildingUpgrade('quantum', 2, 'Emaranhamento', 'Coxinhas sincronizadas.', 21e18, 3, 'legendary'),
  buildingUpgrade('quantum', 3, 'Computação Suprema', 'Resolve o universo.', 21e21, 5, 'mythic'),

  // ── Cortex Upgrades (3) ──
  buildingUpgrade('cortex', 1, 'Deep Learning', 'IA especialista em sabor.', 26e16, 2, 'epic'),
  buildingUpgrade('cortex', 2, 'Consciência Artificial', 'A IA sonha com coxinhas.', 26e19, 3, 'legendary'),
  buildingUpgrade('cortex', 3, 'Singularidade Culinária', 'IA transcende a culinária humana.', 26e22, 5, 'mythic'),

  // ── Legendary Tier Building Upgrades (2 each) ──
  buildingUpgrade('temple', 1, 'Rituais Ancestrais', 'Bênçãos da coxinha sagrada.', 31e17, 2, 'epic'),
  buildingUpgrade('temple', 2, 'Relíquia Suprema', 'A coxinha original.', 31e20, 5, 'legendary'),
  buildingUpgrade('dimension', 1, 'Fenda Estável', 'Conexão permanente ao Coxinhoverso.', 41e18, 2, 'legendary'),
  buildingUpgrade('dimension', 2, 'Conquista Dimensional', 'Domina outras dimensões.', 41e21, 5, 'mythic'),
  buildingUpgrade('singularity', 1, 'Horizonte de Eventos', 'Nada escapa da coxinha.', 57e19, 3, 'legendary'),
  buildingUpgrade('singularity', 2, 'Devorador de Mundos', 'Consome planetas inteiros.', 57e22, 7, 'mythic'),
  buildingUpgrade('multiverse', 1, 'Convergência Multiversal', 'Todos os universos cooperam.', 78e20, 3, 'legendary'),
  buildingUpgrade('multiverse', 2, 'Existência Infinita', 'Coxinhas em todo lugar.', 78e24, 7, 'mythic'),
  buildingUpgrade('cosmic_oven', 1, 'Combustível Estelar', 'Usa estrelas como lenha.', 1e24, 3, 'legendary'),
  buildingUpgrade('cosmic_oven', 2, 'Supernova Controlada', 'Explosão deliciosa.', 1e28, 7, 'mythic'),

  // ── Mythic Tier Building Upgrades (1 each) ──
  buildingUpgrade('nebula_fryer', 1, 'Nuvem Molecular', 'Fritura em escala nebular.', 1.4e26, 5, 'mythic'),
  buildingUpgrade('galactic_chain', 1, 'Expansão Intergaláctica', 'Franquias além da Via Láctea.', 2e28, 5, 'mythic'),
  buildingUpgrade('universe_bakery', 1, 'Massa Universal', 'O universo é a massa.', 2.8e30, 5, 'mythic'),
  buildingUpgrade('reality_engine', 1, 'Reescrita da Realidade', 'Leis da física alteradas.', 4e32, 5, 'mythic'),
  buildingUpgrade('omniscience', 1, 'Sabedoria Total', 'Conhecimento coxinhístico absoluto.', 5.5e34, 10, 'mythic'),

  // ── Global Upgrades (10) ──
  { id: 'global_1', name: 'Economia de Escala', description: 'Tudo produz 10% a mais.', type: 'global', cost: 50000, multiplier: 1.1, purchased: false, tier: 'common' },
  { id: 'global_2', name: 'Otimização Logística', description: 'Produção +25%.', type: 'global', cost: 5e6, multiplier: 1.25, purchased: false, tier: 'common' },
  { id: 'global_3', name: 'Revolução Industrial', description: 'Produção +50%.', type: 'global', cost: 5e9, multiplier: 1.5, purchased: false, tier: 'rare' },
  { id: 'global_4', name: 'Era da Informação', description: 'Produção dobrada.', type: 'global', cost: 5e12, multiplier: 2, purchased: false, tier: 'rare' },
  { id: 'global_5', name: 'Singularidade Produtiva', description: 'Produção x3.', type: 'global', cost: 5e15, multiplier: 3, purchased: false, tier: 'epic' },
  { id: 'global_6', name: 'Transcendência', description: 'Produção x5.', type: 'global', cost: 5e18, multiplier: 5, purchased: false, tier: 'epic' },
  { id: 'global_7', name: 'Onipotência Fritosa', description: 'Produção x10.', type: 'global', cost: 5e21, multiplier: 10, purchased: false, tier: 'legendary' },
  { id: 'global_8', name: 'Big Crunch Coxinheiro', description: 'Produção x25.', type: 'global', cost: 5e25, multiplier: 25, purchased: false, tier: 'legendary' },
  { id: 'global_9', name: 'Omniverso Frito', description: 'Produção x100.', type: 'global', cost: 5e30, multiplier: 100, purchased: false, tier: 'mythic' },
  { id: 'global_10', name: 'A Grande Coxinha', description: 'TUDO x1000.', type: 'global', cost: 5e35, multiplier: 1000, purchased: false, tier: 'mythic' },

  // ── Golden Upgrades (5) ──
  { id: 'golden_1', name: 'Detector de Ouro', description: 'Coxinhas douradas 2x mais frequentes.', type: 'golden', cost: 77777, multiplier: 2, purchased: false, tier: 'common' },
  { id: 'golden_2', name: 'Ímã de Ouro', description: 'Coxinhas douradas 2x mais frequentes.', type: 'golden', cost: 7777777, multiplier: 2, purchased: false, tier: 'rare' },
  { id: 'golden_3', name: 'Midas Touch', description: 'Recompensas douradas x3.', type: 'golden', cost: 777e6, multiplier: 3, purchased: false, tier: 'epic' },
  { id: 'golden_4', name: 'Golden Shower de Coxinhas', description: 'Chuva dourada.', type: 'golden', cost: 777e9, multiplier: 5, purchased: false, tier: 'legendary' },
  { id: 'golden_5', name: 'Constelação Dourada', description: 'O céu é de ouro.', type: 'golden', cost: 777e12, multiplier: 10, purchased: false, tier: 'mythic' },

  // ── Synergy Upgrades (10) ──
  { id: 'syn_cg', name: 'Vovó Clicadora', description: 'Cursores e Vovós se fortalecem mutuamente.', type: 'synergy', cost: 30000, multiplier: 2, purchased: false, triggerBuildingId: 'cursor', synergyTargetId: 'grandma', tier: 'common' },
  { id: 'syn_sp', name: 'Feira Gourmet', description: 'Barracas e Pastelarias cooperam.', type: 'synergy', cost: 300000, multiplier: 2, purchased: false, triggerBuildingId: 'stand', synergyTargetId: 'pastry', tier: 'common' },
  { id: 'syn_ft', name: 'Frota Frita', description: 'Fritadeiras abastecem Food Trucks.', type: 'synergy', cost: 3e6, multiplier: 2, purchased: false, triggerBuildingId: 'fryer', synergyTargetId: 'truck', tier: 'rare' },
  { id: 'syn_rf', name: 'Imperador Gastronômico', description: 'Restaurantes e Fábricas em harmonia.', type: 'synergy', cost: 3e9, multiplier: 2, purchased: false, triggerBuildingId: 'restaurant', synergyTargetId: 'factory', tier: 'rare' },
  { id: 'syn_lp', name: 'Portal de Pesquisa', description: 'Laboratórios exploram portais dimensionais.', type: 'synergy', cost: 3e12, multiplier: 3, purchased: false, triggerBuildingId: 'lab', synergyTargetId: 'portal', tier: 'epic' },
  { id: 'syn_ta', name: 'Cronoantimatéria', description: 'Viagem no tempo + antimatéria.', type: 'synergy', cost: 3e15, multiplier: 3, purchased: false, triggerBuildingId: 'time_machine', synergyTargetId: 'antimatter', tier: 'epic' },
  { id: 'syn_pq', name: 'Prisma Neural', description: 'Luz cósmica alimenta redes neurais.', type: 'synergy', cost: 3e18, multiplier: 4, purchased: false, triggerBuildingId: 'prism', synergyTargetId: 'cortex', tier: 'legendary' },
  { id: 'syn_td', name: 'Templo Dimensional', description: 'Fé abre portais.', type: 'synergy', cost: 3e21, multiplier: 5, purchased: false, triggerBuildingId: 'temple', synergyTargetId: 'dimension', tier: 'legendary' },
  { id: 'syn_sm', name: 'Singularidade Multiversal', description: 'Buracos negros em todos os universos.', type: 'synergy', cost: 3e24, multiplier: 7, purchased: false, triggerBuildingId: 'singularity', synergyTargetId: 'multiverse', tier: 'mythic' },
  { id: 'syn_or', name: 'Realidade Onisciente', description: 'Motor da Realidade + Onisciência.', type: 'synergy', cost: 3e30, multiplier: 10, purchased: false, triggerBuildingId: 'reality_engine', synergyTargetId: 'omniscience', tier: 'mythic' },

  // ── Prestige Upgrades (5) ──
  { id: 'prestige_1', name: 'Fragmento Aprimorado', description: 'Fragmentos dão 10% mais bônus.', type: 'prestige', cost: 100, multiplier: 1.1, purchased: false, tier: 'rare', unlockCondition: { type: 'rebirth_count', value: 1 } },
  { id: 'prestige_2', name: 'Memória Muscular', description: 'Começa rebirths com 5% do CPS anterior.', type: 'prestige', cost: 500, multiplier: 1.5, purchased: false, tier: 'epic', unlockCondition: { type: 'rebirth_count', value: 3 } },
  { id: 'prestige_3', name: 'Óleo Eterno', description: 'Fragmentos x2 no próximo rebirth.', type: 'prestige', cost: 2000, multiplier: 2, purchased: false, tier: 'epic', unlockCondition: { type: 'rebirth_count', value: 5 } },
  { id: 'prestige_4', name: 'Ascensão Cósmica', description: 'Todos os bônus de prestige x3.', type: 'prestige', cost: 10000, multiplier: 3, purchased: false, tier: 'legendary', unlockCondition: { type: 'rebirth_count', value: 10 } },
  { id: 'prestige_5', name: 'Transcendência Absoluta', description: 'Bônus de prestige x10.', type: 'prestige', cost: 100000, multiplier: 10, purchased: false, tier: 'mythic', unlockCondition: { type: 'rebirth_count', value: 25 } },

  // ── Tier 6-8 Building Upgrades (Milestone Tiers) ──
  // Cursor
  buildingUpgrade('cursor', 6, 'Cursor Transcendente', 'Clica em dimensões inexploradas.', 1e15, 15, 'mythic'),
  buildingUpgrade('cursor', 7, 'Cursor Omnipresente II', 'Um cursor em cada átomo.', 1e20, 25, 'mythic'),
  buildingUpgrade('cursor', 8, 'Cursor Absoluto', 'O clique que criou o universo.', 1e26, 50, 'mythic'),
  // Grandma
  buildingUpgrade('grandma', 6, 'Vovó Dimensional', 'Cozinha em 11 dimensões.', 5e15, 15, 'mythic'),
  buildingUpgrade('grandma', 7, 'Vovó Cósmica', 'Receitas de antes do Big Bang.', 5e20, 25, 'mythic'),
  buildingUpgrade('grandma', 8, 'Vovó Onisciente', 'Sabe todas as receitas possíveis.', 5e26, 50, 'mythic'),
  // Stand
  buildingUpgrade('stand', 6, 'Barraquinha Multiversal', 'Franquia em todos os universos.', 55e15, 15, 'mythic'),
  buildingUpgrade('stand', 7, 'Barraquinha Temporal', 'Entrega antes de pedir.', 55e20, 25, 'mythic'),
  buildingUpgrade('stand', 8, 'Barraquinha Infinita', 'Ponto de venda eterno.', 55e26, 50, 'mythic'),
  // Pastry
  buildingUpgrade('pastry', 6, 'Pastelaria Quântica', 'Existe em superposição de sabores.', 6e18, 15, 'mythic'),
  buildingUpgrade('pastry', 7, 'Pastelaria Estelar', 'Receitas forjadas em estrelas.', 6e23, 25, 'mythic'),
  buildingUpgrade('pastry', 8, 'Pastelaria Absoluta', 'Perfeição gastronômica pura.', 6e28, 50, 'mythic'),
  // Fryer
  buildingUpgrade('fryer', 6, 'Fritadeira Plasmática', 'Fritura em plasma solar.', 65e18, 15, 'mythic'),
  buildingUpgrade('fryer', 7, 'Fritadeira de Quarks', 'Frita no nível subatômico.', 65e23, 25, 'mythic'),
  buildingUpgrade('fryer', 8, 'Fritadeira Primordial', 'A primeira fritadeira do cosmos.', 65e28, 50, 'mythic'),
  // Truck
  buildingUpgrade('truck', 6, 'Truck Galáctico', 'Entregas entre galáxias.', 700e17, 15, 'mythic'),
  buildingUpgrade('truck', 7, 'Truck Warp', 'Velocidade FTL de entregas.', 700e22, 25, 'mythic'),
  buildingUpgrade('truck', 8, 'Truck Onipresente', 'Entrega em todos os lugares ao mesmo tempo.', 700e27, 50, 'mythic'),
  // Restaurant
  buildingUpgrade('restaurant', 6, 'Restaurante Nebular', 'Fine dining em nebulosas.', 1e21, 15, 'mythic'),
  buildingUpgrade('restaurant', 7, 'Restaurante Cósmico', 'Menu com pratos de todo o universo.', 1e26, 25, 'mythic'),
  buildingUpgrade('restaurant', 8, 'Restaurante da Eternidade', 'Aberto para sempre. Literalmente.', 1e31, 50, 'mythic'),

  // ── Tier 5 for Factory/Lab/Portal ──
  buildingUpgrade('factory', 5, 'Fábrica Autorreplicante', 'Se reproduz sozinha.', 33e19, 10, 'legendary'),
  buildingUpgrade('lab', 5, 'Lab do Omniverso', 'Pesquisa em todos os universos possíveis.', 51e22, 10, 'legendary'),
  buildingUpgrade('portal', 5, 'Portal da Origem', 'Conecta ao ponto zero do cosmos.', 750e22, 10, 'legendary'),

  // ── Tier 4-5 for Time Machine through Cortex ──
  buildingUpgrade('time_machine', 4, 'Paradoxo Resolvido', 'Viaja no tempo sem consequências.', 1e23, 7, 'legendary'),
  buildingUpgrade('time_machine', 5, 'Cronodomínio Total', 'Controle absoluto do tempo.', 1e27, 15, 'mythic'),
  buildingUpgrade('antimatter', 4, 'Colisionador Supremo', 'Partículas colidem a c.', 14e23, 7, 'legendary'),
  buildingUpgrade('antimatter', 5, 'Dominação Antimaterial', 'Antimatéria obedece sua vontade.', 14e27, 15, 'mythic'),
  buildingUpgrade('prism', 4, 'Espectro Completo', 'Capta toda forma de radiação.', 17e24, 7, 'legendary'),
  buildingUpgrade('prism', 5, 'Prisma da Criação', 'Cria matéria a partir de luz.', 17e28, 15, 'mythic'),
  buildingUpgrade('quantum', 4, 'Supremacia Quântica', 'Computação além do possível.', 21e25, 7, 'legendary'),
  buildingUpgrade('quantum', 5, 'Consciência Quântica', 'O computador está vivo.', 21e29, 15, 'mythic'),
  buildingUpgrade('cortex', 4, 'Hiperconsciência', 'IA transcendeu a realidade.', 26e26, 7, 'legendary'),
  buildingUpgrade('cortex', 5, 'Mente Universal', 'Pensa com o universo inteiro.', 26e30, 15, 'mythic'),

  // ── Tier 3 for Legendary Buildings ──
  buildingUpgrade('temple', 3, 'Santuário Supremo', 'O templo mais sagrado.', 31e24, 10, 'mythic'),
  buildingUpgrade('dimension', 3, 'Conquista Interdimensional', 'Dominou 1000 dimensões.', 41e24, 10, 'mythic'),
  buildingUpgrade('singularity', 3, 'Singularidade Absoluta', 'Densidade infinita de coxinha.', 57e25, 10, 'mythic'),
  buildingUpgrade('multiverse', 3, 'Convergência Suprema', 'Todos os multiversos unidos.', 78e27, 10, 'mythic'),
  buildingUpgrade('cosmic_oven', 3, 'Colapso Estelar Controlado', 'Usa supernovas como fogão.', 1e31, 10, 'mythic'),

  // ── Tier 2 for Mythic Buildings ──
  buildingUpgrade('nebula_fryer', 2, 'Nebulosa Superaquecida', 'Temperatura de 1 trilhão de graus.', 1.4e30, 10, 'mythic'),
  buildingUpgrade('galactic_chain', 2, 'Expansão Universal', 'Franquias em cada estrela.', 2e32, 10, 'mythic'),
  buildingUpgrade('universe_bakery', 2, 'Massa Cósmica Pura', 'O tecido do espaço é a massa.', 2.8e34, 10, 'mythic'),
  buildingUpgrade('reality_engine', 2, 'Motor Absoluto', 'Reescreve qualquer lei física.', 4e36, 10, 'mythic'),
  buildingUpgrade('omniscience', 2, 'Onisciência Transcendente', 'Sabe o sabor antes de existir.', 5.5e38, 15, 'mythic'),

  // ── Additional Click Upgrades (11-20) ──
  { id: 'click_11', name: 'Explosão de Sabor', description: 'Cada clique detona ondas de sabor.', type: 'click', cost: 5e25, multiplier: 10000, purchased: false, tier: 'mythic', unlockCondition: { type: 'total_coxinhas', value: 5e24 } },
  { id: 'click_12', name: 'Impacto Gravitacional', description: 'Seu clique deforma o espaço-tempo.', type: 'click', cost: 5e28, multiplier: 25000, purchased: false, tier: 'mythic', unlockCondition: { type: 'total_coxinhas', value: 5e27 } },
  { id: 'click_13', name: 'Dedo de Neutron', description: 'Densidade de uma estrela de nêutrons.', type: 'click', cost: 5e31, multiplier: 75000, purchased: false, tier: 'mythic', unlockCondition: { type: 'total_coxinhas', value: 5e30 } },
  { id: 'click_14', name: 'Toque Primordial', description: 'O clique original, o primeiro de todos.', type: 'click', cost: 5e35, multiplier: 250000, purchased: false, tier: 'mythic', unlockCondition: { type: 'total_coxinhas', value: 5e34 } },
  { id: 'click_15', name: 'Omnidedo', description: 'Clica em todas as coisas que existem.', type: 'click', cost: 5e40, multiplier: 1000000, purchased: false, tier: 'mythic', unlockCondition: { type: 'total_coxinhas', value: 5e39 } },
  { id: 'click_16', name: 'Pulsar Manual', description: 'Cada clique é um pulso cósmico.', type: 'click', cost: 5e45, multiplier: 5000000, purchased: false, tier: 'mythic', unlockCondition: { type: 'total_coxinhas', value: 5e44 } },
  { id: 'click_17', name: 'Clique Infinito', description: 'Um clique que nunca termina.', type: 'click', cost: 5e50, multiplier: 25000000, purchased: false, tier: 'mythic', unlockCondition: { type: 'total_coxinhas', value: 5e49 } },
  { id: 'click_18', name: 'Ruptura do Vazio', description: 'Rasga o nada com seus dedos.', type: 'click', cost: 5e56, multiplier: 100000000, purchased: false, tier: 'mythic', unlockCondition: { type: 'total_coxinhas', value: 5e55 } },
  { id: 'click_19', name: 'Gênese do Clique', description: 'Cada clique cria um universo.', type: 'click', cost: 5e63, multiplier: 1e9, purchased: false, tier: 'mythic', unlockCondition: { type: 'total_coxinhas', value: 5e62 } },
  { id: 'click_20', name: 'DEUS DO CLIQUE', description: 'O clique final. O absoluto. O definitivo.', type: 'click', cost: 5e70, multiplier: 1e12, purchased: false, tier: 'mythic', unlockCondition: { type: 'total_coxinhas', value: 5e69 } },

  // ── Additional Global Upgrades (11-20) ──
  { id: 'global_11', name: 'Harmonia Cósmica', description: 'Tudo vibra em perfeita sincronia. x50.', type: 'global', cost: 5e38, multiplier: 50, purchased: false, tier: 'mythic', unlockCondition: { type: 'total_coxinhas', value: 5e37 } },
  { id: 'global_12', name: 'Confluência Estelar', description: 'Estrelas alimentam a produção. x100.', type: 'global', cost: 5e42, multiplier: 100, purchased: false, tier: 'mythic', unlockCondition: { type: 'total_coxinhas', value: 5e41 } },
  { id: 'global_13', name: 'Ressonância Universal', description: 'O universo inteiro ressoa coxinhas. x500.', type: 'global', cost: 5e47, multiplier: 500, purchased: false, tier: 'mythic', unlockCondition: { type: 'total_coxinhas', value: 5e46 } },
  { id: 'global_14', name: 'Singularidade Produtiva II', description: 'A produção se torna infinita... quase. x2500.', type: 'global', cost: 5e53, multiplier: 2500, purchased: false, tier: 'mythic', unlockCondition: { type: 'total_coxinhas', value: 5e52 } },
  { id: 'global_15', name: 'Constante Coxinhística', description: 'Uma força fundamental: a Coxinha. x10000.', type: 'global', cost: 5e60, multiplier: 10000, purchased: false, tier: 'mythic', unlockCondition: { type: 'total_coxinhas', value: 5e59 } },
  { id: 'global_16', name: 'Lei da Termodinâmica Fritosa', description: 'Energia sempre vira coxinha. x50000.', type: 'global', cost: 5e67, multiplier: 50000, purchased: false, tier: 'mythic', unlockCondition: { type: 'total_coxinhas', value: 5e66 } },
  { id: 'global_17', name: 'Campo Unificado de Sabor', description: 'Todas as forças convergem em sabor. x250000.', type: 'global', cost: 5e75, multiplier: 250000, purchased: false, tier: 'mythic', unlockCondition: { type: 'total_coxinhas', value: 5e74 } },
  { id: 'global_18', name: 'Entropia Coxinhística', description: 'O destino final: tudo vira coxinha. x1000000.', type: 'global', cost: 5e83, multiplier: 1e6, purchased: false, tier: 'mythic', unlockCondition: { type: 'total_coxinhas', value: 5e82 } },
  { id: 'global_19', name: 'Big Crunch Fritoso', description: 'O universo colapsa em uma coxinha. x1e9.', type: 'global', cost: 5e92, multiplier: 1e9, purchased: false, tier: 'mythic', unlockCondition: { type: 'total_coxinhas', value: 5e91 } },
  { id: 'global_20', name: 'TUDO É COXINHA', description: 'Não existe mais nada além de coxinha. x1e12.', type: 'global', cost: 5e100, multiplier: 1e12, purchased: false, tier: 'mythic', unlockCondition: { type: 'total_coxinhas', value: 5e99 } },

  // ── Additional Golden Upgrades (6-15) ──
  { id: 'golden_6', name: 'Aura Dourada', description: 'Irradia ouro ao seu redor. x5.', type: 'golden', cost: 777e15, multiplier: 5, purchased: false, tier: 'mythic', unlockCondition: { type: 'total_coxinhas', value: 777e14 } },
  { id: 'golden_7', name: 'Alquimia Dourada', description: 'Transforma ar em ouro. x10.', type: 'golden', cost: 777e20, multiplier: 10, purchased: false, tier: 'mythic', unlockCondition: { type: 'total_coxinhas', value: 777e19 } },
  { id: 'golden_8', name: 'Sol Dourado', description: 'O sol brilha em ouro. x25.', type: 'golden', cost: 777e26, multiplier: 25, purchased: false, tier: 'mythic', unlockCondition: { type: 'total_coxinhas', value: 777e25 } },
  { id: 'golden_9', name: 'Universo Dourado', description: 'O cosmos é de ouro puro. x50.', type: 'golden', cost: 777e33, multiplier: 50, purchased: false, tier: 'mythic', unlockCondition: { type: 'total_coxinhas', value: 777e32 } },
  { id: 'golden_10', name: 'Midas Supremo', description: 'TUDO que tocar vira ouro. x100.', type: 'golden', cost: 777e40, multiplier: 100, purchased: false, tier: 'mythic', unlockCondition: { type: 'total_coxinhas', value: 777e39 } },

  // ── Additional Synergy Upgrades (11-25) ──
  { id: 'syn_cf', name: 'Cursor-Fritadeira', description: 'Cliques automáticos na fritadeira.', type: 'synergy', cost: 5e14, multiplier: 3, purchased: false, triggerBuildingId: 'cursor', synergyTargetId: 'fryer', tier: 'epic', unlockCondition: { type: 'total_coxinhas', value: 5e13 } },
  { id: 'syn_gt', name: 'Vovó no Truck', description: 'Vovó gerencia o food truck.', type: 'synergy', cost: 5e16, multiplier: 3, purchased: false, triggerBuildingId: 'grandma', synergyTargetId: 'truck', tier: 'epic', unlockCondition: { type: 'total_coxinhas', value: 5e15 } },
  { id: 'syn_sr', name: 'Barraquinha Premium', description: 'Barracas servem pratos de restaurante.', type: 'synergy', cost: 5e18, multiplier: 4, purchased: false, triggerBuildingId: 'stand', synergyTargetId: 'restaurant', tier: 'legendary', unlockCondition: { type: 'total_coxinhas', value: 5e17 } },
  { id: 'syn_pl', name: 'Portal Laboratorial', description: 'Labs pesquisam através de portais.', type: 'synergy', cost: 5e20, multiplier: 4, purchased: false, triggerBuildingId: 'portal', synergyTargetId: 'lab', tier: 'legendary', unlockCondition: { type: 'total_coxinhas', value: 5e19 } },
  { id: 'syn_tq', name: 'Computação Temporal', description: 'Computadores quânticos do futuro.', type: 'synergy', cost: 5e22, multiplier: 5, purchased: false, triggerBuildingId: 'time_machine', synergyTargetId: 'quantum', tier: 'legendary', unlockCondition: { type: 'total_coxinhas', value: 5e21 } },
  { id: 'syn_ac', name: 'Anti-Cérebro', description: 'Antimatéria alimenta redes neurais.', type: 'synergy', cost: 5e24, multiplier: 5, purchased: false, triggerBuildingId: 'antimatter', synergyTargetId: 'cortex', tier: 'legendary', unlockCondition: { type: 'total_coxinhas', value: 5e23 } },
  { id: 'syn_pt', name: 'Prisma Sagrado', description: 'Luz divina do templo sagrado.', type: 'synergy', cost: 5e26, multiplier: 6, purchased: false, triggerBuildingId: 'prism', synergyTargetId: 'temple', tier: 'mythic', unlockCondition: { type: 'total_coxinhas', value: 5e25 } },
  { id: 'syn_ds', name: 'Dimensão Singular', description: 'Fenda dentro de singularidade.', type: 'synergy', cost: 5e28, multiplier: 7, purchased: false, triggerBuildingId: 'dimension', synergyTargetId: 'singularity', tier: 'mythic', unlockCondition: { type: 'total_coxinhas', value: 5e27 } },
  { id: 'syn_mc', name: 'Multiverso+Forno Cósmico', description: 'Fornos em cada universo.', type: 'synergy', cost: 5e30, multiplier: 8, purchased: false, triggerBuildingId: 'multiverse', synergyTargetId: 'cosmic_oven', tier: 'mythic', unlockCondition: { type: 'total_coxinhas', value: 5e29 } },
  { id: 'syn_ng', name: 'Nebulosa Galáctica', description: 'Nebula + Rede Galáctica.', type: 'synergy', cost: 5e32, multiplier: 10, purchased: false, triggerBuildingId: 'nebula_fryer', synergyTargetId: 'galactic_chain', tier: 'mythic', unlockCondition: { type: 'total_coxinhas', value: 5e31 } },
  { id: 'syn_uo', name: 'Padaria Onisciente', description: 'Padaria + Onisciência.', type: 'synergy', cost: 5e34, multiplier: 12, purchased: false, triggerBuildingId: 'universe_bakery', synergyTargetId: 'omniscience', tier: 'mythic', unlockCondition: { type: 'total_coxinhas', value: 5e33 } },
  { id: 'syn_re', name: 'Realidade + Motor', description: 'A realidade é reescrita pelo motor.', type: 'synergy', cost: 5e36, multiplier: 15, purchased: false, triggerBuildingId: 'reality_engine', synergyTargetId: 'omniscience', tier: 'mythic', unlockCondition: { type: 'total_coxinhas', value: 5e35 } },
  { id: 'syn_all_basic', name: 'Sinfonia Básica', description: 'Todos os básicos cooperam. x5 cada.', type: 'synergy', cost: 5e20, multiplier: 5, purchased: false, triggerBuildingId: 'cursor', synergyTargetId: 'fryer', tier: 'legendary', unlockCondition: { type: 'total_coxinhas', value: 5e19 } },
  { id: 'syn_all_adv', name: 'Orquestra Avançada', description: 'Avançados em perfeita harmonia. x7 cada.', type: 'synergy', cost: 5e25, multiplier: 7, purchased: false, triggerBuildingId: 'truck', synergyTargetId: 'portal', tier: 'legendary', unlockCondition: { type: 'total_coxinhas', value: 5e24 } },
  { id: 'syn_all_epic', name: 'Concerto Épico', description: 'Épicos em sinergia total. x10 cada.', type: 'synergy', cost: 5e30, multiplier: 10, purchased: false, triggerBuildingId: 'time_machine', synergyTargetId: 'cortex', tier: 'mythic', unlockCondition: { type: 'total_coxinhas', value: 5e29 } },

  // ── Additional Prestige Upgrades (6-15) ──
  { id: 'prestige_6', name: 'Eco do Passado', description: 'Memórias de rebirths passados x2.', type: 'prestige', cost: 250000, multiplier: 2, purchased: false, tier: 'legendary', unlockCondition: { type: 'rebirth_count', value: 7 } },
  { id: 'prestige_7', name: 'Fragmento Concentrado', description: 'Fragmentos 3x mais potentes.', type: 'prestige', cost: 1e6, multiplier: 3, purchased: false, tier: 'legendary', unlockCondition: { type: 'rebirth_count', value: 12 } },
  { id: 'prestige_8', name: 'Ciclo Acelerado', description: 'Produção inicial x5 após rebirth.', type: 'prestige', cost: 5e6, multiplier: 5, purchased: false, tier: 'legendary', unlockCondition: { type: 'rebirth_count', value: 15 } },
  { id: 'prestige_9', name: 'Memória Eterna', description: 'Herança coxinhística x10.', type: 'prestige', cost: 2.5e7, multiplier: 10, purchased: false, tier: 'mythic', unlockCondition: { type: 'rebirth_count', value: 20 } },
  { id: 'prestige_10', name: 'Ressonância de Prestígio', description: 'Cada rebirth ecoa x25.', type: 'prestige', cost: 1e8, multiplier: 25, purchased: false, tier: 'mythic', unlockCondition: { type: 'rebirth_count', value: 30 } },
  { id: 'prestige_11', name: 'Convergência Temporal', description: 'Todos os rebirths convergem. x50.', type: 'prestige', cost: 5e8, multiplier: 50, purchased: false, tier: 'mythic', unlockCondition: { type: 'rebirth_count', value: 40 } },
  { id: 'prestige_12', name: 'Essência Primordial', description: 'A essência original da coxinha. x100.', type: 'prestige', cost: 5e9, multiplier: 100, purchased: false, tier: 'mythic', unlockCondition: { type: 'rebirth_count', value: 50 } },
  { id: 'prestige_13', name: 'Fonte Inesgotável', description: 'Fragmentos fluem eternamente. x250.', type: 'prestige', cost: 5e10, multiplier: 250, purchased: false, tier: 'mythic', unlockCondition: { type: 'rebirth_count', value: 75 } },
  { id: 'prestige_14', name: 'Singularidade Prestige', description: 'O prestige se torna infinito. x1000.', type: 'prestige', cost: 5e11, multiplier: 1000, purchased: false, tier: 'mythic', unlockCondition: { type: 'rebirth_count', value: 100 } },
  { id: 'prestige_15', name: 'ASCENSÃO SUPREMA', description: 'O auge absoluto do prestígio. x10000.', type: 'prestige', cost: 1e13, multiplier: 10000, purchased: false, tier: 'mythic', unlockCondition: { type: 'rebirth_count', value: 150 } },

  // ── Milestone Upgrades (unlock at building counts) ──
  { id: 'mile_cursor_200', name: 'Cursor Army', description: '200 cursores! x3 global.', type: 'global', cost: 1e20, multiplier: 3, purchased: false, tier: 'epic', unlockCondition: { type: 'building_count', value: 200, targetId: 'cursor' } },
  { id: 'mile_cursor_500', name: 'Cursor Legion', description: '500 cursores! x5 global.', type: 'global', cost: 1e28, multiplier: 5, purchased: false, tier: 'legendary', unlockCondition: { type: 'building_count', value: 500, targetId: 'cursor' } },
  { id: 'mile_total_100', name: 'Centenário', description: '100+ edifícios totais. x2 produção global.', type: 'global', cost: 1e12, multiplier: 2, purchased: false, tier: 'rare', unlockCondition: { type: 'total_buildings', value: 100 } },
  { id: 'mile_total_500', name: 'Meio Milhar', description: '500+ edifícios totais. x3 produção global.', type: 'global', cost: 1e18, multiplier: 3, purchased: false, tier: 'epic', unlockCondition: { type: 'total_buildings', value: 500 } },
  { id: 'mile_total_1000', name: 'Milésimo', description: '1000+ edifícios totais. x5 global.', type: 'global', cost: 1e24, multiplier: 5, purchased: false, tier: 'legendary', unlockCondition: { type: 'total_buildings', value: 1000 } },
  { id: 'mile_total_5000', name: 'Megalópole', description: '5000+ edifícios totais. x20 global!', type: 'global', cost: 1e36, multiplier: 20, purchased: false, tier: 'mythic', unlockCondition: { type: 'total_buildings', value: 5000 } },

  // ── Speed Upgrades (unlock with CPS milestones) ──
  { id: 'speed_1', name: 'Velocidade I', description: 'Produção acima de 1M/s. x2 CPS.', type: 'global', cost: 5e8, multiplier: 2, purchased: false, tier: 'rare', unlockCondition: { type: 'cps_milestone', value: 1e6 } },
  { id: 'speed_2', name: 'Velocidade II', description: 'Produção acima de 1B/s. x3 CPS.', type: 'global', cost: 5e12, multiplier: 3, purchased: false, tier: 'epic', unlockCondition: { type: 'cps_milestone', value: 1e9 } },
  { id: 'speed_3', name: 'Velocidade III', description: 'Produção acima de 1T/s. x5 CPS.', type: 'global', cost: 5e16, multiplier: 5, purchased: false, tier: 'legendary', unlockCondition: { type: 'cps_milestone', value: 1e12 } },
  { id: 'speed_4', name: 'Hiperspeed', description: 'Produção acima de 1Qa/s. x10 CPS.', type: 'global', cost: 5e22, multiplier: 10, purchased: false, tier: 'mythic', unlockCondition: { type: 'cps_milestone', value: 1e15 } },
  { id: 'speed_5', name: 'Velocidade da Luz', description: 'Produção acima de 1Qi/s. x25 CPS!', type: 'global', cost: 5e28, multiplier: 25, purchased: false, tier: 'mythic', unlockCondition: { type: 'cps_milestone', value: 1e18 } },

  // ── Click Combos ──
  { id: 'combo_1', name: 'Combo Iniciante', description: 'Clicks em combo geram +50% mais.', type: 'click', cost: 5e6, multiplier: 1.5, purchased: false, tier: 'rare', unlockCondition: { type: 'total_clicks', value: 1000 } },
  { id: 'combo_2', name: 'Combo Master', description: 'Clicks em combo geram +200% mais.', type: 'click', cost: 5e10, multiplier: 3, purchased: false, tier: 'epic', unlockCondition: { type: 'total_clicks', value: 10000 } },
  { id: 'combo_3', name: 'Combo Legend', description: 'Clicks em combo geram +500% mais!', type: 'click', cost: 5e15, multiplier: 6, purchased: false, tier: 'legendary', unlockCondition: { type: 'total_clicks', value: 100000 } },

  // ── Cross-tier Synergies ──
  { id: 'syn_click_prod', name: 'Clique Produtivo', description: 'CPS aumenta poder de clique em x3.', type: 'click', cost: 5e14, multiplier: 3, purchased: false, tier: 'epic', unlockCondition: { type: 'total_coxinhas', value: 1e14 } },
  { id: 'syn_golden_global', name: 'Toque Dourado Global', description: 'Bônus dourado afeta produção. x5 global.', type: 'global', cost: 1e18, multiplier: 5, purchased: false, tier: 'legendary', unlockCondition: { type: 'golden_clicked', value: 50 } },
  { id: 'syn_rebirth_click', name: 'Eco do Renascimento', description: 'Cada rebirth dá +x2 ao clique.', type: 'click', cost: 1e20, multiplier: 2, purchased: false, tier: 'legendary', unlockCondition: { type: 'rebirth_count', value: 3 } },
];

// ── ACHIEVEMENTS (80+) ───────────────────────────────────────────────────────

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  // ── Clicking Achievements (10) ──
  { id: 'click_10', name: 'Primeiro Toque', description: 'Clique 10 vezes.', icon: '👆', category: 'clicking', tier: 'bronze', unlocked: false, reward: { type: 'click_mult', value: 1.01 }, condition: { type: 'total_clicks', value: 10 } },
  { id: 'click_100', name: 'Dedo Ágil', description: 'Clique 100 vezes.', icon: '✌️', category: 'clicking', tier: 'bronze', unlocked: false, reward: { type: 'click_mult', value: 1.02 }, condition: { type: 'total_clicks', value: 100 } },
  { id: 'click_1k', name: 'Maratonista', description: 'Clique 1.000 vezes.', icon: '🖱️', category: 'clicking', tier: 'silver', unlocked: false, reward: { type: 'click_mult', value: 1.05 }, condition: { type: 'total_clicks', value: 1000 } },
  { id: 'click_10k', name: 'Veterano do Clique', description: 'Clique 10.000 vezes.', icon: '💪', category: 'clicking', tier: 'silver', unlocked: false, reward: { type: 'click_mult', value: 1.1 }, condition: { type: 'total_clicks', value: 10000 } },
  { id: 'click_50k', name: 'Tendinite Premium', description: 'Clique 50.000 vezes.', icon: '🔥', category: 'clicking', tier: 'gold', unlocked: false, reward: { type: 'click_mult', value: 1.2 }, condition: { type: 'total_clicks', value: 50000 } },
  { id: 'click_100k', name: 'Máquina Humana', description: 'Clique 100.000 vezes.', icon: '🤖', category: 'clicking', tier: 'gold', unlocked: false, reward: { type: 'click_mult', value: 1.3 }, condition: { type: 'total_clicks', value: 100000 } },
  { id: 'click_500k', name: 'Lenda do Mouse', description: 'Clique 500.000 vezes.', icon: '👑', category: 'clicking', tier: 'diamond', unlocked: false, reward: { type: 'click_mult', value: 1.5 }, condition: { type: 'total_clicks', value: 500000 } },
  { id: 'click_1m', name: 'O Clicador Supremo', description: 'Clique 1.000.000 de vezes.', icon: '⭐', category: 'clicking', tier: 'diamond', unlocked: false, reward: { type: 'click_mult', value: 2 }, condition: { type: 'total_clicks', value: 1000000 } },
  { id: 'combo_50', name: 'Combo Fenomenal', description: 'Alcance combo 50.', icon: '🔥', category: 'clicking', tier: 'silver', unlocked: false, reward: { type: 'click_mult', value: 1.05 }, condition: { type: 'combo', value: 50 } },
  { id: 'combo_250', name: 'Combo Insano', description: 'Alcance combo 250.', icon: '💥', category: 'clicking', tier: 'gold', unlocked: false, reward: { type: 'click_mult', value: 1.2 }, condition: { type: 'combo', value: 250 } },

  // ── Production Achievements (12) ──
  { id: 'prod_100', name: 'Primeiras Coxinhas', description: 'Produza 100 coxinhas no total.', icon: '🥟', category: 'production', tier: 'bronze', unlocked: false, reward: { type: 'cps_mult', value: 1.01 }, condition: { type: 'total_coxinhas', value: 100 } },
  { id: 'prod_10k', name: 'Cozinheiro Amador', description: 'Produza 10.000 coxinhas.', icon: '👨‍🍳', category: 'production', tier: 'bronze', unlocked: false, reward: { type: 'cps_mult', value: 1.02 }, condition: { type: 'total_coxinhas', value: 10000 } },
  { id: 'prod_1m', name: 'Mestre Coxinheiro', description: 'Produza 1 milhão de coxinhas.', icon: '🏆', category: 'production', tier: 'silver', unlocked: false, reward: { type: 'cps_mult', value: 1.05 }, condition: { type: 'total_coxinhas', value: 1e6 } },
  { id: 'prod_1b', name: 'Bilionário da Coxinha', description: 'Produza 1 bilhão de coxinhas.', icon: '💰', category: 'production', tier: 'silver', unlocked: false, reward: { type: 'cps_mult', value: 1.1 }, condition: { type: 'total_coxinhas', value: 1e9 } },
  { id: 'prod_1t', name: 'Trilionário Fritoso', description: 'Produza 1 trilhão de coxinhas.', icon: '🌟', category: 'production', tier: 'gold', unlocked: false, reward: { type: 'cps_mult', value: 1.15 }, condition: { type: 'total_coxinhas', value: 1e12 } },
  { id: 'prod_1qa', name: 'Quadrilionário', description: 'Produza 1 quadrilhão.', icon: '💎', category: 'production', tier: 'gold', unlocked: false, reward: { type: 'cps_mult', value: 1.2 }, condition: { type: 'total_coxinhas', value: 1e15 } },
  { id: 'prod_1qi', name: 'Quintilionário', description: 'Produza 1 quintilhão.', icon: '🔮', category: 'production', tier: 'diamond', unlocked: false, reward: { type: 'cps_mult', value: 1.3 }, condition: { type: 'total_coxinhas', value: 1e18 } },
  { id: 'prod_1sx', name: 'Sextilionário', description: '1 sextilhão de coxinhas.', icon: '🌠', category: 'production', tier: 'diamond', unlocked: false, reward: { type: 'cps_mult', value: 1.5 }, condition: { type: 'total_coxinhas', value: 1e21 } },
  { id: 'prod_1sp', name: 'Septilionário', description: '1 septilhão de coxinhas.', icon: '🌌', category: 'production', tier: 'cosmic', unlocked: false, reward: { type: 'cps_mult', value: 2 }, condition: { type: 'total_coxinhas', value: 1e24 } },
  { id: 'cps_100', name: 'Produtivo', description: 'Alcance 100 CPS.', icon: '⚡', category: 'production', tier: 'bronze', unlocked: false, reward: { type: 'cps_mult', value: 1.02 }, condition: { type: 'cps', value: 100 } },
  { id: 'cps_1m', name: 'Mega Produtor', description: 'Alcance 1M CPS.', icon: '🚀', category: 'production', tier: 'silver', unlocked: false, reward: { type: 'cps_mult', value: 1.05 }, condition: { type: 'cps', value: 1e6 } },
  { id: 'cps_1b', name: 'Ultra Produtor', description: 'Alcance 1B CPS.', icon: '💫', category: 'production', tier: 'gold', unlocked: false, reward: { type: 'cps_mult', value: 1.1 }, condition: { type: 'cps', value: 1e9 } },

  // ── Building Achievements (20) ──
  { id: 'build_cursor_1', name: 'Auto-Clique', description: 'Tenha 1 cursor.', icon: '👆', category: 'buildings', tier: 'bronze', unlocked: false, reward: { type: 'cps_mult', value: 1.01 }, condition: { type: 'building_count', targetId: 'cursor', value: 1 } },
  { id: 'build_cursor_50', name: 'Exército de Cursores', description: 'Tenha 50 cursores.', icon: '👆', category: 'buildings', tier: 'silver', unlocked: false, reward: { type: 'cps_mult', value: 1.02 }, condition: { type: 'building_count', targetId: 'cursor', value: 50 } },
  { id: 'build_cursor_200', name: 'Legião Clicadora', description: 'Tenha 200 cursores.', icon: '👆', category: 'buildings', tier: 'gold', unlocked: false, reward: { type: 'cps_mult', value: 1.05 }, condition: { type: 'building_count', targetId: 'cursor', value: 200 } },
  { id: 'build_grandma_1', name: 'Primeira Vovó', description: 'Contrate sua primeira vovó.', icon: '👵', category: 'buildings', tier: 'bronze', unlocked: false, reward: { type: 'cps_mult', value: 1.01 }, condition: { type: 'building_count', targetId: 'grandma', value: 1 } },
  { id: 'build_grandma_50', name: 'Asilo Produtivo', description: 'Tenha 50 vovós.', icon: '👵', category: 'buildings', tier: 'silver', unlocked: false, reward: { type: 'cps_mult', value: 1.02 }, condition: { type: 'building_count', targetId: 'grandma', value: 50 } },
  { id: 'build_factory_1', name: 'Industrialização', description: 'Construa sua primeira fábrica.', icon: '🏭', category: 'buildings', tier: 'bronze', unlocked: false, reward: { type: 'cps_mult', value: 1.01 }, condition: { type: 'building_count', targetId: 'factory', value: 1 } },
  { id: 'build_factory_25', name: 'Império Fabril', description: 'Tenha 25 fábricas.', icon: '🏭', category: 'buildings', tier: 'gold', unlocked: false, reward: { type: 'cps_mult', value: 1.05 }, condition: { type: 'building_count', targetId: 'factory', value: 25 } },
  { id: 'build_portal_1', name: 'Primordial', description: 'Abra seu primeiro portal.', icon: '🌀', category: 'buildings', tier: 'silver', unlocked: false, reward: { type: 'cps_mult', value: 1.02 }, condition: { type: 'building_count', targetId: 'portal', value: 1 } },
  { id: 'build_portal_25', name: 'Mestre dos Portais', description: 'Tenha 25 portais.', icon: '🌀', category: 'buildings', tier: 'gold', unlocked: false, reward: { type: 'cps_mult', value: 1.05 }, condition: { type: 'building_count', targetId: 'portal', value: 25 } },
  { id: 'build_quantum_1', name: 'Quântico', description: 'Construa seu primeiro computador quântico.', icon: '💻', category: 'buildings', tier: 'gold', unlocked: false, reward: { type: 'cps_mult', value: 1.03 }, condition: { type: 'building_count', targetId: 'quantum', value: 1 } },
  { id: 'build_temple_1', name: 'Devoto', description: 'Erga o Templo da Coxinha.', icon: '⛩️', category: 'buildings', tier: 'gold', unlocked: false, reward: { type: 'cps_mult', value: 1.05 }, condition: { type: 'building_count', targetId: 'temple', value: 1 } },
  { id: 'build_singularity_1', name: 'Ponto de Não Retorno', description: 'Crie uma singularidade.', icon: '🕳️', category: 'buildings', tier: 'diamond', unlocked: false, reward: { type: 'cps_mult', value: 1.1 }, condition: { type: 'building_count', targetId: 'singularity', value: 1 } },
  { id: 'build_omniscience_1', name: 'Ascensão Final', description: 'Alcance a Onisciência.', icon: '👁️', category: 'buildings', tier: 'cosmic', unlocked: false, reward: { type: 'cps_mult', value: 1.5 }, condition: { type: 'building_count', targetId: 'omniscience', value: 1 } },
  { id: 'build_total_10', name: 'Pequeno Negócio', description: 'Possua 10 edifícios no total.', icon: '🏠', category: 'buildings', tier: 'bronze', unlocked: false, reward: { type: 'cps_mult', value: 1.01 }, condition: { type: 'buildings_owned_total', value: 10 } },
  { id: 'build_total_50', name: 'Conglomerado', description: 'Possua 50 edifícios no total.', icon: '🏙️', category: 'buildings', tier: 'silver', unlocked: false, reward: { type: 'cps_mult', value: 1.03 }, condition: { type: 'buildings_owned_total', value: 50 } },
  { id: 'build_total_100', name: 'Megacorporação', description: 'Possua 100 edifícios.', icon: '🌆', category: 'buildings', tier: 'silver', unlocked: false, reward: { type: 'cps_mult', value: 1.05 }, condition: { type: 'buildings_owned_total', value: 100 } },
  { id: 'build_total_250', name: 'Império Coxinheiro', description: 'Possua 250 edifícios.', icon: '👑', category: 'buildings', tier: 'gold', unlocked: false, reward: { type: 'cps_mult', value: 1.1 }, condition: { type: 'buildings_owned_total', value: 250 } },
  { id: 'build_total_500', name: 'Civilization de Coxinha', description: 'Possua 500 edifícios.', icon: '🌍', category: 'buildings', tier: 'diamond', unlocked: false, reward: { type: 'cps_mult', value: 1.2 }, condition: { type: 'buildings_owned_total', value: 500 } },
  { id: 'build_total_1000', name: 'Galáxia de Coxinhas', description: 'Possua 1000 edifícios.', icon: '🌌', category: 'buildings', tier: 'cosmic', unlocked: false, reward: { type: 'cps_mult', value: 1.5 }, condition: { type: 'buildings_owned_total', value: 1000 } },
  { id: 'build_all', name: 'Colecionador Completo', description: 'Tenha pelo menos 1 de cada edifício.', icon: '🎯', category: 'buildings', tier: 'diamond', unlocked: false, reward: { type: 'cps_mult', value: 1.25 }, condition: { type: 'all_buildings_owned', value: 1 }, hidden: true },

  // ── Upgrade Achievements (5) ──
  { id: 'upgrade_10', name: 'Tech Iniciante', description: 'Compre 10 upgrades.', icon: '✨', category: 'upgrades', tier: 'bronze', unlocked: false, reward: { type: 'cps_mult', value: 1.02 }, condition: { type: 'upgrade_count', value: 10 } },
  { id: 'upgrade_25', name: 'Pesquisador', description: 'Compre 25 upgrades.', icon: '🔬', category: 'upgrades', tier: 'silver', unlocked: false, reward: { type: 'cps_mult', value: 1.05 }, condition: { type: 'upgrade_count', value: 25 } },
  { id: 'upgrade_50', name: 'Cientista Chefe', description: 'Compre 50 upgrades.', icon: '🧪', category: 'upgrades', tier: 'gold', unlocked: false, reward: { type: 'cps_mult', value: 1.1 }, condition: { type: 'upgrade_count', value: 50 } },
  { id: 'upgrade_100', name: 'Gênio Supremo', description: 'Compre 100 upgrades.', icon: '🧠', category: 'upgrades', tier: 'diamond', unlocked: false, reward: { type: 'cps_mult', value: 1.2 }, condition: { type: 'upgrade_count', value: 100 } },
  { id: 'upgrade_150', name: 'Onisciente', description: 'Compre todos os upgrades (150+).', icon: '👁️', category: 'upgrades', tier: 'cosmic', unlocked: false, reward: { type: 'cps_mult', value: 2.0 }, condition: { type: 'upgrade_count', value: 150 } },

  // ── Prestige Achievements (8) ──
  { id: 'rebirth_1', name: 'Renascido', description: 'Faça seu primeiro rebirth.', icon: '🔥', category: 'prestige', tier: 'silver', unlocked: false, reward: { type: 'fragment_bonus', value: 1.05 }, condition: { type: 'rebirth_count', value: 1 } },
  { id: 'rebirth_5', name: 'Fênix', description: 'Faça 5 rebirths.', icon: '🐦‍🔥', category: 'prestige', tier: 'gold', unlocked: false, reward: { type: 'fragment_bonus', value: 1.1 }, condition: { type: 'rebirth_count', value: 5 } },
  { id: 'rebirth_10', name: 'Eterno Retorno', description: 'Faça 10 rebirths.', icon: '♾️', category: 'prestige', tier: 'gold', unlocked: false, reward: { type: 'fragment_bonus', value: 1.2 }, condition: { type: 'rebirth_count', value: 10 } },
  { id: 'rebirth_25', name: 'Ciclo Infinito', description: 'Faça 25 rebirths.', icon: '🌀', category: 'prestige', tier: 'diamond', unlocked: false, reward: { type: 'fragment_bonus', value: 1.5 }, condition: { type: 'rebirth_count', value: 25 } },
  { id: 'rebirth_50', name: 'Transcendência', description: 'Faça 50 rebirths.', icon: '✨', category: 'prestige', tier: 'cosmic', unlocked: false, reward: { type: 'fragment_bonus', value: 2.0 }, condition: { type: 'rebirth_count', value: 50 } },
  { id: 'golden_10', name: 'Caçador de Ouro', description: 'Clique em 10 coxinhas douradas.', icon: '🥇', category: 'prestige', tier: 'bronze', unlocked: false, reward: { type: 'golden_rate', value: 1.1 }, condition: { type: 'golden_clicked', value: 10 } },
  { id: 'golden_50', name: 'Rei Midas', description: 'Clique em 50 coxinhas douradas.', icon: '👑', category: 'prestige', tier: 'silver', unlocked: false, reward: { type: 'golden_rate', value: 1.25 }, condition: { type: 'golden_clicked', value: 50 } },
  { id: 'golden_100', name: 'Toque Dourado', description: 'Clique em 100 coxinhas douradas.', icon: '🌟', category: 'prestige', tier: 'gold', unlocked: false, reward: { type: 'golden_rate', value: 1.5 }, condition: { type: 'golden_clicked', value: 100 } },

  // ── Special / Secret Achievements (10) ──
  { id: 'speed_demon', name: 'Speed Demon', description: 'Alcance 1M CPS em menos de 30 min.', icon: '⚡', category: 'special', tier: 'diamond', unlocked: false, reward: { type: 'cps_mult', value: 1.15 }, condition: { type: 'speed_demon', value: 1e6 }, hidden: true },
  { id: 'night_owl', name: 'Coruja Noturna', description: 'Jogue entre 2h e 5h da manhã.', icon: '🦉', category: 'secret', tier: 'silver', unlocked: false, reward: { type: 'cps_mult', value: 1.05 }, condition: { type: 'night_owl', value: 1 }, hidden: true },
  { id: 'patience', name: 'Paciência de Jó', description: 'Jogue por 24 horas no total.', icon: '⏳', category: 'special', tier: 'gold', unlocked: false, reward: { type: 'cps_mult', value: 1.1 }, condition: { type: 'play_time', value: 86400 } },
  { id: 'dedicated', name: 'Dedicação Absoluta', description: 'Jogue por 100 horas.', icon: '🏅', category: 'special', tier: 'diamond', unlocked: false, reward: { type: 'cps_mult', value: 1.25 }, condition: { type: 'play_time', value: 360000 } },
  { id: 'quest_master', name: 'Mestre das Missões', description: 'Complete 50 missões diárias.', icon: '📋', category: 'special', tier: 'gold', unlocked: false, reward: { type: 'cps_mult', value: 1.1 }, condition: { type: 'quest_completed', value: 50 } },
  { id: 'achievement_hunter', name: 'Caçador de Conquistas', description: 'Desbloqueie 25 conquistas.', icon: '🎯', category: 'special', tier: 'silver', unlocked: false, reward: { type: 'cps_mult', value: 1.05 }, condition: { type: 'achievement_count', value: 25 } },
  { id: 'achievement_legend', name: 'Lenda das Conquistas', description: 'Desbloqueie 50 conquistas.', icon: '🏆', category: 'special', tier: 'gold', unlocked: false, reward: { type: 'cps_mult', value: 1.15 }, condition: { type: 'achievement_count', value: 50 } },
  { id: 'achievement_god', name: 'Deus das Conquistas', description: 'Desbloqueie TODAS as conquistas.', icon: '👼', category: 'special', tier: 'cosmic', unlocked: false, reward: { type: 'cps_mult', value: 2 }, condition: { type: 'achievement_count', value: 80 } },
  { id: 'big_click', name: 'BOOM!', description: 'Cause 1M de dano em um único clique.', icon: '💥', category: 'secret', tier: 'gold', unlocked: false, reward: { type: 'click_mult', value: 1.1 }, condition: { type: 'single_click', value: 1e6 }, hidden: true },
  { id: 'mega_click', name: 'DEVASTAÇÃO!', description: 'Cause 1B de dano em um único clique.', icon: '☄️', category: 'secret', tier: 'diamond', unlocked: false, reward: { type: 'click_mult', value: 1.25 }, condition: { type: 'single_click', value: 1e9 }, hidden: true },
];

// ── SKILL TREE (24 skills) ───────────────────────────────────────────────────

export const INITIAL_SKILLS: Skill[] = [
  // ── Clicker Branch ──
  { id: 'sk_clickpower1', name: 'Força Bruta', description: '+10% poder de clique por nível.', icon: '👊', branch: 'clicker', tier: 1, maxLevel: 10, currentLevel: 0, costPerLevel: 1, effect: { type: 'click_power', valuePerLevel: 0.1 }, prerequisites: [], unlocked: true },
  { id: 'sk_critchance', name: 'Olho Crítico', description: '+1% chance de crítico por nível.', icon: '🎯', branch: 'clicker', tier: 1, maxLevel: 10, currentLevel: 0, costPerLevel: 1, effect: { type: 'crit_chance', valuePerLevel: 0.01 }, prerequisites: [], unlocked: true },
  { id: 'sk_critmult', name: 'Golpe Devastador', description: '+50% dano crítico por nível.', icon: '💥', branch: 'clicker', tier: 2, maxLevel: 5, currentLevel: 0, costPerLevel: 2, effect: { type: 'crit_mult', valuePerLevel: 0.5 }, prerequisites: ['sk_critchance'], unlocked: false },
  { id: 'sk_comboduration', name: 'Fôlego Extra', description: '+0.5s duração de combo por nível.', icon: '⏱️', branch: 'clicker', tier: 2, maxLevel: 6, currentLevel: 0, costPerLevel: 2, effect: { type: 'combo_duration', valuePerLevel: 0.5 }, prerequisites: ['sk_clickpower1'], unlocked: false },
  { id: 'sk_combomult', name: 'Combo Master', description: '+10% mult. de combo por nível.', icon: '🔥', branch: 'clicker', tier: 3, maxLevel: 5, currentLevel: 0, costPerLevel: 3, effect: { type: 'combo_mult', valuePerLevel: 0.1 }, prerequisites: ['sk_comboduration', 'sk_critmult'], unlocked: false },
  { id: 'sk_clickpower2', name: 'Toque Divino', description: '+25% poder de clique por nível.', icon: '✨', branch: 'clicker', tier: 3, maxLevel: 5, currentLevel: 0, costPerLevel: 4, effect: { type: 'click_power', valuePerLevel: 0.25 }, prerequisites: ['sk_combomult'], unlocked: false },
  { id: 'sk_clickult', name: 'Punho de Deus', description: '+100% poder de clique por nível.', icon: '👁️', branch: 'clicker', tier: 4, maxLevel: 3, currentLevel: 0, costPerLevel: 10, effect: { type: 'click_power', valuePerLevel: 1.0 }, prerequisites: ['sk_clickpower2'], unlocked: false },
  { id: 'sk_allmult_click', name: 'Ascensão Clicadora', description: '+5% mult. global por nível.', icon: '🌟', branch: 'clicker', tier: 4, maxLevel: 5, currentLevel: 0, costPerLevel: 8, effect: { type: 'all_mult', valuePerLevel: 0.05 }, prerequisites: ['sk_clickult'], unlocked: false },

  // ── Producer Branch ──
  { id: 'sk_cpsmult1', name: 'Eficiência', description: '+5% CPS por nível.', icon: '⚙️', branch: 'producer', tier: 1, maxLevel: 10, currentLevel: 0, costPerLevel: 1, effect: { type: 'cps_mult', valuePerLevel: 0.05 }, prerequisites: [], unlocked: true },
  { id: 'sk_costreduction', name: 'Pechincha', description: '-3% custo de edifícios por nível.', icon: '💸', branch: 'producer', tier: 1, maxLevel: 10, currentLevel: 0, costPerLevel: 1, effect: { type: 'building_cost_reduction', valuePerLevel: 0.03 }, prerequisites: [], unlocked: true },
  { id: 'sk_goldenduration', name: 'Banho de Ouro', description: '+5s duração dourada por nível.', icon: '🌟', branch: 'producer', tier: 2, maxLevel: 5, currentLevel: 0, costPerLevel: 2, effect: { type: 'golden_duration', valuePerLevel: 5 }, prerequisites: ['sk_cpsmult1'], unlocked: false },
  { id: 'sk_goldenrate', name: 'Sorte Dourada', description: '+10% freq. dourada por nível.', icon: '🍀', branch: 'producer', tier: 2, maxLevel: 5, currentLevel: 0, costPerLevel: 2, effect: { type: 'golden_rate', valuePerLevel: 0.1 }, prerequisites: ['sk_cpsmult1'], unlocked: false },
  { id: 'sk_cpsmult2', name: 'Otimização Total', description: '+10% CPS por nível.', icon: '📈', branch: 'producer', tier: 3, maxLevel: 5, currentLevel: 0, costPerLevel: 3, effect: { type: 'cps_mult', valuePerLevel: 0.1 }, prerequisites: ['sk_goldenduration', 'sk_costreduction'], unlocked: false },
  { id: 'sk_buildingcps', name: 'Overclocking', description: '+15% CPS de edifícios por nível.', icon: '🔧', branch: 'producer', tier: 3, maxLevel: 5, currentLevel: 0, costPerLevel: 4, effect: { type: 'building_cps', valuePerLevel: 0.15 }, prerequisites: ['sk_cpsmult2'], unlocked: false },
  { id: 'sk_offlinemult', name: 'Piloto Automático', description: '+10% ganho offline por nível.', icon: '💤', branch: 'producer', tier: 4, maxLevel: 5, currentLevel: 0, costPerLevel: 5, effect: { type: 'offline_mult', valuePerLevel: 0.1 }, prerequisites: ['sk_buildingcps'], unlocked: false },
  { id: 'sk_allmult_prod', name: 'Supremacia Produtiva', description: '+5% mult. global por nível.', icon: '🏆', branch: 'producer', tier: 4, maxLevel: 5, currentLevel: 0, costPerLevel: 8, effect: { type: 'all_mult', valuePerLevel: 0.05 }, prerequisites: ['sk_offlinemult'], unlocked: false },

  // ── Alchemist Branch ──
  { id: 'sk_fragmentmult', name: 'Destilação', description: '+5% fragmentos por nível.', icon: '🧪', branch: 'alchemist', tier: 1, maxLevel: 10, currentLevel: 0, costPerLevel: 1, effect: { type: 'fragment_mult', valuePerLevel: 0.05 }, prerequisites: [], unlocked: true },
  { id: 'sk_goldenrate2', name: 'Alquimia Dourada', description: '+5% freq. dourada por nível.', icon: '⚗️', branch: 'alchemist', tier: 1, maxLevel: 5, currentLevel: 0, costPerLevel: 1, effect: { type: 'golden_rate', valuePerLevel: 0.05 }, prerequisites: [], unlocked: true },
  { id: 'sk_costreduction2', name: 'Transmutação', description: '-2% custo global por nível.', icon: '🔮', branch: 'alchemist', tier: 2, maxLevel: 5, currentLevel: 0, costPerLevel: 2, effect: { type: 'building_cost_reduction', valuePerLevel: 0.02 }, prerequisites: ['sk_fragmentmult'], unlocked: false },
  { id: 'sk_fragmentmult2', name: 'Pedra Filosofal', description: '+10% fragmentos por nível.', icon: '💎', branch: 'alchemist', tier: 2, maxLevel: 5, currentLevel: 0, costPerLevel: 3, effect: { type: 'fragment_mult', valuePerLevel: 0.1 }, prerequisites: ['sk_fragmentmult'], unlocked: false },
  { id: 'sk_critchance2', name: 'Elixir da Sorte', description: '+0.5% crit por nível.', icon: '🍀', branch: 'alchemist', tier: 3, maxLevel: 10, currentLevel: 0, costPerLevel: 3, effect: { type: 'crit_chance', valuePerLevel: 0.005 }, prerequisites: ['sk_costreduction2', 'sk_goldenrate2'], unlocked: false },
  { id: 'sk_cpsmult3', name: 'Catalisador', description: '+8% CPS por nível.', icon: '💫', branch: 'alchemist', tier: 3, maxLevel: 5, currentLevel: 0, costPerLevel: 4, effect: { type: 'cps_mult', valuePerLevel: 0.08 }, prerequisites: ['sk_fragmentmult2'], unlocked: false },
  { id: 'sk_fragmentmult3', name: 'Elixir Supremo', description: '+20% fragmentos por nível.', icon: '🌟', branch: 'alchemist', tier: 4, maxLevel: 3, currentLevel: 0, costPerLevel: 8, effect: { type: 'fragment_mult', valuePerLevel: 0.2 }, prerequisites: ['sk_cpsmult3', 'sk_critchance2'], unlocked: false },
  { id: 'sk_allmult_alch', name: 'Opus Magnum', description: '+5% mult. global por nível.', icon: '✨', branch: 'alchemist', tier: 4, maxLevel: 5, currentLevel: 0, costPerLevel: 8, effect: { type: 'all_mult', valuePerLevel: 0.05 }, prerequisites: ['sk_fragmentmult3'], unlocked: false },
];

// ── PETS (12) ────────────────────────────────────────────────────────────────

export const INITIAL_PETS: Pet[] = [
  { id: 'pet_cat', name: 'Gato Pasteleiro', description: 'Um gato que adora massa.', icon: '🐱', rarity: 'common', level: 1, maxLevel: 50, xp: 0, xpToNext: 100, ability: { type: 'auto_click', baseValue: 1, scalingPerLevel: 0.5, description: 'Clica automaticamente {value}x/s.' }, owned: false, active: false },
  { id: 'pet_dog', name: 'Cachorro Farejador', description: 'Fareja coxinhas douradas.', icon: '🐕', rarity: 'common', level: 1, maxLevel: 50, xp: 0, xpToNext: 100, ability: { type: 'golden_boost', baseValue: 0.1, scalingPerLevel: 0.02, description: '+{value}% chance de dourada.' }, owned: false, active: false },
  { id: 'pet_hamster', name: 'Hamster na Roda', description: 'Gera energia para produção.', icon: '🐹', rarity: 'common', level: 1, maxLevel: 50, xp: 0, xpToNext: 100, ability: { type: 'cps_boost', baseValue: 0.05, scalingPerLevel: 0.01, description: '+{value}% CPS.' }, owned: false, active: false },
  { id: 'pet_parrot', name: 'Papagaio Motivador', description: 'Grita incentivos de produção.', icon: '🦜', rarity: 'rare', level: 1, maxLevel: 50, xp: 0, xpToNext: 150, ability: { type: 'click_boost', baseValue: 0.1, scalingPerLevel: 0.03, description: '+{value}% poder de clique.' }, owned: false, active: false },
  { id: 'pet_owl', name: 'Coruja Sábia', description: 'Reduz custos com sabedoria.', icon: '🦉', rarity: 'rare', level: 1, maxLevel: 50, xp: 0, xpToNext: 150, ability: { type: 'cost_reduction', baseValue: 0.03, scalingPerLevel: 0.005, description: '-{value}% custo de edifícios.' }, owned: false, active: false },
  { id: 'pet_fox', name: 'Raposa Astuta', description: 'Aumenta críticos com esperteza.', icon: '🦊', rarity: 'rare', level: 1, maxLevel: 50, xp: 0, xpToNext: 150, ability: { type: 'crit_boost', baseValue: 0.02, scalingPerLevel: 0.005, description: '+{value}% chance de crítico.' }, owned: false, active: false },
  { id: 'pet_dragon', name: 'Dragão Fritador', description: 'Cospe fogo para fritar coxinhas.', icon: '🐉', rarity: 'epic', level: 1, maxLevel: 50, xp: 0, xpToNext: 250, ability: { type: 'cps_boost', baseValue: 0.15, scalingPerLevel: 0.03, description: '+{value}% CPS.' }, owned: false, active: false },
  { id: 'pet_phoenix', name: 'Fênix Renascida', description: 'Bônus de fragmentos no rebirth.', icon: '🐦‍🔥', rarity: 'epic', level: 1, maxLevel: 50, xp: 0, xpToNext: 250, ability: { type: 'fragment_boost', baseValue: 0.1, scalingPerLevel: 0.02, description: '+{value}% fragmentos.' }, owned: false, active: false },
  { id: 'pet_unicorn', name: 'Unicórnio Mágico', description: 'Traz sorte e magia.', icon: '🦄', rarity: 'epic', level: 1, maxLevel: 50, xp: 0, xpToNext: 250, ability: { type: 'lucky_drops', baseValue: 0.05, scalingPerLevel: 0.01, description: '+{value}% chance de drops raros.' }, owned: false, active: false },
  { id: 'pet_cosmic_cat', name: 'Gato Cósmico', description: 'Flutua no espaço fazendo coxinhas.', icon: '🌌', rarity: 'legendary', level: 1, maxLevel: 100, xp: 0, xpToNext: 500, ability: { type: 'cps_boost', baseValue: 0.25, scalingPerLevel: 0.05, description: '+{value}% CPS.' }, owned: false, active: false },
  { id: 'pet_golden_goose', name: 'Ganso Dourado', description: 'Põe ovos de ouro.', icon: '🪿', rarity: 'legendary', level: 1, maxLevel: 100, xp: 0, xpToNext: 500, ability: { type: 'golden_boost', baseValue: 0.25, scalingPerLevel: 0.05, description: '+{value}% eficácia dourada.' }, owned: false, active: false },
  { id: 'pet_void_serpent', name: 'Serpente do Vazio', description: 'Devora o nada e cria coxinhas.', icon: '🐍', rarity: 'mythic', level: 1, maxLevel: 100, xp: 0, xpToNext: 1000, ability: { type: 'cps_boost', baseValue: 0.5, scalingPerLevel: 0.1, description: '+{value}% CPS total.' }, owned: false, active: false },
];

// ── CRAFTING RECIPES (15) ────────────────────────────────────────────────────

export const INITIAL_RECIPES: CraftingRecipe[] = [
  { id: 'craft_speed_oil', name: 'Óleo Turbo', description: 'Boost temporário de produção.', icon: '⚡', category: 'consumable', ingredients: [{ type: 'coxinhas', amount: 10000 }], result: { type: 'temp_boost', value: 2, duration: 60, description: 'CPS x2 por 60s.' }, craftTime: 5, discovered: true, timesCrafted: 0 },
  { id: 'craft_golden_batter', name: 'Massa Dourada', description: 'Atrai coxinhas douradas.', icon: '✨', category: 'consumable', ingredients: [{ type: 'coxinhas', amount: 50000 }, { type: 'golden_essence', amount: 1 }], result: { type: 'temp_boost', value: 3, duration: 120, description: 'Golden rate x3 por 120s.' }, craftTime: 15, discovered: true, timesCrafted: 0 },
  { id: 'craft_mega_oil', name: 'Mega Óleo', description: 'Boost poderoso.', icon: '🔥', category: 'consumable', ingredients: [{ type: 'coxinhas', amount: 1e6 }, { type: 'stardust', amount: 5 }], result: { type: 'temp_boost', value: 5, duration: 30, description: 'CPS x5 por 30s.' }, craftTime: 30, discovered: false, timesCrafted: 0 },
  { id: 'craft_pet_treat', name: 'Petisco Premium', description: 'XP extra para pets.', icon: '🦴', category: 'consumable', ingredients: [{ type: 'coxinhas', amount: 100000 }], result: { type: 'pet_xp', value: 500, description: '+500 XP para pet ativo.' }, craftTime: 10, discovered: true, timesCrafted: 0 },
  { id: 'craft_skill_tome', name: 'Tomo de Sabedoria', description: 'Ganha 1 ponto de habilidade.', icon: '📖', category: 'consumable', ingredients: [{ type: 'coxinhas', amount: 5e6 }, { type: 'stardust', amount: 10 }], result: { type: 'skill_point', value: 1, description: '+1 Ponto de Habilidade.' }, craftTime: 60, discovered: false, timesCrafted: 0 },
  { id: 'craft_lucky_charm', name: 'Amuleto da Sorte', description: 'Boost permanente de crit.', icon: '🍀', category: 'equipment', ingredients: [{ type: 'coxinhas', amount: 1e8 }, { type: 'golden_essence', amount: 10 }], result: { type: 'permanent_mult', value: 1.05, description: '+5% crit chance permanente.' }, craftTime: 120, discovered: false, timesCrafted: 0 },
  { id: 'craft_golden_gloves', name: 'Luvas Douradas', description: 'Poder de clique permanente.', icon: '🧤', category: 'equipment', ingredients: [{ type: 'coxinhas', amount: 5e8 }, { type: 'golden_essence', amount: 25 }], result: { type: 'permanent_mult', value: 1.1, description: '+10% poder de clique permanente.' }, craftTime: 180, discovered: false, timesCrafted: 0 },
  { id: 'craft_stardust_ring', name: 'Anel de Poeira Estelar', description: 'CPS permanente +5%.', icon: '💍', category: 'equipment', ingredients: [{ type: 'stardust', amount: 50 }, { type: 'cosmic_flour', amount: 10 }], result: { type: 'permanent_mult', value: 1.05, description: '+5% CPS permanente.' }, craftTime: 240, discovered: false, timesCrafted: 0 },
  { id: 'craft_enchant_fryer', name: 'Encantamento: Fritura', description: 'Encanta fritadeiras.', icon: '🔮', category: 'enchantment', ingredients: [{ type: 'coxinhas', amount: 1e10 }, { type: 'stardust', amount: 25 }], result: { type: 'permanent_mult', value: 1.15, description: '+15% CPS de fritadeiras permanente.' }, craftTime: 300, discovered: false, timesCrafted: 0 },
  { id: 'craft_enchant_golden', name: 'Encantamento: Dourado', description: 'Douradas mais frequentes.', icon: '⭐', category: 'enchantment', ingredients: [{ type: 'golden_essence', amount: 50 }, { type: 'stardust', amount: 100 }], result: { type: 'permanent_mult', value: 1.2, description: '+20% frequência de dourada permanente.' }, craftTime: 300, discovered: false, timesCrafted: 0 },
  { id: 'craft_fragment_essence', name: 'Essência de Fragmentos', description: 'Converte recursos em fragmentos.', icon: '🔥', category: 'legendary', ingredients: [{ type: 'stardust', amount: 200 }, { type: 'golden_essence', amount: 100 }, { type: 'cosmic_flour', amount: 50 }], result: { type: 'fragments', value: 100, description: '+100 Fragmentos de Óleo Quente.' }, craftTime: 600, discovered: false, timesCrafted: 0 },
  { id: 'craft_cosmic_recipe', name: 'Receita Cósmica', description: 'O segredo do universo.', icon: '🌌', category: 'legendary', ingredients: [{ type: 'coxinhas', amount: 1e15 }, { type: 'fragments', amount: 500 }, { type: 'cosmic_flour', amount: 100 }], result: { type: 'permanent_mult', value: 2, description: 'CPS x2 permanente.' }, craftTime: 900, discovered: false, timesCrafted: 0 },
  { id: 'craft_hyper_oil', name: 'Hiper Óleo Ancestral', description: 'O óleo dos deuses.', icon: '💧', category: 'consumable', ingredients: [{ type: 'coxinhas', amount: 1e12 }, { type: 'fragments', amount: 50 }], result: { type: 'temp_boost', value: 10, duration: 30, description: 'CPS x10 por 30s.' }, craftTime: 120, discovered: false, timesCrafted: 0 },
  { id: 'craft_time_crystal', name: 'Cristal Temporal', description: 'Manipula o fluxo do tempo.', icon: '💎', category: 'legendary', ingredients: [{ type: 'stardust', amount: 500 }, { type: 'cosmic_flour', amount: 200 }], result: { type: 'permanent_mult', value: 1.5, description: '+50% velocidade offline permanente.' }, craftTime: 600, discovered: false, timesCrafted: 0 },
  { id: 'craft_philosophers_oil', name: 'Óleo Filosofal', description: 'A obra-prima da alquimia.', icon: '⚗️', category: 'legendary', ingredients: [{ type: 'coxinhas', amount: 1e20 }, { type: 'fragments', amount: 1000 }, { type: 'stardust', amount: 1000 }, { type: 'golden_essence', amount: 500 }, { type: 'cosmic_flour', amount: 500 }], result: { type: 'permanent_mult', value: 5, description: 'TUDO x5 permanente!' }, craftTime: 1800, discovered: false, timesCrafted: 0 },
];

// ── CHALLENGES (8) ───────────────────────────────────────────────────────────

export const INITIAL_CHALLENGES: Challenge[] = [
  { id: 'ch_speed_1', name: 'Corrida da Coxinha', description: 'Alcance 1000 CPS em 5 minutos.', icon: '🏃', difficulty: 'easy', type: 'speed', duration: 300, active: false, completed: false, completedCount: 0, reward: { fragments: 5, skillPoints: 1 }, condition: { type: 'reach_cps', value: 1000 }, modifier: {} },
  { id: 'ch_speed_2', name: 'Velocidade Extrema', description: 'Alcance 1M CPS em 10 minutos.', icon: '⚡', difficulty: 'medium', type: 'speed', duration: 600, active: false, completed: false, completedCount: 0, reward: { fragments: 20, skillPoints: 2 }, condition: { type: 'reach_cps', value: 1e6 }, modifier: {} },
  { id: 'ch_endurance_1', name: 'Maratona Fritosa', description: 'Produza 1B coxinhas sem parar.', icon: '🏋️', difficulty: 'medium', type: 'endurance', duration: 1800, active: false, completed: false, completedCount: 0, reward: { fragments: 15, skillPoints: 2 }, condition: { type: 'reach_total', value: 1e9 }, modifier: {} },
  { id: 'ch_restrict_1', name: 'Minimalista', description: 'Alcance 10K CPS usando apenas cursores e vovós.', icon: '🎯', difficulty: 'hard', type: 'restriction', duration: 600, active: false, completed: false, completedCount: 0, reward: { fragments: 50, skillPoints: 3, title: 'Minimalista' }, condition: { type: 'reach_cps', value: 10000 }, modifier: { noBuildingsAbove: 'grandma' } },
  { id: 'ch_restrict_2', name: 'Sem Tecnologia', description: 'Alcance 100K CPS sem upgrades.', icon: '🔨', difficulty: 'hard', type: 'restriction', duration: 900, active: false, completed: false, completedCount: 0, reward: { fragments: 75, skillPoints: 5, title: 'Purista' }, condition: { type: 'reach_cps', value: 100000 }, modifier: { noUpgrades: true } },
  { id: 'ch_boss_1', name: 'Boss: Mega Coxinha', description: 'Inflija 10M de dano em cliques em 2 min.', icon: '👹', difficulty: 'hard', type: 'boss', duration: 120, active: false, completed: false, completedCount: 0, reward: { fragments: 100, skillPoints: 5, petId: 'pet_dragon' }, condition: { type: 'reach_clicks', value: 10000000 }, modifier: { cpsMultiplier: 0 } },
  { id: 'ch_nightmare_1', name: 'Pesadelo do Fiscal', description: 'Sobreviva com -90% CPS por 5 min.', icon: '😱', difficulty: 'nightmare', type: 'endurance', duration: 300, active: false, completed: false, completedCount: 0, reward: { fragments: 200, skillPoints: 10, title: 'Sobrevivente' }, condition: { type: 'survive_time', value: 300 }, modifier: { cpsMultiplier: 0.1 } },
  { id: 'ch_impossible_1', name: 'O Impossível', description: 'Alcance 1T CPS com custos x10.', icon: '💀', difficulty: 'impossible', type: 'speed', duration: 3600, active: false, completed: false, completedCount: 0, reward: { fragments: 1000, skillPoints: 25, title: 'O Impossível', petId: 'pet_void_serpent' }, condition: { type: 'reach_cps', value: 1e12 }, modifier: { costMultiplier: 10 } },
];

// ── QUEST POOL ───────────────────────────────────────────────────────────────

export const QUEST_POOL: Omit<Quest, 'progress' | 'completed' | 'claimed'>[] = [
  { id: 'q_click_100', name: 'Aquecimento', description: 'Clique 100 vezes.', icon: '👆', type: 'clicks', target: 100, reward: { coxinhas: 500 } },
  { id: 'q_click_500', name: 'Sessão de Cliques', description: 'Clique 500 vezes.', icon: '✌️', type: 'clicks', target: 500, reward: { coxinhas: 5000 } },
  { id: 'q_click_2000', name: 'Maratona de Cliques', description: 'Clique 2000 vezes.', icon: '💪', type: 'clicks', target: 2000, reward: { coxinhas: 50000, skillPoints: 1 } },
  { id: 'q_build_5', name: 'Construtor', description: 'Compre 5 edifícios.', icon: '🏗️', type: 'buildings_bought', target: 5, reward: { coxinhas: 2000 } },
  { id: 'q_build_15', name: 'Empreiteiro', description: 'Compre 15 edifícios.', icon: '🏢', type: 'buildings_bought', target: 15, reward: { coxinhas: 20000, skillPoints: 1 } },
  { id: 'q_golden_3', name: 'Caçador de Ouro', description: 'Clique em 3 coxinhas douradas.', icon: '🌟', type: 'golden_clicked', target: 3, reward: { coxinhas: 10000 } },
  { id: 'q_golden_7', name: 'Prospector', description: 'Clique em 7 coxinhas douradas.', icon: '⭐', type: 'golden_clicked', target: 7, reward: { coxinhas: 100000, fragments: 1 } },
  { id: 'q_produce_10k', name: 'Produtor Iniciante', description: 'Produza 10.000 coxinhas.', icon: '🥟', type: 'produced', target: 10000, reward: { coxinhas: 1000 } },
  { id: 'q_produce_1m', name: 'Mega Produtor', description: 'Produza 1M de coxinhas.', icon: '🏭', type: 'produced', target: 1e6, reward: { coxinhas: 500000, skillPoints: 1 } },
  { id: 'q_upgrade_3', name: 'Pesquisador', description: 'Compre 3 upgrades.', icon: '✨', type: 'upgrades_bought', target: 3, reward: { coxinhas: 5000 } },
  { id: 'q_upgrade_10', name: 'Cientista', description: 'Compre 10 upgrades.', icon: '🔬', type: 'upgrades_bought', target: 10, reward: { coxinhas: 100000, fragments: 2 } },
  { id: 'q_combo_50', name: 'Combo Mestre', description: 'Alcance combo 50.', icon: '🔥', type: 'combo_reached', target: 50, reward: { coxinhas: 25000 } },
  { id: 'q_cps_1000', name: 'Eficiente', description: 'Alcance 1000 CPS.', icon: '📈', type: 'cps_reached', target: 1000, reward: { coxinhas: 10000 } },
  { id: 'q_cps_1m', name: 'Ultra Eficiente', description: 'Alcance 1M CPS.', icon: '🚀', type: 'cps_reached', target: 1e6, reward: { coxinhas: 1e7, fragments: 5 } },
];

// ── RANDOM EVENTS ────────────────────────────────────────────────────────────

export const RANDOM_EVENTS: RandomEvent[] = [
  { id: 'chuva_coxinhas', name: '🌧️ Chuva de Coxinhas!', description: 'Coxinhas caem do céu! Produção x3!', icon: '🌧️', color: '#4CAF50', duration: 30000, effect: { type: 'cps_mult', value: 3 }, chance: 0.0003 },
  { id: 'vovo_inspirada', name: '👵 Vovó Inspirada!', description: 'Vovó teve uma epifania culinária! Cliques x5!', icon: '👵', color: '#FF9800', duration: 20000, effect: { type: 'click_mult', value: 5 }, chance: 0.0003 },
  { id: 'apagao', name: '⚡ Apagão!', description: 'Queda de energia! Produção parada por 15s!', icon: '⚡', color: '#F44336', duration: 15000, effect: { type: 'cps_halt', value: 0 }, chance: 0.0001 },
  { id: 'rush_hour', name: '🏃 Rush Hour!', description: 'Todo mundo quer coxinha! CPS x2!', icon: '🏃', color: '#2196F3', duration: 45000, effect: { type: 'cps_mult', value: 2 }, chance: 0.0004 },
  { id: 'fiscal', name: '📋 Fiscal Chegou!', description: 'Inspeção sanitária! CPS -50% por 20s!', icon: '📋', color: '#FF5722', duration: 20000, effect: { type: 'cps_mult', value: 0.5 }, chance: 0.00015 },
  { id: 'cliente_vip', name: '👑 Cliente VIP!', description: 'Celebridade apareceu! Produção x4!', icon: '👑', color: '#9C27B0', duration: 25000, effect: { type: 'cps_mult', value: 4 }, chance: 0.0002 },
  { id: 'black_friday', name: '🏷️ Black Friday!', description: 'Tudo com desconto! Custos -30%!', icon: '🏷️', color: '#000000', duration: 30000, effect: { type: 'cost_reduction', value: 0.7 }, chance: 0.0002 },
  { id: 'combo_frenzy', name: '🔥 Frenesi de Combo!', description: 'Combos valem o dobro!', icon: '🔥', color: '#FF6F00', duration: 20000, effect: { type: 'combo_boost', value: 2 }, chance: 0.0003 },
  { id: 'golden_rain', name: '🌟 Chuva Dourada!', description: 'Coxinhas douradas aparecem 5x mais!', icon: '🌟', color: '#FFD700', duration: 30000, effect: { type: 'golden_rate', value: 5 }, chance: 0.00015 },
  { id: 'mega_boost', name: '🚀 Mega Boost!', description: 'TUDO multiplicado! CPS x7!', icon: '🚀', color: '#00BCD4', duration: 15000, effect: { type: 'cps_mult', value: 7 }, chance: 0.00005 },
];

// ── GALAXIES ─────────────────────────────────────────────────────────────────

export const INITIAL_GALAXIES: Record<string, Galaxy> = {
  via_lactea: { id: 'via_lactea', name: 'Via Láctea', description: 'Nossa galáxia natal.', icon: '🌌', cost: 0, multiplier: 1, unlocked: true, exploration: 0, discoveredPlanets: [] },
  andromeda: { id: 'andromeda', name: 'Andrômeda', description: 'A galáxia vizinha gigante.', icon: '🌀', cost: 100, multiplier: 1.5, unlocked: false, exploration: 0, discoveredPlanets: [], requirements: [{ type: 'rebirth_count', value: 3 }] },
  triangulum: { id: 'triangulum', name: 'Triângulo', description: 'Pequena mas poderosa.', icon: '🔺', cost: 500, multiplier: 2, unlocked: false, exploration: 0, special: true, discoveredPlanets: [], requirements: [{ type: 'fragments', value: 500 }, { type: 'rebirth_count', value: 5 }] },
  sombrero: { id: 'sombrero', name: 'Sombrero', description: 'Formato de chapéu mexicano.', icon: '🎩', cost: 2000, multiplier: 3, unlocked: false, exploration: 0, discoveredPlanets: [], requirements: [{ type: 'rebirth_count', value: 8 }] },
  whirlpool: { id: 'whirlpool', name: 'Redemoinho', description: 'Espiral hipnotizante.', icon: '🌊', cost: 5000, multiplier: 4, unlocked: false, exploration: 0, special: true, discoveredPlanets: [], requirements: [{ type: 'rebirth_count', value: 12 }] },
  centaurus: { id: 'centaurus', name: 'Centaurus A', description: 'Rádio-galáxia poderosa.', icon: '⚡', cost: 15000, multiplier: 6, unlocked: false, exploration: 0, discoveredPlanets: [], requirements: [{ type: 'rebirth_count', value: 15 }, { type: 'fragments', value: 5000 }] },
  cartwheel: { id: 'cartwheel', name: 'Cartwheel', description: 'Galáxia em formato de roda.', icon: '🎡', cost: 50000, multiplier: 10, unlocked: false, exploration: 0, legendary: true, discoveredPlanets: [], requirements: [{ type: 'rebirth_count', value: 20 }] },
  eye_of_god: { id: 'eye_of_god', name: 'Olho de Deus', description: 'Nebulosa que tudo vê.', icon: '👁️', cost: 100000, multiplier: 15, unlocked: false, exploration: 0, legendary: true, discoveredPlanets: [], requirements: [{ type: 'rebirth_count', value: 30 }, { type: 'achievement_count', value: 50 }] },
  phoenix: { id: 'phoenix', name: 'Phoenix', description: 'Galáxia do renascimento eterno.', icon: '🐦‍🔥', cost: 500000, multiplier: 25, unlocked: false, exploration: 0, endgame: true, discoveredPlanets: [], requirements: [{ type: 'rebirth_count', value: 50 }, { type: 'fragments', value: 100000 }] },
};

export const INITIAL_GALAXY_UPGRADES: GalaxyUpgrade[] = [
  { id: 'gu_stellar_forge', name: 'Forja Estelar', description: 'Funde estrelas em ingredientes.', icon: '⭐', cost: 50, costType: 'fragments', effect: { type: 'cps_mult', value: 2 }, purchased: false },
  { id: 'gu_cosmic_oven', name: 'Forno Cósmico', description: 'Usa radiação cósmica para assar.', icon: '🔥', cost: 200, costType: 'fragments', effect: { type: 'cps_mult', value: 3 }, purchased: false, requirement: { type: 'rebirth_count', value: 5 } },
  { id: 'gu_dark_matter_fryer', name: 'Fritadeira de Matéria Escura', description: 'Frita com forças desconhecidas.', icon: '🌑', cost: 100, costType: 'stardust', effect: { type: 'click_mult', value: 5 }, purchased: false, requirement: { type: 'rebirth_count', value: 10 } },
  { id: 'gu_quantum_dough', name: 'Massa Quântica', description: 'Existe em superposição de sabores.', icon: '⚛️', cost: 500, costType: 'fragments', effect: { type: 'golden_rate', value: 3 }, purchased: false, requirement: { type: 'rebirth_count', value: 15 } },
  { id: 'gu_multiverse_recipe', name: 'Receita Multiversal', description: 'A melhor receita de infinitos universos.', icon: '📜', cost: 200, costType: 'cosmic_flour', effect: { type: 'fragment_mult', value: 2 }, purchased: false, requirement: { type: 'rebirth_count', value: 20 } },
  { id: 'gu_eternal_flame', name: 'Chama Eterna', description: 'Nunca para de fritar.', icon: '🔥', cost: 2000, costType: 'fragments', effect: { type: 'all_mult', value: 5 }, purchased: false, requirement: { type: 'rebirth_count', value: 30 } },
];

// ── NEWS HEADLINES ───────────────────────────────────────────────────────────

export const NEWS_HEADLINES: string[] = [
  "Cientistas confirmam: O universo tem formato de coxinha.",
  "Preço da farinha cai após descoberta de mina de massa infinita.",
  "Vovó Cozinheira ganha prêmio Nobel da Paz por receita secreta.",
  "Nova tendência: Casamentos substituem bolo por torre de coxinhas.",
  "Gatos agora preferem coxinhas a sachê, diz estudo.",
  "Economistas sugerem adotar a Coxinha como moeda oficial do Brasil.",
  "Alienígenas visitam a Terra e pedem 'uma de frango com catupiry'.",
  "Fritadeira Industrial explode em sabor e cobre cidade de aroma.",
  "Rei do Camarote afirma: 'Coxinha é o novo caviar'.",
  "Clima: Previsão de chuva de azeite para o fim de semana.",
  "Fãs acampam na porta da Pastelaria esperando lote fresco.",
  "NASA detecta sinal de rádio vindo de Andrômeda: 'Tem ketchup?'.",
  "Elon Musk anuncia SpaceCoxinha: Coxinhas entregues na Lua até 2030.",
  "ONU declara coxinha patrimônio imaterial da humanidade.",
  "Novo recordo: Homem come 847 coxinhas em competição mundial.",
  "Inteligência artificial cria receita de coxinha com 47 sabores.",
  "Bitcoin despenca mas Coxinha Coin sobe 3000% em uma semana.",
  "Pesquisa revela: 98% dos brasileiros sonham com coxinhas.",
  "Governo anuncia programa Minha Coxinha, Minha Vida.",
  "Descoberto fóssil de coxinha pré-histórica com 65 milhões de anos.",
  "Festival de Coxinhas de Andrômeda atrai turistas intergalácticos.",
  "Dragão fritador domesticado pela primeira vez na história.",
  "Cientista descobre que buracos negros são na verdade coxinhas gigantes.",
  "Campeonato mundial de combo de cliques bate recorde: 10.000 combos!",
];

// ── DEFAULT GAME STATE HELPERS ───────────────────────────────────────────────

export function createDefaultResources(): import('./types').Resources {
  return {
    coxinhas: 0, hotOilFragments: 0, stardust: 0, goldenEssence: 0, cosmicFlour: 0, skillPoints: 0,
    mana: 0, darkMatter: 0, temporalShards: 0, elementalCrystals: 0,
    voidEssence: 0, divineSparks: 0, reputation: 0, relicDust: 0,
    researchPoints: 0, gardenSeeds: 0
  };
}

export function createDefaultStatistics(): import('./types').GameStatistics {
  return {
    totalClicks: 0, totalCoxinhasEarned: 0, totalCoxinhasSpent: 0,
    totalBuildingsBought: 0, totalUpgradesBought: 0, totalRebirths: 0,
    totalGoldenClicked: 0, totalQuestsCompleted: 0, totalAchievementsUnlocked: 0,
    totalChallengesCompleted: 0, totalPetsDiscovered: 0, totalItemsCrafted: 0,
    totalSkillPointsEarned: 0, totalPlayTimeSeconds: 0, totalOfflineEarnings: 0,
    highestCps: 0, highestClickDamage: 0, highestCombo: 0,
    longestSession: 0, fastestRebirth: Infinity, currentSessionStart: Date.now(),
    buildingStats: {}
  };
}

export function createDefaultSettings(): import('./types').GameSettings {
  return {
    soundEnabled: true, musicEnabled: false, volume: 0.5, musicVolume: 0.3,
    darkMode: true, showFloatingText: true, showParticles: true,
    autoSaveInterval: 30, notificationsEnabled: true
  };
}

export function createDefaultPlayer(): import('./types').PlayerProfile {
  return {
    name: 'Mestre Coxinheiro', title: 'Iniciante', level: 1,
    xp: 0, xpToNext: 100, totalPlayTime: 0, joinDate: Date.now(), titles: ['Iniciante']
  };
}

export function createDefaultPrestige(): import('./types').PrestigeState {
  return {
    rebirthCount: 0, totalPrestige: 0, currentGalaxy: 'via_lactea',
    galaxies: JSON.parse(JSON.stringify(INITIAL_GALAXIES)),
    galaxyUpgrades: JSON.parse(JSON.stringify(INITIAL_GALAXY_UPGRADES)),
    cosmicResources: createDefaultResources(),
    lastRebirthTime: 0, permanentBonuses: []
  };
}
