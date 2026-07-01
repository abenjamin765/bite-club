export function formatDateRange(startDate, endDate) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  });
  return `${formatter.format(new Date(`${startDate}T12:00:00`))} – ${formatter.format(
    new Date(`${endDate}T12:00:00`)
  )}`;
}

export function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

/** Shift an ISO date (YYYY-MM-DD) by a number of days, staying in local time. */
export function addDaysIso(isoDate, offset) {
  const date = new Date(`${isoDate}T12:00:00`);
  date.setDate(date.getDate() + offset);
  return date.toISOString().slice(0, 10);
}

/** Monday-based start of the week containing `isoDate`. */
export function startOfWeekIso(isoDate = todayIso()) {
  const date = new Date(`${isoDate}T12:00:00`);
  const day = date.getDay(); // 0 = Sun … 6 = Sat
  const diff = day === 0 ? -6 : 1 - day; // back up to Monday
  return addDaysIso(isoDate, diff);
}

/** The seven ISO dates of the week beginning at `weekStart`. */
export function weekDates(weekStart) {
  return Array.from({ length: 7 }, (_, i) => addDaysIso(weekStart, i));
}

const DOW_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DOW_LONG = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function dowShort(isoDate) {
  return DOW_SHORT[new Date(`${isoDate}T12:00:00`).getDay()];
}

export function dowLong(isoDate) {
  return DOW_LONG[new Date(`${isoDate}T12:00:00`).getDay()];
}

export function dayOfMonth(isoDate) {
  return new Date(`${isoDate}T12:00:00`).getDate();
}

const MACRO_KEYS = ["calories", "protein", "carbs", "fat"];

/** Sum macro fields across a list of rows (ingredients or meal totals). */
export function sumMacros(rows) {
  return (rows || []).reduce(
    (totals, row) => {
      MACRO_KEYS.forEach((key) => {
        totals[key] += Number(row[key] || 0);
      });
      return totals;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );
}

export function emptyMacros() {
  return { calories: 0, protein: 0, carbs: 0, fat: 0 };
}

/** Round calories to whole numbers, grams to one decimal (dropping trailing .0). */
export function formatKcal(value) {
  return Math.round(Number(value || 0)).toLocaleString("en-US");
}

export function formatGrams(value) {
  const n = Number(value || 0);
  const rounded = Math.round(n * 10) / 10;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
}

export function titleCase(value) {
  return String(value || "").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function escapeHtml(value) {
  return String(value).replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );
}
