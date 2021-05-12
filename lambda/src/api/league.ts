import fetch from "node-fetch";
import { LeagueInfo, LeagueStanding } from "./interfaces";

export class League {
  private leagueId: number = 38525;
  private basicInfo: LeagueInfo;
  private playerId: number;

  private headers = {
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36"
  };

  constructor(id: number) {
    this.playerId = Number(id);
  }

  public preLoadData = async (): Promise<void> => {
    if (!this.basicInfo) this.basicInfo = await this.fetchLeagueInfo();
  };

  public getLeagueSummary = async (): Promise<LeagueInfo> => {
    return this.basicInfo;
  };

  public getLeaguePosition = async (): Promise<LeagueStanding> => {
    this.basicInfo.standings.map((s) => {
      console.log(typeof this.playerId);
      console.log(typeof s.playerId);
      if (s.playerId === this.playerId) {
        console.log("found");
      }
      console.log(s.playerId);
    });

    return this.basicInfo.standings.filter(
      (s) => s.playerId === this.playerId
    )[0];
  };

  private fetchLeagueInfo = async (): Promise<LeagueInfo> => {
    const response = await fetch(
      `https://fantasy.premierleague.com/api/leagues-classic/${this.leagueId}/standings/`,
      {
        headers: this.headers
      }
    );

    const data = await response.json();

    return {
      id: data.league.id,
      name: data.league.name,
      standings: data.standings.results.map((standing) => ({
        id: standing.id,
        gameweekPoints: standing.event_total,
        rank: standing.rank,
        lastRank: standing.last_rank,
        total: standing.total,
        teamName: standing.entry_name,
        playerName: standing.player_name,
        playerId: standing.entry
      }))
    };
  };
}
