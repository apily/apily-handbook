/* !
 * apily-builder
 * component builder
 * Copyright (c) 2012 Enrico Marino and Federico Spini
 * MIT License
 */

/**
 * Module dependencies.
 */

var path = require('path');
var fs = require('fs');
var async = require('async');
var handlebars = require('handlebars');

exports.version = '0.0.0';

var templates = {};
var templates_dir = './templates';
var templates_ext = '.tmpl';

var read_template = function (file, callback) {
  fs.readFile(file, 'utf8', function (err, data) {
    if (err) throw err;

    var name = path.basename(file, templates_ext);
    templates[name] = data;
    callback();
  });
};

var read_templates = function (dir, callback) {
  fs.readdir(dir, function (err, files) {
    if (err) throw err;

    async.forEach(files, function (file, callback) {
      var file = path.join(dir, file);
      read_template(file, callback);
    }, callback);
  });
};

exports.init = function (callback) {
  read_templates(templates_dir, callback);
};

exports.init(function (err) {
  if (err) {
    console.error(err);
  }
  
  console.dir(templates);
});

exports.build = function (data) {

  
};