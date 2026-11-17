// =====================================================================
// ກາດສະຖິຕິ 4 ອັນ — ລົດໃນສາງ, ຂາຍໄດ້ເດືອນນີ້, ລາຍຮັບ, ລູກຄ້າໃໝ່
// ---------------------------------------------------------------------
// ແຕ່ລະກາດມີ: ໄອຄອນ + ຫົວຂໍ້ + ຕົວເລກ + % ປ່ຽນແປງທຽບກັບເດືອນກ່ອນ
// ຂໍ້ຄວາມມາຈາກ lib/translations.ts (ປ່ຽນຕາມພາສາ)
// =====================================================================

// ຕ້ອງໃຊ້ "use client" ເພາະໃຊ້ useLanguage() (ພາສາປ່ຽນໄດ້ໃນ browser)
"use client";

import { Banknote, Car, Handshake, UserPlus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { formatKipShort, formatUSD, stats } from "@/lib/dashboard-data";
import { useLanguage } from "@/components/language-provider";

export function StatCards() {
  // t = ຂໍ້ຄວາມຕາມພາສາທີ່ເລືອກ
  const { t } = useLanguage();

  // ລາຍການກາດ: ເກັບເປັນ array ແລ້ວໃຊ້ .map() ສ້າງກາດ ຈະໄດ້ບໍ່ຕ້ອງຂຽນຊ້ຳ 4 ເທື່ອ
  // (ສ້າງໃນ component ເພາະຂໍ້ຄວາມປ່ຽນຕາມພາສາ)
  //   label = ຫົວຂໍ້, icon = ໄອຄອນ
  //   value = ຕົວເລກໃຫຍ່, sub = ຂໍ້ຄວາມນ້ອຍຂ້າງລຸ່ມ (ວ່າງໄດ້)
  //   change = % ປ່ຽນແປງ
  const cards = [
    {
      label: t.stats.carsInStock,
      icon: Car,
      value: `${stats.carsInStock.value} ${t.stats.carsUnit}`,
      sub: "",
      change: stats.carsInStock.change,
    },
    {
      label: t.stats.soldThisMonth,
      icon: Handshake,
      value: `${stats.soldThisMonth.value} ${t.stats.carsUnit}`,
      sub: "",
      change: stats.soldThisMonth.change,
    },
    {
      // ລາຍຮັບ: ສະແດງທັງ ກີບ (ໃຫຍ່) ແລະ ໂດລາ (ນ້ອຍ)
      label: t.stats.revenue,
      icon: Banknote,
      value: formatKipShort(stats.revenue.value),
      sub: formatUSD(stats.revenue.value),
      change: stats.revenue.change,
    },
    {
      label: t.stats.newCustomers,
      icon: UserPlus,
      value: `${stats.newCustomers.value} ${t.stats.peopleUnit}`,
      sub: "",
      change: stats.newCustomers.change,
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

            {/* % ປ່ຽນແປງທຽບກັບເດືອນກ່ອນ */}
            <p className="text-xs text-muted-foreground">
              <span className={isUp ? "font-medium text-emerald-500" : "font-medium text-red-500"}>
                {isUp ? "+" : ""}
                {card.change}%
              </span>{" "}
              {t.stats.vsLastMonth}
            </p>
          </Card>
        );
      })}
    </div>
  );
}
