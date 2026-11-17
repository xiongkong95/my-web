// =====================================================================
// LanguageProvider — ຈັດການພາສາຂອງທັງເວັບ
// ---------------------------------------------------------------------
// ບັນຫາ: ຫຼາຍ component (Header, Sidebar, ກາດ, ...) ຕ້ອງຮູ້ວ່າຕອນນີ້ເປັນພາສາໃດ
//         ຖ້າສົ່ງຜ່ານ props ທຸກຊັ້ນ ຈະຍາວ ແລະຫຍຸ້ງຍາກ
// ວິທີແກ້: ໃຊ້ React Context = "ກ່ອງເກັບຂໍ້ມູນກາງ"
//   1. LanguageProvider ຫໍ່ທັງເວັບໄວ້ (ໃນ app/layout.tsx)
//   2. component ໃດກໍໄດ້ທີ່ຢູ່ຂ້າງໃນ ເອີ້ນ useLanguage() ເພື່ອເອົາພາສາ
//   3. ເມື່ອປ່ຽນພາສາ ທຸກ component ທີ່ໃຊ້ useLanguage() ຈະອັບເດດເອງ
//
// ວິທີໃຊ້ໃນ component:
//   const { t, lang, setLang } = useLanguage();
//   t       = ຂໍ້ຄວາມຂອງພາສາປັດຈຸບັນ ເຊັ່ນ t.login.title
//   lang    = ພາສາປັດຈຸບັນ "lo" ຫຼື "en"
//   setLang = ຟັງຊັນປ່ຽນພາສາ ເຊັ່ນ setLang("en")
// =====================================================================

// ຕ້ອງໃຊ້ "use client" ເພາະມີ useState, useEffect, localStorage
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { translations, type Lang, type Translation } from "@/lib/translations";

// ຂໍ້ມູນທີ່ເກັບໃນ Context
type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translation;
};

// ສ້າງ Context (ເລີ່ມຕົ້ນເປັນ null = ຍັງບໍ່ມີ Provider)
const LanguageContext = createContext<LanguageContextValue | null>(null);

// ຊື່ key ທີ່ໃຊ້ເກັບພາສາໃນ localStorage
const STORAGE_KEY = "lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // ພາສາປັດຈຸບັນ: ເລີ່ມຕົ້ນເປັນພາສາລາວ (ພາສາຫຼັກ)
  const [lang, setLangState] = useState<Lang>("lo");

  // ເມື່ອເປີດເວັບ: ອ່ານພາສາທີ່ເຄີຍເລືອກໄວ້
  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === "en") {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- ອ່ານຄ່າຈາກ localStorage ເທື່ອດຽວຕອນໂຫຼດ
      setLangState("en");
    }
  }, []);

  // ທຸກເທື່ອທີ່ພາສາປ່ຽນ: ອັບເດດ <html lang="..."> ໃຫ້ກົງ
  // (ຊ່ວຍໃຫ້ browser ແລະໂປຣແກຣມອ່ານໜ້າຈໍ ຮູ້ວ່າໜ້ານີ້ເປັນພາສາໃດ)
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // ປ່ຽນພາສາ + ບັນທຶກໄວ້ ເພື່ອຈື່ເຖິງວ່າຈະ refresh
  function setLang(newLang: Lang) {
    setLangState(newLang);
    localStorage.setItem(STORAGE_KEY, newLang);
  }

  // t = ຂໍ້ຄວາມຂອງພາສາທີ່ເລືອກ
  const t = translations[lang];

  // ສົ່ງ lang, setLang, t ໃຫ້ທຸກ component ທີ່ຢູ່ຂ້າງໃນ
  return <LanguageContext value={{ lang, setLang, t }}>{children}</LanguageContext>;
}

// Hook ສຳລັບເອົາພາສາໄປໃຊ້ (hook = ຟັງຊັນທີ່ຂຶ້ນຕົ້ນດ້ວຍ "use")
export function useLanguage() {
  const value = useContext(LanguageContext);
  // ຖ້າລືມຫໍ່ດ້ວຍ LanguageProvider ຈະແຈ້ງ error ໃຫ້ຮູ້ທັນທີ
  if (value === null) {
    throw new Error("useLanguage ຕ້ອງໃຊ້ພາຍໃນ <LanguageProvider>");
  }
  return value;
}
