// =====================================================================
// ໜ້າ Dashboard (URL: /dashboard)
// ---------------------------------------------------------------------
// ໜ້າທີ່: ສະແດງພາບລວມການລົງທຶນ ຫຼັງຈາກ Login ສຳເລັດ
// ໄຟລ໌ນີ້ພຽງແຕ່ "ປະກອບ" ສ່ວນຕ່າງໆເຂົ້າກັນ, ລາຍລະອຽດຂອງແຕ່ລະສ່ວນ
// ຢູ່ໃນໂຟນເດີ components/dashboard/ (ແຍກໄຟລ໌ເພື່ອໃຫ້ອ່ານງ່າຍ)
//
// ໂຄງສ້າງ (ຈໍໃຫຍ່):
//   ┌──────────┬────────────────────────────────────┐
//   │          │ Header                             │
//   │ Sidebar  ├───────────┬───────────┬────────────┤
//   │          │ Holding + │ Watchlist │ Portfolio  │
//   │          │ Insight   │           │            │
//   │          ├───────────┴───────────┴────────────┤
//   │          │ Performance Chart                  │
//   └──────────┴────────────────────────────────────┘
// ມືຖື: ເຊື່ອງ Sidebar ແລະລຽງທຸກກາດລົງລຸ່ມເປັນຖັນດຽວ
// =====================================================================

import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { TotalHoldingCard } from "@/components/dashboard/total-holding-card";
import { InsightCard } from "@/components/dashboard/insight-card";
import { WatchlistCard } from "@/components/dashboard/watchlist-card";
import { PortfolioCard } from "@/components/dashboard/portfolio-card";
import { PerformanceChart } from "@/components/dashboard/performance-chart";

export default function DashboardPage() {
  return (
    // relative = ໃຫ້ແສງເຮືອງດ້ານຫຼັງວາງຕຳແໜ່ງອີງໃສ່ກ່ອງນີ້
    // flex gap-4 = Sidebar ກັບເນື້ອຫາຢູ່ຄຽງກັນ, p-4 = ໄລຍະຫ່າງຂອບ
    <main className="relative flex flex-1 gap-4 overflow-hidden p-4">
      {/* ແສງເຮືອງສີທອງຈາງໆ ມຸມຂວາເທິງ ໃຫ້ພື້ນຫຼັງມີມິຕິ
          pointer-events-none = ບໍ່ໃຫ້ບັງການກົດປຸ່ມ */}
      <div className="pointer-events-none absolute -top-40 right-0 size-120 rounded-full bg-primary/10 blur-3xl" />

      {/* ===== ແຖບເມນູດ້ານຊ້າຍ ===== */}
      <Sidebar />

      {/* ===== ເນື້ອຫາຫຼັກ =====
          flex-1 = ກວ້າງເຕັມທີ່ເຫຼືອ, min-w-0 = ກັນເນື້ອຫາລົ້ນອອກ */}
      <div className="relative flex min-w-0 flex-1 flex-col gap-4">
        <Header />

        {/* ແຖວກາດ 3 ຖັນ (ຈໍໃຫຍ່), 1 ຖັນ (ມືຖື) */}
        <div className="grid gap-4 lg:grid-cols-3">
          {/* ຖັນທີ 1: ກາດ 2 ອັນຊ້ອນກັນ */}
          <div className="flex flex-col gap-4">
            <TotalHoldingCard />
            <InsightCard />
          </div>
          {/* ຖັນທີ 2 */}
          <WatchlistCard />
          {/* ຖັນທີ 3 */}
          <PortfolioCard />
        </div>

        {/* ກຣາຟ ກວ້າງເຕັມແຖວ */}
        <PerformanceChart />
      </div>
    </main>
  );
}
