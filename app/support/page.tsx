import { Metadata } from "next";
import Image from "next/image";
import Navbar from "../../components/Navbar";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Support Lab Calcultor by donating funds with GCash, Maya or any app that supports QR Ph",
};

const SupportPage = () => {
  return (
    <div>
      <Navbar />
      <main
        id="main-content"
        className="flex w-full flex-col items-center justify-start gap-4 p-4 lg:p-8"
      >
        <h1 className="text-3xl">QR Code</h1>
        <p className="text-sm text-lilac-300 md:text-lg">
          GCash, Maya or any that supports QR Ph
        </p>
        <Image
          src={"/gcash_qr.webp"}
          alt="image showing QR Ph QR Code"
          className="pt-4"
          priority
          width={400}
          height={400}
        />
      </main>
    </div>
  );
};

export default SupportPage;
