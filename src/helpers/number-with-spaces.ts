// TODO: Unit Test
// TOOD: handle null
export const numberWithSpaces = (x: string | number): string => {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return parts.join(".");
};
