/*

  (The MIT License)

  Copyright (C) 2005-2013 Kai Davenport

  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

 */
import fs from 'node-fs'
import inquirer from 'inquirer'
import path from 'path'

export const conflictResolvers = {
  ask: 'ask',
  skip: 'skip',
  overwrite: 'overwrite'
}

function copyFile (file, location) {
  fs.mkdirSync((file).split('/').slice(0, -1).join('/'), 0x1ed, true)
  fs.writeFileSync(file, fs.readFileSync(location))
}

function renameQuestionFactory (dest) {
  const defaultNewName = `conflict-${dest.split(path.sep).pop()}`
  return {
    type: 'input',
    name: 'fileName',
    message: 'What do you want to name the second file?',
    default: defaultNewName
  }
}

function conflictQuestionFactory (f1, f2) {
  return {
    type: 'list',
    name: 'resolution',
    message: `conflict: ${f1} - ${f2}`,
    choices: ['skip', new inquirer.Separator(), 'overwrite', new inquirer.Separator(), 'keep both']
  }
}

function saveRenamedFile (src, dest) {
  return (answer) => {
    const newName = answer.fileName
    const newDest = dest.split(path.sep).slice(0, -1).join(path.sep) + path.sep + newName
    copyFile(newDest, src)
  }
}

function resolveConflict (src, dest) {
  return (answer) => {
    switch (answer.resolution) {
      case 'overwrite':
        copyFile(src, dest)
        break
      case 'keep both':
        inquirer.prompt([renameQuestionFactory(dest)], saveRenamedFile(src, dest))
        break
      default:

    }
  }
}

function fileAsk (src, dest) {
  var question = conflictQuestionFactory(src, dest)
  inquirer.prompt([question], resolveConflict(src, dest))
}

export default function mergeDirs (src, dest, conflictResolver = conflictResolvers.skip) {
  // handle false, for backward compatability
  if (conflictResolver === false) {
    conflictResolver = conflictResolvers.skip
  } else if (conflictResolver === true) {
    conflictResolver = conflictResolvers.overwrite
  }
  const files = fs.readdirSync(src)

  files.forEach((file) => {
    const srcFile = '' + src + '/' + file
    const destFile = '' + dest + '/' + file
    const stats = fs.lstatSync(srcFile)

    if (stats.isDirectory()) {
      mergeDirs(srcFile, destFile, conflictResolver)
    } else {
      // console.log({srcFile, destFile}, 'conflict?', fs.existsSync(destFile))
      if (!fs.existsSync(destFile)) {
        copyFile(destFile, srcFile)
      } else {
        switch (conflictResolver) {
          case conflictResolvers.ask:
            fileAsk(srcFile, destFile)
            break
          case conflictResolvers.overwrite:
            copyFile(destFile, srcFile)
            break
          case conflictResolvers.skip:
            console.log(`${destFile} exists, skipping...`)
        }
      }
    }
  })
}
