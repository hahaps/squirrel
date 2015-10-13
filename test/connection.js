'use strict';

var Connection = require('../lib/connection'),
    assert = require('assert');

describe('Connection', function () {
    it('should return a object with connection methods', function () {
        var connection = new Connection('www.test.com', 'test');
        assert(connection instanceof Connection);

        // compare baseURI and prefix
        assert(connection.baseURI === 'www.test.com');
        assert(connection.prefix === 'test');
    });
});
