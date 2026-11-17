// =====================================================================
// ກາດ Watchlist — ລາຍການຫຸ້ນທີ່ຕິດຕາມ ແບ່ງເປັນ 3 ແທັບ
// ---------------------------------------------------------------------
// ກົດແທັບ Most Viewed / Gain / Lose ແລ້ວລາຍການຈະປ່ຽນຕາມ
// =====================================================================

// ຕ້ອງໃຊ້ "use client" ເພາະມີ useState
"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { formatMoney, watchlist } from "@/lib/dashboard-data";

// ລາຍການແທັບ: key = ຊື່ໃນຂໍ້ມູນ (ຕ້ອງກົງກັບ watchlist ໃນ dashboard-data), label = ຂໍ້ຄວາມທີ່ສະແດງ
// "as const" = ບອກ TypeScript ວ່າຄ່າເຫຼົ່ານີ້ບໍ່ປ່ຽນ (ໃຫ້ມັນຮູ້ວ່າ key ມີແຕ່ 3 ຄ່ານີ້)
const tabs = [
  { key: "mostViewed", label: "Most Viewed" },
  { key: "gain", label: "Gain" },
  { key: "lose", label: "Lose" },
] as const;

export function WatchlistCard() {
  // ແທັບທີ່ເລືອກຢູ່ (ເລີ່ມຕົ້ນ = mostViewed)
  const [activeTab, setActiveTab] = useState<"mostViewed" | "gain" | "lose">("mostViewed");

  // ເອົາລາຍການຫຸ້ນຂອງແທັບທີ່ເລືອກ
  const stocks = watchlist[activeTab];

  return (
    <Card className="gap-4 p-5">
      <h3 className="font-medium">Watchlist</h3>

      {/* ----- ແທັບ ----- */}
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={
              activeTab === tab.key
                ? "rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary"
                : "rounded-full border px-3 py-1 text-xs text-muted-foreground hover:text-foreground"
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ----- ລາຍການຫຸ້ນ -----
          divide-y = ໃສ່ເສັ້ນຂັ້ນລະຫວ່າງແຕ່ລະແຖວອັດຕະໂນມັດ */}
      <div className="flex flex-col divide-y">
        {stocks.map((stock) => (
          <div key={stock.ticker} className="flex items-center gap-3 py-2.5">
            {/* ວົງມົນມີຕົວອັກສອນທຳອິດຂອງຊື່ ແທນໂລໂກ້ບໍລິສັດ */}
            <div className="flex size-8 items-center justify-center rounded-full bg-muted text-xs font-semibold">
              {stock.name.charAt(0)}
            </div>

            {/* ຊື່ + ຕະຫຼາດ (flex-1 = ຍືດເຕັມທີ່ເຫຼືອ ດັນລາຄາໄປຂວາ) */}
            <div className="flex-1">
              <p className="text-sm font-medium">{stock.name}</p>
              <p className="text-xs text-muted-foreground">
                {stock.exchange} · {stock.ticker}
              </p>
            </div>

            {/* ລາຄາ + % ປ່ຽນແປງ (text-right = ຈັດຂວາ) */}
            <div className="text-right">
              <p className="text-sm font-medium">{formatMoney(stock.price)}</p>
              {/* ຖ້າ % ເປັນບວກ (>= 0): ສີຂຽວ ແລະໃສ່ "+" ຂ້າງໜ້າ, ຖ້າລົບ: ສີແດງ */}
              <p
                className={
                  stock.changePercent >= 0 ? "text-xs text-emerald-500" : "text-xs text-red-500"
                }
              >
                {stock.changePercent >= 0 ? "+" : ""}
                {stock.changePercent}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
