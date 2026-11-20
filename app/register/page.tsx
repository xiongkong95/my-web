"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthShell } from "@/components/auth-shell";
import { GoogleButton } from "@/components/google-button";
import { isValidEmail, normalizeEmail } from "@/lib/email";
import { saveUser } from "@/lib/user";
import { useLanguage } from "@/components/language-provider";

const iconClass = "absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground";
const eyeButtonClass =
  "absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground";

export default function RegisterPage() {
  const router = useRouter();
  const { t } = useLanguage();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (name === "" || email === "" || password === "" || confirmPassword === "") {
      setError(t.register.errEmpty);
      return;
    }

    if (!isValidEmail(email)) {
      setError(t.fields.errEmailInvalid);
      return;
    }

    if (password.length < 6) {
      setError(t.register.errPasswordShort);
      return;
    }

    if (password !== confirmPassword) {
      setError(t.register.errMismatch);
      return;
    }

    setError("");
    saveUser({ name: name, email: normalizeEmail(email), password: password });
    alert(t.register.success);
    router.push("/login");
  }

  return (
    <AuthShell title={t.register.title}>
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

        <div className="flex flex-col gap-2">
          <Label htmlFor="name">{t.fields.name}</Label>
          <div className="relative">
            <User className={iconClass} />
            <Input
              id="name"
              placeholder={t.fields.namePlaceholder}
              className="h-11 pl-10"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="email">{t.fields.email}</Label>
          <div className="relative">
            <Mail className={iconClass} />
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
            <Lock className={iconClass} />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder={t.fields.passwordMinPlaceholder}
              className="h-11 pr-10 pl-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={eyeButtonClass}
              aria-label={showPassword ? t.fields.hidePassword : t.fields.showPassword}
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="confirmPassword">{t.fields.confirmPassword}</Label>
          <div className="relative">
            <Lock className={iconClass} />
            <Input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder={t.fields.confirmPlaceholder}
              className="h-11 pr-10 pl-10"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={eyeButtonClass}
              aria-label={showPassword ? t.fields.hidePassword : t.fields.showPassword}
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <Button
          type="submit"
          className="relative h-11 w-full bg-linear-to-r from-primary to-primary/75 text-base hover:opacity-90"
        >
          {t.register.submit}
          <ArrowRight className="absolute right-4" />
        </Button>
      </form>

      <GoogleButton />

      <p className="mt-8 text-center text-sm text-muted-foreground">
        {t.register.haveAccount}{" "}
        <Link href="/login" className="text-primary hover:underline">
          {t.register.login}
        </Link>
      </p>
    </AuthShell>
  );
}
