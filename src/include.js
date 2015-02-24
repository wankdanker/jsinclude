var includejs = require('../')

//export a global
include = includejs;

//this is for backwards compatibility in my
//own code. Sorry for the pollution; npm
//didn't exist 10 years ago...
include_once = includejs.once;
include_css = includejs.css;
