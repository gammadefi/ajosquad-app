import { format, formatDistanceToNow, differenceInDays, differenceInWeeks, differenceInMonths } from 'date-fns';
import { enUS } from 'date-fns/locale';
// ----------------------------------------------------------------------

export function fDate(date : string) {
  return format(new Date(date), 'dd MMMM yyyy');
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
  return `${months} month${months === 1 ? '' : 's'} ago`;
}

export function formatDate2(dateString: string) {
  const date = new Date(dateString);

  const formattedDate = format(date, "do MMM, yyyy", {
    locale: enUS,
  });

  return formattedDate;
}