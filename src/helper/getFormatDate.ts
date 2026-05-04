export function getFormatDate(date: Date) {
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
  return `${day} - ${month} - ${year}`;
}
