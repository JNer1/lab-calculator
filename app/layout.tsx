import { Noto_Sans_Mono } from "@next/font/google";
import "../styles/globals.css";

const notoSansMono = Noto_Sans_Mono({
  subsets: ["latin", "greek"],
  variable: "--font-noto-sans-mono",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${notoSansMono.variable} font-mono`}>{children}</body>
    </html>
  );
}
