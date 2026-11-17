// =====================================================================
// ໜ້າ Login (URL: /login)
// ---------------------------------------------------------------------
// ໜ້າທີ່: ເຂົ້າລະບົບໄດ້ 2 ວິທີເທົ່ານັ້ນ:
//   1. Email + Password
//   2. ປຸ່ມ Google
// ໜ້າຕາ (ພື້ນມືດ, ກາດ, ໂລໂກ້) ມາຈາກ component AuthShell
// ໝາຍເຫດ: ນີ້ແມ່ນການ "ຈຳລອງ" ເທົ່ານັ້ນ, ກວດກັບຂໍ້ມູນໃນ localStorage
//          (ທີ່ບັນທຶກຕອນ Register) ບໍ່ແມ່ນ server ຫຼື database ແທ້
// =====================================================================

// "use client" = ໄຟລ໌ນີ້ເຮັດວຽກໃນ browser (ຕ້ອງໃຊ້ເພາະມີ useState ແລະ onClick)
"use client";

// ---------- ສ່ວນ import ----------
import { useState } from "react"; // ເກັບຂໍ້ມູນທີ່ປ່ຽນແປງໄດ້
import Link from "next/link"; // ລິ້ງໄປໜ້າອື່ນ
import { useRouter } from "next/navigation"; // ສັ່ງປ່ຽນໜ້າດ້ວຍ code
// ໄອຄອນຈາກ lucide-react: ຊອງຈົດໝາຍ, ກະແຈ, ຕາ, ຕາປິດ, ລູກສອນ
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthShell } from "@/components/auth-shell"; // ໂຄງຮ່າງໜ້າ (ພື້ນຫຼັງ + ກາດ)
import { GoogleButton } from "@/components/google-button"; // ເສັ້ນແບ່ງ + ປຸ່ມ Google
import { isValidEmail, normalizeEmail } from "@/lib/email"; // ຟັງຊັນກວດ email
import { loadUser, setLoggedIn } from "@/lib/user"; // ອ່ານບັນຊີ + ຈື່ວ່າ Login ແລ້ວ
import { useLanguage } from "@/components/language-provider"; // ຂໍ້ຄວາມຕາມພາສາ (ລາວ/ອັງກິດ)

// =====================================================================
// Component ຫຼັກຂອງໜ້າ Login
// =====================================================================
export default function LoginPage() {
  const router = useRouter(); // ໃຊ້ປ່ຽນໜ້າ
  // t = ຂໍ້ຄວາມທັງໝົດຕາມພາສາທີ່ເລືອກ (ເບິ່ງ lib/translations.ts)
  const { t } = useLanguage();

  // ---------- State ----------
  const [email, setEmail] = useState(""); // email ທີ່ພິມ
  const [password, setPassword] = useState(""); // Password ທີ່ພິມ
  const [showPassword, setShowPassword] = useState(false); // true = ສະແດງລະຫັດຜ່ານໃຫ້ເຫັນ
  const [error, setError] = useState(""); // ຂໍ້ຄວາມ error (ວ່າງ = ບໍ່ມີ error)

  // ---------- ເມື່ອກົດປຸ່ມ Login ----------
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // ຫ້າມບໍ່ໃຫ້ form reload ໜ້າເວັບ

    // ຂັ້ນ 1: ກວດວ່າປ້ອນຄົບບໍ່ ("||" = "ຫຼື")
    if (email === "" || password === "") {
      setError(t.login.errEmpty);
      return; // ຢຸດ ບໍ່ເຮັດຕໍ່
    }

    // ຂັ້ນ 2: ກວດຮູບແບບ email ("!" = "ບໍ່", ຄື ຖ້າ email ບໍ່ຖືກຕ້ອງ)
    if (!isValidEmail(email)) {
      setError(t.fields.errEmailInvalid);
      return;
    }

    // ຂັ້ນ 3: ກວດວ່າເຄີຍ Register ແລ້ວບໍ່
    const user = loadUser();
    if (user === null) {
      setError(t.login.errNoAccount);
      return;
    }

    // ຂັ້ນ 4: ກວດວ່າ Email ແລະ Password ກົງກັບທີ່ Register ໄວ້ບໍ່
    // normalizeEmail = ລຶບຍະຫວ່າງ + ປ່ຽນເປັນຕົວນ້ອຍ ກ່ອນປຽບທຽບ
    // ເຊັ່ນ "Noy@Gmail.com" ກັບ "noy@gmail.com" ຖືວ່າເປັນ email ດຽວກັນ
    const sameEmail = normalizeEmail(email) === user.email;
    if (!sameEmail || password !== user.password) {
      setError(t.login.errWrong);
      return;
    }

    setError(""); // ລ້າງ error
    setLoggedIn(); // ຈື່ວ່າ Login ແລ້ວ (ໜ້າ Dashboard ຈະກວດອັນນີ້)
    router.push("/dashboard"); // ໄປໜ້າ Dashboard
  }

  // ---------- ສ່ວນສະແດງຜົນ (JSX) ----------
  return (
    // AuthShell ສ້າງພື້ນຫຼັງ, ກາດ, ໂລໂກ້ ແລະຫົວຂໍ້ໃຫ້
    // ສິ່ງທີ່ຢູ່ລະຫວ່າງ <AuthShell> ... </AuthShell> ຈະຖືກໃສ່ເຂົ້າໄປໃນກາດ
    <AuthShell title={t.login.title}>
      {/* ----- ຟອມ Login ----- */}
      {/* noValidate = ປິດການກວດອັດຕະໂນມັດຂອງ browser
          ເພື່ອໃຫ້ສະແດງຂໍ້ຄວາມ error ພາສາລາວຂອງເຮົາເອງແທນ */}
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        {/* ===== ຊ່ອງ Email ===== */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">{t.fields.email}</Label>
          {/* relative = ໃຫ້ໄອຄອນວາງຊ້ອນຢູ່ໃນຊ່ອງພິມໄດ້ */}
          <div className="relative">
            {/* ໄອຄອນຊອງຈົດໝາຍ ວາງຢູ່ຊ້າຍໃນຊ່ອງ
                absolute left-3 = ຫ່າງຊ້າຍ, top-1/2 -translate-y-1/2 = ຈັດກາງແນວຕັ້ງ */}
            <Mail className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="email"
              type="email" // email = ມືຖືຈະເປີດແປ້ນພິມທີ່ມີປຸ່ມ @
              placeholder={t.fields.emailPlaceholder}
              // h-11 = ສູງຂຶ້ນ, pl-10 = ເວັ້ນຊ້າຍໃຫ້ໄອຄອນ
              className="h-11 pl-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* ===== ຊ່ອງ Password ===== */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">{t.fields.password}</Label>
          <div className="relative">
            {/* ໄອຄອນກະແຈ ຢູ່ຊ້າຍ */}
            <Lock className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="password"
              // ຖ້າ showPassword ເປັນ true ສະແດງເປັນຕົວໜັງສື, ຖ້າ false ເຊື່ອງເປັນ ●●●
              type={showPassword ? "text" : "password"}
              placeholder={t.fields.passwordPlaceholder}
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
              aria-label={showPassword ? t.fields.hidePassword : t.fields.showPassword}
            >
              {/* ສະແດງໄອຄອນຕາມສະຖານະ: ເປີດຢູ່ → ຕາປິດ, ປິດຢູ່ → ຕາເປີດ */}
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>

          {/* ລິ້ງລືມລະຫັດຜ່ານ: ຈັດຢູ່ຂວາ (self-end), ສີທອງ
              href="#" = ຍັງບໍ່ມີໜ້ານີ້ */}
          <Link href="#" className="self-end text-sm text-primary hover:underline">
            {t.login.forgot}
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
          {t.login.submit}
          {/* ລູກສອນ ວາງຢູ່ຂວາສຸດຂອງປຸ່ມ */}
          <ArrowRight className="absolute right-4" />
        </Button>
      </form>

      {/* ----- ເສັ້ນແບ່ງ + ປຸ່ມ Google ----- */}
      <GoogleButton />

      {/* ----- ລິ້ງໄປໜ້າ Register ----- */}
      <p className="mt-8 text-center text-sm text-muted-foreground">
        {t.login.noAccount}{" "}
        <Link href="/register" className="text-primary hover:underline">
          {t.login.signUp}
        </Link>
      </p>
    </AuthShell>
  );
}
