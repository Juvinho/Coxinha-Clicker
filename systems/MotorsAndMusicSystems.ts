// 🏎️ RACING SYSTEM - Speed Demons (75 Funcionalidades)
class RacingSystem {
  garage: any[] = [];
  tracks: any[] = [];
  championships: any[] = [];
  drivers: any[] = [];
  sponsors: any[] = [];

  // Veículos (10 Tiers)
  vehicles = {
    go_kart: {
      name: 'Kart Coxinha',
      cost: 5000,
      top_speed: 80,
      acceleration: 7,
      handling: 9,
      durability: 6,
      class: 'Kart',
      fuel_capacity: 10,
      customizable: true
    },
    street_racer: {
      name: 'Civic Turbinado',
      cost: 50000,
      top_speed: 200,
      acceleration: 8,
      handling: 7,
      durability: 5,
      class: 'Street',
      nos: true,
      illegal: 'street_racing'
    },
    sports_car: {
      name: 'Porsche 911',
      cost: 500000,
      top_speed: 300,
      acceleration: 9,
      handling: 8,
      durability: 7,
      class: 'Sport',
      prestige: 1000
    },
    supercar: {
      name: 'Lamborghini Aventador',
      cost: 2000000,
      top_speed: 350,
      acceleration: 10,
      handling: 7,
      durability: 6,
      class: 'Super',
      prestige: 10000,
      heads_turn: true
    },
    hypercar: {
      name: 'Bugatti Chiron',
      cost: 10000000,
      top_speed: 420,
      acceleration: 10,
      handling: 6,
      durability: 7,
      class: 'Hyper',
      prestige: 100000,
      exclusive: true
    },
    f1_car: {
      name: 'Red Bull RB19',
      cost: 50000000,
      top_speed: 360,
      acceleration: 10,
      handling: 10,
      durability: 4,
      class: 'Formula',
      downforce: 10,
      drs: true,
      kers: true,
      professional_only: true
    },
    prototype: {
      name: 'Le Mans Prototype',
      cost: 100000000,
      top_speed: 380,
      acceleration: 9,
      handling: 9,
      durability: 8,
      class: 'Prototype',
      endurance: true,
      hybrid: true
    },
    concept_car: {
      name: 'Vision GT',
      cost: 500000000,
      top_speed: 500,
      acceleration: 10,
      handling: 10,
      durability: 5,
      class: 'Concept',
      future_tech: true,
      unique: true
    },
    hover_car: {
      name: 'Anti-Grav Racer',
      cost: 5000000000,
      top_speed: 1000,
      acceleration: 10,
      handling: 10,
      durability: 9,
      class: 'Hover',
      flies: true,
      no_wheels: true
    },
    warp_racer: {
      name: 'Photon Speedster',
      cost: 100000000000,
      top_speed: 299792,
      acceleration: 10,
      handling: 10,
      durability: 10,
      class: 'Warp',
      ftl_capable: true,
      breaks_physics: true
    }
  };

  // Customização (5 Categorias)
  customization = {
    visual: {
      paint: { solid: { cost: 1000, colors: 50 }, metallic: { cost: 5000, colors: 100 }, chrome: { cost: 20000, shine: 'blinding' }, chameleon: { cost: 100000, changes_color: true }, glow: { cost: 500000, neon: true } },
      decals: { stripes: { cost: 500 }, flames: { cost: 2000 }, tribal: { cost: 3000 }, sponsors: { cost: 0, earn_money: true }, custom_livery: { cost: 50000, upload_image: true } },
      body_kit: { spoiler: { cost: 5000, downforce: 2 }, diffuser: { cost: 10000, downforce: 3 }, splitter: { cost: 8000, downforce: 2 }, wide_body: { cost: 50000, handling: 1, aesthetic: 'aggressive' } },
      wheels: { stock: { cost: 0 }, alloy: { cost: 2000, weight: -10 }, carbon: { cost: 20000, weight: -50 }, spinners: { cost: 5000, style: 100 } },
      lights: { xenon: { cost: 1000, brightness: 50 }, led: { cost: 3000, brightness: 100 }, underglow: { cost: 5000, style: 'street' }, laser: { cost: 50000, brightness: 500 } }
    },
    performance: {
      engine: { tune: { cost: 5000, hp: 20 }, turbo: { cost: 20000, hp: 50, acceleration: 1 }, supercharger: { cost: 50000, hp: 100 }, nos: { cost: 30000, boost: '50% 5s', cooldown: 30000 }, swap: { cost: 100000, hp: 200, acceleration: 2 } },
      transmission: { sport: { cost: 10000, acceleration: 1 }, race: { cost: 30000, acceleration: 2 }, sequential: { cost: 100000, shift_speed: 'instant' } },
      suspension: { lowered: { cost: 5000, handling: 1, aesthetic: 'stance' }, sport: { cost: 15000, handling: 2 }, race: { cost: 50000, handling: 3 }, active: { cost: 200000, handling: 5, adaptive: true } },
      brakes: { sport: { cost: 8000, braking: 20 }, ceramic: { cost: 30000, braking: 50, fade: 'none' }, carbon: { cost: 100000, braking: 100 } },
      tires: { street: { cost: 1000, grip: 6 }, sport: { cost: 5000, grip: 7 }, slick: { cost: 20000, grip: 10, rain: 0 }, all_weather: { cost: 8000, grip: 7, rain: 7 } },
      aero: { front_splitter: { cost: 10000, downforce: 2 }, rear_wing: { cost: 15000, downforce: 3 }, full_kit: { cost: 100000, downforce: 10 }, active_aero: { cost: 500000, adaptive: true } },
      weight_reduction: { remove_interior: { cost: 0, weight: -100, comfort: -10 }, carbon_panels: { cost: 50000, weight: -200 }, gutted: { cost: 0, weight: -500, illegal_street: true } }
    },
    tech: {
      telemetry: { cost: 50000, real_time_data: true },
      traction_control: { cost: 30000, safety: 5 },
      abs: { cost: 20000, braking: 3 },
      stability_control: { cost: 25000, handling: 2 },
      launch_control: { cost: 40000, launch_improved: true },
      pit_limiter: { cost: 10000, professional: true }
    }
  };

  // Pistas (9 Pistas)
  tracks = {
    street_circuit: { name: 'Avenida Paulista GP', location: 'São Paulo', length: 5.2, turns: 15, difficulty: 7, lap_record: 72.5 },
    spa: { name: 'Spa-Francorchamps', location: 'Bélgica', length: 7.0, turns: 19, difficulty: 9, lap_record: 103.8 },
    monza: { name: 'Autodromo Monza', location: 'Itália', length: 5.8, turns: 11, difficulty: 6, lap_record: 81.0 },
    nurburgring_nordschleife: { name: 'Nürburgring Nordschleife', location: 'Alemanha', length: 20.8, turns: 154, difficulty: 10, lap_record: 383.0 },
    daytona: { name: 'Daytona Speedway', location: 'EUA', length: 4.0, turns: 4, banking: 31, difficulty: 5, top_speed: 340 },
    dakar_stage: { name: 'Rali Dakar Stage 5', location: 'Saara', length: 500, difficulty: 10, duration: 8, navigation: true },
    rainbow_road: { name: 'Rainbow Road', location: 'Space', length: 10.0, turns: 25, difficulty: 10, gravity: 0.5, fictional: true },
    neo_tokyo: { name: 'Neo Tokyo Skyway', location: 'Japão 2077', length: 8.5, turns: 30, difficulty: 9, hover_only: true },
    mobius_strip: { name: 'Mobius Strip Circuit', location: 'Dimensão 4', length: '∞', difficulty: '???', paradox: true }
  };

  // Modos de Corrida (10 Modos)
  race_modes = {
    sprint: { laps: 3, duration: 'short', intensity: 'high', strategy: 'aggressive' },
    grand_prix: { laps: 50, duration: '1-2h', pit_stops: 2, tire_strategy: true },
    endurance: { duration: 24, drivers: 3, pit_stops: 30, night_driving: true },
    time_attack: { laps: 1, mode: 'solo', objective: 'fastest_lap', leaderboard: true },
    drift: { objective: 'points', scoring: 'angle+speed+line', judges: 3 },
    drag: { distance: 402, duration: '8-12s', perfect_launch: true, shifting: 'critical' },
    rally: { surface: 'mixed', co_driver: true, pace_notes: true, stages: 12 },
    battle: { players: 12, weapons: true, power_ups: ['boost', 'shield', 'missile'] },
    elimination: { interval: 30, eliminates: 'last_place', pressure: 'extreme' },
    pursuit: { cops: 5, heat_level: 1, escape: 'objective', illegal: true }
  };

  // Physics (5 Sistemas)
  physics = {
    traction_circle: true,
    tire_temperature: { cold: { grip: 0.5 }, optimal: { grip: 1.0, range: '80-100°C' }, overheating: { grip: 0.7 } },
    aerodynamics: { drag: true, downforce: true, slipstream: { speed_boost: 0.1 }, dirty_air: { downforce_loss: 0.3 } },
    suspension: { weight_transfer: true, body_roll: true, bottoming_out: true },
    damage: { visual: true, mechanical: true, aerodynamic: true, cumulative: true }
  };

  // Carreira (6 Níveis + Rivais)
  career = {
    levels: [
      { level: 1, title: 'Rookie', races: 10 },
      { level: 10, title: 'Amateur', races: 50 },
      { level: 25, title: 'Semi-Pro', races: 100 },
      { level: 50, title: 'Professional', races: 250 },
      { level: 75, title: 'Champion', races: 500 },
      { level: 100, title: 'Legend', races: 1000 }
    ],
    championships: {
      regional: { races: 10, prize: 100000, prestige: 1000 },
      national: { races: 20, prize: 1000000, prestige: 10000 },
      international: { races: 25, prize: 10000000, prestige: 100000 },
      world_championship: { races: 22, prize: 100000000, prestige: 1000000 },
      legends_series: { races: 10, prize: 1000000000, prestige: 10000000, invitation_only: true }
    },
    rivals: [
      { name: 'Ayrton da Silva', skill: 95, aggression: 8, personality: 'fierce_competitor' },
      { name: 'Lewis Oliveira', skill: 98, aggression: 5, personality: 'strategic_genius' },
      { name: 'Max Verstappen Clone', skill: 99, aggression: 10, personality: 'aggressive_young_talent' }
    ]
  };

  // Patrocinadores (4 Tiers)
  sponsors = {
    tier_1: { name: 'Coxinha Energy Drink', payment: 10000, bonuses: { win: 50000 } },
    tier_2: { name: 'Petrobras', payment: 100000, bonuses: { win: 500000 }, fuel_discount: 0.5 },
    tier_3: { name: 'Red Bull', payment: 1000000, bonuses: { win: 5000000 }, team_support: true },
    personal: { helmet: 50000, gloves: 10000, suit: 100000, watch: 500000 }
  };

  // Team (4 Departamentos)
  team = {
    mechanics: { count: 20, skill: 5, salary: 5000 },
    engineers: { count: 5, skill: 5, salary: 10000 },
    manager: { skill: 5, salary: 50000 },
    facilities: { garage: { level: 1, capacity: 5 }, workshop: { level: 1 }, simulator: { level: 0 }, wind_tunnel: { level: 0 } }
  };

  // Multiplayer (4 Modos)
  multiplayer = {
    modes: ['casual', 'ranked', 'tournaments', 'leagues'],
    ranked: { divisions: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master', 'Grandmaster'], rating: 1000 },
    clubs: { max_members: 50, team_races: true, shared_garage: true },
    esports: { tournaments: true, prize_pool: 1000000, broadcasts: true }
  };

  // Achievements (9 Conquistas)
  achievements = {
    speed_demon: 'Alcance 400 km/h',
    perfect_lap: 'Volta perfeita sem erros',
    comeback_king: 'Vença partindo do último',
    clean_racer: 'Vença sem colisões',
    dirty_driver: 'Cause 100 colisões',
    champion: 'Vença campeonato',
    legend: 'Vença 100 corridas',
    immortal: '1000 vitórias',
    speed_of_light: 'Alcance velocidade da luz'
  };

  buyCar(vehicleKey: string) {
    const vehicle = (this.vehicles as any)[vehicleKey];
    if (vehicle) {
      this.garage.push({ ...vehicle, id: Date.now(), condition: 100 });
      return vehicle;
    }
  }

  race(trackKey: string, modeKey: string, carId: number) {
    const track = (this.tracks as any)[trackKey];
    const mode = (this.race_modes as any)[modeKey];
    if (track && mode) {
      return { track, mode, carId, finished_at: Date.now() };
    }
  }

  customizeCar(carId: number, customization: any) {
    const car = this.garage.find(c => c.id === carId);
    if (car) {
      Object.assign(car, customization);
      return car;
    }
  }

  joinChampionship(championshipKey: string) {
    const championship = (this.career.championships as any)[championshipKey];
    if (championship) {
      this.championships.push({ ...championship, started: Date.now(), position: 0 });
      return championship;
    }
  }

  hireMechanic() {
    this.team.mechanics.count++;
    return { success: true, new_count: this.team.mechanics.count };
  }

  createTeam() {
    return { name: 'Team Coxinha Racing', founded: Date.now(), members: 50 };
  }
}

// 🎸 BAND MANAGER - Rock Empire (80 Funcionalidades)
class BandSystem {
  band = {
    name: 'Coxinha & The Deep Fryers',
    genre: 'rock',
    members: [] as any[],
    fame: 0,
    albums: [] as any[],
    tours: [] as any[]
  };

  // Membros da Banda (6 Membros)
  members = {
    vocalist: {
      role: 'Vocalista',
      attributes: { vocal_range: 0, pitch: 0, charisma: 0, stage_presence: 0, lyric_writing: 0 },
      equipment: ['microphone', 'effects_pedal'],
      salary: 10000,
      ego: 50
    },
    lead_guitar: {
      role: 'Guitarrista Lead',
      attributes: { technical_skill: 0, speed: 0, creativity: 0, tone: 0, improvisation: 0 },
      equipment: ['guitar', 'amp', 'pedals'],
      signature_move: 'guitar_solo',
      salary: 8000
    },
    rhythm_guitar: {
      role: 'Guitarrista Base',
      attributes: { rhythm: 0, consistency: 0, backing_vocals: 0 },
      equipment: ['guitar', 'amp'],
      salary: 6000
    },
    bass: {
      role: 'Baixista',
      attributes: { groove: 0, timing: 0, stage_presence: 0 },
      equipment: ['bass', 'amp'],
      underrated: true,
      salary: 6000
    },
    drums: {
      role: 'Baterista',
      attributes: { timing: 0, power: 0, endurance: 0, independence: 0 },
      equipment: ['drum_kit'],
      physical_demands: 'extreme',
      salary: 7000
    },
    keyboard: {
      role: 'Tecladista',
      attributes: { versatility: 0, composition: 0 },
      equipment: ['keyboard', 'synthesizer'],
      optional: true,
      salary: 5000
    }
  };

  // Gêneros (8 Gêneros)
  genres = {
    rock: { instruments: ['guitar', 'bass', 'drums'], tempo: 'medium-fast', audience: 'broad' },
    metal: { instruments: ['dual_guitars', 'bass', 'drums'], tempo: 'fast', technical: true },
    pop: { instruments: ['vocals', 'synthesizer'], catchy: true, commercial: true },
    jazz: { instruments: ['saxophone', 'piano', 'bass', 'drums'], improvisation: true },
    electronic: { instruments: ['computer', 'synthesizer'], live_performance: 'challenging' },
    country: { instruments: ['acoustic_guitar', 'fiddle'], storytelling: true },
    hip_hop: { instruments: ['turntables', 'sampler', 'mic'], lyrics: 'critical' },
    classical: { instruments: ['orchestra'], complexity: 'extreme', timeless: true }
  };

  // Composição (5 Processos)
  songwriting = {
    process: {
      inspiration: { sources: ['life_experience', 'jam_session', 'dreams', 'random'], roll: Math.random() },
      composition: { structure: ['intro', 'verse', 'chorus', 'bridge', 'outro'], time: 7200000 },
      arrangement: { instruments: 'assign_parts', dynamics: true, effects: true, time: 3600000 },
      recording: { takes: 'multiple', mixing: true, mastering: true, time: 86400000, cost: 5000 },
      promotion: { channels: ['radio', 'tv', 'social_media'], hype_builds: true }
    },
    song_quality: {
      factors: ['melody_catchiness', 'lyric_depth', 'production_quality', 'originality', 'emotional_impact'],
      hits: { 90: 'Chart-topper', 80: 'Hit potencial', 70: 'Boa música', 60: 'Mediana', 50: 'Filler' }
    }
  };

  // Álbuns (5 Tipos)
  albums = {
    ep: { songs: 4, production_time: 2592000000, cost: 50000, sales_potential: 'limited' },
    lp: { songs: 12, production_time: 7776000000, cost: 200000, sales_potential: 'high' },
    double_album: { songs: 24, production_time: 15552000000, cost: 500000, sales_potential: 'legendary' },
    live_album: { songs: 15, recorded: 'concert', cost: 100000, authenticity: 'high' },
    compilation: { songs: 20, type: 'greatest_hits', cost: 50000, lazy: true }
  };

  // Release Strategy (3 Canais)
  release_strategy = {
    physical: {
      cd: { cost: 2, price: 15, margin: 13 },
      vinyl: { cost: 10, price: 30, hipster_appeal: true },
      cassette: { cost: 1, price: 10, retro: true }
    },
    digital: {
      streaming: { revenue_per_stream: 0.003 },
      download: { price: 10, piracy_risk: 'high' }
    },
    marketing: { budget: 'variable', channels: ['radio', 'tv', 'social_media'], hype: 'builds_over_time' }
  };

  // Críticos (4 Fontes)
  critical_reception = {
    factors: ['originality', 'execution', 'cohesion', 'innovation'],
    reviews: {
      pitchfork: { weight: 80, pretentious: true },
      rolling_stone: { weight: 100, legendary: true },
      nme: { weight: 70, british: true },
      metacritic: { weight: 90, aggregator: true }
    },
    scores: { 90: '10/10', 80: '8/10', 70: '7/10', 60: '6/10', 50: '5/10', 0: '0/10' }
  };

  // Venues (6 Tipos)
  venues = {
    bar: { capacity: 100, payment: 500, exposure: 'local' },
    club: { capacity: 500, payment: 5000, exposure: 'city' },
    theater: { capacity: 2000, payment: 50000, exposure: 'regional', seated: true },
    arena: { capacity: 10000, payment: 500000, exposure: 'national' },
    stadium: { capacity: 50000, payment: 5000000, exposure: 'international', legendary: true },
    festival: { capacity: 100000, payment: 10000000, exposure: 'global', headliner: true }
  };

  // Tour Types (4 Tipos)
  tour_types = {
    local: { cities: 5, duration: 604800000, cost: 10000 },
    regional: { cities: 20, duration: 2592000000, cost: 100000 },
    national: { cities: 50, duration: 7776000000, cost: 1000000 },
    world_tour: { cities: 100, continents: 6, duration: 31536000000, cost: 10000000, legendary: true }
  };

  // Setlist (7 Elementos)
  setlist = {
    songs: 20,
    duration: 7200000,
    encore: 3,
    flow: ['opening_banger', 'hits', 'new_material', 'slow_ballad', 'crowd_favorite', 'encore', 'closing_anthem']
  };

  // Performance Factors (5 Fatores)
  performance_factors = {
    energy: 'stamina_dependent',
    crowd_interaction: 'charisma',
    technical_execution: 'skill',
    stage_presence: 'showmanship',
    incidents: [
      { event: 'String Break', probability: 0.1, impact: 'minor' },
      { event: 'Vocal Strain', probability: 0.05, impact: 'moderate' },
      { event: 'Equipment Failure', probability: 0.02, impact: 'major' },
      { event: 'Stage Dive Gone Wrong', probability: 0.01, impact: 'injury' },
      { event: 'Riot', probability: 0.001, impact: 'catastrophic' }
    ]
  };

  // Record Labels (3 Opções)
  record_labels = {
    independent: { advance: 10000, royalties: 0.5, creative_control: true, marketing: 'minimal' },
    major: { advance: 1000000, royalties: 0.15, creative_control: 'limited', marketing: 'massive' },
    self_released: { advance: 0, royalties: 1.0, creative_control: 'absolute', marketing: 'DIY' }
  };

  // Streaming Services (4 Plataformas)
  streaming_services = {
    spotify: { users: 400000000, payout: 0.003 },
    apple_music: { users: 100000000, payout: 0.007 },
    youtube: { users: 2000000000, payout: 0.001 },
    tidal: { users: 3000000, payout: 0.013, audiophile: true }
  };

  // Awards (3 Tipos)
  awards = {
    grammy: { categories: 84, prestige: 100000, political: true },
    vma: { categories: 15, prestige: 50000, spectacle: true },
    hall_of_fame: { requirement: '25_years', prestige: 1000000, immortality: true }
  };

  // Band Chemistry (Conflitos + Breakup)
  band_chemistry = {
    harmony: 100,
    conflicts: [
      { issue: 'Creative Differences', probability: 0.1, impact: -20 },
      { issue: 'Ego Clash', probability: 0.15, impact: -30 },
      { issue: 'Drug Abuse', probability: 0.05, impact: -50 },
      { issue: 'Romantic Drama', probability: 0.08, impact: -25 },
      { issue: 'Financial Dispute', probability: 0.12, impact: -40 }
    ],
    breakup: { probability: 'increases_over_time', reunion_tour: { years_later: 10, money: 'massive' } }
  };

  // Fame Levels (6 Níveis)
  fame = {
    levels: [
      { level: 1, title: 'Local Heroes', fans: 1000 },
      { level: 10, title: 'Underground Legends', fans: 10000 },
      { level: 25, title: 'Rising Stars', fans: 100000 },
      { level: 50, title: 'Mainstream Success', fans: 1000000 },
      { level: 75, title: 'Superstars', fans: 10000000 },
      { level: 100, title: 'Icons', fans: 100000000 }
    ],
    perks: ['free_stuff', 'vip_access', 'groupies', 'parties', 'influence'],
    downsides: ['paparazzi', 'no_privacy', 'fake_friends', 'pressure', 'burnout'],
    scandals: [
      { type: 'Sex Tape', fame_impact: 'varies', career_impact: 'unpredictable' },
      { type: 'Drug Arrest', fame_impact: -50000, career_impact: 'temporary' },
      { type: 'Controversial Statement', fame_impact: 'polarizing', cancel_risk: true },
      { type: 'Affair', fame_impact: -25000, personal_impact: 'devastating' }
    ]
  };

  // Legacy (5 Fatores)
  legacy = {
    factors: ['albums_sold', 'influence_on_genre', 'innovation', 'live_performances', 'cultural_impact'],
    hall_of_fame: { requirement: { career_length: 25, albums_sold: 10000000, influence: 'undeniable' } },
    tribute_bands: { formed: 'after_breakup', quality: 'variable', flattery: 'highest_form' },
    documentary: { behind_the_music: true, netflix_deal: 50000000, redemption_arc: true }
  };

  createBand(name: string, genre: string) {
    this.band = { name, genre, members: [], fame: 0, albums: [], tours: [] };
    return this.band;
  }

  recruitMember(memberKey: string) {
    const member = (this.members as any)[memberKey];
    if (member) {
      this.band.members.push({ ...member, hired_date: Date.now(), level: 1 });
      return member;
    }
  }

  composeAlbum(albumType: string, songs: number) {
    const album = (this.albums as any)[albumType];
    if (album) {
      const newAlbum = { ...album, songs, created: Date.now(), id: Date.now() };
      this.band.albums.push(newAlbum);
      return newAlbum;
    }
  }

  startTour(tourType: string) {
    const tour = (this.tour_types as any)[tourType];
    if (tour) {
      const newTour = { ...tour, started: Date.now(), id: Date.now(), current_city: 0 };
      this.band.tours.push(newTour);
      return newTour;
    }
  }

  signToLabel(labelType: string) {
    const label = (this.record_labels as any)[labelType];
    if (label) {
      return { label_type: labelType, ...label, signed_date: Date.now() };
    }
  }

  releaseAlbum(albumId: number, strategy: string) {
    const album = this.band.albums.find(a => a.id === albumId);
    if (album) {
      return { album, strategy, released: Date.now(), promotion_active: true };
    }
  }

  performConcert(venueType: string) {
    const venue = (this.venues as any)[venueType];
    if (venue) {
      return { venue, performance_date: Date.now(), attendance: venue.capacity, success: true };
    }
  }

  increaseHarmony(amount: number) {
    this.band_chemistry.harmony = Math.min(100, this.band_chemistry.harmony + amount);
    return this.band_chemistry.harmony;
  }

  decreaseHarmony(amount: number) {
    this.band_chemistry.harmony = Math.max(0, this.band_chemistry.harmony - amount);
    return this.band_chemistry.harmony;
  }

  checkBreakup() {
    if (this.band_chemistry.harmony < 20) {
      return { breakup: true, harmony_too_low: true, message: 'Banda se desfez!' };
    }
    return { breakup: false };
  }

  increaseFame(amount: number) {
    this.band.fame += amount;
    return this.band.fame;
  }
}

// Export dos Sistemas
export const MotorsAndMusicSystems = {
  RacingSystem: new RacingSystem(),
  BandSystem: new BandSystem()
};

export default MotorsAndMusicSystems;
