// =====================================================================
// ໜ້າ Register (URL: /register)
// ---------------------------------------------------------------------
// ໜ້າທີ່: ໃຫ້ຜູ້ໃຊ້ສ້າງບັນຊີໃໝ່ ໂດຍປ້ອນ Name, Email, Password, Confirm password
// ມີການກວດຂໍ້ມູນ (validation) 3 ຢ່າງ ກ່ອນສົ່ງ
// ໝາຍເຫດ: ບໍ່ໄດ້ບັນທຶກຂໍ້ມູນແທ້ (ບໍ່ມີ database), ເປັນການຈຳລອງເທົ່ານັ້ນ
// =====================================================================

// "use client" = ໄຟລ໌ນີ້ເຮັດວຽກໃນ browser (ຕ້ອງໃຊ້ເພາະມີ useState ແລະ onSubmit)
"use client";

// ---------- ສ່ວນ import ----------
import { useState } from "react"; // ເກັບຂໍ້ມູນທີ່ປ່ຽນແປງໄດ້
import Link from "next/link"; // ລິ້ງໄປໜ້າອື່ນ
import { useRouter } from "next/navigation"; // ສັ່ງປ່ຽນໜ້າດ້ວຍ code
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/theme-toggle"; // ປຸ່ມ dark mode
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// ---------- Component ຫຼັກຂອງໜ້າ ----------
export default function RegisterPage() {
  const router = useRouter(); // ໃຊ້ປ່ຽນໜ້າ

  // ---------- State: ເກັບຄ່າຂອງແຕ່ລະຊ່ອງ ----------
  const [name, setName] = useState(""); // ຊື່
  const [email, setEmail] = useState(""); // ອີເມວ
  const [password, setPassword] = useState(""); // ລະຫັດຜ່ານ
  const [confirmPassword, setConfirmPassword] = useState(""); // ຢືນຢັນລະຫັດຜ່ານ
  const [error, setError] = useState(""); // ຂໍ້ຄວາມ error (ວ່າງ = ບໍ່ມີ error)

  // ---------- ຟັງຊັນທີ່ເຮັດວຽກເມື່ອກົດປຸ່ມ Register ----------
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // ຫ້າມບໍ່ໃຫ້ form reload ໜ້າເວັບ

    // ກວດຂໍ້ມູນເທື່ອລະຂັ້ນ: ຖ້າຜິດຂັ້ນໃດ ໃຫ້ສະແດງ error ແລ້ວ return (ຢຸດ) ທັນທີ

    // ຂັ້ນ 1: ກວດວ່າປ້ອນຄົບທຸກຊ່ອງບໍ່ ("||" = "ຫຼື")
    if (name === "" || email === "" || password === "" || confirmPassword === "") {
      setError("ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບທຸກຊ່ອງ");
      return;
    }

    // ຂັ້ນ 2: ກວດຄວາມຍາວ Password (.length = ຈຳນວນຕົວອັກສອນ)
    if (password.length < 6) {
      setError("Password ຕ້ອງມີຢ່າງໜ້ອຍ 6 ຕົວອັກສອນ");
      return;
    }

    // ຂັ້ນ 3: ກວດວ່າ Password ກັບ Confirm ກົງກັນບໍ່ ("!==" = "ບໍ່ເທົ່າກັບ")
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
    // ຈັດກາດໄວ້ກາງໜ້າຈໍ
    <main className="flex flex-1 items-center justify-center p-4">
      {/* ປຸ່ມ dark mode ຕິດຢູ່ມຸມຂວາເທິງຂອງໜ້າຈໍ
          fixed = ຢູ່ກັບທີ່ ເຖິງວ່າຈະເລື່ອນໜ້າຈໍ, top-4 right-4 = ຫ່າງຈາກຂອບເທິງ/ຂວາ */}
      <div className="fixed top-4 right-4">
        <ThemeToggle />
      </div>

      <Card className="w-full max-w-sm">
        {/* ສ່ວນຫົວຂອງກາດ */}
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>ສ້າງບັນຊີໃໝ່</CardDescription>
        </CardHeader>

        {/* form: ກົດປຸ່ມ submit ແລ້ວຈະເອີ້ນ handleSubmit */}
        <form onSubmit={handleSubmit}>
          <CardContent className="flex flex-col gap-4">
            {/* ທຸກຊ່ອງມີຮູບແບບດຽວກັນ:
                - Label = ປ້າຍຊື່ (htmlFor ຕ້ອງກົງກັບ id ຂອງ Input)
                - Input = ຊ່ອງພິມ, value ເອົາຈາກ state, onChange ອັບເດດ state ທຸກເທື່ອທີ່ພິມ */}

            {/* ----- ຊ່ອງ Name ----- */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="ຊື່ຂອງເຈົ້າ"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* ----- ຊ່ອງ Email ----- */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* ----- ຊ່ອງ Password ----- */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password" // ເຊື່ອງຕົວອັກສອນເປັນ ●●●
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* ----- ຊ່ອງ Confirm password ----- */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {/* ສະແດງ error ສີແດງ ສະເພາະຕອນທີ່ error ບໍ່ວ່າງ */}
            {error && <p className="text-sm text-destructive">{error}</p>}
          </CardContent>

          {/* ສ່ວນລຸ່ມ: ປຸ່ມ Register + ລິ້ງກັບໄປ Login */}
          <CardFooter className="mt-6 flex flex-col gap-3">
            <Button type="submit" className="w-full">
              Register
            </Button>
            <p className="text-sm text-muted-foreground">
              ມີບັນຊີແລ້ວ?{" "}
              <Link href="/login" className="text-primary underline">
                Login
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}
