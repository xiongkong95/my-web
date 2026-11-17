// =====================================================================
// Root Layout (ໂຄງຮ່າງຫຼັກຂອງທຸກໜ້າ)
// ---------------------------------------------------------------------
// ໄຟລ໌ນີ້ຫໍ່ຫຸ້ມທຸກໜ້າໃນເວັບ (Login, Register, Dashboard)
// ສິ່ງທີ່ໃສ່ໃນນີ້ ຈະສະແດງທຸກໜ້າ ເຊັ່ນ: font, ສີພື້ນຫຼັງ
// =====================================================================

// ---------- ສ່ວນ import ----------
import type { Metadata } from "next"; // ປະເພດຂໍ້ມູນສຳລັບ metadata (title ຂອງແທັບ browser)
import { Geist, Geist_Mono } from "next/font/google"; // ໂຫຼດ font ຈາກ Google Fonts
import "./globals.css"; // ໄຟລ໌ CSS ຫຼັກ (ມີສີ theme ຢູ່ໃນນີ້)

// ---------- ຕັ້ງຄ່າ font ----------
// variable = ຊື່ CSS variable ທີ່ຈະໃຊ້ອ້າງເຖິງ font ນີ້ໃນ globals.css
const geistSans = Geist({
  variable: "--font-geist-sans", // font ປົກກະຕິ
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono", // font ສຳລັບ code (ຕົວອັກສອນກວ້າງເທົ່າກັນ)
  subsets: ["latin"],
});

// ---------- Metadata ----------
// title = ຊື່ທີ່ສະແດງຢູ່ແທັບ browser, description = ຄຳອະທິບາຍເວັບ (ໃຊ້ໃນ Google)
export const metadata: Metadata = {
  title: "My Web",
  description: "Login, Register and Dashboard with shadcn/ui",
};

// ---------- Component Layout ----------
// children = ເນື້ອໃນຂອງແຕ່ລະໜ້າ (ເຊັ່ນ ໜ້າ Login) ທີ່ຈະຖືກໃສ່ເຂົ້າມາບ່ອນນີ້
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // <html>: ໃສ່ class ຂອງ font ໄວ້ ເພື່ອໃຫ້ທຸກໜ້າໃຊ້ font ນີ້
    // h-full = ສູງເຕັມຈໍ, antialiased = ເຮັດໃຫ້ຕົວໜັງສືລຽບງາມ
    // ປຸ່ມ dark mode ຈະເພີ່ມ class "dark" ໃສ່ແທັກນີ້
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* bg-muted/40 = ພື້ນຫຼັງສີເທົາອ່ອນໆ (ຄວາມເຂັ້ມ 40%) ໃຫ້ກາດສີຂາວເດັ່ນຂຶ້ນ */}
      <body className="min-h-full flex flex-col bg-muted/40">
        {/* ເນື້ອໃນຂອງໜ້າປັດຈຸບັນ
            (ປຸ່ມ dark mode ຢູ່ໃນແຕ່ລະໜ້າເອງ ເພາະແຕ່ລະໜ້າວາງຕຳແໜ່ງຕ່າງກັນ) */}
        {children}
      </body>
    </html>
  );
}
