"use client";

import AntibioticCalculator from "../../components/AntibioticCalculator";
import Navbar from "../../components/Navbar";

const Antibiotic = () => {
  return (
    <div>
      <Navbar />
      <main
        id="main-content"
        className="flex min-h-screen w-full flex-col items-center justify-start p-4 md:p-8"
      >
        <AntibioticCalculator />
      </main>
    </div>
  );
};

export default Antibiotic;
