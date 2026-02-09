// Sistema de Eventos Aleatórios
export interface RandomEventType {
  id: string;
  name: string;
  chance: number; // 0-1 por frame
  duration: number;
  effect: (game: any) => void;
  message: string;
  icon: string;
  color: string;
}

export class RandomEvents {
  events: RandomEventType[] = [
    {
      id: 'chuva_coxinhas',
      name: 'Chuva de Coxinhas',
      chance: 0.000001,
      duration: 30000,
      effect: (game) => {
        const bonus = game.cps * 0.5;
        game.floatingCoxinhas = (game.floatingCoxinhas || 0) + bonus;
      },
      message: '☔ CHUVA DE COXINHAS! +50% CpS por 30s',
      icon: '☔',
      color: '#00ffff'
    },
    {
      id: 'vovo_inspirada',
      name: 'Vovó Inspirada',
      chance: 0.0000005,
      duration: 60000,
      effect: (game) => {
        game.vovoMultiplier = (game.vovoMultiplier || 1) * 5;
      },
      message: '👵✨ Vovó teve inspiração! +400% produção vovó por 1min',
      icon: '✨',
      color: '#ffff00'
    },
    {
      id: 'apagao',
      name: 'Apagão',
      chance: 0.0000003,
      duration: 20000,
      effect: (game) => {
        game.cpsPenalty = (game.cpsPenalty || 1) * 0.5;
      },
      message: '⚡❌ APAGÃO! -50% produção por 20s',
      icon: '❌',
      color: '#ff0000'
    },
    {
      id: 'rush_hour',
      name: 'Hora do Rush',
      chance: 0.0000008,
      duration: 45000,
      effect: (game) => {
        game.clickMultiplier = (game.clickMultiplier || 1) * 10;
      },
      message: '🏃 HORA DO RUSH! Cliques x10 por 45s',
      icon: '🏃',
      color: '#ff6b35'
    },
    {
      id: 'fiscal',
      name: 'Fiscal na Área',
      chance: 0.0000002,
      duration: 0,
      effect: (game) => {
        const loss = game.coxinhas * 0.1;
        game.coxinhas -= loss;
      },
      message: '🚔 Fiscal apareceu! Perdeu 10% das coxinhas',
      icon: '🚔',
      color: '#ff0000'
    },
    {
      id: 'cliente_vip',
      name: 'Cliente VIP',
      chance: 0.0000004,
      duration: 0,
      effect: (game) => {
        const bonus = game.cps * 60; // 1 minuto de produção
        game.coxinhas += bonus;
      },
      message: '💎 Cliente VIP comprou tudo! +1min produção instantânea!',
      icon: '💎',
      color: '#00ff88'
    }
  ];

  activeEvent: RandomEventType | null = null;
  activeTimer: number = 0;

  update(delta: number, game: any) {
    // Se há evento ativo, atualizar timer
    if (this.activeEvent) {
      this.activeTimer -= delta;
      if (this.activeTimer <= 0) {
        this.activeEvent = null;
      }
    }

    // Checar novo evento
    if (!this.activeEvent) {
      for (const event of this.events) {
        if (Math.random() < event.chance * delta) {
          this.trigger(event, game);
          return;
        }
      }
    }
  }

  trigger(event: RandomEventType, game: any) {
    this.activeEvent = event;
    this.activeTimer = event.duration;
    event.effect(game);
    
    // Callback para mostrar notificação
    game.showEventNotification?.(event);
  }

  reset() {
    this.activeEvent = null;
    this.activeTimer = 0;
  }
}

export default RandomEvents;
