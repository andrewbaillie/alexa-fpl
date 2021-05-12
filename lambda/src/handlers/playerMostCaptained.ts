import * as Alexa from "ask-sdk-core";
import { Player } from "../api";

export const PlayerMostCaptainedIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) ===
        "PlayerMostCaptained"
    );
  },
  handle(handlerInput) {
    const player = new Player();
    const mostCaptained = player.getMostCaptained();

    const speakOutput = `The most captained player for ${
      mostCaptained.gameweek
    } was ${mostCaptained.name} who scored ${mostCaptained.points * 2} points.`;

    return handlerInput.responseBuilder.speak(speakOutput).getResponse();
  }
};
