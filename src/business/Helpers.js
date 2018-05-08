var convert = require('convert-units');

export const formatNumbers = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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