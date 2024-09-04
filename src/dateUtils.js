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

  return `${year}年${month}月${day}日 ${hours}時${minutes}分`;
};

export const getTimeDifference = (string) => {
  const deadLine = new Date(string);
  const currentTime = new Date();
  const timeDifference = deadLine - currentTime;

  if (timeDifference < 0) {
    return '期限が過ぎています';
  }

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  return `残り時間：${days}日 ${hours % 24}時${minutes % 60}分`;
};
