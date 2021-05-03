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
};

target.generateTrieJson = () => {
  mkdir('lib')
  exec('babel-node src/generate.js');
  cp('src/data.json', 'src/trie.json', 'lib');
};

target.compileBabel = () => {
  env.MODULE_TYPE = 'commonjs';
  exec(`babel src/index.js -D --out-dir lib`);
}

target.clean = () => {
  rm('-rf', 'src/data.json', 'src/trie.json', 'dist', 'lib', 'es');
};
