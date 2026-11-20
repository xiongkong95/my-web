"use client";

import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { formatKip, formatKipShort, formatUSD, sales, totalSales, type Period } from "@/lib/dashboard-data";
import { translateLabel } from "@/lib/translations";
import { useLanguage } from "@/components/language-provider";

export function SalesChart({ period }: { period: Period }) {
  const { t } = useLanguage();

  const chartConfig = {
    value: { label: t.chart.sales, color: "var(--primary)" },
  } satisfies ChartConfig;

  const data = sales[period];

  const total = totalSales(period);

  const chartMargin = { left: 0, right: 8, top: 8 };

  const grid = <CartesianGrid vertical={false} strokeDasharray="3 3" />;

  const xAxis = (
    <XAxis
      dataKey="label"
      tickLine={false}
      axisLine={false}
      tickMargin={8}
      tickFormatter={(label: string) => translateLabel(t, label)}
    />
  );

  const yAxis = (
    <YAxis width={64} tickLine={false} axisLine={false} tickFormatter={(value: number) => formatKipShort(value)} />
  );

  const tooltip = (
    <ChartTooltip
      content={
        <ChartTooltipContent
          labelFormatter={(label) => translateLabel(t, String(label))}
          formatter={(value) => `${formatKip(Number(value))} (${formatUSD(Number(value))})`}
          indicator="line"
        />
      }
    />
  );

  return (
    <Card className="h-full gap-4 p-5">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-medium">{t.chart.title}</h3>
          <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-xs text-primary">
            {t.periodRange[period]}
          </span>
        </div>
        <p className="mt-1 text-2xl font-semibold">{formatKip(total)}</p>
        <p className="text-sm text-muted-foreground">≈ {formatUSD(total)}</p>
      </div>

      <ChartContainer config={chartConfig} className="aspect-auto h-64 w-full">
        {period === "day" ? (
          <BarChart data={data} margin={chartMargin}>
            {grid}
            {xAxis}
            {yAxis}
            {tooltip}
            <Bar dataKey="value" fill="var(--color-value)" radius={[6, 6, 0, 0]} isAnimationActive={false} />
          </BarChart>
        ) : (
          <AreaChart data={data} margin={chartMargin}>
            <defs>
              <linearGradient id="fillValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-value)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="var(--color-value)" stopOpacity={0} />
              </linearGradient>
            </defs>
            {grid}
            {xAxis}
            {yAxis}
            {tooltip}
            <Area
              dataKey="value"
              type="monotone"
              stroke="var(--color-value)"
              strokeWidth={2}
              fill="url(#fillValue)"
              isAnimationActive={false}
            />
          </AreaChart>
        )}
      </ChartContainer>
    </Card>
  );
}
