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


License
-------

MIT
