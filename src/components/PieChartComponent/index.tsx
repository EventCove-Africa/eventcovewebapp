import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

interface PieChartComponentProps {
  data: { name: string; value: number }[];
  size?: number; // Chart size, default 200
}

const PieChartComponent: React.FC<PieChartComponentProps> = ({
  data,
  size = 130,
}) => {
  const COLORS = ["#962DFF", "#F2E7FE"]; // Filled color and not filled color

  return (
    <PieChart width={size} height={size}>
      <Pie
        data={data}
        dataKey="value"
        innerRadius={50}
        outerRadius={size / 2}
        endAngle={450} // Ensures the chart starts from the top
      >
        {data.map(
          (
            _,
            index // Replace `entry` with `_` to ignore it
          ) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          )
        )}
      </Pie>
      <Tooltip />
    </PieChart>
  );
};

export default PieChartComponent;
