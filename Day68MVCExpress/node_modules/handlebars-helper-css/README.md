# {{css}} [![NPM version](https://badge.fury.io/js/handlebars-helper-css.png)](http://badge.fury.io/js/handlebars-helper-css)

> Handlebars helper for adding stylesheets based on config settings.

This helper can optionally manage:

* minification
* revisioning / cache-busting
* copying files to dest directory (e.g. `assets/css/`)
* deleting files prior to each build

## Example

```html
{{#css}}
  <link rel="stylesheet" href="{{@path}}">
{{/css}}
```
Results in something like:

```html
<link rel="stylesheet" href="../../../assets/css/3df5e.ad.min.css">
<link rel="stylesheet" href="../../../assets/css/42772.banner.min.css">
<link rel="stylesheet" href="../../../assets/css/39528.body.min.css">
<link rel="stylesheet" href="../../../assets/css/73095.button.min.css">
<link rel="stylesheet" href="../../../assets/css/1dd65.callouts.min.css">
<link rel="stylesheet" href="../../../assets/css/efcde.examples.min.css">
<link rel="stylesheet" href="../../../assets/css/9eaf6.footer.min.css">
```

## Installation

Install with [npm](npmjs.org)

```bash
npm i handlebars-helper-css --save-dev
```

Install with [bower](https://github.com/bower/bower)

```bash
bower install handlebars-helper-css --save-dev
```

## Register the helper

The easiest way to register the helper with [Assemble](https://github.com/assemble/assemble) is to add the module to `devDependencies` and `keywords` in your project's package.json:

```json
{
  "devDependencies": {
    "handlebars-helper-css": "*"
  },
  "keywords": [
    "handlebars-helper-css"
  ]
}
```

Alternatively, to register the helper explicitly in the Gruntfile:

```javascript
grunt.initConfig({
  assemble: {
    options: {
      // the 'handlebars-helper-css' npm module must also be listed in
      // devDependencies for assemble to automatically resolve the helper
      helpers: ['handlebars-helper-css', 'foo/*.js']
    },
    files: {
      'dist/': ['src/templates/*.hbs']
    }
  }
});
```

## Author

**Jon Schlinkert**

+ [github/jonschlinkert](http://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License and Copyright

Copyright (c) 2014 [Jon Schlinkert](http://github.com/jonschlinkert), contributors.
Licensed under the [MIT License](./LICENSE-MIT)