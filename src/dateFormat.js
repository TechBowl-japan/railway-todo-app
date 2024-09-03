export const convertToDisplayDate = (string) => {
  return string.slice(0, 16);
};

export const formatDateToISO = (string) => {
  const date = new Date(string);
  date.setHours(date.getHours() + 9);
  const isoString = date.toISOString();
  const formattedString = isoString.slice(0, 19) + 'Z';
  return formattedString;
};

export const formatForDisplay = (isoDateString) => {
  const date = new Date(isoDateString);
  date.setHours(date.getHours() - 9);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}/${month}/${day} ${hours}:${minutes}`;
};
