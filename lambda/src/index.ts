import * as Alexa from "ask-sdk-core";
import {
  CancelAndStopIntentHandler,
  ErrorHandler,
  PlayerMostCaptainedIntentHandler,
  HelpIntentHandler,
  IntentReflectorHandler,
  LaunchRequestHandler,
  SessionEndedRequestHandler,
  UserFPLIDIntentHandler,
  TeamPerformanceIntentHandler,
  LeaguePerformanceIntentHandler
} from "./handlers";

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    UserFPLIDIntentHandler,
    PlayerMostCaptainedIntentHandler,
    TeamPerformanceIntentHandler,
    LeaguePerformanceIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
    // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    IntentReflectorHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
