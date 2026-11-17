// =====================================================================
// ກາດ My Portfolio — ຫຸ້ນທີ່ຖືຢູ່ 4 ຕົວ ຈັດເປັນຕາຕະລາງ 2x2
// =====================================================================

import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { formatMoney, portfolio } from "@/lib/dashboard-data";

export function PortfolioCard() {
  return (
    <Card className="gap-4 p-5">
      {/* ແຖວຫົວ: ຫົວຂໍ້ + ປຸ່ມ See all + ປຸ່ມລູກສອນ (ພຽງໜ້າຕາ) */}
      <div className="flex items-center justify-between">
        <h3 className="font-medium">My Portfolio</h3>
        <div className="flex items-center gap-2">
          <button type="button" className="rounded-full border px-3 py-1 text-xs hover:bg-muted">
            See all
          </button>
          <button
            type="button"
            className="flex size-7 items-center justify-center rounded-full border hover:bg-muted"
            aria-label="Open portfolio"
          >
            <ArrowUpRight className="size-3.5" />
          </button>
        </div>
      </div>

      {/* ກາດນ້ອຍ 4 ອັນ: grid-cols-2 = 2 ຖັນ */}
      <div className="grid grid-cols-2 gap-3">
        {portfolio.map((item) => (
          // bg-muted/50 = ພື້ນສີເທົາຈາງ ໃຫ້ແຍກອອກຈາກກາດໃຫຍ່
          <div key={item.ticker} className="flex flex-col gap-1 rounded-xl border bg-muted/50 p-3">
            <p className="font-semibold">{formatMoney(item.price)}</p>
            <p className="text-xs text-emerald-500">
              +{item.change} ({item.changePercent}%)
            </p>
            {/* ແຖວລຸ່ມ: ຕົວຫຍໍ້ຫຸ້ນ ຊ້າຍ + ຈຳນວນຫຸ້ນ ຂວາ (mt-auto = ດັນລົງລຸ່ມສຸດ) */}
            <div className="mt-auto flex items-center justify-between pt-3 text-xs">
              <span className="font-medium text-primary">{item.ticker}</span>
              <span className="text-muted-foreground">
                Units <span className="font-semibold text-foreground">{item.units}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
