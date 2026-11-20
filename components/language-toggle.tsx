"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";

export function LanguageToggle() {
  const { lang, setLang, t } = useLanguage();

  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full text-xs font-semibold"
      onClick={() => setLang(lang === "lo" ? "en" : "lo")}
      aria-label={t.toggle.switchAria}
    >
      {t.toggle.switchLabel}
    </Button>
  );
}
