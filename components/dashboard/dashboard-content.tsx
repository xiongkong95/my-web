// =====================================================================
// DashboardContent — ເນື້ອຫາຫຼັກຂອງ Dashboard (ທຸກຢ່າງຍົກເວັ້ນ Sidebar)
// ---------------------------------------------------------------------
// ໜ້າທີ່ສຳຄັນ: ເກັບ "ຊ່ວງເວລາທີ່ເລືອກ" (ມື້ / ອາທິດ / ເດືອນ / ປີ) ໄວ້ບ່ອນດຽວ
// (ແລະຈື່ໄວ້ໃນ localStorage, refresh ແລ້ວຍັງເປັນຊ່ວງເດີມ)
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

import { useEffect, useState } from "react";
import { Header } from "@/components/dashboard/header";
import { StatCards } from "@/components/dashboard/stat-cards";
import { SalesChart } from "@/components/dashboard/sales-chart";
import { TopCarsCard } from "@/components/dashboard/top-cars-card";
import { RecentOrdersCard } from "@/components/dashboard/recent-orders-card";
import { periods, type Period } from "@/lib/dashboard-data";

// ຊື່ key ທີ່ໃຊ້ເກັບຊ່ວງເວລາໃນ localStorage
const STORAGE_KEY = "period";

export function DashboardContent() {
  // ຊ່ວງເວລາທີ່ເລືອກຢູ່ (ເລີ່ມຕົ້ນ = ເດືອນ)
  const [period, setPeriodState] = useState<Period>("month");

  // ເມື່ອເປີດໜ້າ: ອ່ານຊ່ວງເວລາທີ່ເຄີຍເລືອກໄວ້ (ຄືກັບການຈື່ພາສາ ແລະ dark mode)
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    // ກວດກ່ອນວ່າຄ່າທີ່ອ່ານໄດ້ ເປັນຊ່ວງເວລາທີ່ຖືກຕ້ອງບໍ່ (includes = ມີຢູ່ໃນ array ບໍ່)
    // "as Period" = ບອກ TypeScript ໃຫ້ຖືວ່າເປັນ Period (ເຮົາກວດແລ້ວ ຈຶ່ງປອດໄພ)
    if (saved !== null && periods.includes(saved as Period)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- ອ່ານຄ່າຈາກ localStorage ເທື່ອດຽວຕອນໂຫຼດ
      setPeriodState(saved as Period);
    }
  }, []);

  // ປ່ຽນຊ່ວງເວລາ + ບັນທຶກໄວ້ ເພື່ອຈື່ເຖິງວ່າຈະ refresh
  function setPeriod(newPeriod: Period) {
    setPeriodState(newPeriod);
    localStorage.setItem(STORAGE_KEY, newPeriod);
  }

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
