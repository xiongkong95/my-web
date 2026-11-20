import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Lao } from "next/font/google";
import { LanguageProvider } from "@/components/language-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const notoSansLao = Noto_Sans_Lao({
  variable: "--font-noto-sans-lao",
  subsets: ["lao"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Moora Auto Service",
  description: "Moora Auto Service: car showroom dashboard (Login, Register, Dashboard)",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="lo"
      className={`${geistSans.variable} ${notoSansLao.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
