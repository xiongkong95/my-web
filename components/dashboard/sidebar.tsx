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
import { Logo } from "@/components/logo";
import { LogoutButton } from "@/components/dashboard/logout-button";
import { useLanguage } from "@/components/language-provider";

const mainMenu = [
  { key: "dashboard", icon: LayoutDashboard, active: true },
  { key: "cars", icon: Car, active: false },
  { key: "orders", icon: ClipboardList, active: false },
  { key: "customers", icon: Users, active: false },
  { key: "reports", icon: ChartColumn, active: false },
] as const;

const bottomMenu = [
  { key: "settings", icon: Settings },
  { key: "support", icon: LifeBuoy },
] as const;

const itemClass =
  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground";

export function Sidebar() {
  const { t } = useLanguage();

  return (
    <aside className="hidden w-60 shrink-0 flex-col rounded-2xl border bg-card p-4 lg:flex">
      <Logo className="mb-6 w-full" priority />

      <nav className="flex flex-1 flex-col gap-1">
        {mainMenu.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.key}
              href="#"
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
        <LogoutButton className={itemClass}>
          <LogOut className="size-4" />
          {t.menu.logout}
        </LogoutButton>
      </div>
    </aside>
  );
}
