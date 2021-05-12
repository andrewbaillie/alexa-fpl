import fetch from "node-fetch";
import { fplbase } from "./bootstrap";
import { UserBasicInfo } from "./interfaces";

export class User extends fplbase {
  private id: number;
  private basicInfo: UserBasicInfo;

  private headers = {
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36"
  };

  constructor(id: number) {
    super();
    this.id = id;
  }

  public getGameweekPerformance = async () => {
    if (!this.basicInfo) this.basicInfo = await this.fetchBasicUserInfo();

    return this.basicInfo;
  };

  public isGameweekInProgress = (): Boolean => {
    const gw = this.getCurrentGameweek();
    return gw.isFinished;
  };

  private fetchBasicUserInfo = async (): Promise<UserBasicInfo> => {
    const response = await fetch(
      `https://fantasy.premierleague.com/api/entry/${this.id}/`,
      {
        headers: this.headers
      }
    );

    const data = await response.json();

    return {
      firstName: data.player_first_name,
      lastName: data.player_last_name,
      overallPoints: data.summary_overall_points,
      overallRank: data.summary_overall_rank,
      gameweekPoints: data.summary_event_points,
      gameweekRank: data.summary_event_rank,
      teamName: data.name,
      currentEvent: data.current_event
    };
  };
}
