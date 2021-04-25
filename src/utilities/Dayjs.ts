import dayjs, { Dayjs } from "dayjs";

export function roundMinutes(datetime: Dayjs, interval: number): Dayjs {
  const minutes: number = datetime.minute();
  const remainder: number = minutes % interval;
  const midpoint: number = interval / 2;

  if (remainder < midpoint) {
    return datetime.subtract(remainder, "minutes");
  }

  return datetime.add(interval - remainder, "minutes");
}

export function formatDate(date: string, format = "MMM D, YYYY"): string {
  return dayjs(date).format(format);
}

export function formatTime(time: string, shortFormat = "ha", longFormat = "h[h]m[m] a"): string {
  const datetime = dayjs(`0000-00-00T${time}`);
  const minutes = datetime.minute();

  if (!minutes) {
    return datetime.format(shortFormat);
  } else {
    return datetime.format(longFormat);
  }
}
