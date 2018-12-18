// https://github.com/shelljs/shelljs#command-reference
// https://devhints.io/shelljs
// https://github.com/shelljs/shelljs/wiki/The-make-utility
require('shelljs/make');

config.fatal = true;
config.verbose = true;

target.all = () => {
  target.clean();
  target.generateTrieJson();
  target.rollupUMD();
  target.rollupUMDMin();
};

target.generateTrieJson = () => {
  exec('node generate.js');
};

target.rollupUMD = () => {
  target.generateTrieJson();
  env.UGLIFY = false;
  exec('rollup -c rollup.config.js -o unicode-properties.js');
};

target.rollupUMDMin = () => {
  target.generateTrieJson();
  env.UGLIFY = true;
  exec('rollup -c rollup.config.js -o unicode-properties.min.js');
};

target.clean = () => {
  rm('-f', 'data.json', 'trie.json', 'unicode-properties.js', 'unicode-properties.min.js');
};
