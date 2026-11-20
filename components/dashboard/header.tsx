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
import { periods, type Period } from "@/lib/dashboard-data";

type HeaderProps = {
  period: Period;
  onPeriodChange: (period: Period) => void;
};

export function Header({ period, onPeriodChange }: HeaderProps) {
  const { t } = useLanguage();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUser(loadUser());
  }, []);

  const name = user?.name ?? t.dashboard.guest;
  const email = user?.email ?? "";
  const initial = name.charAt(0).toUpperCase();

  return (
    <header className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold sm:text-3xl">
            {t.dashboard.welcome} <span className="text-primary">{name}</span>
          </h1>
          <p className="text-sm text-muted-foreground">{t.dashboard.subtitle}</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="rounded-full" aria-label={t.dashboard.notifications}>
            <Bell />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full" aria-label={t.dashboard.settings}>
            <Settings />
          </Button>
          <LanguageToggle />
          <ThemeToggle />
          <LogoutButton
            className={buttonVariants({ variant: "outline", size: "icon", className: "rounded-full lg:hidden" })}
          >
            <LogOut />
          </LogoutButton>

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

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div role="group" aria-label={t.dashboard.periodAria} className="flex gap-1 rounded-full border bg-card p-1">
          {periods.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => onPeriodChange(p)}
              aria-pressed={period === p}
              className={
                period === p
                  ? "rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground"
                  : "rounded-full px-4 py-1.5 text-sm text-muted-foreground hover:text-foreground"
              }
            >
              {t.periods[p]}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder={t.dashboard.search} className="h-10 rounded-full bg-card pl-10" />
        </div>
      </div>
    </header>
  );
}
