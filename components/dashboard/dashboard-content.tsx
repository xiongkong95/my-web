"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/dashboard/header";
import { StatCards } from "@/components/dashboard/stat-cards";
import { SalesChart } from "@/components/dashboard/sales-chart";
import { TopCarsCard } from "@/components/dashboard/top-cars-card";
import { RecentOrdersCard } from "@/components/dashboard/recent-orders-card";
import { periods, type Period } from "@/lib/dashboard-data";

const STORAGE_KEY = "period";

export function DashboardContent() {
  const [period, setPeriodState] = useState<Period>("month");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null && periods.includes(saved as Period)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPeriodState(saved as Period);
    }
  }, []);

  function setPeriod(newPeriod: Period) {
    setPeriodState(newPeriod);
    localStorage.setItem(STORAGE_KEY, newPeriod);
  }

  return (
    <div className="relative flex min-w-0 flex-1 flex-col gap-4">
      <Header period={period} onPeriodChange={setPeriod} />

      <StatCards period={period} />

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <SalesChart period={period} />
        </div>
        <TopCarsCard period={period} />
      </div>

      <RecentOrdersCard period={period} />
    </div>
  );
}
