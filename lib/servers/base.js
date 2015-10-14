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
var Transformer = require('../transformer');


/**
 * Initialize a new `BaseLoader` with a set of @link{Connection} objects.
 *
 * @param {[Connection]} connections
 */
function BaseLoader(connections) {
    this.transformer = new Transformer(connections);
    this.connections = this.transformer.getConnections();
}


/**
 * Load server application.
 *
 * @param {objecct} app
 * @public
 */
BaseLoader.prototype.load = function load(app) {
    throw new Error("No implemented!");
};


/**
 * Module exports.
 * @public
 */
module.exports = BaseLoader;
