import * as Alexa from "ask-sdk-core";
import { User } from "../api";

export const TeamPerformanceIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "TeamPerformance"
    );
  },
  async handle(handlerInput) {
    const sessionAttributes =
      handlerInput.attributesManager.getSessionAttributes();

    const myUser = new User(sessionAttributes.fplId);
    const perf = await myUser.getGameweekPerformance();

    let speakOutput = `${perf.teamName} `;

    if (myUser.isGameweekInProgress()) {
      speakOutput += `have scored ${perf.gameweekPoints} points so far this gameweek `;
    } else {
      speakOutput += `scored ${perf.gameweekPoints} points in the last gameweek `;
    }

    speakOutput += `for a total of ${perf.overallPoints} points`;

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("What else would you like to know?")
      .getResponse();
  }
};
