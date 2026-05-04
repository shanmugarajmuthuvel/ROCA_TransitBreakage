export const formatDate = (isoDate: string, format = "dd MMM yyyy"): string => {
  const date = new Date(isoDate);
  if (isNaN(date.getTime())) return "";
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  return format
    .replace("dd", day)
    .replace("MMM", month)
    .replace("yyyy", String(year));
};

export const isOverdue = (isoDate: string): boolean => {
  return new Date(isoDate) < new Date();
};
