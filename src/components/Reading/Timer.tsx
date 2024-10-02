import { useState } from "react";
import { Button, Input } from "antd";
import useTimer from "../../hooks/useTimer";

type TimerProps = {
    setCounterDown: React.Dispatch<React.SetStateAction<string | null>>;
};

export const Timer: React.FC<TimerProps> = ({ setCounterDown }) => {
    const [hours, setHours] = useState("00");
    const [minutes, setMinutes] = useState("00");
    const [seconds, setSeconds] = useState("10");

    const { timer, isRunning, isStarted, start, pause, resume, reset } = useTimer({
        hours,
        minutes,
        seconds
    });

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="flex gap-2">
                <Input
                    type="number"
                    min="0"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    style={{ width: "60px" }}
                />
                <Input
                    type="number"
                    min="0"
                    value={minutes}
                    onChange={(e) => setMinutes(e.target.value)}
                    style={{ width: "60px" }}
                />
                <Input
                    type="number"
                    min="0"
                    value={seconds}
                    onChange={(e) => setSeconds(e.target.value)}
                    style={{ width: "60px" }}
                />
            </div>
            <div className="text-xl lg:text-2xl font-bold">
                {timer.hours}:{timer.minutes}:{timer.seconds}
            </div>
            <div className="flex gap-2">
                <Button onClick={start} disabled={isRunning || isStarted}>Start</Button>
                <Button onClick={pause} disabled={!isRunning}>Pause</Button>
                <Button onClick={resume} disabled={isRunning || !isStarted}>Resume</Button>
                <Button onClick={reset}>Reset</Button>
                <Button type="primary" danger onClick={() => setCounterDown(null)}>Close</Button>
            </div>
        </div>
    );
};
