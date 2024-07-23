export const getDownloadProgressColor = (percent: number): string => {
  if (percent == 90) return "green";
  if (percent >= 65) return "lime";
  if (percent >= 40) return "yellow";
  if (percent >= 15) return "orange";
  return "red";
};
