// =====================================================================
// LogoutButton — ປຸ່ມອອກຈາກລະບົບ
// ---------------------------------------------------------------------
// ກົດແລ້ວ: 1. ລຶບສະຖານະ Login ໃນ localStorage
//          2. ໄປໜ້າ /login
// ຮັບ className (ໜ້າຕາ) ແລະ children (ໄອຄອນ/ຂໍ້ຄວາມ) ຈາກບ່ອນທີ່ເອີ້ນໃຊ້
// ຈຶ່ງໃຊ້ໄດ້ທັງໃນ Sidebar ແລະ Header (ໜ້າຕາຕ່າງກັນ)
// =====================================================================

// ຕ້ອງໃຊ້ "use client" ເພາະມີ onClick ແລະ localStorage
"use client";

import { useRouter } from "next/navigation";
import { logout } from "@/lib/user";
import { useLanguage } from "@/components/language-provider";

type LogoutButtonProps = {
  className?: string; // "?" = ບໍ່ສົ່ງມາກໍໄດ້
  children: React.ReactNode;
};

export function LogoutButton({ className, children }: LogoutButtonProps) {
  const router = useRouter();
  const { t } = useLanguage();

  function handleLogout() {
    logout(); // ລຶບສະຖານະ Login
    router.push("/login"); // ກັບໄປໜ້າ Login
  }

  return (
    <button type="button" onClick={handleLogout} className={className} aria-label={t.menu.logout}>
      {children}
    </button>
  );
}
