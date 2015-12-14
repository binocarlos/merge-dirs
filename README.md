merge-dirs
==========

node module to synchronously and recursively merge files from one folder to another

```js
var mergedirs = require('merge-dirs');

// copy folder/a into folder/b
mergedirs('/folder/a', '/folder/b');
// copy folder/a into folder/b with conflict resolution 'overwrite'
mergedirs('/folder/a', '/folder/b', 'overwrite');
// copy folder/a into folder/b with conflict resolution 'ask'
mergedirs('/folder/a', '/folder/b', 'ask');
// copy folder/a into folder/b with conflict resolution 'skip'
mergedirs('/folder/a', '/folder/b', 'skip');
```

mergedirs can also be used from the command line
``` bash
$ merge-dirs folder/a folder/b --ask # for interactive mode
```

## install

```
$ npm install merge-dirs
```

## licence

MIT
