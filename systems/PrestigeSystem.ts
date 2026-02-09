/**
 * Prestige System
 * Ascension/Reset mechanics with cumulative bonuses
 * 20 features for progression across multiple runs
 */

interface PrestigeLevel {
  level: number;
  name: string;
  icon: string;
  cpsMultiplier: number;
  clickMultiplier: number;
  unlocks: string[];
  requiredMilk: number;
}

interface PrestigeRun {
  runNumber: number;
  startTime: number;
  endTime?: number;
  finalCoxinhas: number;
  milkEarned: number;
  cpsAchieved: number;
  duration: number;
}

export class PrestigeSystem {
  prestigeLevel: number = 0;
  totalMilk: number = 0;
  prestigeRuns: PrestigeRun[] = [];
  currentRunNumber: number = 1;
  
  cpsMultiplierPerMilk: number = 0.001; // Each milk = +0.1% CPS
  clickMultiplierPerMilk: number = 0.0005; // Each milk = +0.05% click
  
  milestones: Set<number> = new Set();
  achievements: Set<string> = new Set();

  callbacks = {
    onPrestige: (level: number, milkGained: number) => {},
    onMilestoneReached: (milestone: number) => {},
  };

  // Feature 1: Calculate milk from coxinhas
  calculateMilk(totalCoxinhas: number): number {
    // Simple formula: 1 milk per 10 billion coxinhas produced
    return Math.floor(totalCoxinhas / 10000000000);
  }

  // Feature 2: Ascend/Prestige
  ascend(totalCoxinhas: number, cpsAchieved: number, timePlayed: number) {
    const milkGained = this.calculateMilk(totalCoxinhas);

    // Record run
    const run: PrestigeRun = {
      runNumber: this.currentRunNumber,
      startTime: Date.now() - timePlayed * 1000,
      endTime: Date.now(),
      finalCoxinhas: totalCoxinhas,
      milkEarned: milkGained,
      cpsAchieved: cpsAchieved,
      duration: timePlayed,
    };

    this.prestigeRuns.push(run);
    this.totalMilk += milkGained;
    this.currentRunNumber++;

    // Check milestones
    if (milkGained > 0) {
      this.checkMilestones(this.totalMilk);
    }

    // Update prestige level
    this.updatePrestigeLevel();

    this.callbacks.onPrestige?.(this.prestigeLevel, milkGained);
  }

  // Feature 3: Get CPS multiplier from milk
  getCpsMultiplier(): number {
    return 1 + this.totalMilk * this.cpsMultiplierPerMilk;
  }

  // Feature 4: Get click multiplier from milk
  getClickMultiplier(): number {
    return 1 + this.totalMilk * this.clickMultiplierPerMilk;
  }

  // Feature 5: Get prestige level
  getPrestigeLevel(): number {
    return Math.floor(this.totalMilk / 100);
  }

  // Feature 6: Update prestige level
  private updatePrestigeLevel() {
    const newLevel = this.getPrestigeLevel();
    if (newLevel > this.prestigeLevel) {
      this.prestigeLevel = newLevel;
    }
  }

  // Feature 7: Get prestige bonuses summary
  getPrestigeBonuses() {
    return {
      cpsMultiplier: this.getCpsMultiplier(),
      clickMultiplier: this.getClickMultiplier(),
      level: this.prestigeLevel,
      totalMilk: this.totalMilk,
      nextLevelMilk: (this.prestigeLevel + 1) * 100,
    };
  }

  // Feature 8: Compare prestige runs
  compareRuns(runIndex1: number, runIndex2: number) {
    const run1 = this.prestigeRuns[runIndex1];
    const run2 = this.prestigeRuns[runIndex2];

    if (!run1 || !run2) return null;

    return {
      coxinhasGain: ((run2.finalCoxinhas - run1.finalCoxinhas) / run1.finalCoxinhas) * 100,
      cpsImprovement: ((run2.cpsAchieved - run1.cpsAchieved) / run1.cpsAchieved) * 100,
      milkGain: run2.milkEarned - run1.milkEarned,
      durationChange: run2.duration - run1.duration,
    };
  }

  // Feature 9: Get best run
  getBestRun(): PrestigeRun | null {
    if (this.prestigeRuns.length === 0) return null;

    return this.prestigeRuns.reduce((best, current) =>
      current.finalCoxinhas > best.finalCoxinhas ? current : best
    );
  }

  // Feature 10: Get longest run
  getLongestRun(): PrestigeRun | null {
    if (this.prestigeRuns.length === 0) return null;

    return this.prestigeRuns.reduce((longest, current) =>
      current.duration > longest.duration ? current : longest
    );
  }

  // Feature 11: Get run statistics
  getRunStatistics() {
    if (this.prestigeRuns.length === 0) {
      return {
        totalRuns: 0,
        averageCoxinhas: 0,
        averageCps: 0,
        averageDuration: 0,
        totalMilkEarned: this.totalMilk,
      };
    }

    const totalCoxinhas = this.prestigeRuns.reduce((sum, r) => sum + r.finalCoxinhas, 0);
    const totalCps = this.prestigeRuns.reduce((sum, r) => sum + r.cpsAchieved, 0);
    const totalDuration = this.prestigeRuns.reduce((sum, r) => sum + r.duration, 0);

    return {
      totalRuns: this.prestigeRuns.length,
      averageCoxinhas: totalCoxinhas / this.prestigeRuns.length,
      averageCps: totalCps / this.prestigeRuns.length,
      averageDuration: totalDuration / this.prestigeRuns.length,
      totalMilkEarned: this.totalMilk,
    };
  }

  // Feature 12: Check milestones
  private checkMilestones(milk: number) {
    const milestoneLevels = [10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000];

    milestoneLevels.forEach(level => {
      if (milk >= level && !this.milestones.has(level)) {
        this.milestones.add(level);
        this.callbacks.onMilestoneReached?.(level);
      }
    });
  }

  // Feature 13: Ascension suggestion (should you prestige?)
  getAscensionSuggestion(currentCoxinhas: number, currentCps: number): {
    shouldAscend: boolean;
    reason: string;
    milkGain: number;
  } {
    // Simple heuristic: prestige if you'd get at least 1 more milk
    const projectedMilk = this.calculateMilk(currentCoxinhas);
    const newMilk = this.totalMilk + projectedMilk;

    if (projectedMilk === 0) {
      return {
        shouldAscend: false,
        reason: 'Não há ganho de milk suficiente',
        milkGain: 0,
      };
    }

    // If prestige would increase multiplier significantly
    const currentMultiplier = this.getCpsMultiplier();
    const futureMultiplier = 1 + newMilk * this.cpsMultiplierPerMilk;
    const multiplierGain = ((futureMultiplier - currentMultiplier) / currentMultiplier) * 100;

    if (multiplierGain > 5) {
      return {
        shouldAscend: true,
        reason: `Vous gagnerez ${multiplierGain.toFixed(1)}% de multiplicateur CPS`,
        milkGain: projectedMilk,
      };
    }

    return {
      shouldAscend: false,
      reason: 'Attend un peu plus pour plus de gains',
      milkGain: projectedMilk,
    };
  }

  // Feature 14: Get total lifetime coxinhas
  getTotalLifetimeCoxinhas(): number {
    return this.prestigeRuns.reduce((sum, run) => sum + run.finalCoxinhas, 0);
  }

  // Feature 15: Get progress to next prestige level
  getProgressToNextLevel(): { current: number; next: number; percentage: number } {
    const current = this.prestigeLevel * 100;
    const next = (this.prestigeLevel + 1) * 100;
    const percentage = ((this.totalMilk - current) / (next - current)) * 100;

    return { current, next, percentage: Math.min(percentage, 100) };
  }

  // Feature 16: Secret prestige titles
  getPrestigeTitle(): string {
    const titles: { [key: number]: string } = {
      0: 'Iniciante',
      1: 'Aprendiz',
      5: 'Mestrado',
      10: 'Sábio',
      25: 'Lendário',
      50: 'Ascendido',
      100: 'Deus Coxinha',
      250: 'Ancião Eterno',
      500: 'Força Suprema',
      1000: '👑 SUPREMACIA PRÊMIO UNIVERSAL 👑',
    };

    for (let level of Object.keys(titles)
      .map(Number)
      .sort((a, b) => b - a)) {
      if (this.totalMilk >= level) {
        return titles[level];
      }
    }

    return 'Novato';
  }

  // Feature 17: Prestige star rating (cosmetic)
  getStarRating(): number {
    // Max 5 stars at 1000+ milk
    return Math.min(5, Math.floor(this.totalMilk / 200));
  }

  // Feature 18: Heavenly upgrade simulation (unlockables)
  getUnlockedPrestigeUpgrades(): string[] {
    const unlocks: { [key: number]: string[] } = {
      0: [],
      10: ['Better Big Coxinha'],
      25: ['Seasonal Events'],
      50: ['Stock Market'],
      100: ['Weather System'],
      250: ['Theme Customization'],
      500: ['Analytics Dashboard'],
      1000: ['Ultimate Prestige Form'],
    };

    const unlockedUpgrades: string[] = [];

    for (let milk of Object.keys(unlocks).map(Number)) {
      if (this.totalMilk >= milk) {
        unlockedUpgrades.push(...unlocks[milk]);
      }
    }

    return unlockedUpgrades;
  }

  // Feature 19: Export prestige data
  exportPrestigeData(): string {
    return JSON.stringify(
      {
        totalMilk: this.totalMilk,
        prestigeLevel: this.prestigeLevel,
        prestigeRuns: this.prestigeRuns,
        currentRunNumber: this.currentRunNumber,
        milestones: Array.from(this.milestones),
      },
      null,
      2
    );
  }

  // Feature 20: Import prestige data
  importPrestigeData(jsonData: string) {
    try {
      const data = JSON.parse(jsonData);

      this.totalMilk = data.totalMilk || 0;
      this.prestigeLevel = data.prestigeLevel || 0;
      this.prestigeRuns = data.prestigeRuns || [];
      this.currentRunNumber = data.currentRunNumber || 1;

      if (Array.isArray(data.milestones)) {
        data.milestones.forEach((m: number) => this.milestones.add(m));
      }

      this.updatePrestigeLevel();
    } catch (e) {
      console.error('Failed to import prestige data', e);
    }
  }
}
