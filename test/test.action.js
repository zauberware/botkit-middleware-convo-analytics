var Botkit = require('botkit');
var nock = require('nock');
var expect = require('chai').expect;
var clone = require('clone');

describe('action()', function() {
    // convo.analytics params
    var config = require('./config.json');

    // Botkit params
    var controller = Botkit.slackbot();
    var bot = controller.spawn({
        token: 'abc123',
    });

    // convo.analytics middleware
    var middleware = require('../src/botkit-middleware-convo-analytics')(config);

    // incoming message from chat platform, before middleware processing
    var message = {
        type: 'direct_message',
        text: 'pick an apple',
    };


    before(function() {
        nock.disableNetConnect();

        nock(config.url)
            .post('/' + config.version + '/query?v=' + config.protocol)
            .reply(200);
    });

    after(function() {
        nock.cleanAll();
    });

    it('should trigger action returned in convo.analytics response', function(done) {
        middleware.receive(bot, message, function(err, response) {
            let action = middleware.action(['pickFruit'], message);
            expect(action).is.true;
            done();
        });
    });

});
