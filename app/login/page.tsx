// =====================================================================
// ໜ້າ Login (URL: /login)
// ---------------------------------------------------------------------
// ໜ້າທີ່: ເຂົ້າລະບົບໄດ້ 2 ວິທີເທົ່ານັ້ນ:
//   1. ເບີໂທ + Password
//   2. ປຸ່ມ Google
// ໜ້າຕາ (ພື້ນມືດ, ກາດ, ໂລໂກ້) ມາຈາກ component AuthShell
// ໝາຍເຫດ: ນີ້ແມ່ນການ "ຈຳລອງ" ເທົ່ານັ້ນ, ບໍ່ໄດ້ກວດກັບ server ຫຼື database ແທ້
// =====================================================================

// "use client" = ໄຟລ໌ນີ້ເຮັດວຽກໃນ browser (ຕ້ອງໃຊ້ເພາະມີ useState ແລະ onClick)
"use client";

// ---------- ສ່ວນ import ----------
import { useState } from "react"; // ເກັບຂໍ້ມູນທີ່ປ່ຽນແປງໄດ້
import Link from "next/link"; // ລິ້ງໄປໜ້າອື່ນ
import { useRouter } from "next/navigation"; // ສັ່ງປ່ຽນໜ້າດ້ວຍ code
// ໄອຄອນຈາກ lucide-react: ໂທລະສັບ, ກະແຈ, ຕາ, ຕາປິດ, ລູກສອນ
import { ArrowRight, Eye, EyeOff, Lock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthShell } from "@/components/auth-shell"; // ໂຄງຮ່າງໜ້າ (ພື້ນຫຼັງ + ກາດ)
import { GoogleButton } from "@/components/google-button"; // ເສັ້ນແບ່ງ + ປຸ່ມ Google
import { isValidLaoPhone } from "@/lib/phone"; // ຟັງຊັນກວດເບີໂທລາວ

// =====================================================================
// Component ຫຼັກຂອງໜ້າ Login
// =====================================================================
export default function LoginPage() {
  const router = useRouter(); // ໃຊ້ປ່ຽນໜ້າ

  // ---------- State ----------
  const [phone, setPhone] = useState(""); // ເບີໂທທີ່ພິມ
  const [password, setPassword] = useState(""); // Password ທີ່ພິມ
  const [showPassword, setShowPassword] = useState(false); // true = ສະແດງລະຫັດຜ່ານໃຫ້ເຫັນ
  const [error, setError] = useState(""); // ຂໍ້ຄວາມ error (ວ່າງ = ບໍ່ມີ error)

  // ---------- ເມື່ອກົດປຸ່ມ Login ----------
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // ຫ້າມບໍ່ໃຫ້ form reload ໜ້າເວັບ

    // ຂັ້ນ 1: ກວດວ່າປ້ອນຄົບບໍ່ ("||" = "ຫຼື")
    if (phone === "" || password === "") {
      setError("ກະລຸນາປ້ອນເບີໂທ ແລະ Password");
      return; // ຢຸດ ບໍ່ເຮັດຕໍ່
    }

    // ຂັ້ນ 2: ກວດຮູບແບບເບີໂທ ("!" = "ບໍ່", ຄື ຖ້າເບີໂທບໍ່ຖືກຕ້ອງ)
    if (!isValidLaoPhone(phone)) {
      setError("ເບີໂທບໍ່ຖືກຕ້ອງ (ຕົວຢ່າງ: 020 5555 5555 ຫຼື 030 555 5555)");
      return;
    }

    setError(""); // ລ້າງ error
    router.push("/dashboard"); // ໄປໜ້າ Dashboard
  }

  // ---------- ສ່ວນສະແດງຜົນ (JSX) ----------
  return (
    // AuthShell ສ້າງພື້ນຫຼັງ, ກາດ, ໂລໂກ້ ແລະຫົວຂໍ້ໃຫ້
    // ສິ່ງທີ່ຢູ່ລະຫວ່າງ <AuthShell> ... </AuthShell> ຈະຖືກໃສ່ເຂົ້າໄປໃນກາດ
    <AuthShell title="Welcome back">
      {/* ----- ຟອມ Login ----- */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* ===== ຊ່ອງເບີໂທ ===== */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="phone">Phone number</Label>
          {/* relative = ໃຫ້ໄອຄອນວາງຊ້ອນຢູ່ໃນຊ່ອງພິມໄດ້ */}
          <div className="relative">
            {/* ໄອຄອນໂທລະສັບ ວາງຢູ່ຊ້າຍໃນຊ່ອງ
                absolute left-3 = ຫ່າງຊ້າຍ, top-1/2 -translate-y-1/2 = ຈັດກາງແນວຕັ້ງ */}
            <Phone className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="phone"
              type="tel" // tel = ມືຖືຈະເປີດແປ້ນພິມຕົວເລກ
              placeholder="020 5555 5555"
              maxLength={13} // ພິມໄດ້ສູງສຸດ 13 ຕົວ (11 ຕົວເລກ + 2 ຍະຫວ່າງ)
              // h-11 = ສູງຂຶ້ນ, pl-10 = ເວັ້ນຊ້າຍໃຫ້ໄອຄອນ
              className="h-11 pl-10"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        {/* ===== ຊ່ອງ Password ===== */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            {/* ໄອຄອນກະແຈ ຢູ່ຊ້າຍ */}
            <Lock className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="password"
              // ຖ້າ showPassword ເປັນ true ສະແດງເປັນຕົວໜັງສື, ຖ້າ false ເຊື່ອງເປັນ ●●●
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="h-11 pr-10 pl-10" // pr-10 = ເວັ້ນຂວາໃຫ້ປຸ່ມຕາ
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* ປຸ່ມຕາ ຢູ່ຂວາ: ກົດແລ້ວສະຫຼັບ ສະແດງ/ເຊື່ອງ ລະຫັດຜ່ານ
                type="button" = ສຳຄັນ! ບໍ່ດັ່ງນັ້ນກົດແລ້ວຈະສົ່ງ form
                !showPassword = ປ່ຽນ true ເປັນ false ແລະ false ເປັນ true */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label={showPassword ? "ເຊື່ອງລະຫັດຜ່ານ" : "ສະແດງລະຫັດຜ່ານ"}
            >
              {/* ສະແດງໄອຄອນຕາມສະຖານະ: ເປີດຢູ່ → ຕາປິດ, ປິດຢູ່ → ຕາເປີດ */}
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>

          {/* ລິ້ງລືມລະຫັດຜ່ານ: ຈັດຢູ່ຂວາ (self-end), ສີທອງ
              href="#" = ຍັງບໍ່ມີໜ້ານີ້ */}
          <Link href="#" className="self-end text-sm text-primary hover:underline">
            Forgot password?
          </Link>
        </div>

        {/* ຂໍ້ຄວາມ error ສີແດງ (ສະແດງສະເພາະຕອນມີ error) */}
        {error && <p className="text-sm text-destructive">{error}</p>}

        {/* ===== ປຸ່ມ Login =====
            bg-linear-to-r from-primary to-primary/75 = ພື້ນໄລ່ສີທອງ (ສີ primary) ຈາກເຂັ້ມໄປຈາງ */}
        <Button
          type="submit"
          className="relative h-11 w-full bg-linear-to-r from-primary to-primary/75 text-base hover:opacity-90"
        >
          Login
          {/* ລູກສອນ ວາງຢູ່ຂວາສຸດຂອງປຸ່ມ */}
          <ArrowRight className="absolute right-4" />
        </Button>
      </form>

      {/* ----- ເສັ້ນແບ່ງ + ປຸ່ມ Google ----- */}
      <GoogleButton />

      {/* ----- ລິ້ງໄປໜ້າ Register ----- */}
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        {/* &apos; = ເຄື່ອງໝາຍ ' (ຕ້ອງຂຽນແບບນີ້ໃນ JSX) */}
        <Link href="/register" className="text-primary hover:underline">
          Sign up
        </Link>
      </p>
    </AuthShell>
  );
}
