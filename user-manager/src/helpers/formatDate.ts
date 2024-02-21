/**
 * Formats a date string into a localized date and time string representation.
 * @param data - The date string to format.
 * @returns A string representing the formatted date and time in the user's locale.
 */
export const formatDate = (data: string) => {
  const dateData = new Date(data);
  return dateData.toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'medium'
  });
};
