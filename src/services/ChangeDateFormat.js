export const ChangeDateFormat = (date) => {
  // alert(date);
  var y = 365;
  var y2 = 31;
  var remainder = date % y;
  var day = remainder % y2;
  var year = (date - remainder) / y;
  var month = (remainder - day) / y2;

  var result = year + "Y " + month + "M " + day + "D";

  return result;
};
