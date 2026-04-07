"use client";

import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

interface ItemCount {
  id: string;
  name: string;
  count: number;
}

interface BorrowersChartProps {
  data: ItemCount[];
}

const COLORS = [
  "oklch(0.65 0.2 280)",
  "oklch(0.55 0.18 180)",
  "oklch(0.7 0.18 60)",
];

export function BorrowersChart({ data }: BorrowersChartProps) {
  const chartData = data.map((item) => ({
    name:
      item.name.length > 15 ? item.name.substring(0, 15) + "..." : item.name,
    fullName: item.name,
    count: item.count,
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={chartData}
        layout="horizontal"
        margin={{ top: 10, right: 10, left: 0, bottom: 60 }}
      >
        <XAxis
          type="category"
          dataKey="name"
          stroke="oklch(0.65 0 0)"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          angle={-35}
          textAnchor="end"
          interval={0}
        />
        <YAxis
          type="number"
          stroke="oklch(0.65 0 0)"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          width={40}
        />
        <Tooltip
          cursor={{ fill: "rgba(128,128,128,.15)" }}
          contentStyle={{
            backgroundColor: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(128,128,128,0.3)",
            borderRadius: "8px",
            color: "inherit",
            backdropFilter: "blur(8px)",
          }}
          labelStyle={{
            color: "light-dark(oklch(0.2 0 0), oklch(0.95 0 0))",
            fontWeight: 600,
          }}
          itemStyle={{
            color: "light-dark(oklch(0.3 0 0), oklch(0.85 0 0))",
          }}
          formatter={(
            value: ValueType | undefined,
            _name: NameType | undefined,
            props,
          ) => {
            const num = typeof value === "number" ? value : 0;
            return [num, props.payload.fullName];
          }}
        />
        <Bar dataKey="count" radius={[4, 4, 0, 0]}>
          {chartData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
