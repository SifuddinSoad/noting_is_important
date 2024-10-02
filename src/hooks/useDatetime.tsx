import { useState, useEffect } from "react";

interface DateTimeInfo {
 date: string;
 time: string;
}

const useDatetime = (): DateTimeInfo => {
 const [dateTime, setDateTime] = useState<DateTimeInfo>({
  date: "",
  time: "",
 });

 useEffect(() => {
  const updateDateTime = () => {
   const now = new Date();
   const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
   };
   const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
   };

   setDateTime({
    date: now.toLocaleDateString(undefined, dateOptions),
    time: now.toLocaleTimeString(undefined, timeOptions),
   });
  };

  updateDateTime();
  const interval = setInterval(updateDateTime, 1000);

  return () => clearInterval(interval);
 }, []);

 return dateTime;
};

export default useDatetime;
