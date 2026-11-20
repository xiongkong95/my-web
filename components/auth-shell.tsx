"use client";

import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { useLanguage } from "@/components/language-provider";

type AuthShellProps = {
  title: string;
  children: React.ReactNode;
};

export function AuthShell({ title, children }: AuthShellProps) {
  const { t } = useLanguage();

  return (
    <main className="relative grid flex-1 grid-cols-1 overflow-hidden bg-zinc-950 lg:grid-cols-2">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(#52525b 1px, transparent 1px), linear-gradient(90deg, #52525b 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,transparent_10%,#09090b_70%)]" />

      <div className="relative hidden flex-col items-center justify-center gap-8 text-center lg:flex">
        <Logo className="w-md" variant="dark" priority />
        <div className="flex flex-col gap-2">
          <p className="text-3xl font-medium text-zinc-200">{t.auth.tagline}</p>
          <p className="text-zinc-400">{t.auth.subtagline}</p>
        </div>
      </div>

      <div className="relative flex min-w-0 items-center justify-center p-4 sm:p-8">
        <div className="relative w-full max-w-md rounded-2xl border bg-card px-8 py-12 shadow-[12px_0_48px_-16px_rgba(217,176,122,0.35)]">
          <div className="absolute top-4 right-4 flex gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>

          <div className="mb-8 flex flex-col items-center gap-2">
            <Logo className="w-48" priority />
            <h1 className="mt-2 text-3xl font-medium">{title}</h1>
          </div>

          {children}
        </div>
      </div>
    </main>
  );
}
