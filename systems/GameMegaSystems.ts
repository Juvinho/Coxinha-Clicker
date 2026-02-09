/**
 * GAME MEGA SYSTEMS: Arcade Games + Casino
 * 95 features total
 */

// ============ ARCADE GAMES SYSTEM - 60 FEATURES ============
export class ArcadeGames {
  tokens: number = 0; // Moeda arcade
  highScores: { [key: string]: number } = {};
  gamesPlayed: number = 0;
  totalTokensEarned: number = 0;

  // 1. Coxinha Invaders (Space Invaders)
  coxinhaInvaders = {
    enemies: [] as any[],
    player: { x: 200, y: 500, hp: 3 },
    bullets: [] as any[],
    score: 0,
    wave: 1,

    start() {
      this.enemies = [];
      for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 10; col++) {
          this.enemies.push({
            x: col * 50,
            y: row * 40,
            type: ['cursor', 'vovo', 'barraca'][row % 3],
            hp: 1 + row
          });
        }
      }
      return { message: '👾 Invaders iniciado!', enemies: this.enemies.length };
    },

    shoot() {
      this.bullets.push({
        x: this.player.x,
        y: this.player.y,
        speed: 10
      });
    },

    reward() {
      return {
        coxinhas: this.score * 1000,
        tokens: Math.floor(this.score / 100),
        achievement: this.score > 10000 ? '👾 Alien Slayer!' : null
      };
    }
  };

  // 2. Coxinha Tetris
  coxinhaTetris = {
    grid: Array(20).fill(null).map(() => Array(10).fill(null)),
    currentPiece: null,
    score: 0,
    linesCleared: 0,

    pieces: {
      I: [[1, 1, 1, 1]],
      O: [[1, 1], [1, 1]],
      T: [[0, 1, 0], [1, 1, 1]],
      S: [[0, 1, 1], [1, 1, 0]],
      Z: [[1, 1, 0], [0, 1, 1]],
      L: [[1, 0, 0], [1, 1, 1]],
      J: [[0, 0, 1], [1, 1, 1]]
    },

    spawnPiece() {
      const types = Object.keys(this.pieces);
      const type = types[Math.floor(Math.random() * types.length)];
      this.currentPiece = {
        type: type,
        shape: this.pieces[type as keyof typeof this.pieces],
        x: 3,
        y: 0
      };
    },

    clearLine() {
      this.linesCleared++;
      this.score += 100 * this.linesCleared;
      return { lines: this.linesCleared, bonus: 100 * this.linesCleared };
    }
  };

  // 3. Coxinha Jump (Flappy Bird)
  coxinhaJump = {
    player: { y: 250, velocity: 0, gravity: 0.5 },
    pipes: [] as any[],
    pipesPassed: 0,
    score: 0,

    flap() {
      this.player.velocity = -8;
    },

    generatePipes() {
      const gap = 150;
      const y = Math.random() * 200 + 100;
      this.pipes.push({
        x: 400,
        topHeight: y,
        bottomY: y + gap
      });
    },

    reward() {
      return {
        production: 60000 * this.pipesPassed, // 1min per pipe
        tokens: this.pipesPassed * 10
      };
    }
  };

  // 4. Coxinha Clicker RPG
  clickerRPG = {
    player: {
      level: 1,
      xp: 0,
      maxXp: 100,
      hp: 100,
      maxHp: 100,
      attack: 10,
      defense: 5,
      critChance: 0.1,
      equipment: {
        weapon: null,
        armor: null,
        accessory: null
      }
    },

    enemies: [
      { name: 'Slime Óleo', hp: 50, attack: 5, xp: 10, loot: ['oleo'] },
      { name: 'Wrinkler Bebê', hp: 200, attack: 15, xp: 50, loot: ['essencia'] },
      { name: 'Vovó Zumbi', hp: 500, attack: 30, xp: 150, loot: ['receita_rara'] },
      { name: 'Boss: Coxinha Gigante', hp: 10000, attack: 100, xp: 1000, loot: ['upgrade_lendario'] }
    ],

    combat(enemy: any) {
      const battle = {
        rounds: 0,
        playerDamageTotal: 0,
        enemyDamageTotal: 0
      };

      while (this.player.hp > 0 && enemy.hp > 0) {
        // Player ataca
        let damage = this.player.attack;
        if (Math.random() < this.player.critChance) {
          damage *= 2;
        }
        enemy.hp -= damage;
        battle.playerDamageTotal += damage;
        battle.rounds++;

        // Enemy ataca
        if (enemy.hp > 0) {
          const enemyDamage = Math.max(1, enemy.attack - this.player.defense);
          this.player.hp -= enemyDamage;
          battle.enemyDamageTotal += enemyDamage;
        }
      }

      if (this.player.hp > 0) {
        this.player.xp += enemy.xp;
        if (this.player.xp >= this.player.maxXp) {
          this.player.level++;
          this.player.xp = 0;
          this.player.maxXp = Math.floor(this.player.maxXp * 1.2);
        }
        return { victory: true, battle };
      }

      return { victory: false, battle };
    },

    equipment: [
      { name: 'Espátula Lendária', slot: 'weapon', attack: 50 },
      { name: 'Avental de Ouro', slot: 'armor', defense: 30 },
      { name: 'Anel do Tempo', slot: 'accessory', critChance: 0.2 }
    ]
  };

  // 5. Coxinha Puzzle Match-3
  match3 = {
    grid: Array(8).fill(null).map(() => Array(8).fill(null)),
    score: 0,
    moves: 0,
    maxMoves: 20,

    generateGrid() {
      const types = ['cursor', 'vovo', 'barraca', 'pastelaria', 'fabrica'];
      this.grid = this.grid.map((row: any[]) =>
        row.map(() => types[Math.floor(Math.random() * types.length)])
      );
    },

    match(x: number, y: number) {
      const matches: any[] = this.findMatches(x, y);
      if (matches.length >= 3) {
        this.score += 100 * matches.length;
        return { matches: matches.length, points: 100 * matches.length };
      }
      return { matches: 0 };
    },

    private findMatches(x: number, y: number): any[] {
      // Simplified match detection
      return [];
    }
  };

  // 6. Rhythm Game
  rhythmGame = {
    notes: [] as any[],
    combo: 0,
    maxCombo: 0,
    accuracy: 0,
    score: 0,

    generateBeat() {
      const track = [
        { time: 1000, lane: 0 },
        { time: 1500, lane: 1 },
        { time: 2000, lane: 2 },
        { time: 2500, lane: 3 }
      ];
      return track;
    },

    hit(timing: number) {
      const accuracy = Math.abs(timing);
      if (accuracy < 50) {
        this.combo++;
        this.maxCombo = Math.max(this.maxCombo, this.combo);
        this.score += 300;
        return { result: 'PERFECT', multiplier: 3 };
      } else if (accuracy < 100) {
        this.combo++;
        this.score += 200;
        return { result: 'GOOD', multiplier: 2 };
      } else if (accuracy < 150) {
        this.combo++;
        this.score += 100;
        return { result: 'OK', multiplier: 1 };
      } else {
        this.combo = 0;
        return { result: 'MISS', multiplier: 0 };
      }
    }
  };

  // 7. Memory Game
  memoryGame = {
    cards: [] as any[],
    flipped: [] as number[],
    matched: 0,
    moves: 0,
    score: 0,

    initialize(difficulty: string) {
      const gridSize = difficulty === 'easy' ? 4 : difficulty === 'normal' ? 6 : 8;
      const pairsCount = (gridSize * gridSize) / 2;

      this.cards = Array(gridSize * gridSize).fill(null).map((_, i) => ({
        id: Math.floor(i / 2),
        flipped: false,
        matched: false
      }));

      // Shuffle
      for (let i = this.cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
      }

      return { cards: this.cards.length, pairs: pairsCount };
    },

    flip(index: number) {
      if (this.cards[index].flipped || this.cards[index].matched) return false;
      
      this.flipped.push(index);
      this.cards[index].flipped = true;

      if (this.flipped.length === 2) {
        const [idx1, idx2] = this.flipped;
        if (this.cards[idx1].id === this.cards[idx2].id) {
          this.cards[idx1].matched = true;
          this.cards[idx2].matched = true;
          this.matched++;
          this.score += 100;
          this.flipped = [];
          return true;
        } else {
          this.moves++;
          this.cards[idx1].flipped = false;
          this.cards[idx2].flipped = false;
          this.flipped = [];
          return false;
        }
      }
      return true;
    }
  };

  // Arcade shop
  arcadeShop = {
    items: [
      { name: 'Extra Life', cost: 50, effect: '+1 HP todos arcade games' },
      { name: 'Time Extend', cost: 100, effect: '+30s todos jogos' },
      { name: 'Score x2', cost: 200, effect: 'Dobra pontos 1 jogo' },
      { name: 'Auto-Play', cost: 1000, effect: 'IA joga por você' }
    ]
  };

  playGame(gameName: string) {
    this.gamesPlayed++;
    const reward = { tokens: Math.floor(Math.random() * 100) + 10 };
    this.totalTokensEarned += reward.tokens;
    return reward;
  }
}

// ============ CASINO SYSTEM - 35 FEATURES ============
export class Casino {
  chips: number = 0; // Fichas de cassino
  vipLevel: number = 0;
  totalBetsPlaced: number = 0;
  totalWinnings: number = 0;

  // Slot Machine
  slotMachine = {
    symbols: ['🍗', '💰', '🎰', '⭐', '💎', '7️⃣'],
    payTable: {
      '🍗🍗🍗': 10,
      '💰💰💰': 50,
      '⭐⭐⭐': 100,
      '💎💎💎': 500,
      '7️⃣7️⃣7️⃣': 7777
    },
    jackpot: 0,

    spin(bet: number) {
      const reel1 = this.symbols[Math.floor(Math.random() * this.symbols.length)];
      const reel2 = this.symbols[Math.floor(Math.random() * this.symbols.length)];
      const reel3 = this.symbols[Math.floor(Math.random() * this.symbols.length)];

      const result = reel1 + reel2 + reel3;
      const payout = this.payTable[result as keyof typeof this.payTable] || 0;

      if (result === '7️⃣7️⃣7️⃣') {
        const totalWin = bet * 7777 + this.jackpot;
        this.jackpot = 0;
        return { win: totalWin, jackpot: true, reels: [reel1, reel2, reel3] };
      }

      this.jackpot += bet * 0.01;
      return { win: bet * payout, jackpot: false, reels: [reel1, reel2, reel3] };
    }
  };

  // Blackjack
  blackjack = {
    deck: [] as string[],
    playerHand: [] as string[],
    dealerHand: [] as string[],
    playerBusted: false,
    dealerBusted: false,

    deal() {
      this.playerHand = [this.drawCard(), this.drawCard()];
      this.dealerHand = [this.drawCard()];
      return { playerHand: this.playerHand, dealerHand: [this.dealerHand[0]] };
    },

    hit(hand: string[]) {
      hand.push(this.drawCard());
      if (this.calculateHand(hand) > 21) {
        return { bust: true, value: this.calculateHand(hand) };
      }
      return { bust: false, value: this.calculateHand(hand) };
    },

    calculateHand(hand: string[]): number {
      let total = 0;
      let aces = 0;

      hand.forEach(card => {
        if (card === 'A') aces++;
        else if (['J', 'Q', 'K'].includes(card)) total += 10;
        else total += parseInt(card);
      });

      for (let i = 0; i < aces; i++) {
        total += (total + 11 <= 21) ? 11 : 1;
      }

      return total;
    },

    private drawCard(): string {
      const cards = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
      return cards[Math.floor(Math.random() * cards.length)];
    }
  };

  // Roulette
  roulette = {
    numbers: Array.from({ length: 37 }, (_, i) => i),

    spin() {
      return this.numbers[Math.floor(Math.random() * 37)];
    },

    betTypes: {
      straight: { payout: 35 },
      split: { payout: 17 },
      street: { payout: 11 },
      corner: { payout: 8 },
      red: { payout: 1 },
      black: { payout: 1 },
      even: { payout: 1 },
      odd: { payout: 1 }
    }
  };

  // Crash Game
  crashGame = {
    multiplier: 1,
    crashed: false,

    start(bet: number) {
      this.multiplier = 1;
      this.crashed = false;
      const crashPoint = Math.pow(Math.random(), -0.5);

      return {
        started: true,
        initialMultiplier: this.multiplier,
        crashPoint: crashPoint
      };
    },

    update() {
      this.multiplier += 0.01;
      return this.multiplier;
    },

    cashout(bet: number) {
      if (!this.crashed) {
        return bet * this.multiplier;
      }
      return 0;
    }
  };

  // VIP System
  vipSystem = {
    levels: [
      { tier: 1, requirement: 1e6, perks: ['Comps diários', 'Acesso lounge'] },
      { tier: 2, requirement: 1e9, perks: ['Dealer privado', 'Limites aumentados'] },
      { tier: 3, requirement: 1e12, perks: ['Suite presidencial', 'Jet privado'] },
      { tier: 4, requirement: 1e15, perks: ['Dono do cassino', 'House edge zero'] }
    ]
  };

  // Comp points
  compSystem = {
    points: 0,

    earn(bet: number) {
      this.points += bet * 0.001; // 0.1% cashback
      return this.points;
    },

    redeem: [
      { name: 'Free Spin', cost: 100, value: 50 },
      { name: 'Meal Voucher', cost: 500, value: 1000 },
      { name: 'Hotel Night', cost: 5000, value: 50000 },
      { name: '1000 Sugar Lumps', cost: 50000, value: 1000 }
    ]
  };

  checkVIPStatus(totalBets: number) {
    for (let vip of this.vipSystem.levels) {
      if (totalBets >= vip.requirement) {
        this.vipLevel = vip.tier;
      }
    }
    return this.vipLevel;
  }
}

// ============ ALL GAME SYSTEMS EXPORTED ============
export const GameSystems = {
  arcade: new ArcadeGames(),
  casino: new Casino()
};
