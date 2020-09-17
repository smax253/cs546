const camelCase = (string) => {
  if (!string || typeof string != "string")
    throw "string must be a non-empty string";
  return string
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

  const firstLetter = string[0].toLowerCase();
  let symbol = "*";
  return string
    .split("")
    .map((letter, ind) => {
      if (ind === 0) return letter;
      else if (letter.toLowerCase() === firstLetter) {
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
