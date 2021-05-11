import * as bootstrap from "../../data/bootstrap.json";
import {
  BootstrapData,
  GameWeekData,
  PlayerData,
  TeamData
} from "./interfaces";

export const loadBootstrap = (): BootstrapData => {
  return {
    teams: getTeams(),
    players: getPlayers(),
    totalPlayers: bootstrap.total_players,
    gameweeks: getGameweeks()
  };
};

const getTeams = (): TeamData[] => {
  return bootstrap.teams.map((team) => ({
    id: team.id,
    name: team.name,
    shortName: team.short_name,
    strength: team.strength
  }));
};

const getPlayers = (): PlayerData[] => {
  return bootstrap.elements.map((player) => ({
    id: player.id,
    name: `${player.first_name} ${player.web_name}`
  }));
};

const getGameweeks = (): GameWeekData[] => {
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
      mostSelected: week.most_selected,
      mostTransferredIn: week.most_transferred_in,
      mostCaptained: week.most_captained
    }));
};
