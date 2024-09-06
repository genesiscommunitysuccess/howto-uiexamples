/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable no-magic-numbers */
export const hoursFromTimestamp = (timestamp: number) => {
  if (!timestamp) return null;
  return new Date(timestamp).getHours();
};

export const timeOfDay = (h: number) => {
  if (!Number.isInteger(h)) return null;
  if (h < 0 || h > 24) return null;
  if (h < 6) return 'night';
  if (h < 12) return 'morning';
  if (h < 17) return 'afternoon';
  if (h < 21) return 'evening';
  return 'night';
};

export const convertSnakeToCamel = (value: string, upperCamel = false): string => {
  if (typeof value !== 'string' || !value?.length) return null;
  return value
    .trim()
    .split('_')
    .map((val, index) => {
      const lowerCase = val.toLowerCase();
      if (index === 0 || upperCamel) {
        return `${lowerCase.substring(0, 1).toUpperCase()}${lowerCase.slice(1, lowerCase.length)}`;
      }
      return lowerCase;
    })
    .join(' ');
};
