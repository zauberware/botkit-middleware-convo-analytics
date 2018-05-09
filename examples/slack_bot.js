/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
           ______     ______     ______   __  __     __     ______
          /\  == \   /\  __ \   /\__  _\ /\ \/ /    /\ \   /\__  _\
          \ \  __<   \ \ \/\ \  \/_/\ \/ \ \  _"-.  \ \ \  \/_/\ \/
           \ \_____\  \ \_____\    \ \_\  \ \_\ \_\  \ \_\    \ \_\
            \/_____/   \/_____/     \/_/   \/_/\/_/   \/_/     \/_/


This is a sample Slack bot built with Botkit, using the convo.analytics middleware.

This bot demonstrates many of the core features of Botkit:

* Connect to Slack using the real time API
* Receive messages based on "spoken" patterns
* Reply to messages

# RUN THE BOT:

  Get a Bot API token from Slack:

    -> http://my.slack.com/services/new/bot

  Get a developer access token from convo.analytics

    TODO

  Run your bot from the command line:

    slack=<api-token> convo_analytics=<access-token> node example_bot.js

# USE THE BOT:

  Say: "Hello"

  You should immediatly see tracking in the convo.analytics dashboard.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


if (!process.env.slack) {
    console.log('Error: Specify slack API token in environment');
    process.exit(1);
}

if (!process.env.convo_analytics) {
    console.log('Error: Specify convo.analytics in environment');
    process.exit(1);
}

var Botkit = require('botkit');

var slackController = Botkit.slackbot({
    debug: true,
});

var slackBot = slackController.spawn({
    token: process.env.slack,
});

var convoAnalayticsMiddleware = require('../')({
    token: process.env.convo_analytics,
});

slackController.middleware.receive.use(convoAnalayticsMiddleware.receive);
slackController.middleware.send.use(convoAnalayticsMiddleware.send);
slackBot.startRTM();

