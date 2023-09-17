import { Noto_Sans_Mono } from "next/font/google";
import "../styles/globals.css";

const notoSansMono = Noto_Sans_Mono({
  subsets: ["latin", "greek"],
  variable: "--font-noto-sans-mono",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${notoSansMono.variable} bg-lilac-900 font-mono text-white`}
      >
        {children}
      </body>
    </html>
  );
}
