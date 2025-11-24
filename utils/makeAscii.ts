export const makeAscii = (s: string) =>
  s
    .split("")
    .map((c) => {
      switch (c) {
        case "Ş":
          return "S";
        case "Ö":
          return "O";
        case "Ç":
          return "C";
        case "İ":
          return "I";
        case "Ü":
          return "U";
        case "Ğ":
          return "G";
        case "ş":
          return "s";
        case "ö":
          return "o";
        case "ç":
          return "c";
        case "ğ":
          return "g";
        case "ü":
          return "u";
        default:
          return c;
      }
    })
    .join("");

export const searchAscii = (text: string, filter: string) =>
  makeAscii(text).toUpperCase().includes(makeAscii(filter).toUpperCase());
export default makeAscii;
