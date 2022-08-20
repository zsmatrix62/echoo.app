function theDay(date) {
  return Math.ceil(
    (new Date(date) - new Date(new Date(date).getFullYear().toString())) /
      (24 * 60 * 60 * 1000) +
      1
  )
}

function theWeek(now) {
  //输入日期是年的第几天
  var days = theDay(now)
  //输入日期年的一月一日是周几
  var startWeek = new Date(
    new Date(now).getFullYear().toString() + '/01/01'
  ).getDay()
  //输入日期是年的第几周
  var weeks = Math.ceil((days + startWeek - 1) / 7)
  return weeks
}

/*
 ** 时间戳转换成指定格式日期
 ** eg.
 ** dateFormat(11111111111111, 'Y年m月d日 H时i分')
 ** → "2322年02月06日 03时45分"
 */
var dateFormat = function (timestamp, formats) {
  // formats格式包括
  // 1. Y-m-d
  // 2. Y-m-d H:i:s
  // 3. Y年m月d日
  // 4. Y年m月d日 H时i分
  formats = formats || 'Y-m-d'

  var zero = function (value) {
    if (value < 10) {
      return '0' + value
    }
    return value
  }

  var myDate = timestamp ? new Date(timestamp) : new Date()

  var year = myDate.getFullYear()
  var month = zero(myDate.getMonth() + 1)
  var day = zero(myDate.getDate())

  var hour = zero(myDate.getHours())
  var minite = zero(myDate.getMinutes())
  var second = zero(myDate.getSeconds())

  return formats.replace(/Y|m|d|H|i|s/gi, function (matches) {
    return {
      Y: year,
      m: month,
      d: day,
      H: hour,
      i: minite,
      s: second,
    }[matches]
  })
}

function isLeap(now) {
  return Math.round(now.getYear() / 4) == now.getYear() / 4
}

export { theDay, theWeek, isLeap, dateFormat }
