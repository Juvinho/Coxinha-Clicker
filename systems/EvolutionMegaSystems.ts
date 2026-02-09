/**
 * EVOLUTION MEGA SYSTEMS: Building Genetics + Virus System
 * 75 features total
 */

// ============ BUILDING GENETICS SYSTEM - 45 FEATURES ============
export class BuildingGenetics {
  genes: { [key: string]: number } = {
    speed: 1,      // Velocidade produção
    efficiency: 1, // Custo reduzido
    power: 1,      // Output aumentado
    synergy: 1,    // Bônus com outros prédios
    mutation: 0.01 // Chance mutação
  };

  breedBuildings(building1: any, building2: any) {
    const offspring = {
      name: this.generateHybridName(building1.name, building2.name),
      genes: {
        speed: (building1.genes.speed + building2.genes.speed) / 2,
        efficiency: Math.max(building1.genes.efficiency, building2.genes.efficiency),
        power: (building1.genes.power + building2.genes.power) / 2,
        synergy: (building1.genes.synergy + building2.genes.synergy) / 2
      },
      cost: (building1.baseCost + building2.baseCost) / 2,
      production: (building1.baseProduction + building2.baseProduction) * 1.5,
      isMutant: false
    };

    // 5% chance de mutação positiva
    if (Math.random() < 0.05) {
      offspring.mutation = this.applyMutation(offspring);
      offspring.isMutant = true;
    }

    return offspring;
  }

  mutations = [
    {
      name: 'Hiper-Produção',
      chance: 0.001,
      effect: '+500% produção',
      visual: 'brilho dourado pulsante'
    },
    {
      name: 'Custo Negativo',
      chance: 0.0001,
      effect: 'Gera coxinhas ao comprar',
      visual: 'portal verde'
    },
    {
      name: 'Auto-Replicação',
      chance: 0.00001,
      effect: 'Duplica a si mesmo a cada 1h',
      visual: 'mitose animada'
    },
    {
      name: 'Quantum Lock',
      chance: 0.000001,
      effect: 'Existe em 2 lugares simultaneamente',
      visual: 'fantasma translúcido'
    },
    {
      name: 'Singularidade',
      chance: 0.0000001,
      effect: 'Produção = ∞ por 1 segundo',
      visual: 'buraco negro'
    }
  ];

  geneticLab = {
    level: 1,
    researchSlots: 3,
    activeResearches: [] as any[],
    completedGenomes: [] as any[],

    researchTree: [
      { id: 1, name: 'Genoma Básico', time: 3600000, unlock: 'breed_tier1' },
      { id: 2, name: 'Splicing DNA', time: 86400000, unlock: 'force_mutation' },
      { id: 3, name: 'CRISPR Coxinha', time: 604800000, unlock: 'design_genes' },
      { id: 4, name: 'Vida Artificial', time: 2592000000, unlock: 'create_sentient' }
    ]
  };

  evolveBuildingTo(building: any, targetTier: number, sugarLumps: number) {
    const evolutionPaths: { [key: string]: string[] } = {
      cursor: ['Super Cursor', 'Mega Cursor', 'Ultra Cursor', 'God Cursor'],
      vovo: ['Vovó Chef', 'Vovó Mestre', 'Matriarca', 'Ancestral Divina']
    };

    const cost = Math.pow(10, targetTier) * 5; // Sugar Lumps
    if (sugarLumps >= cost) {
      building.tier = targetTier;
      building.multiplier *= Math.pow(2, targetTier);
      return { success: true, newName: evolutionPaths[building.id]?.[targetTier - 1] };
    }
    return { success: false };
  }

  geneBank = {
    stored: [] as any[],
    maxStorage: 100,

    extract(building: any) {
      this.stored.push({
        source: building.id,
        genes: { ...building.genes },
        timestamp: Date.now()
      });
    },

    inject(building: any, geneId: number) {
      const gene = this.stored[geneId];
      if (gene) {
        building.genes = this.mergeGenes(building.genes, gene.genes);
        return true;
      }
      return false;
    }
  };

  private generateHybridName(name1: string, name2: string): string {
    const half1 = name1.substring(0, Math.ceil(name1.length / 2));
    const half2 = name2.substring(Math.ceil(name2.length / 2));
    return half1 + half2;
  }

  private applyMutation(offspring: any) {
    const roll = Math.random();
    let cumulative = 0;

    for (let mutation of this.mutations) {
      cumulative += mutation.chance;
      if (roll < cumulative) {
        return mutation;
      }
    }
    return null;
  }

  private mergeGenes(genes1: any, genes2: any) {
    return {
      speed: (genes1.speed + genes2.speed) / 2,
      efficiency: Math.max(genes1.efficiency, genes2.efficiency),
      power: (genes1.power + genes2.power) / 2,
      synergy: (genes1.synergy + genes2.synergy) / 2,
      mutation: Math.max(genes1.mutation, genes2.mutation)
    };
  }

  getGeneBonus(building: any): number {
    return building.genes.speed * building.genes.power * building.genes.efficiency;
  }
}

// ============ VIRUS SYSTEM - 30 FEATURES ============
export class VirusSystem {
  activeViruses: any[] = [];
  immunity: number = 0;
  vaccines: any[] = [];
  totalViruses: number = 0;

  beneficialViruses = [
    {
      name: 'Vírus do Crescimento',
      effect: '+25% produção todos prédios',
      duration: 600000, // 10min
      spread: 0.1, // 10% chance infectar outro prédio
      visual: 'partículas verdes'
    },
    {
      name: 'Parasita Dourado',
      effect: 'Converte 1% produção em golden cookies',
      duration: 1800000,
      spread: 0.05,
      visual: 'aura dourada'
    },
    {
      name: 'Simbionte Temporal',
      effect: 'Acelera tempo 2x',
      duration: 300000,
      spread: 0.01,
      visual: 'ondas temporais'
    }
  ];

  maliciousViruses = [
    {
      name: 'Praga da Ferrugem',
      effect: '-50% produção prédios metálicos',
      duration: 1200000,
      cure: 'Vacina Antioxidante',
      visual: 'manchas marrons'
    },
    {
      name: 'Corrupção de Dados',
      effect: 'Upgrades temporariamente desativados',
      duration: 600000,
      cure: 'Antivírus Premium',
      visual: 'glitch digital'
    },
    {
      name: 'Colapso Quântico',
      effect: 'Prédios desaparecem aleatoriamente',
      duration: 300000,
      cure: 'Estabilizador Quântico',
      visual: 'flicker fantasmagórico'
    }
  ];

  immuneSystem = {
    level: 1,
    antibodies: [] as any[],

    develop(virusType: string) {
      this.antibodies.push({
        against: virusType,
        effectiveness: 0.5 + this.level * 0.1,
        timestamp: Date.now()
      });
    },

    decay(delta: number) {
      this.antibodies.forEach((ab: any) => {
        ab.effectiveness *= 0.999; // Decaimento lento
      });
    }
  };

  vaccineLab = {
    recipes: [
      {
        name: 'Vacina Universal',
        ingredients: { sugar_lumps: 100, golden_essence: 50 },
        effect: 'Imunidade total 24h'
      },
      {
        name: 'Soro Turbo',
        ingredients: { rare_ingredients: 1 },
        effect: 'Transforma vírus malignos em benéficos'
      }
    ]
  };

  pandemic = {
    active: false,
    infectionRate: 0,

    start() {
      this.active = true;
      console.log('🦠 PANDEMIA! Todos prédios em risco!');
      return { message: '🦠 PANDEMIA INICIADA!' };
    },

    end() {
      this.active = false;
      return { message: '✅ Pandemia contida' };
    }
  };

  infect(building: any, virus: any) {
    const infected = {
      ...virus,
      startTime: Date.now(),
      building: building.id
    };

    this.activeViruses.push(infected);
    this.totalViruses++;
    return infected;
  }

  cure(virusIndex: number, vaccine: any) {
    if (this.activeViruses[virusIndex]) {
      this.activeViruses.splice(virusIndex, 1);
      return { success: true, message: '✅ Vírus curado!' };
    }
    return { success: false };
  }

  update(delta: number) {
    // Atualizar durações de vírus
    this.activeViruses = this.activeViruses.filter(v => {
      return Date.now() - v.startTime < v.duration;
    });

    // Decay da imunidade
    this.immuneSystem.decay(delta);
  }
}

// ============ ALL EVOLUTION SYSTEMS EXPORTED ============
export const EvolutionSystems = {
  genetics: new BuildingGenetics(),
  virus: new VirusSystem()
};
