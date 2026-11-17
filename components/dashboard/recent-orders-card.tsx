// =====================================================================
// ກາດ Orders — ລາຍການສັ່ງຊື້ ຕາມຊ່ວງເວລາທີ່ເລືອກ (period)
// ---------------------------------------------------------------------
// ສະແດງເປັນຕາຕະລາງ: ເລກທີ, ລູກຄ້າ, ລົດ, ວັນທີ, ລາຄາ, ສະຖານະ
// ສະແດງສູງສຸດ 6 ລາຍການ, ຖ້າບໍ່ມີ ຈະຂຶ້ນ "ບໍ່ມີການສັ່ງຊື້ໃນຊ່ວງນີ້"
// ສະຖານະ: ຈ່າຍແລ້ວ = ສີຂຽວ, ລໍຖ້າຈ່າຍ = ສີເຫຼືອງ
// ຂໍ້ຄວາມ ແລະວັນທີ ປ່ຽນຕາມພາສາ, ຊື່ລູກຄ້າ ແລະຊື່ລົດບໍ່ແປ
// =====================================================================

// ຕ້ອງໃຊ້ "use client" ເພາະໃຊ້ useLanguage() (ພາສາປ່ຽນໄດ້ໃນ browser)
"use client";

import { Card } from "@/components/ui/card";
import { formatKip, formatUSD, ordersInPeriod, type Period } from "@/lib/dashboard-data";
import { formatDate } from "@/lib/translations";
import { useLanguage } from "@/components/language-provider";

// ຈຳນວນລາຍການສູງສຸດທີ່ສະແດງ
const MAX_ROWS = 6;

// props: period = ຊ່ວງເວລາທີ່ເລືອກ (ສົ່ງມາຈາກ DashboardContent)
export function RecentOrdersCard({ period }: { period: Period }) {
  // t = ຂໍ້ຄວາມຕາມພາສາທີ່ເລືອກ
  const { t } = useLanguage();

  // ການສັ່ງຊື້ໃນຊ່ວງເວລານີ້ (ເອົາແຕ່ MAX_ROWS ລາຍການທຳອິດ: slice(0, 6) = ຕັດເອົາ 6 ອັນທຳອິດ)
  const orders = ordersInPeriod(period).slice(0, MAX_ROWS);

  return (
    <Card className="gap-4 p-5">
      {/* ແຖວຫົວ: ຫົວຂໍ້ + ປຸ່ມເບິ່ງທັງໝົດ (ພຽງໜ້າຕາ) */}
      <div className="flex items-center justify-between">
        {/* ຫົວຂໍ້ + ປ້າຍຊ່ວງເວລາ */}
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

      {/* overflow-x-auto = ຖ້າຈໍແຄບ (ມືຖື) ໃຫ້ເລື່ອນຕາຕະລາງຊ້າຍ-ຂວາໄດ້ ບໍ່ລົ້ນໜ້າຈໍ */}
      <div className="overflow-x-auto">
        {/* table = ຕາຕະລາງ, min-w-160 = ກວ້າງຢ່າງໜ້ອຍ 640px ບໍ່ໃຫ້ບີບເກີນໄປ */}
        <table className="w-full min-w-160 text-sm">
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
            {orders.map((order) => (
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

        {/* ຖ້າບໍ່ມີການສັ່ງຊື້ໃນຊ່ວງນີ້ (length === 0 = array ວ່າງ) ໃຫ້ສະແດງຂໍ້ຄວາມແທນ */}
        {orders.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">{t.orders.empty}</p>
        )}
      </div>
    </Card>
  );
}
