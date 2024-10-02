import { useEffect, useState } from "react";
import useDatetime from "../hooks/useDatetime";
import useStopwatch from "../hooks/useStopwatch";
import { Button, Dropdown, Typography } from "antd";
import {
 Add,
 Stopwatch as StopwatchIcon,
 Timer as TimerIcon,
 TodoList as TodoListIcon,
} from "../assets/icons/SVG";
import { Timer } from "../components/Reading/Timer";
import { Stopwatch } from "../components/Reading/Stopwatch";
import { TodoTimer } from "../components/Reading/TodoTimer";
const { Text } = Typography;

export const Home: React.FC = () => {
 const { date, time } = useDatetime();
 const { stopwatch, start, pause, isStarted, isRunning } = useStopwatch();
 const [counterDown, setCounterDown] = useState<string | null>(null);

 useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
  
    window.addEventListener("beforeunload", handleBeforeUnload);
  
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  

 return (
  <>
   <h2 className="text-2xl font-medium text-center mb-4 md:hidden">
    Focus Mode
   </h2>
   <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
    <div>
     <section className="w-full p-6 md:p-8 bg-primary rounded-[1rem] shadow flex flex-col gap-3 items-center">
      <div id="Time" className="text-4xl md:text-5xl text-gray-700 font-oswald">
       {time}
      </div>
      <div id="Date" className="text-lg text-gray-500">
       {date}
      </div>
     </section>
     <section className="w-full p-6 md:p-8 bg-primary rounded-[1rem] shadow mt-5">
      <div
       id="Stopwatch"
       className="flex p-8 xl:px-12 bg-gray-100 rounded-lg w-full justify-center whitespace-nowrap overflow-x-auto"
      >
       <Text className="text-4xl xl:text-5xl flex text-gray-700 gap-2 font-oswald font-bold">
        <span id="Timer_Hour">{stopwatch.hours || "00"}</span>
        <span className="block -mt-1 text-gray-400 font-[serif]">:</span>
        <span id="Timer_Minute">{stopwatch.minutes || "00"}</span>
        <span className="block -mt-1 text-gray-400 font-[serif]">:</span>
        <span id="Timer_Seconds">{stopwatch.seconds || "00"}</span>
        <span className="block -mt-2 xl:-mt-3 text-gray-400 font-[serif]">
         .
        </span>
       </Text>
      </div>
      <div className="w-full min-h-[100px] mt-4 p-4 border border-dashed bg-gray-50 border-gray-300 whitespace-nowrap overflow-x-auto flex flex-col justify-center items-center">
       {counterDown == "timer" ? (
        <Timer setCounterDown={setCounterDown} />
       ) : counterDown == "stopwatch" ? (
        <Stopwatch setCounterDown={setCounterDown} />
       ) : counterDown == "todolist" ? (
        <TodoTimer setCounterDown={setCounterDown} />
       ) : (
        <>
         <Dropdown
          trigger={["contextMenu", "click"]}
          menu={{
           items: [
            {
             key: "1",
             label: (
              <div className="flex items-center gap-2 text-gray-500">
               <TimerIcon className="size-4" />
               <p>Timer</p>
              </div>
             ),
             onClick: () => setCounterDown("timer"),
            },
            {
             key: "2",
             label: (
              <div className="flex items-center gap-2 text-gray-500">
               <StopwatchIcon className="size-4" />
               <p>Stopwatch</p>
              </div>
             ),
             onClick: () => setCounterDown("stopwatch"),
            },
            {
             key: "3",
             label: (
              <div className="flex items-center gap-2 text-gray-500">
               <TodoListIcon />
               <p>Todo Timer</p>
              </div>
             ),
             onClick: () => setCounterDown("todolist"),
            },
           ],
          }}
          placement="bottom"
          arrow
         >
          <div className="w-full h-[100px] flex flex-col justify-center items-center hover:opacity-50 cursor-pointer text-gray-500 select-none gap-1">
           <Add className="size-6" />
           <p>Select a counter method</p>
          </div>
         </Dropdown>
        </>
       )}
      </div>
     </section>
    </div>
    <div>
     <section className="w-full p-6 md:p-8 lg:py-24 h-fit bg-primary rounded-[1rem] shadow">
      <form
       className="w-full h-full flex flex-col justify-center gap-4"
       onSubmit={(e) => e.preventDefault()}
      >
       <div>
        <label htmlFor="_subject" className="inline-block text-lg mb-3">
         Subject
        </label>
        <select
         className="w-full p-3 bg-gray-100 border border-gray-300 rounded-md"
         id="_subject"
        >
         <option value="Math">Math</option>
         <option value="Science">Science</option>
         <option value="English">English</option>
         <option value="History">History</option>
         <option value="Art">Art</option>
        </select>
       </div>
       <div>
        <label htmlFor="_chapter" className="inline-block text-lg mb-3">
         Chapter
        </label>
        <select
         className="w-full p-3 bg-gray-100 border border-gray-300 rounded-md"
         id="_chapter"
        >
         <option value="Chapter 1">Chapter 1</option>
         <option value="Chapter 2">Chapter 2</option>
         <option value="Chapter 3">Chapter 3</option>
         <option value="Chapter 4">Chapter 4</option>
         <option value="Chapter 5">Chapter 5</option>
        </select>
       </div>
       <div className="flex flex-col gap-3 mt-5 md:mt-8">
        <Button
         type="primary"
         size="large"
         className="w-full text-lg py-5"
         onClick={start}
         hidden={isRunning || isStarted}
        >
         Start
        </Button>
        <Button
         type="primary"
         size="large"
         danger
         className="w-full text-lg py-5"
         onClick={pause}
         hidden={!isRunning}
        >
         Take a break
        </Button>
       </div>
      </form>
     </section>
    </div>
   </div>
  </>
 );
};
