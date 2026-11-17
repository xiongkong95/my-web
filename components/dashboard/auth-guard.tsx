// =====================================================================
// AuthGuard — "ຜູ້ເຝົ້າປະຕູ" ຂອງໜ້າ Dashboard
// ---------------------------------------------------------------------
// ກວດວ່າ Login ແລ້ວບໍ່:
//   - Login ແລ້ວ  → ສະແດງເນື້ອຫາ (children) ຕາມປົກກະຕິ
//   - ຍັງບໍ່ Login → ສົ່ງກັບໄປໜ້າ /login
// ໃຊ້ໂດຍຫຸ້ມເນື້ອຫາໄວ້: <AuthGuard> ...ເນື້ອຫາ... </AuthGuard>
// =====================================================================

// ຕ້ອງໃຊ້ "use client" ເພາະອ່ານ localStorage (ມີສະເພາະໃນ browser)
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/lib/user";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  // allowed = ອະນຸຍາດໃຫ້ເບິ່ງບໍ່ (ເລີ່ມຕົ້ນ false = ຍັງບໍ່ໄດ້ກວດ)
  const [allowed, setAllowed] = useState(false);

  // ກວດຫຼັງຈາກໜ້າໂຫຼດໃນ browser ແລ້ວ
  useEffect(() => {
    if (isLoggedIn()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- ອ່ານຄ່າຈາກ localStorage ເທື່ອດຽວຕອນໂຫຼດ
      setAllowed(true);
    } else {
      // replace = ປ່ຽນໜ້າແບບບໍ່ເກັບໃນປະຫວັດ (ກົດ Back ຈະບໍ່ກັບມາໜ້ານີ້)
      router.replace("/login");
    }
  }, [router]);

  // ລະຫວ່າງກວດ ຫຼືກຳລັງສົ່ງໄປໜ້າ Login: ບໍ່ສະແດງຫຍັງ
  // (ກັນບໍ່ໃຫ້ເຫັນເນື້ອຫາ Dashboard ແວບໜຶ່ງກ່ອນຖືກສົ່ງອອກ)
  if (!allowed) return null;

  return <>{children}</>;
}
