
export enum GameMode {
  BLITZ = 'Blitz',
  RAPID = 'Rapid',
  CLASSICAL = 'Classical',
  BOT = 'Bot'
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedAt?: string;
  color: string;
}

export interface User {
  id: string;
  username: string;
  fullName?: string;
  age?: number;
  email: string;
  avatar?: string;
  elo: number;
  country: string;
  bio?: string;
  status: 'Online' | 'Offline' | 'Playing' | 'Searching';
  lastActive: string;
  isPremium: boolean;
  joinedAt: string;
  stats: {
    wins: number;
    losses: number;
    draws: number;
    bestWord: string;
    longestWord: string;
    totalGames: number;
  };
  achievements: Achievement[];
  friends: string[]; // friend IDs
}

export interface GameMove {
  player: string;
  word: string;
  points: number;
  timestamp: number;
}

export interface GameState {
  id: string;
  mode: GameMode;
  players: [User, User | any];
  moves: GameMove[];
  currentPlayerIndex: number;
  timers: [number, number];
  status: 'Waiting' | 'InProgress' | 'Finished';
  winner?: string;
  lastWord?: string;
}

export interface Tournament {
  id: string;
  title: string;
  startTime: string;
  participants: number;
  maxParticipants: number;
  prizePool: string;
  status: 'Registration' | 'Ongoing' | 'Finished';
  type: 'Swiss' | 'Knockout';
}
