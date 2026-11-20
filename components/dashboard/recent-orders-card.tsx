"use client";

import { Card } from "@/components/ui/card";
import { formatKip, formatUSD, ordersInPeriod, type Period } from "@/lib/dashboard-data";
import { formatDate } from "@/lib/translations";
import { useLanguage } from "@/components/language-provider";

const MAX_ROWS = 6;

export function RecentOrdersCard({ period }: { period: Period }) {
  const { t } = useLanguage();

  const orders = ordersInPeriod(period).slice(0, MAX_ROWS);

  return (
    <Card className="gap-4 p-5">
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-medium">{t.orders.title}</h3>
          <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-xs text-primary">
            {t.periodRange[period]}
          </span>
        </div>
        <button type="button" className="rounded-full border px-3 py-1 text-xs hover:bg-muted">
          {t.orders.seeAll}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-160 text-sm">
          <thead>
            <tr className="border-b text-left text-xs text-muted-foreground">
              <th className="pb-3 font-normal">{t.orders.order}</th>
              <th className="pb-3 font-normal">{t.orders.customer}</th>
              <th className="pb-3 font-normal">{t.orders.car}</th>
              <th className="pb-3 font-normal">{t.orders.date}</th>
              <th className="pb-3 text-right font-normal">{t.orders.price}</th>
              <th className="pb-3 text-right font-normal">{t.orders.status}</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="py-3 text-muted-foreground">{order.id}</td>
                <td className="py-3 font-medium">{order.customer}</td>
                <td className="py-3">{order.car}</td>
                <td className="py-3 text-muted-foreground">{formatDate(t, order.date)}</td>
                <td className="py-3 text-right">
                  <p className="font-medium">{formatKip(order.price)}</p>
                  <p className="text-xs text-muted-foreground">{formatUSD(order.price)}</p>
                </td>
                <td className="py-3 text-right">
                  <span
                    className={
                      order.status === "paid"
                        ? "rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400"
                        : "rounded-full bg-amber-500/15 px-2.5 py-1 text-xs font-medium text-amber-600 dark:text-amber-400"
                    }
                  >
                    {order.status === "paid" ? t.orders.paid : t.orders.pending}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">{t.orders.empty}</p>
        )}
      </div>
    </Card>
  );
}
