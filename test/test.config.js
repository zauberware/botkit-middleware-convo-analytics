var expect = require('chai').expect;

describe('middleware config parsing', function() {
    it('should throw if token is missing', function(done) {
        var config = {};

        expect(() => require('../src/botkit-middleware-convo-analytics')(config)).to.throw(
            Error,
            'No convo.analytics token provided.'
        );
        done();
    });
});
