// =====================================================================
// Header — ສ່ວນຫົວຂອງ Dashboard
// ---------------------------------------------------------------------
// - ແຖວທີ 1: "ສະບາຍດີ, <ຊື່>" + ປຸ່ມ 🔔 ⚙️ ພາສາ dark mode + ໂປຣໄຟລ໌
// - ແຖວທີ 2: ແທັບ ພາບລວມ / ການຂາຍ / ສາງລົດ + ຊ່ອງຄົ້ນຫາ
// ຂໍ້ຄວາມທັງໝົດມາຈາກ lib/translations.ts (ປ່ຽນຕາມພາສາ)
// ຊື່ ແລະ email ດຶງມາຈາກ localStorage (ບັນທຶກໄວ້ຕອນ Register)
// =====================================================================

// ຕ້ອງໃຊ້ "use client" ເພາະມີ useState, useEffect ແລະ localStorage
"use client";

import { useEffect, useState } from "react";
import { Bell, LogOut, Search, Settings } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { useLanguage } from "@/components/language-provider";
import { LogoutButton } from "@/components/dashboard/logout-button";
import { loadUser, type User } from "@/lib/user";

// ລາຍການແທັບ: ແຕ່ລະຄ່າ = ຊື່ຂໍ້ຄວາມໃນ t.dashboard.tabs
const tabs = ["overview", "sales", "inventory"] as const;

export function Header() {
  // t = ຂໍ້ຄວາມຕາມພາສາທີ່ເລືອກ
  const { t } = useLanguage();
  // ຂໍ້ມູນຜູ້ໃຊ້: ເລີ່ມຕົ້ນເປັນ null (ຍັງບໍ່ໄດ້ອ່ານ)
  const [user, setUser] = useState<User | null>(null);
  // ແທັບທີ່ເລືອກຢູ່
  // (typeof tabs)[number] = ຄ່າໃດໜຶ່ງໃນ tabs ("overview" | "sales" | "inventory")
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("overview");

  // ອ່ານຂໍ້ມູນຜູ້ໃຊ້ຈາກ localStorage ຫຼັງຈາກໜ້າສະແດງແລ້ວ
  // (ຕ້ອງເຮັດໃນ useEffect ເພາະ localStorage ມີສະເພາະໃນ browser, ບໍ່ມີຢູ່ server)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- ອ່ານຄ່າຈາກ localStorage ເທື່ອດຽວຕອນໂຫຼດ
    setUser(loadUser());
  }, []);

  // ຖ້າຍັງບໍ່ມີຂໍ້ມູນ (ຍັງບໍ່ເຄີຍ Register) ໃຫ້ສະແດງ "ແຂກ" (ຫຼື "Guest" ໃນພາສາອັງກິດ)
  // "??" = ຖ້າຄ່າທາງຊ້າຍເປັນ null/undefined ໃຫ້ໃຊ້ຄ່າທາງຂວາແທນ
  // "?." = ຖ້າ user ເປັນ null ຈະບໍ່ error ແຕ່ໃຫ້ຄ່າ undefined
  const name = user?.name ?? t.dashboard.guest;
  const email = user?.email ?? "";
  // ຕົວອັກສອນທຳອິດຂອງຊື່ ໃຊ້ເປັນຮູບໂປຣໄຟລ໌ ເຊັ່ນ "Somchai" → "S"
  const initial = name.charAt(0).toUpperCase();

  return (
    <header className="flex flex-col gap-4">
      {/* ===== ແຖວທີ 1 ===== */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          {/* ຊື່ຜູ້ໃຊ້ເປັນສີທອງ */}
          <h1 className="text-2xl font-semibold sm:text-3xl">
            {t.dashboard.welcome} <span className="text-primary">{name}</span>
          </h1>
          <p className="text-sm text-muted-foreground">{t.dashboard.subtitle}</p>
        </div>

        <div className="flex items-center gap-2">
          {/* ປຸ່ມໄອຄອນ: rounded-full = ກົມ */}
          <Button variant="outline" size="icon" className="rounded-full" aria-label={t.dashboard.notifications}>
            <Bell />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full" aria-label={t.dashboard.settings}>
            <Settings />
          </Button>
          <LanguageToggle />
          <ThemeToggle />
          {/* ປຸ່ມ Logout ສຳລັບມືຖື (lg:hidden = ເຊື່ອງໃນຈໍໃຫຍ່ ເພາະມີໃນ Sidebar ແລ້ວ) */}
          <LogoutButton
            className={buttonVariants({ variant: "outline", size: "icon", className: "rounded-full lg:hidden" })}
          >
            <LogOut />
          </LogoutButton>

          {/* ໂປຣໄຟລ໌: ວົງມົນສີທອງມີຕົວອັກສອນທຳອິດ + ຊື່ + email
              hidden sm:block = ເຊື່ອງຊື່ໃນຈໍນ້ອຍຫຼາຍ */}
          <div className="ml-2 flex items-center gap-2">
            <div className="flex size-10 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground">
              {initial}
            </div>
            <div className="hidden text-sm sm:block">
              <p className="font-medium">{name}</p>
              <p className="text-xs text-muted-foreground">{email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== ແຖວທີ 2: ແທັບ + ຊ່ອງຄົ້ນຫາ ===== */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* ແທັບ: ກົດແລ້ວປ່ຽນ activeTab (ຕອນນີ້ປ່ຽນແຕ່ສີ ຍັງບໍ່ປ່ຽນເນື້ອຫາ) */}
        <div className="flex gap-1 rounded-full border bg-card p-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              // ແທັບທີ່ເລືອກ: ພື້ນສີທອງອ່ອນ, ແທັບອື່ນ: ສີຈາງ
              className={
                activeTab === tab
                  ? "rounded-full bg-primary/15 px-4 py-1.5 text-sm font-medium text-primary"
                  : "rounded-full px-4 py-1.5 text-sm text-muted-foreground hover:text-foreground"
              }
            >
              {t.dashboard.tabs[tab]}
            </button>
          ))}
        </div>

        {/* ຊ່ອງຄົ້ນຫາ (ພຽງໜ້າຕາ ຍັງຄົ້ນຫາບໍ່ໄດ້) */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder={t.dashboard.search} className="h-10 rounded-full bg-card pl-10" />
        </div>
      </div>
    </header>
  );
}
