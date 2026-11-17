// =====================================================================
// ກາດ Portfolio Performance — ກຣາຟພື້ນທີ່ (Area chart) ສີທອງ
// ---------------------------------------------------------------------
// - ກົດປຸ່ມ 1D / 1W / 1M / 6M / 1Y ເພື່ອປ່ຽນຊ່ວງເວລາ
// - ເລື່ອນເມົ້າໃສ່ກຣາຟ ຈະເຫັນ tooltip ບອກມູນຄ່າ
// ໃຊ້ shadcn Chart (ຂ້າງໃນແມ່ນ library ຊື່ recharts)
// =====================================================================

// ຕ້ອງໃຊ້ "use client" ເພາະມີ useState ແລະກຣາຟຕ້ອງວັດຂະໜາດໜ້າຈໍໃນ browser
"use client";

import { useState } from "react";
// ສ່ວນປະກອບຂອງກຣາຟຈາກ recharts:
//   AreaChart = ກຣາຟພື້ນທີ່, Area = ເສັ້ນ+ພື້ນທີ່ລົງສີ
//   CartesianGrid = ເສັ້ນຕາຕະລາງພື້ນຫຼັງ, XAxis/YAxis = ແກນນອນ/ແກນຕັ້ງ
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card } from "@/components/ui/card";
import {
  ChartContainer, // ກ່ອງຫຸ້ມກຣາຟ (ຈັດການສີ ແລະຂະໜາດ)
  ChartTooltip, // tooltip ເວລາເລື່ອນເມົ້າ
  ChartTooltipContent, // ໜ້າຕາຂອງ tooltip ແບບ shadcn
  type ChartConfig,
} from "@/components/ui/chart";
import { formatMoney, performance, type ChartRange } from "@/lib/dashboard-data";

// ປຸ່ມເລືອກຊ່ວງເວລາ
const ranges: ChartRange[] = ["1D", "1W", "1M", "6M", "1Y"];

// ຕັ້ງຄ່າກຣາຟ: ຂໍ້ມູນ "value" ໃຫ້ຊື່ວ່າ "Value" ແລະໃຊ້ສີ primary (ສີທອງ)
// ChartContainer ຈະສ້າງ CSS variable ຊື່ --color-value ໃຫ້ເຮົາໃຊ້
const chartConfig = {
  value: { label: "Value", color: "var(--primary)" },
} satisfies ChartConfig;

export function PerformanceChart() {
  // ຊ່ວງເວລາທີ່ເລືອກຢູ່ (ເລີ່ມຕົ້ນ = 1Y)
  const [range, setRange] = useState<ChartRange>("1Y");

  // ຂໍ້ມູນຂອງຊ່ວງເວລາທີ່ເລືອກ
  const data = performance[range];

  return (
    <Card className="gap-4 p-5">
      {/* ----- ແຖວຫົວ: ຫົວຂໍ້ + ປຸ່ມເລືອກຊ່ວງເວລາ ----- */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-medium">Portfolio Performance</h3>
        <div className="flex gap-1.5">
          {ranges.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRange(r)}
              className={
                range === r
                  ? "rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground"
                  : "rounded-full border px-3 py-1 text-xs text-muted-foreground hover:text-foreground"
              }
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* ----- ກຣາຟ -----
          h-64 = ສູງ 256px, w-full = ກວ້າງເຕັມກາດ
          aspect-auto = ບໍ່ບັງຄັບອັດຕາສ່ວນ ໃຫ້ໃຊ້ຄວາມສູງທີ່ກຳນົດ */}
      <ChartContainer config={chartConfig} className="aspect-auto h-64 w-full">
        {/* data = ຂໍ້ມູນ, margin = ໄລຍະຫ່າງຂອບ */}
        <AreaChart data={data} margin={{ left: 0, right: 8, top: 8 }}>
          {/* ສີໄລ່ (gradient) ສຳລັບພື້ນທີ່ໃຕ້ເສັ້ນ: ເທິງເຂັ້ມ 40% → ລຸ່ມໂປ່ງໃສ 0% */}
          <defs>
            <linearGradient id="fillValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-value)" stopOpacity={0.4} />
              <stop offset="100%" stopColor="var(--color-value)" stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* ເສັ້ນຕາຕະລາງແນວນອນ (vertical={false} = ບໍ່ມີເສັ້ນຕັ້ງ) */}
          <CartesianGrid vertical={false} strokeDasharray="3 3" />

          {/* ແກນນອນ: ໃຊ້ຄ່າ label ຂອງແຕ່ລະຈຸດ, ບໍ່ມີເສັ້ນແກນ */}
          <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} />

          {/* ແກນຕັ້ງ: ສະແດງເປັນ "150k" ແທນ "150000"
              tickFormatter = ຟັງຊັນປ່ຽນຮູບແບບຕົວເລກ */}
          <YAxis
            width={44}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value: number) => `${value / 1000}k`}
          />

          {/* tooltip ເວລາເລື່ອນເມົ້າ: ສະແດງມູນຄ່າເປັນເງິນ */}
          <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={(value) => formatMoney(Number(value))}
                indicator="line"
              />
            }
          />

          {/* ເສັ້ນກຣາຟ + ພື້ນທີ່:
              type="monotone" = ເສັ້ນໂຄ້ງລຽບ (ບໍ່ຫັກມຸມ)
              fill="url(#fillValue)" = ໃຊ້ສີໄລ່ທີ່ສ້າງໄວ້ໃນ defs
              isAnimationActive={false} = ປິດ animation ໃຫ້ກຣາຟສະແດງທັນທີ */}
          <Area
            dataKey="value"
            type="monotone"
            stroke="var(--color-value)"
            strokeWidth={2}
            fill="url(#fillValue)"
            isAnimationActive={false}
          />
        </AreaChart>
      </ChartContainer>
    </Card>
  );
}
