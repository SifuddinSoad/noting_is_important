import { Divider } from 'antd'
import TimerGraph from '../components/Reading/TimerGraph'

export const DailyReport: React.FC = () => {
    return (
        <>
            <h3 className="text-lg md:text-xl font-medium p-4 lg:py-3">Daily Report</h3>
            <Divider className="m-0 mb-4 border-black/15" />
            <TimerGraph currentTime={{
                days: 0,
                hours: 2,
                minutes: 30,
            }} />
        </>
    )
}
