import regExp from "@/utilities/RegExp";

// Trims, then replaces 2+ spaces, or any other whitespace character individually, with a single space
export function cleanString(text: string): string {
  return text.trim().replace(regExp.invalidWhitespace, " ");
}

export function isStringPrintableASCII(text: string) {
  return validateString(text, regExp.printableASCII);
}

// @NOTE This function's intended purpose is not utilized for the public release
export function isStringS3Safe(text: string) {
  return validateString(text, regExp.safeForS3);
}

// https://stackoverflow.com/a/196991
export function toTitleCase(text: string) {
  return text.replace(regExp.individualWords, (word) => {
    return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
  });
}

export function removeFirstWord(text: string): string {
  // Split text into chunks
  const chunks = text.split(" ");
  // Remove the first chunk
  chunks.shift();
  // Rejoin the chunks
  return chunks.join(" ");
}

function validateString(text: string, regex: RegExp): boolean {
  return regex.test(text);
}
