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
 * Module exports.
 * @public
 */
module.exports = use_express;


/**
 * Initialize a new `Connection` with baseURI and prefix.
 *
 * @param {string} baseURI
 * @param {string} prefix
 * @public
 */
function use_express = use_express(app) {
  app.all('*', function() {
  });
}
