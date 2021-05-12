import * as Alexa from "ask-sdk-core";
import {
  CancelAndStopIntentHandler,
  ErrorHandler,
  HelloWorldIntentHandler,
  PlayerMostCaptainedIntentHandler,
  HelpIntentHandler,
  IntentReflectorHandler,
  LaunchRequestHandler,
  SessionEndedRequestHandler
} from "./handlers";

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    HelloWorldIntentHandler,
    PlayerMostCaptainedIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
    // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    IntentReflectorHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
