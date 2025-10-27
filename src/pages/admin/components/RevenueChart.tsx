/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type DataPoint = {
  month: string;
  value: number;
};

type Props = {
  data?: DataPoint[];
  totalRevenue?: number;
  // month to highlight with the yellow dot + label (e.g. "Jul")
  highlightedMonth?: string;
  className?: string;
};

const formatCurrency = (v: number) =>
  "₦" + v.toLocaleString(undefined, { maximumFractionDigits: 0 });

const yAxisFormatter = (v: number) => {
  if (Math.abs(v) >= 1_000_000) {
    return `₦${(v / 1_000_000).toFixed(0)}M`;
  }
  if (Math.abs(v) >= 1_000) {
    return `₦${(v / 1_000).toFixed(0)}k`;
  }
  return `₦${v}`;
};

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  const value = payload[0].value;
  return (
    <div className="bg-white text-sm rounded-md shadow-md px-3 py-2 border">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="font-medium">{formatCurrency(value)}</div>
    </div>
  );
};

const CustomDot: React.FC<any> = (props) => {
  const { cx, cy, payload, highlightedMonth } = props;
  if (!cx || !cy) return null;

  const isHighlighted = payload.month === highlightedMonth;

  if (isHighlighted) {
    return (
      <g>
        {/* outer white ring */}
        <circle cx={cx} cy={cy} r={8} fill="white" />
        {/* inner yellow dot */}
        <circle
          cx={cx}
          cy={cy}
          r={5}
          fill="#FFBF00"
          stroke="#E6A800"
          strokeWidth={1}
        />
        {/* label above dot */}
        <foreignObject x={cx - 70} y={cy - 54} width={140} height={36}>
          <div className="text-center">
            <div className="bg-white px-2 py-1 rounded-md shadow text-xs font-medium">
              {formatCurrency(payload.value)}
            </div>
          </div>
        </foreignObject>
      </g>
    );
  }

  return null;
};

const RevenueChart: React.FC<Props> = ({
  data = [],
  totalRevenue = 0,
  highlightedMonth = "Jul",
  className = "",
}) => {
  // compute max Y value for chart domain padding
  const max = Math.max(...data.map((d) => d.value)) || 0;
  const yDomainTop = Math.ceil(max * 1.12);

  // Colors requested
  const lineColor = "#A30162"; // main line color (provided)
  const shadowColor = "#8326D0"; // shadow color for the line (provided)

  return (
    <div
      className={`bg-white rounded-lg p-4 shadow-sm border border-gray-100 ${className}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm text-gray-500">
            Total Revenue (For Eventcove)
          </div>
          <div className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 mt-1">
            {formatCurrency(totalRevenue)}
          </div>
        </div>
      </div>

      <div className="mt-6 h-[340px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 8, right: 18, left: 8, bottom: 8 }}
          >
            <defs>
              <linearGradient id="gradientFill" x1="0" x2="0" y1="0" y2="1">
                {/* subtle fill using the primary line color with low opacity */}
                <stop offset="0%" stopColor={lineColor} stopOpacity={0.1} />
                <stop offset="60%" stopColor={lineColor} stopOpacity={0.04} />
                <stop offset="100%" stopColor={lineColor} stopOpacity={0.02} />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              stroke="#C9CBCD"
              strokeDasharray="6 6"
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              padding={{ left: 6, right: 6 }}
              tick={{ fill: "#0D080B", fontSize: 13 }}
              height={30}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#767779", fontSize: 12 }}
              width={60}
              tickFormatter={yAxisFormatter}
              domain={[0, yDomainTop]}
            />

            <Tooltip content={<CustomTooltip />} />

            {/* area under the line */}
            <Area
              type="monotone"
              dataKey="value"
              stroke="transparent"
              fill="url(#gradientFill)"
              activeDot={false}
              isAnimationActive={false}
            />

            {/* shadow line (drawn first, wider and faint to act as glow/shadow) */}
            <Line
              type="monotone"
              dataKey="value"
              stroke={shadowColor}
              strokeWidth={10}
              dot={false}
              opacity={0.12}
              isAnimationActive={false}
              strokeLinecap="round"
            />

            {/* main line on top using the exact provided color */}
            <Line
              type="monotone"
              dataKey="value"
              stroke={lineColor}
              strokeWidth={4}
              dot={(props) => (
                <CustomDot {...props} highlightedMonth={highlightedMonth} />
              )}
              activeDot={{ r: 6 }}
              isAnimationActive={false}
              strokeLinecap="round"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;
