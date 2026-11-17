// =====================================================================
// AuthShell — ໂຄງຮ່າງຮ່ວມຂອງໜ້າ Login ແລະ Register
// ---------------------------------------------------------------------
// ສ້າງໄວ້ບ່ອນດຽວ ເພື່ອໃຫ້ທັງ 2 ໜ້າໜ້າຕາຄືກັນ ແລະບໍ່ຕ້ອງຂຽນ code ຊ້ຳ
// ສິ່ງທີ່ມີໃນນີ້:
//   - ພື້ນຫຼັງມືດ ລາຍເສັ້ນ blueprint ເຕັມໜ້າຈໍ
//   - ຮູບກ້ອນລູກບາດໃຫຍ່ດ້ານຊ້າຍ (ສະແດງສະເພາະຈໍໃຫຍ່)
//   - ກາດດ້ານຂວາ + ປຸ່ມ dark mode + ໂລໂກ້ + ຫົວຂໍ້
//   - ເນື້ອໃນ (children) ເຊັ່ນ ຟອມ ຈະຖືກໃສ່ເຂົ້າໄປໃນກາດ
// ວິທີໃຊ້:
//   <AuthShell title="Welcome back">
//     ...ຟອມຂອງເຈົ້າ...
//   </AuthShell>
// =====================================================================

import { CubeLogo } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";

// ປະເພດຂອງ props ທີ່ component ນີ້ຮັບ:
//   title    = ຫົວຂໍ້ໃຫຍ່ໃນກາດ (string = ຂໍ້ຄວາມ)
//   children = ເນື້ອໃນທີ່ຢູ່ລະຫວ່າງ <AuthShell> ... </AuthShell>
type AuthShellProps = {
  title: string;
  children: React.ReactNode;
};

export function AuthShell({ title, children }: AuthShellProps) {
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

      {/* ===== ຝັ່ງຊ້າຍ: ຮູບກ້ອນລູກບາດໃຫຍ່ =====
          hidden lg:flex = ເຊື່ອງໃນມືຖື, ສະແດງສະເພາະຈໍໃຫຍ່ */}
      <div className="relative hidden items-center justify-center lg:flex">
        <CubeLogo className="size-72 text-zinc-600" />
      </div>

      {/* ===== ຝັ່ງຂວາ: ກາດ =====
          min-w-0 = ບໍ່ໃຫ້ກາດດັນຖັນໃຫ້ກວ້າງເກີນໜ້າຈໍ (ກັນລົ້ນໃນມືຖື) */}
      <div className="relative flex min-w-0 items-center justify-center p-4 sm:p-8">
        {/* ກາດ:
            rounded-2xl = ມຸມມົນ, border = ເສັ້ນຂອບ, bg-card = ສີພື້ນກາດ
            shadow-[...] = ເງົາສີທອງອ່ອນໆ ດ້ານຂວາ
            relative = ໃຫ້ປຸ່ມ dark mode ວາງຕຳແໜ່ງອີງໃສ່ກາດນີ້ໄດ້ */}
        <div className="relative w-full max-w-md rounded-2xl border bg-card px-8 py-12 shadow-[12px_0_48px_-16px_rgba(217,176,122,0.35)]">
          {/* ປຸ່ມ dark mode ຢູ່ມຸມຂວາເທິງຂອງກາດ */}
          <div className="absolute top-4 right-4">
            <ThemeToggle />
          </div>

          {/* ໂລໂກ້ສີທອງ + ຫົວຂໍ້ (ຮັບມາຈາກ props title) */}
          <div className="mb-8 flex flex-col items-center gap-4">
            <CubeLogo className="size-16 text-[#d9b07a]" />
            <h1 className="text-3xl font-medium">{title}</h1>
          </div>

          {/* ເນື້ອໃນຂອງແຕ່ລະໜ້າ (ຟອມ Login ຫຼື Register) */}
          {children}
        </div>
      </div>
    </main>
  );
}
