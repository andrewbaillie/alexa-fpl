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
    const league = await myLeague.getLeagueSummary();
    const standing = await myLeague.getLeaguePosition();

    console.log(standing);

    let speakOutput = `Here's an update on the ${league.name} league. Your team: ${standing.teamName} is currently in position ${standing.rank} with a total of ${standing.total} points.`;

    // if (myUser.isGameweekInProgress()) {
    //   speakOutput += `have scored ${perf.gameweekPoints} points so far this gameweek `;
    // } else {
    //   speakOutput += `scored ${perf.gameweekPoints} points in the last gameweek `;
    // }

    // speakOutput += `for a total of ${perf.overallPoints} points`;

    return handlerInput.responseBuilder.speak(speakOutput).getResponse();
  }
};
