var Botkit = require('botkit');
var nock = require('nock');
var expect = require('chai').expect;

describe('receive() text', function() {
    // convo.analytics params
    var config = require('./config.json');

    // Botkit params
    var controller = Botkit.slackbot();
    var bot = controller.spawn({
        token: 'abc123',
    });

    // convo.analytics middleware
    var middleware = require('../src/botkit-middleware-conco-analytics')(config);

    // incoming message from chat platform, before middleware processing
    var message = {
        type: 'direct_message',
        channel: 'D88V7BL2F',
        user: 'U891YCT42',
        text: 'Hello',
        ts: '1522182838.0001993',
        source_team: '38958ABLC',
        team: '38958ABLC',
        raw_message: {
            type: 'message',
            channel: 'D88V7BL2F',
            user: 'U3498SJH',
            text: 'Hello',
            ts: '1522182838.0001993',
            source_team: '38958ABLC',
            team: '38958ABLC',
        },
        _pipeline: {stage: 'receive'},
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

    it('should make a call to the convo.analytics api', function(done) {
        middleware.receive(bot, message, function(err, response) {
            expect(nock.isDone()).is.true;
            done();
        });
    });

});
