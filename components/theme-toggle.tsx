"use client";

import { useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

// ປຸ່ມສະຫຼັບ Light / Dark mode
// ວິທີເຮັດວຽກ: ເພີ່ມ ຫຼື ລຶບ class "dark" ຢູ່ແທັກ <html>
export function ThemeToggle() {
  // ເມື່ອເປີດໜ້າເວັບ: ອ່ານຄ່າທີ່ເຄີຍບັນທຶກໄວ້ໃນ localStorage
  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  function toggleTheme() {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label="ສະຫຼັບ dark mode"
    >
      {/* ໄອຄອນດວງຈັນສະແດງຕອນ light, ດວງຕາເວັນສະແດງຕອນ dark */}
      <Moon className="dark:hidden" />
      <Sun className="hidden dark:block" />
    </Button>
  );
}
