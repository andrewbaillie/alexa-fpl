import { fplbase } from "./bootstrap";

export class Player extends fplbase {
  constructor() {
    super();
  }

  getMostCaptained = () => {
    const currentGameweek = this.getCurrentGameweek();
    const playerInfo = this.getPlayer(currentGameweek.mostCaptained);

    return {
      gameweek: currentGameweek.name,
      name: playerInfo.name,
      points: playerInfo.gameweekPoints
    };
  };
}
