(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

module.exports = include;

include.pending = 0;
include.onready = [];
include.includes = {};
include.queue = [];
include.pathAppend = null;

/* This include function implements a queued loading mechanism
 * to ensure that script files are loaded in the same order as
 * they are defined in script. This helps with some issues of 
 * loading jquery plugins before jquery is actually loaded.
 */

function include(a, onload) {
	if (typeof(a) === 'function') {
		include.onready.push(a);

		if (include.pending == 0) {
			include.ready();

			return true;
		}
		else {
			return false;
		}
	}

	var path = a;
	var pathAppend = include.pathAppend;

	if (pathAppend) {
		//if pathAppend is a function then call it and pass it the path
		if (typeof(pathAppend) === 'function') {
			pathAppend = pathAppend(path);
		}

		//if path already contains a '?' then append &
		if (/\?/.test(path)) {
			path += '&' + pathAppend;
		}
		else {
			path += '?' + pathAppend;
		}
	}

	include.includes[path.toLowerCase()] = { loaded : false };

	var scr = document.createElement('script');

	scr.onload = scr.onreadystatechange = function (ev) {
		var cont = false;

		if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
			cont = true;
		}

		if (cont) {
			include.pending -= 1;

			if (onload) {
				onload();
			}

			if (include.queue.length) {
				var queuedScr = include.queue.shift();

				document.getElementsByTagName('head')[0].appendChild(queuedScr);
				include.pending += 1;
			}

			if (include.pending == 0) {
				include.ready();
			}
		}
	};

	scr.setAttribute('src',path);
	scr.setAttribute('language', 'javascript');
	scr.setAttribute('type', 'text/javascript');

	if (!include.pending) {
		//just load this right away
		document.getElementsByTagName('head')[0].appendChild(scr);
		include.pending += 1;
	}
	else {
		//queue loading until the previous include file is loaded
		include.queue.push(scr);
	}
}

include.once = function (path, onload) {
	if (include.includes[path.toLowerCase()]) {
		//file is already included;
		if (onload) {
			onload();
		}
	}
	else {
		include(path, onload);
	}
}

include.ready = function () {
	for (var x = 0; x < include.onready.length; x += 1) {
		if (!include.onready[x]) {
			continue;
		}

		include.onready[x]();
		include.onready[x] = null;
	}
}

include.css = function (path, opts) {
	var head = document.getElementsByTagName('head')[0];
	var link = document.createElement('link');
	link.rel = "stylesheet"
	link.type = "text/css"
	link.href = path;

	if (opts && opts.prepend) {
		head.insertBefore(link, head.childNodes[0]);
	}
	else {
		head.appendChild(link);
	}
}

},{}],2:[function(require,module,exports){
var includejs = require('../')

//export a global
include = includejs;

//this is for backwards compatibility in my
//own code. Sorry for the pollution; npm
//didn't exist 10 years ago...
include_once = includejs.once;
include_css = includejs.css;

},{"../":1}]},{},[2]);
