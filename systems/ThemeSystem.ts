/**
 * Theme System
 * Dynamic theming system for visual customization
 * 20 features for comprehensive theme management
 */

export type ThemeName = 'classic' | 'dark' | 'neon' | 'carnaval' | 'oceano' | 'vintage' | 'cyberpunk' | 'sunset';

interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  border: string;
  success: string;
  warning: string;
  danger: string;
  info: string;
}

interface Theme {
  name: ThemeName;
  displayName: string;
  colors: ThemeColors;
  description: string;
  emoji: string;
  unlocked: boolean;
  unlockedAt?: number;
  cost?: number; // Coxinhas needed to unlock
  borderRadius: string;
  fontFamily: string;
  shadowIntensity: number; // 0-1
  particleColor?: string;
  backgroundImage?: string;
  animation: 'smooth' | 'bouncy' | 'glitch' | 'calm';
}

export class ThemeSystem {
  currentTheme: Theme;
  themes: Map<ThemeName, Theme> = new Map();
  themeHistory: ThemeName[] = [];
  customTheme: Partial<Theme> | null = null;

  callbacks = {
    onThemeChange: (oldTheme: Theme, newTheme: Theme) => {},
    onThemeUnlock: (theme: Theme) => {},
  };

  constructor() {
    this.initializeThemes();
    this.currentTheme = this.themes.get('classic')!;
  }

  // Feature 1: Initialize all themes
  private initializeThemes() {
    const allThemes: { [key in ThemeName]: Theme } = {
      classic: {
        name: 'classic',
        displayName: 'Classic Coxinha',
        colors: {
          primary: '#ffaa00',
          secondary: '#d4a574',
          accent: '#39ff14',
          background: '#1a0f08',
          text: '#e5e5e5',
          border: '#3d2211',
          success: '#39ff14',
          warning: '#FFA500',
          danger: '#FF6347',
          info: '#4A90E2',
        },
        description: 'O clássico tema quente das coxinhas douradas',
        emoji: '🧡',
        unlocked: true,
        borderRadius: '0.5rem',
        fontFamily: "'Arial', sans-serif",
        shadowIntensity: 0.6,
        particleColor: '#ffaa00',
        animation: 'smooth',
      },
      dark: {
        name: 'dark',
        displayName: 'Dark Mode',
        colors: {
          primary: '#2196F3',
          secondary: '#606060',
          accent: '#FF6B6B',
          background: '#0a0a0a',
          text: '#f0f0f0',
          border: '#1a1a1a',
          success: '#4CAF50',
          warning: '#FF9800',
          danger: '#F44336',
          info: '#00BCD4',
        },
        description: 'Suave tema escuro para madrugadas de clicker',
        emoji: '🌙',
        unlocked: true,
        borderRadius: '0.75rem',
        fontFamily: "'Segoe UI', sans-serif",
        shadowIntensity: 0.4,
        particleColor: '#2196F3',
        animation: 'calm',
      },
      neon: {
        name: 'neon',
        displayName: 'Neon Cyberpunk',
        colors: {
          primary: '#FF10F0',
          secondary: '#00FFF0',
          accent: '#FFD700',
          background: '#0d0221',
          text: '#00FFF0',
          border: '#FF10F0',
          success: '#39FF14',
          warning: '#FFD700',
          danger: '#FF0080',
          info: '#00FFF0',
        },
        description: 'Vibrante e futurístico! Proteja seus olhos!',
        emoji: '⚡',
        unlocked: false,
        cost: 100000000,
        borderRadius: '0.25rem',
        fontFamily: "'Courier New', monospace",
        shadowIntensity: 1.0,
        particleColor: '#FF10F0',
        backgroundImage: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><line x1="0" y1="0" x2="100" y2="100" stroke="%23FF10F0" opacity="0.1"/></svg>',
        animation: 'glitch',
      },
      carnaval: {
        name: 'carnaval',
        displayName: '🎉 Carnaval',
        colors: {
          primary: '#FF6B35',
          secondary: '#F9C74F',
          accent: '#90BE6D',
          background: '#1a0a1a',
          text: '#FFD60A',
          border: '#FF006E',
          success: '#90BE6D',
          warning: '#F9C74F',
          danger: '#FF006E',
          info: '#577590',
        },
        description: 'FESTA! Cores do carnaval brasileiro!',
        emoji: '🎊',
        unlocked: false,
        cost: 50000000,
        borderRadius: '1rem',
        fontFamily: "'Arial Black', sans-serif",
        shadowIntensity: 0.8,
        particleColor: '#FF006E',
        animation: 'bouncy',
      },
      oceano: {
        name: 'oceano',
        displayName: 'Oceano Azul',
        colors: {
          primary: '#006994',
          secondary: '#00A8D8',
          accent: '#FFB703',
          background: '#0a1428',
          text: '#E0F7FF',
          border: '#004E89',
          success: '#52B788',
          warning: '#F4D35E',
          danger: '#EE964B',
          info: '#A8DADC',
        },
        description: 'Fresco e tranquilo como o oceano',
        emoji: '🌊',
        unlocked: false,
        cost: 75000000,
        borderRadius: '0.75rem',
        fontFamily: "'Trebuchet MS', sans-serif",
        shadowIntensity: 0.5,
        particleColor: '#00A8D8',
        animation: 'calm',
      },
      vintage: {
        name: 'vintage',
        displayName: 'Vintage Retrô',
        colors: {
          primary: '#BB4430',
          secondary: '#A68B5B',
          accent: '#F7B32B',
          background: '#2C1810',
          text: '#D4A574',
          border: '#5D4E37',
          success: '#8FBB8F',
          warning: '#F7B32B',
          danger: '#C41E3A',
          info: '#6BA3A3',
        },
        description: 'Estilo dos anos 70 com tons quentes',
        emoji: '📺',
        unlocked: false,
        cost: 30000000,
        borderRadius: '0.4rem',
        fontFamily: "'Georgia', serif",
        shadowIntensity: 0.7,
        particleColor: '#F7B32B',
        animation: 'smooth',
      },
      cyberpunk: {
        name: 'cyberpunk',
        displayName: 'Cyberpunk 2077',
        colors: {
          primary: '#FFD60A',
          secondary: '#003566',
          accent: '#FB5607',
          background: '#001a33',
          text: '#FFD60A',
          border: '#FB5607',
          success: '#06D6A0',
          warning: '#FFD60A',
          danger: '#EF476F',
          info: '#FFD60A',
        },
        description: 'Amarelo agressivo e linhas retas',
        emoji: '🤖',
        unlocked: false,
        cost: 120000000,
        borderRadius: '0rem',
        fontFamily: "'Arial', sans-serif",
        shadowIntensity: 0.9,
        particleColor: '#FFD60A',
        animation: 'glitch',
      },
      sunset: {
        name: 'sunset',
        displayName: 'Pôr do Sol',
        colors: {
          primary: '#FF6B5A',
          secondary: '#F47456',
          accent: '#FFA630',
          background: '#1a0a0f',
          text: '#FFE4BA',
          border: '#8B3A3A',
          success: '#A8D5BA',
          warning: '#FFA630',
          danger: '#E63946',
          info: '#F1FAEE',
        },
        description: 'Quente e relaxante, como o pôr do sol',
        emoji: '🌅',
        unlocked: false,
        cost: 60000000,
        borderRadius: '0.75rem',
        fontFamily: "'Segoe UI', sans-serif",
        shadowIntensity: 0.6,
        particleColor: '#FFA630',
        animation: 'calm',
      },
    };

    Object.values(allThemes).forEach(theme => {
      this.themes.set(theme.name, theme);
    });
  }

  // Feature 2: Change theme
  switchTheme(themeName: ThemeName) {
    const newTheme = this.themes.get(themeName);
    if (!newTheme) return;

    const oldTheme = this.currentTheme;
    this.currentTheme = newTheme;
    this.themeHistory.push(themeName);

    this.applyThemeToDOM(newTheme);
    this.callbacks.onThemeChange?.(oldTheme, newTheme);
  }

  // Feature 3: Apply theme to DOM
  private applyThemeToDOM(theme: Theme) {
    const root = document.documentElement;
    const colors = theme.colors;

    // Apply CSS custom properties
    root.style.setProperty('--color-primary', colors.primary);
    root.style.setProperty('--color-secondary', colors.secondary);
    root.style.setProperty('--color-accent', colors.accent);
    root.style.setProperty('--color-background', colors.background);
    root.style.setProperty('--color-text', colors.text);
    root.style.setProperty('--color-border', colors.border);
    root.style.setProperty('--color-success', colors.success);
    root.style.setProperty('--color-warning', colors.warning);
    root.style.setProperty('--color-danger', colors.danger);
    root.style.setProperty('--color-info', colors.info);
    root.style.setProperty('--border-radius', theme.borderRadius);
    root.style.setProperty('--font-family', theme.fontFamily);
    root.style.setProperty('--shadow-intensity', theme.shadowIntensity.toString());
  }

  // Feature 4: Get current colors
  getCurrentColors(): ThemeColors {
    return this.currentTheme.colors;
  }

  // Feature 5: Preview theme without switching
  previewTheme(themeName: ThemeName): ThemeColors | null {
    return this.themes.get(themeName)?.colors || null;
  }

  // Feature 6: Unlock theme
  unlockTheme(themeName: ThemeName, coxinhas: number): boolean {
    const theme = this.themes.get(themeName);
    if (!theme || theme.unlocked) return false;

    const cost = theme.cost || 50000000;
    if (coxinhas < cost) return false;

    theme.unlocked = true;
    theme.unlockedAt = Date.now();

    this.callbacks.onThemeUnlock?.(theme);

    return true;
  }

  // Feature 7: Get locked themes
  getLockedThemes(): Theme[] {
    return Array.from(this.themes.values()).filter(t => !t.unlocked);
  }

  // Feature 8: Get unlocked themes
  getUnlockedThemes(): Theme[] {
    return Array.from(this.themes.values()).filter(t => t.unlocked);
  }

  // Feature 9: Get all themes
  getAllThemes(): Theme[] {
    return Array.from(this.themes.values());
  }

  // Feature 10: Create custom theme
  createCustomTheme(colors: Partial<ThemeColors>): Theme {
    const base = this.currentTheme;
    this.customTheme = {
      name: 'custom' as ThemeName,
      displayName: 'Custom Theme',
      colors: { ...base.colors, ...colors },
      description: 'Seu tema personalizado!',
      emoji: '🎨',
      unlocked: true,
      borderRadius: base.borderRadius,
      fontFamily: base.fontFamily,
      shadowIntensity: base.shadowIntensity,
      animation: base.animation,
    };

    return this.customTheme as Theme;
  }

  // Feature 11: Get theme cost
  getThemeCost(themeName: ThemeName): number {
    return this.themes.get(themeName)?.cost || 0;
  }

  // Feature 12: Check if theme is unlocked
  isThemeUnlocked(themeName: ThemeName): boolean {
    return this.themes.get(themeName)?.unlocked || false;
  }

  // Feature 13: Get random theme
  getRandomTheme(): Theme {
    const themes = Array.from(this.themes.values());
    return themes[Math.floor(Math.random() * themes.length)];
  }

  // Feature 14: Theme easter egg - "Matrix"
  getMatrixTheme(): Theme {
    return {
      name: 'dark' as ThemeName,
      displayName: 'Matrix Mode',
      colors: {
        primary: '#00FF00',
        secondary: '#00AA00',
        accent: '#00FF00',
        background: '#000000',
        text: '#00FF00',
        border: '#00FF00',
        success: '#00FF00',
        warning: '#FFFF00',
        danger: '#FF0000',
        info: '#00FF00',
      },
      description: 'THE MATRIX HAS YOU',
      emoji: '💚',
      unlocked: true,
      borderRadius: '0rem',
      fontFamily: "'Courier New', monospace",
      shadowIntensity: 1.0,
      particleColor: '#00FF00',
      animation: 'glitch',
    };
  }

  // Feature 15: Animation type control
  getAnimationType(): string {
    return this.currentTheme.animation;
  }

  // Feature 16: Shadow intensity control
  getShadowIntensity(): number {
    return this.currentTheme.shadowIntensity;
  }

  // Feature 17: Particle color
  getParticleColor(): string {
    return this.currentTheme.particleColor || this.currentTheme.colors.primary;
  }

  // Feature 18: Font family
  getFontFamily(): string {
    return this.currentTheme.fontFamily;
  }

  // Feature 19: Border radius
  getBorderRadius(): string {
    return this.currentTheme.borderRadius;
  }

  // Feature 20: Export/Import theme settings
  exportThemeSettings(): string {
    return JSON.stringify({
      currentTheme: this.currentTheme.name,
      unlockedThemes: Array.from(this.themes.values())
        .filter(t => t.unlocked)
        .map(t => t.name),
      customTheme: this.customTheme,
    });
  }

  importThemeSettings(jsonData: string) {
    try {
      const data = JSON.parse(jsonData);

      // Restore unlocked themes
      if (Array.isArray(data.unlockedThemes)) {
        data.unlockedThemes.forEach((name: string) => {
          const theme = this.themes.get(name as ThemeName);
          if (theme) theme.unlocked = true;
        });
      }

      // Restore custom theme if exists
      if (data.customTheme) {
        this.customTheme = data.customTheme;
      }

      // Switch to saved theme
      if (data.currentTheme) {
        this.switchTheme(data.currentTheme);
      }
    } catch (e) {
      console.error('Failed to import theme settings', e);
    }
  }

  // Get theme recommendation based on time of day
  getRecommendedTheme(): Theme {
    const hour = new Date().getHours();

    if (hour >= 6 && hour < 12) {
      return this.themes.get('sunset') || this.themes.get('classic')!;
    } else if (hour >= 12 && hour < 18) {
      return this.themes.get('classic')!;
    } else if (hour >= 18 && hour < 21) {
      return this.themes.get('sunset') || this.themes.get('classic')!;
    } else {
      return this.themes.get('dark') || this.themes.get('classic')!;
    }
  }
}
