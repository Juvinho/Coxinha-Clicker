/**
 * Achievement System
 * Comprehensive achievement and badges system
 * 15 achievement categories with progress tracking
 */

export type AchievementCategory = 'clicker' | 'builder' | 'investor' | 'explorer' | 'collector' | 'speed' | 'wealth' | 'rare' | 'seasonal' | 'challenge';

interface Achievement {
  id: string;
  name: string;
  description: string;
  category: AchievementCategory;
  icon: string;
  points: number;
  unlockedAt?: number;
  progress: number;
  goal: number;
  reward?: {
    milk?: number; // Milk percentage (prestige bonus)
    coxinhas?: number;
    multiplier?: number;
  };
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  hidden?: boolean;
}

export class AchievementSystem {
  achievements: Map<string, Achievement> = new Map();
  unlockedAchievements: Set<string> = new Set();
  totalPoints: number = 0;
  "milk": number = 0; // CPS bonus from prestige

  callbacks = {
    onAchievementUnlock: (achievement: Achievement) => {},
    onMilkEarned: (amount: number) => {},
  };

  constructor() {
    this.initializeAchievements();
  }

  // Feature 1: Initialize all achievements
  private initializeAchievements() {
    const achievements: Achievement[] = [
      // Clicker Category (5)
      {
        id: 'first_click',
        name: 'Primeiro Clique',
        description: 'Clique em uma coxinha',
        category: 'clicker',
        icon: '👆',
        points: 5,
        progress: 0,
        goal: 1,
        rarity: 'common',
      },
      {
        id: 'thousand_clicks',
        name: 'Clickador',
        description: 'Realize 1.000 cliques',
        category: 'clicker',
        icon: '💪',
        points: 25,
        progress: 0,
        goal: 1000,
        reward: { milk: 1 },
        rarity: 'common',
      },
      {
        id: 'million_clicks',
        name: 'Clique Obsessivo',
        description: 'Realize 1.000.000 cliques',
        category: 'clicker',
        icon: '⚡',
        points: 100,
        progress: 0,
        goal: 1000000,
        reward: { milk: 5 },
        rarity: 'epic',
      },
      {
        id: 'rapid_clicker',
        name: 'Clicador Rápido',
        description: 'Faça 100 cliques em 10 segundos',
        category: 'speed',
        icon: '⚡',
        points: 50,
        progress: 0,
        goal: 100,
        reward: { milk: 2 },
        rarity: 'rare',
      },
      {
        id: 'perfect_combo',
        name: 'Combo Perfeito',
        description: 'Alcance 250 combo',
        category: 'clicker',
        icon: '🌟',
        points: 75,
        progress: 0,
        goal: 250,
        reward: { milk: 3 },
        rarity: 'rare',
      },

      // Builder Category (5)
      {
        id: 'first_building',
        name: 'Construtor Iniciante',
        description: 'Compre seu primeiro edifício',
        category: 'builder',
        icon: '🏗️',
        points: 10,
        progress: 0,
        goal: 1,
        rarity: 'common',
      },
      {
        id: 'building_empire',
        name: 'Império de Estruturas',
        description: 'Compre 100 edifícios',
        category: 'builder',
        icon: '🏢',
        points: 50,
        progress: 0,
        goal: 100,
        reward: { milk: 2 },
        rarity: 'rare',
      },
      {
        id: 'all_buildings',
        name: 'Construtor Completo',
        description: 'Possua todos os edifícios',
        category: 'builder',
        icon: '🌆',
        points: 100,
        progress: 0,
        goal: 15,
        reward: { milk: 5, multiplier: 1.1 },
        rarity: 'epic',
      },
      {
        id: 'upgrade_master',
        name: 'Mestre de Pesquisa',
        description: 'Desbloqueie 100 upgrades',
        category: 'builder',
        icon: '🔬',
        points: 75,
        progress: 0,
        goal: 100,
        reward: { milk: 3 },
        rarity: 'rare',
      },
      {
        id: 'production_surge',
        name: 'Explosão de Produção',
        description: 'Atinja 1 bilhão CPS',
        category: 'builder',
        icon: '📈',
        points: 150,
        progress: 0,
        goal: 1000000000,
        reward: { milk: 10 },
        rarity: 'legendary',
      },

      // Golden Category (3)
      {
        id: 'golden_seeker',
        name: 'Caçador Dourado',
        description: 'Clique em 10 coxinhas douradas',
        category: 'collector',
        icon: '✨',
        points: 40,
        progress: 0,
        goal: 10,
        reward: { milk: 2 },
        rarity: 'rare',
      },
      {
        id: 'frenzy_expert',
        name: 'Especialista em Frenesi',
        description: 'Ative 5 frenzies',
        category: 'rare',
        icon: '🔥',
        points: 60,
        progress: 0,
        goal: 5,
        reward: { milk: 3 },
        rarity: 'epic',
      },
      {
        id: 'lucky_strike',
        name: 'Golpe de Sorte',
        description: 'Obtenha 1 trilhão apenas com sorte',
        category: 'rare',
        icon: '🍀',
        points: 200,
        progress: 0,
        goal: 1000000000000,
        reward: { milk: 15 },
        rarity: 'legendary',
        hidden: true,
      },

      // Wealth Category (2)
      {
        id: 'millionaire',
        name: 'Milionário',
        description: 'Possua 1 milhão de coxinhas',
        category: 'wealth',
        icon: '💰',
        points: 50,
        progress: 0,
        goal: 1000000,
        reward: { milk: 2 },
        rarity: 'rare',
      },
      {
        id: 'billionaire',
        name: 'Trilionário',
        description: 'Possua 1 trilhão de coxinhas',
        category: 'wealth',
        icon: '💸',
        points: 200,
        progress: 0,
        goal: 1000000000000,
        reward: { milk: 20 },
        rarity: 'legendary',
      },

      // Seasonal (1)
      {
        id: 'night_owl',
        name: 'Coruja da Noite',
        description: 'Jogue entre 00:00 e 06:00',
        category: 'seasonal',
        icon: '🌙',
        points: 25,
        progress: 0,
        goal: 1,
        reward: { milk: 1 },
        rarity: 'common',
      },
    ];

    achievements.forEach(ach => {
      this.achievements.set(ach.id, ach);
    });
  }

  // Feature 2: Update achievement progress
  updateProgress(achievementId: string, amount: number): boolean {
    const achievement = this.achievements.get(achievementId);
    if (!achievement) return false;

    if (this.unlockedAchievements.has(achievementId)) {
      return false; // Already unlocked
    }

    achievement.progress = Math.min(achievement.progress + amount, achievement.goal);

    if (achievement.progress >= achievement.goal) {
      return this.unlockAchievement(achievementId);
    }

    return false;
  }

  // Feature 3: Unlock achievement
  unlockAchievement(achievementId: string): boolean {
    const achievement = this.achievements.get(achievementId);
    if (!achievement || this.unlockedAchievements.has(achievementId)) {
      return false;
    }

    this.unlockedAchievements.add(achievementId);
    achievement.unlockedAt = Date.now();
    this.totalPoints += achievement.points;

    // Award milk if applicable
    if (achievement.reward?.milk) {
      this.milk += achievement.reward.milk;
      this.callbacks.onMilkEarned?.(achievement.reward.milk);
    }

    this.callbacks.onAchievementUnlock?.(achievement);

    return true;
  }

  // Feature 4: Get achievement by ID
  getAchievement(id: string): Achievement | null {
    return this.achievements.get(id) || null;
  }

  // Feature 5: Get all achievements
  getAllAchievements(): Achievement[] {
    return Array.from(this.achievements.values());
  }

  // Feature 6: Get unlocked achievements
  getUnlockedAchievements(): Achievement[] {
    return Array.from(this.achievements.values()).filter(a => this.unlockedAchievements.has(a.id));
  }

  // Feature 7: Get locked achievements
  getLockedAchievements(): Achievement[] {
    return Array.from(this.achievements.values()).filter(a => !this.unlockedAchievements.has(a.id));
  }

  // Feature 8: Get achievement by category
  getAchievementsByCategory(category: AchievementCategory): Achievement[] {
    return Array.from(this.achievements.values()).filter(a => a.category === category);
  }

  // Feature 9: Get total points
  getTotalPoints(): number {
    return this.totalPoints;
  }

  // Feature 10: Get completion percentage
  getCompletionPercentage(): number {
    const total = this.achievements.size;
    const unlocked = this.unlockedAchievements.size;
    return (unlocked / total) * 100;
  }

  // Feature 11: Get rarest achievements
  getRarestAchievements(count: number = 5): Achievement[] {
    const rarityOrder = { legendary: 0, epic: 1, rare: 2, common: 3 };

    return Array.from(this.achievements.values())
      .filter(a => this.unlockedAchievements.has(a.id))
      .sort((a, b) => rarityOrder[a.rarity] - rarityOrder[b.rarity])
      .slice(0, count);
  }

  // Feature 12: Get hidden achievements (those not yet unlocked)
  getHiddenAchievementCount(): number {
    return Array.from(this.achievements.values()).filter(a => a.hidden && !this.unlockedAchievements.has(a.id))
      .length;
  }

  // Feature 13: Get milk bonus (percentage)
  getMilkBonus(): number {
    return this.milk;
  }

  // Feature 14: Export achievements
  exportAchievements(): string {
    return JSON.stringify(
      {
        unlockedAchievements: Array.from(this.unlockedAchievements),
        totalPoints: this.totalPoints,
        milk: this.milk,
      },
      null,
      2
    );
  }

  // Feature 15: Import achievements
  importAchievements(jsonData: string) {
    try {
      const data = JSON.parse(jsonData);

      if (Array.isArray(data.unlockedAchievements)) {
        data.unlockedAchievements.forEach((id: string) => {
          if (this.achievements.has(id)) {
            this.unlockedAchievements.add(id);
          }
        });
      }

      this.totalPoints = data.totalPoints || 0;
      this.milk = data.milk || 0;
    } catch (e) {
      console.error('Failed to import achievements', e);
    }
  }
}
