import "../styles/globals.css";
import DonationDialog from "../components/DonationDialog";
import { GeistMono } from "geist/font";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${GeistMono.variable} bg-lilac-900 font-mono text-white`}
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
