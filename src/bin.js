#!/usr/bin/env node
import minimist from 'minimist'
import mergeDirs, {conflictResolvers} from './index'
const argv = minimist(process.argv.slice(2))

const helpString = `Usage: merge-dirs source destination --[conflict resolver(overwrite|skip|ask)]`
if (argv.help) {
  console.log(helpString)
  process.exit()
}
if (!argv._ || argv._.length !== 2) {
  console.log(helpString)
  process.exit()
}

let resolver = conflictResolvers.skip
if (argv.overwrite) {
  resolver = conflictResolvers.overwrite
} else if (argv.interactive || argv.ask) {
  resolver = conflictResolvers.ask
}

mergeDirs(argv._[0], argv._[1], resolver)
