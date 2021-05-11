export interface TeamData {
  id: number;
  name: string;
  shortName: string;
  strength: number;
}

export interface PlayerData {
  id: number;
  name: string;
}

export interface GameWeekData {
  id: number;
  name: string;
  average: number;
  isCurrent: boolean;
  isPrevious: boolean;
  isNext: boolean;
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
