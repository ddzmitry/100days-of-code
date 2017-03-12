/**
 * {{css}}
 * Copyright (c) 2013 Jon Schlinkert, contributors
 * Licensed under the MIT License (MIT).
 */

'use strict';

// Node.js
var path = require('path');

// node_modules
var async = require('async');
var relative = require('relative');
var file = require('fs-utils');
var _ = require('lodash');

// Local libs
var utils = require('./lib/utils');

module.exports.register = function (Handlebars, options, params) {

  var grunt = params.grunt;
  var assembleOpts = options || {};

  Handlebars.registerHelper("css", function (options) {
    options = options || {};
    options.hash = options.hash || {};

    var i = 0;
    var result = '';
    var data;

    // Default options
    options = _.extend({
      sep: '\n',

      // CSS Options
      copy: true,
      minify: true,
      concat: true,
      clean: true,
      encoding: 'utf8',
      algorithm: 'md5',
      length: 8,
      src: '',
      dest: '',

      // Globule
      glob: {
        filter: 'isFile',
        nonull: true
      },
    }, options);

    // Assemble options and options.data['css']
    var cssOpts = _.extend(assembleOpts.css, assembleOpts.data.css);

    // Default options
    if(options.hash.dest) {
      options.hash.dest = path.join(assembleOpts.originalAssets, options.hash.dest);
    }

    options = _.extend(options, cssOpts, options.hash);

    var opts = grunt.config.process(options);
    opts.cwd = opts.cwd || process.cwd();

    // Calulate current working directory (CWD)
    var cwd = path.join.bind(null, opts.cwd, '');
    if(opts.hash.cwd) {
      cwd = path.join.bind(null, grunt.config.process(opts.hash.cwd));
    }

    // Add some src variables to the context
    var ctx = _.extend(grunt.config.data, assembleOpts, this);

    // Source file glob patterns
    var patterns = utils.arrayify(opts.src);

    // if (!opts.minify) {
    //   return opts.fn(this);
    // } else {
    //   return opts.inverse(this);
    // }

    // Use `originalAssets` as the root directory for assets, so the `dest`
    // only needs to calculate relative to that path.
    var assetsRoot = assembleOpts.originalAssets;
    var cssDest = cwd(opts.dest);

    // Cache for storing paths to dest files after each build
    var cache = opts.cache || path.join(__dirname, '.cache.json');

    // If opts.clean is defined, the helper will attempt to
    // remove the files from the previous build. As a precaution,
    // only files listed in the cache will be cleaned.
    if(opts.clean && opts.copy) {
      if(file.exists(cache) && file.readJSONSync(cache).length > 0) {
        file.readJSONSync(cache).map(function(cachedFile) {
          cachedFile = path.resolve(process.cwd(), cachedFile);
          if(file.exists(cachedFile)) {
            file.delete(cachedFile);
          } else {
            if(opts.verbose) {
              console.warn('[css helper]: no .cache file to delete.');
            }
          }
        });
      }
    }

    var revvedFiles = [];

    async.forEach(patterns, function (pattern, callback) {
      var files = file.expand(pattern, opts.glob);

      var src = files.map(function (filepath) {
        i += 1;

        // The content of the source file
        var content = file.readFileSync(filepath);

        // Default length of the returned hash is 32
        var hash = utils.md5(filepath, opts.algorithm, 'hex', opts.encoding);

        // Shorten the hash to the length specified in the options
        var revision  = hash.slice(0, opts.length);

        // The revised filename (non-minified, that comes later)
        var ext = path.extname(filepath);
        var filename = path.basename(filepath, ext) + '.' + revision + ext;

        // Asset paths
        var destFile = path.join(cssDest, filename).replace(/\\/g, '/');

        // Inject private variables into block, so that variables on `data`
        // are only available in the block helper's child template and
        // not in the original context
        data = Handlebars.createFrame(ctx.data);

        // Best guess at some useful properties to add to the data context
        data.index    = i;
        data.src      = filepath;
        data.revision = revision;
        data.filename = filename;
        data.destFile = destFile;
        data.basename = file.basename(filename);
        data.ext      = ext;
        data.content  = content;

        // This is the full filepath
        data.path     = relative(ctx.absolute, destFile);

        return {
          ctx: ctx,
          data: data
        };
      }).sort(opts.compare || utils.compareFn, opts).map(function (obj) {
        var data = obj.data;

        // Copy revisioned source files to cssDest
        if(opts.copy) {
          // If opts.minify is defined, minify source files and rename
          if(opts.minify) {

            // minify: true, then minify but don't
            // pass any additional options.
            if(opts.minify === true) {
              opts.minify = {};
            }

            data.path      = data.path.replace(path.extname(data.filename), '.min' + data.ext);
            data.filename  = data.filename.replace(path.extname(data.filename), '.min' + data.ext);
            var fullpath   = data.destFile.replace(path.extname(data.filename), '.min' + data.ext);
            revvedFiles.push(relative(process.cwd(), fullpath));

            var css = file.readFileSync(data.src);
            file.writeFileSync(fullpath, utils.minifyCSS(css, opts.minify));

          } else {
            revvedFiles.push(cssDest);
            file.copyFileSync(data.src, cssDest);
          }
        } else {
          revvedFiles.push(cssDest);
        }

        var name = file.ext(data.src) + '-' + file.basename(data.src) + '.json';
        file.writeJSONSync('tmp/' + name, data);


        // Content from src files
        var glob_fn = Handlebars.compile(data.content);
        data.content = glob_fn(ctx).replace(/^\s+/, '');

        // Content from inside the block
        var content = opts.fn(obj.ctx, {data: data});

        // Return content from src files
        return content;
      }).join(opts.sep);

      result += src;

      // Store the filepaths of revisioned files after each build.
      if(opts.copy && opts.cache !== false) {
        file.writeJSONSync(cache, revvedFiles);
      }
      callback();
    });

    return new Handlebars.SafeString(result);
  });
};