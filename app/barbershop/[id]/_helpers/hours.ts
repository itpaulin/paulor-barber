import { time } from "console";
import { setHours, setMinutes, format, addMinutes, isToday } from "date-fns";
export function generateDayTimeList(date: Date): Array<string> {
  let timeList: Array<string> = [];

  const startTime = setMinutes(setHours(date, 9), 0);
  const finalTime = setMinutes(setHours(date, 21), 0);

  const durationAttendance = 45;

  let currentDate = startTime;

  while (currentDate < finalTime) {
    timeList.push(format(currentDate, "HH:mm"));
    currentDate = addMinutes(currentDate, durationAttendance);
  }

  if (isToday(date)) {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();

    timeList = timeList.filter((time) => {
      const [hour, minute] = time.split(":").map(Number);
      return (
        hour > currentHour || (hour === currentHour && minute > currentMinute)
      );
    });
  }

  return timeList;
}
