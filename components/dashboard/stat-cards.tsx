"use client";

import { Banknote, Car, Handshake, UserPlus } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  carsInStock,
  formatKipShort,
  formatUSD,
  periodStats,
  totalSales,
  type Period,
} from "@/lib/dashboard-data";
import { useLanguage } from "@/components/language-provider";

export function StatCards({ period }: { period: Period }) {
  const { t } = useLanguage();

  const s = periodStats[period];
  const revenue = totalSales(period);
  const vs = t.vsPrevious[period];

  const cards = [
    {
      label: t.stats.carsInStock,
      icon: Car,
      value: `${carsInStock.value} ${t.stats.carsUnit}`,
      sub: "",
      change: carsInStock.change,
      vs: t.stats.vsLastMonth,
    },
    {
      label: t.stats.sold,
      icon: Handshake,
      value: `${s.sold} ${t.stats.carsUnit}`,
      sub: "",
      change: s.soldChange,
      vs: vs,
    },
    {
      label: t.stats.revenue,
      icon: Banknote,
      value: formatKipShort(revenue),
      sub: formatUSD(revenue),
      change: s.revenueChange,
      vs: vs,
    },
    {
      label: t.stats.newCustomers,
      icon: UserPlus,
      value: `${s.newCustomers} ${t.stats.peopleUnit}`,
      sub: "",
      change: s.customersChange,
      vs: vs,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        const isUp = card.change >= 0;

        return (
          <Card key={card.label} className="gap-3 p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{card.label}</p>
              <div className="flex size-9 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Icon className="size-4" />
              </div>
            </div>

            <div>
              <p className="text-2xl font-semibold">{card.value}</p>
              {card.sub && <p className="text-sm text-muted-foreground">≈ {card.sub}</p>}
            </div>

            <p className="text-xs text-muted-foreground">
              <span className={isUp ? "font-medium text-emerald-500" : "font-medium text-red-500"}>
                {isUp ? "+" : ""}
                {card.change}%
              </span>{" "}
              {card.vs}
            </p>
          </Card>
        );
      })}
    </div>
  );
}
