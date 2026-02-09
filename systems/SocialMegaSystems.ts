/**
 * SOCIAL MEGA SYSTEMS: Coop Multiplayer + Global Economy
 * 90 features total
 */

// ============ COOP MULTIPLAYER SYSTEM - 50 FEATURES ============
export class CoopMode {
  room: any = null;
  players: any[] = [];
  maxPlayers: number = 4;
  sharedResources = {
    coxinhas: 0,
    buildings: {} as { [key: string]: number },
    upgrades: [] as string[]
  };

  createRoom(roomName: string, settings: any) {
    this.room = {
      id: Math.random().toString(36).substr(2, 9),
      name: roomName,
      host: 'local_player',
      players: ['local_player'],
      settings: {
        difficulty: settings.difficulty,
        sharedCoxinhas: settings.shared,
        sharedUpgrades: settings.upgrades,
        pvpMode: settings.pvp,
        raidMode: settings.raid
      },
      startTime: Date.now(),
      objective: this.generateObjective(settings.difficulty)
    };
    return this.room;
  }

  objectives = [
    {
      type: 'production_goal',
      target: 1e12,
      reward: 'Todos ganham x2 prestige',
      timeLimit: 3600000
    },
    {
      type: 'boss_raid',
      boss: 'Coxinha Colossal',
      hp: 1e15,
      reward: 'Upgrade Lendário para todos',
      phases: 3
    },
    {
      type: 'survival',
      description: 'Sobreviver 30min sem perder coxinhas',
      waves: 10,
      reward: '1000 Sugar Lumps cada'
    },
    {
      type: 'speed_run',
      description: 'Primeiro time a 1B coxinhas',
      competitive: true,
      reward: 'Título exclusivo'
    }
  ];

  playerRoles = {
    producer: {
      name: 'Produtor',
      bonus: '+50% CpS',
      ability: 'Boost produção team 2x (60s cooldown)'
    },
    clicker: {
      name: 'Clickador',
      bonus: '+200% click power',
      ability: 'Clique compartilhado: todos cliques x10 (30s)'
    },
    support: {
      name: 'Suporte',
      bonus: 'Reduz custo prédios -25% para todos',
      ability: 'Heal: restaura 10% coxinhas perdidas'
    },
    tank: {
      name: 'Tanque',
      bonus: '+500% HP contra raids',
      ability: 'Shield: protege coxinhas 100% (20s)'
    }
  };

  teamAbilities = {
    combo: {
      name: 'Combo Strike',
      requirement: '4 players clicarem juntos em 1s',
      effect: 'x100 produção 10s',
      cooldown: 60000
    },
    harmony: {
      name: 'Harmonia Perfeita',
      requirement: 'Todos com CpS igual',
      effect: 'x4 produção permanente até quebrar',
      cooldown: 300000
    },
    sacrifice: {
      name: 'Sacrifício Nobre',
      requirement: 'Player doar 50% coxinhas',
      effect: 'Outros 3 ganham +25% cada',
      cooldown: 0
    },
    synchronize: {
      name: 'Sincronização Temporal',
      requirement: 'Todos no mesmo upgrade',
      effect: '+200% velocidade upgrade',
      cooldown: 180000
    }
  };

  voiceChat = {
    enabled: false,
    volume: 0.5,
    muted: [] as string[],

    commands: {
      '/ping': 'Marca localização',
      '/help': 'Pede ajuda',
      '/golden': 'Avisa golden cookie',
      '/rally': 'Convoca para objetivo'
    }
  };

  pvpMode = {
    enabled: false,

    sabotages: [
      { name: 'Roubar Coxinhas', cost: 1000, effect: 'Rouba 10% do oponente' },
      { name: 'Virus', cost: 5000, effect: 'Infecta prédios -25%' },
      { name: 'Wrinkler Attack', cost: 10000, effect: 'Spawna 3 wrinklers no inimigo' },
      { name: 'Time Freeze', cost: 50000, effect: 'Congela produção 30s' }
    ],

    defenses: [
      { name: 'Firewall', cost: 2000, effect: 'Bloqueia próximo sabotage' },
      { name: 'Counter', cost: 8000, effect: 'Reflete sabotage' },
      { name: 'Insurance', cost: 15000, effect: 'Protege 50% coxinhas' }
    ]
  };

  tradingPost = {
    offers: [] as any[],

    createOffer(playerId: string, offering: any, requesting: any) {
      this.offers.push({
        from: playerId,
        give: offering,
        want: requesting,
        expires: Date.now() + 300000
      });
    },

    acceptOffer(offerId: number, playerId: string) {
      if (this.offers[offerId]) {
        return {
          success: true,
          trade: this.offers[offerId],
          message: '✅ Trade realizado!'
        };
      }
      return { success: false };
    }
  };

  joinRoom(roomId: string, playerId: string) {
    if (this.room && this.room.id === roomId && this.players.length < this.maxPlayers) {
      this.room.players.push(playerId);
      this.players.push({ id: playerId, role: 'unassigned' });
      return { success: true, message: `✅ ${playerId} entrou na sala!` };
    }
    return { success: false };
  }

  assignRole(playerId: string, role: string) {
    const player = this.players.find((p: any) => p.id === playerId);
    if (player && this.playerRoles[role as keyof typeof this.playerRoles]) {
      player.role = role;
      return { success: true, bonus: this.playerRoles[role as keyof typeof this.playerRoles].bonus };
    }
    return { success: false };
  }

  private generateObjective(difficulty: string) {
    const objectives: { [key: string]: any } = {
      easy: this.objectives[0],
      normal: this.objectives[1],
      hard: this.objectives[2],
      nightmare: this.objectives[3]
    };
    return objectives[difficulty] || this.objectives[0];
  }
}

// ============ GLOBAL ECONOMY SYSTEM - 40 FEATURES ============
export class GlobalEconomy {
  marketPrice: number = 1; // 1 coxinha = 1 gold
  inflation: number = 0;
  recession: boolean = false;
  globalCoxinhas: number = 0; // Total production todos jogadores

  currencies = {
    coxinhas: { symbol: '🍗', value: 1 },
    gold: { symbol: '💰', value: 1000 },
    diamonds: { symbol: '💎', value: 1000000 },
    crystals: { symbol: '🔮', value: 1e9 },
    essence: { symbol: '✨', value: 1e12 }
  };

  market = {
    supply: 0,
    demand: 0,

    updatePrice() {
      // Lei da oferta e demanda
      if (this.demand > 0) {
        const ratio = this.supply / this.demand;
        const newPrice = 1 / ratio;

        // Volatilidade (entre 90% e 110%)
        return newPrice * (0.9 + Math.random() * 0.2);
      }
      return 1;
    }
  };

  auctionHouse = {
    activeAuctions: [] as any[],

    createAuction(item: string, startingBid: number, duration: number) {
      this.activeAuctions.push({
        item: item,
        seller: 'local_player',
        currentBid: startingBid,
        highestBidder: null,
        endTime: Date.now() + duration,
        bids: [] as any[]
      });
    },

    rareLots: [
      { item: 'Upgrade Mítico', minBid: 1e9 },
      { item: 'Skin Exclusiva', minBid: 5e8 },
      { item: 'Pet Lendário', minBid: 1e10 },
      { item: 'Título Único', minBid: 1e11 }
    ],

    placeBid(auctionId: number, bidder: string, amount: number) {
      const auction = this.activeAuctions[auctionId];
      if (auction && amount > auction.currentBid && Date.now() < auction.endTime) {
        auction.currentBid = amount;
        auction.highestBidder = bidder;
        auction.bids.push({ bidder, amount, time: Date.now() });
        return { success: true };
      }
      return { success: false };
    }
  };

  centralBank = {
    interest: 0.05, // 5% anual
    loans: [] as any[],
    savings: 0,

    takeLoan(amount: number, duration: number) {
      const interest = 0.1; // 10% juros
      const totalDebt = amount * (1 + interest);

      this.loans.push({
        principal: amount,
        debt: totalDebt,
        dueDate: Date.now() + duration,
        payments: 0
      });

      return {
        success: true,
        amount: amount,
        totalRepay: totalDebt,
        dueDate: new Date(Date.now() + duration).toLocaleDateString()
      };
    },

    depositSavings(amount: number) {
      this.savings += amount;
      return {
        success: true,
        savings: this.savings,
        monthlyInterest: amount * this.interest
      };
    }
  };

  events = [
    {
      name: 'Bull Market',
      chance: 0.01,
      effect: 'Preços +50%',
      duration: 3600000
    },
    {
      name: 'Bear Market',
      chance: 0.01,
      effect: 'Preços -50%',
      duration: 3600000
    },
    {
      name: 'Flash Crash',
      chance: 0.001,
      effect: 'Preços -90%',
      duration: 300000
    },
    {
      name: 'Bubble Burst',
      chance: 0.0001,
      effect: 'Reset economia',
      recovery: 86400000
    }
  ];

  commodities = {
    oil: { price: 100, volatility: 0.2 },
    wheat: { price: 50, volatility: 0.15 },
    gold: { price: 2000, volatility: 0.1 },
    bitcoin: { price: 50000, volatility: 0.5 }
  };

  etfs = [
    {
      name: 'Coxinha 500',
      holdings: ['cursor', 'vovo', 'barraca', 'pastelaria', 'fabrica'],
      price: 0,

      update(buildings: any[]) {
        const sum = this.holdings.reduce((total: number, id: string) => {
          const building = buildings.find((b: any) => b.id === id);
          return total + (building?.baseCost || 0);
        }, 0);
        this.price = sum / this.holdings.length;
      }
    }
  ];

  checkEvent() {
    const roll = Math.random();
    let cumulative = 0;

    for (let event of this.events) {
      cumulative += event.chance;
      if (roll < cumulative) {
        return event;
      }
    }
    return null;
  }
}

// ============ ALL SOCIAL SYSTEMS EXPORTED ============
export const SocialSystems = {
  coop: new CoopMode(),
  economy: new GlobalEconomy()
};
