(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';function switchSlide(a){return function(){var b=document.querySelector('.flex-control-nav');b.children&&b.children[a]&&b.children[a].children[0]&&b.children[a].children[0].click()}}window&&window.addEventListener('load',function(){var a=document.querySelector('[data-option-index="1"]'),b=0;a&&a.children&&Array.prototype.forEach.call(a.children,function(a){a.classList.contains('swatch-element')&&(a.children[0].addEventListener('click',switchSlide(b)),b+=1)})});

},{}]},{},[1])

//# sourceMappingURL=swatch-new.js.map
