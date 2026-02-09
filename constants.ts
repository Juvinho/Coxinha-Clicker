import { Building, Upgrade } from './types';

export const INITIAL_BUILDINGS: Building[] = [
  {
    id: 'cursor',
    name: 'Cursor de Fritura',
    baseCost: 15,
    baseCps: 0.1,
    count: 0,
    description: 'Um clique automático para ajudar na produção.',
    icon: '👆'
  },
  {
    id: 'grandma',
    name: 'Vovó Cozinheira',
    baseCost: 100,
    baseCps: 1,
    count: 0,
    description: 'Uma vovó simpática que frita coxinhas com amor.',
    icon: '👵'
  },
  {
    id: 'stand',
    name: 'Barraca de Feira',
    baseCost: 1100,
    baseCps: 8,
    count: 0,
    description: 'A clássica barraca de feira com óleo quente.',
    icon: '⛺'
  },
  {
    id: 'pastry_shop',
    name: 'Pastelaria',
    baseCost: 12000,
    baseCps: 47,
    count: 0,
    description: 'Estabelecimento focado em massas fritas.',
    icon: '🥟'
  },
  {
    id: 'fryer',
    name: 'Fritadeira Industrial',
    baseCost: 130000,
    baseCps: 260,
    count: 0,
    description: 'Capacidade de fritar toneladas por hora.',
    icon: '🔥'
  },
  {
    id: 'foodtruck',
    name: 'Food Truck Gourmet',
    baseCost: 1400000,
    baseCps: 1400,
    count: 0,
    description: 'Coxinhas artesanais com gourmetização.',
    icon: '🚚'
  },
  {
    id: 'restaurant',
    name: 'Restaurante 5 Estrelas',
    baseCost: 20000000,
    baseCps: 7800,
    count: 0,
    description: 'Alta gastronomia focada na coxinha perfeita.',
    icon: '🍴'
  },
  {
    id: 'franchise',
    name: 'Rede de Franquias',
    baseCost: 330000000,
    baseCps: 44000,
    count: 0,
    description: 'Domine o mercado nacional.',
    icon: '🏢'
  },
  {
    id: 'teleport',
    name: 'Teletransporte',
    baseCost: 5100000000,
    baseCps: 260000,
    count: 0,
    description: 'Delivery instantâneo via desmaterialização.',
    icon: '⚡'
  },
  {
    id: 'quantum_farm',
    name: 'Fazenda Quântica',
    baseCost: 75000000000,
    baseCps: 1600000,
    count: 0,
    description: 'Cultiva frangos em superposição quântica.',
    icon: '🐔'
  },
  {
    id: 'portal',
    name: 'Portal da Coxinha',
    baseCost: 1000000000000,
    baseCps: 10000000,
    count: 0,
    description: 'Abre fendas para a dimensão do catupiry.',
    icon: '🌌'
  },
  {
    id: 'time_machine',
    name: 'Máquina do Tempo',
    baseCost: 14000000000000,
    baseCps: 65000000,
    count: 0,
    description: 'Traz coxinhas do passado e do futuro.',
    icon: '⏳'
  },
  {
    id: 'condenser',
    name: 'Condensador de Matéria',
    baseCost: 170000000000000,
    baseCps: 430000000,
    count: 0,
    description: 'Condensa o universo em massa frita.',
    icon: '🔮'
  },
  {
    id: 'prism',
    name: 'Prisma de Fritura',
    baseCost: 2100000000000000,
    baseCps: 2900000000,
    count: 0,
    description: 'Refração de luz que converte fótons em óleo.',
    icon: '🌈'
  },
  {
    id: 'cortex',
    name: 'Cortex Coxinha',
    baseCost: 12000000000000000000,
    baseCps: 210000000000,
    count: 0,
    description: 'Uma mente colmeia feita de massa.',
    icon: '🧠'
  }
];

// --- EXTENSIVE UPGRADE LIST ---
export const INITIAL_UPGRADES: Upgrade[] = [
  // --- CLICK UPGRADES (Mouse) ---
  {
    id: 'click_1',
    name: 'Dedos Reforçados',
    description: 'Seus cliques são 2x mais eficientes.',
    type: 'click',
    cost: 500,
    multiplier: 2,
    purchased: false,
    unlockCondition: 1
  },
  {
    id: 'click_2',
    name: 'Luvas de Aço',
    description: 'Seus cliques são 2x mais eficientes.',
    type: 'click',
    cost: 50000,
    multiplier: 2,
    purchased: false,
    unlockCondition: 500
  },
  {
    id: 'click_3',
    name: 'Mouse Gamer RGB',
    description: 'Seus cliques são 2x mais eficientes.',
    type: 'click',
    cost: 5000000,
    multiplier: 2,
    purchased: false,
    unlockCondition: 10000
  },
  {
    id: 'click_4',
    name: 'Dedo Bionico',
    description: 'Seus cliques são 2x mais eficientes.',
    type: 'click',
    cost: 500000000,
    multiplier: 2,
    purchased: false,
    unlockCondition: 1000000
  },

  // --- CURSOR UPGRADES ---
  {
    id: 'cursor_1',
    name: 'Indicador de Titânio',
    description: 'Cursores são 2x mais eficientes.',
    type: 'building',
    triggerBuildingId: 'cursor',
    cost: 500,
    multiplier: 2,
    purchased: false,
    unlockCondition: 1
  },
  {
    id: 'cursor_2',
    name: 'Lubrificante de Articulações',
    description: 'Cursores são 2x mais eficientes.',
    type: 'building',
    triggerBuildingId: 'cursor',
    cost: 5000,
    multiplier: 2,
    purchased: false,
    unlockCondition: 10
  },
  {
    id: 'cursor_3',
    name: 'Mouse Sem Fio',
    description: 'Cursores são 2x mais eficientes.',
    type: 'building',
    triggerBuildingId: 'cursor',
    cost: 50000,
    multiplier: 2,
    purchased: false,
    unlockCondition: 25
  },

  // --- VOVÓ UPGRADES ---
  {
    id: 'grandma_1',
    name: 'Receita Secreta',
    description: 'Vovós produzem 2x mais.',
    type: 'building',
    triggerBuildingId: 'grandma',
    cost: 1000,
    multiplier: 2,
    purchased: false,
    unlockCondition: 1
  },
  {
    id: 'grandma_2',
    name: 'Rolo de Massa de Aço',
    description: 'Vovós produzem 2x mais.',
    type: 'building',
    triggerBuildingId: 'grandma',
    cost: 5000,
    multiplier: 2,
    purchased: false,
    unlockCondition: 5
  },
  {
    id: 'grandma_3',
    name: 'Dentaduras Hidráulicas',
    description: 'Vovós produzem 2x mais.',
    type: 'building',
    triggerBuildingId: 'grandma',
    cost: 50000,
    multiplier: 2,
    purchased: false,
    unlockCondition: 25
  },
  {
    id: 'grandma_4',
    name: 'Bingo Beneficente',
    description: 'Vovós produzem 2x mais.',
    type: 'building',
    triggerBuildingId: 'grandma',
    cost: 5000000,
    multiplier: 2,
    purchased: false,
    unlockCondition: 50
  },

  // --- BARRACA UPGRADES ---
  {
    id: 'stand_1',
    name: 'Ponto Estratégico',
    description: 'Barracas produzem 2x mais.',
    type: 'building',
    triggerBuildingId: 'stand',
    cost: 11000,
    multiplier: 2,
    purchased: false,
    unlockCondition: 1
  },
  {
    id: 'stand_2',
    name: 'Toldo Reforçado',
    description: 'Barracas produzem 2x mais.',
    type: 'building',
    triggerBuildingId: 'stand',
    cost: 55000,
    multiplier: 2,
    purchased: false,
    unlockCondition: 5
  },
  {
    id: 'stand_3',
    name: 'Promoção do Dia',
    description: 'Barracas produzem 2x mais.',
    type: 'building',
    triggerBuildingId: 'stand',
    cost: 550000,
    multiplier: 2,
    purchased: false,
    unlockCondition: 25
  },

  // --- PASTELARIA UPGRADES ---
  {
    id: 'pastry_1',
    name: 'Massa Crocante',
    description: 'Pastelarias produzem 2x mais.',
    type: 'building',
    triggerBuildingId: 'pastry_shop',
    cost: 120000,
    multiplier: 2,
    purchased: false,
    unlockCondition: 1
  },
  {
    id: 'pastry_2',
    name: 'Recheio Duplo',
    description: 'Pastelarias produzem 2x mais.',
    type: 'building',
    triggerBuildingId: 'pastry_shop',
    cost: 600000,
    multiplier: 2,
    purchased: false,
    unlockCondition: 10
  },

  // --- FRITADEIRA UPGRADES ---
  {
    id: 'fryer_1',
    name: 'Óleo de Neon',
    description: 'Fritadeiras produzem 2x mais.',
    type: 'building',
    triggerBuildingId: 'fryer',
    cost: 1300000,
    multiplier: 2,
    purchased: false,
    unlockCondition: 1
  },
  {
    id: 'fryer_2',
    name: 'Termostato Inteligente',
    description: 'Fritadeiras produzem 2x mais.',
    type: 'building',
    triggerBuildingId: 'fryer',
    cost: 6500000,
    multiplier: 2,
    purchased: false,
    unlockCondition: 10
  },

  // --- FOOD TRUCK UPGRADES ---
  {
    id: 'truck_1',
    name: 'Gourmetização',
    description: 'Food Trucks produzem 2x mais.',
    type: 'building',
    triggerBuildingId: 'foodtruck',
    cost: 14000000,
    multiplier: 2,
    purchased: false,
    unlockCondition: 1
  },
  {
    id: 'truck_2',
    name: 'Rota dos Festivais',
    description: 'Food Trucks produzem 2x mais.',
    type: 'building',
    triggerBuildingId: 'foodtruck',
    cost: 70000000,
    multiplier: 2,
    purchased: false,
    unlockCondition: 15
  },

  // --- RESTAURANTE UPGRADES ---
  {
    id: 'rest_1',
    name: 'Estrela Michelin',
    description: 'Restaurantes produzem 2x mais.',
    type: 'building',
    triggerBuildingId: 'restaurant',
    cost: 200000000,
    multiplier: 2,
    purchased: false,
    unlockCondition: 1
  },

  // --- GLOBAL / GOLDEN COXINHA UPGRADES ---
  {
    id: 'global_1',
    name: 'Farinha Dourada',
    description: 'Produção global de coxinhas +10%.',
    type: 'global',
    cost: 1000000,
    multiplier: 1.1,
    purchased: false,
    unlockCondition: 0
  },
  {
    id: 'lucky_day',
    name: 'Dia de Sorte',
    description: 'Coxinhas Douradas aparecem 2x mais frequentemente.',
    type: 'golden',
    cost: 777777,
    multiplier: 2,
    purchased: false,
    unlockCondition: 1000
  },
  {
    id: 'serendipity',
    name: 'Serendipidade',
    description: 'Coxinhas Douradas aparecem com muito mais frequência.',
    type: 'golden',
    cost: 77777777,
    multiplier: 2,
    purchased: false,
    unlockCondition: 10000
  },

  // --- SYNERGY UPGRADES (Examples) ---
  {
    id: 'syn_grandma_stand',
    name: 'Vovós na Feira',
    description: 'Vovós ajudam nas Barracas (Barracas x1.5).',
    type: 'building', // Simplified as direct buff for now, ideally complex logic
    triggerBuildingId: 'stand',
    cost: 10000000,
    multiplier: 1.5,
    purchased: false,
    unlockCondition: 50 // Needs 50 grandmas ideally
  },
  
  // --- HIGH TIER BUILDINGS ---
  {
    id: 'franchise_1',
    name: 'CEO da Coxinha',
    description: 'Franquias lucram 2x mais.',
    type: 'building',
    triggerBuildingId: 'franchise',
    cost: 3300000000,
    multiplier: 2,
    purchased: false,
    unlockCondition: 5
  },
  {
    id: 'quantum_yeast',
    name: 'Fermento Quântico',
    description: 'Fazenda Quântica 2x mais eficiente.',
    type: 'building',
    triggerBuildingId: 'quantum_farm',
    cost: 750000000000,
    multiplier: 2,
    purchased: false,
    unlockCondition: 1
  },
  {
    id: 'portal_1',
    name: 'Dimensão Catupiry',
    description: 'Portais produzem 2x mais.',
    type: 'building',
    triggerBuildingId: 'portal',
    cost: 10000000000000,
    multiplier: 2,
    purchased: false,
    unlockCondition: 1
  },
  {
    id: 'time_1',
    name: 'Paradoxo da Fritura',
    description: 'Máquinas do Tempo produzem 2x mais.',
    type: 'building',
    triggerBuildingId: 'time_machine',
    cost: 140000000000000,
    multiplier: 2,
    purchased: false,
    unlockCondition: 1
  }
];