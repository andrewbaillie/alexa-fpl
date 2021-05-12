import * as bootstrap from "../../data/bootstrap.json";

import {
  BootstrapData,
  GameWeekData,
  PlayerData,
  TeamData
} from "./interfaces";

export class fplbase {
  private bootstrapData: BootstrapData = {
    teams: [],
    players: [],
    totalPlayers: 0,
    gameweeks: []
  };

  constructor() {
    this.initBootstrap();
  }

  initBootstrap = () => {
    this.bootstrapData = {
      teams: this.loadTeams(),
      players: this.loadPlayers(),
      totalPlayers: bootstrap.total_players,
      gameweeks: this.loadGameweeks()
    };
  };

  private loadTeams = (): TeamData[] => {
    return bootstrap.teams.map((team) => ({
      id: team.id,
      name: team.name,
      shortName: team.short_name,
      strength: team.strength
    }));
  };

  private loadPlayers = (): PlayerData[] => {
    return bootstrap.elements.map((player) => ({
      id: player.id,
      name: `${player.first_name} ${player.web_name}`,
      gameweekPoints: player.event_points
    }));
  };

  private loadGameweeks = (): GameWeekData[] => {
    return bootstrap.events
      .filter(
        (week) =>
          week.is_previous === true ||
          week.is_current === true ||
          week.is_next === true
      )
      .map((week) => ({
        id: week.id,
        name: week.name,
        average: week.average_entry_score,
        isCurrent: week.is_current,
        isPrevious: week.is_previous,
        isNext: week.is_next,
        isFinished: week.finished,
        mostSelected: week.most_selected,
        mostTransferredIn: week.most_transferred_in,
        mostCaptained: week.most_captained
      }));
  };

  public getCurrentGameweek = (): GameWeekData => {
    return this.bootstrapData.gameweeks.filter(
      (week) => week.isCurrent === true
    )[0];
  };

  public getPlayer = (id: number): PlayerData => {
    return this.bootstrapData.players.filter((player) => player.id === id)[0];
  };
}
