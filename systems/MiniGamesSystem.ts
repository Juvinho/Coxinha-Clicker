/**
 * Mini-games System
 * Collection of arcade/clicker mini-games for bonus rewards
 * 20 unique mini-game experiences
 */

interface MiniGame {
  id: string;
  name: string;
  description: string;
  type: 'pattern' | 'timing' | 'puzzle' | 'memory' | 'quick-react' | 'spinner' | 'slots' | 'dice';
  difficulty: 'easy' | 'medium' | 'hard' | 'extreme';
  duration: number; // seconds
  reward: {
    coxinhas?: number;
    cps?: number;
    multiplier?: number;
  };
  unlockCost?: number;
  icon: string;
  unlocked: boolean;
}

interface GameResult {
  gameId: string;
  score: number;
  maxScore: number;
  won: boolean;
  reward: number;
  timeSpent: number;
}

export class MiniGamesSystem {
  games: Map<string, MiniGame> = new Map();
  gameResults: GameResult[] = [];
  
  totalWins: number = 0;
  totalMiniGameRewards: number = 0;
  currentGame: MiniGame | null = null;
  gameStartTime: number = 0;

  callbacks = {
    onGameStart: (game: MiniGame) => {},
    onGameComplete: (result: GameResult) => {},
    onGameUnlock: (game: MiniGame) => {},
  };

  constructor() {
    this.initializeGames();
  }

  // Feature 1: Initialize all mini-games
  private initializeGames() {
    const games: MiniGame[] = [
      // Quick React Games
      {
        id: 'tap_tap',
        name: 'Tap Tap Coxinha',
        description: 'Toque onde as coxinhas aparecem RÁ PIDO!',
        type: 'quick-react',
        difficulty: 'medium',
        duration: 30,
        reward: { coxinhas: 100000 },
        icon: '👆',
        unlocked: true,
      },
      {
        id: 'avoid_bombs',
        name: 'Desvio de Bombas',
        description: 'Desvie das bombas vermelhas enquanto coleta ouro!',
        type: 'quick-react',
        difficulty: 'hard',
        duration: 45,
        reward: { coxinhas: 250000 },
        icon: '💣',
        unlocked: true,
      },

      // Timing Games
      {
        id: 'perfect_timing',
        name: 'Timing Perfeito',
        description: 'Clique no momento EXATO para ganhar pontos',
        type: 'timing',
        difficulty: 'medium',
        duration: 20,
        reward: { coxinhas: 150000, multiplier: 1.5 },
        icon: '⏱️',
        unlocked: true,
      },
      {
        id: 'rhythm_clicker',
        name: 'Clicker Rítmico',
        description: 'Clique no ritmo da música para combos',
        type: 'timing',
        difficulty: 'hard',
        duration: 60,
        reward: { coxinhas: 500000, multiplier: 2 },
        icon: '♪',
        unlocked: false,
        unlockCost: 50000000,
      },

      // Pattern Games
      {
        id: 'color_match',
        name: 'Combinar Cores',
        description: 'Pressione as cores na sequência correta',
        type: 'pattern',
        difficulty: 'easy',
        duration: 25,
        reward: { coxinhas: 75000 },
        icon: '🌈',
        unlocked: true,
      },
      {
        id: 'simon_clone',
        name: 'Simon Eletrônico',
        description: 'Repita a sequência cada vez maior',
        type: 'pattern',
        difficulty: 'hard',
        duration: 120,
        reward: { coxinhas: 1000000, multiplier: 3 },
        icon: '🔴',
        unlocked: false,
        unlockCost: 100000000,
      },

      // Memory Games
      {
        id: 'memory_cards',
        name: 'Memória de Cartas',
        description: 'Encontre pares de cartas idênticas',
        type: 'memory',
        difficulty: 'medium',
        duration: 45,
        reward: { coxinhas: 200000 },
        icon: '🃏',
        unlocked: false,
        unlockCost: 75000000,
      },
      {
        id: 'faces_memory',
        name: 'Memória de Rostos',
        description: 'Lembre-se dos rostos antes de desaparecerem',
        type: 'memory',
        difficulty: 'hard',
        duration: 60,
        reward: { coxinhas: 500000 },
        icon: '😊',
        unlocked: false,
        unlockCost: 150000000,
      },

      // Puzzle Games
      {
        id: 'match_three',
        name: 'Combinar Três',
        description: 'Match-3 style gameplay com coxinhas',
        type: 'puzzle',
        difficulty: 'medium',
        duration: 60,
        reward: { coxinhas: 300000 },
        icon: '🧩',
        unlocked: false,
        unlockCost: 50000000,
      },
      {
        id: 'sliding_puzzle',
        name: 'Quebra-cabeça Deslizzante',
        description: 'Arrume o quebra-cabeça deslizzando peças',
        type: 'puzzle',
        difficulty: 'easy',
        duration: 30,
        reward: { coxinhas: 100000 },
        icon: '🎯',
        unlocked: false,
        unlockCost: 30000000,
      },

      // Spinner/Slot Games
      {
        id: 'lucky_spinner',
        name: 'Rodinha da Sorte',
        description: 'Faça girar para ganhar prêmios aleatórios',
        type: 'spinner',
        difficulty: 'easy',
        duration: 10,
        reward: { coxinhas: 50000 },
        icon: '🎡',
        unlocked: true,
      },
      {
        id: 'slots_machine',
        name: 'Máquina Caça-níqueis',
        description: 'Jackpot de coxinhas! 3x cereja = WIN',
        type: 'slots',
        difficulty: 'medium',
        duration: 30,
        reward: { coxinhas: 1000000 },
        icon: '🎰',
        unlocked: false,
        unlockCost: 200000000,
      },

      // Dice Games
      {
        id: 'die_roll',
        name: 'Rolagem de Dado',
        description: 'Role e ganhe X vezes seu número',
        type: 'dice',
        difficulty: 'easy',
        duration: 10,
        reward: { coxinhas: 25000 },
        icon: '🎲',
        unlocked: true,
      },
      {
        id: 'dice_duel',
        name: 'Duelo de Dados',
        description: 'Role mais alto que a IA para vencer',
        type: 'dice',
        difficulty: 'medium',
        duration: 20,
        reward: { coxinhas: 250000 },
        icon: '🎲⚔️',
        unlocked: false,
        unlockCost: 75000000,
      },

      // Extreme challenges
      {
        id: 'speed_run',
        name: 'Speed Run Extremo',
        description: 'Vença 5 minigames em 3 minutos',
        type: 'quick-react',
        difficulty: 'extreme',
        duration: 180,
        reward: { coxinhas: 5000000, multiplier: 5 },
        icon: '⚡💨',
        unlocked: false,
        unlockCost: 500000000,
      },
      {
        id: 'endurance',
        name: 'Teste de Resistência',
        description: 'Clique por 5 minutos direto sem parar',
        type: 'quick-react',
        difficulty: 'extreme',
        duration: 300,
        reward: { coxinhas: 10000000, multiplier: 10 },
        icon: '💪🔥',
        unlocked: false,
        unlockCost: 1000000000,
      },
    ];

    games.forEach(game => {
      this.games.set(game.id, game);
    });
  }

  // Feature 2: Start mini-game
  startGame(gameId: string): { success: boolean; game: MiniGame | null } {
    const game = this.games.get(gameId);
    if (!game || !game.unlocked) {
      return { success: false, game: null };
    }

    this.currentGame = game;
    this.gameStartTime = Date.now();
    this.callbacks.onGameStart?.(game);

    return { success: true, game };
  }

  // Feature 3: Complete game
  completeGame(finalScore: number, maxScore: number): GameResult {
    if (!this.currentGame) {
      return { gameId: '', score: 0, maxScore: 0, won: false, reward: 0, timeSpent: 0 };
    }

    const timeSpent = (Date.now() - this.gameStartTime) / 1000;
    const won = finalScore >= maxScore * 0.7; // 70% pass

    let reward = 0;
    if (won) {
      reward = this.currentGame.reward.coxinhas || 0;
      this.totalWins++;
    } else {
      reward = Math.floor((this.currentGame.reward.coxinhas || 0) * 0.3); // 30% consolation
    }

    const result: GameResult = {
      gameId: this.currentGame.id,
      score: finalScore,
      maxScore,
      won,
      reward,
      timeSpent,
    };

    this.gameResults.push(result);
    this.totalMiniGameRewards += reward;
    this.callbacks.onGameComplete?.(result);
    this.currentGame = null;

    return result;
  }

  // Feature 4: Get game by ID
  getGame(gameId: string): MiniGame | null {
    return this.games.get(gameId) || null;
  }

  // Feature 5: Get all games
  getAllGames(): MiniGame[] {
    return Array.from(this.games.values());
  }

  // Feature 6: Get unlocked games
  getUnlockedGames(): MiniGame[] {
    return Array.from(this.games.values()).filter(g => g.unlocked);
  }

  // Feature 7: Unlock game
  unlockGame(gameId: string, playerCoxinhas: number): boolean {
    const game = this.games.get(gameId);
    if (!game || game.unlocked) return false;

    const cost = game.unlockCost || 0;
    if (playerCoxinhas < cost) return false;

    game.unlocked = true;
    this.callbacks.onGameUnlock?.(game);

    return true;
  }

  // Feature 8: Get win rate
  getWinRate(): number {
    if (this.gameResults.length === 0) return 0;
    return (this.totalWins / this.gameResults.length) * 100;
  }

  // Feature 9: Get best game
  getBestGame(): { gameId: string; score: number; reward: number } | null {
    if (this.gameResults.length === 0) return null;

    return this.gameResults.reduce((best, current) =>
      current.reward > best.reward ? current : best
    ) as any;
  }

  // Feature 10: Get favorite game
  getFavoriteGame(): string | null {
    const gameCount: { [key: string]: number } = {};

    this.gameResults.forEach(result => {
      gameCount[result.gameId] = (gameCount[result.gameId] || 0) + 1;
    });

    let favorite = '';
    let maxCount = 0;

    for (let gameId in gameCount) {
      if (gameCount[gameId] > maxCount) {
        maxCount = gameCount[gameId];
        favorite = gameId;
      }
    }

    return favorite || null;
  }

  // Feature 11: Get total playtime in mini-games
  getTotalGameTime(): number {
    return this.gameResults.reduce((sum, result) => sum + result.timeSpent, 0);
  }

  // Feature 12: Get difficulty breakdown
  getDifficultyStats(): { [key: string]: number } {
    const stats: { [key: string]: number } = { easy: 0, medium: 0, hard: 0, extreme: 0 };

    this.gameResults.forEach(result => {
      const game = this.games.get(result.gameId);
      if (game) {
        stats[game.difficulty]++;
      }
    });

    return stats;
  }

  // Feature 13: Get game type breakdown
  getGameTypeStats(): { [key: string]: number } {
    const stats: { [key: string]: number } = {};

    this.gameResults.forEach(result => {
      const game = this.games.get(result.gameId);
      if (game) {
        stats[game.type] = (stats[game.type] || 0) + 1;
      }
    });

    return stats;
  }

  // Feature 14: Daily challenge (changes daily)
  getDailyChallenge(): MiniGame | null {
    const today = new Date().toISOString().split('T')[0];
    const seed = today.split('-').reduce((a, b) => parseInt(a) + parseInt(b), 0);

    const unlockedGames = this.getUnlockedGames();
    if (unlockedGames.length === 0) return null;

    const index = seed % unlockedGames.length;
    return unlockedGames[index];
  }

  // Feature 15: Progressive difficulty
  getRecommendedGame(): MiniGame | null {
    const stats = this.getDifficultyStats();
    const easy = stats.easy || 0;
    const medium = stats.medium || 0;
    const hard = stats.hard || 0;

    let targetDifficulty = 'easy';

    if (easy > 5 && medium < 3) targetDifficulty = 'medium';
    if (medium > 5 && hard < 3) targetDifficulty = 'hard';

    const games = this.getUnlockedGames().filter(g => g.difficulty === targetDifficulty);

    return games.length > 0 ? games[0] : null;
  }

  // Feature 16: Combo streak (consecutive wins)
  getCurrentComboStreak(): number {
    let streak = 0;

    for (let i = this.gameResults.length - 1; i >= 0; i--) {
      if (this.gameResults[i].won) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  }

  // Feature 17: Export game statistics
  exportGameStats(): string {
    return JSON.stringify(
      {
        totalGames: this.gameResults.length,
        totalWins: this.totalWins,
        totalRewards: this.totalMiniGameRewards,
        winRate: this.getWinRate(),
        totalPlaytime: this.getTotalGameTime(),
        gameResults: this.gameResults,
      },
      null,
      2
    );
  }

  // Feature 18: Achievement - Pro Gamer
  isProGamer(): boolean {
    return this.totalWins >= 50 && this.getWinRate() > 80;
  }

  // Feature 19: Achievement - All Games Unlocked
  hasUnlockedAllGames(): boolean {
    return Array.from(this.games.values()).every(g => g.unlocked);
  }

  // Feature 20: Leaderboard (top scores)
  getLeaderboard(limit: number = 10): GameResult[] {
    return this.gameResults
      .filter(r => r.won)
      .sort((a, b) => b.reward - a.reward)
      .slice(0, limit);
  }
}
