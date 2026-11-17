// =====================================================================
// ກາດ Total Holding — ສະແດງຍອດເງິນລວມທັງໝົດ
// =====================================================================

import { ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { formatMoney, totalHolding } from "@/lib/dashboard-data";

export function TotalHoldingCard() {
  return (
    <Card className="gap-4 p-5">
      {/* ແຖວເທິງ: ຫົວຂໍ້ຊ້າຍ + ປຸ່ມເລືອກຊ່ວງເວລາຂວາ (ພຽງໜ້າຕາ) */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Total Holding</p>
        <button
          type="button"
          className="flex items-center gap-1 rounded-full border px-3 py-1 text-xs hover:bg-muted"
        >
          6M <ChevronDown className="size-3" />
        </button>
      </div>
      {/* ຍອດເງິນ: formatMoney ແປງ 12304.11 → "$12,304.11" */}
      <p className="text-3xl font-semibold">{formatMoney(totalHolding)}</p>
      {/* ຂໍ້ຄວາມປ່ຽນແປງ: ສີຂຽວ = ເພີ່ມຂຶ້ນ */}
      <p className="text-xs text-muted-foreground">
        <span className="text-emerald-500">+4.2%</span> ຈາກ 6 ເດືອນກ່ອນ
      </p>
    </Card>
  );
}
