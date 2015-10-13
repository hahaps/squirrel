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


/**
 * Initialize a new `Connection` with baseURI and prefix.
 *
 * @param {string} baseURI
 * @param {string} prefix
 * @public
 */
function Connection(baseURI, prefix) {
    debug("Init a connection with base URI %s, prefix %s",
          baseURI, prefix);
    this.baseURI = baseURI;
    this.prefix  = prefix;
}


/**
 * Module exports.
 * @public
 */
module.exports = Connection;
