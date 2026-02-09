/**
 * Analytics System
 * Comprehensive game metrics tracking and statistics
 * 25 advanced analytics features
 */

interface PlayerSession {
  sessionId: string;
  startTime: number;
  endTime?: number;
  clickCount: number;
  coxinhasProduced: number;
  buildingsPurchased: number;
  upgradesPurchased: number;
  goldenClicked: number;
  eventsTriggered: number;
  averageCps: number;
}

interface DailyStats {
  date: string;
  clicksPerformed: number;
  coxinhasEarned: number;
  buildingsPurchased: number;
  upgradesUnlocked: number;
  sessionDuration: number;
  averageCps: number;
  peakCps: number;
  goldenClickCount: number;
}

interface AchievementProgress {
  id: string;
  name: string;
  progress: number;
  goal: number;
  completed: boolean;
  completedAt?: number;
}

export class AnalyticsSystem {
  // Session tracking
  currentSession: PlayerSession | null = null;
  sessionHistory: PlayerSession[] = [];
  
  // Daily stats
  dailyStats: Map<string, DailyStats> = new Map();
  
  // Metrics
  totalClicks: number = 0;
  totalCoxinhasProduced: number = 0;
  totalBuildingsPurchased: number = 0;
  totalUpgradesPurchased: number = 0;
  totalSessionTime: number = 0;
  totalDistanceTraveled: number = 0; // Combo distance
  
  // Streaks
  currentPlayStreak: number = 0;
  longestPlayStreak: number = 0;
  playedDays: Set<string> = new Set();
  
  // Milestones
  allTimeMilestones: string[] = [];
  
  // Performance metrics
  averageCpsOverTime: number[] = [];
  peakCpsAllTime: number = 0;
  lowestCpsAllTime: number = Infinity;

  callbacks = {
    onMilestoneReached: (milestone: string) => {},
    onSessionEnd: (session: PlayerSession) => {},
  };

  // Feature 1: Start new session
  startSession() {
    this.currentSession = {
      sessionId: `session_${Date.now()}`,
      startTime: Date.now(),
      clickCount: 0,
      coxinhasProduced: 0,
      buildingsPurchased: 0,
      upgradesPurchased: 0,
      goldenClicked: 0,
      eventsTriggered: 0,
      averageCps: 0,
    };
  }

  // Feature 2: End session and save stats
  endSession() {
    if (!this.currentSession) return;

    this.currentSession.endTime = Date.now();
    const duration = (this.currentSession.endTime - this.currentSession.startTime) / 1000;

    this.sessionHistory.push(this.currentSession);
    this.totalSessionTime += duration;

    this.updateDailyStats();
    this.callbacks.onSessionEnd?.(this.currentSession);

    this.currentSession = null;
  }

  // Feature 3: Track click event
  trackClick(damage: number) {
    if (this.currentSession) {
      this.currentSession.clickCount++;
    }
    this.totalClicks++;
    this.totalDistanceTraveled += damage;
  }

  // Feature 4: Track production
  trackProduction(amount: number) {
    if (this.currentSession) {
      this.currentSession.coxinhasProduced += amount;
    }
    this.totalCoxinhasProduced += amount;
  }

  // Feature 5: Track building purchase
  trackBuildingPurchase() {
    if (this.currentSession) {
      this.currentSession.buildingsPurchased++;
    }
    this.totalBuildingsPurchased++;

    // Check for milestone
    if (this.totalBuildingsPurchased % 50 === 0) {
      this.checkMilestones('buildings', this.totalBuildingsPurchased);
    }
  }

  // Feature 6: Track upgrade purchase
  trackUpgradePurchase() {
    if (this.currentSession) {
      this.currentSession.upgradesPurchased++;
    }
    this.totalUpgradesPurchased++;

    // Check for milestone
    if (this.totalUpgradesPurchased % 25 === 0) {
      this.checkMilestones('upgrades', this.totalUpgradesPurchased);
    }
  }

  // Feature 7: Track golden cookie click
  trackGoldenClick() {
    if (this.currentSession) {
      this.currentSession.goldenClicked++;
    }
    this.checkMilestones('golden', this.currentSession?.goldenClicked || 0);
  }

  // Feature 8: Track game events
  trackEvent() {
    if (this.currentSession) {
      this.currentSession.eventsTriggered++;
    }
  }

  // Feature 9: Update CPS metrics
  updateCpsMetric(currentCps: number) {
    if (currentCps > this.peakCpsAllTime) {
      this.peakCpsAllTime = currentCps;
      this.checkMilestones('cps', currentCps);
    }

    if (currentCps < this.lowestCpsAllTime && currentCps > 0) {
      this.lowestCpsAllTime = currentCps;
    }

    this.averageCpsOverTime.push(currentCps);

    // Keep only last 1000 entries
    if (this.averageCpsOverTime.length > 1000) {
      this.averageCpsOverTime.shift();
    }

    if (this.currentSession) {
      this.currentSession.averageCps = this.getAverageCPS();
    }
  }

  // Feature 10: Calculate average CPS
  getAverageCPS(): number {
    if (this.averageCpsOverTime.length === 0) return 0;
    const sum = this.averageCpsOverTime.reduce((a, b) => a + b, 0);
    return sum / this.averageCpsOverTime.length;
  }

  // Feature 11: Get daily stats
  getDailyStats(date?: string): DailyStats | null {
    const key = date || new Date().toISOString().split('T')[0];
    return this.dailyStats.get(key) || null;
  }

  // Feature 12: Update daily stats
  private updateDailyStats() {
    const today = new Date().toISOString().split('T')[0];
    let stats = this.dailyStats.get(today);

    if (!stats) {
      stats = {
        date: today,
        clicksPerformed: 0,
        coxinhasEarned: 0,
        buildingsPurchased: 0,
        upgradesUnlocked: 0,
        sessionDuration: 0,
        averageCps: 0,
        peakCps: 0,
        goldenClickCount: 0,
      };
    }

    if (this.currentSession) {
      stats.clicksPerformed += this.currentSession.clickCount;
      stats.coxinhasEarned += this.currentSession.coxinhasProduced;
      stats.buildingsPurchased += this.currentSession.buildingsPurchased;
      stats.upgradesUnlocked += this.currentSession.upgradesPurchased;
      stats.goldenClickCount += this.currentSession.goldenClicked;
      stats.sessionDuration +=
        (this.currentSession.endTime || Date.now()) - this.currentSession.startTime;
      stats.averageCps = this.getAverageCPS();
      stats.peakCps = this.peakCpsAllTime;
    }

    this.dailyStats.set(today, stats);
    this.playedDays.add(today);
  }

  // Feature 13: Get play streak
  getPlayStreak(): number {
    return this.playedDays.size;
  }

  // Feature 14: Check milestones
  private checkMilestones(type: string, value: number) {
    const milestones = {
      clicks: [100, 1000, 10000, 100000, 1000000],
      buildings: [10, 25, 50, 100, 200],
      upgrades: [10, 25, 50, 100],
      golden: [5, 25, 100],
      cps: [1, 10, 100, 1000, 10000, 100000, 1000000],
    };

    // @ts-ignore
    const typeThresholds = milestones[type] || [];

    typeThresholds.forEach((threshold: number) => {
      const key = `${type}_${threshold}`;
      if (value >= threshold && !this.allTimeMilestones.includes(key)) {
        this.allTimeMilestones.push(key);
        this.callbacks.onMilestoneReached?.(key);
      }
    });
  }

  // Feature 15: Get all milestones reached
  getAllMilestones(): string[] {
    return [...this.allTimeMilestones];
  }

  // Feature 16: Calculate play efficiency
  getPlayEfficiency(): number {
    // Coxinhas per click
    if (this.totalClicks === 0) return 0;
    return this.totalCoxinhasProduced / this.totalClicks;
  }

  // Feature 17: Get total playtime
  getTotalPlaytime(): number {
    return this.totalSessionTime;
  }

  // Feature 18: Average session length
  getAverageSessionLength(): number {
    if (this.sessionHistory.length === 0) return 0;

    const totalDuration = this.sessionHistory.reduce((sum, session) => {
      const duration = (session.endTime || Date.now()) - session.startTime;
      return sum + duration;
    }, 0);

    return totalDuration / this.sessionHistory.length;
  }

  // Feature 19: Get session count
  getSessionCount(): number {
    return this.sessionHistory.length;
  }

  // Feature 20: Get play statistics
  getPlayStats() {
    return {
      totalClicks: this.totalClicks,
      totalProduced: this.totalCoxinhasProduced,
      buildingsPurchased: this.totalBuildingsPurchased,
      upgradesPurchased: this.totalUpgradesPurchased,
      peakCps: this.peakCpsAllTime,
      averageCps: this.getAverageCPS(),
      playEfficiency: this.getPlayEfficiency(),
      averageSessionLength: this.getAverageSessionLength(),
      sessionCount: this.getSessionCount(),
    };
  }

  // Feature 21: Get progression curve (CPS over time)
  getProgressionCurve(): number[] {
    // Return sampled CPS history (every 10th entry)
    return this.averageCpsOverTime.filter((_, i) => i % 10 === 0);
  }

  // Feature 22: Compare to previous session
  compareToLastSession(): { improvement: number; type: 'clicks' | 'production' | 'cps' } | null {
    if (this.sessionHistory.length < 2) return null;

    const lastSession = this.sessionHistory[this.sessionHistory.length - 2];
    const current = this.currentSession;

    if (!current) return null;

    const clickImprovement = ((current.clickCount - lastSession.clickCount) / lastSession.clickCount) * 100;
    const prodImprovement =
      ((current.coxinhasProduced - lastSession.coxinhasProduced) / lastSession.coxinhasProduced) * 100;
    const cpsImprovement = ((current.averageCps - lastSession.averageCps) / lastSession.averageCps) * 100;

    const improvements = [
      { value: clickImprovement, type: 'clicks' as const },
      { value: prodImprovement, type: 'production' as const },
      { value: cpsImprovement, type: 'cps' as const },
    ].sort((a, b) => b.value - a.value);

    return {
      improvement: improvements[0].value,
      type: improvements[0].type,
    };
  }

  // Feature 23: Get achievement progress tracker
  getAchievementProgress(achievementId: string): AchievementProgress | null {
    // Would be populated by external achievement system
    return null;
  }

  // Feature 24: Export analytics data
  exportData(): string {
    return JSON.stringify(
      {
        totalClicks: this.totalClicks,
        totalProduced: this.totalCoxinhasProduced,
        buildingsPurchased: this.totalBuildingsPurchased,
        upgradesPurchased: this.totalUpgradesPurchased,
        peakCps: this.peakCpsAllTime,
        sessionCount: this.sessionHistory.length,
        totalPlaytime: this.totalSessionTime,
        milestones: this.allTimeMilestones,
        dailyStats: Array.from(this.dailyStats.entries()),
      },
      null,
      2
    );
  }

  // Feature 25: Import analytics data
  importData(jsonData: string) {
    try {
      const data = JSON.parse(jsonData);

      this.totalClicks = data.totalClicks;
      this.totalCoxinhasProduced = data.totalProduced;
      this.totalBuildingsPurchased = data.buildingsPurchased;
      this.totalUpgradesPurchased = data.upgradesPurchased;
      this.peakCpsAllTime = data.peakCps;
      this.totalSessionTime = data.totalPlaytime;
      this.allTimeMilestones = data.milestones || [];

      if (Array.isArray(data.dailyStats)) {
        data.dailyStats.forEach(([date, stats]: [string, DailyStats]) => {
          this.dailyStats.set(date, stats);
        });
      }
    } catch (e) {
      console.error('Failed to import analytics data', e);
    }
  }
}
