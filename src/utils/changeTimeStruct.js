const getTimeDifference = (stringDate) => {
  const date = new Date(stringDate);
  const now = new Date();

  const jstDate = new Date(date.getTime() - (9 * 60 * 60 * 1000));

  let difference = Math.floor((jstDate - now) / (1000 * 60));

  const days = Math.floor(difference / (24 * 60));
  difference %= 24 * 60;
  const hours = Math.floor(difference / 60);
  const minutes = difference % 60;

  return `${days}日 ${hours}時間 ${minutes}分後`;
};

const changeToDateTime = (stringDate) => {
  const date = new Date(stringDate);

  const jstDate = new Date(date.getTime() - (9 * 60 * 60 * 1000));
  
  const month = jstDate.getMonth() + 1;
  const day = jstDate.getDate();
  const hour = jstDate.getHours();
  const min = jstDate.getMinutes();
  
  const formatTwoDigits = (num) => num.toString().padStart(2, '0');

  return `${formatTwoDigits(month)}/${formatTwoDigits(day)} ${formatTwoDigits(hour)}:${formatTwoDigits(min)}`;
};

export { getTimeDifference, changeToDateTime };