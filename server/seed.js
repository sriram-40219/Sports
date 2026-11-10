import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import League from './models/League.js';
import Team from './models/Team.js';
import Fixture from './models/Fixture.js';
import Ticket from './models/Ticket.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/sports_league';

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB. Clearing old data...');

    await User.deleteMany();
    await League.deleteMany();
    await Team.deleteMany();
    await Fixture.deleteMany();
    await Ticket.deleteMany();

    console.log('Seeding demo accounts with bcrypt password hashing...');

    // 1. Create Users (User model pre-save will automatically hash passwords with bcrypt!)
    const adminUser = await User.create({
      name: 'League Administrator',
      email: 'admin@sports.com',
      password: 'admin123',
      role: 'admin',
      phone: '+1 555-0199',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    });

    const fanUser = await User.create({
      name: 'Alex Morgan',
      email: 'fan@sports.com',
      password: 'user123',
      role: 'user',
      phone: '+1 555-0288',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80'
    });

    // 2. Create Leagues
    console.log('Seeding leagues...');
    const league1 = await League.create({
      name: 'Premier Champions League',
      sport: 'Football',
      country: 'Global',
      season: '2026 Season',
      logo: '⚽',
      badgeColor: '#10b981',
      description: 'The pinnacle tournament featuring top-tier football clubs competing across home and away fixtures.',
      status: 'Active'
    });

    const league2 = await League.create({
      name: 'Super T20 Cricket League',
      sport: 'Cricket',
      country: 'International',
      season: 'Spring 2026',
      logo: '🏏',
      badgeColor: '#3b82f6',
      description: 'High-octane T20 cricket tournament with electric power plays, maximums, and fierce rivalries.',
      status: 'Active'
    });

    const league3 = await League.create({
      name: 'Apex Basketball Championship',
      sport: 'Basketball',
      country: 'Americas',
      season: '2025-2026',
      logo: '🏀',
      badgeColor: '#f59e0b',
      description: 'Fast-paced pro basketball league showcasing rim-rocking dunks, tactical defense, and clutch buzzer-beaters.',
      status: 'Active'
    });

    // 3. Create Teams
    console.log('Seeding teams and rosters...');
    const team1 = await Team.create({
      leagueId: league1._id,
      name: 'Thunder Hawks FC',
      shortName: 'THK',
      sport: 'Football',
      city: 'Metro City',
      stadium: 'Hawk Arena',
      capacity: 65000,
      coach: 'Marco Silva',
      logo: '🦅',
      themeColor: '#2563eb',
      roster: [
        { name: 'Gabriel Vance', number: 9, position: 'Forward', goals: 18, assists: 7, matches: 14, rating: 8.9 },
        { name: 'Lucas Sterling', number: 10, position: 'Midfielder', goals: 8, assists: 14, matches: 14, rating: 8.6 }
      ]
    });

    const team2 = await Team.create({
      leagueId: league1._id,
      name: 'Crimson Knights',
      shortName: 'CRK',
      sport: 'Football',
      city: 'Valence',
      stadium: 'St. Jude Stadium',
      capacity: 58000,
      coach: 'Julian Ross',
      logo: '⚔️',
      themeColor: '#dc2626',
      roster: [
        { name: 'Mateo Alvarez', number: 7, position: 'Forward', goals: 15, assists: 5, matches: 14, rating: 8.4 },
        { name: 'Ethan Cross', number: 8, position: 'Midfielder', goals: 6, assists: 10, matches: 14, rating: 8.0 }
      ]
    });

    const team3 = await Team.create({
      leagueId: league2._id,
      name: 'Royal Strikers',
      shortName: 'RST',
      sport: 'Cricket',
      city: 'Bangalore',
      stadium: 'Chinnaswamy Stadium',
      capacity: 40000,
      coach: 'Anil Dravid',
      logo: '👑',
      themeColor: '#e11d48',
      roster: [
        { name: 'Virat Sharma', number: 18, position: 'Top-order Batsman', runs: 580, matches: 10, rating: 9.2 }
      ]
    });

    const team4 = await Team.create({
      leagueId: league2._id,
      name: 'Coastal Titans',
      shortName: 'CTT',
      sport: 'Cricket',
      city: 'Mumbai',
      stadium: 'Marine Drive Arena',
      capacity: 45000,
      coach: 'Rohit Kumble',
      logo: '🌊',
      themeColor: '#2563eb',
      roster: [
        { name: 'Arjun Singhania', number: 45, position: 'All-Rounder', runs: 420, matches: 10, rating: 9.0 }
      ]
    });

    // 4. Create Fixtures
    console.log('Seeding fixtures...');
    const fixture1 = await Fixture.create({
      leagueId: league1._id,
      sport: 'Football',
      homeTeamId: team1._id,
      awayTeamId: team2._id,
      homeScore: 2,
      awayScore: 1,
      date: '2026-10-05',
      time: '20:00',
      venue: 'Hawk Arena, Metro City',
      status: 'LIVE',
      minute: "68'",
      ticketPrice: 65,
      availableSeats: 1420,
      events: [
        { time: "14'", type: 'goal', text: '⚽ GOAL! Gabriel Vance fires into the top corner' },
        { time: "44'", type: 'goal', text: '⚽ GOAL! Mateo Alvarez taps in from close range' },
        { time: "59'", type: 'goal', text: '⚽ GOAL! Lucas Sterling curls a world-class freekick!' }
      ]
    });

    // 5. Create Sample Ticket
    await Ticket.create({
      userId: fanUser._id,
      userName: fanUser.name,
      userEmail: fanUser.email,
      fixtureId: fixture1._id,
      matchTitle: `${team1.name} vs ${team2.name}`,
      stadium: fixture1.venue,
      matchDate: `${fixture1.date} ${fixture1.time}`,
      tier: 'VIP Grandstand',
      seats: ['B-12', 'B-13'],
      quantity: 2,
      pricePerTicket: 65,
      totalAmount: 130,
      status: 'CONFIRMED',
      qrCode: 'SLMS-TKT-101-HAWK-2026'
    });

    console.log('✅ MongoDB Database seeded successfully with demo data!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();
