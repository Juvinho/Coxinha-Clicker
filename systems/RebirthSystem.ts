// ============================================
// REBIRTH SYSTEM - FRAGMENTOS DE ÓLEO QUENTE
// ============================================

export interface Galaxy {
  id: string;
  name: string;
  icon: string;
  description: string;
  cost: number;
  unlocked: boolean;
  bonuses: {
    cps_mult?: number;
    click_mult?: number;
    upgrade_discount?: number;
    golden_cookie_freq?: number;
    golden_cookie_effect?: number;
    building_efficiency?: number;
    research_speed?: number;
    fragment_gain?: number;
    all_buildings?: number;
    all_multipliers?: number;
    synergy_bonus?: number;
    perfect_symmetry?: boolean;
    rebirth_no_reset?: boolean;
    infinite_exploration?: boolean;
    cosmic_ascension?: boolean;
    dark_matter_unlock?: boolean;
  };
  planets: number;
  systems: string[];
  exploration: number;
  requirements?: {
    rebirth?: number;
    andromeda_explored?: number;
    galaxies_owned?: number;
    total_fragments?: number;
    planets_visited?: number;
    golden_cookies_clicked?: number;
    time_played?: number;
    all_galaxies_100?: boolean;
  };
  special?: boolean;
  legendary?: boolean;
  endgame?: boolean;
}

export interface GalaxyUpgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  unlocked: boolean;
  requirement?: string;
  effect: () => void;
}

export interface Planet {
  name: string;
  bonus: string;
  value: number;
  galaxy: string;
}

export interface CosmicResource {
  [key: string]: number;
}

export interface RebirthSaveData {
  hotOilFragments: number;
  rebirthCount: number;
  galaxiesUnlocked: string[];
  currentGalaxy: string;
  planetsVisited: Planet[];
  galaxies: {
    [key: string]: {
      unlocked: boolean;
      exploration: number;
    };
  };
  galaxyUpgrades: {
    [key: string]: boolean;
  };
}

export class RebirthSystem {
  hotOilFragments: number = 0;
  rebirthCount: number = 0;
  galaxiesUnlocked: string[] = [];
  currentGalaxy: string = 'via_lactea';
  planetsVisited: Planet[] = [];
  fragmentMultiplier: number = 1.0;
  cosmicResources: CosmicResource = {};

  galaxies: { [key: string]: Galaxy } = {
    via_lactea: {
      id: 'via_lactea',
      name: 'Via Láctea',
      icon: '🌌',
      description: 'Nossa galáxia natal',
      cost: 0,
      unlocked: true,
      bonuses: { cps_mult: 1.0 },
      planets: 8,
      systems: ['sistema_solar'],
      exploration: 0
    },

    andromeda: {
      id: 'andromeda',
      name: 'Andrômeda',
      icon: '🌀',
      description: 'Galáxia espiral vizinha',
      cost: 10,
      unlocked: false,
      bonuses: { cps_mult: 2.0, click_mult: 1.5 },
      planets: 15,
      systems: ['alpha_centauri', 'proxima'],
      exploration: 0,
      requirements: { rebirth: 1 }
    },

    triangulum: {
      id: 'triangulum',
      name: 'Triângulo',
      icon: '🔺',
      description: 'Galáxia triangular misteriosa',
      cost: 25,
      unlocked: false,
      bonuses: { cps_mult: 3.0, upgrade_discount: 0.1 },
      planets: 20,
      systems: ['gamma_sector', 'delta_prime'],
      exploration: 0,
      requirements: { rebirth: 2, andromeda_explored: 50 }
    },

    sombrero: {
      id: 'sombrero',
      name: 'Sombrero',
      icon: '🎩',
      description: 'Galáxia com anel brilhante',
      cost: 50,
      unlocked: false,
      bonuses: { cps_mult: 5.0, golden_cookie_freq: 1.5 },
      planets: 30,
      systems: ['core_systems', 'outer_rim'],
      exploration: 0,
      requirements: { rebirth: 5, galaxies_owned: 3 }
    },

    whirlpool: {
      id: 'whirlpool',
      name: 'Redemoinho',
      icon: '🌊',
      description: 'Galáxia espiral perfeita',
      cost: 100,
      unlocked: false,
      bonuses: { cps_mult: 10.0, prestige_mult: 1.2 },
      planets: 50,
      systems: ['vortex_hub', 'spiral_arms'],
      exploration: 0,
      requirements: { rebirth: 10, total_fragments: 200 }
    },

    cartwheel: {
      id: 'cartwheel',
      name: 'Roda de Carroça',
      icon: '⭕',
      description: 'Galáxia em forma de anel',
      cost: 250,
      unlocked: false,
      bonuses: { cps_mult: 25.0, building_efficiency: 1.5 },
      planets: 75,
      systems: ['rim_sector', 'hub_zone'],
      exploration: 0,
      requirements: { rebirth: 20, planets_visited: 50 }
    },

    pinwheel: {
      id: 'pinwheel',
      name: 'Cata-Vento',
      icon: '🎡',
      description: 'Galáxia com braços distintivos',
      cost: 500,
      unlocked: false,
      bonuses: { cps_mult: 50.0, research_speed: 2.0 },
      planets: 100,
      systems: ['blade_systems', 'core_nexus'],
      exploration: 0,
      requirements: { rebirth: 35, galaxies_owned: 6 }
    },

    black_eye: {
      id: 'black_eye',
      name: 'Olho Negro',
      icon: '👁️',
      description: 'Galáxia com núcleo escuro',
      cost: 1000,
      unlocked: false,
      bonuses: { cps_mult: 100.0, fragment_gain: 1.5, dark_matter_unlock: true },
      planets: 150,
      systems: ['dark_core', 'shadow_sector'],
      exploration: 0,
      requirements: { rebirth: 50, total_fragments: 2000 }
    },

    sunflower: {
      id: 'sunflower',
      name: 'Girassol',
      icon: '🌻',
      description: 'Galáxia dourada radiante',
      cost: 2500,
      unlocked: false,
      bonuses: { cps_mult: 250.0, golden_cookie_effect: 2.0, all_buildings: 1.25 },
      planets: 200,
      systems: ['golden_petals', 'solar_heart'],
      exploration: 0,
      requirements: { rebirth: 75, golden_cookies_clicked: 1000 }
    },

    tadpole: {
      id: 'tadpole',
      name: 'Girino',
      icon: '🐸',
      description: 'Galáxia com cauda distorcida',
      cost: 5000,
      unlocked: false,
      bonuses: { cps_mult: 500.0, evolution_speed: 3.0 },
      planets: 300,
      systems: ['head_cluster', 'tail_stream'],
      exploration: 0,
      requirements: { rebirth: 100, time_played: 360000000 }
    },

    antennae: {
      id: 'antennae',
      name: 'Antenas',
      icon: '📡',
      description: 'Galáxias colidindo',
      cost: 10000,
      unlocked: false,
      bonuses: { cps_mult: 1000.0, synergy_bonus: 2.0 },
      planets: 500,
      systems: ['collision_zone', 'merger_field'],
      exploration: 0,
      requirements: { rebirth: 150, galaxies_owned: 10 },
      special: true
    },

    hoags_object: {
      id: 'hoags_object',
      name: 'Objeto de Hoag',
      icon: '💍',
      description: 'Galáxia anelar perfeita',
      cost: 25000,
      unlocked: false,
      bonuses: { cps_mult: 2500.0, perfect_symmetry: true, all_multipliers: 1.5 },
      planets: 750,
      systems: ['ring_perfect', 'void_center'],
      exploration: 0,
      requirements: { rebirth: 200, total_fragments: 50000 },
      special: true,
      legendary: true
    },

    phoenix: {
      id: 'phoenix',
      name: 'Fênix',
      icon: '🔥',
      description: 'Galáxia renascida das cinzas',
      cost: 100000,
      unlocked: false,
      bonuses: {
        cps_mult: 10000.0,
        rebirth_no_reset: true,
        infinite_exploration: true,
        cosmic_ascension: true
      },
      planets: 9999,
      systems: ['eternal_flame', 'rebirth_core'],
      exploration: 0,
      requirements: { rebirth: 500, all_galaxies_100: true, total_fragments: 500000 },
      special: true,
      legendary: true,
      endgame: true
    }
  };

  galaxyUpgrades: { [key: string]: GalaxyUpgrade } = {
    stellar_forge: {
      id: 'stellar_forge',
      name: 'Forja Estelar',
      description: 'Prédios produzem 2x mais',
      cost: 50,
      unlocked: false,
      effect: () => {
        console.log('Stellar Forge activated: 2x building production');
      }
    },

    cosmic_oven: {
      id: 'cosmic_oven',
      name: 'Forno Cósmico',
      description: 'Vovós produzem 5x mais',
      cost: 100,
      unlocked: false,
      effect: () => {
        console.log('Cosmic Oven activated: 5x grandma production');
      }
    },

    dark_matter_fryer: {
      id: 'dark_matter_fryer',
      name: 'Fritadeira de Matéria Escura',
      description: 'CpS x10',
      cost: 500,
      unlocked: false,
      requirement: 'black_eye_unlocked',
      effect: () => {
        console.log('Dark Matter Fryer activated: 10x CpS');
      }
    },

    quantum_dough: {
      id: 'quantum_dough',
      name: 'Massa Quântica',
      description: 'Cliques 100x mais poderosos',
      cost: 250,
      unlocked: false,
      effect: () => {
        console.log('Quantum Dough activated: 100x click power');
      }
    },

    multiverse_recipe: {
      id: 'multiverse_recipe',
      name: 'Receita Multiversal',
      description: 'Todos multiplicadores +50%',
      cost: 1000,
      unlocked: false,
      requirement: 'galaxies_owned_10',
      effect: () => {
        console.log('Multiverse Recipe activated: +50% all multipliers');
      }
    },

    eternal_flame: {
      id: 'eternal_flame',
      name: 'Chama Eterna',
      description: 'Fragmentos +100% em rebirths',
      cost: 5000,
      unlocked: false,
      requirement: 'phoenix_unlocked',
      effect: () => {
        this.fragmentMultiplier = 2.0;
        console.log('Eternal Flame activated: 2x fragment gain');
      }
    }
  };

  calculateRebirthGain(totalCoxinhas: number, prestige: number): number {
    if (totalCoxinhas < 1e24) return 0;

    const baseFragments = Math.sqrt(totalCoxinhas / 1e24);
    const prestigeBonus = 1 + prestige / 10;
    const fragments = Math.floor(baseFragments * prestigeBonus * this.fragmentMultiplier);

    return fragments;
  }

  checkGalaxyRequirements(galaxy: Galaxy, stats: any): boolean {
    if (!galaxy.requirements) return true;

    const req = galaxy.requirements;

    if (req.rebirth && this.rebirthCount < req.rebirth) return false;
    if (req.galaxies_owned && this.galaxiesUnlocked.length < req.galaxies_owned) return false;

    if (req.total_fragments) {
      const totalFragments = stats.totalFragmentsEarned || 0;
      if (totalFragments < req.total_fragments) return false;
    }

    if (req.andromeda_explored) {
      const andromedaGalaxy = this.galaxies['andromeda'];
      if (!andromedaGalaxy || andromedaGalaxy.exploration < req.andromeda_explored) return false;
    }

    if (req.planets_visited && this.planetsVisited.length < req.planets_visited) return false;

    if (req.golden_cookies_clicked) {
      const clicked = stats.goldenCookiesClicked || 0;
      if (clicked < req.golden_cookies_clicked) return false;
    }

    if (req.time_played) {
      const played = stats.timePlayed || 0;
      if (played < req.time_played) return false;
    }

    if (req.all_galaxies_100) {
      const allComplete = this.galaxiesUnlocked.every(id => {
        const g = this.galaxies[id];
        return g && g.exploration >= 100;
      });
      if (!allComplete) return false;
    }

    return true;
  }

  discoverPlanet(galaxy: Galaxy): Planet {
    const planetTypes: Array<Omit<Planet, 'galaxy'>> = [
      { name: 'Terra Árida', bonus: 'cps', value: 1.05 },
      { name: 'Gigante Gasoso', bonus: 'click', value: 1.1 },
      { name: 'Mundo Oceânico', bonus: 'production', value: 1.03 },
      { name: 'Lua Gelada', bonus: 'golden', value: 1.05 },
      { name: 'Mundo Vulcânico', bonus: 'fragments', value: 1.02 }
    ];

    const planet = planetTypes[Math.floor(Math.random() * planetTypes.length)];
    const result: Planet = { ...planet, galaxy: galaxy.id };

    this.planetsVisited.push(result);
    return result;
  }

  findResource(galaxy: Galaxy): { name: string; amount: number } {
    const resources = [
      { name: 'Matéria Estelar', amount: Math.floor(Math.random() * 10) + 1 },
      { name: 'Poeira Cósmica', amount: Math.floor(Math.random() * 50) + 10 },
      { name: 'Antimatéria', amount: Math.floor(Math.random() * 5) + 1 },
      { name: 'Energia Escura', amount: Math.floor(Math.random() * 3) + 1 }
    ];

    const resource = resources[Math.floor(Math.random() * resources.length)];

    this.cosmicResources[resource.name] = (this.cosmicResources[resource.name] || 0) + resource.amount;

    return resource;
  }

  save(): RebirthSaveData {
    return {
      hotOilFragments: this.hotOilFragments,
      rebirthCount: this.rebirthCount,
      galaxiesUnlocked: this.galaxiesUnlocked,
      currentGalaxy: this.currentGalaxy,
      planetsVisited: this.planetsVisited,
      galaxies: Object.keys(this.galaxies).reduce((acc, key) => {
        acc[key] = {
          unlocked: this.galaxies[key].unlocked,
          exploration: this.galaxies[key].exploration
        };
        return acc;
      }, {} as any),
      galaxyUpgrades: Object.keys(this.galaxyUpgrades).reduce((acc, key) => {
        acc[key] = this.galaxyUpgrades[key].unlocked;
        return acc;
      }, {} as any)
    };
  }

  load(data: RebirthSaveData | null): void {
    if (!data) return;

    this.hotOilFragments = data.hotOilFragments || 0;
    this.rebirthCount = data.rebirthCount || 0;
    this.galaxiesUnlocked = data.galaxiesUnlocked || [];
    this.currentGalaxy = data.currentGalaxy || 'via_lactea';
    this.planetsVisited = data.planetsVisited || [];

    if (data.galaxies) {
      Object.keys(data.galaxies).forEach(key => {
        if (this.galaxies[key]) {
          this.galaxies[key].unlocked = data.galaxies[key].unlocked;
          this.galaxies[key].exploration = data.galaxies[key].exploration || 0;
        }
      });
    }

    if (data.galaxyUpgrades) {
      Object.keys(data.galaxyUpgrades).forEach(key => {
        if (this.galaxyUpgrades[key]) {
          this.galaxyUpgrades[key].unlocked = data.galaxyUpgrades[key];
        }
      });
    }
  }
}

export default RebirthSystem;
