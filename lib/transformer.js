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
var debug   = require('debug')('squirrel:transformer');
var request = require('request');


/**
 * Initialize a new `Transformer` with a set of @link{Connection}
 * objects.
 *
 * @param {[Connection]} connections
 * @public
 */
function Transformer(connections) {
    connections = connections || [];
    var conn_dict = {},
        len = connections.length,
        prefix = null;
    for (len; len > 0; len -= 1) {
        if (connections[len - 1] &&
                connections[len - 1].prefix) {
            prefix = connections[len - 1].prefix;
            conn_dict[prefix] = connections[len - 1];
        }
    }
    debug("Init a transformer with connections %o", conn_dict);
    this.connections = conn_dict;
}


/**
 * Module exports.
 * @public
 */
module.exports = Transformer;


/**
 * Transform http request.
 *
 * Options:
 *
 *   - `method`: methd of http request,
 *               default is 'GET'.
 *   - `headers`: headers of http request.
 *   - `data`: data of http request.
 *   - `url`: url of http request.
 *   - `error`: callback when an error occur.
 *   - `success`: callback when response successful.
 *
 * @param {object} opts
 * @private
 */
Transformer.prototype.transform = function transform(opts) {
    var url = opts.url || '',
        url_split = url.split('/'),
        connections = this.connections,
        prefix = null,
        baseURI = null,
        conn_url = null;
    if (!url_split.length) {
        debug("Can not find prefix for url %s", url);
        return false;
    }
    if (!connections[url_split[0]]) {
        debug("Can not find prefix for url %s", url);
        return false;
    }
    prefix = connections[url_split[0]].prefix;
    baseURI = connections[url_split[0]].baseURI;
    conn_url = baseURI + url.substring(prefix.length + 1);
    request({
        method: opts.method || 'GET',
        headers: opts.headers || {},
        body: opts.data,
        url: conn_url
    }, function (error, response, body) {
        var status_code = response.statusCode;
        if (error) {
            debug("Failed to handle request of %o", opts);
            opts.error(error, response);
            return false;
        }
        if (status_code < 200 || status_code >= 400) {
            debug("Failed to handle request of %o", opts);
            opts.error(error, response);
            return false;
        }
        opts.success(body, response);
    });
};
