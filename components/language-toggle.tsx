// =====================================================================
// ປຸ່ມສະຫຼັບພາສາ ລາວ ⇄ English
// ---------------------------------------------------------------------
// ປຸ່ມສະແດງພາສາທີ່ "ຈະປ່ຽນໄປ":
//   ຕອນເປັນພາສາລາວ   → ປຸ່ມຂຽນວ່າ "EN"
//   ຕອນເປັນພາສາອັງກິດ → ປຸ່ມຂຽນວ່າ "ລາວ"
// =====================================================================

// ຕ້ອງໃຊ້ "use client" ເພາະມີ onClick
"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";

export function LanguageToggle() {
  const { lang, setLang, t } = useLanguage();

  return (
    <Button
      variant="outline"
      size="icon"
      // rounded-full = ວົງມົນ (ໃຫ້ຄືກັບປຸ່ມອື່ນໃນ Dashboard)
      className="rounded-full text-xs font-semibold"
      // ກົດແລ້ວ: ຖ້າເປັນລາວ ປ່ຽນເປັນອັງກິດ, ຖ້າເປັນອັງກິດ ປ່ຽນເປັນລາວ
      onClick={() => setLang(lang === "lo" ? "en" : "lo")}
      aria-label={t.toggle.switchAria}
    >
      {t.toggle.switchLabel}
    </Button>
  );
}
