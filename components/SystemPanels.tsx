// ============================================================================
// COXINHA CLICKER - NEW SYSTEM PANELS
// Weather, Relics, Research, Spells, Expeditions, Bosses, Artifacts,
// Enchantments, Trading, Mini-Games, Garden, Ascension
// ============================================================================

import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { INITIAL_SEEDS } from '../gameSystems';

// ── Weather Display (inline, used in main header) ────────────────────────────

export const WeatherDisplay: React.FC = () => {
  const { state } = useGame();
  const w = state.weather;
  if (!w?.current) return null;
  const timeLeft = Math.max(0, Math.floor((w.changesAt - Date.now()) / 1000));
  return (
    <div className="flex items-center gap-2 bg-gray-800/50 rounded-lg px-3 py-1 text-sm">
      <span className="text-lg">{w.current.icon}</span>
      <span className="text-yellow-300 font-bold">{w.current.name}</span>
      <span className="text-gray-400 text-xs">
        {w.current.effects.map(e => `${e.type}: x${e.value}`).join(', ')}
      </span>
      <span className="text-gray-500 text-xs">{timeLeft}s</span>
    </div>
  );
};

// ── Relic Panel ──────────────────────────────────────────────────────────────

export const RelicPanel: React.FC = () => {
  const { state, equipRelic, upgradeRelic, formatNumber } = useGame();
  const rarityColors: Record<string, string> = {
    common: 'text-gray-300', rare: 'text-blue-400', epic: 'text-purple-400',
    legendary: 'text-yellow-400', mythic: 'text-red-400', divine: 'text-pink-300'
  };
  const owned = state.relics.filter(r => r.owned);
  const equippedCount = owned.filter(r => r.equipped).length;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-yellow-400">🏺 Relíquias ({owned.length}/{state.relics.length})</h2>
        <span className="text-sm text-gray-400">Equipadas: {equippedCount}/5 | Pó: {formatNumber(state.resources.relicDust)}</span>
      </div>
      {owned.length === 0 && <p className="text-gray-500 text-center py-4">Explore expedições e derrote bosses para encontrar relíquias!</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {owned.map(relic => (
          <div key={relic.id} className={`bg-gray-800/70 rounded-lg p-3 border ${relic.equipped ? 'border-yellow-500' : 'border-gray-700'}`}>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{relic.icon}</span>
              <div className="flex-1 min-w-0">
                <div className={`font-bold ${rarityColors[relic.rarity] || 'text-white'}`}>{relic.name}</div>
                <div className="text-xs text-gray-400">{relic.description}</div>
                <div className="text-xs text-green-400">Nv.{relic.level}/{relic.maxLevel} - {relic.effect.description}</div>
              </div>
              <div className="flex flex-col gap-1">
                <button onClick={() => equipRelic(relic.id)} className={`px-2 py-1 rounded text-xs ${relic.equipped ? 'bg-yellow-600' : 'bg-gray-600 hover:bg-gray-500'}`}>
                  {relic.equipped ? 'Desequipar' : 'Equipar'}
                </button>
                {relic.level < relic.maxLevel && (
                  <button onClick={() => upgradeRelic(relic.id)} className="px-2 py-1 rounded text-xs bg-blue-600 hover:bg-blue-500">
                    ↑ ({(relic.level + 1) * 10} pó)
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Research Panel ───────────────────────────────────────────────────────────

export const ResearchPanel: React.FC = () => {
  const { state, conductResearch, formatNumber } = useGame();
  const branches = ['production', 'clicking', 'prestige', 'cosmic', 'temporal', 'quantum'];
  const branchNames: Record<string, string> = {
    production: '📈 Produção', clicking: '🎯 Clique', prestige: '👑 Prestígio',
    cosmic: '🌌 Cósmico', temporal: '⏰ Temporal', quantum: '⚛️ Quântico'
  };

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold text-blue-400">🔬 Pesquisa</h2>
      <div className="text-sm text-gray-400">Pontos de Pesquisa: {formatNumber(state.resources.researchPoints)}</div>
      {branches.map(branch => {
        const nodes = state.research.filter(r => r.branch === branch);
        if (nodes.length === 0) return null;
        return (
          <div key={branch} className="bg-gray-800/50 rounded-lg p-3">
            <h3 className="font-bold text-sm mb-2">{branchNames[branch] || branch}</h3>
            <div className="flex flex-wrap gap-2">
              {nodes.sort((a, b) => a.tier - b.tier).map(node => {
                const canResearch = !node.completed && node.prerequisites.every(pid => state.research.find(r => r.id === pid)?.completed);
                return (
                  <button key={node.id} onClick={() => conductResearch(node.id)} disabled={!canResearch}
                    className={`px-3 py-2 rounded-lg text-xs transition-all ${node.completed ? 'bg-green-800 border-green-500' : canResearch ? 'bg-blue-800 hover:bg-blue-700 border-blue-500' : 'bg-gray-700 border-gray-600 opacity-50'} border`}>
                    <div>{node.icon} {node.name}</div>
                    <div className="text-gray-400">{node.description}</div>
                    {!node.completed && <div className="text-yellow-400 mt-1">{node.cost.map(c => `${formatNumber(c.amount)} ${c.type}`).join(', ')}</div>}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ── Spell Panel ──────────────────────────────────────────────────────────────

export const SpellPanel: React.FC = () => {
  const { state, castSpell, upgradeSpell, formatNumber } = useGame();
  const schools = ['fire', 'ice', 'lightning', 'nature', 'arcane', 'holy', 'void'];
  const schoolNames: Record<string, string> = {
    fire: '🔥 Fogo', ice: '❄️ Gelo', lightning: '⚡ Raio', nature: '🌱 Natureza',
    arcane: '🔮 Arcano', holy: '✨ Sagrado', void: '🕳️ Vazio'
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-purple-400">🔮 Magias</h2>
        <div className="flex items-center gap-2">
          <span className="text-blue-400 font-bold">🔹 Mana: {Math.floor(state.resources.mana)} / {100 + state.player.level * 10}</span>
        </div>
      </div>
      {schools.map(school => {
        const spells = state.spells.filter(s => s.school === school);
        if (spells.length === 0) return null;
        return (
          <div key={school} className="bg-gray-800/50 rounded-lg p-3">
            <h3 className="font-bold text-sm mb-2">{schoolNames[school] || school}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {spells.map(spell => {
                const now = Date.now();
                const onCooldown = now - spell.lastCast < spell.cooldown;
                const cooldownLeft = Math.max(0, Math.ceil((spell.cooldown - (now - spell.lastCast)) / 1000));
                const canCast = spell.unlocked && !onCooldown && state.resources.mana >= spell.manaCost;
                return (
                  <div key={spell.id} className={`bg-gray-700/50 rounded-lg p-2 border ${!spell.unlocked ? 'border-gray-600 opacity-40' : 'border-purple-700'}`}>
                    <div className="flex items-center gap-1 mb-1">
                      <span>{spell.icon}</span>
                      <span className="font-bold text-sm">{spell.name}</span>
                      <span className="text-xs text-gray-400 ml-auto">Lv.{spell.level}</span>
                    </div>
                    <div className="text-xs text-gray-400 mb-1">{spell.description}</div>
                    <div className="text-xs text-blue-300 mb-1">Custo: {spell.manaCost} mana | {(spell.duration / 1000).toFixed(0)}s</div>
                    <div className="flex gap-1">
                      <button onClick={() => castSpell(spell.id)} disabled={!canCast}
                        className={`flex-1 px-2 py-1 rounded text-xs ${canCast ? 'bg-purple-600 hover:bg-purple-500' : 'bg-gray-600 opacity-50'}`}>
                        {onCooldown ? `${cooldownLeft}s` : 'Lançar'}
                      </button>
                      {spell.level < spell.maxLevel && (
                        <button onClick={() => upgradeSpell(spell.id)} className="px-2 py-1 rounded text-xs bg-blue-600 hover:bg-blue-500">↑</button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ── Expedition Panel ─────────────────────────────────────────────────────────

export const ExpeditionPanel: React.FC = () => {
  const { state, startExpedition, formatNumber } = useGame();
  const activeExp = state.expeditions.find(e => e.active);
  const diffColors: Record<string, string> = {
    easy: 'text-green-400', medium: 'text-yellow-400', hard: 'text-orange-400',
    extreme: 'text-red-400', legendary: 'text-purple-400'
  };

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold text-orange-400">🗺️ Expedições</h2>
      {activeExp && (
        <div className="bg-orange-900/30 border border-orange-500 rounded-lg p-3">
          <div className="font-bold">{activeExp.icon} {activeExp.name} - Em progresso!</div>
          <div className="text-sm text-gray-300">Retorna em: {Math.max(0, Math.ceil((activeExp.completesAt - Date.now()) / 1000))}s</div>
          <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
            <div className="bg-orange-500 h-2 rounded-full transition-all" style={{ width: `${Math.min(100, ((Date.now() - activeExp.startedAt) / (activeExp.completesAt - activeExp.startedAt)) * 100)}%` }} />
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {state.expeditions.map(exp => {
          const meetsReqs = exp.requirements.every(r => {
            if (r.type === 'level') return state.player.level >= r.value;
            return true;
          });
          const canStart = !activeExp && meetsReqs && !exp.active;
          return (
            <div key={exp.id} className={`bg-gray-800/70 rounded-lg border overflow-hidden flex flex-col ${!meetsReqs ? 'border-gray-700 opacity-40' : 'border-gray-600'}`}>
              <div className="p-3 pb-2 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{exp.icon}</span>
                  <div className="font-bold text-sm">{exp.name}</div>
                  <div className={`text-xs ml-auto ${diffColors[exp.difficulty]}`}>{exp.difficulty.toUpperCase()}</div>
                </div>
                <div className="text-xs text-gray-400 mb-1">{exp.description}</div>
                <div className="text-xs text-gray-500">⏱️ {(exp.duration / 60000).toFixed(0)}min {exp.timesCompleted > 0 && <span className="text-orange-400">· Feita x{exp.timesCompleted}</span>}</div>
                <div className="text-xs text-green-400 mt-1">
                  🎁 {exp.rewards.map(r => `${formatNumber(r.amount)} ${r.type} (${(r.chance * 100).toFixed(0)}%)`).join(', ')}
                </div>
              </div>
              <button onClick={() => startExpedition(exp.id)} disabled={!canStart}
                className={`w-full py-2 text-xs font-bold transition-colors ${canStart ? 'bg-orange-600 hover:bg-orange-500 text-white' : 'bg-gray-700 text-gray-500 cursor-not-allowed'}`}>
                {canStart ? '🗺️ Explorar' : activeExp ? '⏳ Em expedição...' : 'Bloqueado'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ── Boss Panel ───────────────────────────────────────────────────────────────

export const BossPanel: React.FC = () => {
  const { state, startBossFight, attackBoss, formatNumber } = useGame();
  const activeBoss = state.activeBoss;

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold text-red-400">💀 Bosses</h2>
      {activeBoss && (
        <div className="bg-red-900/30 border border-red-500 rounded-lg p-4 text-center">
          <div className="text-3xl mb-2">{activeBoss.icon}</div>
          <div className="font-bold text-xl">{activeBoss.name}</div>
          <div className="text-sm text-gray-300 mb-2">{activeBoss.description}</div>
          <div className="w-full bg-gray-700 rounded-full h-4 mb-2">
            <div className="bg-red-500 h-4 rounded-full transition-all text-xs text-center leading-4"
              style={{ width: `${Math.max(0, (activeBoss.currentHp / activeBoss.maxHp) * 100)}%` }}>
              {formatNumber(Math.max(0, activeBoss.currentHp))} / {formatNumber(activeBoss.maxHp)}
            </div>
          </div>
          <button onClick={attackBoss}
            className="px-6 py-3 bg-red-600 hover:bg-red-500 rounded-lg font-bold text-lg animate-pulse">
            ⚔️ ATACAR!
          </button>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {state.bosses.map(boss => (
          <div key={boss.id} className={`bg-gray-800/70 rounded-lg p-3 border ${boss.defeated ? 'border-green-700' : 'border-red-700'}`}>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{boss.icon}</span>
              <div className="flex-1">
                <div className="font-bold text-sm">{boss.name} <span className="text-xs text-gray-400">T{boss.tier}</span></div>
                <div className="text-xs text-gray-400">{boss.description}</div>
                <div className="text-xs text-red-300">HP: {formatNumber(boss.maxHp)} | ATK: {boss.attack} | DEF: {boss.defense}</div>
                {boss.timesDefeated > 0 && <div className="text-xs text-green-400">Derrotado x{boss.timesDefeated}</div>}
              </div>
              {!activeBoss && (
                <button onClick={() => startBossFight(boss.id)}
                  className="px-3 py-2 rounded text-xs bg-red-600 hover:bg-red-500">
                  Lutar!
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Garden Panel ─────────────────────────────────────────────────────────────

export const GardenPanel: React.FC = () => {
  const { state, plantSeed, waterPlot, harvestPlot, formatNumber } = useGame();
  const [selectedSeed, setSelectedSeed] = useState<string>('');
  const seeds = INITIAL_SEEDS;

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold text-green-400">🌱 Jardim</h2>
      <div className="flex gap-2 flex-wrap mb-2">
        {seeds.map(seed => (
          <button key={seed.id} onClick={() => setSelectedSeed(seed.id)}
            className={`px-2 py-1 rounded text-xs ${selectedSeed === seed.id ? 'bg-green-600' : 'bg-gray-700 hover:bg-gray-600'}`}>
            {seed.icon} {seed.name}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {state.garden.map((plot, i) => {
          const now = Date.now();
          const isGrown = plot.seed && now >= plot.harvestAt;
          const growProgress = plot.seed ? Math.min(100, ((now - plot.plantedAt) / (plot.harvestAt - plot.plantedAt)) * 100) : 0;
          return (
            <div key={i} className={`bg-gray-800/70 rounded-lg p-3 border ${isGrown ? 'border-green-500' : 'border-gray-600'} text-center min-h-[100px]`}>
              {plot.seed ? (
                <>
                  <div className="text-2xl mb-1">{plot.seed.icon}</div>
                  <div className="text-xs font-bold">{plot.seed.name}</div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                    <div className={`h-2 rounded-full ${isGrown ? 'bg-green-500' : 'bg-yellow-500'}`} style={{ width: `${growProgress}%` }} />
                  </div>
                  <div className="flex gap-1 mt-2 justify-center">
                    {!plot.watered && !isGrown && (
                      <button onClick={() => waterPlot(i)} className="px-2 py-1 rounded text-xs bg-blue-600 hover:bg-blue-500">💧</button>
                    )}
                    {isGrown && (
                      <button onClick={() => harvestPlot(i)} className="px-2 py-1 rounded text-xs bg-green-600 hover:bg-green-500">🌾 Colher</button>
                    )}
                  </div>
                  {plot.watered && <span className="text-xs text-blue-300">💧 Regado</span>}
                </>
              ) : (
                <button onClick={() => selectedSeed && plantSeed(i, selectedSeed)}
                  disabled={!selectedSeed}
                  className={`w-full h-full flex items-center justify-center text-gray-500 hover:text-gray-300 ${selectedSeed ? 'cursor-pointer' : 'cursor-not-allowed'}`}>
                  {selectedSeed ? '🌱 Plantar' : 'Vazio'}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ── Trading Panel ────────────────────────────────────────────────────────────

export const TradingPanel: React.FC = () => {
  const { state, makeTrade, formatNumber } = useGame();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-amber-400">💱 Comércio</h2>
        <span className="text-sm text-gray-400">Reputação: ⭐ {state.resources.reputation}</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {state.tradeOffers.map(trade => {
          const canTrade = trade.available && trade.timesTraded < trade.maxTrades;
          const hasResources = canTrade; // basic check; actual resource check is in engine
          return (
            <div key={trade.id} className={`bg-gray-800/70 rounded-lg border overflow-hidden ${canTrade ? 'border-amber-700' : 'border-gray-700 opacity-50'}`}>
              <div className="p-3 pb-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{trade.icon}</span>
                  <div className="font-bold text-sm text-white">{trade.name}</div>
                </div>
                <div className="text-xs space-y-0.5 mb-2">
                  <div className="text-red-400">Dá: {formatNumber(trade.give.amount)} {trade.give.type}</div>
                  <div className="text-green-400">Recebe: {formatNumber(trade.receive.amount)} {trade.receive.type}</div>
                </div>
                <div className="text-xs text-gray-400">Trocas: {trade.timesTraded}/{trade.maxTrades}</div>
              </div>
              <button onClick={() => makeTrade(trade.id)} disabled={!canTrade}
                className={`w-full py-2 text-xs font-bold transition-colors ${canTrade ? 'bg-amber-600 hover:bg-amber-500 text-white' : 'bg-gray-700 text-gray-500 cursor-not-allowed'}`}>
                Trocar
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ── Enchantment Panel ────────────────────────────────────────────────────────

export const EnchantmentPanel: React.FC = () => {
  const { state, upgradeEnchantment, formatNumber } = useGame();

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold text-cyan-400">✨ Encantamentos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {state.enchantments.filter(e => e.unlocked).map(enc => (
          <div key={enc.id} className="bg-gray-800/70 rounded-lg p-3 border border-cyan-800">
            <div className="flex items-center gap-2">
              <span className="text-xl">{enc.icon}</span>
              <div className="flex-1">
                <div className="font-bold text-sm">{enc.name} <span className="text-cyan-400">Lv.{enc.level}/{enc.maxLevel}</span></div>
                <div className="text-xs text-gray-400">{enc.description}</div>
                {enc.level > 0 && (
                  <div className="text-xs text-green-400">Bônus atual: +{(enc.effect.value * enc.level * 100).toFixed(0)}%</div>
                )}
                <div className="text-xs text-yellow-400 mt-1">
                  Custo: {enc.costPerLevel.map(c => `${formatNumber(c.amount * (enc.level + 1))} ${c.type}`).join(', ')}
                </div>
              </div>
              {enc.level < enc.maxLevel && (
                <button onClick={() => upgradeEnchantment(enc.id)}
                  className="px-3 py-2 rounded text-xs bg-cyan-600 hover:bg-cyan-500">
                  ↑ Encantar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Artifact Panel ───────────────────────────────────────────────────────────

export const ArtifactPanel: React.FC = () => {
  const { state, equipArtifact } = useGame();
  const owned = state.artifacts.filter(a => a.owned);
  const equippedCount = owned.filter(a => a.equipped).length;
  const rarityColors: Record<string, string> = {
    common: 'text-gray-300', rare: 'text-blue-400', epic: 'text-purple-400',
    legendary: 'text-yellow-400', mythic: 'text-red-400'
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-indigo-400">🏛️ Artefatos ({owned.length}/{state.artifacts.length})</h2>
        <span className="text-sm text-gray-400">Equipados: {equippedCount}/6</span>
      </div>
      {owned.length === 0 && <p className="text-gray-500 text-center py-4">Encontre artefatos em expedições e bosses!</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {owned.map(art => (
          <div key={art.id} className={`bg-gray-800/70 rounded-lg p-3 border ${art.equipped ? 'border-indigo-500' : 'border-gray-700'}`}>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{art.icon}</span>
              <div className="flex-1">
                <div className={`font-bold ${rarityColors[art.rarity] || 'text-white'}`}>{art.name}</div>
                <div className="text-xs text-gray-400">{art.description}</div>
                <div className="text-xs text-green-400">{art.effect.type}: +{(art.effect.value * 100).toFixed(0)}%</div>
              </div>
              <button onClick={() => equipArtifact(art.id)}
                className={`px-2 py-1 rounded text-xs ${art.equipped ? 'bg-indigo-600' : 'bg-gray-600 hover:bg-gray-500'}`}>
                {art.equipped ? 'Desequipar' : 'Equipar'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Mini-Game Panel ──────────────────────────────────────────────────────────

export const MiniGamePanel: React.FC = () => {
  const { state, playMiniGame, formatNumber } = useGame();
  const [lastResult, setLastResult] = useState<{ gameId: string; won: boolean; reward: number } | null>(null);

  const handlePlay = (id: string) => {
    const result = playMiniGame(id);
    setLastResult({ gameId: id, ...result });
  };

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold text-pink-400">🎮 Mini-Games</h2>
      {lastResult && (
        <div className={`text-center py-2 rounded-lg ${lastResult.won ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
          {lastResult.won ? `🎉 Ganhou ${formatNumber(lastResult.reward)}!` : '😢 Não foi dessa vez...'}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {state.miniGames.filter(g => g.unlocked).map(game => {
          const now = Date.now();
          const onCooldown = now - game.lastPlayed < game.cooldown;
          const cdLeft = Math.max(0, Math.ceil((game.cooldown - (now - game.lastPlayed)) / 1000));
          return (
            <div key={game.id} className="bg-gray-800/70 rounded-lg p-4 border border-pink-700 text-center">
              <div className="text-3xl mb-2">{game.icon}</div>
              <div className="font-bold">{game.name}</div>
              <div className="text-xs text-gray-400 mb-2">{game.description}</div>
              <div className="text-xs text-yellow-300 mb-2">Custo: {formatNumber(game.cost.amount)} {game.cost.type}</div>
              <div className="text-xs text-gray-500 mb-2">Jogou: {game.timesPlayed}x | Total ganho: {formatNumber(game.totalWinnings)}</div>
              <button onClick={() => handlePlay(game.id)} disabled={onCooldown}
                className={`px-4 py-2 rounded-lg font-bold ${onCooldown ? 'bg-gray-600 opacity-50' : 'bg-pink-600 hover:bg-pink-500'}`}>
                {onCooldown ? `${cdLeft}s` : '🎲 Jogar!'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ── Ascension Panel (shown in prestige/rebirth area) ─────────────────────────

export const AscensionPanel: React.FC = () => {
  const { state, performAscension } = useGame();
  const canAscend = state.prestige.rebirthCount >= 50;

  return (
    <div className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 rounded-lg p-4 border border-purple-500 mt-4">
      <h3 className="text-lg font-bold text-purple-300 mb-2">🌟 Ascensão</h3>
      <div className="text-sm text-gray-300 mb-2">
        Poder de Ascensão: <span className="text-yellow-400 font-bold">{state.ascension.ascensionPower}</span> |
        Total: <span className="text-purple-400">{state.ascension.totalAscensions}</span>
      </div>
      <div className="grid grid-cols-3 gap-2 mb-3">
        {state.ascension.layers.map(layer => (
          <div key={layer.tier} className="bg-gray-800/50 rounded-lg p-2 text-center">
            <div className="font-bold text-sm">{layer.name}</div>
            <div className="text-xs text-gray-400">Vezes: {layer.count}</div>
            <div className="text-xs text-yellow-300">Mult: x{layer.multiplier.toFixed(1)}</div>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-400 mb-2">Requer 50+ rebirths. Reseta tudo mas ganha poder permanente gigantesco!</p>
      <button onClick={performAscension} disabled={!canAscend}
        className={`w-full py-2 rounded-lg font-bold ${canAscend ? 'bg-purple-600 hover:bg-purple-500 animate-pulse' : 'bg-gray-700 opacity-50'}`}>
        {canAscend ? '🌟 ASCENDER!' : `Precisa ${50 - state.prestige.rebirthCount} rebirths`}
      </button>
    </div>
  );
};
