// =====================================================================
// ກາດ Recent Orders — ລາຍການສັ່ງຊື້ລ່າສຸດ
// ---------------------------------------------------------------------
// ສະແດງເປັນຕາຕະລາງ: ເລກທີ, ລູກຄ້າ, ລົດ, ວັນທີ, ລາຄາ, ສະຖານະ
// ສະຖານະ: ຈ່າຍແລ້ວ = ສີຂຽວ, ລໍຖ້າຈ່າຍ = ສີເຫຼືອງ
// ຂໍ້ຄວາມ ແລະວັນທີ ປ່ຽນຕາມພາສາ, ຊື່ລູກຄ້າ ແລະຊື່ລົດບໍ່ແປ
// =====================================================================

// ຕ້ອງໃຊ້ "use client" ເພາະໃຊ້ useLanguage() (ພາສາປ່ຽນໄດ້ໃນ browser)
"use client";

import { Card } from "@/components/ui/card";
import { formatKip, formatUSD, recentOrders } from "@/lib/dashboard-data";
import { formatDate } from "@/lib/translations";
import { useLanguage } from "@/components/language-provider";

export function RecentOrdersCard() {
  // t = ຂໍ້ຄວາມຕາມພາສາທີ່ເລືອກ
  const { t } = useLanguage();

  return (
    <Card className="gap-4 p-5">
      {/* ແຖວຫົວ: ຫົວຂໍ້ + ປຸ່ມເບິ່ງທັງໝົດ (ພຽງໜ້າຕາ) */}
      <div className="flex items-center justify-between">
        <h3 className="font-medium">{t.orders.title}</h3>
        <button type="button" className="rounded-full border px-3 py-1 text-xs hover:bg-muted">
          {t.orders.seeAll}
        </button>
      </div>

      {/* overflow-x-auto = ຖ້າຈໍແຄບ (ມືຖື) ໃຫ້ເລື່ອນຕາຕະລາງຊ້າຍ-ຂວາໄດ້ ບໍ່ລົ້ນໜ້າຈໍ */}
      <div className="overflow-x-auto">
        {/* table = ຕາຕະລາງ, min-w-[640px] = ກວ້າງຢ່າງໜ້ອຍ 640px ບໍ່ໃຫ້ບີບເກີນໄປ */}
        <table className="w-full min-w-[640px] text-sm">
          {/* thead = ແຖວຫົວຕາຕະລາງ */}
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
          {/* tbody = ເນື້ອໃນຕາຕະລາງ, divide-y = ເສັ້ນຂັ້ນລະຫວ່າງແຖວ */}
          <tbody className="divide-y">
            {recentOrders.map((order) => (
              // tr = 1 ແຖວ, td = 1 ຊ່ອງ
              <tr key={order.id}>
                <td className="py-3 text-muted-foreground">{order.id}</td>
                <td className="py-3 font-medium">{order.customer}</td>
                <td className="py-3">{order.car}</td>
                <td className="py-3 text-muted-foreground">{formatDate(t, order.date)}</td>
                {/* ລາຄາ: ກີບ + ໂດລາ */}
                <td className="py-3 text-right">
                  <p className="font-medium">{formatKip(order.price)}</p>
                  <p className="text-xs text-muted-foreground">{formatUSD(order.price)}</p>
                </td>
                {/* ສະຖານະ: ປ້າຍມົນ ສີຕາມສະຖານະ */}
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
      </div>
    </Card>
  );
}
