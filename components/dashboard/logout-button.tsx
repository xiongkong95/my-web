"use client";

import { useRouter } from "next/navigation";
import { logout } from "@/lib/user";
import { useLanguage } from "@/components/language-provider";

type LogoutButtonProps = {
  className?: string;
  children: React.ReactNode;
};

export function LogoutButton({ className, children }: LogoutButtonProps) {
  const router = useRouter();
  const { t } = useLanguage();

  function handleLogout() {
    logout();
    router.push("/login");
  }

  return (
    <button type="button" onClick={handleLogout} className={className} aria-label={t.menu.logout}>
      {children}
    </button>
  );
}
