import axios from "axios";

const digitToChinese = ["日", "ㄧ", "二", "三", "四", "五", "六"];

export function getDate(date) {
  let d = new Date(date);
  return `${d.getMonth() + 1} 月 ${d.getDate()} 日 (${
    digitToChinese[d.getDay()]
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
  return `${d.getFullYear()}/${d.getMonth()}/${d.getDate()} ${period} ${hours}:${d.getMinutes()}`;
}

export function getStationList() {
  return axios
  .get(`${process.env.NEXT_PUBLIC_API_ROOT}/stations`, {
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
  
}