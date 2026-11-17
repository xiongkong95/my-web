"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function RegisterPage() {
  const router = useRouter();

  // ເກັບຄ່າທີ່ຜູ້ໃຊ້ພິມ
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // ບໍ່ໃຫ້ໜ້າເວັບ reload

    // 1. ກວດວ່າປ້ອນຄົບທຸກຊ່ອງບໍ່
    if (name === "" || email === "" || password === "" || confirmPassword === "") {
      setError("ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບທຸກຊ່ອງ");
      return;
    }

    // 2. ກວດຄວາມຍາວ Password
    if (password.length < 6) {
      setError("Password ຕ້ອງມີຢ່າງໜ້ອຍ 6 ຕົວອັກສອນ");
      return;
    }

    // 3. ກວດວ່າ Password ກັບ Confirm ກົງກັນບໍ່
    if (password !== confirmPassword) {
      setError("Password ແລະ Confirm password ບໍ່ກົງກັນ");
      return;
    }

    // ສຳເລັດ: ໄປໜ້າ Login
    setError("");
    alert("ລົງທະບຽນສຳເລັດ! ກະລຸນາ Login");
    router.push("/login");
  }

  return (
    <main className="flex flex-1 items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>ສ້າງບັນຊີໃໝ່</CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="ຊື່ຂອງເຈົ້າ"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

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

            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {/* ສະແດງ error ຖ້າມີ */}
            {error && <p className="text-sm text-destructive">{error}</p>}
          </CardContent>

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
