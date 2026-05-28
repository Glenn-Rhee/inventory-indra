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
    const minutes = expDate.getMinutes();
    const seconds = expDate.getSeconds();
    result += `, ${hours}:${minutes}:${seconds}`;
  }

  return result;
}
