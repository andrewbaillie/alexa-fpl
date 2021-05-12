import * as Alexa from "ask-sdk-core";

export const UserFPLIDIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "userFPLId"
    );
  },
  handle(handlerInput) {
    const sessionAttributes =
      handlerInput.attributesManager.getSessionAttributes();
    const fplId = Alexa.getSlotValue(handlerInput.requestEnvelope, "fplid");
    sessionAttributes.fplId = fplId;
    handlerInput.attributesManager.setSessionAttributes(sessionAttributes);

    const speakOutput = `Thanks! I've got <say-as interpret-as="digits">${fplId}</say-as> saved for the rest of your session. What would you like to know?`;

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  }
};
