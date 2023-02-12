"use client";

import Head from "next/head";
import AgarCalculator from "../components/AgarCalculator";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />

      <main
        id="main-content"
        className="flex min-h-screen w-full flex-col items-center justify-start p-4 lg:p-8"
      >
        <AgarCalculator />
      </main>

      <footer className="border-t border-lilac-700 p-8 text-center">
        <p>Because we all forget how to compute</p>
      </footer>
    </>
  );
};

export default Home;
