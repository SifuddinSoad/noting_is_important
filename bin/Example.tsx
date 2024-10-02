import { useState } from 'react';
import { Button, Typography } from 'antd';
import useStopwatch from '../src/hooks/useStopwatch';
import useDatetime from '../src/hooks/useDatetime';
import useTimer from '../src/hooks/useTimer';
const { Text } = Typography;

const Example: React.FC = () => {
  const { stopwatch, isRunning, isStarted, start, resume, pause, reset } = useStopwatch();
  const { date, time } = useDatetime();

  const [TimerH, setTimerH] = useState<string>('00');
  const [TimerM, setTimerM] = useState<string>('00');
  const [TimerS, setTimerS] = useState<string>('05');

  const { timer, isRunning: isTRunning, isStarted: isTStarted, start: tstart, resume: tresume, pause: tpause, reset: treset } = useTimer({ hours: TimerH, minutes: TimerM, seconds: TimerS });
  return (
    <main className='font-sans'>
      <div id="Datetime" className="flex py-8 px-12 bg-gray-100 m-4 rounded-lg w-fit flex flex-col gap-3">
        <div id="Time" className="text-5xl text-gray-700 font-oswald">
          {time}
        </div>
        <div id="Date" className="text-lg text-gray-500">
          {date}
        </div>
      </div>
      <div id="Stopwatch" className="flex py-8 px-12 bg-gray-100 m-4 rounded-lg w-fit">
        <Text className='text-7xl flex text-gray-700 gap-2 font-oswald font-bold'>
          <span id="Timer_Hour">{stopwatch.hours || TimerH}</span><span className='block -mt-1 text-gray-400 font-[serif]'>:</span>
          <span id="Timer_Minute">{stopwatch.minutes || TimerM}</span><span className='block -mt-1 text-gray-400 font-[serif]'>:</span>
          <span id="Timer_Seconds">{stopwatch.seconds || TimerH}</span>
        </Text>
      </div>
      {!isStarted && <Button type='primary' size='large' className='mx-4' onClick={start}>
        Start
      </Button>}
      {isStarted && isRunning && <Button type='primary' size='large' className='mx-4' onClick={pause}>
        Pause
      </Button>}
      {isStarted && !isRunning && <Button type='primary' size='large' className='mx-4' onClick={resume}>
        Resume
      </Button>}

      {isStarted && <Button type='primary' size='large' className='mx-4' onClick={reset}>
        Reset
      </Button>}

      <div id="Timer" className="flex py-8 px-12 bg-gray-100 m-4 rounded-lg w-fit">
        {isTStarted && <><Text className='text-7xl flex text-gray-700 gap-2 font-oswald font-bold'>
          <span id="Timer_Hour">{timer.hours}</span><span className='block -mt-1 text-gray-400 font-[serif]'>:</span>
          <span id="Timer_Minute">{timer.minutes}</span><span className='block -mt-1 text-gray-400 font-[serif]'>:</span>
          <span id="Timer_Seconds">{timer.seconds}</span>
        </Text>
          <div className="flex gap-4">
            {isTStarted && isTRunning && <Button type='primary' size='large' className='mx-4' onClick={tpause}>
              Pause
            </Button>}
            {isTStarted && !isTRunning && <Button type='primary' size='large' className='mx-4' onClick={tresume}>
              Resume
            </Button>}

            {isTStarted && <Button type='primary' size='large' className='mx-4' onClick={treset}>
              Reset
            </Button>}
          </div>
        </>
        }
        {!isTStarted && <div>
          <div id="Timer_input" className="flex gap-4">
            <input id="Timer_Hour_Input" className="w-[50px] border border-gray-300 rounded-lg px-2 py-1 text-4xl" placeholder="00" maxLength={2} min={0} max={24} value={TimerH} onChange={(e) => setTimerH(e.target.value)} />
            <input id="Timer_Minute_Input" className="w-[50px] border border-gray-300 rounded-lg px-2 py-1 text-4xl" placeholder="00" maxLength={2} min={0} max={60} value={TimerM} onChange={(e) => setTimerM(e.target.value)} />
            <input id="Timer_Seconds_Input" className="w-[50px] border border-gray-300 rounded-lg px-2 py-1 text-4xl" placeholder="00" maxLength={2} min={0} max={60} value={TimerS} onChange={(e) => setTimerS(e.target.value)} />
          </div>
          <Button type='primary' size='large' className='mt-4' onClick={tstart}>
            Start
          </Button>
        </div>}
      </div>

    </main>
  )
}

export default Example;
