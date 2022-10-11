import type { NextPage } from "next";
import Head from "next/head";
import AntibioticCalculator from "../components/AntibioticCalculator";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Navbar from "../components/Navbar";

const Antibiotic: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Antibiotic Calculator</title>
        <meta
          name="description"
          content="Calculator web app to for getting your needed concentrations."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <main className="flex min-h-screen w-full flex-col items-center justify-start p-4 lg:p-8">
        <AntibioticCalculator />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Antibiotic;
