const camelCase = (string) => {
  if (!string || typeof string != "string" || !string.trim())
    throw "string must be a non-empty string";
  return string
    .trim()
    .split(" ")
    .map((word, ind) => {
      if (ind === 0) return word.toLowerCase();
      return word[0].toUpperCase() + word.slice(1).toLowerCase();
    })
    .join("");
};

const replaceChar = (string) => {
  if (!string || typeof string != "string")
    throw "string must be a non-empty string";
  const trimmedInput = string.trim();
  if (!trimmedInput) throw "string must have a non-space character";
  const firstLetter = trimmedInput[0].toLowerCase();
  let symbol = "*";
  let found = false;
  return string
    .split("")
    .map((letter) => {
      if (letter.toLowerCase() === firstLetter) {
        if (!found) {
          found = true;
          return letter;
        }
        let currentSymbol = symbol;
        symbol = symbol === "*" ? "$" : "*";
        return currentSymbol;
      } else return letter;
    })
    .join("");
};

const mashUp = (string1, string2) => {
  if (!string1 || typeof string1 != "string" || string1.length < 2)
    throw "string1 must be a string with at least 2 characters";
  if (!string2 || typeof string2 != "string" || string2.length < 2)
    throw "string2 must be a string with at least 2 characters";

  return `${string2.substring(0, 2)}${string1.substring(2)} ${string1.substring(
    0,
    2
  )}${string2.substring(2)}`;
};

module.exports = {
  camelCase,
  mashUp,
  replaceChar,
};
