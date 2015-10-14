/*!
 * squirrel
 * Copyright(c) 2015 Li Xipeng <lixipeng@hihuron.com>
 * MIT Licensed
 */

'use strict';


/**
 * Module dependencies.
 * @private
 */
var debug      = require('debug')('squirrel:express');
var BaseLoader = require('./base');
var util       = require('util');

function Express() {
}


Express.prototype.load = function load(app) {
    var transformer = this.transfromer;
    var opts = {
      connections: this.conntions || {}
    };
    app.all('*', function(req, res) {
        var error = function error(err, response) {
            res.send(err, response.statusCode || 500);
        };
        var success = function success(body, response) {
            res.send(body, response.statusCode || 200);
        };
        opts.method = req.method;
        opts.headers = req.headers;
        opts.data = req.body;
        opts.url = req.url;
        opts.error = error;
        opts.success = success;
        debug("Current http request is %s with method %s," +
              " headers %o, data %o", opts.url, opts.method,
              opts.headers, opts.data);
        transformer.transform(opts);
    });
};


// Express inherits from BaseLoader.
util.inherits(Express, BaseLoader);


/**
 * Module exports.
 * @public
 */
module.exports = Express;
