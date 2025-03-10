import { format, formatDistanceToNow, differenceInDays, differenceInWeeks, differenceInMonths } from 'date-fns';
import { enUS } from 'date-fns/locale';
// ----------------------------------------------------------------------

export function fDate(date : string) {
  return new Date(date).toISOString().split("T")[0];
}

export function fDateUtc(date : string) {
  return new Date(date).toISOString().split("T")[0];
}

export function fDateTime(date : string) {
  return format(new Date(date), 'dd MMM yyyy HH:mm');
}

export function fDateTimeSuffix(date : string) {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p');
}

export function fToNow(date : string) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true
  });
}

export function formatDate(currentDate : string){
   const [date , time] = currentDate.replace("T", " ").split(" ");
  //  console.log(date, time+":00");
   return `${date} ${time}:00`
   
}


export function timeAgo(date: Date) {
  const now = new Date();

  const days = differenceInDays(now, date);
  if (days < 7) {
    if (days === 0) {
      return "Today";  
    }
    return `${days} day${days === 1 ? '' : 's'} ago`;
  }

  const weeks = differenceInWeeks(now, date);
  if (weeks < 4) {
    return `${weeks} week${weeks === 1 ? '' : 's'} ago`;
  }

  const months = differenceInMonths(now, date);
  if (months === 0) {
    return "A month aga";  
  }
  return `${months} month${months === 1 ? '' : 's'} ago`;
}

export function formatDate2(dateString: string, withTime: boolean = false): string {
  const date = new Date(dateString);

  const stringFormat = withTime ? "do MMM, yyyy | p" : "do MMM, yyyy";

  const formattedDate = format(date, stringFormat, {
    locale: enUS,
  });

  return formattedDate;
}

export function formatStartDate(startDate: string): string {
  const currentDate: Date = new Date();
  const inputDate: Date = new Date(startDate);

  // Reset time to midnight for accurate day comparison
  currentDate.setHours(0, 0, 0, 0);
  inputDate.setHours(0, 0, 0, 0);

  const differenceInMs: number = inputDate.getTime() - currentDate.getTime();
  const differenceInDays: number = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));

  if (differenceInDays === 0) {
    return "Started"; // Today
  } else if (differenceInDays < 0) {
    return "Started"; // Past
  } else {
    const weeks: number = Math.floor(differenceInDays / 7);
    if (weeks >= 1) {
      return `Starts in ${weeks} week${weeks > 1 ? "s" : ""}`;
    } else {
      return `Starts in ${differenceInDays} day${differenceInDays > 1 ? "s" : ""}`;
    }
  }
}

// Example usage:
// Output depends on the current date
