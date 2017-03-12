
var crypto = require('crypto');

var file = require('fs-utils');
var _ = require('lodash');
var CleanCSS = require('clean-css');

var utils = module.exports = {};



utils.arrayify = function(arr) {
  return !Array.isArray(arr) ? [arr] : arr;
};

/**
 * Read runtime config file.
 * @param   {[type]}  opts    [description]
 * @param   {[type]}  prop    [description]
 * @return  {[type]}          [description]
 */

utils.readRuntimeConfig = function(opts, prop) {
  if(opts[prop]) {
    opts = grunt.config.process(file.readDataSync(opts[prop]));
    delete opts[prop];
    return opts;
  } else {
    return {};
  }
};


/**
 * Process templates using grunt.config.data and context
 * @param   {[type]}  grunt    [description]
 * @param   {[type]}  context  [description]
 * @return  {[type]}           [description]
 */

utils.processContext = function (grunt, context) {
  grunt.config.data = _.defaults(context || {}, _.cloneDeep(grunt.config.data));
  return grunt.config.process(grunt.config.data);
};

/**
 * Basic sort
 * @param   {[type]}  a  [description]
 * @param   {[type]}  b  [description]
 * @return  {[type]}     [description]
 */

utils.sortFn = function(a, b) {
  return a > b ? 1 : a < b ? -1 : 0;
};

/**
 * Comparison function for sorting the generated tags
 * @param   {[type]}  a  [description]
 * @param   {[type]}  b  [description]
 * @return  {[type]}     [description]
 */

utils.compareFn = function (a, b, options) {
  var opts = _.extend({sortOrder: 'asc', sortBy: 'index'}, options);

  a = a.data[opts.sortBy];
  b = b.data[opts.sortBy];

  var result = 0;
  result = a > b ? 1 : a < b ? -1 : 0;
  if(opts.sortOrder.toLowerCase() === 'desc') {
    return result * -1;
  }
  return result;
};

/**
 * Generate md5 hash
 * @param   {[type]}  src        [description]
 * @param   {[type]}  algorithm  [description]
 * @param   {[type]}  enc        [description]
 * @param   {[type]}  encoding   [description]
 * @return  {[type]}             [description]
 */

utils.md5 = function(src, algorithm, enc, encoding) {
  var hash = crypto.createHash(algorithm);
  hash.update(file.readFileSync(src, {enc: encoding}));
  return hash.digest(enc);
};

/**
 * Minify CSS
 * @param   {[type]}  source   [description]
 * @param   {[type]}  options  [description]
 * @return  {[type]}           [description]
 */

utils.minifyCSS = function(source, options) {
  try {
    return new CleanCSS(options).minify(source);
  } catch (e) {
    console.warn('css minification failed.');
  }
};
