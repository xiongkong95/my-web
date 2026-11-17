// =====================================================================
// ກາດ "Decisions Powered by Data" — ກາດໂຄສະນາ ພ້ອມແສງເຮືອງສີທອງ
// =====================================================================

// ຕ້ອງໃຊ້ "use client" ເພາະມີ onClick
"use client";

import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function InsightCard() {
  return (
    // relative + overflow-hidden = ໃຫ້ແສງເຮືອງຢູ່ພາຍໃນກາດ ບໍ່ລົ້ນອອກ
    <Card className="relative items-center gap-3 overflow-hidden p-5 text-center">
      {/* ແສງເຮືອງສີທອງດ້ານລຸ່ມ:
          absolute = ວາງຊ້ອນ, -bottom-16 = ເລື່ອນລົງໄປເຄິ່ງໜຶ່ງ
          rounded-full + blur-3xl = ວົງມົນທີ່ມົວໆ ຄືແສງ */}
      <div className="absolute -bottom-16 left-1/2 size-40 -translate-x-1/2 rounded-full bg-primary/30 blur-3xl" />

      {/* relative = ໃຫ້ເນື້ອຫາຢູ່ຊັ້ນເທິງແສງເຮືອງ */}
      <h3 className="relative text-lg font-medium">Decisions Powered by Data</h3>
      <p className="relative text-xs text-muted-foreground">
        Move beyond guesswork with AI-driven investment insights tailored to your strategy.
      </p>
      <Button
        className="relative mt-2 rounded-full px-5"
        onClick={() => alert("AI Insights ຍັງບໍ່ທັນເປີດໃຊ້")}
      >
        <Sparkles />
        Explore AI Insights
      </Button>
    </Card>
  );
}
