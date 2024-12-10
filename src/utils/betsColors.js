export function getColorByRange(number) {
  if (number >= 500 && number <= 999) {
    return '#DA4297';
  } else if (number >= 1000 && number <= 9999) {
    return '#1E4E98';
  } else if (number >= 10000 && number <= 99999) {
    return '#00BAED';
  } else if (number >= 100000 && number <= 499999) {
    return '#631D97';
  } else if (number >= 500000) {
    return '#E31A3C';
  }
}
