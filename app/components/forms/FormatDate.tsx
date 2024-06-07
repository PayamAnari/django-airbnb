import { differenceInDays, differenceInMonths, differenceInYears } from 'date-fns';
import { format } from 'date-fns';



export const formatDate = (date) => {
  const now = new Date();
  const inputDate = new Date(date);

  const daysDifference = differenceInDays(now, inputDate);
  const monthsDifference = differenceInMonths(now, inputDate);
  const yearsDifference = differenceInYears(now, inputDate);

  if (yearsDifference > 0) {
    return `${yearsDifference} year${yearsDifference > 1 ? 's' : ''}`;
  } else if (monthsDifference > 0) {
    return `${monthsDifference} month${monthsDifference > 1 ? 's' : ''}`;
  } else {
    return `${daysDifference} day${daysDifference > 1 ? 's' : ''}`;
  }
};

export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return format(date, 'MMMM d, yyyy, hh:mm aa');
};