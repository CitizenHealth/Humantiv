import convert from 'convert-units';
import moment from 'moment';

export const formatNumbers = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const convertUNIXTimeToString = (number) => {
  var a = new Date(number * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = month + ' ' + date + ' at ' + pad(hour,2) + ':' + pad(min,2) ;
  return time;
}

export const formatDate = (date) => {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return monthNames[monthIndex] + ' ' + day + ', ' + year;
}

export const formatTime = (date) => {

  var time = moment(date)

  return time.format("hh:mm a");  ;
}

export const formatHoursMinutes = (date) => {
  let format = "";
  if (date.getHours() !== 0) {
    format += `${date.getHours()}h `;
  }
  format += `${date.getMinutes()}min`;
  return format;
}

export const displayMeasurementFromMetric = (value, unit) => {
  switch (unit) {
    case 'Lbs':
      return Math.round(convert(value).from('kg').to('lb'));
    case 'Feet':
      return Math.round(convert(value).from('cm').to('ft'));
    case 'Inches':
      return Math.round(convert(value).from('cm').to('in'));;
    default:
      return Math.round(value);
  }
}

export const saveWeightToMetric= (value, unit) => {
  switch (unit) {
    case 'Lbs':
      return convert(value).from('lb').to('kg');
    default:
      return value;
  }
}

export const saveHeightToMetric= (value, unit) => {
  switch (unit) {
    case 'Inches':
      return convert(value).from('in').to('cm');
    default:
      return value;
  }
}

export const timeBetweenDates = (date1, date2) => {

  if (date1 < date2 ) {
    date1.setDate(date1.getDate() + 1);
  }
  var date = new Date(0, 0, 0, 0, 0, 0, date1 - date2);

  return new Date(0, 0, 0, date.getHours(), date.getMinutes(), 0, 0);
}

export const convertMinutesToHours = (minutes) => {
  return parseFloat((minutes/60).toFixed(1));
  // return {
  //   hours: Math.floor(minutes/60),
  //   minutes: minutes % 60
  // }
}

export const convertSecondsToMinutes = (seconds) => {
  return parseFloat((seconds/60).toFixed(1));
  // return {
  //   hours: Math.floor(minutes/60),
  //   minutes: minutes % 60
  // }
}

export const convertArrayToTimeSeries = (array) => {
  var timeSeriesArray = [];
  array.map((item) => {
    timeSeriesArray.push({
      time: time,
      value: value
    })
  });
  return timeSeriesArray;
}

export const convertUNIXTimeToSince = (utime) => {
  return moment(utime * 1000).fromNow();
}

const pad = (num, size) => {
  var s = num+"";
  while (s.length < size) s = "0" + s;
  return s;
}