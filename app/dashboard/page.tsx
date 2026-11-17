// =====================================================================
// ໜ້າ Dashboard (URL: /dashboard) — ຮ້ານຂາຍລົດ Moora Auto Service
// ---------------------------------------------------------------------
// ໜ້າທີ່: ໃຫ້ເຈົ້າຂອງຮ້ານເບິ່ງພາບລວມ: ຍອດຂາຍ, ລົດໃນສາງ ແລະການສັ່ງຊື້
// ເລືອກເບິ່ງຂໍ້ມູນຕາມຊ່ວງເວລາ: ມື້ / ອາທິດ / ເດືອນ / ປີ (ປຸ່ມຢູ່ໃນສ່ວນຫົວ)
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
import { DashboardContent } from "@/components/dashboard/dashboard-content";

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
            Header, ກາດສະຖິຕິ, ກຣາຟ, ລົດຂາຍດີ, ການສັ່ງຊື້
            ຢູ່ໃນ DashboardContent ເພາະທຸກອັນຕ້ອງໃຊ້ "ຊ່ວງເວລາທີ່ເລືອກ" ຮ່ວມກັນ */}
        <DashboardContent />
      </main>
    </AuthGuard>
  );
}
