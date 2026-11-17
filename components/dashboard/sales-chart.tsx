// =====================================================================
// ກາດ Sales Overview — ກຣາຟຍອດຂາຍ (Area chart) ສີທອງ
// ---------------------------------------------------------------------
// - ຂໍ້ມູນປ່ຽນຕາມປຸ່ມ ມື້ / ອາທິດ / ເດືອນ / ປີ ໃນສ່ວນຫົວ (ຮັບມາເປັນ props: period)
//     ມື້ = ລາຍຊົ່ວໂມງ, ອາທິດ = ລາຍວັນ, ເດືອນ = ລາຍອາທິດ, ປີ = ລາຍເດືອນ
// - ເລື່ອນເມົ້າໃສ່ກຣາຟ ຈະເຫັນ tooltip ບອກຍອດຂາຍ ທັງ ກີບ ແລະ ໂດລາ
// - ປ້າຍແກນລຸ່ມ (ວັນ/ເດືອນ) ແປຕາມພາສາດ້ວຍ translateLabel
// ໃຊ້ shadcn Chart (ຂ້າງໃນແມ່ນ library ຊື່ recharts)
// =====================================================================

// ຕ້ອງໃຊ້ "use client" ເພາະກຣາຟຕ້ອງວັດຂະໜາດໜ້າຈໍໃນ browser
"use client";

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
import { formatKip, formatKipShort, formatUSD, sales, totalSales, type Period } from "@/lib/dashboard-data";
import { translateLabel } from "@/lib/translations";
import { useLanguage } from "@/components/language-provider";

// props: period = ຊ່ວງເວລາທີ່ເລືອກ (ສົ່ງມາຈາກ DashboardContent)
export function SalesChart({ period }: { period: Period }) {
  // t = ຂໍ້ຄວາມຕາມພາສາທີ່ເລືອກ
  const { t } = useLanguage();

  // ຕັ້ງຄ່າກຣາຟ: ຂໍ້ມູນ "value" ໃຫ້ຊື່ວ່າ "ຍອດຂາຍ" ແລະໃຊ້ສີ primary (ສີທອງ)
  // ChartContainer ຈະສ້າງ CSS variable ຊື່ --color-value ໃຫ້ເຮົາໃຊ້
  // (ສ້າງໃນ component ເພາະຊື່ label ປ່ຽນຕາມພາສາ)
  const chartConfig = {
    value: { label: t.chart.sales, color: "var(--primary)" },
  } satisfies ChartConfig;

  // ຂໍ້ມູນຂອງຊ່ວງເວລາທີ່ເລືອກ
  const data = sales[period];

  // ຍອດລວມຂອງຊ່ວງເວລານີ້ (ຕົວເລກດຽວກັບກາດລາຍຮັບ)
  const total = totalSales(period);

  return (
    // h-full = ສູງເທົ່າກາດອື່ນໃນແຖວດຽວກັນ
    <Card className="h-full gap-4 p-5">
      {/* ----- ແຖວຫົວ: ຫົວຂໍ້ + ຊ່ວງເວລາ + ຍອດລວມ ----- */}
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-medium">{t.chart.title}</h3>
          {/* ປ້າຍບອກຊ່ວງເວລາ ເຊັ່ນ "4 ອາທິດລ່າສຸດ" */}
          <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-xs text-primary">
            {t.periodRange[period]}
          </span>
        </div>
        {/* ຍອດລວມ: ກີບ (ໃຫຍ່) + ໂດລາ (ນ້ອຍ) */}
        <p className="mt-1 text-2xl font-semibold">{formatKip(total)}</p>
        <p className="text-sm text-muted-foreground">≈ {formatUSD(total)}</p>
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

          {/* ແກນນອນ: ໃຊ້ຄ່າ label ຂອງແຕ່ລະຈຸດ ແລ້ວແປຕາມພາສາ, ບໍ່ມີເສັ້ນແກນ */}
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(label: string) => translateLabel(t, label)}
          />

          {/* ແກນຕັ້ງ: ສະແດງເປັນກີບແບບສັ້ນ ເຊັ່ນ "6.45B ₭"
              tickFormatter = ຟັງຊັນປ່ຽນຮູບແບບຕົວເລກ */}
          <YAxis
            width={64}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value: number) => formatKipShort(value)}
          />

          {/* tooltip ເວລາເລື່ອນເມົ້າ: ສະແດງທັງ ກີບ ແລະ ໂດລາ */}
          <ChartTooltip
            content={
              <ChartTooltipContent
                // labelFormatter = ແປຫົວຂໍ້ tooltip (ວັນ/ເດືອນ) ຕາມພາສາ
                labelFormatter={(label) => translateLabel(t, String(label))}
                formatter={(value) => `${formatKip(Number(value))} (${formatUSD(Number(value))})`}
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
