/**
 * Weather System
 * Dynamic weather affects game production and events
 * 12 distinct weather types with different impacts
 */

export type WeatherType = 'sunny' | 'rainy' | 'stormy' | 'snowy' | 'foggy' | 'windy' | 'hail' | 'hurricane' | 'drought' | 'frost' | 'cloudyburst' | 'aurora';

interface Weather {
  type: WeatherType;
  name: string;
  emoji: string;
  cpsMultiplier: number;
  clickMultiplier: number;
  buildingMultiplier: number;
  goldenChanceMultiplier: number;
  effectColor: string;
  description: string;
  eventChance: number; // 0-1
  duration: number; // seconds
  temperature: number; // Visual effect
  icon: string;
}

export class WeatherSystem {
  currentWeather: Weather | null = null;
  weatherHistory: Weather[] = [];
  weatherTimer: number = 0;
  nextWeatherTime: number = 300; // 5 minutes
  
  lastWeatherType: WeatherType = 'sunny';

  private weatherTypes: Map<WeatherType, Weather> = new Map([
    [
      'sunny',
      {
        type: 'sunny',
        name: 'Dia Ensolarado ☀️',
        emoji: '☀️',
        cpsMultiplier: 1.0,
        clickMultiplier: 1.0,
        buildingMultiplier: 1.0,
        goldenChanceMultiplier: 1.0,
        effectColor: '#FFD700',
        description: 'Perfeito para vender coxinhas!',
        eventChance: 0.1,
        duration: 300,
        temperature: 28,
        icon: '☀️',
      },
    ],
    [
      'rainy',
      {
        type: 'rainy',
        name: 'Chuva Leve 🌧️',
        emoji: '🌧️',
        cpsMultiplier: 1.2,
        clickMultiplier: 0.95,
        buildingMultiplier: 1.1,
        goldenChanceMultiplier: 1.05,
        effectColor: '#4A90E2',
        description: 'Pessoas querendo fritar coxinhas!',
        eventChance: 0.3,
        duration: 240,
        temperature: 18,
        icon: '🌧️',
      },
    ],
    [
      'stormy',
      {
        type: 'stormy',
        name: 'Tempestade ⛈️',
        emoji: '⛈️',
        cpsMultiplier: 1.5,
        clickMultiplier: 0.85,
        buildingMultiplier: 1.3,
        goldenChanceMultiplier: 1.15,
        effectColor: '#696969',
        description: 'Fogo na fritureira!',
        eventChance: 0.5,
        duration: 180,
        temperature: 12,
        icon: '⛈️',
      },
    ],
    [
      'snowy',
      {
        type: 'snowy',
        name: 'Nevando ❄️',
        emoji: '❄️',
        cpsMultiplier: 0.8,
        clickMultiplier: 1.2,
        buildingMultiplier: 0.9,
        goldenChanceMultiplier: 0.8,
        effectColor: '#E0FFFF',
        description: 'Frio refresca o clicker!',
        eventChance: 0.2,
        duration: 400,
        temperature: -5,
        icon: '❄️',
      },
    ],
    [
      'foggy',
      {
        type: 'foggy',
        name: 'Nevoeiro 🌫️',
        emoji: '🌫️',
        cpsMultiplier: 0.9,
        clickMultiplier: 0.9,
        buildingMultiplier: 1.0,
        goldenChanceMultiplier: 0.7,
        effectColor: '#BEBEBE',
        description: 'Tudo fica incerto...',
        eventChance: 0.2,
        duration: 350,
        temperature: 15,
        icon: '🌫️',
      },
    ],
    [
      'windy',
      {
        type: 'windy',
        name: 'Ventoso 💨',
        emoji: '💨',
        cpsMultiplier: 1.1,
        clickMultiplier: 1.15,
        buildingMultiplier: 0.95,
        goldenChanceMultiplier: 1.3,
        effectColor: '#87CEEB',
        description: 'Vento leva as coxinhas!',
        eventChance: 0.4,
        duration: 200,
        temperature: 22,
        icon: '💨',
      },
    ],
    [
      'hail',
      {
        type: 'hail',
        name: 'Granizo 🌨️',
        emoji: '🌨️',
        cpsMultiplier: 0.7,
        clickMultiplier: 1.4,
        buildingMultiplier: 0.8,
        goldenChanceMultiplier: 1.4,
        effectColor: '#B0E0E6',
        description: 'Puro caos! Clique mais!',
        eventChance: 0.6,
        duration: 150,
        temperature: 5,
        icon: '🌨️',
      },
    ],
    [
      'hurricane',
      {
        type: 'hurricane',
        name: 'Furacão 🌪️',
        emoji: '🌪️',
        cpsMultiplier: 2.0,
        clickMultiplier: 0.7,
        buildingMultiplier: 1.8,
        goldenChanceMultiplier: 1.5,
        effectColor: '#FF6347',
        description: 'DESTRUIÇÃO! Máxima produção!',
        eventChance: 0.8,
        duration: 120,
        temperature: 8,
        icon: '🌪️',
      },
    ],
    [
      'drought',
      {
        type: 'drought',
        name: 'Seca 🏜️',
        emoji: '🏜️',
        cpsMultiplier: 0.5,
        clickMultiplier: 1.5,
        buildingMultiplier: 0.6,
        goldenChanceMultiplier: 0.5,
        effectColor: '#DAA520',
        description: 'Seca! Só cliques valem!',
        eventChance: 0.1,
        duration: 500,
        temperature: 38,
        icon: '🏜️',
      },
    ],
    [
      'frost',
      {
        type: 'frost',
        name: 'Geada 🥶',
        emoji: '🥶',
        cpsMultiplier: 1.3,
        clickMultiplier: 1.1,
        buildingMultiplier: 1.2,
        goldenChanceMultiplier: 1.25,
        effectColor: '#00BFFF',
        description: 'Tudo congelado. Perfeito.',
        eventChance: 0.25,
        duration: 320,
        temperature: -8,
        icon: '🥶',
      },
    ],
    [
      'cloudyburst',
      {
        type: 'cloudyburst',
        name: 'Nuvem Raivosa 🌦️',
        emoji: '🌦️',
        cpsMultiplier: 1.4,
        clickMultiplier: 1.2,
        buildingMultiplier: 1.3,
        goldenChanceMultiplier: 1.4,
        effectColor: '#FFB6C1',
        description: 'Raridade! Super produção!',
        eventChance: 0.15,
        duration: 180,
        temperature: 20,
        icon: '🌦️',
      },
    ],
    [
      'aurora',
      {
        type: 'aurora',
        name: 'Aurora Boreal 🌌',
        emoji: '🌌',
        cpsMultiplier: 1.7,
        clickMultiplier: 1.3,
        buildingMultiplier: 1.6,
        goldenChanceMultiplier: 2.0,
        effectColor: '#00FF7F',
        description: 'MÁGICA! Golden cookies x2!',
        eventChance: 0.05,
        duration: 250,
        temperature: -10,
        icon: '🌌',
      },
    ],
  ]);

  callbacks = {
    onWeatherChange: (oldWeather: Weather | null, newWeather: Weather) => {},
  };

  // Feature 1: Initialize weather
  constructor(initialType?: WeatherType) {
    if (initialType) {
      this.currentWeather = this.weatherTypes.get(initialType) || this.weatherTypes.get('sunny')!;
    } else {
      this.randomizeWeather();
    }
  }

  // Feature 2: Random weather selection
  randomizeWeather() {
    const types = Array.from(this.weatherTypes.keys());
    let newType = types[Math.floor(Math.random() * types.length)];

    // Prevent same weather twice in a row
    while (newType === this.lastWeatherType && types.length > 1) {
      newType = types[Math.floor(Math.random() * types.length)];
    }

    this.setWeather(newType);
  }

  // Feature 3: Set specific weather
  setWeather(type: WeatherType) {
    const oldWeather = this.currentWeather;
    const newWeather = this.weatherTypes.get(type);

    if (!newWeather) return;

    this.currentWeather = newWeather;
    this.weatherTimer = 0;
    this.nextWeatherTime = newWeather.duration;
    this.lastWeatherType = type;

    if (oldWeather) {
      this.weatherHistory.push(oldWeather);
    }

    this.callbacks.onWeatherChange?.(oldWeather, newWeather);
  }

  // Feature 4: Update weather timer
  update(deltaTime: number): boolean {
    if (!this.currentWeather) return false;

    this.weatherTimer += deltaTime;

    if (this.weatherTimer >= this.nextWeatherTime) {
      this.randomizeWeather();
      return true; // Weather changed
    }

    return false;
  }

  // Feature 5: Get CPS multiplier
  getCpsMultiplier(): number {
    return this.currentWeather?.cpsMultiplier || 1.0;
  }

  // Feature 6: Get click multiplier
  getClickMultiplier(): number {
    return this.currentWeather?.clickMultiplier || 1.0;
  }

  // Feature 7: Get building multiplier
  getBuildingMultiplier(): number {
    return this.currentWeather?.buildingMultiplier || 1.0;
  }

  // Feature 8: Get golden chance multiplier
  getGoldenChanceMultiplier(): number {
    return this.currentWeather?.goldenChanceMultiplier || 1.0;
  }

  // Feature 9: Get weather severity (0-100)
  getSeverity(): number {
    if (!this.currentWeather) return 0;

    // Based on extreme multipliers (very high or very low)
    const abs = Math.abs(this.currentWeather.cpsMultiplier - 1);
    return Math.min(abs * 50, 100);
  }

  // Feature 10: Check if weather is extreme
  isExtreme(): boolean {
    if (!this.currentWeather) return false;
    return this.currentWeather.cpsMultiplier > 1.5 || this.currentWeather.cpsMultiplier < 0.8;
  }

  // Feature 11: Get forecast (next 5 weather changes)
  getForecast(): Weather[] {
    // Simple prediction based on history
    const forecast: Weather[] = [];
    const types = Array.from(this.weatherTypes.keys());

    for (let i = 0; i < 5; i++) {
      const randomIdx = Math.floor(Math.random() * types.length);
      forecast.push(this.weatherTypes.get(types[randomIdx])!);
    }

    return forecast;
  }

  // Feature 12: Get weather effects summary
  getEffectsSummary(): string {
    if (!this.currentWeather) return '';

    const weather = this.currentWeather;
    const effects: string[] = [];

    if (weather.cpsMultiplier > 1) {
      effects.push(`Produção +${Math.round((weather.cpsMultiplier - 1) * 100)}%`);
    } else if (weather.cpsMultiplier < 1) {
      effects.push(`Produção ${Math.round((1 - weather.cpsMultiplier) * 100)}%`);
    }

    if (weather.clickMultiplier > 1) {
      effects.push(`Cliques +${Math.round((weather.clickMultiplier - 1) * 100)}%`);
    } else if (weather.clickMultiplier < 1) {
      effects.push(`Cliques ${Math.round((1 - weather.clickMultiplier) * 100)}%`);
    }

    if (weather.goldenChanceMultiplier > 1.1) {
      effects.push(`Golden x${weather.goldenChanceMultiplier.toFixed(1)}`);
    }

    return effects.join(' | ');
  }

  // Time remaining in current weather
  getTimeRemaining(): number {
    return Math.max(0, this.nextWeatherTime - this.weatherTimer);
  }

  // Get progress bar percentage (0-100)
  getProgressPercent(): number {
    return (this.weatherTimer / this.nextWeatherTime) * 100;
  }

  // Get all weather types for UI display
  getAllWeatherTypes(): Weather[] {
    return Array.from(this.weatherTypes.values());
  }

  // Check if specific bonus active
  hasBonus(type: 'cps' | 'click' | 'golden'): boolean {
    if (!this.currentWeather) return false;

    switch (type) {
      case 'cps':
        return this.currentWeather.cpsMultiplier > 1.05;
      case 'click':
        return this.currentWeather.clickMultiplier > 1.05;
      case 'golden':
        return this.currentWeather.goldenChanceMultiplier > 1.1;
      default:
        return false;
    }
  }
}
