// ============================================================================
// COXINHA CLICKER - AAA GAME PANELS
// Achievement, Skill, Pet, Crafting, Stats, Quest panels
// ============================================================================

import React, { useState, useMemo } from 'react';
import { useGame } from '../context/GameContext';
import type { Achievement, Skill, Pet, CraftingRecipe, Quest, Challenge } from '../types';

// ── Achievement Panel ────────────────────────────────────────────────────────

const TIER_COLORS: Record<string, string> = {
  bronze: '#CD7F32', silver: '#C0C0C0', gold: '#FFD700', diamond: '#B9F2FF', cosmic: '#DA70D6'
};
const CAT_LABELS: Record<string, string> = {
  clicking: '👆 Cliques', production: '🏭 Produção', buildings: '🏗️ Edifícios',
  upgrades: '✨ Upgrades', prestige: '🔥 Prestige', exploration: '🌌 Exploração',
  special: '⭐ Especial', secret: '🔮 Secreto'
};

export const AchievementPanel: React.FC = () => {
  const { state, formatNumber } = useGame();
  const [filter, setFilter] = useState<string>('all');

  const achievements = useMemo(() => {
    const filtered = filter === 'all' ? state.achievements : state.achievements.filter(a => a.category === filter);
    return filtered.sort((a, b) => {
      if (a.unlocked && !b.unlocked) return -1;
      if (!a.unlocked && b.unlocked) return 1;
      return 0;
    });
  }, [state.achievements, filter]);

  const unlockedCount = state.achievements.filter(a => a.unlocked).length;
  const total = state.achievements.length;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-sm font-bold text-[#ffaa00]">🏆 CONQUISTAS</h3>
        <span className="text-xs text-gray-400">{unlockedCount}/{total}</span>
      </div>

      <div className="flex gap-1 mb-3 flex-wrap">
        <button onClick={() => setFilter('all')} className={`text-[9px] px-2 py-0.5 rounded ${filter === 'all' ? 'bg-[#ffaa00] text-black' : 'bg-white/5 text-gray-400'}`}>Todas</button>
        {Object.entries(CAT_LABELS).map(([k, v]) => (
          <button key={k} onClick={() => setFilter(k)} className={`text-[9px] px-2 py-0.5 rounded ${filter === k ? 'bg-[#ffaa00] text-black' : 'bg-white/5 text-gray-400'}`}>
            {v.split(' ')[0]}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
        {achievements.map(ach => (
          <div key={ach.id} className={`p-2 rounded border-l-2 transition-all ${ach.unlocked ? 'bg-[#1a1a0a] border-[#FFD700]' : ach.hidden && !ach.unlocked ? 'bg-[#0a0a0a] border-[#333]' : 'bg-[#0f0a05] border-[#3d2211]'}`}>
            {ach.hidden && !ach.unlocked ? (
              <div className="flex items-center gap-2">
                <span className="text-lg opacity-30">❓</span>
                <div>
                  <div className="text-xs text-gray-600 font-bold">???</div>
                  <div className="text-[9px] text-gray-700">Conquista secreta</div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-lg">{ach.unlocked ? ach.icon : '🔒'}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] font-bold text-[#e5e5e5] truncate">{ach.name}</span>
                    <span className="text-[8px] px-1 rounded" style={{ background: `${TIER_COLORS[ach.tier]}20`, color: TIER_COLORS[ach.tier] }}>{ach.tier}</span>
                  </div>
                  <div className="text-[9px] text-gray-500">{ach.description}</div>
                  {!ach.unlocked && ach.progress !== undefined && (
                    <div className="mt-1 h-1 bg-[#1a1a1a] rounded overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#ffaa00] to-[#ff6600]" style={{ width: `${Math.min(ach.progress * 100, 100)}%`, transition: 'width 0.3s' }} />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Skill Tree Panel ─────────────────────────────────────────────────────────

const BRANCH_CONFIG: Record<string, { label: string; icon: string; color: string }> = {
  clicker: { label: 'Clicador', icon: '👊', color: '#FF6B6B' },
  producer: { label: 'Produtor', icon: '⚙️', color: '#4ECDC4' },
  alchemist: { label: 'Alquimista', icon: '⚗️', color: '#A06CD5' },
};

export const SkillTreePanel: React.FC = () => {
  const { state, upgradeSkill, formatNumber } = useGame();
  const [branch, setBranch] = useState<string>('clicker');

  const branchSkills = useMemo(() => {
    return state.skills.filter(s => s.branch === branch).sort((a, b) => a.tier - b.tier);
  }, [state.skills, branch]);

  const totalSP = state.resources.skillPoints;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-sm font-bold text-[#ffaa00]">🌳 HABILIDADES</h3>
        <span className="text-xs text-[#4ECDC4]">SP: {Math.floor(totalSP)}</span>
      </div>

      <div className="flex gap-1 mb-3">
        {Object.entries(BRANCH_CONFIG).map(([key, cfg]) => (
          <button key={key} onClick={() => setBranch(key)}
            className={`flex-1 text-[10px] py-1 rounded font-bold transition-all ${branch === key ? 'text-black' : 'bg-white/5 text-gray-400'}`}
            style={branch === key ? { background: cfg.color } : {}}>
            {cfg.icon} {cfg.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        {branchSkills.map(skill => {
          const canUpgrade = skill.unlocked && skill.currentLevel < skill.maxLevel && totalSP >= skill.costPerLevel;
          const isMaxed = skill.currentLevel >= skill.maxLevel;
          const cfg = BRANCH_CONFIG[branch];

          return (
            <div key={skill.id} className={`p-2 rounded border transition-all ${!skill.unlocked ? 'opacity-40 border-[#222]' : canUpgrade ? 'border-[#ffaa00]/50 bg-[#1a1008]' : 'border-[#333] bg-[#0f0a05]'}`}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-base">{skill.icon}</span>
                  <div>
                    <div className="text-[11px] font-bold text-[#e5e5e5]">{skill.name}</div>
                    <div className="text-[9px] text-gray-500">{skill.description}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-bold" style={{ color: cfg.color }}>
                    {skill.currentLevel}/{skill.maxLevel}
                  </div>
                  {!isMaxed && skill.unlocked && (
                    <div className="text-[8px] text-gray-500">{skill.costPerLevel} SP</div>
                  )}
                </div>
              </div>

              {/* Level bar */}
              <div className="h-1 bg-[#1a1a1a] rounded overflow-hidden mb-1">
                <div className="h-full rounded" style={{ width: `${(skill.currentLevel / skill.maxLevel) * 100}%`, background: cfg.color, transition: 'width 0.3s' }} />
              </div>

              {canUpgrade && (
                <button onClick={() => upgradeSkill(skill.id)}
                  className="w-full text-[9px] py-0.5 rounded font-bold transition-all hover:brightness-110"
                  style={{ background: cfg.color, color: '#000' }}>
                  UPGRADE ({skill.costPerLevel} SP)
                </button>
              )}
              {isMaxed && (
                <div className="text-center text-[9px] text-[#FFD700] font-bold">✅ MAXED</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ── Pet Panel ────────────────────────────────────────────────────────────────

const RARITY_COLORS: Record<string, string> = {
  common: '#9E9E9E', rare: '#2196F3', epic: '#9C27B0', legendary: '#FF9800', mythic: '#E91E63'
};

export const PetPanel: React.FC = () => {
  const { state, activatePet, formatNumber } = useGame();

  const ownedPets = useMemo(() => state.pets.filter(p => p.owned), [state.pets]);
  const lockedPets = useMemo(() => state.pets.filter(p => !p.owned), [state.pets]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-sm font-bold text-[#ffaa00]">🐾 PETS</h3>
        <span className="text-xs text-gray-400">{ownedPets.length}/{state.pets.length}</span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        {ownedPets.map(pet => (
          <div key={pet.id} className={`p-2 rounded border transition-all ${pet.active ? 'border-[#4CAF50] bg-[#0a1a0a]' : 'border-[#333] bg-[#0f0a05]'}`}>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">{pet.icon}</span>
              <div className="flex-1">
                <div className="flex items-center gap-1">
                  <span className="text-[11px] font-bold text-[#e5e5e5]">{pet.name}</span>
                  <span className="text-[8px] px-1 rounded" style={{ background: `${RARITY_COLORS[pet.rarity]}20`, color: RARITY_COLORS[pet.rarity] }}>{pet.rarity}</span>
                </div>
                <div className="text-[9px] text-gray-500">Nv.{pet.level} · {(() => {
                  const rawValue = pet.ability.baseValue + pet.ability.scalingPerLevel * (pet.level - 1);
                  const isPercentage = pet.ability.type !== 'auto_click';
                  const displayValue = isPercentage ? (rawValue * 100).toFixed(1) : rawValue.toFixed(1);
                  return pet.ability.description.replace('{value}', displayValue);
                })()}</div>
              </div>
              <button onClick={() => activatePet(pet.id)}
                className={`text-[9px] px-2 py-1 rounded font-bold ${pet.active ? 'bg-[#4CAF50] text-black' : 'bg-white/10 text-gray-300 hover:bg-white/20'}`}>
                {pet.active ? '✅ ATIVO' : 'ATIVAR'}
              </button>
            </div>
            <div className="h-1 bg-[#1a1a1a] rounded overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#4CAF50] to-[#8BC34A]" style={{ width: `${(pet.xp / pet.xpToNext) * 100}%`, transition: 'width 0.3s' }} />
            </div>
            <div className="text-[8px] text-gray-600 text-right mt-0.5">{Math.floor(pet.xp)}/{pet.xpToNext} XP</div>
          </div>
        ))}

        {lockedPets.length > 0 && (
          <>
            <div className="text-[10px] text-gray-600 mt-2 border-t border-white/5 pt-2">🔒 Não Descobertos</div>
            <div className="grid grid-cols-4 gap-1">
              {lockedPets.map(pet => (
                <div key={pet.id} className="flex flex-col items-center p-1.5 rounded bg-[#0a0a0a] border border-[#222]">
                  <span className="text-lg opacity-20">❓</span>
                  <span className="text-[8px] text-gray-700 mt-0.5" style={{ color: `${RARITY_COLORS[pet.rarity]}50` }}>{pet.rarity}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// ── Crafting Panel ───────────────────────────────────────────────────────────

const INGREDIENT_ICONS: Record<string, string> = {
  coxinhas: '🥟', fragments: '🔥', stardust: '✨', golden_essence: '⭐', cosmic_flour: '🌌'
};
const INGREDIENT_NAMES: Record<string, string> = {
  coxinhas: 'Coxinhas', fragments: 'Fragmentos', stardust: 'Poeira Estelar', golden_essence: 'Essência Dourada', cosmic_flour: 'Farinha Cósmica'
};

export const CraftingPanel: React.FC = () => {
  const { state, startCrafting, formatNumber } = useGame();

  const discovered = useMemo(() => state.craftingRecipes.filter(r => r.discovered), [state.craftingRecipes]);
  const queue = state.craftingQueue;

  const canAffordRecipe = (recipe: CraftingRecipe): boolean => {
    for (const ing of recipe.ingredients) {
      let available = 0;
      switch (ing.type) {
        case 'coxinhas': available = state.resources.coxinhas; break;
        case 'fragments': available = state.resources.hotOilFragments; break;
        case 'stardust': available = state.resources.stardust; break;
        case 'golden_essence': available = state.resources.goldenEssence; break;
        case 'cosmic_flour': available = state.resources.cosmicFlour; break;
      }
      if (available < ing.amount) return false;
    }
    return queue.length < 3;
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-sm font-bold text-[#ffaa00]">⚗️ CRAFTING</h3>
        <span className="text-xs text-gray-400">Fila: {queue.length}/3</span>
      </div>

      {/* Queue */}
      {queue.length > 0 && (
        <div className="mb-3 space-y-1">
          {queue.map((item, i) => {
            const recipe = state.craftingRecipes.find(r => r.id === item.recipeId);
            const progress = Math.min(1, (Date.now() - item.startedAt) / (item.completesAt - item.startedAt));
            return (
              <div key={i} className="p-1.5 rounded bg-[#1a1a0a] border border-[#4CAF50]/30">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[10px] text-[#4CAF50]">{recipe?.icon} {recipe?.name}</span>
                  <span className="text-[9px] text-gray-400">{Math.floor(progress * 100)}%</span>
                </div>
                <div className="h-1 bg-[#0a0a0a] rounded overflow-hidden">
                  <div className="h-full bg-[#4CAF50]" style={{ width: `${progress * 100}%`, transition: 'width 1s linear' }} />
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        {discovered.map(recipe => {
          const affordable = canAffordRecipe(recipe);
          return (
            <div key={recipe.id} className={`p-2 rounded border transition-all ${affordable ? 'border-[#ffaa00]/30 bg-[#1a1008]' : 'border-[#222] bg-[#0a0a0a] opacity-60'}`}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-base">{recipe.icon}</span>
                  <div>
                    <div className="text-[11px] font-bold text-[#e5e5e5]">{recipe.name}</div>
                    <div className="text-[9px] text-gray-500">{recipe.result.description}</div>
                  </div>
                </div>
                <button onClick={() => startCrafting(recipe.id)} disabled={!affordable}
                  className={`text-[9px] px-2 py-1 rounded font-bold ${affordable ? 'bg-[#ffaa00] text-black hover:bg-[#ffcc00]' : 'bg-[#333] text-gray-600 cursor-not-allowed'}`}>
                  CRAFTAR
                </button>
              </div>
              <div className="flex flex-wrap gap-1">
                {recipe.ingredients.map((ing, i) => (
                  <span key={i} className="text-[8px] px-1.5 py-0.5 rounded bg-white/5 text-gray-400">
                    {INGREDIENT_ICONS[ing.type]} {formatNumber(ing.amount)}
                  </span>
                ))}
                <span className="text-[8px] px-1.5 py-0.5 rounded bg-white/5 text-gray-400">⏱️ {recipe.craftTime}s</span>
              </div>
            </div>
          );
        })}

        {discovered.length === 0 && (
          <div className="text-center text-gray-600 text-sm mt-8">
            <span className="text-2xl block mb-2">🔒</span>
            Faça seu primeiro rebirth para desbloquear receitas!
          </div>
        )}
      </div>
    </div>
  );
};

// ── Quest Panel ──────────────────────────────────────────────────────────────

export const QuestPanel: React.FC = () => {
  const { state, claimQuest, refreshQuests, formatNumber } = useGame();

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-sm font-bold text-[#ffaa00]">📋 MISSÕES</h3>
        <span className="text-xs text-gray-400">{state.quests.filter(q => q.claimed).length}/{state.quests.length} ✅</span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        {state.quests.map(quest => {
          const progress = Math.min(1, quest.progress / quest.target);
          return (
            <div key={quest.id} className={`p-2 rounded border transition-all ${quest.claimed ? 'border-[#4CAF50]/30 bg-[#0a120a] opacity-50' : quest.completed ? 'border-[#FFD700] bg-[#1a1a0a]' : 'border-[#333] bg-[#0f0a05]'}`}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-base">{quest.icon}</span>
                  <div>
                    <div className="text-[11px] font-bold text-[#e5e5e5]">{quest.name}</div>
                    <div className="text-[9px] text-gray-500">{quest.description}</div>
                  </div>
                </div>
                {quest.completed && !quest.claimed && (
                  <button onClick={() => claimQuest(quest.id)}
                    className="text-[9px] px-2 py-1 rounded font-bold bg-[#4CAF50] text-black animate-pulse">
                    RESGATAR
                  </button>
                )}
                {quest.claimed && <span className="text-[9px] text-[#4CAF50]">✅</span>}
              </div>
              <div className="h-1 bg-[#1a1a1a] rounded overflow-hidden mb-0.5">
                <div className="h-full bg-gradient-to-r from-[#39ff14] to-[#ffaa00]" style={{ width: `${progress * 100}%`, transition: 'width 0.3s' }} />
              </div>
              <div className="flex justify-between text-[8px] text-gray-500">
                <span>{formatNumber(quest.progress)}/{formatNumber(quest.target)}</span>
                <span className="text-[#ffaa00]">
                  {quest.reward.coxinhas ? `${formatNumber(quest.reward.coxinhas)} 🥟` : ''}
                  {quest.reward.fragments ? ` ${quest.reward.fragments} 🔥` : ''}
                  {quest.reward.skillPoints ? ` ${quest.reward.skillPoints} SP` : ''}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ── Statistics Panel ─────────────────────────────────────────────────────────

export const StatisticsPanel: React.FC = () => {
  const { state, formatNumber, formatTime, cps, clickPower, globalMultiplier, critChance, critMult } = useGame();
  const s = state.statistics;

  const rows = [
    ['🖱️ Cliques Totais', formatNumber(s.totalClicks)],
    ['🥟 Coxinhas Produzidas', formatNumber(s.totalCoxinhasEarned)],
    ['💸 Coxinhas Gastas', formatNumber(s.totalCoxinhasSpent)],
    ['🏗️ Edifícios Comprados', formatNumber(s.totalBuildingsBought)],
    ['✨ Upgrades Comprados', s.totalUpgradesBought.toString()],
    ['🔥 Rebirths', s.totalRebirths.toString()],
    ['⭐ Douradas Clicadas', s.totalGoldenClicked.toString()],
    ['📋 Missões Completas', s.totalQuestsCompleted.toString()],
    ['🏆 Conquistas', `${s.totalAchievementsUnlocked}/${state.achievements.length}`],
    ['🐾 Pets Descobertos', `${s.totalPetsDiscovered}/${state.pets.length}`],
    ['⚗️ Itens Craftados', s.totalItemsCrafted.toString()],
    ['📈 Maior CPS', formatNumber(s.highestCps)],
    ['💥 Maior Clique', formatNumber(s.highestClickDamage)],
    ['🔥 Maior Combo', s.highestCombo.toString()],
    ['⏱️ Tempo de Jogo', formatTime(s.totalPlayTimeSeconds)],
    ['💤 Ganhos Offline', formatNumber(s.totalOfflineEarnings)],
    ['───', '───'],
    ['⚡ CPS Atual', formatNumber(cps)],
    ['👆 Poder de Clique', formatNumber(clickPower)],
    ['📊 Multiplicador Global', `x${globalMultiplier.toFixed(2)}`],
    ['🎯 Chance Crítica', `${(critChance * 100).toFixed(1)}%`],
    ['💥 Dano Crítico', `x${critMult.toFixed(1)}`],
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-sm font-bold text-[#ffaa00]">📊 ESTATÍSTICAS</h3>
        <span className="text-xs text-gray-400">Nv.{state.player.level}</span>
      </div>

      <div className="flex-1 overflow-y-auto pr-1">
        <div className="space-y-0.5">
          {rows.map(([label, value], i) => (
            label === '───' ? <div key={i} className="border-t border-white/5 my-1" /> :
            <div key={i} className="flex justify-between py-0.5 text-[10px]">
              <span className="text-gray-400">{label}</span>
              <span className="text-[#e5e5e5] font-mono">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── Challenge Panel ──────────────────────────────────────────────────────────

const DIFF_COLORS: Record<string, string> = {
  easy: '#4CAF50', medium: '#FF9800', hard: '#F44336', nightmare: '#9C27B0', impossible: '#E91E63'
};

export const ChallengePanel: React.FC = () => {
  const { state } = useGame();

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-sm font-bold text-[#ffaa00]">⚔️ DESAFIOS</h3>
        <span className="text-xs text-gray-400">{state.challenges.filter(c => c.completed).length}/{state.challenges.length}</span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        {state.challenges.map(ch => (
          <div key={ch.id} className={`p-2 rounded border transition-all ${ch.completed ? 'border-[#4CAF50]/30 bg-[#0a120a]' : 'border-[#333] bg-[#0f0a05]'}`}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="text-base">{ch.icon}</span>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] font-bold text-[#e5e5e5]">{ch.name}</span>
                    <span className="text-[8px] px-1 rounded" style={{ background: `${DIFF_COLORS[ch.difficulty]}20`, color: DIFF_COLORS[ch.difficulty] }}>
                      {ch.difficulty}
                    </span>
                  </div>
                  <div className="text-[9px] text-gray-500">{ch.description}</div>
                </div>
              </div>
              {ch.completed && <span className="text-[#4CAF50]">✅</span>}
            </div>
            <div className="flex flex-wrap gap-1 mt-1">
              <span className="text-[8px] px-1.5 py-0.5 rounded bg-white/5 text-[#ffaa00]">🔥 {ch.reward.fragments}</span>
              <span className="text-[8px] px-1.5 py-0.5 rounded bg-white/5 text-[#4ECDC4]">SP: {ch.reward.skillPoints}</span>
              {ch.reward.title && <span className="text-[8px] px-1.5 py-0.5 rounded bg-white/5 text-[#9C27B0]">🏅 {ch.reward.title}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Notification Toast ───────────────────────────────────────────────────────

export const NotificationToast: React.FC = () => {
  const { state, dismissNotification } = useGame();

  const visible = useMemo(() => {
    const now = Date.now();
    return state.notifications.filter(n => now - n.timestamp < n.duration).slice(-5);
  }, [state.notifications]);

  if (visible.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-[100] space-y-2 pointer-events-none max-w-[300px]">
      {visible.map(n => (
        <div key={n.id}
          className="pointer-events-auto bg-[#1a1a1a] border-l-4 rounded-lg px-3 py-2 shadow-xl animate-pulse"
          style={{ borderColor: n.color, boxShadow: `0 0 20px ${n.color}30` }}
          onClick={() => dismissNotification(n.id)}>
          <div className="text-[11px] font-bold text-white">
            {n.icon} {n.title}
          </div>
          <div className="text-[9px] text-gray-300">{n.message}</div>
        </div>
      ))}
    </div>
  );
};

// ── Buff Bar ─────────────────────────────────────────────────────────────────

export const BuffBar: React.FC = () => {
  const { state } = useGame();

  if (state.activeBuffs.length === 0) return null;

  return (
    <div className="flex gap-1 flex-wrap">
      {state.activeBuffs.map(buff => {
        const remaining = Math.max(0, (buff.expiresAt - Date.now()) / 1000);
        return (
          <div key={buff.id} className="flex items-center gap-1 bg-[#1a1a1a] border border-[#ffaa00]/30 rounded px-1.5 py-0.5">
            <span className="text-xs">{buff.icon}</span>
            <span className="text-[9px] text-[#ffaa00] font-bold">{buff.name}</span>
            <span className="text-[8px] text-gray-400">{Math.floor(remaining)}s</span>
          </div>
        );
      })}
    </div>
  );
};

// ── Resources Bar ────────────────────────────────────────────────────────────

export const ResourcesBar: React.FC = () => {
  const { state, formatNumber } = useGame();
  const r = state.resources;

  const resources = [
    { icon: '🔥', name: 'Fragmentos', value: r.hotOilFragments, show: r.hotOilFragments > 0 },
    { icon: '✨', name: 'Poeira Estelar', value: r.stardust, show: r.stardust > 0 },
    { icon: '⭐', name: 'Essência Dourada', value: r.goldenEssence, show: r.goldenEssence > 0 },
    { icon: '🌌', name: 'Farinha Cósmica', value: r.cosmicFlour, show: r.cosmicFlour > 0 },
    { icon: '🧠', name: 'SP', value: r.skillPoints, show: r.skillPoints > 0 },
  ];

  const visibleResources = resources.filter(r => r.show);
  if (visibleResources.length === 0) return null;

  return (
    <div className="flex gap-2 flex-wrap">
      {visibleResources.map(res => (
        <div key={res.name} className="flex items-center gap-1 bg-white/5 rounded px-2 py-0.5" title={res.name}>
          <span className="text-xs">{res.icon}</span>
          <span className="text-[10px] text-gray-300 font-mono">{formatNumber(res.value)}</span>
        </div>
      ))}
    </div>
  );
};

// ── Rebirth Panel (New) ──────────────────────────────────────────────────────

export const RebirthPanelNew: React.FC = () => {
  const { state, performRebirth, calculateRebirthFragments, getRebirthRequirements, formatNumber } = useGame();

  const nextFragments = calculateRebirthFragments();
  const reqs = getRebirthRequirements();
  const canRebirth = reqs.met && nextFragments > 0;

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-sm font-bold text-[#FF6F00]">🔥 REBIRTH</h3>
        <span className="text-xs text-gray-400">#{state.prestige.rebirthCount}</span>
      </div>

      <div className="p-3 rounded bg-[#1a0a00] border border-[#FF6F00]/30 mb-3">
        <div className="text-center mb-2">
          <span className="text-3xl">🔥</span>
          <div className="text-lg font-bold text-[#FF6F00]">{formatNumber(state.resources.hotOilFragments)}</div>
          <div className="text-[9px] text-gray-400">Fragmentos de Óleo Quente</div>
        </div>
        <div className="space-y-1 text-[10px]">
          <div className="flex justify-between"><span className="text-gray-400">Rebirths:</span><span className="text-[#e5e5e5]">{state.prestige.rebirthCount}</span></div>
          <div className="flex justify-between"><span className="text-gray-400">Prestige Total:</span><span className="text-[#e5e5e5]">{formatNumber(state.prestige.totalPrestige)}</span></div>
          <div className="flex justify-between"><span className="text-gray-400">Próximo Rebirth:</span><span className="text-[#ffaa00] font-bold">+{formatNumber(nextFragments)} fragmentos</span></div>
        </div>
      </div>

      {/* Requirements */}
      <div className="mb-3 p-2 rounded bg-[#0f0805] border border-[#3d2211]">
        <div className="text-[10px] font-bold text-[#FF6F00] mb-2">📋 Requisitos para Rebirth {state.prestige.rebirthCount + 1}:</div>

        {/* Coxinhas requirement */}
        <div className="mb-2">
          <div className="flex justify-between text-[9px] mb-0.5">
            <span className="text-gray-400">Coxinhas Totais:</span>
            <span className={state.statistics.totalCoxinhasEarned >= reqs.totalCoxinhasRequired ? 'text-[#4CAF50]' : 'text-red-400'}>
              {formatNumber(state.statistics.totalCoxinhasEarned)} / {formatNumber(reqs.totalCoxinhasRequired)}
            </span>
          </div>
          <div className="w-full h-1.5 bg-[#1a0f08] rounded overflow-hidden">
            <div className="h-full rounded transition-all duration-300"
              style={{
                width: `${Math.min(100, (state.statistics.totalCoxinhasEarned / reqs.totalCoxinhasRequired) * 100)}%`,
                backgroundColor: state.statistics.totalCoxinhasEarned >= reqs.totalCoxinhasRequired ? '#4CAF50' : '#FF6F00'
              }} />
          </div>
        </div>

        {/* Building requirements per tier */}
        {reqs.tiers.map((tier, ti) => {
          const buildings = tier.buildingIds.map(id => {
            const b = state.buildings.find(bl => bl.id === id);
            return { id, name: b?.name || id, icon: b?.icon || '🏗️', count: b?.count || 0, met: (b?.count || 0) >= tier.required };
          });
          const tierMet = buildings.every(b => b.met);
          return (
            <div key={ti} className="mb-2">
              <div className="flex items-center gap-1 text-[9px] mb-1">
                <span className={tierMet ? 'text-[#4CAF50]' : 'text-[#FF6F00]'}>{tierMet ? '✅' : '⬜'}</span>
                <span className="font-bold text-gray-300">{tier.name}</span>
                <span className="text-gray-500">({tier.required} de cada)</span>
              </div>
              <div className="grid grid-cols-5 gap-1">
                {buildings.map(b => (
                  <div key={b.id} className={`text-center p-1 rounded text-[8px] border ${b.met ? 'bg-[#1a2a10] border-[#4CAF50]/30' : 'bg-[#1a0808] border-[#3d2211]/50'}`}>
                    <div>{b.icon}</div>
                    <div className={b.met ? 'text-[#4CAF50]' : 'text-red-400'}>{b.count}/{tier.required}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <button onClick={() => performRebirth()} disabled={!canRebirth}
        className={`w-full py-2.5 rounded font-bold text-sm transition-all ${canRebirth ? 'bg-gradient-to-r from-[#FF6F00] to-[#FF9800] text-black hover:brightness-110 animate-pulse' : 'bg-[#333] text-gray-600 cursor-not-allowed'}`}>
        🔥 FAZER REBIRTH
      </button>

      <div className="mt-3 p-2 rounded bg-[#0a0a0a] border border-[#333] text-[9px] text-gray-500">
        <p className="font-bold text-gray-400 mb-1">⚠️ Rebirth reseta:</p>
        <p>❌ Coxinhas, Edifícios, Upgrades</p>
        <p className="mt-1 text-[#4CAF50]">✅ Mantém: Fragmentos, Galáxias, Skills, Pets, Conquistas</p>
        <p className="mt-1 text-[#ffaa00]">🆕 Ganha: Upgrades de Renascimento (novos a cada rebirth!)</p>
      </div>

      <div className="mt-3 flex-1">
        <div className="text-[10px] text-gray-400 mb-1 font-bold">Bônus de Prestige:</div>
        <div className="text-[9px] text-gray-500 space-y-0.5">
          <div>+{(state.prestige.totalPrestige * 0.01 * 100).toFixed(1)}% CPS (total prestige)</div>
          <div>+{Math.floor(state.prestige.rebirthCount / 5)} Farinha Cósmica/rebirth</div>
          <div>🏗️ Bônus de Marco: x1.5 CPS a cada 50 edifícios (após 100)</div>
          {state.prestige.rebirthCount > 0 && <div className="text-[#ffaa00]">🔥 {state.prestige.rebirthCount * 2 + Math.floor(state.prestige.rebirthCount / 3) + Math.floor(state.prestige.rebirthCount / 2)} upgrades de renascimento!</div>}
          {state.prestige.permanentBonuses.slice(0, 5).map((b, i) => (
            <div key={i}>x{b.value} CPS ({b.source})</div>
          ))}
        </div>
      </div>
    </div>
  );
};
