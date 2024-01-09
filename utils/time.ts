const units: { unit: Intl.RelativeTimeFormatUnit; secondsInUnit: number }[] = [
  { unit: "year", secondsInUnit: 31_536_000_000 },
  { unit: "month", secondsInUnit: 2_628_000_000 },
  { unit: "day", secondsInUnit: 86_400_000 },
  { unit: "hour", secondsInUnit: 3_600_000 },
  { unit: "minute", secondsInUnit: 60_000 },
  { unit: "second", secondsInUnit: 1000 },
];

export const getTimeAgo = (timestamp: number) => {
  const rtf = new Intl.RelativeTimeFormat();

  const secondsElapsed = Date.now() - timestamp;

  for (const { unit, secondsInUnit } of units) {
    if (secondsElapsed >= secondsInUnit || unit === "second") {
      return rtf.format(Math.floor(secondsElapsed / secondsInUnit) * -1, unit);
    }
  }

  return "";
};

export function formatDate(date: Date, timezone: string): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: timezone,
  };
  return date.toLocaleDateString("en-US", options).replace(",", "");
}

const pad = function (num: number) {
  const norm = Math.floor(Math.abs(num));
  return (norm < 10 ? "0" : "") + norm;
};

export function toLocalISOString(date: Date) {
  const tzo = -date.getTimezoneOffset();
  const dif = tzo >= 0 ? "+" : "-";

  return (
    date.getFullYear() +
    "-" +
    pad(date.getMonth() + 1) +
    "-" +
    pad(date.getDate()) +
    "T" +
    pad(date.getHours()) +
    ":" +
    pad(date.getMinutes()) +
    dif +
    pad(tzo / 60) +
    ":" +
    pad(tzo % 60)
  );
}
