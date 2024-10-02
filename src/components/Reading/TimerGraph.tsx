import React, { useEffect, useState } from "react";
import {
 LineChart,
 Line,
 XAxis,
 YAxis,
 CartesianGrid,
 Tooltip,
 ResponsiveContainer,
} from "recharts";

interface TotalTimeData {
 days: number;
 hours: number;
 minutes: number;
}

interface TotalTimeGraphProps {
 currentTime: TotalTimeData;
}

const TotalTimeGraph: React.FC<TotalTimeGraphProps> = ({ currentTime }) => {
 const [data, setData] = useState<{ date: string; hours: number }[]>([]);

 useEffect(() => {
  const updateData = () => {
   const totalHours =
    currentTime.days * 24 + currentTime.hours + currentTime.minutes / 60;

   // Generate data for the past 30 days
   const currentDate = new Date();
   const newData = Array.from({ length: 30 }, (_, index) => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() - (29 - index));
    return {
     date: date.toISOString().split("T")[0],
     hours: (totalHours * (index + 1)) / 30, // Simulating gradual increase
    };
   });

   setData(newData);
  };

  updateData();
 }, [currentTime]);

 return (
  <div className="w-full max-w-xl mx-auto">
   <h2 className="text-2xl font-bold mb-4 text-center">
    Total Hours Over Time
   </h2>
   
   <ResponsiveContainer width="100%" height={400}>
    <LineChart data={data}>
     <CartesianGrid strokeDasharray="3 3" />
     <XAxis dataKey="date" />
     <YAxis />
     <Tooltip formatter={(value: number) => value.toFixed(2)} />
     <Line type="monotone" dataKey="hours" stroke="#8884d8" />
    </LineChart>
   </ResponsiveContainer>
  </div>
 );
};

export default TotalTimeGraph;
