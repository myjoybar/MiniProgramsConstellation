function formatTime(time) {
  if (typeof time !== 'number' || time < 0) {
    return time
  }

  var hour = parseInt(time / 3600)
  time = time % 3600
  var minute = parseInt(time / 60)
  time = time % 60
  var second = time

  return ([hour, minute, second]).map(function (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }).join(':')
}


//数据转化  
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/** 
 * 时间戳转化为年 月 日 时 分 秒 
 * number: 传入时间戳 
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致 
*/
function formatTimeWithFormat(number, format) {

  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];

  var date = new Date(number * 1000);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));

  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
} 

function getWeek(date) {
  var week;
  if (date.getDay() == 0) week = "周日"
  if (date.getDay() == 1) week = "周一"
  if (date.getDay() == 2) week = "周二"
  if (date.getDay() == 3) week = "周三"
  if (date.getDay() == 4) week = "周四"
  if (date.getDay() == 5) week = "周五"
  if (date.getDay() == 6) week = "周六"
  return week;
} 

module.exports = {
  formatTime: formatTime,
  formatTimeWithFormat: formatTimeWithFormat,
  getWeek: getWeek,
}