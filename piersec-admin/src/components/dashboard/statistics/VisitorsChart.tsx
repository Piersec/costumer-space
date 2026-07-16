"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


const data = [
  {
    month: "Jan",
    visitors: 1200,
  },
  {
    month: "Fev",
    visitors: 1800,
  },
  {
    month: "Mar",
    visitors: 2400,
  },
  {
    month: "Abr",
    visitors: 2100,
  },
  {
    month: "Mai",
    visitors: 3200,
  },
];


export default function VisitorsChart() {
  return (
    <div className="
      rounded-xl
      border
      bg-card
      p-5
      h-[350px]
    ">
      <h2 className="font-semibold mb-4">
        Visitantes do site
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="visitors"
            stroke="currentColor"
            strokeWidth={3}
          />

        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}