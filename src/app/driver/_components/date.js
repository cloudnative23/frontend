const digitToChinese = ["日", "ㄧ", "二", "三", "四", "五", "六"]

export function getDate(date) {
    let d = new Date(date)
    return `${d.getUTCMonth() + 1} 月 ${d.getUTCDate() + 1} 日 (${digitToChinese[d.getDay()]})`
}

export function getTime(datetime) {
    let d = new Date(datetime)
    return `${d.getHours()}：${d.getMinutes()}`
}