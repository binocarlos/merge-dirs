/*

  (The MIT License)

  Copyright (C) 2005-2013 Kai Davenport

  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

 */
var fs = require("node-fs");

module.exports = function mergeDirs(f1, f2) {
  var file, files, stats, _i, _len, _results;
  files = fs.readdirSync(f1);
  _results = [];
  for (_i = 0, _len = files.length; _i < _len; _i++) {
    file = files[_i];
    stats = fs.lstatSync("" + f1 + "/" + file);
    if (stats.isDirectory()) {
      mergeDirs("" + f1 + "/" + file, "" + f2 + "/" + file)
    } else {
      if (!fs.existsSync("" + f2 + "/" + file)) {
        fs.mkdirSync(("" + f2 + "/" + file).split("/").slice(0, -1).join("/"), 0x1ed, true);
        fs.writeFileSync("" + f2 + "/" + file, fs.readFileSync("" + f1 + "/" + file));
      }
    }
  }
};
