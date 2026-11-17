// =====================================================================
// ກາດສະຖິຕິ 4 ອັນ — ລົດໃນສາງ, ຂາຍໄດ້, ລາຍຮັບ, ລູກຄ້າໃໝ່
// ---------------------------------------------------------------------
// ແຕ່ລະກາດມີ: ໄອຄອນ + ຫົວຂໍ້ + ຕົວເລກ + % ປ່ຽນແປງ
// - ຂາຍໄດ້, ລາຍຮັບ, ລູກຄ້າໃໝ່ = ປ່ຽນຕາມຊ່ວງເວລາທີ່ເລືອກ (period)
// - ລົດໃນສາງ = ຈຳນວນຕອນນີ້ ບໍ່ປ່ຽນ
// ຂໍ້ຄວາມມາຈາກ lib/translations.ts (ປ່ຽນຕາມພາສາ)
// =====================================================================

// ຕ້ອງໃຊ້ "use client" ເພາະໃຊ້ useLanguage() (ພາສາປ່ຽນໄດ້ໃນ browser)
"use client";

import { Banknote, Car, Handshake, UserPlus } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  carsInStock,
  formatKipShort,
  formatUSD,
  periodStats,
  totalSales,
  type Period,
} from "@/lib/dashboard-data";
import { useLanguage } from "@/components/language-provider";

// props: period = ຊ່ວງເວລາທີ່ເລືອກ (ສົ່ງມາຈາກ DashboardContent)
export function StatCards({ period }: { period: Period }) {
  // t = ຂໍ້ຄວາມຕາມພາສາທີ່ເລືອກ
  const { t } = useLanguage();

  // ຂໍ້ມູນສະຖິຕິຂອງຊ່ວງເວລາທີ່ເລືອກ
  const s = periodStats[period];
  // ລາຍຮັບ = ຍອດລວມຂອງກຣາຟ (ຕົວເລກກົງກັບກຣາຟສະເໝີ)
  const revenue = totalSales(period);
  // ຂໍ້ຄວາມທ້າຍ % ເຊັ່ນ "ທຽບກັບມື້ວານ"
  const vs = t.vsPrevious[period];

  // ລາຍການກາດ: ເກັບເປັນ array ແລ້ວໃຊ້ .map() ສ້າງກາດ ຈະໄດ້ບໍ່ຕ້ອງຂຽນຊ້ຳ 4 ເທື່ອ
  //   label = ຫົວຂໍ້, icon = ໄອຄອນ
  //   value = ຕົວເລກໃຫຍ່, sub = ຂໍ້ຄວາມນ້ອຍຂ້າງລຸ່ມ (ວ່າງໄດ້)
  //   change = % ປ່ຽນແປງ, vs = ທຽບກັບຫຍັງ
  const cards = [
    {
      label: t.stats.carsInStock,
      icon: Car,
      value: `${carsInStock.value} ${t.stats.carsUnit}`,
      sub: "",
      change: carsInStock.change,
      vs: t.stats.vsLastMonth, // ລົດໃນສາງທຽບກັບເດືອນກ່ອນສະເໝີ
    },
    {
      label: t.stats.sold,
      icon: Handshake,
      value: `${s.sold} ${t.stats.carsUnit}`,
      sub: "",
      change: s.soldChange,
      vs: vs,
    },
    {
      // ລາຍຮັບ: ສະແດງທັງ ກີບ (ໃຫຍ່) ແລະ ໂດລາ (ນ້ອຍ)
      label: t.stats.revenue,
      icon: Banknote,
      value: formatKipShort(revenue),
      sub: formatUSD(revenue),
      change: s.revenueChange,
      vs: vs,
    },
    {
      label: t.stats.newCustomers,
      icon: UserPlus,
      value: `${s.newCustomers} ${t.stats.peopleUnit}`,
      sub: "",
      change: s.customersChange,
      vs: vs,
    },
  ];

  return (
    // grid: ມືຖື 1 ຖັນ, ຈໍກາງ (sm) 2 ຖັນ, ຈໍໃຫຍ່ (xl) 4 ຖັນ
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        // ເອົາໄອຄອນມາໃສ່ຕົວແປທີ່ຂຶ້ນຕົ້ນດ້ວຍຕົວໃຫຍ່ ເພື່ອໃຊ້ເປັນ <Icon /> ໄດ້
        const Icon = card.icon;
        // ຂຶ້ນ (>= 0) = ສີຂຽວ ມີ "+", ລົງ = ສີແດງ
        const isUp = card.change >= 0;

        return (
          <Card key={card.label} className="gap-3 p-5">
            {/* ແຖວເທິງ: ຫົວຂໍ້ ຊ້າຍ + ໄອຄອນໃນວົງມົນສີທອງ ຂວາ */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{card.label}</p>
              <div className="flex size-9 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Icon className="size-4" />
              </div>
            </div>

            {/* ຕົວເລກໃຫຍ່ */}
            <div>
              <p className="text-2xl font-semibold">{card.value}</p>
              {/* ຂໍ້ຄວາມນ້ອຍ: ສະແດງສະເພາະກາດທີ່ມີ sub (&& = ຖ້າມີຄ່າ ຈຶ່ງສະແດງ) */}
              {card.sub && <p className="text-sm text-muted-foreground">≈ {card.sub}</p>}
            </div>

            {/* % ປ່ຽນແປງ ທຽບກັບຊ່ວງກ່ອນໜ້າ */}
            <p className="text-xs text-muted-foreground">
              <span className={isUp ? "font-medium text-emerald-500" : "font-medium text-red-500"}>
                {isUp ? "+" : ""}
                {card.change}%
              </span>{" "}
              {card.vs}
            </p>
          </Card>
        );
      })}
    </div>
  );
}
