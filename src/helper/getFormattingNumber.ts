export const getFormatNumber = (v: string | number) => {
  const sanitized = String(v).replace(/[^0-9]/g, "");
  const parsed = sanitized === "" ? 0 : parseInt(sanitized, 10);
  return parsed;
};
