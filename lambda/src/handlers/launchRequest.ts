import * as Alexa from "ask-sdk-core";

export const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "LaunchRequest"
    );
  },
  handle(handlerInput) {
    const speakOutput =
      "Welcome to Fantasy Premier League, I've got access to most of the FPL website and can retrieve your game stats. Before we begin can you tell me your FPL ID?";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  }
};
