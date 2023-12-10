const digitToChinese = ["日", "ㄧ", "二", "三", "四", "五", "六"];

export function getDate(date) {
  let d = new Date(date);
  return `${d.getUTCMonth() + 1} 月 ${d.getUTCDate() + 1} 日 (${
    digitToChinese[d.getDay()]
  })`;
}

export function getTime(datetime) {
  let d = new Date(datetime);
  return `${d.getHours()}：${d.getMinutes()}`;
}

export function dateToString(timestamp) {
  let d = new Date(timestamp);
  let period = 0 < d.getHours() && d.getHours() <= 12 ? "上午" : "下午";
  let hours = d.getHours() == 0 || d.getHours() == 12 ? 12 : d.getHours() % 12;
  return `${d.getFullYear()}/${d.getMonth()}/${d.getDate()} ${period} ${hours}:${d.getMinutes()}`;
}
