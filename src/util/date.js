export default function (dateString) {
  // convert from UTC+0 to UTC+8
  return new Date(Date.parse(dateString) + 3600000).toLocaleString()
}
