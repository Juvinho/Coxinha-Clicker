// Sistema de Missões Diárias
export interface DailyQuest {
  id: string;
  name: string;
  description: string;
  type: 'clicks' | 'buildings_bought' | 'golden_clicked' | 'produced';
  progress: number;
  goal: number;
  reward: {type: string; value: number | string};
  icon: string;
  completed: boolean;
}

export class DailyQuests {
  quests: DailyQuest[] = [];
  lastReset: number = Date.now();
  resetHour: number = 0; // Reseta meia-noite (00:00)

  questPool: DailyQuest[] = [
    {
      id: 'clicker_100',
      name: 'Maratonista do Click',
      description: 'Clique 1000 vezes',
      type: 'clicks',
      progress: 0,
      goal: 1000,
      reward: {type: 'coxinhas_time', value: '1hora'},
      icon: '👆',
      completed: false
    },
    {
      id: 'comprador_100',
      name: 'Comprador Compulsivo',
      description: 'Compre 50 prédios',
      type: 'buildings_bought',
      progress: 0,
      goal: 50,
      reward: {type: 'upgrade_random', value: 1},
      icon: '🛒',
      completed: false
    },
    {
      id: 'caçador_dourado',
      name: 'Caçador Dourado',
      description: 'Clique 5 Coxinhas Douradas',
      type: 'golden_clicked',
      progress: 0,
      goal: 5,
      reward: {type: 'sugar_lump', value: 1},
      icon: '⭐',
      completed: false
    },
    {
      id: 'produtor_massa',
      name: 'Produção em Massa',
      description: 'Produza 100M coxinhas',
      type: 'produced',
      progress: 0,
      goal: 100_000_000,
      reward: {type: 'multiplier_boost', value: 1.05},
      icon: '📈',
      completed: false
    },
    {
      id: 'clicker_500',
      name: 'Clicker Extremo',
      description: 'Clique 5000 vezes',
      type: 'clicks',
      progress: 0,
      goal: 5000,
      reward: {type: 'coxinhas_time', value: '5hours'},
      icon: '🔥',
      completed: false
    },
    {
      id: 'construtor_200',
      name: 'Construtor Lendário',
      description: 'Compre 200 prédios',
      type: 'buildings_bought',
      progress: 0,
      goal: 200,
      reward: {type: 'upgrade_random', value: 2},
      icon: '🏗️',
      completed: false
    }
  ];

  constructor() {
    this.generateDaily();
  }

  generateDaily() {
    // Selecionar 3 quests aleatórias
    const shuffled = [...this.questPool].sort(() => Math.random() - 0.5);
    this.quests = shuffled.slice(0, 3).map(q => ({
      ...q,
      progress: 0,
      completed: false
    }));
  }

  checkProgress(type: string, value: number) {
    this.quests.forEach(quest => {
      if (!quest.completed && quest.type === type) {
        quest.progress = Math.min(quest.progress + value, quest.goal);
        if (quest.progress >= quest.goal) {
          this.completeQuest(quest);
        }
      }
    });

    this.checkReset();
  }

  completeQuest(quest: DailyQuest) {
    quest.completed = true;
  }

  checkReset() {
    const now = new Date();
    const lastResetDate = new Date(this.lastReset);
    
    // Se mudou de dia, resetar quests
    if (
      now.getDate() !== lastResetDate.getDate() ||
      now.getMonth() !== lastResetDate.getMonth() ||
      now.getFullYear() !== lastResetDate.getFullYear()
    ) {
      this.reset();
    }
  }

  reset() {
    this.lastReset = Date.now();
    this.generateDaily();
  }

  getCompletedCount(): number {
    return this.quests.filter(q => q.completed).length;
  }

  getProgress(): number {
    return (this.getCompletedCount() / this.quests.length) * 100;
  }
}

export default DailyQuests;
