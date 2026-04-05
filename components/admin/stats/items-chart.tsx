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

interface ItemsChartProps {
  data: ItemCount[];
}

const COLORS = [
  "oklch(0.65 0.2 280)",
  "oklch(0.55 0.18 180)",
  "oklch(0.7 0.18 60)",
];

export function ItemsChart({ data }: ItemsChartProps) {
  const chartData = data.map((item) => ({
    name:
      item.name.length > 20 ? item.name.substring(0, 20) + "..." : item.name,
    fullName: item.name,
    count: item.count,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={chartData}
        layout="vertical"
        margin={{ left: 0, right: 20 }}
      >
        <XAxis
          type="number"
          stroke="oklch(0.65 0 0)"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          type="category"
          dataKey="name"
          stroke="oklch(0.65 0 0)"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          width={150}
        />
        <Tooltip
          cursor={{ fill: "oklch(0.25 0.01 260)" }}
          contentStyle={{
            backgroundColor: "oklch(0.18 0.01 260)",
            border: "1px solid oklch(0.28 0.01 260)",
            borderRadius: "8px",
            color: "oklch(0.95 0 0)",
          }}
          labelStyle={{ color: "oklch(0.95 0 0)" }}
          formatter={(
            value: ValueType | undefined,
            _name: NameType | undefined,
            props,
          ) => {
            const num = typeof value === "number" ? value : 0;
            return [num, props.payload.fullName];
          }}
        />
        <Bar dataKey="count" radius={[0, 4, 4, 0]}>
          {chartData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
