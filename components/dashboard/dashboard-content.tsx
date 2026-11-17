// =====================================================================
// DashboardContent — ເນື້ອຫາຫຼັກຂອງ Dashboard (ທຸກຢ່າງຍົກເວັ້ນ Sidebar)
// ---------------------------------------------------------------------
// ໜ້າທີ່ສຳຄັນ: ເກັບ "ຊ່ວງເວລາທີ່ເລືອກ" (ມື້ / ອາທິດ / ເດືອນ / ປີ) ໄວ້ບ່ອນດຽວ
// ແລ້ວສົ່ງໃຫ້ທຸກກາດຜ່ານ props:
//
//   DashboardContent  (period = "month")
//     ├── Header            ← ປຸ່ມເລືອກ: ກົດແລ້ວເອີ້ນ onPeriodChange → period ປ່ຽນ
//     ├── StatCards         ← period
//     ├── SalesChart        ← period
//     ├── TopCarsCard       ← period
//     └── RecentOrdersCard  ← period
//
// ເມື່ອ period ປ່ຽນ React ຈະວາດທຸກກາດໃໝ່ ທັງໜ້າຈຶ່ງປ່ຽນພ້ອມກັນ
// (ເອີ້ນວ່າ "lifting state up" = ຍ້າຍ state ຂຶ້ນໄປໄວ້ຢູ່ component ແມ່)
// =====================================================================

// ຕ້ອງໃຊ້ "use client" ເພາະມີ useState
"use client";

import { useState } from "react";
import { Header } from "@/components/dashboard/header";
import { StatCards } from "@/components/dashboard/stat-cards";
import { SalesChart } from "@/components/dashboard/sales-chart";
import { TopCarsCard } from "@/components/dashboard/top-cars-card";
import { RecentOrdersCard } from "@/components/dashboard/recent-orders-card";
import type { Period } from "@/lib/dashboard-data";

export function DashboardContent() {
  // ຊ່ວງເວລາທີ່ເລືອກຢູ່ (ເລີ່ມຕົ້ນ = ເດືອນ)
  const [period, setPeriod] = useState<Period>("month");

  return (
    // flex-1 = ກວ້າງເຕັມທີ່ເຫຼືອ, min-w-0 = ກັນເນື້ອຫາລົ້ນອອກ
    <div className="relative flex min-w-0 flex-1 flex-col gap-4">
      {/* Header ໄດ້ຮັບ period (ເພື່ອສະແດງປຸ່ມທີ່ເລືອກ) ແລະ setPeriod (ເພື່ອປ່ຽນ) */}
      <Header period={period} onPeriodChange={setPeriod} />

      {/* ກາດສະຖິຕິ 4 ອັນ */}
      <StatCards period={period} />

      {/* ແຖວກຣາຟ + ລົດຂາຍດີ: ຈໍໃຫຍ່ແບ່ງ 3 ສ່ວນ (ກຣາຟ 2 ສ່ວນ, ລົດ 1 ສ່ວນ) */}
      <div className="grid gap-4 xl:grid-cols-3">
        {/* xl:col-span-2 = ກວ້າງ 2 ຖັນ */}
        <div className="xl:col-span-2">
          <SalesChart period={period} />
        </div>
        <TopCarsCard period={period} />
      </div>

      {/* ລາຍການສັ່ງຊື້ ກວ້າງເຕັມແຖວ */}
      <RecentOrdersCard period={period} />
    </div>
  );
}
