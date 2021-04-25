export interface RegExpCollection {
  [k: string]: RegExp;
}

const regExp: RegExpCollection = {
  // 2+ spaces, or any other whitespace character individually
  invalidWhitespace: /\s{2,}|[\t\r\n\v\f]/g,
  // ASCII table characters, spaces, and tabs
  printableASCII: /^[\x20-\x7F\x09]+$/,
  // Limited characterset for use with AWS S3
  safeForS3: /^[a-zA-z0-9\s_\,\(\)]+$/,
  // First name + last initial
  firstNameLastInitial: /^\s*[a-zA-z]+\s+[a-zA-z]\.{0,1}\s*$/,
  // Words, with hyphen support
  individualWords: /([^\W_]+[^\s-]*) */g,
  // Surrounding double underscores
  reservedSelectOption: /__.+__/
};

export default regExp;
