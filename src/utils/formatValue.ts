const formatValue = (value: number): string =>
  Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'CAD',
  }).format(value);

export default formatValue;
