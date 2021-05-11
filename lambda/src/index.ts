import * as Alexa from "ask-sdk-core";
import {
  CancelAndStopIntentHandler,
  ErrorHandler,
  HelloWorldIntentHandler,
  HelpIntentHandler,
  IntentReflectorHandler,
  LaunchRequestHandler,
  SessionEndedRequestHandler
} from "./handlers";

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    HelloWorldIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
    // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    IntentReflectorHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
