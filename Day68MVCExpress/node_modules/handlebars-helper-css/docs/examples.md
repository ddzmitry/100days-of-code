

Any of the following formats will work. Test them and decide which one works for you.

```handlebars
{{#rev src=styles}}
  <link href="{{asset "css"}}/{{@filename}}" rel="stylesheet">
{{/rev}}
```

```handlebars
{{#rev src=styles}}
  <link href="{{assets}}/css/{{@filename}}" rel="stylesheet">
{{/rev}}
```

```handlebars
{{#rev src=styles}}
  <link href="{{@asset}}" rel="stylesheet">
{{/rev}}
```