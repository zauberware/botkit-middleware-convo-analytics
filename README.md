# Botkit Middleware for convo.analytics service

Track, Analyse and Structure your chatbot conversations.



## Installation

### API Key

We are providing a lightweight web application to track, analyse and structure the conversations of all bots you have currently out there.

Create an account and retrieve an API key here ->

Add your API key to your environment variables. (e.g. in .env)

`CONVO_ANALYTICS_API_KEY=XXXAAAAPPPIIIIXXXXX`


### Install npm package

`npm install botkit-middleware-convo-analytics`


### Adding middleware

Add middleware to your botkit controller.

```
// Adding convo-analytics middleware
var convoAnalyticsMiddleware = require('botkit-middleware-convo-analytics')({
  token: process.env.CONVO_ANALYTICS_API_KEY,
});
```

Track `receive`

```
controller.middleware.receive.use(async(bot, message, next) => {
  
  convoAnalyticsMiddleware.receive(bot, message, next);

  next();
});

```

Track `send`

```
controller.middleware.send.use(async(bot, message, next) => {
  
  convoAnalyticsMiddleware.send(bot, message, next);

  next();
});

```

It is important to track both send AND receive. Otherwise you will not see your bots answers.
