#!/usr/bin/env node
var fs = require("fs"),
    _ = require('underscore'),
    momemt = require('moment')

var args = process.argv.slice(2)
if (args.length < 1)
  path = __dirname
else
  path = args[0]

var ignoreHidden = true

var LIMIT = 10
if (args.length >= 2)
  LIMIT = parseFloat(args[1])

var FILTER = null
if (args.length >= 3)
  FILTER = args[2]

function scanDir (path) {
  var now = new Date().getTime()
  // Strip a trailing slash
  path = path.replace(/\/$/, '')
  var queue = [path]
  var all = []
  while (queue.length) {
    var dir = queue.pop()
    var files = fs.readdirSync(dir)
    
    if (ignoreHidden)
      files = _.filter(files, function (name) {return name.substr(0,1) != '.'})
    
    _.each(files, function (file, index, list) {
      var filepath = dir + '/' + file
      var stat = fs.statSync(filepath)
      if (stat.isDirectory())
        queue.push(filepath)
      else if (!FILTER || (FILTER && file == FILTER))
        all.push([filepath, now - stat.mtime])
    })
  }
  all = _.sortBy(all, function(file){ return file[1] })
  // all = all.reverse()
  // show top 10
  if (all.length < LIMIT)
    LIMIT = all.length
  console.log(LIMIT + ' recently updated files:')
  for (i = 0; i < LIMIT; i++) {
    console.log(all[i][0] + ' ' + (all[i][1]/60000).toFixed(0) + ' minutes ago ')
  }
}

scanDir(path)
