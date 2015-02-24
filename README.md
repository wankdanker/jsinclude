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
include.once("/js/jquery.js");
include.css("/css/jquery-ui.css");
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
