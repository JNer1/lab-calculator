import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import AgarCalculator from "../components/AgarCalculator";
import Navbar from "../components/Navbar";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className="mx-auto max-w-5xl">
      <Head>
        <title>Lab Calculator</title>
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
        <AgarCalculator />
      </main>

      <footer className={styles.footer}>
        <p>Because we all forget how to compute</p>
      </footer>
    </div>
  );
};

export default Home;
