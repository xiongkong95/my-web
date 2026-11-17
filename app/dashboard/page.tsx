// =====================================================================
// ໜ້າ Dashboard (URL: /dashboard) — ຮ້ານຂາຍລົດ Moora Auto Service
// ---------------------------------------------------------------------
// ໜ້າທີ່: ໃຫ້ເຈົ້າຂອງຮ້ານເບິ່ງພາບລວມ: ຍອດຂາຍ, ລົດໃນສາງ ແລະການສັ່ງຊື້
// ໄຟລ໌ນີ້ພຽງແຕ່ "ປະກອບ" ສ່ວນຕ່າງໆເຂົ້າກັນ, ລາຍລະອຽດຂອງແຕ່ລະສ່ວນ
// ຢູ່ໃນໂຟນເດີ components/dashboard/ (ແຍກໄຟລ໌ເພື່ອໃຫ້ອ່ານງ່າຍ)
//
// ໂຄງສ້າງ (ຈໍໃຫຍ່):
//   ┌──────────┬────────────────────────────────────┐
//   │          │ Header                             │
//   │          ├────────┬────────┬────────┬─────────┤
//   │ Sidebar  │ ສາງ    │ ຂາຍໄດ້  │ ລາຍຮັບ  │ ລູກຄ້າ   │  ← ກາດສະຖິຕິ
//   │          ├────────┴────────┴────────┼─────────┤
//   │          │ Sales Chart (2 ສ່ວນ)      │ Top Cars│
//   │          ├──────────────────────────┴─────────┤
//   │          │ Recent Orders                      │
//   └──────────┴────────────────────────────────────┘
// ມືຖື: ເຊື່ອງ Sidebar ແລະລຽງທຸກກາດລົງລຸ່ມເປັນຖັນດຽວ
// =====================================================================

import { AuthGuard } from "@/components/dashboard/auth-guard";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { StatCards } from "@/components/dashboard/stat-cards";
import { SalesChart } from "@/components/dashboard/sales-chart";
import { TopCarsCard } from "@/components/dashboard/top-cars-card";
import { RecentOrdersCard } from "@/components/dashboard/recent-orders-card";

export default function DashboardPage() {
  return (
    // AuthGuard = ກວດວ່າ Login ແລ້ວບໍ່, ຖ້າຍັງ ຈະສົ່ງກັບໄປໜ້າ /login
    <AuthGuard>
      {/* relative = ໃຫ້ແສງເຮືອງດ້ານຫຼັງວາງຕຳແໜ່ງອີງໃສ່ກ່ອງນີ້
          flex gap-4 = Sidebar ກັບເນື້ອຫາຢູ່ຄຽງກັນ, p-4 = ໄລຍະຫ່າງຂອບ */}
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

          {/* ກາດສະຖິຕິ 4 ອັນ */}
          <StatCards />

          {/* ແຖວກຣາຟ + ລົດຂາຍດີ: ຈໍໃຫຍ່ແບ່ງ 3 ສ່ວນ (ກຣາຟ 2 ສ່ວນ, ລົດ 1 ສ່ວນ) */}
          <div className="grid gap-4 xl:grid-cols-3">
            {/* xl:col-span-2 = ກວ້າງ 2 ຖັນ */}
            <div className="xl:col-span-2">
              <SalesChart />
            </div>
            <TopCarsCard />
          </div>

          {/* ລາຍການສັ່ງຊື້ ກວ້າງເຕັມແຖວ */}
          <RecentOrdersCard />
        </div>
      </main>
    </AuthGuard>
  );
}
