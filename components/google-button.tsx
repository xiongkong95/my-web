// =====================================================================
// ສ່ວນ "or continue with" + ປຸ່ມ Google (ໃຊ້ຮ່ວມກັນໃນ Login ແລະ Register)
// ---------------------------------------------------------------------
// ໝາຍເຫດ: ຍັງບໍ່ໄດ້ເຊື່ອມຕໍ່ Google ແທ້ ກົດແລ້ວພຽງແຕ່ສະແດງຂໍ້ຄວາມແຈ້ງເຕືອນ
// =====================================================================

// ຕ້ອງໃຊ້ "use client" ເພາະມີ onClick
"use client";

import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/components/icons";

export function GoogleButton() {
  // ເມື່ອກົດປຸ່ມ Google
  function handleGoogleLogin() {
    alert("Login ດ້ວຍ Google ຍັງບໍ່ທັນເປີດໃຊ້");
  }

  return (
    // <> ... </> = Fragment: ຫໍ່ຫຼາຍອົງປະກອບເຂົ້າກັນ ໂດຍບໍ່ເພີ່ມແທັກໃໝ່ໃນ HTML
    <>
      {/* ----- ເສັ້ນແບ່ງ "or continue with" -----
          ເສັ້ນຊ້າຍ + ຂໍ້ຄວາມ + ເສັ້ນຂວາ (flex-1 = ໃຫ້ເສັ້ນຍືດເຕັມທີ່ເຫຼືອ) */}
      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">or continue with</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* ----- ປຸ່ມ Google (ກວ້າງເຕັມແຖວ: w-full) ----- */}
      <Button
        type="button"
        variant="outline"
        className="h-11 w-full"
        onClick={handleGoogleLogin}
      >
        <GoogleIcon />
        Continue with Google
      </Button>
    </>
  );
}
