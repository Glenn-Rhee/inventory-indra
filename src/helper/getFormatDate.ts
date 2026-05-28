export function getFormatDate(date: Date, isForExpDate?: boolean) {
  const expDate = new Date(date);
  const dateDay = expDate.getDate();
  let day = "";
  //  3
  if (dateDay.toString().length === 1) {
    // 03
    day = "0" + dateDay;
  } else {
    // 13 -> 13
    day = dateDay.toString();
  }

  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const dateMonth = expDate.getMonth();
  //   Agustus
  const month = months[dateMonth];

  const year = expDate.getFullYear();
  let result = `${day} ${month} ${year}`;
  if (!isForExpDate) {
    const hours = expDate.getHours();
    const hoursStr = hours < 10 ? `0${hours}` : hours.toString();
    const minutes = expDate.getMinutes();
    const minutesStr = minutes < 10 ? `0${minutes}` : minutes.toString();
    const seconds = expDate.getSeconds();
    const secondsStr = seconds < 10 ? `0${seconds}` : seconds.toString();
    result += `, ${hoursStr}:${minutesStr}:${secondsStr}`;
  }

  return result;
}
