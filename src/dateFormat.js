export const formatForDisplay = (string) => {
  return string.slice(0, 16);
};

export const formatDateToISO = (string) => {
  const date = new Date(string);
  date.setHours(date.getHours() + 9);
  const isoString = date.toISOString();
  const formattedString = isoString.slice(0, 19) + 'Z';
  return formattedString;
};
