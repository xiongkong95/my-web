"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { CarImage } from "@/components/dashboard/car-image";
import { formatKip, formatUSD, topCars, type CarType, type Period } from "@/lib/dashboard-data";
import { useLanguage } from "@/components/language-provider";

const tabs: CarType[] = ["sedan", "suv", "pickup"];

export function TopCarsCard({ period }: { period: Period }) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<CarType>("pickup");

  const cars = [...topCars[activeTab]].sort((a, b) => b.sold[period] - a.sold[period]);

  return (
    <Card className="h-full gap-4 p-5">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="font-medium">{t.topCars.title}</h3>
        <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-xs text-primary">
          {t.periodRange[period]}
        </span>
      </div>

      <div className="flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={
              activeTab === tab
                ? "rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary"
                : "rounded-full border px-3 py-1 text-xs text-muted-foreground hover:text-foreground"
            }
          >
            {t.topCars[tab]}
          </button>
        ))}
      </div>

      <div className="flex flex-col divide-y">
        {cars.map((car) => (
          <div key={car.name} className="flex items-center gap-3 py-3">
            <CarImage src={car.image} alt={car.name} className="h-14 w-20" />

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{car.name}</p>
              <p className="text-xs text-muted-foreground">{car.year}</p>
              <p className="text-xs text-muted-foreground">
                {t.topCars.sold} <span className="font-semibold text-foreground">{car.sold[period]}</span> ·{" "}
                {t.topCars.stock}{" "}
                <span className="font-semibold text-foreground">{car.stock}</span>
              </p>
            </div>

            <div className="text-right">
              <p className="text-sm font-medium text-primary">{formatKip(car.price)}</p>
              <p className="text-xs text-muted-foreground">{formatUSD(car.price)}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
