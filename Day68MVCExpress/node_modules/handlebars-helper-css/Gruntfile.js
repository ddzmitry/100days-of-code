/**
 * Handlebars Helper: {{compose}}
 * https://github.com/helpers/handlebars-helper-css
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * https://github.com/jonschlinkert
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
  'use strict';

  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({
    bower: grunt.file.readJSON('.bowerrc').directory,
    site: grunt.file.readYAML('_config.yml'),
    pkg: grunt.file.readJSON('package.json'),

    // Lint JavaScript
    jshint: {
      all: ['Gruntfile.js', 'index.js', 'lib/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    assemble: {
      options: {
        flatten: true,
        assets: '<%= site.assets %>',

        // Metadata
        pkg: '<%= pkg %>',
        site: '<%= site %>',
        data: ['<%= site.data %>/*.{json,yml}'],
        layouts: 'test/fixtures/layouts',
        layout: 'default.hbs',

        // Extensions
        helpers: ['./index.js']
      },
      hash_options: {
        options: {
          css: {
            cache: '<%= site.css %>/.cache-styles.json',
            src: [
              '<%= site.css %>/masthead.css',
              '<%= site.css %>/one.css',
              '<%= site.css %>/body.css',
              '<%= site.css %>/scaffolding.css'
            ],
            dest: '<%= site.assets %>/styles/'
          }
        },
        files: [
          { expand: true, cwd: '<%= site.pages %>', src: ['index.hbs'], dest: '<%= site.dest %>/', ext: '.html'},
        ]
      },
      nested: {
        options: {
          css: {
            cache: '<%= site.css %>/.cache-css.json',
            src: ['<%= site.css %>/*.css'],
            dest: '<%= site.assets %>/css/'
          }
        },
        files: [
          { expand: true, cwd: '<%= site.pages %>', src: ['index.hbs'], dest: '<%= site.dest %>/foo/bar/baz', ext: '.html'}
        ]
      },
    },

    // Before generating any new files,
    // remove files from previous build.
    clean: {
      example: ['<%= site.dest %>/**']
    }
  });

  // Load npm plugins to provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-sync-pkg');
  grunt.loadNpmTasks('assemble');

  // Default to tasks to run with the "grunt" command.
  grunt.registerTask('default', ['clean', 'jshint', 'assemble', 'sync']);
};
