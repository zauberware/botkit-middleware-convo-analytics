var debug = require('debug')('convo-analytics-middleware');
var ConvoAnalyticsApi = require('convo-analytics-api').default;

var uuid = require('node-uuid');

module.exports = function(config) {
    if (!config || !config.token) {
        throw new Error('No convo.analytics token provided.');
    }

    var middleware = {};
    var sessionId = uuid.v1();
    var convoAnalyticsApi = new ConvoAnalyticsApi(config.token, {});

    middleware.receive = function(bot, message, next) {

        if (!message.text) {
            next();
            return;
        }

        if (message.is_echo || message.type === 'self_message') {
            next();
            return;
        }

        debug('convo.analytics received message', message);

        var messageId = uuid.v1(); // other than sessionId we need this to be uniq all the time
        var type = 'message_receive'; // default type to message received
        var user = ''; // default user
        var channel = ''; // default user
        var sent_timestamp = Date.now(); // default user

        if ('type' in message) {
            type = message.type;
        }

        if ('user' in message) {
            user = message.user;
        }

        if ('channel' in message) {
            channel = message.channel;
        }

        if ('sent_timestamp' in message) {
            sent_timestamp = message.sent_timestamp;
        }

        request = convoAnalyticsApi.textRequest({
            sessionId: sessionId,
            messageId: messageId,
            text: message.text,
            type: type,
            user: user,
            channel: channel,
            sentTimestamp: sent_timestamp,
            originalRequest: message
        });

        request.on('response', function(response) {
            debug('convo.analytics saved message', message);
            next();
        });

        request.on('error', function(error) {
            debug('convo.analytics returned error', error);
            next(error);
        });

        request.end();
    };



    middleware.send = function(bot, message, next) {

        if (!message.text) {
            next();
            return;
        }

        if (message.is_echo || message.type === 'self_message') {
            next();
            return;
        }

        debug('convo.analytics send message', message);

        var messageId = uuid.v1(); // other than sessionId we need this to be uniq all the time
        var type = 'message_sent'; // default type to message received
        var user = ''; // default user
        var channel = ''; // default user
        var sent_timestamp = Date.now(); // default user

        if ('type' in message) {
            type = message.type;
        }

        if ('user' in message) {
            user = message.user;
        }

        if ('channel' in message) {
            channel = message.channel;
        }

        if ('sent_timestamp' in message) {
            sent_timestamp = message.sent_timestamp;
        }

        request = convoAnalyticsApi.textRequest({
            sessionId: sessionId,
            messageId: messageId,
            text: message.text,
            type: type,
            user: user,
            channel: channel,
            sentTimestamp: sent_timestamp,
            originalRequest: message
        });

        request.on('response', function(response) {
            debug('convo.analytics saved message', message);
            next();
        });

        request.on('error', function(error) {
            debug('convo.analytics returned error', error);
            next(error);
        });

        request.end();
    };


    return middleware;
};
