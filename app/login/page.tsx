// =====================================================================
// ໜ້າ Login (URL: /login)
// ---------------------------------------------------------------------
// ໜ້າທີ່: ໃຫ້ຜູ້ໃຊ້ປ້ອນ Email + Password ແລ້ວກົດ Login ເພື່ອເຂົ້າ Dashboard
// ໝາຍເຫດ: ນີ້ແມ່ນການ "ຈຳລອງ" ເທົ່ານັ້ນ, ບໍ່ໄດ້ກວດກັບ server ຫຼື database ແທ້
// =====================================================================

// "use client" = ບອກ Next.js ວ່າໄຟລ໌ນີ້ເຮັດວຽກຢູ່ຝັ່ງ browser (Client Component)
// ຕ້ອງໃສ່ເພາະເຮົາໃຊ້ useState, onClick, onSubmit ເຊິ່ງເຮັດວຽກໄດ້ສະເພາະໃນ browser
"use client";

// ---------- ສ່ວນ import: ດຶງເຄື່ອງມືທີ່ຕ້ອງໃຊ້ເຂົ້າມາ ----------
import { useState } from "react"; // useState = ໃຊ້ເກັບຂໍ້ມູນທີ່ປ່ຽນແປງໄດ້ (state)
import Link from "next/link"; // Link = ລິ້ງໄປໜ້າອື່ນ ໂດຍບໍ່ຕ້ອງ reload ໜ້າເວັບ
import { useRouter } from "next/navigation"; // useRouter = ໃຊ້ສັ່ງປ່ຽນໜ້າດ້ວຍ code
import { Button } from "@/components/ui/button"; // ປຸ່ມຈາກ shadcn
import { Input } from "@/components/ui/input"; // ຊ່ອງພິມຂໍ້ຄວາມຈາກ shadcn
import { Label } from "@/components/ui/label"; // ປ້າຍຊື່ຂອງຊ່ອງພິມຈາກ shadcn
import {
  Card, // ກ່ອງກາດຫຼັກ
  CardContent, // ສ່ວນເນື້ອໃນຂອງກາດ
  CardDescription, // ຂໍ້ຄວາມອະທິບາຍໃຕ້ຫົວຂໍ້
  CardFooter, // ສ່ວນລຸ່ມຂອງກາດ
  CardHeader, // ສ່ວນຫົວຂອງກາດ
  CardTitle, // ຫົວຂໍ້ຂອງກາດ
} from "@/components/ui/card";

// ---------- Component ຫຼັກຂອງໜ້າ ----------
// "export default" = ສົ່ງ component ນີ້ອອກໄປ ໃຫ້ Next.js ເອົາໄປສະແດງເປັນໜ້າ /login
export default function LoginPage() {
  // router ໃຊ້ສຳລັບປ່ຽນໜ້າ ເຊັ່ນ router.push("/dashboard")
  const router = useRouter();

  // ---------- State: ຕົວແປທີ່ເກັບຄ່າ ແລະເມື່ອປ່ຽນ ໜ້າຈໍຈະອັບເດດເອງ ----------
  // ຮູບແບບ: const [ຄ່າປັດຈຸບັນ, ຟັງຊັນສຳລັບປ່ຽນຄ່າ] = useState(ຄ່າເລີ່ມຕົ້ນ);
  const [email, setEmail] = useState(""); // ເກັບ Email ທີ່ຜູ້ໃຊ້ພິມ
  const [password, setPassword] = useState(""); // ເກັບ Password ທີ່ຜູ້ໃຊ້ພິມ
  const [error, setError] = useState(""); // ເກັບຂໍ້ຄວາມ error (ຖ້າວ່າງ = ບໍ່ມີ error)

  // ---------- ຟັງຊັນທີ່ເຮັດວຽກເມື່ອກົດປຸ່ມ Login ----------
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    // ປົກກະຕິ form ຈະ reload ໜ້າເວັບເມື່ອກົດສົ່ງ, ຄຳສັ່ງນີ້ຫ້າມບໍ່ໃຫ້ reload
    e.preventDefault();

    // ກວດວ່າປ້ອນຄົບບໍ່: ຖ້າຊ່ອງໃດຊ່ອງໜຶ່ງວ່າງ ໃຫ້ສະແດງ error ແລ້ວຢຸດ (return)
    // "||" ແປວ່າ "ຫຼື"
    if (email === "" || password === "") {
      setError("ກະລຸນາປ້ອນ Email ແລະ Password");
      return; // return = ອອກຈາກຟັງຊັນທັນທີ, code ຂ້າງລຸ່ມຈະບໍ່ເຮັດວຽກ
    }

    // ຖ້າມາຮອດນີ້ = ປ້ອນຄົບແລ້ວ
    setError(""); // ລ້າງ error ອອກ
    router.push("/dashboard"); // ໄປໜ້າ Dashboard
  }

  // ---------- ສ່ວນສະແດງຜົນ (JSX): ໜ້າຕາຂອງໜ້າເວັບ ----------
  // JSX ຄ້າຍກັບ HTML ແຕ່ຂຽນໃນ JavaScript ໄດ້, ໃຊ້ className ແທນ class
  // class ແບບ "flex", "p-4", "gap-2" ແມ່ນຂອງ Tailwind CSS (ໃຊ້ຈັດຮູບແບບ)
  return (
    // <main>: ກ່ອງໃຫຍ່ທີ່ຈັດໃຫ້ກາດຢູ່ກາງໜ້າຈໍ
    // flex-1 = ຂະຫຍາຍເຕັມພື້ນທີ່, items-center/justify-center = ຈັດໄວ້ກາງ, p-4 = ໄລຍະຫ່າງຂອບ
    <main className="flex flex-1 items-center justify-center p-4">
      {/* w-full max-w-sm = ກວ້າງເຕັມ ແຕ່ບໍ່ເກີນຂະໜາດນ້ອຍ (sm) */}
      <Card className="w-full max-w-sm">
        {/* ສ່ວນຫົວ: ຫົວຂໍ້ + ຄຳອະທິບາຍ */}
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>ປ້ອນ Email ແລະ Password ເພື່ອເຂົ້າສູ່ລະບົບ</CardDescription>
        </CardHeader>

        {/* <form>: ເມື່ອກົດປຸ່ມ type="submit" ຈະເອີ້ນຟັງຊັນ handleSubmit */}
        <form onSubmit={handleSubmit}>
          {/* ສ່ວນເນື້ອໃນ: ຊ່ອງປ້ອນຂໍ້ມູນ, flex-col = ລຽງລົງລຸ່ມ, gap-4 = ຫ່າງກັນ */}
          <CardContent className="flex flex-col gap-4">
            {/* ----- ຊ່ອງ Email ----- */}
            <div className="flex flex-col gap-2">
              {/* htmlFor="email" ເຊື່ອມກັບ Input ທີ່ມີ id="email" (ກົດປ້າຍແລ້ວ cursor ໄປຊ່ອງ) */}
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email" // ປະເພດ email: ມືຖືຈະສະແດງແປ້ນພິມທີ່ມີ @
                placeholder="you@example.com" // ຂໍ້ຄວາມຕົວຢ່າງສີຈາງໃນຊ່ອງ
                value={email} // ຄ່າໃນຊ່ອງ ເອົາມາຈາກ state email
                // onChange: ທຸກເທື່ອທີ່ພິມ ໃຫ້ເອົາຄ່າໃໝ່ (e.target.value) ໄປເກັບໃນ state
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* ----- ຊ່ອງ Password ----- */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password" // ປະເພດ password: ຈະສະແດງເປັນຈ້ຳໆ ●●● ບໍ່ໃຫ້ເຫັນຕົວອັກສອນ
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* ----- ຂໍ້ຄວາມ error -----
                {error && ...} ແປວ່າ: ຖ້າ error ບໍ່ວ່າງ ຈຶ່ງສະແດງ <p> ນີ້
                text-destructive = ສີແດງ (ສີສຳລັບແຈ້ງເຕືອນ) */}
            {error && <p className="text-sm text-destructive">{error}</p>}
          </CardContent>

          {/* ສ່ວນລຸ່ມ: ປຸ່ມ Login + ລິ້ງໄປໜ້າ Register */}
          <CardFooter className="mt-6 flex flex-col gap-3">
            {/* type="submit" = ກົດແລ້ວຈະສົ່ງ form (ເອີ້ນ handleSubmit) */}
            <Button type="submit" className="w-full">
              Login
            </Button>
            <p className="text-sm text-muted-foreground">
              ຍັງບໍ່ມີບັນຊີ?{" "}
              {/* {" "} = ໃສ່ຍະຫວ່າງ 1 ຕົວ ລະຫວ່າງຂໍ້ຄວາມກັບລິ້ງ */}
              <Link href="/register" className="text-primary underline">
                Register
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}
