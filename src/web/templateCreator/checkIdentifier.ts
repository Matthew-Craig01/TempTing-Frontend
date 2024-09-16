const banned = [" ", ",", "{", "}", "(", ")", "_", "<", ":", '"'];

export const checkIdentifier = (s: string) => {
  for (let c of s) {
    if (banned.includes(c)) {
      if (c === " ") {
        return "SPACE";
      }
      return c;
    }
  }
  return null;
};
