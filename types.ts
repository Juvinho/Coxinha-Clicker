export interface Building {
  id: string;
  name: string;
  baseCost: number;
  baseCps: number; // Coxinhas per second
  count: number;
  description: string;
  icon: string;
}

export type UpgradeType = 'building' | 'click' | 'global' | 'golden' | 'synergy';

export interface Upgrade {
  id: string;
  name: string;
  type: UpgradeType;
  description: string;
  cost: number;
  multiplier: number; // For buildings/click: multiplier. For Golden: frequency multiplier.
  triggerBuildingId?: string; // Building to buff (or source for synergy)
  synergyTargetId?: string; // Target building for synergy
  purchased: boolean;
  unlockCondition?: number; // Minimum buildings required to see this
}

export interface FloatingText {
  id: number;
  x: number;
  y: number;
  text: string;
  color: string;
  isBig?: boolean;
}

export interface GameState {
  coxinhas: number;
  totalCoxinhas: number;
  startTime: number;
  buildings: Building[];
  upgrades: Upgrade[];
  prestigeLevel: number;
}

export interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  speedY: number;
  speedX: number;
  opacity: number;
  color: string;
}