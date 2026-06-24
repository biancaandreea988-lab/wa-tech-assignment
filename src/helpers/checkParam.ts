export const checkParam = (param: number): boolean => {
  return !Number.isNaN(param) && param >= 1;
};
