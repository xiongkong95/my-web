"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/lib/user";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (isLoggedIn()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAllowed(true);
    } else {
      router.replace("/login");
    }
  }, [router]);

  if (!allowed) return null;

  return <>{children}</>;
}
