export const vertical = (val = 20) => [val, 0];
export const horizontal = (val = 20) => [0, val];
export const topAndHorizontal = (val = 20) => [val, val, 0, val];
export const bottomAndHorizontal = (val = 20) => [0, val, val, val];
export const onlyTop = (val = 5) => [val, val, 0, 0];
export const onlyBottom = (val = 5) => [0, 0, val, val];
export const onlyLeft = (val = 5) => [val, 0, 0, val];
export const onlyRight = (val = 5) => [0, val, val, 0];
export const border = (color: string, size: number = 1, type: string = 'solid') => `${size}px ${type} ${color}`;
export const transition = (timingInMs: number = 150, property: string = 'all', mode: string = 'linear') =>
  `${property} ${timingInMs}ms ${mode}`;
