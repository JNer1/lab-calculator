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
        <meta name="author" content="Javier Ignatio Neri" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <main
        id="main-content"
        className="flex min-h-screen w-full flex-col items-center justify-start p-4 lg:p-8"
      >
        <AntibioticCalculator />
      </main>

      <footer className={styles.footer}>
        <p>Because we all forget how to compute</p>
      </footer>
    </div>
  );
};

export default Antibiotic;
