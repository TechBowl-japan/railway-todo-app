export const toISOStringWithTimezone = date => {
    //参考wiki https://zenn.dev/shuh/articles/javascript-iso8601
    const year = date.getFullYear().toString();
    const month = zeroPadding((date.getMonth() + 1).toString());
    const day = zeroPadding(date.getDate().toString());

    const hour = zeroPadding(date.getHours().toString());
    const minute = zeroPadding(date.getMinutes().toString());
    const second = zeroPadding(date.getSeconds().toString());

    const localDate = `${year}-${month}-${day}`;
    const localTime = `${hour}:${minute}:${second}`;

    const diffFromUtc = date.getTimezoneOffset();

    // UTCだった場合
    if (diffFromUtc === 0) {
      const tzSign = 'Z';
      return `${localDate}T${localTime}${tzSign}`;
    }

    // UTCではない場合
    const tzSign = diffFromUtc < 0 ? '+' : '-';
    const tzHour = zeroPadding((Math.abs(diffFromUtc) / 60).toString());
    const tzMinute = zeroPadding((Math.abs(diffFromUtc) % 60).toString());

    return `${localDate}T${localTime}${tzSign}${tzHour}:${tzMinute}`;
    
  };

  const zeroPadding = s => {
    return ('0' + s).slice(-2);
  };
