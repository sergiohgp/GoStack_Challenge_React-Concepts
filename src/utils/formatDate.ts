const formatDate = (date: number | Date): string =>
  Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  }).format(date);

export default formatDate;
