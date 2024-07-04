import { differenceInDays, differenceInMonths, differenceInYears, differenceInHours, differenceInMinutes } from 'date-fns';
import { format } from 'date-fns';




export const formatDate = (date) => {
  const now = new Date();
  const inputDate = new Date(date);

  const daysDifference = differenceInDays(now, inputDate);
  const monthsDifference = differenceInMonths(now, inputDate);
  const yearsDifference = differenceInYears(now, inputDate);
  const hoursDifference = differenceInHours(now, inputDate);
  const minutesDifference = differenceInMinutes(now, inputDate);
  const weeksDifference = Math.floor(daysDifference / 7);

  if (yearsDifference > 0) {
    return `${yearsDifference} year${yearsDifference > 1 ? 's' : ''}`;
  } else if (monthsDifference > 0) {
    return `${monthsDifference} month${monthsDifference > 1 ? 's' : ''}`;
  } else if (weeksDifference > 0) {
    return `${weeksDifference} week${weeksDifference > 1 ? 's' : ''}`;
  } else if (daysDifference > 0) {
    return `${daysDifference} day${daysDifference > 1 ? 's' : ''}`;
  } else if (hoursDifference > 0) {
    return `${hoursDifference} hour${hoursDifference > 1 ? 's' : ''}`;
  } else {
    return `${minutesDifference} minute${minutesDifference > 1 ? 's' : ''}`;
  }
};

export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return format(date, 'MMMM d, yyyy, hh:mm aa');
};

export const formatDateReserve = (dateString: string): string => {
  const date = new Date(dateString);
  return format(date, 'MMMM d, yyyy');
};