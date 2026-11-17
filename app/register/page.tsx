// =====================================================================
// ໜ້າ Register (URL: /register)
// ---------------------------------------------------------------------
// ໜ້າທີ່: ໃຫ້ຜູ້ໃຊ້ສ້າງບັນຊີໃໝ່ ໂດຍປ້ອນ Name, Phone number, Password, Confirm password
//         ຫຼື ສະໝັກດ້ວຍປຸ່ມ Google
// ມີການກວດຂໍ້ມູນ (validation) 4 ຢ່າງ ກ່ອນສົ່ງ
// ໜ້າຕາ (ພື້ນມືດ, ກາດ, ໂລໂກ້) ມາຈາກ component AuthShell ຄືກັບໜ້າ Login
// ໝາຍເຫດ: ບໍ່ໄດ້ບັນທຶກຂໍ້ມູນແທ້ (ບໍ່ມີ database), ເປັນການຈຳລອງເທົ່ານັ້ນ
// =====================================================================

// "use client" = ໄຟລ໌ນີ້ເຮັດວຽກໃນ browser (ຕ້ອງໃຊ້ເພາະມີ useState ແລະ onSubmit)
"use client";

// ---------- ສ່ວນ import ----------
import { useState } from "react"; // ເກັບຂໍ້ມູນທີ່ປ່ຽນແປງໄດ້
import Link from "next/link"; // ລິ້ງໄປໜ້າອື່ນ
import { useRouter } from "next/navigation"; // ສັ່ງປ່ຽນໜ້າດ້ວຍ code
// ໄອຄອນຈາກ lucide-react: ຄົນ, ໂທລະສັບ, ກະແຈ, ຕາ, ຕາປິດ, ລູກສອນ
import { ArrowRight, Eye, EyeOff, Lock, Phone, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthShell } from "@/components/auth-shell"; // ໂຄງຮ່າງໜ້າ (ພື້ນຫຼັງ + ກາດ)
import { GoogleButton } from "@/components/google-button"; // ເສັ້ນແບ່ງ + ປຸ່ມ Google
import { isValidLaoPhone } from "@/lib/phone"; // ຟັງຊັນກວດເບີໂທລາວ (ໃຊ້ຮ່ວມກັບໜ້າ Login)

// class ທີ່ໃຊ້ຊ້ຳຫຼາຍເທື່ອ ເກັບໄວ້ໃນຕົວແປ ເພື່ອບໍ່ຕ້ອງພິມຊ້ຳ
// ໄອຄອນໃນຊ່ອງພິມ: absolute left-3 = ຫ່າງຊ້າຍ, top-1/2 -translate-y-1/2 = ຈັດກາງແນວຕັ້ງ
const iconClass = "absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground";
// ປຸ່ມຕາ ຢູ່ຂວາໃນຊ່ອງພິມ
const eyeButtonClass =
  "absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground";

// =====================================================================
// Component ຫຼັກຂອງໜ້າ Register
// =====================================================================
export default function RegisterPage() {
  const router = useRouter(); // ໃຊ້ປ່ຽນໜ້າ

  // ---------- State: ເກັບຄ່າຂອງແຕ່ລະຊ່ອງ ----------
  const [name, setName] = useState(""); // ຊື່
  const [phone, setPhone] = useState(""); // ເບີໂທ
  const [password, setPassword] = useState(""); // ລະຫັດຜ່ານ
  const [confirmPassword, setConfirmPassword] = useState(""); // ຢືນຢັນລະຫັດຜ່ານ
  // true = ສະແດງລະຫັດຜ່ານໃຫ້ເຫັນ (ໃຊ້ຮ່ວມກັນທັງ 2 ຊ່ອງ Password)
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(""); // ຂໍ້ຄວາມ error (ວ່າງ = ບໍ່ມີ error)

  // ---------- ຟັງຊັນທີ່ເຮັດວຽກເມື່ອກົດປຸ່ມ Create account ----------
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // ຫ້າມບໍ່ໃຫ້ form reload ໜ້າເວັບ

    // ກວດຂໍ້ມູນເທື່ອລະຂັ້ນ: ຖ້າຜິດຂັ້ນໃດ ໃຫ້ສະແດງ error ແລ້ວ return (ຢຸດ) ທັນທີ

    // ຂັ້ນ 1: ກວດວ່າປ້ອນຄົບທຸກຊ່ອງບໍ່ ("||" = "ຫຼື")
    if (name === "" || phone === "" || password === "" || confirmPassword === "") {
      setError("ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບທຸກຊ່ອງ");
      return;
    }

    // ຂັ້ນ 2: ກວດຮູບແບບເບີໂທ ("!" = "ບໍ່", ຄື ຖ້າເບີໂທບໍ່ຖືກຕ້ອງ)
    if (!isValidLaoPhone(phone)) {
      setError("ເບີໂທບໍ່ຖືກຕ້ອງ (ຕົວຢ່າງ: 020 5555 5555 ຫຼື 030 555 5555)");
      return;
    }

    // ຂັ້ນ 3: ກວດຄວາມຍາວ Password (.length = ຈຳນວນຕົວອັກສອນ)
    if (password.length < 6) {
      setError("Password ຕ້ອງມີຢ່າງໜ້ອຍ 6 ຕົວອັກສອນ");
      return;
    }

    // ຂັ້ນ 4: ກວດວ່າ Password ກັບ Confirm ກົງກັນບໍ່ ("!==" = "ບໍ່ເທົ່າກັບ")
    if (password !== confirmPassword) {
      setError("Password ແລະ Confirm password ບໍ່ກົງກັນ");
      return;
    }

    // ຖ້າມາຮອດນີ້ = ຂໍ້ມູນຖືກຕ້ອງທັງໝົດ
    setError(""); // ລ້າງ error
    alert("ລົງທະບຽນສຳເລັດ! ກະລຸນາ Login"); // alert = ສະແດງກ່ອງແຈ້ງເຕືອນ
    router.push("/login"); // ໄປໜ້າ Login
  }

  // ---------- ສ່ວນສະແດງຜົນ (JSX) ----------
  return (
    // AuthShell ສ້າງພື້ນຫຼັງ, ກາດ, ໂລໂກ້ ແລະຫົວຂໍ້ໃຫ້ (ຄືກັບໜ້າ Login)
    <AuthShell title="Create an account">
      {/* form: ກົດປຸ່ມ submit ແລ້ວຈະເອີ້ນ handleSubmit */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* ທຸກຊ່ອງມີຮູບແບບດຽວກັນ:
            - Label = ປ້າຍຊື່ (htmlFor ຕ້ອງກົງກັບ id ຂອງ Input)
            - div relative = ໃຫ້ໄອຄອນວາງຊ້ອນຢູ່ໃນຊ່ອງພິມໄດ້
            - Input = ຊ່ອງພິມ, pl-10 = ເວັ້ນຊ້າຍໃຫ້ໄອຄອນ
              value ເອົາຈາກ state, onChange ອັບເດດ state ທຸກເທື່ອທີ່ພິມ */}

        {/* ----- ຊ່ອງ Name ----- */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Name</Label>
          <div className="relative">
            <User className={iconClass} />
            <Input
              id="name"
              placeholder="ຊື່ຂອງເຈົ້າ"
              className="h-11 pl-10"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        {/* ----- ຊ່ອງເບີໂທ ----- */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="phone">Phone number</Label>
          <div className="relative">
            <Phone className={iconClass} />
            <Input
              id="phone"
              type="tel" // tel = ມືຖືຈະເປີດແປ້ນພິມຕົວເລກ
              placeholder="020 5555 5555"
              maxLength={13} // ພິມໄດ້ສູງສຸດ 13 ຕົວ (11 ຕົວເລກ + 2 ຍະຫວ່າງ)
              className="h-11 pl-10"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        {/* ----- ຊ່ອງ Password ----- */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className={iconClass} />
            <Input
              id="password"
              // showPassword ເປັນ true → ສະແດງຕົວໜັງສື, false → ເຊື່ອງເປັນ ●●●
              type={showPassword ? "text" : "password"}
              placeholder="ຢ່າງໜ້ອຍ 6 ຕົວອັກສອນ"
              className="h-11 pr-10 pl-10" // pr-10 = ເວັ້ນຂວາໃຫ້ປຸ່ມຕາ
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* ປຸ່ມຕາ: type="button" ເພື່ອບໍ່ໃຫ້ສົ່ງ form ເມື່ອກົດ */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={eyeButtonClass}
              aria-label={showPassword ? "ເຊື່ອງລະຫັດຜ່ານ" : "ສະແດງລະຫັດຜ່ານ"}
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </div>

        {/* ----- ຊ່ອງ Confirm password -----
            ໃຊ້ showPassword ອັນດຽວກັນ: ກົດຕາຊ່ອງໃດກໍສະແດງ/ເຊື່ອງ ທັງ 2 ຊ່ອງ */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <div className="relative">
            <Lock className={iconClass} />
            <Input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="ພິມລະຫັດຜ່ານອີກຄັ້ງ"
              className="h-11 pr-10 pl-10"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={eyeButtonClass}
              aria-label={showPassword ? "ເຊື່ອງລະຫັດຜ່ານ" : "ສະແດງລະຫັດຜ່ານ"}
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </div>

        {/* ສະແດງ error ສີແດງ ສະເພາະຕອນທີ່ error ບໍ່ວ່າງ */}
        {error && <p className="text-sm text-destructive">{error}</p>}

        {/* ===== ປຸ່ມສ້າງບັນຊີ: ສີທອງໄລ່ສີ ຄືປຸ່ມ Login ===== */}
        <Button
          type="submit"
          className="relative h-11 w-full bg-linear-to-r from-primary to-primary/75 text-base hover:opacity-90"
        >
          Create account
          <ArrowRight className="absolute right-4" />
        </Button>
      </form>

      {/* ----- ເສັ້ນແບ່ງ + ປຸ່ມ Google ----- */}
      <GoogleButton />

      {/* ----- ລິ້ງກັບໄປໜ້າ Login ----- */}
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="text-primary hover:underline">
          Login
        </Link>
      </p>
    </AuthShell>
  );
}
