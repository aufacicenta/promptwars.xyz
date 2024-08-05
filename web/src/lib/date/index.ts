import { format, parseISO } from "date-fns";

function toLocalDateISOString(date: number | Date) {
  try {
    const formattedDate = format(date, "yyyy-MM-dd'T'HH:mm:ss'Z'");
    return formattedDate;
  } catch (error) {
    console.error(error);
  }
}

function parseDateString(dateString: string): Date {
  try {
    const parsedDate = parseISO(dateString);
    return parsedDate;
  } catch (error) {
    console.error(error);
  }

  return new Date();
}

const e = { toLocalDateISOString, parseDateString };

export default e;
