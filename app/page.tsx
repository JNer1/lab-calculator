import { Metadata } from "next";
import AgarCalculator from "../components/AgarCalculator";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "Lab Calculator",
  description: "Web app to calculate your agar media recipe",
};

const Home = () => {
  return (
    <>
      <Navbar />

      <main
        id="main-content"
        className="flex w-full flex-col items-center justify-start p-4 md:p-8"
      >
        <AgarCalculator />
      </main>
    </>
  );
};

export default Home;
