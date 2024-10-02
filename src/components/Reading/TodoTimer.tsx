import { Button, Select } from "antd";
import { useEffect, useState } from "react";
import useTimer from "../../hooks/useTimer";

const { Option } = Select;

type TodoTimerProps = {
 setCounterDown: React.Dispatch<React.SetStateAction<string | null>>;
};

export const TodoTimer: React.FC<TodoTimerProps> = ({ setCounterDown }) => {
 const [todo, setTodo] = useState<{ time: string; value: string } | null>(null);
 const [hours, setHours] = useState("00");
 const [minutes, setMinutes] = useState("00");
 const [seconds, setSeconds] = useState("00");

 const { timer, isRunning, isStarted, start, pause, resume, reset } = useTimer({
  hours,
  minutes,
  seconds,
 });

 const handleChange = (value: string) => {
  try {
   const parsedValue = JSON.parse(value);
   setTodo(parsedValue);

   const time = parsedValue.time;
   const [timeValue, timeUnit] = time.split(" ") || [];

   const parsedTimeValue = parseInt(timeValue, 10);

   if (timeUnit === "min") {
    setMinutes(
     isNaN(parsedTimeValue) ? "00" : String(parsedTimeValue).padStart(2, "0")
    );
    setHours("00");
    setSeconds("00");
   } else if (timeUnit === "hr") {
    setHours(
     isNaN(parsedTimeValue) ? "00" : String(parsedTimeValue).padStart(2, "0")
    );
    setMinutes("00");
    setSeconds("00");
   } else if (timeUnit === "sec") {
    setSeconds(
     isNaN(parsedTimeValue) ? "00" : String(parsedTimeValue).padStart(2, "0")
    );
    setHours("00");
    setMinutes("00");
   }
  } catch (error) {
   console.error("Failed to parse value:", error);
  }
 };

 return (
  <>
   <Select
    defaultValue="Select a todo"
    style={{ width: 300 }}
    value={todo ? JSON.stringify(todo) : "Select a todo"}
    onChange={handleChange}
    className="mb-4"
   >
    <Option
     value={JSON.stringify({
      time: "15 min",
      value: "In 15 minutes, I have to finish my homework.",
     })}
    >
     [15 min] In 7:00 PM, I have to finish my homework.
    </Option>
   </Select>

   {todo && (
    <>
     {isStarted && (
      <div id="timer" className="text-xl lg:text-2xl font-bold text-center mb-4">
       {timer.hours}:{timer.minutes}:{timer.seconds}
      </div>
     )}
     <div className="flex gap-2 justify-center flex-wrap mb-4">
      <Button onClick={start} disabled={isRunning || isStarted}>
       Start
      </Button>
      <Button onClick={pause} disabled={!isRunning}>
       Pause
      </Button>
      <Button onClick={resume} disabled={isRunning || !isStarted}>
       Resume
      </Button>
      <Button onClick={reset}>Reset</Button>
     </div>
    </>
   )}

   <div className="flex flex-col items-center gap-4 p-4 border rounded-lg bg-white shadow-sm w-full min-h-[150px] mb-4">
    {todo ? (
     <div className="w-full">
      <p className="text-gray-500 text-center mb-2">Time: {todo.time}</p>
      <p className="text-gray-700 font-medium text-center">"{todo.value}"</p>
     </div>
    ) : (
     <p className="text-gray-500 text-center">Please select a todo</p>
    )}
   </div>

   <div className="flex justify-center gap-3">
    {todo && (
     <Button
      danger
      onClick={() => {
       setTodo(null);
       reset();
      }}
     >
      Cancel
     </Button>
    )}
    <Button type="primary" danger onClick={() => setCounterDown(null)}>
     Close
    </Button>
   </div>
  </>
 );
};
