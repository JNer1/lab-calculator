import "../styles/globals.css";
import DonationDialog from "../components/DonationDialog";
import ReleaseNotesDialog from "../components/ReleaseNotesDialog";
import { GeistMono } from "geist/font";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lab Calculator",
  description:
    "Calculate medium quantities, agar concentrations, and antibiotic preparations.",
};

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
          <p className="text-center">Because we all forget how to compute</p>
          <ReleaseNotesDialog />
          <DonationDialog />
        </footer>
      </body>
    </html>
  );
}
