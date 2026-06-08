import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

function Statistics({ data }) {
  const today = new Date();
  const chartData = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
    const dayName = date.toLocaleDateString("ru-RU", { weekday: "short" });
    const dateString = date.toISOString().slice(0, 10);
    const count = data.filter((d) => d === dateString).length;
    chartData.push({ day: dayName, count: count });
  }

  return (
    <div className="chart-container">
      <h2 className="chart-title">Статистика за последние 7 дней</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.1)"
            vertical={false}
          />
          <XAxis
            dataKey="day"
            stroke="var(--text-secondary)"
            tick={{ fill: "var(--text-secondary)", fontSize: 14 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            allowDecimals={false}
            stroke="var(--text-secondary)"
            tick={{ fill: "var(--text-secondary)", fontSize: 14 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            separator="" // Убирает стандартное двоеточие ":"
            formatter={(value) => [value, ""]} // Убирает имя ключа "count"
            contentStyle={{
              background: "rgba(30, 30, 47, 0.95)",
              border: "1px solid var(--accent)",
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
              color: "#fff",
            }}
            itemStyle={{ color: "#fff" }}
            cursor={{ fill: "rgba(138, 92, 246, 0.1)" }}
          />

          <Bar dataKey="count" radius={[8, 8, 0, 0]} barSize={40}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill="url(#pomodoroGradient)" />
            ))}
          </Bar>
          <defs>
            <linearGradient id="pomodoroGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity={1} />
              <stop
                offset="100%"
                stopColor="rgba(138, 92, 246, 0.5)"
                stopOpacity={0.8}
              />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Statistics;
