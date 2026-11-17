// =====================================================================
// Sidebar — ແຖບເມນູດ້ານຊ້າຍຂອງ Dashboard
// ---------------------------------------------------------------------
// - ເທິງ: ໂລໂກ້ລົດ + ຊື່ຮ້ານ "Moora Auto Service"
// - ກາງ: ເມນູຫຼັກ (ໜ້າຫຼັກ, ລົດ, ການສັ່ງຊື້, ...)
// - ລຸ່ມ: ຕັ້ງຄ່າ, ຊ່ວຍເຫຼືອ, ອອກຈາກລະບົບ
// ຂໍ້ຄວາມເມນູມາຈາກ lib/translations.ts (ປ່ຽນຕາມພາສາ)
// ໝາຍເຫດ: ເມນູຍັງບໍ່ມີໜ້າແທ້ (href="#") ຍົກເວັ້ນ Logout (ໃຊ້ LogoutButton)
// =====================================================================

// ຕ້ອງໃຊ້ "use client" ເພາະໃຊ້ useLanguage() (ພາສາປ່ຽນໄດ້ໃນ browser)
"use client";

import Link from "next/link";
import {
  Car,
  ChartColumn,
  ClipboardList,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Settings,
  Users,
} from "lucide-react";
import { CarLogo } from "@/components/icons";
import { LogoutButton } from "@/components/dashboard/logout-button";
import { useLanguage } from "@/components/language-provider";

// ລາຍການເມນູຫຼັກ:
//   key = ຊື່ຂໍ້ຄວາມໃນ t.menu (ເຊັ່ນ "cars" → t.menu.cars = "ລົດ")
//   icon = ໄອຄອນ, active = ເປັນໜ້າປັດຈຸບັນບໍ່
// "as const" = ບອກ TypeScript ວ່າ key ມີແຕ່ຄ່າເຫຼົ່ານີ້ (ຈະໄດ້ໃຊ້ t.menu[item.key] ໄດ້)
const mainMenu = [
  { key: "dashboard", icon: LayoutDashboard, active: true },
  { key: "cars", icon: Car, active: false }, // ລົດທັງໝົດໃນສາງ
  { key: "orders", icon: ClipboardList, active: false }, // ການສັ່ງຊື້
  { key: "customers", icon: Users, active: false }, // ລູກຄ້າ
  { key: "reports", icon: ChartColumn, active: false }, // ລາຍງານ
] as const;

// ເມນູດ້ານລຸ່ມ
const bottomMenu = [
  { key: "settings", icon: Settings },
  { key: "support", icon: LifeBuoy },
] as const;

// class ຂອງແຕ່ລະແຖວເມນູ (ໃຊ້ຊ້ຳ ຈຶ່ງເກັບໄວ້ໃນຕົວແປ)
const itemClass =
  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground";

export function Sidebar() {
  // t = ຂໍ້ຄວາມຕາມພາສາທີ່ເລືອກ
  const { t } = useLanguage();

  return (
    // aside = ແທັກສຳລັບເນື້ອຫາດ້ານຂ້າງ
    // hidden lg:flex = ເຊື່ອງໃນມືຖື, ສະແດງສະເພາະຈໍໃຫຍ່
    // w-60 = ກວ້າງຄົງທີ່, shrink-0 = ບໍ່ໃຫ້ຖືກບີບໃຫ້ແຄບລົງ
    <aside className="hidden w-60 shrink-0 flex-col rounded-2xl border bg-card p-4 lg:flex">
      {/* ----- ໂລໂກ້ລົດ + ຊື່ຮ້ານ (2 ແຖວ ເພາະຊື່ຍາວ) ----- */}
      <div className="mb-8 flex items-center gap-3 px-2 pt-2">
        <CarLogo className="w-12 shrink-0 text-primary" />
        {/* leading-tight = ໄລຍະຫ່າງລະຫວ່າງແຖວແຄບລົງ */}
        <div className="leading-tight">
          <p className="font-semibold">Moora Auto</p>
          <p className="text-xs text-muted-foreground">Service</p>
        </div>
      </div>

      {/* ----- ເມນູຫຼັກ -----
          nav = ແທັກສຳລັບກຸ່ມລິ້ງນຳທາງ
          flex-1 = ຍືດເຕັມພື້ນທີ່ ເພື່ອດັນເມນູລຸ່ມລົງໄປຢູ່ລຸ່ມສຸດ */}
      <nav className="flex flex-1 flex-col gap-1">
        {mainMenu.map((item) => {
          // ເອົາໄອຄອນມາໃສ່ຕົວແປທີ່ຂຶ້ນຕົ້ນດ້ວຍຕົວໃຫຍ່ ເພື່ອໃຊ້ເປັນ <Icon /> ໄດ້
          const Icon = item.icon;
          return (
            <Link
              key={item.key}
              href="#"
              // ຖ້າເປັນເມນູທີ່ເລືອກຢູ່ (active): ພື້ນສີທອງອ່ອນ + ຕົວໜັງສືສີທອງ
              className={
                item.active
                  ? "flex items-center gap-3 rounded-xl bg-primary/15 px-3 py-2.5 text-sm font-medium text-primary"
                  : itemClass
              }
            >
              <Icon className="size-4" />
              {t.menu[item.key]}
            </Link>
          );
        })}
      </nav>

      {/* ----- ເມນູດ້ານລຸ່ມ ----- */}
      <div className="flex flex-col gap-1">
        {bottomMenu.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.key} href="#" className={itemClass}>
              <Icon className="size-4" />
              {t.menu[item.key]}
            </Link>
          );
        })}
        {/* Logout: ລຶບສະຖານະ Login ແລ້ວກັບໄປໜ້າ Login */}
        <LogoutButton className={itemClass}>
          <LogOut className="size-4" />
          {t.menu.logout}
        </LogoutButton>
      </div>
    </aside>
  );
}
