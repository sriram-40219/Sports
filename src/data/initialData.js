// Initial seed data for Sports League Management System (SLMS)
// Stored and managed in LocalStorage

export const INITIAL_USERS = [
  {
    id: "usr_admin",
    name: "League Administrator",
    email: "admin@sports.com",
    password: "admin123",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    phone: "+1 555-0199",
    createdAt: "2026-01-01"
  },
  {
    id: "usr_fan",
    name: "Alex Morgan",
    email: "fan@sports.com",
    password: "user123",
    role: "user",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    phone: "+1 555-0288",
    createdAt: "2026-01-15"
  }
];

export const INITIAL_LEAGUES = [
  {
    id: "league_1",
    name: "Premier Champions League",
    sport: "Football",
    country: "Global",
    season: "2026 Season",
    logo: "⚽",
    badgeColor: "#10b981",
    description: "The pinnacle tournament featuring top-tier football clubs competing across home and away fixtures.",
    teamsCount: 6,
    status: "Active"
  },
  {
    id: "league_2",
    name: "Super T20 Cricket League",
    sport: "Cricket",
    country: "International",
    season: "Spring 2026",
    logo: "🏏",
    badgeColor: "#3b82f6",
    description: "High-octane T20 cricket tournament with electric power plays, maximums, and fierce rivalries.",
    teamsCount: 4,
    status: "Active"
  },
  {
    id: "league_3",
    name: "Apex Basketball Championship",
    sport: "Basketball",
    country: "Americas",
    season: "2025-2026",
    logo: "🏀",
    badgeColor: "#f59e0b",
    description: "Fast-paced pro basketball league showcasing rim-rocking dunks, tactical defense, and clutch buzzer-beaters.",
    teamsCount: 4,
    status: "Active"
  }
];

export const INITIAL_TEAMS = [
  // Football Teams
  {
    id: "team_fb_1",
    leagueId: "league_1",
    name: "Thunder Hawks FC",
    shortName: "THK",
    sport: "Football",
    city: "Metro City",
    stadium: "Hawk Arena",
    capacity: 65000,
    coach: "Marco Silva",
    logo: "🦅",
    themeColor: "#2563eb",
    roster: [
      { id: "p1", name: "Gabriel Vance", number: 9, position: "Forward", goals: 18, assists: 7, matches: 14, rating: 8.9 },
      { id: "p2", name: "Lucas Sterling", number: 10, position: "Midfielder", goals: 8, assists: 14, matches: 14, rating: 8.6 },
      { id: "p3", name: "David Alcantara", number: 4, position: "Defender", goals: 2, assists: 3, matches: 13, rating: 7.9 },
      { id: "p4", name: "Hugo Martinez", number: 1, position: "Goalkeeper", cleanSheets: 7, saves: 42, matches: 14, rating: 8.1 }
    ]
  },
  {
    id: "team_fb_2",
    leagueId: "league_1",
    name: "Crimson Knights",
    shortName: "CRK",
    sport: "Football",
    city: "Valence",
    stadium: "St. Jude Stadium",
    capacity: 58000,
    coach: "Julian Ross",
    logo: "⚔️",
    themeColor: "#dc2626",
    roster: [
      { id: "p5", name: "Mateo Alvarez", number: 7, position: "Forward", goals: 15, assists: 5, matches: 14, rating: 8.4 },
      { id: "p6", name: "Ethan Cross", number: 8, position: "Midfielder", goals: 6, assists: 10, matches: 14, rating: 8.0 },
      { id: "p7", name: "Sami Khedir", number: 3, position: "Defender", goals: 1, assists: 2, matches: 14, rating: 7.8 },
      { id: "p8", name: "Oliver Kahn-Reid", number: 1, position: "Goalkeeper", cleanSheets: 5, saves: 48, matches: 14, rating: 7.9 }
    ]
  },
  {
    id: "team_fb_3",
    leagueId: "league_1",
    name: "Solar Phoenix",
    shortName: "PHX",
    sport: "Football",
    city: "Solaria",
    stadium: "Solarium Dome",
    capacity: 52000,
    coach: "Carlos Menendez",
    logo: "🔥",
    themeColor: "#f97316",
    roster: [
      { id: "p9", name: "Leo Santos", number: 11, position: "Forward", goals: 12, assists: 8, matches: 14, rating: 8.2 },
      { id: "p10", name: "Kevin Blair", number: 6, position: "Midfielder", goals: 4, assists: 9, matches: 13, rating: 7.7 }
    ]
  },
  {
    id: "team_fb_4",
    leagueId: "league_1",
    name: "Arctic Wolves",
    shortName: "WLV",
    sport: "Football",
    city: "Nordic Bay",
    stadium: "Glacier Park",
    capacity: 48000,
    coach: "Erik Thorvald",
    logo: "🐺",
    themeColor: "#0284c7",
    roster: [
      { id: "p11", name: "Jan Lindstrom", number: 10, position: "Forward", goals: 10, assists: 6, matches: 14, rating: 7.8 },
      { id: "p12", name: "Victor Lind", number: 5, position: "Defender", goals: 3, assists: 1, matches: 14, rating: 7.6 }
    ]
  },
  {
    id: "team_fb_5",
    leagueId: "league_1",
    name: "Emerald Titans",
    shortName: "TTN",
    sport: "Football",
    city: "Verdant Coast",
    stadium: "Titan Grounds",
    capacity: 50000,
    coach: "Gareth Rowe",
    logo: "🛡️",
    themeColor: "#059669",
    roster: [
      { id: "p13", name: "Darius Green", number: 9, position: "Forward", goals: 9, assists: 4, matches: 13, rating: 7.5 }
    ]
  },
  {
    id: "team_fb_6",
    leagueId: "league_1",
    name: "Iron City FC",
    shortName: "ICF",
    sport: "Football",
    city: "Forgeville",
    stadium: "The Foundry",
    capacity: 42000,
    coach: "Samuel Irons",
    logo: "⚙️",
    themeColor: "#64748b",
    roster: [
      { id: "p14", name: "Mason Steel", number: 8, position: "Midfielder", goals: 5, assists: 4, matches: 14, rating: 7.2 }
    ]
  },

  // Cricket Teams
  {
    id: "team_cr_1",
    leagueId: "league_2",
    name: "Royal Strikers",
    shortName: "RST",
    sport: "Cricket",
    city: "Bangalore",
    stadium: "Chinnaswamy Stadium",
    capacity: 40000,
    coach: "Anil Dravid",
    logo: "👑",
    themeColor: "#e11d48",
    roster: [
      { id: "pc1", name: "Virat Sharma", number: 18, position: "Top-order Batsman", runs: 580, wickets: 0, matches: 10, rating: 9.2 },
      { id: "pc2", name: "Rashid Patel", number: 24, position: "Leg Spinner", runs: 85, wickets: 19, matches: 10, rating: 8.8 }
    ]
  },
  {
    id: "team_cr_2",
    leagueId: "league_2",
    name: "Coastal Titans",
    shortName: "CTT",
    sport: "Cricket",
    city: "Mumbai",
    stadium: "Marine Drive Arena",
    capacity: 45000,
    coach: "Rohit Kumble",
    logo: "🌊",
    themeColor: "#2563eb",
    roster: [
      { id: "pc3", name: "Arjun Singhania", number: 45, position: "All-Rounder", runs: 420, wickets: 14, matches: 10, rating: 9.0 }
    ]
  },
  {
    id: "team_cr_3",
    leagueId: "league_2",
    name: "Desert Scorpions",
    shortName: "DSC",
    sport: "Cricket",
    city: "Dubai",
    stadium: "Oasis International Ground",
    capacity: 35000,
    coach: "Wasim Khan",
    logo: "🦂",
    themeColor: "#d97706",
    roster: [
      { id: "pc4", name: "Zaid Akhtar", number: 11, position: "Fast Bowler", runs: 30, wickets: 22, matches: 10, rating: 8.9 }
    ]
  },
  {
    id: "team_cr_4",
    leagueId: "league_2",
    name: "Bengal Tigers",
    shortName: "BTG",
    sport: "Cricket",
    city: "Kolkata",
    stadium: "Eden Park",
    capacity: 66000,
    coach: "Sourav Ray",
    logo: "🐯",
    themeColor: "#7c3aed",
    roster: [
      { id: "pc5", name: "Rishabh Sen", number: 7, position: "Wicketkeeper-Batsman", runs: 460, wickets: 0, matches: 10, rating: 8.7 }
    ]
  },

  // Basketball Teams
  {
    id: "team_bk_1",
    leagueId: "league_3",
    name: "Apex Vipers",
    shortName: "VIP",
    sport: "Basketball",
    city: "Chicago",
    stadium: "United Center Park",
    capacity: 22000,
    coach: "Phil Jackson Jr.",
    logo: "🐍",
    themeColor: "#16a34a",
    roster: [
      { id: "pb1", name: "Damian West", number: 0, position: "Point Guard", points: 380, assists: 112, rebounds: 45, matches: 12, rating: 9.1 }
    ]
  },
  {
    id: "team_bk_2",
    leagueId: "league_3",
    name: "Skyline Dunkers",
    shortName: "SKD",
    sport: "Basketball",
    city: "New York",
    stadium: "Empire Pavilion",
    capacity: 20000,
    coach: "Mike D'Antoni",
    logo: "🏙️",
    themeColor: "#0284c7",
    roster: [
      { id: "pb2", name: "Kobe Carter", number: 24, position: "Shooting Guard", points: 410, assists: 65, rebounds: 78, matches: 12, rating: 9.3 }
    ]
  },
  {
    id: "team_bk_3",
    leagueId: "league_3",
    name: "Golden Bulls",
    shortName: "GDB",
    sport: "Basketball",
    city: "Dallas",
    stadium: "Bulls Arena",
    capacity: 19500,
    coach: "Rick Carlisle",
    logo: "🐂",
    themeColor: "#b45309",
    roster: [
      { id: "pb3", name: "Luka Dončić-Miller", number: 77, position: "Forward", points: 395, assists: 130, rebounds: 115, matches: 12, rating: 9.4 }
    ]
  },
  {
    id: "team_bk_4",
    leagueId: "league_3",
    name: "Pacific Surge",
    shortName: "PSG",
    sport: "Basketball",
    city: "San Francisco",
    stadium: "Bay Arena",
    capacity: 18500,
    coach: "Steve Kerrigan",
    logo: "⚡",
    themeColor: "#eab308",
    roster: [
      { id: "pb4", name: "Stephen Curry-Stone", number: 30, position: "Point Guard", points: 430, assists: 95, rebounds: 52, matches: 12, rating: 9.5 }
    ]
  }
];

export const INITIAL_FIXTURES = [
  // Live Match
  {
    id: "fix_1",
    leagueId: "league_1",
    sport: "Football",
    homeTeamId: "team_fb_1",
    awayTeamId: "team_fb_2",
    homeScore: 2,
    awayScore: 1,
    date: "2026-10-05",
    time: "20:00",
    venue: "Hawk Arena, Metro City",
    status: "LIVE", // 'UPCOMING' | 'LIVE' | 'COMPLETED'
    minute: "68'",
    ticketPrice: 65,
    availableSeats: 1420,
    events: [
      { time: "14'", type: "goal", text: "⚽ GOAL! Gabriel Vance fires into the top corner (Thunder Hawks)" },
      { time: "32'", type: "yellow_card", text: "🟨 Yellow Card shown to Ethan Cross (Crimson Knights)" },
      { time: "44'", type: "goal", text: "⚽ GOAL! Mateo Alvarez taps in from close range (Crimson Knights)" },
      { time: "59'", type: "goal", text: "⚽ GOAL! Lucas Sterling curls a world-class freekick! (Thunder Hawks)" }
    ]
  },
  // Upcoming Matches
  {
    id: "fix_2",
    leagueId: "league_1",
    sport: "Football",
    homeTeamId: "team_fb_3",
    awayTeamId: "team_fb_4",
    homeScore: 0,
    awayScore: 0,
    date: "2026-10-07",
    time: "18:30",
    venue: "Solarium Dome, Solaria",
    status: "UPCOMING",
    minute: "0'",
    ticketPrice: 50,
    availableSeats: 3200,
    events: []
  },
  {
    id: "fix_3",
    leagueId: "league_1",
    sport: "Football",
    homeTeamId: "team_fb_5",
    awayTeamId: "team_fb_6",
    homeScore: 0,
    awayScore: 0,
    date: "2026-10-09",
    time: "19:00",
    venue: "Titan Grounds, Verdant Coast",
    status: "UPCOMING",
    minute: "0'",
    ticketPrice: 45,
    availableSeats: 4800,
    events: []
  },
  // Completed Match Football
  {
    id: "fix_4",
    leagueId: "league_1",
    sport: "Football",
    homeTeamId: "team_fb_2",
    awayTeamId: "team_fb_5",
    homeScore: 3,
    awayScore: 1,
    date: "2026-10-01",
    time: "19:30",
    venue: "St. Jude Stadium, Valence",
    status: "COMPLETED",
    minute: "FT",
    ticketPrice: 55,
    availableSeats: 0,
    events: [
      { time: "18'", type: "goal", text: "⚽ Mateo Alvarez header (Crimson Knights)" },
      { time: "52'", type: "goal", text: "⚽ Darius Green penalty (Emerald Titans)" },
      { time: "74'", type: "goal", text: "⚽ Ethan Cross long shot (Crimson Knights)" },
      { time: "89'", type: "goal", text: "⚽ Mateo Alvarez brace (Crimson Knights)" }
    ]
  },
  // Cricket Live Match
  {
    id: "fix_5",
    leagueId: "league_2",
    sport: "Cricket",
    homeTeamId: "team_cr_1",
    awayTeamId: "team_cr_2",
    homeScore: "184/4 (18.2)",
    awayScore: "179/7 (20.0)",
    date: "2026-10-05",
    time: "19:00",
    venue: "Chinnaswamy Stadium, Bangalore",
    status: "LIVE",
    minute: "Over 18.2",
    ticketPrice: 40,
    availableSeats: 850,
    events: [
      { time: "Ov 6.1", type: "boundary", text: "🏏 SIX! Virat Sharma lofts over long-off" },
      { time: "Ov 14.3", type: "wicket", text: "🎯 WICKET! Rashid Patel traps batsman LBW" },
      { time: "Ov 18.2", type: "boundary", text: "🏏 FOUR! Royal Strikers need 2 runs to win!" }
    ]
  },
  // Basketball Upcoming Match
  {
    id: "fix_6",
    leagueId: "league_3",
    sport: "Basketball",
    homeTeamId: "team_bk_4",
    awayTeamId: "team_bk_1",
    homeScore: 0,
    awayScore: 0,
    date: "2026-10-08",
    time: "21:00",
    venue: "Bay Arena, San Francisco",
    status: "UPCOMING",
    minute: "0'",
    ticketPrice: 85,
    availableSeats: 1200,
    events: []
  }
];

export const INITIAL_TICKETS = [
  {
    id: "tkt_101",
    userId: "usr_fan",
    userName: "Alex Morgan",
    userEmail: "fan@sports.com",
    fixtureId: "fix_1",
    matchTitle: "Thunder Hawks FC vs Crimson Knights",
    stadium: "Hawk Arena, Metro City",
    matchDate: "2026-10-05 20:00",
    tier: "VIP Grandstand",
    seats: ["B-12", "B-13"],
    quantity: 2,
    pricePerTicket: 65,
    totalAmount: 130,
    bookingDate: "2026-10-03",
    status: "CONFIRMED",
    qrCode: "SLMS-TKT-101-HAWK-2026"
  }
];

export const INITIAL_NEWS = [
  {
    id: "news_1",
    title: "Championship Derby: Hawks Clash with Crimson Knights in Thriller",
    category: "Match Preview",
    leagueId: "league_1",
    author: "Chief Sports Correspondent",
    date: "2026-10-04",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80",
    summary: "High stakes at Hawk Arena as top spot hangs in the balance. Gabriel Vance squares off with Mateo Alvarez in an explosive attacking showcase.",
    content: "The Premier Champions League arrives at a decisive juncture. With only three points separating the top two clubs, tonight's fixture promises record attendance, intense tactical battles, and electric atmosphere under the floodlights."
  },
  {
    id: "news_2",
    title: "Super T20 League: Record Ticket Sales Announced as Playoffs Near",
    category: "Tournament News",
    leagueId: "league_2",
    author: "Cricket Operations Desk",
    date: "2026-10-03",
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80",
    summary: "Over 180,000 tickets sold across four metro venues with digital QR ticketing integration providing seamless turnstile entry.",
    content: "The organizing committee announced unprecedented fan turnout this season. Fast bowlers are hitting the deck hard while fans enjoy modern amenities, interactive digital scoreboards, and instant mobile stadium passes."
  },
  {
    id: "news_3",
    title: "Transfer Window Spotlight: Mid-Season Roster Updates & MVP Rankings",
    category: "Analysis",
    leagueId: "league_3",
    author: "Analytics Team",
    date: "2026-10-02",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&auto=format&fit=crop&q=80",
    summary: "A deep dive into statistical efficiency ratings, defensive metrics, and clutch shooting leaders heading into the championship rounds.",
    content: "Our data analytics module tracks efficiency ratings across 3-point accuracy, offensive rebounds, and rim protection. Read the complete breakdown before tonight's tip-off."
  }
];

export const INITIAL_POLL = {
  id: "poll_active",
  question: "Who will claim the Premier Champions League Trophy this season?",
  leagueId: "league_1",
  options: [
    { id: "opt_1", text: "Thunder Hawks FC", votes: 428 },
    { id: "opt_2", text: "Crimson Knights", votes: 382 },
    { id: "opt_3", text: "Solar Phoenix", votes: 154 },
    { id: "opt_4", text: "Underdog Challenger", votes: 91 }
  ]
};

export const INITIAL_NOTIFICATIONS = [
  {
    id: "notif_1",
    title: "⚡ Match Kickoff Alert!",
    message: "Thunder Hawks FC vs Crimson Knights is currently LIVE at Hawk Arena.",
    time: "15 mins ago",
    read: false,
    type: "live"
  },
  {
    id: "notif_2",
    title: "🎟️ Ticket Confirmed",
    message: "Your e-ticket for VIP Grandstand (B-12, B-13) is ready. Show QR pass at Gate 4.",
    time: "2 days ago",
    read: true,
    type: "ticket"
  },
  {
    id: "notif_3",
    title: "📢 Fixture Rescheduled",
    message: "Solar Phoenix vs Arctic Wolves has been confirmed for Oct 7 at 18:30.",
    time: "3 days ago",
    read: true,
    type: "announcement"
  }
];
