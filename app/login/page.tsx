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

export default function LoginPage() {
  const router = useRouter();

  // ເກັບຄ່າທີ່ຜູ້ໃຊ້ພິມ
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // ບໍ່ໃຫ້ໜ້າເວັບ reload

    // ກວດວ່າປ້ອນຄົບບໍ່
    if (email === "" || password === "") {
      setError("ກະລຸນາປ້ອນ Email ແລະ Password");
      return;
    }

    // ຈຳລອງການ login ສຳເລັດ (ບໍ່ມີ server ແທ້) ແລ້ວໄປໜ້າ Dashboard
    setError("");
    router.push("/dashboard");
  }

  return (
    <main className="flex flex-1 items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>ປ້ອນ Email ແລະ Password ເພື່ອເຂົ້າສູ່ລະບົບ</CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="flex flex-col gap-4">
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

            {/* ສະແດງ error ຖ້າມີ */}
            {error && <p className="text-sm text-destructive">{error}</p>}
          </CardContent>

          <CardFooter className="mt-6 flex flex-col gap-3">
            <Button type="submit" className="w-full">
              Login
            </Button>
            <p className="text-sm text-muted-foreground">
              ຍັງບໍ່ມີບັນຊີ?{" "}
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
