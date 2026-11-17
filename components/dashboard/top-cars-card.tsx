// =====================================================================
// ກາດ Top Selling Cars — ລົດຂາຍດີ ແບ່ງເປັນ 3 ແທັບ
// ---------------------------------------------------------------------
// ກົດແທັບ ເກັງ / SUV / ກະບະ ແລ້ວລາຍການລົດຈະປ່ຽນຕາມ
// ຂໍ້ຄວາມມາຈາກ lib/translations.ts (ປ່ຽນຕາມພາສາ), ຊື່ລຸ້ນລົດບໍ່ແປ
// ແຕ່ລະແຖວມີ: ຮູບລົດ, ຊື່ລຸ້ນ + ປີ, ລາຄາ (ກີບ + ໂດລາ), ຂາຍໄດ້ / ເຫຼືອໃນສາງ
// =====================================================================

// ຕ້ອງໃຊ້ "use client" ເພາະມີ useState
"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { CarImage } from "@/components/dashboard/car-image";
import { formatKip, formatUSD, topCars, type CarType } from "@/lib/dashboard-data";
import { useLanguage } from "@/components/language-provider";

// ລາຍການແທັບ: ແຕ່ລະຄ່າ = ຊື່ໃນຂໍ້ມູນ topCars ແລະຊື່ຂໍ້ຄວາມໃນ t.topCars ພ້ອມກັນ
// ເຊັ່ນ "pickup" → topCars.pickup (ລາຍການລົດ) ແລະ t.topCars.pickup ("ກະບະ")
const tabs: CarType[] = ["sedan", "suv", "pickup"];

export function TopCarsCard() {
  // t = ຂໍ້ຄວາມຕາມພາສາທີ່ເລືອກ
  const { t } = useLanguage();
  // ແທັບທີ່ເລືອກຢູ່ (ເລີ່ມຕົ້ນ = pickup)
  const [activeTab, setActiveTab] = useState<CarType>("pickup");

  // ເອົາລາຍການລົດຂອງແທັບທີ່ເລືອກ
  const cars = topCars[activeTab];

  return (
    <Card className="h-full gap-4 p-5">
      <h3 className="font-medium">{t.topCars.title}</h3>

      {/* ----- ແທັບ ----- */}
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
                {t.topCars.sold} <span className="font-semibold text-foreground">{car.sold}</span> ·{" "}
                {t.topCars.stock}{" "}
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
