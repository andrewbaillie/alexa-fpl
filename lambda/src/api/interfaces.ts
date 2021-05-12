export interface TeamData {
  id: number;
  name: string;
  shortName: string;
  strength: number;
}

export interface PlayerData {
  id: number;
  name: string;
  gameweekPoints: number;
}

export interface GameWeekData {
  id: number;
  name: string;
  average: number;
  isCurrent: boolean;
  isPrevious: boolean;
  isNext: boolean;
  isFinished: boolean;
  mostSelected: number;
  mostTransferredIn: number;
  mostCaptained: number;
}

export interface BootstrapData {
  teams: TeamData[];
  players: PlayerData[];
  totalPlayers: number;
  gameweeks: GameWeekData[];
}

export interface UserBasicInfo {
  firstName: string;
  lastName: string;
  overallPoints: number;
  overallRank: number;
  gameweekPoints: number;
  gameweekRank: number;
  teamName: string;
  currentEvent: number;
}

export interface LeagueStanding {
  id: number;
  gameweekPoints: number;
  rank: number;
  lastRank: number;
  total: number;
  teamName: string;
  playerName: string;
  playerId: number;
}

export interface LeagueInfo {
  id: number;
  name: string;
  standings: LeagueStanding[];
}
