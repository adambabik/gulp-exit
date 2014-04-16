'use strict';

var stream = require('stream');
var util = require('util');

/**
 * Node v0.10+ uses native `Transform`. For older versions, use a polyfill.
 *
 * @type {Function}
 */

var Transform = stream.Transform || require('readable-stream').Transform;

/**
 * `Exit` constructor.
 *
 * @param {Object} options
 */

function Exit(options) {
  if (!(this instanceof Exit)) return new Exit(options);
  Transform.call(this, options);
}

/**
 * Inherit from `Transform`.
 */

util.inherits(Exit, Transform);

/** @type {Object} */
var exitProto = Exit.prototype;

/**
 * Override required methods.
 */

exitProto._transform = function (c, e, cb) { cb(); };

exitProto._flush = function (cb) {
  cb();
  process.exit(0);
};

/**
 * Exports as a gulp plugin.
 */

module.exports = function () {
  return new Exit({ objectMode: true });
};
