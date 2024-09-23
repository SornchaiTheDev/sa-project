import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import { Toaster } from "~/components/ui/sonner";

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "KU Jobs Finder",
  description: "เว็บไซต์สำหรับค้นหางานของนิสิตและบุคลากรมหาวิทยาลัยเกษตรศาสตร์",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${kanit.className} antialiased`}>
        {children}
        <Toaster position="top-right" className={`${kanit.className} toaster group`} />
      </body>
    </html>
  );
}
