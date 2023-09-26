import { Noto_Sans_Mono } from "next/font/google";
import "../styles/globals.css";

import DonationDialog from "../components/DonationDialog";

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
        <footer className="flex flex-col items-center justify-center gap-4 border-t border-lilac-700 p-8">
          <p>Because we all forget how to compute</p>
          <DonationDialog />
        </footer>
      </body>
    </html>
  );
}
