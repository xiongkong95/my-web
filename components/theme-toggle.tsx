// =====================================================================
// ປຸ່ມສະຫຼັບ Light / Dark mode
// ---------------------------------------------------------------------
// ວິທີເຮັດວຽກ:
//   - ເພີ່ມ class "dark" ໃສ່ແທັກ <html>  → ເວັບປ່ຽນເປັນສີມືດ
//   - ລຶບ class "dark" ອອກ              → ເວັບກັບເປັນສີແຈ້ງ
//   (ສີຂອງແຕ່ລະໂໝດ ກຳນົດໄວ້ໃນ app/globals.css ຢູ່ :root ແລະ .dark)
//   - ບັນທຶກໂໝດທີ່ເລືອກໄວ້ໃນ localStorage ເພື່ອຈື່ໄວ້ ເຖິງວ່າຈະ refresh ໜ້າ
// =====================================================================

// ຕ້ອງໃຊ້ "use client" ເພາະມີ onClick, useEffect ແລະ localStorage (ມີສະເພາະໃນ browser)
"use client";

import { useEffect } from "react"; // useEffect = ເຮັດວຽກບາງຢ່າງຫຼັງຈາກສະແດງໜ້າແລ້ວ
import { Moon, Sun } from "lucide-react"; // ໄອຄອນດວງຈັນ ແລະ ດວງຕາເວັນ
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider"; // ເອົາຂໍ້ຄວາມຕາມພາສາ

// "export" (ບໍ່ມີ default) = ສົ່ງອອກໄປ ເພື່ອໃຫ້ໄຟລ໌ອື່ນ import { ThemeToggle } ໄປໃຊ້ໄດ້
export function ThemeToggle() {
  const { t } = useLanguage();

  // ---------- ເມື່ອເປີດໜ້າເວັບ: ອ່ານໂໝດທີ່ເຄີຍບັນທຶກໄວ້ ----------
  // [] ຢູ່ທ້າຍ = ໃຫ້ເຮັດວຽກພຽງເທື່ອດຽວ ຕອນໂຫຼດໜ້າ
  useEffect(() => {
    // localStorage = ບ່ອນເກັບຂໍ້ມູນນ້ອຍໆໃນ browser (ຂໍ້ມູນບໍ່ຫາຍເມື່ອ refresh)
    if (localStorage.getItem("theme") === "dark") {
      // document.documentElement = ແທັກ <html>
      document.documentElement.classList.add("dark");
    }
  }, []);

  // ---------- ຟັງຊັນທີ່ເຮັດວຽກເມື່ອກົດປຸ່ມ ----------
  function toggleTheme() {
    // classList.toggle("dark") = ຖ້າມີ class "dark" ຢູ່ແລ້ວ ໃຫ້ລຶບອອກ, ຖ້າບໍ່ມີ ໃຫ້ເພີ່ມ
    // ມັນຈະສົ່ງຄືນ true ຖ້າຕອນນີ້ເປັນ dark, false ຖ້າເປັນ light
    const isDark = document.documentElement.classList.toggle("dark");

    // ບັນທຶກໂໝດໄວ້ (ຂຽນແບບສັ້ນ: ເງື່ອນໄຂ ? ຄ່າຖ້າຈິງ : ຄ່າຖ້າບໍ່ຈິງ)
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }

  // ---------- ສ່ວນສະແດງຜົນ ----------
  return (
    <Button
      variant="outline" // ຮູບແບບປຸ່ມມີແຕ່ຂອບ
      size="icon" // ປຸ່ມນ້ອຍ ສຳລັບໃສ່ໄອຄອນ
      className="rounded-full" // ວົງມົນ (ໃຫ້ຄືກັບປຸ່ມ 🔔 ⚙️ ໃນ Dashboard)
      onClick={toggleTheme} // ກົດແລ້ວເອີ້ນ toggleTheme
      aria-label={t.toggle.theme} // ຄຳອະທິບາຍສຳລັບໂປຣແກຣມອ່ານໜ້າຈໍ (ຄົນຕາບອດ)
    >
      {/* ສະແດງໄອຄອນຕາມໂໝດ ໂດຍໃຊ້ Tailwind:
          dark:hidden       = ເຊື່ອງໄວ້ຕອນ dark mode (ສະແດງດວງຈັນຕອນ light)
          hidden dark:block = ເຊື່ອງໄວ້ປົກກະຕິ ແຕ່ສະແດງຕອນ dark mode (ສະແດງດວງຕາເວັນ) */}
      <Moon className="dark:hidden" />
      <Sun className="hidden dark:block" />
    </Button>
  );
}
