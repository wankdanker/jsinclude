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

### include(path [, charset] [, callback])

Load a script referenced by `path` and call the optional callback function when it has been loaded.
If a string valued charset is passed as the second argument, then the charset attribute will be set
on the script element.

### include(callback)

Call `callback` once all pending include files have been loaded.

### include.once(path [,charset] [, callback])

Load a script referenced by `path` at most one time and call the optional callback function when it has been loaded.
If a string valued charset is passed as the second argument, then the charset attribute will be set
on the script element.

Callback is still called if the script has already been loaded one or more times.

* **path** : (required) path to the javascript file to load
* **callback** : (optional) callback function which is called once the script referenced by `path` has been loaded.

### include.css(path [, options])

Load a stylesheet referenced by `path`.

* **path** : (required) path the css file to load
* **options** : (optional)
  * **prepend** : insert the css file before all other stylesheets

### include.pathAppend

`pathAppend` is a configuration option that is appended to each `path`.

If `pathAppend` is a function, it is called with `path` as its only argument. The return value should be a string to append to `path`.

Example using a string value:

```js
var package = require('./package.json');

include.pathAppend = 'v=' + package.version;
```

Example using a function:

```js
var package = require('./package.json');

include.pathAppend = function (path) {
	if (~path.indexOf('mydomain.com')) {
		return 'v=' + package.version;
	}
	else return '';
};
```

License
-------

MIT
