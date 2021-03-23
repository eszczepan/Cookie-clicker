export const nFormatter = (num: number) => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(3).replace(/\.0$/, '') + ' bilion';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(3).replace(/\.0$/, '') + ' million';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(3);
  }
  return num;
};
