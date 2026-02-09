/**
 * 🎭 ENTERTAINMENT MEGA SYSTEMS
 * 185+ Features: Theater (65), Lore (70), Circus (50)
 */

// ================== THEATER SYSTEM ==================
export class TheaterSystem {
  theaters: any[] = [];
  shows: any[] = [];
  actors: any[] = [];
  reputation = 0;
  tickets_sold = 0;

  showTypes = {
    musical: {
      name: 'Musical da Coxinha',
      duration: 7200000,
      cast: 20,
      musicians: 10,
      production_cost: 1000000,
      ticket_price: 500,
      capacity: 2000,
      rehearsal_time: 2592000000,
    },

    play: {
      name: 'Romeu e Coxinheta',
      duration: 5400000,
      cast: 10,
      production_cost: 500000,
      ticket_price: 300,
      capacity: 1500,
      rehearsal_time: 1209600000,
    },

    opera: {
      name: 'A Flauta Mágica Frita',
      duration: 9000000,
      cast: 30,
      musicians: 50,
      production_cost: 5000000,
      ticket_price: 2000,
      capacity: 3000,
      rehearsal_time: 5184000000,
      prestige: 1000,
    },

    comedy: {
      name: 'Stand-Up do Gordão',
      duration: 3600000,
      cast: 1,
      production_cost: 50000,
      ticket_price: 150,
      capacity: 500,
      rehearsal_time: 604800000,
    },

    magic_show: {
      name: 'Coxinha Desaparecida',
      duration: 5400000,
      cast: 5,
      production_cost: 300000,
      ticket_price: 400,
      capacity: 1000,
      special_effects: true,
      illusions: ['levitation', 'teleport', 'sawing', 'escape'],
    },

    circus: {
      name: 'Cirque du Coxinha',
      duration: 7200000,
      cast: 50,
      production_cost: 2000000,
      ticket_price: 800,
      capacity: 5000,
      acts: ['trapeze', 'tightrope', 'juggling', 'clowns', 'animals'],
    },

    concert: {
      name: 'Rock da Fritura',
      duration: 10800000,
      band: 5,
      production_cost: 10000000,
      ticket_price: 1500,
      capacity: 50000,
      venue: 'stadium',
      pyrotechnics: true,
    },

    ballet: {
      name: 'O Lago das Coxinhas',
      duration: 7200000,
      cast: 40,
      musicians: 80,
      production_cost: 3000000,
      ticket_price: 1000,
      capacity: 2500,
      elegance: 100,
    },
  };

  actorSystem = {
    attributes: {
      acting: 0,
      charisma: 0,
      singing: 0,
      dancing: 0,
      comedy: 0,
      improvisation: 0,
      fame: 0,
    },

    tiers: [
      { tier: 'Extra', salary: 100, fame: 0 },
      { tier: 'Supporting', salary: 1000, fame: 100 },
      { tier: 'Lead', salary: 10000, fame: 1000 },
      { tier: 'Star', salary: 100000, fame: 10000 },
      { tier: 'Superstar', salary: 1000000, fame: 100000 },
      { tier: 'Legend', salary: 10000000, fame: 1000000 },
    ],

    train(actor: any, skill: string) {
      const cost = actor.level * 1000;
      const time = 3600000;

      actor[skill] = (actor[skill] || 0) + 1;
      actor.xp = (actor.xp || 0) + 100;

      if ((actor.xp || 0) >= (actor.nextLevel || 100)) {
        this.levelUp(actor);
      }
    },

    castingCall() {
      const candidates = Array(100)
        .fill(null)
        .map(() => ({
          name: this.generateName(),
          acting: Math.random() * 100,
          charisma: Math.random() * 100,
          singing: Math.random() * 100,
          salary_demand: Math.random() * 100000,
        }));

      return candidates
        .sort(
          (a: any, b: any) =>
            b.acting + b.charisma + b.singing - (a.acting + a.charisma + a.singing)
        );
    },

    scandal(actor: any) {
      const scandals = [
        { name: 'Affair', fame: -10000, recovery: 30 },
        { name: 'Drug Abuse', fame: -50000, recovery: 90 },
        { name: 'Tax Evasion', fame: -25000, legal: true },
        { name: 'Meltdown', fame: -15000, recovery: 60 },
      ];

      const scandal = scandals[Math.floor(Math.random() * scandals.length)];
      actor.fame -= scandal.fame;
      actor.suspended = scandal.recovery;
    },

    generateName() {
      return 'Actor ' + Math.floor(Math.random() * 10000);
    },

    levelUp(actor: any) {
      actor.level = (actor.level || 1) + 1;
      actor.nextLevel = (actor.nextLevel || 100) * 1.5;
    },
  };

  production = {
    phases: [
      {
        name: 'Pre-Production',
        tasks: ['script', 'casting', 'design', 'budget'],
        duration: 2592000000,
      },
      {
        name: 'Rehearsal',
        tasks: ['blocking', 'memorization', 'chemistry'],
        duration: 1209600000,
      },
      {
        name: 'Tech Week',
        tasks: ['lighting', 'sound', 'costumes', 'props'],
        duration: 604800000,
      },
      {
        name: 'Previews',
        tasks: ['soft_opening', 'feedback', 'adjustments'],
        duration: 259200000,
      },
      {
        name: 'Opening Night',
        tasks: ['premiere', 'critics', 'reviews'],
        duration: 1,
      },
    ],

    budget: {
      actors: 0.4,
      set_design: 0.2,
      costumes: 0.1,
      marketing: 0.15,
      venue: 0.1,
      contingency: 0.05,
    },

    crisisManagement: [
      { crisis: 'Lead Actor Quits', solution: 'Understudy', cost: 0 },
      { crisis: 'Set Collapse', solution: 'Rebuild', cost: 100000 },
      { crisis: 'Bad Reviews', solution: 'Revamp', cost: 50000 },
      { crisis: 'Lawsuit', solution: 'Settle', cost: 500000 },
    ],
  };

  reviewSystem = {
    critics: [
      { name: 'New York Times', weight: 100, harsh: true },
      { name: 'Rolling Stone', weight: 80, music_focus: true },
      { name: 'Variety', weight: 90, industry_standard: true },
      { name: 'Local Paper', weight: 30, easy: true },
      { name: 'Rotten Tomatoes', weight: 85, aggregator: true },
    ],

    generateReview(show: any) {
      const score =
        (show.acting_quality || 0) * 0.3 +
        (show.production_value || 0) * 0.3 +
        (show.originality || 0) * 0.2 +
        (show.entertainment || 0) * 0.2;

      const reviews: { [key: number]: string } = {
        90: '⭐⭐⭐⭐⭐ OBRA-PRIMA! Imperdível!',
        80: '⭐⭐⭐⭐ Excelente! Altamente recomendado.',
        70: '⭐⭐⭐ Bom! Vale a pena.',
        60: '⭐⭐ Mediano. Tem seus momentos.',
        50: '⭐ Fraco. Decepcionante.',
        0: '💀 DESASTRE! Evitem!',
      };

      return reviews[Math.floor(score / 10) * 10] || 'Unknown';
    },

    viralMoment(show: any) {
      if (Math.random() < 0.01) {
        show.viral = true;
        show.ticket_sales = (show.ticket_sales || 0) * 10;
        show.fame = (show.fame || 0) + 100000;
      }
    },
  };

  awards = {
    tony_awards: {
      categories: [
        'Best Musical',
        'Best Play',
        'Best Actor',
        'Best Actress',
        'Best Director',
        'Best Choreography',
        'Best Set Design',
        'Best Original Score',
      ],
      prestige: 10000,
      sales_boost: 5,
    },

    oscar: {
      categories: ['Best Picture', 'Best Actor', 'Best Director'],
      prestige: 50000,
      sales_boost: 10,
    },

    grammy: {
      categories: ['Album of Year', 'Song of Year', 'Best Performance'],
      prestige: 25000,
      sales_boost: 7,
    },
  };

  touring = {
    worldTour: {
      cities: [
        'São Paulo',
        'Rio',
        'NYC',
        'London',
        'Paris',
        'Tokyo',
        'Sydney',
        'Dubai',
        'Moscow',
        'LA',
      ],
      duration: 15552000000,
      revenue: 100000000,
      cost: 30000000,
      logistics: ['transport', 'hotels', 'venues', 'crew'],
    },

    residency: {
      location: 'Las Vegas',
      duration: 31536000000,
      shows_per_week: 5,
      ticket_price: 500,
      capacity: 5000,
      stable_income: true,
    },
  };

  merchandise = {
    items: [
      { name: 'T-Shirt', cost: 5, price: 30, margin: 25 },
      { name: 'Poster', cost: 2, price: 15, margin: 13 },
      { name: 'CD/Vinyl', cost: 3, price: 25, margin: 22 },
      { name: 'Program', cost: 1, price: 10, margin: 9 },
      { name: 'Plush Toy', cost: 10, price: 50, margin: 40 },
      { name: 'Limited Edition', cost: 50, price: 500, margin: 450 },
    ],

    sales(attendance: number) {
      return Math.floor(attendance * 0.3);
    },
  };

  streaming = {
    platforms: ['Netflix', 'Disney+', 'HBO', 'Amazon'],

    dealTypes: {
      exclusive: { payment: 50000000, rights: 'all', duration: '5 years' },
      non_exclusive: { payment: 10000000, rights: 'streaming', duration: '1 year' },
      revenue_share: { payment: 0, rights: 'streaming', revenue: '70/30' },
    },

    views: 0,
    revenue_per_view: 0.01,
  };

  fanbase = {
    size: 0,
    loyalty: 0,
    demographics: {
      age: { under18: 0, '18-34': 0, '35-54': 0, over55: 0 },
      gender: { male: 0, female: 0, other: 0 },
      location: {},
    },

    engagement: {
      social_media: 0,
      fan_clubs: 0,
      conventions: 0,
      meet_greets: 0,
    },

    toxic_fans: 0,

    grow(amount: number) {
      this.size += amount;
      this.checkMilestones();
    },

    milestones: [
      { fans: 1000, unlock: 'Fan Club' },
      { fans: 10000, unlock: 'Verified Social Media' },
      { fans: 100000, unlock: 'Documentary' },
      { fans: 1000000, unlock: 'Hall of Fame' },
      { fans: 10000000, unlock: 'Cultural Icon' },
    ],

    checkMilestones() {
      // Milestone checking logic
    },
  };

  specialEvents = [
    {
      name: 'Charity Gala',
      cost: 500000,
      revenue: 2000000,
      reputation: 5000,
      attendees: 'VIP',
    },
    {
      name: 'Awards Show',
      cost: 1000000,
      revenue: 5000000,
      reputation: 10000,
      broadcast: true,
    },
    {
      name: 'Festival Headliner',
      cost: 2000000,
      revenue: 10000000,
      reputation: 15000,
      exposure: 'massive',
    },
  ];
}

// ================== LORE SYSTEM ==================
export class LoreSystem {
  chapters: any[] = [];
  characters: any[] = [];
  locations: any[] = [];
  timeline: any[] = [];
  mysteries: any[] = [];

  mainStory = {
    prologue: {
      title: 'A Primeira Coxinha',
      era: 'Pré-História',
      year: -10000,
      text: `No início, havia apenas fome. Até que o Primeiro Fritador
        descobriu o segredo da massa perfeita e do recheio divino.
        Assim nasceu a Primeira Coxinha, e com ela, a civilização.`,
      unlocks: 'Cursor de Fritura',
    },

    chapter1: {
      title: 'A Era das Vovós',
      era: 'Antiguidade',
      year: -3000,
      text: `As Vovós Ancestrais guardavam as receitas secretas em templos
        sagrados. Apenas as dignas podiam aprender os Temperos Proibidos.`,
      unlocks: 'Vovó Cozinheira',
      boss: 'Matriarca Primordial',
    },

    chapter2: {
      title: 'A Revolução Industrial',
      era: 'Era Moderna',
      year: 1850,
      text: `A invenção da Fritadeira a Vapor mudou tudo. Pela primeira vez,
        coxinhas podiam ser produzidas em massa. Mas a que custo?`,
      unlocks: 'Fritura Industrial',
      choice: {
        option1: 'Abraçar o progresso',
        option2: 'Preservar tradição',
        consequences: 'afetam resto do jogo',
      },
    },

    chapter3: {
      title: 'A Guerra das Coxinhas',
      era: 'Século XX',
      year: 1942,
      text: `Nações lutaram pelo controle das Fazendas de Frango Sagradas.
        Milhões morreram. O mundo nunca mais seria o mesmo.`,
      unlocks: 'Rede de Franquias',
      war_events: true,
    },

    chapter4: {
      title: 'A Era Digital',
      era: 'Século XXI',
      year: 2024,
      text: `Apps de delivery democratizaram o acesso às coxinhas.
        Mas surgiram as Coxinhas Sintéticas. São realmente coxinhas?`,
      unlocks: 'Food Truck Gourmet',
      philosophical: true,
    },

    chapter5: {
      title: 'Transcendência',
      era: 'Futuro Próximo',
      year: 2077,
      text: `Teletransporte de coxinhas instantâneo. Replicadores moleculares.
        A fronteira entre coxinha e realidade se dissolve.`,
      unlocks: 'Torre de Teletransporte',
      sci_fi: true,
    },

    chapter6: {
      title: 'Além do Tempo',
      era: 'Pós-Temporal',
      year: '???',
      text: `Descobrimos que as coxinhas existem em todas as realidades.
        São a constante universal. A Coxinha Primordial chama...`,
      unlocks: 'Portal Dimensional',
      cosmic_horror: true,
    },

    epilogue: {
      title: 'O Fim é o Começo',
      era: 'Eternidade',
      year: '∞',
      text: `Você se torna a própria Coxinha. Compreende o ciclo infinito.
        Cada clique é uma nova vida. Cada ascensão é renascimento.`,
      ending: true,
      unlocks: 'New Game+',
      achievement: 'Iluminação Crocante',
    },
  };

  characters = {
    protagonista: {
      name: 'Você',
      role: 'O Fritador',
      backstory: 'Um simples cozinheiro com sonhos de grandeza',
      development: [
        { level: 1, title: 'Novato' },
        { level: 10, title: 'Aprendiz' },
        { level: 50, title: 'Mestre' },
        { level: 100, title: 'Lenda' },
        { level: 1000, title: 'Deus' },
      ],
    },

    vovo_ancestral: {
      name: 'Matriarca Eterna',
      role: 'Mentora',
      age: 10000,
      species: 'Imortal',
      quotes: [
        '"A massa perfeita vem do coração, não das mãos."',
        '"Cada coxinha carrega a alma de quem a frita."',
        '"Quando estiver perdido, lembre-se: frite com amor."',
      ],
      relationship: 0,
      final_gift: 'Receita Definitiva',
    },

    antagonista: {
      name: 'Dr. Microondas',
      role: 'Vilão',
      goal: 'Destruir todas fritadeiras',
      motivation: 'Acredita que fritura é ultrapassada',
      backstory: 'Perdeu família em acidente de óleo quente',
      redeemable: true,
      phases: [
        { phase: 1, power: 'EMP Pulse' },
        { phase: 2, power: 'Robot Army' },
        { phase: 3, power: 'Nuclear Option' },
        { phase: 4, power: 'Time Rewind' },
      ],
    },

    aliados: {
      chef_celebrity: {
        name: 'Gordon Ramsey da Silva',
        ability: '+50% produção quando ativo',
        unlock: 'Ganhar concurso culinário',
        personality: 'Agressivo mas justo',
      },

      cientista_louco: {
        name: 'Prof. Fritzenstein',
        ability: 'Research x2',
        unlock: 'Descobrir 100 upgrades',
        personality: 'Excêntrico gênio',
      },

      investidor: {
        name: 'Warren Buffet Jr',
        ability: '-50% custos',
        unlock: '1B coxinhas produzidas',
        personality: 'Frio calculista',
      },
    },

    npcs: {
      cliente_regular: {
        name: 'José da Esquina',
        dialogue: [
          'Mais uma coxinha, por favor!',
          'Você faz as melhores!',
          'Lembro quando isso aqui era só uma barraquinha...',
        ],
        evolution: 'Vira sócio no final',
      },

      fiscal: {
        name: 'Inspetor Durão',
        dialogue: [
          'Documentação, por favor.',
          'Hmmm, tudo parece em ordem... por enquanto.',
          'Voltarei semana que vem.',
        ],
        can_bribe: true,
      },

      misterioso: {
        name: '???',
        appearance: 'Sempre no canto escuro',
        dialogue: [
          '...',
          'Você ainda não está pronto.',
          'Quando compreender a Verdade, me procure.',
        ],
        unlock: 'Após 1Qa produzido',
        reveals: 'Segredo do universo',
      },
    },
  };

  locations = {
    templo_da_fritura: {
      name: 'Templo da Primeira Fritada',
      location: 'Himalaia',
      discovered: false,
      requirements: 'Prestige 10',
      features: {
        altar: 'Oferenda de coxinhas = bênção',
        library: 'Scrolls antigos com receitas',
        trial: 'Provação do Óleo Fervente',
        master: 'Monge Fritador',
      },
      reward: 'Iluminação Culinária',
    },

    vale_das_vovos: {
      name: 'Vale das Matriarcas',
      location: 'Interior de Minas',
      discovered: false,
      requirements: '1000 vovós',
      features: {
        council: 'Conselho das 13 Vovós Anciãs',
        challenge: 'Fazer coxinha perfeita',
        secret: 'Origem das vovós revelada',
      },
      reward: 'Vovó Suprema',
    },

    fabrica_abandonada: {
      name: 'Fábrica Assombrada',
      location: 'Subúrbio Industrial',
      discovered: false,
      atmosphere: 'Terror psicológico',
      features: {
        ghosts: 'Fantasmas de trabalhadores',
        mystery: 'O que aconteceu aqui?',
        truth: 'Acidente escondido',
        curse: 'Produção -50% até resolver',
      },
      reward: 'Paz espiritual + Upgrade Lendário',
    },

    dimensao_coxinha: {
      name: 'Plano Crocante',
      location: 'Além da Realidade',
      discovered: false,
      requirements: 'Ascender 100x',
      features: {
        landscape: 'Montanhas de coxinhas',
        inhabitants: 'Seres de massa pura',
        physics: 'Leis diferentes',
        danger: 'Ficar preso forever',
      },
      reward: 'Onipotência Culinária',
    },
  };

  mysteries = {
    receita_perdida: {
      name: 'A Receita Perdida de Atlântida',
      clues: 12,
      found: 0,
      locations: ['oceano', 'biblioteca', 'templo', 'space'],
      reward: 'Coxinha Perfeita (+1000% tudo)',
      lore: 'Atlantes inventaram a coxinha',
    },

    origem_vovos: {
      name: 'De Onde Vêm as Vovós?',
      mystery: 'Vovós não envelhecem. São imortais?',
      investigation: [
        'Vovós aparecem do nada',
        'Todas chamam-se "Vovó"',
        'Compartilham memórias',
        'Verdade: São clones de 1 Vovó Original',
      ],
      twist: 'Você é descendente da Vovó Original',
    },

    loop_temporal: {
      name: 'O Eterno Retorno',
      mystery: 'Já fizemos isso antes?',
      evidence: [
        'Déjà vu frequente',
        'Algumas conquistas já desbloqueadas',
        'NPCs mencionam "outras vidas"',
      ],
      truth: 'Jogo inteiro é loop temporal',
      escape: 'Apenas ascendendo 1000x',
    },

    quem_clica: {
      name: 'Quem Está Clicando?',
      philosophical: true,
      questions: [
        'Somos nós ou o personagem?',
        'A Coxinha nos observa?',
        'Temos livre arbítrio?',
      ],
      answer: 'Breaking 4th wall revelação',
      meta: true,
    },
  };

  timeline = {
    year_minus_10000: {
      event: 'Primeira Coxinha',
      importance: 'CRITICAL',
      affects: 'Tudo',
    },

    year_minus_3000: {
      event: 'Fundação Templo das Vovós',
      importance: 'HIGH',
    },

    year_1500: {
      event: 'Portugueses trazem receita ao Brasil',
      importance: 'HIGH',
      historical: true,
    },

    year_1850: {
      event: 'Revolução Industrial Fritura',
      importance: 'MEDIUM',
    },

    year_1942: {
      event: 'Guerra das Coxinhas começa',
      importance: 'HIGH',
      casualties: 50000000,
    },

    year_2024: {
      event: 'Player começa jogo',
      importance: 'CRITICAL',
      meta: true,
    },

    year_2077: {
      event: 'Singularidade da Coxinha',
      importance: 'CRITICAL',
      sci_fi: true,
    },

    year_unknown: {
      event: 'Fim/Começo do Tempo',
      importance: '???',
      paradox: true,
    },
  };

  codex = {
    entries: 1000,
    categories: [
      'Prédios',
      'Upgrades',
      'Personagens',
      'Locações',
      'Eventos',
      'Itens',
      'Criaturas',
      'Lore',
      'Conquistas',
    ],

    completion_rewards: {
      25: 'Pesquisador',
      50: 'Historiador',
      75: 'Enciclopedista',
      100: 'Omnisciente',
    },
  };

  collectibles = {
    diary_entries: 50,
    letters: 30,
    photos: 20,

    diary_1: {
      author: 'Vovó Original',
      date: 'Year -3000',
      text: `Hoje fritei minha milésima coxinha. Ainda não sei
        por que não envelheço. Será esta a maldição do Templo?`,
    },

    letter_1: {
      from: 'Dr. Microondas',
      to: 'Player',
      date: 'Current',
      text: `Você não entende. Frituras mataram minha família.
        Vou acabar com isso, custe o que custar.`,
    },
  };

  endings = {
    true_ending: {
      name: 'Transcendência',
      requirement: 'Todas conquistas + Prestige 1000',
      description: 'Você SE TORNA a Coxinha Primordial',
    },

    bad_ending: {
      name: 'Apocalipse',
      requirement: 'Destruir 1000 prédios',
      description: 'Mundo sem coxinhas. Civilização colapsa.',
    },

    neutral_ending: {
      name: 'Aposentadoria',
      requirement: 'Vender império',
      description: 'Você se aposenta rico mas vazio',
    },

    secret_ending: {
      name: 'Loop Quebrado',
      requirement: 'Descobrir todos mistérios',
      description: 'Você escapa do ciclo temporal',
    },

    comedy_ending: {
      name: 'Meme Eterno',
      requirement: 'Viralizar 100x',
      description: 'Você vira meme imortal da internet',
    },
  };
}

// ================== CIRCUS SYSTEM ==================
export class CircusSystem {
  circus = {
    name: 'Cirque da Coxinha',
    reputation: 0,
    safety_rating: 100,
    animals: [] as any[],
    performers: [] as any[],
    tents: 1,
  };

  acts = {
    trapeze: {
      name: 'Trapézio Voador',
      difficulty: 8,
      danger: 7,
      performers_needed: 3,
      training_time: 5184000000,
      equipment_cost: 50000,
      audience_appeal: 9,
      signature_move: 'Triple Somersault',
    },

    tightrope: {
      name: 'Corda Bamba',
      difficulty: 9,
      danger: 9,
      performers_needed: 1,
      training_time: 7776000000,
      equipment_cost: 20000,
      audience_appeal: 8,
      signature_move: 'Blindfolded Walk',
    },

    juggling: {
      name: 'Malabarismo Extremo',
      difficulty: 6,
      danger: 3,
      performers_needed: 1,
      training_time: 2592000000,
      equipment_cost: 5000,
      audience_appeal: 6,
      objects: ['torches', 'knives', 'chainsaws', 'coxinhas'],
    },

    clown: {
      name: 'Palhaçada',
      difficulty: 5,
      danger: 1,
      performers_needed: 4,
      training_time: 1209600000,
      equipment_cost: 2000,
      audience_appeal: 7,
      comedy_types: ['slapstick', 'wordplay', 'pranks'],
    },

    strongman: {
      name: 'Homem Forte',
      difficulty: 4,
      danger: 5,
      performers_needed: 1,
      training_time: 3888000000,
      equipment_cost: 10000,
      audience_appeal: 6,
      feats: ['lift_car', 'break_chains', 'bend_steel'],
    },

    fire_breathing: {
      name: 'Cuspidor de Fogo',
      difficulty: 7,
      danger: 10,
      performers_needed: 1,
      training_time: 4320000000,
      equipment_cost: 15000,
      audience_appeal: 9,
      insurance_required: true,
    },

    contortionist: {
      name: 'Contorcionista',
      difficulty: 8,
      danger: 4,
      performers_needed: 1,
      training_time: 6048000000,
      equipment_cost: 3000,
      audience_appeal: 7,
      flexibility_required: 100,
    },

    animal_taming: {
      name: 'Domador de Animais',
      difficulty: 10,
      danger: 10,
      performers_needed: 1,
      animals_needed: 5,
      training_time: 15552000000,
      equipment_cost: 100000,
      audience_appeal: 10,
      animals: ['lions', 'tigers', 'elephants', 'bears'],
      ethical_concerns: true,
      banned_in: ['many_countries'],
    },

    knife_throwing: {
      name: 'Arremesso de Facas',
      difficulty: 9,
      danger: 8,
      performers_needed: 2,
      training_time: 5184000000,
      equipment_cost: 8000,
      audience_appeal: 8,
      accidents: 'sometimes',
    },

    aerial_silks: {
      name: 'Tecido Acrobático',
      difficulty: 8,
      danger: 6,
      performers_needed: 2,
      training_time: 4320000000,
      equipment_cost: 25000,
      audience_appeal: 9,
      graceful: true,
    },
  };

  performers = {
    traits: ['strength', 'agility', 'charisma', 'courage', 'showmanship'],

    hire() {
      return {
        name: this.generateName(),
        age: 18 + Math.random() * 30,
        specialty: this.randomAct(),
        skill: Math.random() * 100,
        salary: 1000 + Math.random() * 10000,
        fear: Math.random() * 100,
        injuries: 0,
        fame: 0,
      };
    },

    accidents: [
      { type: 'Minor', recovery: 7, probability: 0.1 },
      { type: 'Major', recovery: 30, probability: 0.01 },
      { type: 'Career-Ending', recovery: Infinity, probability: 0.001 },
      { type: 'Fatal', recovery: 'death', probability: 0.0001 },
    ],

    insurance: {
      basic: { cost: 1000, coverage: 10000 },
      premium: { cost: 5000, coverage: 100000 },
      full: { cost: 20000, coverage: 1000000 },
    },

    generateName() {
      return 'Performer ' + Math.floor(Math.random() * 10000);
    },

    randomAct() {
      const actKeys = Object.keys(this.acts);
      return actKeys[Math.floor(Math.random() * actKeys.length)];
    },
  };

  animals = {
    lion: {
      cost: 100000,
      upkeep: 1000,
      danger: 10,
      appeal: 10,
      training: 'extreme',
      lifespan: 15,
      legal: 'restricted',
    },

    elephant: {
      cost: 200000,
      upkeep: 2000,
      danger: 7,
      appeal: 9,
      training: 'difficult',
      lifespan: 60,
      ethical_debate: true,
    },

    horse: {
      cost: 10000,
      upkeep: 200,
      danger: 3,
      appeal: 6,
      training: 'medium',
      lifespan: 25,
      versatile: true,
    },

    dog: {
      cost: 1000,
      upkeep: 50,
      danger: 1,
      appeal: 7,
      training: 'easy',
      lifespan: 12,
      tricks: ['jump', 'balance', 'comedy'],
    },
  };

  venues = {
    small_tent: {
      capacity: 500,
      cost: 50000,
      setup_time: 86400000,
      transport: 'easy',
    },

    medium_tent: {
      capacity: 2000,
      cost: 200000,
      setup_time: 172800000,
      transport: 'medium',
    },

    big_top: {
      capacity: 5000,
      cost: 1000000,
      setup_time: 604800000,
      transport: 'difficult',
      iconic: true,
    },

    arena: {
      capacity: 20000,
      cost: 10000000,
      setup_time: 2592000000,
      transport: 'impossible',
      permanent: true,
    },
  };

  shows = {
    matinee: {
      time: '14:00',
      audience: 'families',
      ticket_price: 50,
      tone: 'family_friendly',
    },

    evening: {
      time: '19:00',
      audience: 'general',
      ticket_price: 100,
      tone: 'spectacular',
    },

    midnight: {
      time: '00:00',
      audience: 'adults',
      ticket_price: 200,
      tone: 'dark_mysterious',
      special: true,
    },
  };

  disasters = [
    {
      name: 'Tent Collapse',
      probability: 0.01,
      casualties: 'possible',
      financial_loss: 500000,
      reputation: -50000,
      preventable: 'maintenance',
    },

    {
      name: 'Animal Escape',
      probability: 0.05,
      casualties: 'likely',
      financial_loss: 100000,
      reputation: -25000,
      preventable: 'better_cages',
    },

    {
      name: 'Fire',
      probability: 0.02,
      casualties: 'very_likely',
      financial_loss: 1000000,
      reputation: -100000,
      preventable: 'fire_safety',
    },

    {
      name: 'Performer Strike',
      probability: 0.1,
      casualties: 0,
      financial_loss: 50000,
      reputation: -10000,
      preventable: 'better_wages',
    },
  ];

  tour = {
    cities: 50,
    countries: 20,
    duration: 31536000000,

    logistics: {
      transport: ['trucks', 'trains', 'ships'],
      crew: 100,
      accommodation: 'trailers',
      permits: 'required_each_city',
    },

    challenges: [
      'Weather delays',
      'Customs issues',
      'Local regulations',
      'Cultural differences',
      'Homesickness',
    ],
  };
}

// ================== EXPORTS ==================
export const EntertainmentSystems = {
  theater: new TheaterSystem(),
  lore: new LoreSystem(),
  circus: new CircusSystem(),
};
