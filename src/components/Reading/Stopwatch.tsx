import useStopwatch from "../../hooks/useStopwatch";
import { Button, Typography } from "antd";
const { Text } = Typography;

type StopwatchProps = {
 setCounterDown: React.Dispatch<React.SetStateAction<string | null>>;
};

export const Stopwatch: React.FC<StopwatchProps> = ({ setCounterDown }) => {
 const { stopwatch, isRunning, isStarted, start, resume, pause, reset } = useStopwatch();

 return (
  <>
   <div
    id="Stopwatch_display"
    className="py-4 px-7 bg-white border rounded-lg mb-4"
    style={{ maxWidth: "200px" }}
   >
    <Text className="text-2xl xl:text-3xl flex text-gray-700 gap-2 font-oswald font-medium">
     <span id="Stopwatch_Hour">{stopwatch.hours || "00"}</span>
     <span className="block text-gray-400 font-[serif] font-bold">:</span>
     <span id="Stopwatch_Minute">{stopwatch.minutes || "00"}</span>
     <span className="block text-gray-400 font-[serif] font-bold">:</span>
     <span id="Stopwatch_Seconds">{stopwatch.seconds || "00"}</span>
    </Text>
   </div>

   <div className="flex items-center gap-2">
    <Button onClick={start} className="flex items-center" disabled={isRunning || isStarted}>
     Play
    </Button>
    <Button onClick={pause} className="flex items-center" disabled={!isRunning}>
     Pause
    </Button>
    <Button onClick={resume} className="flex items-center" disabled={isRunning || !isStarted}>
     Resume
    </Button>
    <Button onClick={reset} className="flex items-center">
     Reset
    </Button>
    <Button
     type="primary"
     danger
     onClick={() => {
      reset();
      setCounterDown(null);
     }}
     className="flex items-center"
    >
     Close
    </Button>
   </div>
  </>
 );
};
