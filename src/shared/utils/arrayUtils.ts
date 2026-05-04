export const groupBy = <T>(arr: T[], key: keyof T): Record<string, T[]> => {
  return arr.reduce<Record<string, T[]>>((acc, item) => {
    const group = String(item[key]);
    acc[group] = acc[group] ? [...acc[group], item] : [item];
    return acc;
  }, {});
};

export const sortByKey = <T>(arr: T[], key: keyof T, direction: "asc" | "desc" = "asc"): T[] => {
  return [...arr].sort((a, b) => {
    const valA = a[key];
    const valB = b[key];
    if (valA < valB) return direction === "asc" ? -1 : 1;
    if (valA > valB) return direction === "asc" ? 1 : -1;
    return 0;
  });
};

export const removeDuplicates = <T>(arr: T[], key: keyof T): T[] => {
  const seen = new Set();
  return arr.filter((item) => {
    const val = item[key];
    if (seen.has(val)) return false;
    seen.add(val);
    return true;
  });
};
