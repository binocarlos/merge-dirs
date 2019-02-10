/*

	(The MIT License)

	Copyright (C) 2005-2013 Kai Davenport

	Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

 */

/*
  Module dependencies.
*/
import mergedirs from '../src'
import fs from 'node-fs'

/* globals describe, it */
describe('merge dirs', function () {
  it('should merge 2 folders', function (done) {
    fs.mkdirSync(__dirname + '/c')
    mergedirs(__dirname + '/a', __dirname + '/c')
    mergedirs(__dirname + '/b', __dirname + '/c')
		//
    fs.existsSync(__dirname + '/c/hello.txt').should.equal(true)
    fs.existsSync(__dirname + '/c/world.txt').should.equal(true)
    done()
  })
  it('should merge 2 folders and change the extension', function (done) {
    fs.mkdirSync(__dirname + '/d')
    mergedirs(__dirname + '/a', __dirname + '/d')
    mergedirs(__dirname + '/b', __dirname + '/d', 'skip', (fileName) => fileName.substr(0, fileName.lastIndexOf(".")) + ".html")
		//
    fs.existsSync(__dirname + '/d/hello.txt').should.equal(true)
    fs.existsSync(__dirname + '/d/hello.html').should.equal(true)
    fs.existsSync(__dirname + '/d/world.html').should.equal(true)
    done()
  })
})
