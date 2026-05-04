export const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isRequired = (value: unknown): boolean => {
  if (typeof value === "string") return value.trim().length > 0;
  return value !== null && value !== undefined;
};
