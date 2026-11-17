// =====================================================================
// ກາດ Top Selling Cars — ລົດຂາຍດີ ແບ່ງເປັນ 3 ແທັບ
// ---------------------------------------------------------------------
// ກົດແທັບ Sedan / SUV / Pickup ແລ້ວລາຍການລົດຈະປ່ຽນຕາມ
// ແຕ່ລະແຖວມີ: ຮູບລົດ, ຊື່ລຸ້ນ + ປີ, ລາຄາ (ກີບ + ໂດລາ), ຂາຍໄດ້ / ເຫຼືອໃນສາງ
// =====================================================================

// ຕ້ອງໃຊ້ "use client" ເພາະມີ useState
"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { CarImage } from "@/components/dashboard/car-image";
import { formatKip, formatUSD, topCars, type CarType } from "@/lib/dashboard-data";

// ລາຍການແທັບ: key = ຊື່ໃນຂໍ້ມູນ (ຕ້ອງກົງກັບ topCars ໃນ dashboard-data), label = ຂໍ້ຄວາມທີ່ສະແດງ
const tabs: { key: CarType; label: string }[] = [
  { key: "sedan", label: "Sedan" },
  { key: "suv", label: "SUV" },
  { key: "pickup", label: "Pickup" },
];

export function TopCarsCard() {
  // ແທັບທີ່ເລືອກຢູ່ (ເລີ່ມຕົ້ນ = pickup)
  const [activeTab, setActiveTab] = useState<CarType>("pickup");

  // ເອົາລາຍການລົດຂອງແທັບທີ່ເລືອກ
  const cars = topCars[activeTab];

  return (
    <Card className="h-full gap-4 p-5">
      <h3 className="font-medium">Top Selling Cars</h3>

      {/* ----- ແທັບ ----- */}
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={
              activeTab === tab.key
                ? "rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary"
                : "rounded-full border px-3 py-1 text-xs text-muted-foreground hover:text-foreground"
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ----- ລາຍການລົດ -----
          divide-y = ໃສ່ເສັ້ນຂັ້ນລະຫວ່າງແຕ່ລະແຖວອັດຕະໂນມັດ */}
      <div className="flex flex-col divide-y">
        {cars.map((car) => (
          <div key={car.name} className="flex items-center gap-3 py-3">
            {/* ຮູບລົດ: ກວ້າງ 80px ສູງ 56px (ຖ້າບໍ່ມີຮູບ ຈະເປັນໄອຄອນລົດ) */}
            <CarImage src={car.image} alt={car.name} className="h-14 w-20" />

            {/* ຊື່ + ປີ + ຂາຍໄດ້/ສາງ (flex-1 = ຍືດເຕັມທີ່ເຫຼືອ, min-w-0 = ໃຫ້ຕັດຂໍ້ຄວາມຍາວໄດ້) */}
            <div className="min-w-0 flex-1">
              {/* truncate = ຂໍ້ຄວາມຍາວເກີນ ຈະຕັດເປັນ "..." */}
              <p className="truncate text-sm font-medium">{car.name}</p>
              <p className="text-xs text-muted-foreground">{car.year}</p>
              <p className="text-xs text-muted-foreground">
                Sold <span className="font-semibold text-foreground">{car.sold}</span> · Stock{" "}
                <span className="font-semibold text-foreground">{car.stock}</span>
              </p>
            </div>

            {/* ລາຄາ: ກີບ (ສີທອງ) + ໂດລາ (ນ້ອຍ), text-right = ຈັດຂວາ */}
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
