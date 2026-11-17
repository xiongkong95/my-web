// =====================================================================
// ກາດ Recent Orders — ລາຍການສັ່ງຊື້ລ່າສຸດ
// ---------------------------------------------------------------------
// ສະແດງເປັນຕາຕະລາງ: ເລກທີ, ລູກຄ້າ, ລົດ, ວັນທີ, ລາຄາ, ສະຖານະ
// ສະຖານະ: Paid (ຈ່າຍແລ້ວ) = ສີຂຽວ, Pending (ລໍຖ້າ) = ສີເຫຼືອງ
// =====================================================================

import { Card } from "@/components/ui/card";
import { formatKip, formatUSD, recentOrders } from "@/lib/dashboard-data";

export function RecentOrdersCard() {
  return (
    <Card className="gap-4 p-5">
      {/* ແຖວຫົວ: ຫົວຂໍ້ + ປຸ່ມ See all (ພຽງໜ້າຕາ) */}
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Recent Orders</h3>
        <button type="button" className="rounded-full border px-3 py-1 text-xs hover:bg-muted">
          See all
        </button>
      </div>

      {/* overflow-x-auto = ຖ້າຈໍແຄບ (ມືຖື) ໃຫ້ເລື່ອນຕາຕະລາງຊ້າຍ-ຂວາໄດ້ ບໍ່ລົ້ນໜ້າຈໍ */}
      <div className="overflow-x-auto">
        {/* table = ຕາຕະລາງ, min-w-[640px] = ກວ້າງຢ່າງໜ້ອຍ 640px ບໍ່ໃຫ້ບີບເກີນໄປ */}
        <table className="w-full min-w-[640px] text-sm">
          {/* thead = ແຖວຫົວຕາຕະລາງ */}
          <thead>
            <tr className="border-b text-left text-xs text-muted-foreground">
              <th className="pb-3 font-normal">Order</th>
              <th className="pb-3 font-normal">Customer</th>
              <th className="pb-3 font-normal">Car</th>
              <th className="pb-3 font-normal">Date</th>
              <th className="pb-3 text-right font-normal">Price</th>
              <th className="pb-3 text-right font-normal">Status</th>
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
                <td className="py-3 text-muted-foreground">{order.date}</td>
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
                    {order.status === "paid" ? "Paid" : "Pending"}
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
