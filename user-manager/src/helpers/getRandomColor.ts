/**
 * Generates a random hexadecimal color code.
 * @returns A random hexadecimal color code (e.g., '#RRGGBB').
 */
export const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
