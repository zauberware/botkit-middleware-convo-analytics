var debug = require('debug')('convo-analytics-middleware');
// var convoAnalyticsApi = require('convo-analytics-api');
var uuid = require('node-uuid');

module.exports = function(config) {
    if (!config || !config.token) {
        throw new Error('No convo.analytics token provided.');
    }

    var middleware = {};
    var sessionId = uuid.v1();

    middleware.receive = function(bot, message, next) {
        console.log("incomming receive");
        console.log(message.text, message.is_echo, message.type);

        if (!message.text) {
            next();
            return;
        }

        if (message.is_echo || message.type === 'self_message') {
            next();
            return;
        }

        console.log('Sending RECEIVED message to convo.analytics', message.text);
        console.log(sessionId);
        
        // console.log(convoAnalyticsApi);
        // request = convoAnalyticsApi.textRequest(message.text, {
        //     sessionId: sessionId,
        // });

        // request.on('response', function(response) {
        //     message.intent = response.result.metadata.intentName;
        //     message.entities = response.result.parameters;
        //     message.fulfillment = response.result.fulfillment;
        //     message.confidence = response.result.score;
        //     message.nlpResponse = response;
        //     debug('convo.analytics annotated message: %O', message);
        //     next();
        // });

        // request.on('error', function(error) {
        //     debug('convo.analytics returned error', error);
        //     next(error);
        // });

        // request.end();
    };



    middleware.send = function(bot, message, next) {

        console.log("incomming send");
        console.log(message.text, message.is_echo, message.type);

        if (!message.text) {
            next();
            return;
        }

        if (message.is_echo || message.type === 'self_message') {
            next();
            return;
        }

        console.log('Sending SENT message to convo.analytics', message.text);
        console.log(sessionId);
        
        // console.log(convoAnalyticsApi);
        // request = convoAnalyticsApi.textRequest(message.text, {
        //     sessionId: sessionId,
        // });

        // request.on('response', function(response) {
        //     message.intent = response.result.metadata.intentName;
        //     message.entities = response.result.parameters;
        //     message.fulfillment = response.result.fulfillment;
        //     message.confidence = response.result.score;
        //     message.nlpResponse = response;
        //     debug('convo.analytics annotated message: %O', message);
        //     next();
        // });

        // request.on('error', function(error) {
        //     debug('convo.analytics returned error', error);
        //     next(error);
        // });

        // request.end();
    };


    return middleware;
};
