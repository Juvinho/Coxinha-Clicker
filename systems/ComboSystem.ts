// Sistema de Combos de Clique
export class ComboSystem {
  comboCount: number = 0;
  comboTimer: number = 0;
  maxCombo: number = 0;
  maxComboTime: number = 3000; // 3 segundos para quebrar combo
  callbacks: {onCombo?: (count: number) => void; onBreak?: () => void} = {};

  update(delta: number) {
    if (this.comboCount > 0) {
      this.comboTimer -= delta;
      if (this.comboTimer <= 0) {
        this.breakCombo();
      }
    }
  }

  onClick() {
    this.comboCount++;
    this.comboTimer = this.maxComboTime;
    
    if (this.comboCount > this.maxCombo) {
      this.maxCombo = this.comboCount;
    }

    // Feedback a cada 10 combos
    if (this.comboCount % 10 === 0) {
      this.callbacks.onCombo?.(this.comboCount);
    }

    // Multiplicador progressivo
    return this.getMultiplier();
  }

  getMultiplier(): number {
    if (this.comboCount >= 250) return 10;
    if (this.comboCount >= 100) return 5;
    if (this.comboCount >= 50) return 3;
    if (this.comboCount >= 25) return 2;
    if (this.comboCount >= 10) return 1.5;
    return 1;
  }

  breakCombo() {
    if (this.comboCount > 0) {
      this.callbacks.onBreak?.();
    }
    this.comboCount = 0;
    this.comboTimer = 0;
  }

  reset() {
    this.comboCount = 0;
    this.comboTimer = 0;
  }
}

export default ComboSystem;
