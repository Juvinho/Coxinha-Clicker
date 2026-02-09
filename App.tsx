import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Building, GameState, Upgrade, FloatingText, Particle } from './types';
import { INITIAL_BUILDINGS, INITIAL_UPGRADES } from './constants';
import { calculateBuildingCost, formatNumber } from './utils';
import BigCoxinha from './components/BigCoxinha';
import BuildingRow from './components/BuildingRow';
import Upgrades from './components/Upgrades';
import GoldenCoxinha from './components/GoldenCoxinha';
import NewsTicker from './components/NewsTicker';
import SystemsUI from './components/SystemsUI';
import MainMenu from './components/MainMenu';
import MusicPlayer from './components/MusicPlayer';
import { ComboSystem } from './systems/ComboSystem';
import { RandomEvents } from './systems/RandomEvents';
import { DailyQuests } from './systems/DailyQuests';
import { Save, RotateCcw, Volume2, VolumeX, TrendingUp, Trophy, Zap, MousePointer2 } from 'lucide-react';

const SAVE_KEY = 'coxinha_clicker_ultimate_2026';

// --- Web Audio System ---
const playSound = (type: 'click' | 'buy' | 'upgrade' | 'golden', enabled: boolean) => {
  if (!enabled) return;
  const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContext) return;
  const ctx = new AudioContext();
  const gain = ctx.createGain();

  if (type === 'click') {
    // Wet crunch
    const bufferSize = ctx.sampleRate * 0.1;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, ctx.currentTime);
    
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    noise.start();
  } 
  else if (type === 'buy') {
    // Coin Clink
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(2000, ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime + 0.2);
  }
  else if (type === 'golden') {
      // Angelic
      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(880, ctx.currentTime + 0.5);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(); osc.stop(ctx.currentTime + 1);
  }
};

const App: React.FC = () => {
  // Game State
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [musicEnabled, setMusicEnabled] = useState<boolean>(true);
  
  const [coxinhas, setCoxinhas] = useState<number>(0);
  const [lifetimeCoxinhas, setLifetimeCoxinhas] = useState<number>(0);
  const [buildings, setBuildings] = useState<Building[]>(INITIAL_BUILDINGS);
  const [upgrades, setUpgrades] = useState<Upgrade[]>(INITIAL_UPGRADES);
  
  // Computed values
  const [cps, setCps] = useState<number>(0);
  const [clickPower, setClickPower] = useState<number>(1);
  const [globalMultiplier, setGlobalMultiplier] = useState<number>(1); // From Frenzy or Global upgrades
  const [goldenSpawnRate, setGoldenSpawnRate] = useState<number>(1);
  
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  
  // Golden Coxinha State
  const [frenzyActive, setFrenzyActive] = useState(false);
  const frenzyTimerRef = useRef<number | null>(null);
  const frenzyMultiplierRef = useRef<number>(1); // To separate from permanent global multiplier

  // Game Systems
  const comboSystemRef = useRef(new ComboSystem());
  const randomEventsRef = useRef(new RandomEvents());
  const dailyQuestsRef = useRef(new DailyQuests());
  
  // System UI States
  const [comboCount, setComboCount] = useState<number>(0);
  const [activeEvent, setActiveEvent] = useState<{name: string; icon: string; color: string} | null>(null);
  const [questProgress, setQuestProgress] = useState<number>(0);
  const [questsCompleted, setQuestsCompleted] = useState<number>(0);
  const [eventNotifications, setEventNotifications] = useState<{id: number; message: string; icon: string; color: string; duration: number}[]>([]);

  // --- Helper Functions (DEFINE EARLY) ---
  const addFloatingText = (x: number, y: number, text: string, color: string, isBig: boolean) => {
    const id = Date.now() + Math.random();
    setFloatingTexts(p => [...p, { id, x, y, text, color, isBig }]);
    setTimeout(() => setFloatingTexts(p => p.filter(t => t.id !== id)), 1200);
  };

  // --- Logic ---
  const saveGame = useCallback(() => {
    const gameState: GameState = { coxinhas, totalCoxinhas: lifetimeCoxinhas, startTime: Date.now(), buildings, upgrades, prestigeLevel: 0 };
    localStorage.setItem(SAVE_KEY, JSON.stringify(gameState));
  }, [coxinhas, lifetimeCoxinhas, buildings, upgrades]);

  useEffect(() => {
    const saved = localStorage.getItem(SAVE_KEY);
    if (saved) {
      try {
        const parsed: GameState = JSON.parse(saved);
        setCoxinhas(parsed.coxinhas);
        setLifetimeCoxinhas(parsed.totalCoxinhas || parsed.coxinhas);
        const mergedBuildings = INITIAL_BUILDINGS.map(iB => { const sB = parsed.buildings.find(b => b.id === iB.id); return sB ? { ...iB, count: sB.count } : iB; });
        setBuildings(mergedBuildings);
        const mergedUpgrades = INITIAL_UPGRADES.map(iU => { const sU = parsed.upgrades.find(u => u.id === iU.id); return sU ? { ...iU, purchased: sU.purchased } : iU; });
        setUpgrades(mergedUpgrades);
      } catch (e) { console.error("Corrupted save", e); }
    }

    // Initialize Game Systems with Callbacks (safely)
    if (comboSystemRef.current) {
      comboSystemRef.current.callbacks.onCombo = (count) => {
        addFloatingText(window.innerWidth/2, window.innerHeight/4, `${count} COMBO! 🔥`, '#ffaa00', true);
        setComboCount(count);
      };
      
      comboSystemRef.current.callbacks.onBreak = () => {
        setComboCount(0);
      };
    }

    if (randomEventsRef.current && randomEventsRef.current.callbacks) {
      randomEventsRef.current.callbacks.onEventTriggered = (event: any) => {
        const eventMap: {[key: string]: {name: string; icon: string; color: string}} = {
          'chuva_coxinhas': {name: 'Chuva de Coxinhas! ☔', icon: '🌧️', color: '#2196F3'},
          'vovo_inspirada': {name: 'Vovó Inspirada! 👵', icon: '👵', color: '#FF69B4'},
          'apagao': {name: 'Apagão! ⚫', icon: '⚫', color: '#222'},
          'rush_hour': {name: 'Hora do Rush! 🚀', icon: '🚀', color: '#FF6B00'},
          'fiscal': {name: 'Fiscal da Prefeitura! 👮', icon: '👮', color: '#FF0000'},
          'cliente_vip': {name: 'Cliente VIP! 💎', icon: '💎', color: '#FFD700'},
        };
        
        const info = eventMap[event.id] || {name: event.name, icon: '✨', color: '#FFD700'};
        setActiveEvent(info);
        setEventNotifications(prev => [...prev, {
          id: Date.now(),
          message: event.message,
          icon: info.icon,
          color: info.color,
          duration: 3000
        }]);
        
        setTimeout(() => setActiveEvent(null), 2000);
      };
    }

    if (dailyQuestsRef.current) {
      dailyQuestsRef.current.checkReset();
      setQuestsCompleted(dailyQuestsRef.current.getCompletedCount());
    }
  }, []);

  useEffect(() => { const i = setInterval(saveGame, 30000); return () => clearInterval(i); }, [saveGame]);

  // System Updates Loop
  useEffect(() => {
    const interval = setInterval(() => {
      // Update RandomEvents
      randomEventsRef.current?.update?.(0.016, { coxinhas, cps });
      
      // Update Daily Quests
      dailyQuestsRef.current?.checkReset?.();
      const questsCount = dailyQuestsRef.current?.getCompletedCount?.() || 0;
      setQuestsCompleted(questsCount);
      
      // Update quest progress
      const currentQuest = dailyQuestsRef.current?.quests?.[0];
      if (currentQuest) {
        const progress = (currentQuest.progress / currentQuest.goal) * 100;
        setQuestProgress(Math.min(progress, 100));
      }
    }, 100);
    
    return () => clearInterval(interval);
  }, [coxinhas, cps]);

  // Event Notifications Cleanup
  useEffect(() => {
    const timers = eventNotifications.map(event =>
      setTimeout(() => {
        setEventNotifications(prev => prev.filter(e => e.id !== event.id));
      }, 3000)
    );
    
    return () => timers.forEach(t => clearTimeout(t));
  }, [eventNotifications]);

  // --- Recalculate Game Stats (CPS, Click, Multipliers) ---
  useEffect(() => {
    let newCps = 0;
    let newClickPowerMultiplier = 1;
    let newGlobalMultiplier = 1;
    let newGoldenRate = 1;

    // 1. Calculate Base CPS from Buildings + Building Upgrades
    buildings.forEach(b => {
      let bCps = b.baseCps * b.count;
      // Apply building-specific upgrades
      upgrades.filter(u => u.purchased && u.type === 'building' && u.triggerBuildingId === b.id).forEach(u => {
         bCps *= u.multiplier;
      });
      newCps += bCps;
    });

    // 2. Process other upgrade types
    upgrades.filter(u => u.purchased).forEach(u => {
        if (u.type === 'global') {
            newGlobalMultiplier *= u.multiplier;
        } else if (u.type === 'click') {
            newClickPowerMultiplier *= u.multiplier;
        } else if (u.type === 'golden') {
            newGoldenRate *= u.multiplier;
        }
    });

    // 3. Apply Global Multipliers (Permanent + Temporary Frenzy)
    const totalMultiplier = newGlobalMultiplier * frenzyMultiplierRef.current;
    newCps *= totalMultiplier;
    
    // 4. Calculate Click Power
    // Base click = 1 + X% of CPS
    let computedClick = (1 + (newCps * 0.05)) * newClickPowerMultiplier;
    // Apply frenzy to click as well
    computedClick *= frenzyMultiplierRef.current;

    setCps(newCps);
    setClickPower(computedClick);
    setGlobalMultiplier(totalMultiplier);
    setGoldenSpawnRate(newGoldenRate);

  }, [buildings, upgrades, frenzyActive]); // Recalc when these change

  // Main Loop - Fixed interval for reliable production counting
  useEffect(() => {
    const interval = setInterval(() => {
      setCoxinhas(prev => {
        const deltaSeconds = 0.1; // 100ms = 0.1 seconds
        const earned = cps * deltaSeconds;
        const newTotal = prev + earned;
        setLifetimeCoxinhas(prevLife => prevLife + earned);
        return newTotal;
      });
    }, 100); // Update every 100ms for smooth, reliable production
    
    return () => clearInterval(interval);
  }, [cps]);

  const spawnParticles = (x: number, y: number, type: 'oil' | 'flour' | 'golden', count = 8) => {
    const newParticles: Particle[] = [];
    const colors = type === 'oil' ? ['#ffaa00', '#d4a574'] : type === 'flour' ? ['#ffffff', '#f0f0f0'] : ['#ff0000', '#00ff00', '#0000ff', '#ffff00'];
    
    for(let i=0; i<count; i++) {
        newParticles.push({
            id: Date.now() + i + Math.random(),
            x, y,
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

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Haptics
    if (navigator.vibrate) navigator.vibrate(10);
    playSound('click', soundEnabled);
    
    // Combo System
    const comboMultiplier = comboSystemRef.current?.onClick?.() || 1;
    setComboCount(comboSystemRef.current?.comboCount || 0);
    
    // Quest tracking
    dailyQuestsRef.current?.checkProgress?.('clicks', 1);
    
    const isCrit = Math.random() < 0.02; // 2% crit
    let damage = clickPower * comboMultiplier; // Apply combo multiplier
    if (isCrit) damage *= 7;

    setCoxinhas(p => p + damage);
    setLifetimeCoxinhas(p => p + damage);

    const rX = (Math.random() - 0.5) * 60;
    const rY = (Math.random() - 0.5) * 60;
    addFloatingText(e.clientX + rX, e.clientY - 60 + rY, `+${formatNumber(damage)}`, isCrit ? '#ffaa00' : '#fff', isCrit);
    
    spawnParticles(e.clientX, e.clientY, 'oil', 6);
    if(isCrit) spawnParticles(e.clientX, e.clientY, 'flour', 5);
  };

  const handleGoldenCoxinha = () => {
      playSound('golden', soundEnabled);
      if (navigator.vibrate) navigator.vibrate([50, 50, 50]);
      
      // Quest tracking
      dailyQuestsRef.current?.checkProgress?.('golden_clicked', 1);
      
      const type = Math.random() > 0.5 ? 'frenzy' : 'lucky';
      
      if (type === 'frenzy') {
          // 7x production for 77 seconds
          frenzyMultiplierRef.current = 7;
          setFrenzyActive(true);
          addFloatingText(window.innerWidth/2, window.innerHeight/3, `FRENESI! x7 (77s)`, '#ffaa00', true);
          if (frenzyTimerRef.current) clearTimeout(frenzyTimerRef.current);
          frenzyTimerRef.current = setTimeout(() => {
              frenzyMultiplierRef.current = 1;
              setFrenzyActive(false);
          }, 77000);
      } else {
          // Lucky: 10% of bank or 15 mins of CpS
          const gain = Math.min(coxinhas * 0.10, cps * 900) + 777;
          setCoxinhas(p => p + gain);
          setLifetimeCoxinhas(p => p + gain);
          
          // Quest tracking
          dailyQuestsRef.current?.checkProgress?.('produced', gain);
          
          addFloatingText(window.innerWidth/2, window.innerHeight/3, `SORTE! +${formatNumber(gain)}`, '#39ff14', true);
      }
      
      spawnParticles(window.innerWidth/2, window.innerHeight/2, 'golden', 30);
  };

  useEffect(() => {
    const i = setInterval(() => {
        setParticles(p => p.map(pt => ({
            ...pt, x: pt.x + pt.speedX * 0.95, y: pt.y + pt.speedY + 0.8, opacity: pt.opacity - 0.04
        })).filter(pt => pt.opacity > 0));
    }, 16);
    return () => clearInterval(i);
  }, []);

  const buy = (cost: number, action: () => void, type: 'building'|'upgrade') => {
    if (coxinhas >= cost) {
      if (navigator.vibrate) navigator.vibrate(5);
      playSound(type === 'building' ? 'buy' : 'upgrade', soundEnabled);
      setCoxinhas(c => c - cost);
      action();
      
      if(type === 'building') {
        spawnParticles(window.innerWidth * 0.8, window.innerHeight * 0.5, 'flour', 5);
        dailyQuestsRef.current?.checkProgress?.('buildings_bought', 1);
      }
    }
  };

  const reset = () => { 
      if(confirm('Reiniciar o universo gastronômico?')) { 
          setCoxinhas(0); setLifetimeCoxinhas(0); setBuildings(INITIAL_BUILDINGS); setUpgrades(INITIAL_UPGRADES); setCps(0); 
          frenzyMultiplierRef.current = 1;
          localStorage.removeItem(SAVE_KEY); 
      } 
  };

  const cursorCount = buildings.find(b => b.id === 'cursor')?.count || 0;

  // Show Main Menu if game hasn't started
  if (!gameStarted) {
    return (
      <>
        <MainMenu 
          onStart={() => setGameStarted(true)}
          soundEnabled={soundEnabled}
          onToggleSound={() => setSoundEnabled(!soundEnabled)}
          musicPlaying={musicEnabled}
          onToggleMusic={() => setMusicEnabled(!musicEnabled)}
        />
        <MusicPlayer enabled={musicEnabled} volume={0.3} />
      </>
    );
  }

  return (
    <>
      <div className="h-screen w-screen flex flex-col overflow-hidden relative select-none">
      
      {/* Background Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
      
      {/* Golden Coxinha Frenzy Glow */}
      {frenzyActive && <div className="absolute inset-0 pointer-events-none animate-pulse bg-yellow-500/10 z-0"></div>}

      <NewsTicker />
      <GoldenCoxinha onClick={handleGoldenCoxinha} spawnRateMultiplier={goldenSpawnRate} />

      {/* Systems UI Overlay */}
      <SystemsUI 
        comboCount={comboCount}
        activeEvent={activeEvent}
        questProgress={questProgress}
        questsCompleted={questsCompleted}
        events={eventNotifications}
      />

      {floatingTexts.map(t => (
        <div key={t.id} className="floating-text" style={{ left: t.x, top: t.y, color: t.color, fontSize: t.isBig ? '2rem' : '1.2rem' }}>{t.text}</div>
      ))}
      
      {particles.map(p => (
        <div key={p.id} className="particle" style={{ left: p.x, top: p.y, width: p.size, height: p.size, opacity: p.opacity, background: p.color || 'white' }} />
      ))}

      {/* --- MASTER LAYOUT --- */}
      <div className="flex-1 flex flex-col lg:flex-row h-full overflow-hidden relative z-10">
        
        {/* COLUMN 1: STATS CARDS (Left) */}
        <div className="lg:w-[300px] p-4 flex flex-col gap-3 z-20 overflow-y-auto custom-scrollbar lg:border-r border-[#3d2211] glass-panel">
            <div className="text-[#8a5a3a] text-xs font-bold uppercase tracking-widest mb-1 pl-1">Produção</div>
            
            {/* Main Counters */}
            <div className="flex flex-col gap-3">
                <div className="bg-[#1a0f08] p-4 rounded-xl border border-[#ffaa00]/30 relative overflow-hidden group">
                    <div className="text-gray-400 text-[10px] font-bold uppercase">Saldo Atual</div>
                    <div className="text-3xl font-black text-[#ffaa00] drop-shadow-lg truncate">{formatNumber(coxinhas)}</div>
                    <div className="text-[10px] text-gray-500">Coxinhas</div>
                </div>

                <div className={`bg-[#1a0f08] p-3 rounded-xl border ${frenzyActive ? 'border-yellow-500 animate-pulse' : 'border-[#39ff14]/20'} relative`}>
                    <div className="flex justify-between items-center">
                        <div>
                            <div className="text-gray-400 text-[10px] uppercase">Velocidade</div>
                            <div className="text-xl font-bold text-[#39ff14]">{formatNumber(cps)} <span className="text-xs text-gray-500">Cx/S</span></div>
                        </div>
                        <TrendingUp size={20} className="text-[#39ff14]" />
                    </div>
                </div>
            </div>

            {/* Sub Stats */}
            <div className="grid grid-cols-2 gap-2 mt-2">
                 <div className="bg-black/30 p-2 rounded border border-white/5">
                    <div className="text-blue-400 mb-1"><MousePointer2 size={16}/></div>
                    <div className="text-sm font-bold">{formatNumber(clickPower)}</div>
                    <div className="text-[8px] uppercase opacity-50">Por Clique</div>
                 </div>
                 <div className="bg-black/30 p-2 rounded border border-white/5">
                    <div className="text-purple-400 mb-1"><Zap size={16}/></div>
                    <div className="text-sm font-bold">{Math.floor((globalMultiplier - 1) * 100)}%</div>
                    <div className="text-[8px] uppercase opacity-50">Bônus</div>
                 </div>
            </div>

            <div className="mt-auto pt-4 border-t border-white/5 space-y-2">
                 <div className="text-[9px] text-center opacity-30 font-mono">{formatNumber(lifetimeCoxinhas)} Total Lifetime</div>
                 <div className="flex gap-1">
                    <button onClick={saveGame} className="flex-1 bg-[#2c1810] hover:bg-[#3d2211] text-[#d4a574] text-[10px] py-2 rounded border border-[#d4a574]/20 uppercase font-bold transition-colors">Salvar</button>
                    <button onClick={reset} className="flex-1 bg-[#2c1810] hover:bg-red-900/30 text-red-400 text-[10px] py-2 rounded border border-red-900/20 uppercase font-bold transition-colors">Reset</button>
                    <button onClick={() => setSoundEnabled(!soundEnabled)} className="w-8 bg-[#2c1810] text-[#d4a574] flex items-center justify-center rounded border border-[#d4a574]/20">
                        {soundEnabled ? <Volume2 size={12}/> : <VolumeX size={12}/>}
                    </button>
                 </div>
            </div>
        </div>

        {/* COLUMN 2: BIG COXINHA (Center) */}
        <div className="flex-1 flex items-center justify-center relative p-6 bg-radial-oil">
            <BigCoxinha onClick={handleClick} cursorCount={cursorCount} />
        </div>

        {/* COLUMN 3: BUILDINGS (Right) */}
        <div className="lg:w-[380px] flex flex-col glass-panel lg:border-l border-[#3d2211] z-20">
            <div className="p-4 bg-[#120a06] border-b border-[#3d2211] flex justify-between items-center shadow-md">
                <div className="flex items-center gap-2">
                    <div className="w-1 h-4 bg-[#ffaa00] rounded"></div>
                    <h2 className="font-bold text-[#e5e5e5] uppercase text-sm tracking-wide">Estruturas</h2>
                </div>
                <div className="text-[10px] bg-[#2a1810] px-2 py-1 rounded text-[#ffaa00] border border-[#ffaa00]/20">
                    {buildings.reduce((acc, b) => acc + b.count, 0)} Ativos
                </div>
            </div>
            <div className="flex-1 overflow-y-auto p-3 custom-scrollbar bg-[#0f0705]">
                {buildings.map(b => (
                    <BuildingRow 
                        key={b.id} 
                        building={b} 
                        canAfford={coxinhas >= calculateBuildingCost(b.baseCost, b.count)} 
                        onBuy={() => buy(calculateBuildingCost(b.baseCost, b.count), () => setBuildings(prev => prev.map(pb => pb.id === b.id ? { ...pb, count: pb.count + 1 } : pb)), 'building')} 
                    />
                ))}
                <div className="h-4"></div>
            </div>
        </div>
      </div>

      {/* --- BOTTOM ROW: UPGRADES --- */}
      <div className="h-[280px] lg:h-[220px] glass-panel border-t border-[#3d2211] z-30 flex flex-col shadow-[0_-10px_30px_rgba(0,0,0,0.8)]">
         <div className="px-4 py-2 bg-[#120a06] border-b border-[#3d2211] flex items-center gap-3">
             <Trophy size={16} className="text-[#ffaa00]" />
             <span className="font-bold text-xs uppercase tracking-widest text-[#d4a574]">Pesquisa & Desenvolvimento</span>
         </div>
         <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-[#1a0f08]">
             <Upgrades upgrades={upgrades} coxinhas={coxinhas} onBuy={(id, cost) => buy(cost, () => setUpgrades(prev => prev.map(u => u.id === id ? { ...u, purchased: true } : u)), 'upgrade')} />
         </div>
      </div>

    </div>
      <MusicPlayer enabled={musicEnabled} volume={0.3} />
    </>
  );
};

export default App;