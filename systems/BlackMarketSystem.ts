/**
 * Black Market System
 * Underground economy with risky high-reward trades
 * 10 unique features for illicit dealings
 */

interface BlackMarketItem {
  id: string;
  name: string;
  description: string;
  cost: number;
  reward: {
    coxinhas?: number;
    cps?: number;
    multiplier?: number;
    risk?: number; // 0-100 percentage
  };
  icon: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
  cooldown: number;
  lastBought?: number;
  isBanned: boolean;
}

export class BlackMarketSystem {
  items: Map<string, BlackMarketItem> = new Map();
  reputation: number = 0; // -100 to +100
  isHunted: boolean = false;
  huntTimer: number = 0;
  totalRiskyTrades: number = 0;
  bustedCount: number = 0;

  callbacks = {
    onTradeComplete: (item: BlackMarketItem, success: boolean) => {},
    onBusted: () => {},
    onReputationChange: (newRep: number) => {},
  };

  constructor() {
    this.initializeMarket();
  }

  // Feature 1: Initialize black market items
  private initializeMarket() {
    const items: BlackMarketItem[] = [
      {
        id: 'hot_coxinhas',
        name: 'Coxinhas Quentes',
        description: 'Lotes roubados de coxinhas de alta qualidade',
        cost: 100000000,
        reward: { coxinhas: 500000000, risk: 20 },
        icon: '🔥',
        rarity: 'uncommon',
        cooldown: 300,
        isBanned: false,
      },
      {
        id: 'fake_upgrades',
        name: 'Upgrades Falsos',
        description: 'Multiplicadores duplicados (pode não funcionar)',
        cost: 50000000,
        reward: { multiplier: 1.5, risk: 40 },
        icon: '🎭',
        rarity: 'rare',
        cooldown: 600,
        isBanned: false,
      },
      {
        id: 'speed_hack',
        name: 'Hack de Velocidade',
        description: '10x CPS por 1 minuto (depois volta ao normal)',
        cost: 200000000,
        reward: { cps: 10, risk: 50 },
        icon: '⚡',
        rarity: 'rare',
        cooldown: 1800,
        isBanned: true,
      },
      {
        id: 'duplication_glitch',
        name: 'Bug de Duplicação',
        description: 'Duplique sua riqueza (risco de PERDER TUDO)',
        cost: 500000000,
        reward: { coxinhas: 1000000000, risk: 60 },
        icon: '💣',
        rarity: 'legendary',
        cooldown: 3600,
        isBanned: true,
      },
      {
        id: 'insider_info',
        name: 'Informação Privilegiada',
        description: 'Stock tips from the underworld',
        cost: 75000000,
        reward: { cps: 2, risk: 25 },
        icon: '🤐',
        rarity: 'uncommon',
        cooldown: 900,
        isBanned: false,
      },
      {
        id: 'black_money',
        name: 'Dinheiro Sujo',
        description: 'Coxinhas lavadas (sem trace)',
        cost: 30000000,
        reward: { coxinhas: 150000000, risk: 15 },
        icon: '💼',
        rarity: 'common',
        cooldown: 600,
        isBanned: false,
      },
      {
        id: 'time_skip',
        name: 'Time Skip Potion',
        description: 'Pule 1 hora de produção',
        cost: 300000000,
        reward: { coxinhas: 0, risk: 35 },
        icon: '⏩',
        rarity: 'rare',
        cooldown: 2400,
        isBanned: true,
      },
      {
        id: 'reverse_transaction',
        name: 'Transação Reversa',
        description: 'Desfaça sua última compra grande',
        cost: 100000000,
        reward: { coxinhas: 0, risk: 20 },
        icon: '↩️',
        rarity: 'uncommon',
        cooldown: 1200,
        isBanned: false,
      },
      {
        id: 'immunity_deal',
        name: 'Acordo de Imunidade',
        description: 'Proteção contra bans por 24 horas',
        cost: 150000000,
        reward: { risk: 10 },
        icon: '🛡️',
        rarity: 'rare',
        cooldown: 86400,
        isBanned: false,
      },
      {
        id: 'total_wipeout',
        name: 'Total Wipeout Deal',
        description: 'Perder tudo por RECOMPENSA LENDÁRIA (tipo prestige)',
        cost: 0,
        reward: { coxinhas: 100000000000, risk: 100 },
        icon: '💣💥',
        rarity: 'legendary',
        cooldown: 0,
        isBanned: true,
      },
    ];

    items.forEach(item => {
      this.items.set(item.id, item);
    });
  }

  // Feature 2: Buy from black market
  buyItem(itemId: string, playerCoxinhas: number): { success: boolean; result: string; reward: any } {
    const item = this.items.get(itemId);
    if (!item) return { success: false, result: 'Item não existe', reward: null };

    // Check if banned
    if (item.isBanned && this.isHunted) {
      return { success: false, result: 'FBI! Você foi preso!', reward: null };
    }

    // Check cooldown
    if (item.lastBought && Date.now() - item.lastBought < item.cooldown * 1000) {
      return { success: false, result: 'Tem que esperar mais...', reward: null };
    }

    // Check funds
    if (playerCoxinhas < item.cost) {
      return { success: false, result: 'Fundos insuficientes', reward: null };
    }

    // Risk check
    const riskCheck = Math.random() * 100;
    const riskValue = item.reward.risk || 0;

    item.lastBought = Date.now();
    this.totalRiskyTrades++;

    if (riskCheck < riskValue) {
      // GOT BUSTED
      this.bustedCount++;
      this.isHunted = true;
      this.huntTimer = 600; // 10 minutes
      this.reputation -= 20;

      this.callbacks.onBusted?.();
      this.callbacks.onReputationChange?.(this.reputation);

      return { success: false, result: '🚨 PRESO PELA POLÍCIA! 🚨', reward: null };
    }

    // Success!
    this.reputation = Math.min(100, this.reputation + 5);
    this.callbacks.onTradeComplete?.(item, true);
    this.callbacks.onReputationChange?.(this.reputation);

    return {
      success: true,
      result: `Negócio realizado! ${item.name}`,
      reward: item.reward,
    };
  }

  // Feature 3: Get wanted level
  getWantedLevel(): number {
    // 0-5 stars
    if (!this.isHunted || this.huntTimer <= 0) return 0;

    const crimes = Math.min(this.bustedCount, 5);
    return crimes;
  }

  // Feature 4: Update hunt timer
  updateHuntStatus(deltaTime: number) {
    if (this.isHunted && this.huntTimer > 0) {
      this.huntTimer -= deltaTime;

      if (this.huntTimer <= 0) {
        this.isHunted = false;
        this.huntTimer = 0;
      }
    }
  }

  // Feature 5: Get item info
  getItemInfo(itemId: string): BlackMarketItem | null {
    return this.items.get(itemId) || null;
  }

  // Feature 6: Get available items (not in cooldown)
  getAvailableItems(): BlackMarketItem[] {
    return Array.from(this.items.values()).filter(item => {
      if (!item.lastBought) return true;
      return Date.now() - item.lastBought >= item.cooldown * 1000;
    });
  }

  // Feature 7: Get reputation level
  getReputationLevel(): string {
    const levels: { [key: number]: string } = {
      100: '🤴 Chefão da Máfia',
      50: '👑 Respeitado Mesmo',
      25: '💼 Confiável',
      0: '⚪ Neutro',
      -25: '⚠️ Suspeito',
      -50: '👮 Procurado',
      -100: '🚔 Procurado Nível Máximo',
    };

    for (let threshold of Object.keys(levels)
      .map(Number)
      .sort((a, b) => b - a)) {
      if (this.reputation >= threshold) {
        return levels[threshold];
      }
    }

    return '🚔 INIMIGO PÚBLICO #1';
  }

  // Feature 8: Discount based on reputation
  getDiscount(): number {
    // Higher rep = more discounts
    return Math.max(0, this.reputation / 100) * 0.5; // Up to 50% off
  }

  // Feature 9: Risk mitigation
  getInsurancePrice(itemCost: number): number {
    // Can buy insurance to reduce risk
    return itemCost * 0.3; // 30% of item cost
  }

  // Feature 10: Secret ending - become crime lord
  isCrimeLord(): boolean {
    return (
      this.totalRiskyTrades > 100 &&
      this.reputation > 80 &&
      this.bustedCount === 0
    );
  }

  // Hidden feature: East egg
  unlockSecretDeal(): BlackMarketItem | null {
    if (this.isCrimeLord()) {
      return {
        id: 'crime_lord_deal',
        name: 'CRIME LORD FINAL DEAL',
        description: 'Você se tornou o Senhor do Crime. Take over the world!',
        cost: 0,
        reward: { coxinhas: 999999999999999, multiplier: 100 },
        icon: '👿',
        rarity: 'legendary',
        cooldown: 0,
        isBanned: true,
      };
    }

    return null;
  }
}
