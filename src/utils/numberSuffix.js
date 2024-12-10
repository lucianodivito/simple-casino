export function abreviarNumero(number) {
  const suffixes = ['', 'k', 'M', 'B', 'T'];

  let i = 0;
  while (number >= 1000 && i < suffixes.length - 1) {
    number /= 1000;
    i++;
  }

  const formattedNumber = number.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: number % 1 !== 0 ? 2 : 0,
  });

  return formattedNumber + suffixes[i];
}
