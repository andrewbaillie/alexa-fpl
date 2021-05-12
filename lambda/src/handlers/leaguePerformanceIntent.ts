import * as Alexa from "ask-sdk-core";
import { League } from "../api";

export const LeaguePerformanceIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "LeaguePerformance"
    );
  },
  async handle(handlerInput) {
    const sessionAttributes =
      handlerInput.attributesManager.getSessionAttributes();

    const myLeague = new League(sessionAttributes.fplId);
    await myLeague.preLoadData();
    const league = myLeague.getLeagueSummary();
    const standing = myLeague.getLeaguePosition();
    const nearestRivals = myLeague.getNearestRivals();

    console.log(nearestRivals);

    let speakOutput = `Here's an update on the ${league.name} league. Your team: ${standing.teamName} is currently `;

    if (standing.rank === 1) {
      speakOutput += `top of league! `;
    } else {
      speakOutput += `in position ${standing.rank} `;
    }

    speakOutput += ` with a total of ${standing.total} points. `;

    if (nearestRivals.above) {
      const above = nearestRivals.above;
      speakOutput += `${above.teamName} managed by ${
        above.playerName
      } is ahead of you, with a total of ${above.total} points, that's just ${
        above.total - standing.total
      } points. `;
    }

    if (nearestRivals.below) {
      const below = nearestRivals.below;

      speakOutput += `${below.teamName} managed by ${
        below.playerName
      } is below you, with a total of ${below.total} points, that's a massive ${
        standing.total - below.total
      } behind you. Almost so far you can't see them.`;
    }

    return handlerInput.responseBuilder.speak(speakOutput).getResponse();
  }
};
