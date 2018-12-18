// https://github.com/shelljs/shelljs#command-reference
// https://devhints.io/shelljs
// https://github.com/shelljs/shelljs/wiki/The-make-utility
require('shelljs/make');

config.fatal = true;
config.verbose = true;

target.all = () => {
  target.clean();
  target.generateTrieJson();
  target.compileBabel();
  target.rollupUMD();
  target.rollupUMDMin();
};

target.generateTrieJson = () => {
  mkdir('es')
  mkdir('lib')
  mkdir('dist')
  exec('babel-node src/generate.js');
  cp('data.json', 'trie.json', 'src');
  cp('data.json', 'trie.json', 'es');
  cp('data.json', 'trie.json', 'lib');
};

target.compileBabel = () => {
  env.MODULE_TYPE = 'es6';
  exec(`babel src/index.js --out-dir es`);
  env.MODULE_TYPE = 'commonjs';
  exec(`babel src/index.js --out-dir lib`);
}

target.rollupUMD = () => {
  target.generateTrieJson();
  env.UGLIFY = false;
  exec('rollup -c rollup.config.js -o dist/unicode-properties.js');
};

target.rollupUMDMin = () => {
  target.generateTrieJson();
  env.UGLIFY = true;
  exec('rollup -c rollup.config.js -o dist/unicode-properties.min.js');
};

target.clean = () => {
  rm('-rf', 'data.json', 'trie.json', 'src/data.json', 'src/trie.json', 'dist', 'lib', 'es');
};
