"use client";

import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/components/icons";
import { useLanguage } from "@/components/language-provider";

export function GoogleButton() {
  const { t } = useLanguage();

  function handleGoogleLogin() {
    alert(t.auth.googleNotReady);
  }

  return (
    <>
      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">{t.auth.orContinue}</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <Button
        type="button"
        variant="outline"
        className="h-11 w-full"
        onClick={handleGoogleLogin}
      >
        <GoogleIcon />
        {t.auth.google}
      </Button>
    </>
  );
}
