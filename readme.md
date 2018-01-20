**NOTE:** All credit for this code belongs to the developers of https://github.com/devongovett/unicode-properties
# Purpose of this Fork
This fork was created for use in https://github.com/Hopding/pdf-lib.

The original repository serialized and loaded the trie data using a binary file. This worked fine in Node, because `fs.readFileSync` was being called to load the serialized data into a `Buffer` object. In order to support use in the browser, Browserify and [`brfs`](https://github.com/browserify/brfs) were used to inline the binary data in the `index.js` file, and thereby remove the call to `fs.readFileSync`.

This works fine if you are in a Node environment, or are using Browserify to bundle your code for use in the browser. But it doesn't work so well if you aren't doing either of those things. E.g. I was writing an app built with `create-react-app`, and the binary data was not being inlined for this dependency.

I resolved this by simply serializing the trie data to a JSON file, which allows it to be loaded into the `index.js` file without using Browserify. Of course, this means that the trie data is not stored as efficiently, but that is not a concern for me.

# unicode-properties

Provides fast access to unicode character properties. Uses [unicode-trie](https://github.com/devongovett/unicode-trie) to compress the
properties for all code points into just 12KB.

## Usage

    npm install unicode-properties

```javascript
var unicode = require('unicode-properties');

unicode.getCategory('2'.charCodeAt()) //=> 'Nd'
unicode.getNumericValue('2'.charCodeAt()) //=> 2
```

## API

### getCategory(codePoint)

Returns the unicode [general category](http://www.fileformat.info/info/unicode/category/index.htm) for the given code point.

### getScript(codePoint)

Returns the [script](http://unicode.org/standard/supported.html) for the given code point.

### getCombiningClass(codePoint)

Returns the [canonical combining class](http://unicode.org/glossary/#combining_class) for the given code point.

### getEastAsianWidth(codePoint)

Returns the [East Asian width](http://www.unicode.org/reports/tr11/tr11-28.html) for the given code point.

### getNumericValue(codePoint)

Returns the numeric value for the given code point, or null if there is no numeric value for that code point.

### isAlphabetic(codePoint)

Returns whether the code point is an alphabetic character.

### isDigit(codePoint)

Returns whether the code point is a digit.

### isPunctuation(codePoint)

Returns whether the code point is a punctuation character.

### isLowerCase(codePoint)

Returns whether the code point is lower case.

### isUpperCase(codePoint)

Returns whether the code point is upper case.

### isTitleCase(codePoint)

Returns whether the code point is title case.

### isWhiteSpace(codePoint)

Returns whether the code point is whitespace: specifically, whether the category is one of Zs, Zl, or Zp.

### isBaseForm(codePoint)

Returns whether the code point is a base form. A code point of base form does not graphically combine with preceding
characters.

### isMark(codePoint)

Returns whether the code point is a mark character (e.g. accent).

## License

MIT
