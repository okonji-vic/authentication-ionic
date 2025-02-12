import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

interface BiorhythmChartProps {
  birthDate: string;
  targetDate: string;
  calculateBiorhythmSeries: (birthDate: string, targetDate: string, days: number) => { 
    date: string;
    physical: number;
    emotional: number;
    intellectual: number;
  }[];
}

const BiorhythmChart: React.FC<BiorhythmChartProps> = ({
  birthDate,
  targetDate,
  calculateBiorhythmSeries,
}) => {
  // Fetch biorhythm data for 20 days
  const data = calculateBiorhythmSeries(birthDate, targetDate, 20);

  console.log(data);

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <XAxis dataKey="date" style={{fontSize:"10px"}}/>
        <YAxis domain={[-1, 1]} style={{fontSize:"10px"}}/>
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="physical" stroke="red" />
        <Line type="monotone" dataKey="emotional" stroke="blue" />
        <Line type="monotone" dataKey="intellectual" stroke="green" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default BiorhythmChart;
