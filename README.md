jsinclude
---------

Programmatically include JavaScript and CSS files in the browser at runtime.

example
-------

```html
<html>
 <head>
  <script src="/path/to/include.js"></script>
  <script>
   include.once("/js/jquery.js", function () {
    console.log('jquery is loaded'); 
   });

   include.css("/css/jquery-ui.css");

   include(function () {
    console.log('all includes are loaded');
   });
  </script>
 </head>
 <body>
  Hello
 </body>
</html>
```

api
---

### include(path [, callback])

Load a script referenced by `path` and call the optinonal callback function when it has been loaded.

### include(callback)

Call `callback` once all pending include files have been loaded.

### include.once(path [, callback])

Load a script referenced by `path` at most one time and call the optional callback function when it has been loaded.

Callback is still called if the script has already been loaded one or more times.

* **path** : (required) path to the javascript file to load
* **callback** : (optional) callback function which is called once the script referenced by `path` has been loaded.

### include.css(path [, options])

Load a stylesheet referenced by `path`.

* **path** : (required) path the css file to load
* **options** : (optional)
  * **prepend** : insert the css file before all other stylesheets

License
-------

MIT
