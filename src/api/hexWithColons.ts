function HexWithColons (hex, num, char) {
  hex = hex.split("").reverse().join("");
  const regex = new RegExp(".{1," + num + "}", "g");
  hex = hex.match(regex).join(char);
  hex = hex.split("").reverse().join("");
  return hex;
}

export { HexWithColons };