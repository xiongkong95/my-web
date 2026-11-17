// =====================================================================
// CarImage — ສະແດງຮູບລົດ
// ---------------------------------------------------------------------
// - ຖ້າມີໄຟລ໌ຮູບໃນ public/ → ສະແດງຮູບ
// - ຖ້າບໍ່ມີ ຫຼືໂຫຼດບໍ່ໄດ້ → ສະແດງໄອຄອນລົດແທນ (ເວັບບໍ່ພັງ)
// ວິທີໃຊ້: <CarImage src="/cars/camry.jpg" alt="Toyota Camry" className="h-16 w-24" />
// className ກຳນົດຂະໜາດຂອງກ່ອງຮູບ
// =====================================================================

// ຕ້ອງໃຊ້ "use client" ເພາະມີ useState ແລະ onError
"use client";

import { useState } from "react";
// Image ຂອງ Next.js = ແທັກ <img> ທີ່ຫຍໍ້ຂະໜາດຮູບໃຫ້ອັດຕະໂນມັດ (ໂຫຼດໄວຂຶ້ນ)
import Image from "next/image";
import { Car } from "lucide-react";
import { cn } from "@/lib/utils";

type CarImageProps = {
  src: string; // ທີ່ຢູ່ຮູບ ເຊັ່ນ "/cars/camry.jpg"
  alt: string; // ຄຳອະທິບາຍຮູບ (ສຳລັບຄົນທີ່ເບິ່ງບໍ່ເຫັນ ແລະກໍລະນີຮູບບໍ່ຂຶ້ນ)
  className?: string;
};

export function CarImage({ src, alt, className }: CarImageProps) {
  // failed = true ເມື່ອໂຫຼດຮູບບໍ່ໄດ້
  const [failed, setFailed] = useState(false);

  return (
    // relative = ຈຳເປັນສຳລັບ Image ແບບ fill (ຮູບຈະຂະຫຍາຍເຕັມກ່ອງນີ້)
    // overflow-hidden + rounded-lg = ຕັດມຸມຮູບໃຫ້ມົນ
    // cn(...) = ລວມ class ພື້ນຖານ ກັບ className ທີ່ສົ່ງເຂົ້າມາ
    <div className={cn("relative shrink-0 overflow-hidden rounded-lg bg-muted", className)}>
      {failed ? (
        // ໂຫຼດຮູບບໍ່ໄດ້: ສະແດງໄອຄອນລົດຢູ່ກາງກ່ອງ
        <div className="flex size-full items-center justify-center text-muted-foreground">
          <Car className="size-1/2" />
        </div>
      ) : (
        // fill = ຮູບຂະຫຍາຍເຕັມກ່ອງ, object-cover = ຕັດຂອບໃຫ້ພໍດີ ບໍ່ໃຫ້ຮູບບີບເບຍ
        // sizes = ບອກ browser ວ່າຮູບກວ້າງປະມານເທົ່າໃດ ເພື່ອເລືອກໄຟລ໌ຂະໜາດພໍດີ
        // onError = ເອີ້ນເມື່ອໂຫຼດຮູບບໍ່ໄດ້ → ປ່ຽນ failed ເປັນ true
        <Image
          src={src}
          alt={alt}
          fill
          sizes="160px"
          className="object-cover"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
