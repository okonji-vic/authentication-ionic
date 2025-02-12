import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
    YAxis,
    ReferenceLine,
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
  const data = calculateBiorhythmSeries(birthDate, targetDate, 30);

  console.log(data);

  return (
    <ResponsiveContainer width="100%" height={200} >
      <LineChart data={data}>
              <XAxis dataKey="date" style={{ fontSize: "10px" }}
            ticks={[data[1].date, data[3].date, data[5].date, data[7].date]}
              />
              {/* <YAxis domain={[-1, 1]} style={{fontSize:"10px"}}/> */}
              <ReferenceLine x={data[0].date} stroke="grey" />
        {/* <CartesianGrid stroke="#eee" strokeDasharray="-1 1" /> */}
        <Line  dataKey="physical" stroke="red" type="natural" dot={false} />
        <Line  dataKey="emotional" stroke="blue" type="natural" dot={false}/>
        <Line  dataKey="intellectual" stroke="green" dot={false} type="natural"/>
      </LineChart>
    </ResponsiveContainer>
  );
};

export default BiorhythmChart;
