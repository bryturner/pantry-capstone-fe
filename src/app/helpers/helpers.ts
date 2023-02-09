export const formatString = (str: string): string => {
  return str.trim().replace(/\s+/g, ' ');
};

export const calculateCalories = (
  calories: number | undefined,
  amount: number | undefined
): number => {
  if (!calories || !amount) return 0;
  return Math.trunc(calories * amount);
};
