"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthShell } from "@/components/auth-shell";
import { GoogleButton } from "@/components/google-button";
import { isValidEmail, normalizeEmail } from "@/lib/email";
import { loadUser, setLoggedIn } from "@/lib/user";
import { useLanguage } from "@/components/language-provider";

export default function LoginPage() {
  const router = useRouter();
  const { t } = useLanguage();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (email === "" || password === "") {
      setError(t.login.errEmpty);
      return;
    }

    if (!isValidEmail(email)) {
      setError(t.fields.errEmailInvalid);
      return;
    }

    const user = loadUser();
    if (user === null) {
      setError(t.login.errNoAccount);
      return;
    }

    const sameEmail = normalizeEmail(email) === user.email;
    if (!sameEmail || password !== user.password) {
      setError(t.login.errWrong);
      return;
    }

    setError("");
    setLoggedIn();
    router.push("/dashboard");
  }

  return (
    <AuthShell title={t.login.title}>
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">{t.fields.email}</Label>
          <div className="relative">
            <Mail className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder={t.fields.emailPlaceholder}
              className="h-11 pl-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="password">{t.fields.password}</Label>
          <div className="relative">
            <Lock className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder={t.fields.passwordPlaceholder}
              className="h-11 pr-10 pl-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label={showPassword ? t.fields.hidePassword : t.fields.showPassword}
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>

          <Link href="#" className="self-end text-sm text-primary hover:underline">
            {t.login.forgot}
          </Link>
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <Button
          type="submit"
          className="relative h-11 w-full bg-linear-to-r from-primary to-primary/75 text-base hover:opacity-90"
        >
          {t.login.submit}
          <ArrowRight className="absolute right-4" />
        </Button>
      </form>

      <GoogleButton />

      <p className="mt-8 text-center text-sm text-muted-foreground">
        {t.login.noAccount}{" "}
        <Link href="/register" className="text-primary hover:underline">
          {t.login.signUp}
        </Link>
      </p>
    </AuthShell>
  );
}
