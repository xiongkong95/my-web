// =====================================================================
// AuthShell — ໂຄງຮ່າງຮ່ວມຂອງໜ້າ Login ແລະ Register
// ---------------------------------------------------------------------
// ສ້າງໄວ້ບ່ອນດຽວ ເພື່ອໃຫ້ທັງ 2 ໜ້າໜ້າຕາຄືກັນ ແລະບໍ່ຕ້ອງຂຽນ code ຊ້ຳ
// ສິ່ງທີ່ມີໃນນີ້:
//   - ພື້ນຫຼັງມືດ ລາຍເສັ້ນ blueprint ເຕັມໜ້າຈໍ
//   - ຮູບລົດໃຫຍ່ + ຊື່ຮ້ານ + ຄຳຂວັນ ດ້ານຊ້າຍ (ສະແດງສະເພາະຈໍໃຫຍ່)
//   - ກາດດ້ານຂວາ + ປຸ່ມພາສາ + ປຸ່ມ dark mode + ໂລໂກ້ລົດ + ຊື່ຮ້ານ + ຫົວຂໍ້
//   - ເນື້ອໃນ (children) ເຊັ່ນ ຟອມ ຈະຖືກໃສ່ເຂົ້າໄປໃນກາດ
// ວິທີໃຊ້:
//   <AuthShell title={t.login.title}>
//     ...ຟອມຂອງເຈົ້າ...
//   </AuthShell>
// =====================================================================

// ຕ້ອງໃຊ້ "use client" ເພາະໃຊ້ useLanguage() (ພາສາປ່ຽນໄດ້ໃນ browser)
"use client";

import { CarLogo } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { useLanguage } from "@/components/language-provider";

// ປະເພດຂອງ props ທີ່ component ນີ້ຮັບ:
//   title    = ຫົວຂໍ້ໃຫຍ່ໃນກາດ (string = ຂໍ້ຄວາມ)
//   children = ເນື້ອໃນທີ່ຢູ່ລະຫວ່າງ <AuthShell> ... </AuthShell>
type AuthShellProps = {
  title: string;
  children: React.ReactNode;
};

export function AuthShell({ title, children }: AuthShellProps) {
  // t = ຂໍ້ຄວາມຕາມພາສາທີ່ເລືອກ (ລາວ ຫຼື ອັງກິດ)
  const { t } = useLanguage();

  return (
    // ກ່ອງໃຫຍ່ເຕັມຈໍ ພື້ນສີດຳ (zinc-950) ທັງໜ້າ
    // relative + overflow-hidden = ໃຫ້ລາຍເສັ້ນດ້ານຫຼັງຢູ່ໃນກ່ອງນີ້ ບໍ່ລົ້ນອອກ
    // grid-cols-1 = ມືຖື 1 ຖັນ, lg:grid-cols-2 = ຈໍໃຫຍ່ 2 ຖັນ
    <main className="relative grid flex-1 grid-cols-1 overflow-hidden bg-zinc-950 lg:grid-cols-2">
      {/* ===== ພື້ນຫຼັງ: ລາຍເສັ້ນຕາຕະລາງແບບ blueprint =====
          ໃຊ້ linear-gradient 2 ອັນ ແຕ້ມເສັ້ນຕັ້ງ ແລະ ເສັ້ນນອນ ຊ້ຳໆທຸກ 40px */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(#52525b 1px, transparent 1px), linear-gradient(90deg, #52525b 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* ແສງເງົາມືດອ້ອມຂອບ ໃຫ້ພາບເບິ່ງມີມິຕິ (radial-gradient = ໄລ່ສີເປັນວົງມົນ) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,transparent_10%,#09090b_70%)]" />

      {/* ===== ຝັ່ງຊ້າຍ: ຮູບລົດໃຫຍ່ + ຊື່ຮ້ານ + ຄຳຂວັນ =====
          hidden lg:flex = ເຊື່ອງໃນມືຖື, ສະແດງສະເພາະຈໍໃຫຍ່
          flex-col = ລຽງລົງລຸ່ມ, text-center = ຈັດຂໍ້ຄວາມກາງ */}
      <div className="relative hidden flex-col items-center justify-center gap-8 text-center lg:flex">
        {/* w-[28rem] = ກວ້າງ 448px */}
        <CarLogo className="w-[28rem] text-zinc-600" />
        <div className="flex flex-col gap-2">
          {/* tracking-widest = ຫ່າງຕົວອັກສອນ, uppercase = ຕົວໃຫຍ່ທັງໝົດ */}
          <p className="text-sm tracking-widest text-primary uppercase">Moora Auto Service</p>
          <p className="text-3xl font-medium text-zinc-200">{t.auth.tagline}</p>
          <p className="text-zinc-400">{t.auth.subtagline}</p>
        </div>
      </div>

      {/* ===== ຝັ່ງຂວາ: ກາດ =====
          min-w-0 = ບໍ່ໃຫ້ກາດດັນຖັນໃຫ້ກວ້າງເກີນໜ້າຈໍ (ກັນລົ້ນໃນມືຖື) */}
      <div className="relative flex min-w-0 items-center justify-center p-4 sm:p-8">
        {/* ກາດ:
            rounded-2xl = ມຸມມົນ, border = ເສັ້ນຂອບ, bg-card = ສີພື້ນກາດ
            shadow-[...] = ເງົາສີທອງອ່ອນໆ ດ້ານຂວາ
            relative = ໃຫ້ປຸ່ມ dark mode ວາງຕຳແໜ່ງອີງໃສ່ກາດນີ້ໄດ້ */}
        <div className="relative w-full max-w-md rounded-2xl border bg-card px-8 py-12 shadow-[12px_0_48px_-16px_rgba(217,176,122,0.35)]">
          {/* ປຸ່ມພາສາ + ປຸ່ມ dark mode ຢູ່ມຸມຂວາເທິງຂອງກາດ */}
          <div className="absolute top-4 right-4 flex gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>

          {/* ໂລໂກ້ລົດສີທອງ + ຊື່ຮ້ານ + ຫົວຂໍ້ (ຮັບມາຈາກ props title) */}
          <div className="mb-8 flex flex-col items-center gap-2">
            <CarLogo className="w-28 text-primary" />
            <p className="text-xs tracking-widest text-muted-foreground uppercase">Moora Auto Service</p>
            <h1 className="mt-2 text-3xl font-medium">{title}</h1>
          </div>

          {/* ເນື້ອໃນຂອງແຕ່ລະໜ້າ (ຟອມ Login ຫຼື Register) */}
          {children}
        </div>
      </div>
    </main>
  );
}
