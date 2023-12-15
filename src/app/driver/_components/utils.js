import axios from "axios";

const digitToChinese = ["日", "ㄧ", "二", "三", "四", "五", "六"];

export function getDate(date) {
  let d = new Date(date);
  return `${d.getMonth() + 1} 月 ${d.getDate()} 日 (${digitToChinese[d.getDay()]
    })`;
}

export function getTime(datetime) {
  let d = new Date(datetime);
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

export function dateToString(timestamp) {
  let d = new Date(timestamp);
  let period = 0 < d.getHours() && d.getHours() <= 12 ? "上午" : "下午";
  let hours = d.getHours() == 0 || d.getHours() == 12 ? 12 : d.getHours() % 12;
  return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()} ${period} ${hours}:${d.getMinutes()}`;
}

export function getStationList() {
  return axios(`${process.env.NEXT_PUBLIC_API_ROOT}/stations`, {
    method: 'get',
    withCredentials: true,
  }).then((res) => {
    return res.data
  })
}

export function transformBackendRouteData(route) {
  return {
    ...route,
    stations: route.stations.map((station) => ({
      id: station.id,
      time: getTime(station.datetime),
      passengers: [
        ...station["on-passengers"],
        ...station["off-passengers"],
      ].map((passId) =>
        route.passengers.find((pass) => pass.id == passId),
      ),
    })),
  }
}

export function validateRouteStations(stations) {

  for (let station of stations) {
    if (!(station.hasOwnProperty("time") && station["time"] != "")) {
      return { validated: false, message: "路線中有缺少時間的站點" }
    }
    if (!(station.hasOwnProperty("id") && station["id"] >= 0)) {
      return { validated: false, message: "路線中有缺少停靠地點的站點" }
    }
  }
  if (
    new Set(stations.map((station) => station.time)).size != stations.length
  ) {
    return { validated: false, message: "路線中有重複的停靠時間" }
  }
  if (
    new Set(stations.map((station) => station.id)).size != stations.length
  ) {
    return { validated: false, message: "路線中有重複的停靠站點" }
  }

  return { validated: true }
}

export function validateNotNull(value) {
  if (value == "")
    return { validated: false, message: "此欄位不可為空" }
  else
    return { validated: true }
}

export function validateIsNumber(value) {
  if (isNaN(parseInt(value)))
    return { validated: false, message: "此欄位必須為數字" }
  else
    return { validated: true }
}