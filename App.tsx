import React, { useState, useEffect, useRef } from 'react';
import { Building, Upgrade, FloatingText, Particle } from './types';
import { INITIAL_BUILDINGS, INITIAL_UPGRADES } from './constants';
import { calculateBuildingCost, formatNumber } from './utils';
import LeftPanel from './components/LeftPanel';
import CenterPanel from './components/CenterPanel';
import RightPanel from './components/RightPanel';
import BottomPanel from './components/BottomPanel';
import GoldenCoxinha from './components/GoldenCoxinha';

const SAVE_KEY = 'coxinha_clicker_2026';

const App: React.FC = () => {
  // === STATE ===
  const [coxinhas, setCoxinhas] = useState<number>(0);
  const [lifetimeCoxinhas, setLifetimeCoxinhas] = useState<number>(0);
  const [buildings, setBuildings] = useState<Building[]>(INITIAL_BUILDINGS);
  const [upgrades, setUpgrades] = useState<Upgrade[]>(INITIAL_UPGRADES);
  const [cps, setCps] = useState<number>(0);
  const [clickPower, setClickPower] = useState<number>(1);
  const [globalMultiplier, setGlobalMultiplier] = useState<number>(1);
  const [goldenSpawnRate, setGoldenSpawnRate] = useState<number>(1);
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [frenzyActive, setFrenzyActive] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // === REFS ===
  const frenzyTimerRef = useRef<number | null>(null);
  const frenzyMultiplierRef = useRef<number>(1);

  // === PRODUCTION CALCULATION ===
  useEffect(() => {
    let newCps = 0;
    let newGlobalMultiplier = 1;
    let newClickPowerMultiplier = 1;
    let newGoldenRate = 1;

    // Calculate base CPS from buildings + building upgrades
    buildings.forEach(b => {
      let bCps = b.baseCps;
      
      // Apply building-specific upgrades
      upgrades
        .filter(u => u.purchased && u.type === 'building' && u.triggerBuildingId === b.id)
        .forEach(u => {
          bCps *= u.multiplier;
        });

      newCps += bCps * b.count;
    });

    // Global upgrades
    upgrades
      .filter(u => u.purchased && u.type === 'global')
      .forEach(u => {
        newGlobalMultiplier *= u.multiplier;
      });

    // Click upgrades
    upgrades
      .filter(u => u.purchased && u.type === 'click')
      .forEach(u => {
        newClickPowerMultiplier *= u.multiplier;
      });

    // Golden rate
    upgrades
      .filter(u => u.purchased && u.type === 'golden')
      .forEach(u => {
        newGoldenRate *= u.multiplier;
      });

    // Apply multipliers
    const totalMultiplier = newGlobalMultiplier * frenzyMultiplierRef.current;
    newCps *= totalMultiplier;
    let computedClick = (1 + (newCps * 0.05)) * newClickPowerMultiplier;
    computedClick *= frenzyMultiplierRef.current;

    setCps(newCps);
    setClickPower(computedClick);
    setGlobalMultiplier(totalMultiplier);
    setGoldenSpawnRate(newGoldenRate);
  }, [buildings, upgrades, frenzyActive]);

  // === PRODUCTION LOOP ===
  useEffect(() => {
    const interval = setInterval(() => {
      setCoxinhas(prev => {
        const deltaSeconds = 0.1;
        const earned = cps * deltaSeconds;
        const newTotal = prev + earned;
        setLifetimeCoxinhas(prevLife => prevLife + earned);
        return newTotal;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [cps]);

  // === PARTICLES ===
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(p =>
        p
          .map(pt => ({
            ...pt,
            x: pt.x + pt.speedX * 0.95,
            y: pt.y + pt.speedY + 0.8,
            opacity: pt.opacity - 0.04
          }))
          .filter(pt => pt.opacity > 0)
      );
    }, 16);
    return () => clearInterval(interval);
  }, []);

  // === UTILITY FUNCTIONS ===
  const spawnParticles = (x: number, y: number, type: 'oil' | 'flour' | 'golden', count = 8) => {
    const newParticles: Particle[] = [];
    const colors = type === 'oil' ? ['#ffaa00', '#d4a574'] : type === 'flour' ? ['#ffffff', '#f0f0f0'] : ['#ff0000', '#00ff00', '#0000ff', '#ffff00'];

    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: Date.now() + i + Math.random(),
        x,
        y,
        size: Math.random() * 6 + 2,
        rotation: Math.random() * 360,
        speedX: (Math.random() - 0.5) * 10,
        speedY: (Math.random() - 1) * 10 - 2,
        opacity: 1,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    setParticles(prev => [...prev, ...newParticles]);
  };

  const addFloatingText = (x: number, y: number, text: string, color: string, isBig: boolean) => {
    const id = Date.now() + Math.random();
    setFloatingTexts(p => [...p, { id, x, y, text, color, isBig }]);
    setTimeout(() => setFloatingTexts(p => p.filter(t => t.id !== id)), 1200);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (navigator.vibrate) navigator.vibrate(10);

    const isCrit = Math.random() < 0.02;
    let damage = clickPower;
    if (isCrit) damage *= 7;

    setCoxinhas(p => p + damage);
    setLifetimeCoxinhas(p => p + damage);

    const rX = (Math.random() - 0.5) * 60;
    const rY = (Math.random() - 0.5) * 60;
    addFloatingText(e.clientX + rX, e.clientY - 60 + rY, `+${formatNumber(damage)}`, isCrit ? '#ffaa00' : '#fff', isCrit);

    spawnParticles(e.clientX, e.clientY, 'oil', 6);
    if (isCrit) spawnParticles(e.clientX, e.clientY, 'flour', 5);
  };

  const handleGoldenCoxinha = () => {
    if (navigator.vibrate) navigator.vibrate([50, 50, 50]);

    const type = Math.random() > 0.5 ? 'frenzy' : 'lucky';

    if (type === 'frenzy') {
      frenzyMultiplierRef.current = 7;
      setFrenzyActive(true);
      addFloatingText(window.innerWidth / 2, window.innerHeight / 3, `FRENESI! x7 (77s)`, '#ffaa00', true);
      if (frenzyTimerRef.current) clearTimeout(frenzyTimerRef.current);
      frenzyTimerRef.current = setTimeout(() => {
        frenzyMultiplierRef.current = 1;
        setFrenzyActive(false);
      }, 77000);
    } else {
      const gain = Math.min(coxinhas * 0.1, cps * 900) + 777;
      setCoxinhas(p => p + gain);
      addFloatingText(window.innerWidth / 2, window.innerHeight / 3, `SORTE! +${formatNumber(gain)}`, '#39ff14', true);
    }

    spawnParticles(window.innerWidth / 2, window.innerHeight / 2, 'golden', 30);
  };

  const buyBuilding = (buildingId: string, amount: number) => {
    const building = buildings.find(b => b.id === buildingId);
    if (!building) return;

    let totalCost = 0;
    let count = 0;

    for (let i = 0; i < amount; i++) {
      const cost = calculateBuildingCost(building.baseCost, building.count + count);
      if (coxinhas - totalCost >= cost) {
        totalCost += cost;
        count++;
      } else {
        break;
      }
    }

    if (count > 0) {
      setCoxinhas(c => c - totalCost);
      setBuildings(prev =>
        prev.map(b => (b.id === buildingId ? { ...b, count: b.count + count } : b))
      );
      spawnParticles(window.innerWidth * 0.8, window.innerHeight * 0.5, 'flour', 5);
    }
  };

  const buyUpgrade = (upgradeId: string) => {
    const upgrade = upgrades.find(u => u.id === upgradeId);
    if (!upgrade || coxinhas < upgrade.cost) return;

    setCoxinhas(c => c - upgrade.cost);
    setUpgrades(prev => prev.map(u => (u.id === upgradeId ? { ...u, purchased: true } : u)));
    spawnParticles(window.innerWidth * 0.5, window.innerHeight * 0.8, 'flour', 8);
  };

  const saveGame = () => {
    const data = {
      coxinhas: coxinhas.toString(),
      lifetimeCoxinhas: lifetimeCoxinhas.toString(),
      buildings,
      upgrades,
      timestamp: Date.now()
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
    alert('Jogo salvo!');
  };

  const loadGame = () => {
    const data = localStorage.getItem(SAVE_KEY);
    if (!data) {
      alert('Nenhum save encontrado!');
      return;
    }

    const parsed = JSON.parse(data);
    const offlineTime = Date.now() - parsed.timestamp;
    const offlineProduction = cps * (offlineTime / 1000);

    setCoxinhas(parseFloat(parsed.coxinhas) + offlineProduction);
    setLifetimeCoxinhas(parseFloat(parsed.lifetimeCoxinhas) + offlineProduction);
    setBuildings(parsed.buildings);
    setUpgrades(parsed.upgrades);
  };

  const cursorCount = buildings.find(b => b.id === 'cursor')?.count || 0;

  return (
    <div className="flex h-screen w-screen bg-[#1a1a1a] overflow-hidden">
      {/* LEFT PANEL */}
      <LeftPanel
        coxinhas={coxinhas}
        cps={cps}
        onSave={saveGame}
        onLoad={loadGame}
        onStats={() => alert(`Lifetime: ${formatNumber(lifetimeCoxinhas)}`)}
        onOptions={() => setSoundEnabled(!soundEnabled)}
      />

      {/* CENTER + RIGHT + BOTTOM */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* CENTER + RIGHT ROW */}
        <div className="flex-1 flex overflow-hidden">
          {/* CENTER */}
          <CenterPanel
            onClick={handleClick}
            cursorCount={cursorCount}
            floatingTexts={floatingTexts}
            particles={particles}
          />

          {/* RIGHT */}
          <RightPanel
            buildings={buildings}
            coxinhas={coxinhas}
            onBuyBuilding={buyBuilding}
          />
        </div>

        {/* BOTTOM */}
        <BottomPanel
          upgrades={upgrades}
          coxinhas={coxinhas}
          onBuyUpgrade={buyUpgrade}
        />
      </div>

      {/* GOLDEN COXINHA */}
      <GoldenCoxinha onClick={handleGoldenCoxinha} spawnRateMultiplier={goldenSpawnRate} />
    </div>
  );
};

export default App;
