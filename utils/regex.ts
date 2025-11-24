export const validations = {
  passwordRegex: /^(?=.*\d)(?=.*[A-Z-ŞÇİÜĞÖ])(?=.*[a-z-şçüğö]).{8,}$/,
  onlyNumber: /[^0-9]+/g,
  specialCharactersRegex:
    /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])|[`~!@#$%^&*()_|+\-=?;:.,'"<>\{\}\[\]\\\/]/g,
  justSpecialCharactersRegex: /[`~!@#$%^&*()_|+\-=?;'"<>\{\}\[\]\\]/g,
};
