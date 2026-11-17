// =====================================================================
// ໜ້າ Login (URL: /login)
// ---------------------------------------------------------------------
// ໜ້າທີ່: ໃຫ້ຜູ້ໃຊ້ປ້ອນ Email + Password ແລ້ວກົດ Login ເພື່ອເຂົ້າ Dashboard
// ໂຄງສ້າງໜ້າ (ຈໍໃຫຍ່ແບ່ງເປັນ 2 ຝັ່ງ):
//   - ຝັ່ງຊ້າຍ:  ພາບຕົກແຕ່ງ (ລາຍເສັ້ນ blueprint + ຮູບກ້ອນລູກບາດ) — ເຊື່ອງໄວ້ໃນມືຖື
//   - ຝັ່ງຂວາ:  ກາດ Login (ໂລໂກ້, ຟອມ, ປຸ່ມ Login, ປຸ່ມ Google/GitHub)
// ໝາຍເຫດ: ນີ້ແມ່ນການ "ຈຳລອງ" ເທົ່ານັ້ນ, ບໍ່ໄດ້ກວດກັບ server ຫຼື database ແທ້
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
import { ThemeToggle } from "@/components/theme-toggle";

// =====================================================================
// Component ນ້ອຍໆ ທີ່ໃຊ້ໃນໜ້ານີ້ (ແຍກອອກມາເພື່ອໃຫ້ code ຫຼັກອ່ານງ່າຍ)
// =====================================================================

// ---------- ໂລໂກ້ຮູບກ້ອນລູກບາດ (ແຕ້ມດ້ວຍ SVG) ----------
// SVG = ຮູບທີ່ແຕ້ມດ້ວຍ code, ຂະຫຍາຍເທົ່າໃດກໍບໍ່ແຕກ
// className ສົ່ງເຂົ້າມາເພື່ອກຳນົດຂະໜາດ/ສີ ຈາກບ່ອນທີ່ເອີ້ນໃຊ້
function CubeLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64" // ພື້ນທີ່ແຕ້ມ 64x64
      fill="none" // ບໍ່ລົງສີພາຍໃນ
      stroke="currentColor" // ສີເສັ້ນ = ສີຕົວໜັງສືປັດຈຸບັນ (ກຳນົດດ້ວຍ class text-...)
      strokeWidth="1.5" // ຄວາມໜາຂອງເສັ້ນ
      strokeLinejoin="round"
      className={className}
    >
      {/* ຮູບຫົກຫຼ່ຽມດ້ານນອກ */}
      <path d="M32 4 56 18v28L32 60 8 46V18Z" />
      {/* ກ້ອນລູກບາດດ້ານໃນ: ໜ້າເທິງ + ເສັ້ນລົງມາ */}
      <path d="M32 16 46 24v16L32 48 18 40V24Z" />
      <path d="M18 24 32 32 46 24M32 32v16" />
      {/* ເສັ້ນເຊື່ອມມຸມນອກກັບມຸມໃນ */}
      <path d="M32 4v12M56 18l-10 6M8 18l10 6M32 60V48M56 46l-10-6M8 46l10-6" />
    </svg>
  );
}

// ---------- ໂລໂກ້ Google (SVG 4 ສີ) ----------
function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4">
      <path fill="#4285F4" d="M22.6 12.2c0-.8-.1-1.5-.2-2.2H12v4.2h5.9a5 5 0 0 1-2.2 3.3v2.7h3.6c2.1-1.9 3.3-4.8 3.3-8Z" />
      <path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.7l-3.6-2.7c-1 .7-2.2 1-3.7 1-2.9 0-5.3-1.9-6.2-4.5H2.1v2.8A11 11 0 0 0 12 23Z" />
      <path fill="#FBBC05" d="M5.8 14.1a6.6 6.6 0 0 1 0-4.2V7.1H2.1a11 11 0 0 0 0 9.8l3.7-2.8Z" />
      <path fill="#EA4335" d="M12 5.4c1.6 0 3 .6 4.2 1.6l3.1-3.1A11 11 0 0 0 2.1 7.1l3.7 2.8C6.7 7.3 9.1 5.4 12 5.4Z" />
    </svg>
  );
}

// ---------- ໂລໂກ້ GitHub (SVG ສີດຽວ) ----------
function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
      <path d="M12 .5a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

// =====================================================================
// Component ຫຼັກຂອງໜ້າ Login
// =====================================================================
export default function LoginPage() {
  const router = useRouter(); // ໃຊ້ປ່ຽນໜ້າ

  // ---------- State ----------
  const [email, setEmail] = useState(""); // Email ທີ່ພິມ
  const [password, setPassword] = useState(""); // Password ທີ່ພິມ
  const [showPassword, setShowPassword] = useState(false); // true = ສະແດງລະຫັດຜ່ານໃຫ້ເຫັນ
  const [error, setError] = useState(""); // ຂໍ້ຄວາມ error (ວ່າງ = ບໍ່ມີ error)

  // ---------- ເມື່ອກົດປຸ່ມ Login ----------
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // ຫ້າມບໍ່ໃຫ້ form reload ໜ້າເວັບ

    // ກວດວ່າປ້ອນຄົບບໍ່ ("||" = "ຫຼື")
    if (email === "" || password === "") {
      setError("ກະລຸນາປ້ອນ Email ແລະ Password");
      return; // ຢຸດ ບໍ່ເຮັດຕໍ່
    }

    setError(""); // ລ້າງ error
    router.push("/dashboard"); // ໄປໜ້າ Dashboard
  }

  // ---------- ເມື່ອກົດປຸ່ມ Google / GitHub ----------
  // ຍັງບໍ່ໄດ້ເຊື່ອມຕໍ່ແທ້ ພຽງແຕ່ສະແດງຂໍ້ຄວາມແຈ້ງເຕືອນ
  function handleSocialLogin(provider: string) {
    alert(`Login ດ້ວຍ ${provider} ຍັງບໍ່ທັນເປີດໃຊ້`);
  }

  // ---------- ສ່ວນສະແດງຜົນ (JSX) ----------
  return (
    // ກ່ອງໃຫຍ່ເຕັມຈໍ ພື້ນສີດຳ (zinc-950) ທັງໜ້າ ຄືຮູບຕົວຢ່າງ
    // relative + overflow-hidden = ໃຫ້ລາຍເສັ້ນດ້ານຫຼັງຢູ່ໃນກ່ອງນີ້ ບໍ່ລົ້ນອອກ
    // grid-cols-1 = ມືຖື 1 ຖັນ, lg:grid-cols-2 = ຈໍໃຫຍ່ 2 ຖັນ
    <main className="relative grid flex-1 grid-cols-1 overflow-hidden bg-zinc-950 lg:grid-cols-2">
      {/* =========================================================
          ພື້ນຫຼັງ: ລາຍເສັ້ນຕາຕະລາງແບບ blueprint ເຕັມໜ້າຈໍ
          ໃຊ້ linear-gradient 2 ອັນ ແຕ້ມເສັ້ນຕັ້ງ ແລະ ເສັ້ນນອນ ຊ້ຳໆທຸກ 40px
          ========================================================= */}
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

      {/* =========================================================
          ຝັ່ງຊ້າຍ: ຮູບກ້ອນລູກບາດໃຫຍ່
          hidden lg:flex = ເຊື່ອງໃນມືຖື, ສະແດງສະເພາະຈໍໃຫຍ່
          relative = ໃຫ້ຢູ່ຊັ້ນເທິງພື້ນຫຼັງ
          ========================================================= */}
      <div className="relative hidden items-center justify-center lg:flex">
        <CubeLogo className="size-72 text-zinc-600" />
      </div>

      {/* =========================================================
          ຝັ່ງຂວາ: ກາດ Login
          ========================================================= */}
      {/* min-w-0 = ບໍ່ໃຫ້ກາດດັນຖັນໃຫ້ກວ້າງເກີນໜ້າຈໍ (ກັນລົ້ນໃນມືຖື) */}
      <div className="relative flex min-w-0 items-center justify-center p-4 sm:p-8">
        {/* ກາດ:
            rounded-2xl = ມຸມມົນ, border = ເສັ້ນຂອບ, bg-card = ສີພື້ນກາດ
            shadow-[...] = ເງົາສີທອງອ່ອນໆ ດ້ານຂວາ (ຄືແສງເຮືອງໃນຮູບ)
            relative = ໃຫ້ປຸ່ມ dark mode ວາງຕຳແໜ່ງອີງໃສ່ກາດນີ້ໄດ້ */}
        <div className="relative w-full max-w-md rounded-2xl border bg-card px-8 py-12 shadow-[12px_0_48px_-16px_rgba(217,176,122,0.35)]">
          {/* ປຸ່ມ dark mode ຢູ່ມຸມຂວາເທິງຂອງກາດ (absolute = ວາງຕາມຕຳແໜ່ງທີ່ກຳນົດ) */}
          <div className="absolute top-4 right-4">
            <ThemeToggle />
          </div>

          {/* ----- ໂລໂກ້ + ຫົວຂໍ້ ----- */}
          <div className="mb-8 flex flex-col items-center gap-4">
            {/* text-[#d9b07a] = ສີທອງ */}
            <CubeLogo className="size-16 text-[#d9b07a]" />
            <h1 className="text-3xl font-medium">Welcome back</h1>
          </div>

          {/* ----- ຟອມ Login ----- */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* ===== ຊ່ອງ Email ===== */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email address</Label>
              {/* relative = ໃຫ້ໄອຄອນວາງຊ້ອນຢູ່ໃນຊ່ອງພິມໄດ້ */}
              <div className="relative">
                {/* ໄອຄອນຊອງຈົດໝາຍ ວາງຢູ່ຊ້າຍໃນຊ່ອງ
                    absolute left-3 = ຫ່າງຊ້າຍ, top-1/2 -translate-y-1/2 = ຈັດກາງແນວຕັ້ງ */}
                <Mail className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  // h-11 = ສູງຂຶ້ນ, pl-10 = ເວັ້ນຊ້າຍໃຫ້ໄອຄອນ
                  className="h-11 pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
              <Link href="#" className="self-end text-sm text-[#c9a06a] hover:underline">
                Forgot password?
              </Link>
            </div>

            {/* ຂໍ້ຄວາມ error ສີແດງ (ສະແດງສະເພາະຕອນມີ error) */}
            {error && <p className="text-sm text-destructive">{error}</p>}

            {/* ===== ປຸ່ມ Login =====
                bg-linear-to-r from-[...] to-[...] = ພື້ນໄລ່ສີທອງ ຈາກຊ້າຍໄປຂວາ
                justify-between = ຂໍ້ຄວາມຢູ່ກາງ, ລູກສອນຢູ່ຂວາ */}
            <Button
              type="submit"
              className="relative h-11 w-full bg-linear-to-r from-[#e3bf8c] to-[#b98a57] text-base text-zinc-900 hover:opacity-90"
            >
              Login
              {/* ລູກສອນ ວາງຢູ່ຂວາສຸດຂອງປຸ່ມ */}
              <ArrowRight className="absolute right-4" />
            </Button>
          </form>

          {/* ----- ເສັ້ນແບ່ງ "or continue with" -----
              ເສັ້ນຊ້າຍ + ຂໍ້ຄວາມ + ເສັ້ນຂວາ (flex-1 = ໃຫ້ເສັ້ນຍືດເຕັມທີ່ເຫຼືອ) */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">or continue with</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* ----- ປຸ່ມ Google ແລະ GitHub (2 ຖັນ) ----- */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              className="h-11"
              onClick={() => handleSocialLogin("Google")}
            >
              <GoogleIcon />
              Google
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-11"
              onClick={() => handleSocialLogin("GitHub")}
            >
              <GitHubIcon />
              GitHub
            </Button>
          </div>

          {/* ----- ລິ້ງໄປໜ້າ Register ----- */}
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            {/* &apos; = ເຄື່ອງໝາຍ ' (ຕ້ອງຂຽນແບບນີ້ໃນ JSX) */}
            <Link href="/register" className="text-[#c9a06a] hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
