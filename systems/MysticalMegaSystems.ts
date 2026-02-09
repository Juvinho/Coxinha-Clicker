/**
 * MYSTICAL MEGA SYSTEMS: Astrology + Tarot
 * 55 features total
 */

// ============ ASTROLOGY SYSTEM - 25 FEATURES ============
export class AstrologySystem {
  birthChart: any = null;
  currentPhase: string = 'new_moon';
  sign: string = '';
  fortuneThisWeek: string = '';

  zodiacSigns = {
    aries: { element: 'fire', bonus: '+15% click power', planet: 'Mars' },
    taurus: { element: 'earth', bonus: '+10% production', planet: 'Venus' },
    gemini: { element: 'air', bonus: '+20% golden chance', planet: 'Mercury' },
    cancer: { element: 'water', bonus: '+15% wrinkler drops', planet: 'Moon' },
    leo: { element: 'fire', bonus: '+25% prestige', planet: 'Sun' },
    virgo: { element: 'earth', bonus: '-10% building costs', planet: 'Mercury' },
    libra: { element: 'air', bonus: '+10% all synergies', planet: 'Venus' },
    scorpio: { element: 'water', bonus: '+50% virus effects', planet: 'Pluto' },
    sagittarius: { element: 'fire', bonus: '+30% expedition rewards', planet: 'Jupiter' },
    capricorn: { element: 'earth', bonus: '+20% building efficiency', planet: 'Saturn' },
    aquarius: { element: 'air', bonus: '+15% research speed', planet: 'Uranus' },
    pisces: { element: 'water', bonus: '+25% garden growth', planet: 'Neptune' }
  };

  moonPhases = {
    new_moon: { effect: '+50% new beginnings (prestige bonus)', multiplier: 1.5 },
    waxing_crescent: { effect: '+10% growth rate', multiplier: 1.1 },
    first_quarter: { effect: '+15% balance (synergies)', multiplier: 1.15 },
    waxing_gibbous: { effect: '+20% accumulation', multiplier: 1.2 },
    full_moon: { effect: '+100% golden cookies', multiplier: 2 },
    waning_gibbous: { effect: '+25% wisdom (research)', multiplier: 1.25 },
    last_quarter: { effect: '+15% release (sell bonus)', multiplier: 1.15 },
    waning_crescent: { effect: '+10% rest (offline bonus)', multiplier: 1.1 }
  };

  retrograde = {
    mercury: {
      active: false,
      effect: 'Comunicação falha, trades cancelados aleatoriamente'
    },
    venus: {
      active: false,
      effect: 'Amor difícil, vovós -20% produção'
    },
    mars: {
      active: false,
      effect: 'Conflito, clan wars +50% reward'
    },
    jupiter: {
      active: false,
      effect: 'Sorte reversa, golden cookies -50%'
    },
    saturn: {
      active: false,
      effect: 'Restrições, limites de compra'
    }
  };

  dailyHoroscope() {
    const fortunes = [
      '⭐ Dia de sorte! Golden cookies +50%',
      '🌙 Momento de reflexão. Prestige recomendado.',
      '☀️ Energia alta! Click power +100%',
      '🌧️ Dia difícil. Custos +20%',
      '🍀 Trevo de 4 folhas! Evento raro chance +500%',
      '💫 Alinhamento planetário! Tudo x2',
      '🌚 Lua escura. Wrinklers +200%',
      '✨ Magia no ar. Upgrades -50% custo'
    ];

    const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    this.fortuneThisWeek = fortune;
    return fortune;
  }

  getSignBonus(sign: string): string {
    const signData = this.zodiacSigns[sign as keyof typeof this.zodiacSigns];
    return signData ? signData.bonus : 'Sem bônus';
  }

  getMoonMultiplier(): number {
    const phase = this.moonPhases[this.currentPhase as keyof typeof this.moonPhases];
    return phase ? phase.multiplier : 1;
  }

  planetaryAlignment = {
    chance: 0.000001,
    active: false,
    effect: 'TUDO x777 por 7min 77s',
    startTime: 0,
    duration: 467000, // 7min 47s

    check() {
      if (Math.random() < this.chance) {
        this.active = true;
        this.startTime = Date.now();
        return { alignment: true, message: '☄️ ALINHAMENTO PLANETÁRIO! TUDO x777!!!' };
      }
      return { alignment: false };
    },

    update() {
      if (this.active && Date.now() - this.startTime > this.duration) {
        this.active = false;
        return { message: '✨ Alinhamento encerrado' };
      }
      return null;
    }
  };

  seasonalMagic = {
    spring: { bonus: '+50% breeding', color: 'green' },
    summer: { bonus: '+50% production', color: 'gold' },
    autumn: { bonus: '+50% harvest', color: 'orange' },
    winter: { bonus: '+50% prestige', color: 'blue' }
  };

  generateChart() {
    const signs = Object.keys(this.zodiacSigns);
    const randomSign = signs[Math.floor(Math.random() * signs.length)];

    return {
      sun: randomSign,
      moon: signs[Math.floor(Math.random() * signs.length)],
      rising: signs[Math.floor(Math.random() * signs.length)],
      timestamp: Date.now()
    };
  }
}

// ============ TAROT SYSTEM - 30 FEATURES ============
export class TarotSystem {
  deck: any[] = [];
  spread: any[] = [];
  readings: number = 0;
  lastReading: any = null;

  // 22 Arcanos Maiores
  majorArcana = [
    {
      id: 0,
      name: 'O Louco',
      upright: 'Novos começos +50% prestige',
      reversed: 'Risco -25% coxinhas'
    },
    {
      id: 1,
      name: 'O Mago',
      upright: 'Manifestação: próximo upgrade grátis',
      reversed: 'Ilusão: upgrades -50%'
    },
    {
      id: 2,
      name: 'A Sacerdotisa',
      upright: 'Intuição +100% golden',
      reversed: 'Mistério: efeitos aleatórios'
    },
    {
      id: 3,
      name: 'A Imperatriz',
      upright: 'Abundância: vovós x3',
      reversed: 'Escassez: vovós /2'
    },
    {
      id: 4,
      name: 'O Imperador',
      upright: 'Estrutura: prédios +50%',
      reversed: 'Rigidez: prédios travados 1h'
    },
    {
      id: 5,
      name: 'O Hierofante',
      upright: 'Sabedoria: research x2',
      reversed: 'Dogma: research bloqueada'
    },
    {
      id: 6,
      name: 'Os Amantes',
      upright: 'União: breeding +200%',
      reversed: 'Separação: sem breeding'
    },
    {
      id: 7,
      name: 'O Carro',
      upright: 'Vitória: raids +100% reward',
      reversed: 'Derrota: raids fail'
    },
    {
      id: 8,
      name: 'A Força',
      upright: 'Poder: click x5',
      reversed: 'Fraqueza: click /2'
    },
    {
      id: 9,
      name: 'O Eremita',
      upright: 'Isolamento: offline +200%',
      reversed: 'Solidão: sem multiplayer'
    },
    {
      id: 10,
      name: 'Roda da Fortuna',
      upright: 'Sorte: spin wheel x2 rewards',
      reversed: 'Azar: spin wheel nothing'
    },
    {
      id: 11,
      name: 'A Justiça',
      upright: 'Equilíbrio: tudo normalizado',
      reversed: 'Injustiça: buffs viram debuffs'
    },
    {
      id: 12,
      name: 'O Enforcado',
      upright: 'Sacrifício: perde 50% ganha x3',
      reversed: 'Martírio: perde tudo'
    },
    {
      id: 13,
      name: 'A Morte',
      upright: 'Transformação: ascensão forçada +100%',
      reversed: 'Estagnação: sem progresso 1h'
    },
    {
      id: 14,
      name: 'A Temperança',
      upright: 'Moderação: tudo +25%',
      reversed: 'Excesso: tudo -25%'
    },
    {
      id: 15,
      name: 'O Diabo',
      upright: 'Obsessão: grandmapocalypse x2',
      reversed: 'Libertação: cura grandma'
    },
    {
      id: 16,
      name: 'A Torre',
      upright: 'Destruição: perde 90% ganha x10 prestige',
      reversed: 'Catástrofe: reset forçado'
    },
    {
      id: 17,
      name: 'A Estrela',
      upright: 'Esperança: next 10 golden guaranteed',
      reversed: 'Desesperança: no golden 1h'
    },
    {
      id: 18,
      name: 'A Lua',
      upright: 'Ilusão: wrinklers x5',
      reversed: 'Clareza: no wrinklers'
    },
    {
      id: 19,
      name: 'O Sol',
      upright: 'Alegria: TUDO x2 24h',
      reversed: 'Tristeza: tudo /2 1h'
    },
    {
      id: 20,
      name: 'O Julgamento',
      upright: 'Renovação: reset + keep 50%',
      reversed: 'Condenação: debuffs permanentes'
    },
    {
      id: 21,
      name: 'O Mundo',
      upright: 'Completude: unlock tudo',
      reversed: 'Incompletude: lock random'
    }
  ];

  spreads = {
    single: {
      name: 'Carta Única',
      cards: 1,
      cost: 100,
      description: 'Resposta simples'
    },
    past_present_future: {
      name: 'Passado, Presente, Futuro',
      cards: 3,
      cost: 500,
      description: 'Visão temporal completa'
    },
    celtic_cross: {
      name: 'Cruz Celta',
      cards: 10,
      cost: 2000,
      description: 'Leitura profunda completa'
    },
    love_spread: {
      name: 'Spread do Amor',
      cards: 5,
      cost: 750,
      description: 'Insights para relacionamentos'
    }
  };

  reading(spreadType: string) {
    const spread = this.spreads[spreadType as keyof typeof this.spreads];
    if (!spread) return { success: false };

    this.spread = [];
    const cards = [];

    for (let i = 0; i < spread.cards; i++) {
      const card = this.drawCard();
      card.reversed = Math.random() < 0.5;
      this.spread.push(card);
      cards.push(card);
    }

    this.readings++;
    this.lastReading = {
      type: spreadType,
      cards: cards,
      timestamp: Date.now()
    };

    return {
      success: true,
      reading: this.lastReading,
      achievement: this.readings === 100 ? '🎴 Místico Mestre!' : null
    };
  }

  getCardEffect(card: any) {
    if (card.reversed) {
      return {
        effect: card.reversed,
        intensity: 'negative'
      };
    } else {
      return {
        effect: card.upright,
        intensity: 'positive'
      };
    }
  }

  private drawCard(): any {
    const card = this.majorArcana[Math.floor(Math.random() * this.majorArcana.length)];
    return { ...card };
  }

  minorArcana = {
    wands: {
      name: 'Varinhas (Fogo)',
      meaning: 'production bonuses',
      cards: 14
    },
    cups: {
      name: 'Cálices (Água)',
      meaning: 'emotional/healing',
      cards: 14
    },
    swords: {
      name: 'Espadas (Ar)',
      meaning: 'mental/strategy',
      cards: 14
    },
    pentacles: {
      name: 'Pentáculos (Terra)',
      meaning: 'material/wealth',
      cards: 14
    }
  };

  tarotWisdom = [
    'A leitura do Tarot revela caminhos, não destinos.',
    'As cartas sussurram verdades que já conheces.',
    'Cada tirada é um reflexo do universo em você.',
    'O futuro é escrito em múltiplas realidades.',
    'Busca no Tarot o que já habita tua alma.'
  ];

  getWisdom(): string {
    return this.tarotWisdom[Math.floor(Math.random() * this.tarotWisdom.length)];
  }
}

// ============ ALL MYSTICAL SYSTEMS EXPORTED ============
export const MysticalSystems = {
  astrology: new AstrologySystem(),
  tarot: new TarotSystem()
};
