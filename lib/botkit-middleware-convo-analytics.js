var debug = require('debug')('convo-analytics-middleware');
var ConvoAnalyticsApi = require('convo-analytics-api').default;

var uuid = require('node-uuid');

module.exports = function(config) {
    if (!config || !config.token) {
        throw new Error('No convo.analytics token provided.');
    }

    var middleware = {};
    var convoAnalyticsApi = new ConvoAnalyticsApi(config.token, {});

    middleware.receive = function(bot, message, next) {
        debug('convo.analytics received message', message);
        processMessage(bot, message, next, 'user');
    };


    middleware.send = function(bot, message, next) {
        debug('convo.analytics send message', message);
        processMessage(bot, message, next, 'agent');
    };


    function processMessage (not, message, next, type)  {
        
        var user_id = ''; // default user
        var platform = 'botkit'; 
        var time_stamp = Date.now(); // default user

        if (!message.text) {
            next();
            return;
        }

        if (message.is_echo || message.type === 'self_message') {
            next();
            return;
        }

        if ('user' in message) {
            user_id = message.user;
        }

        if ('time_stamp' in message) {
            time_stamp = message.sent_timestamp;
        }

        if ('platform' in message) {
            platform = message.platform;
        }

        if (!user_id || !type || !time_stamp || !platform){
            debug('user_id, type, time_stamp and platform are required attributes.');
            next();
            return;
        }else{
            request = convoAnalyticsApi.textRequest({
                text: message.text,
                user_id: user_id,
                type: type,
                time_stamp: time_stamp,
                platform: platform,
                timezone: message.timezone,
                language: message.language,
                intent: message.intent,
                version: message.version,
                handled: message.handled,
                originalRequest: message,
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
        }
    }

    return middleware;
};
