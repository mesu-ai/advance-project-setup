export const formatDateTime = (input: string): string => {
  const date = new Date(input);

  if (isNaN(date.getTime())) return '';

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');

  const ampm = hours >= 12 ? 'pm' : 'am';

  hours = hours % 12 || 12; // convert to 12h format
  const formattedHours = String(hours).padStart(2, '0');

  return `${day}.${month}.${year} ${formattedHours}.${minutes} ${ampm}`;
};
