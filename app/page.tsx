"use client";

import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useEffect, useState } from "react";
import AgarCalculator from "../components/AgarCalculator";
import Navbar from "../components/Navbar";
import { releaseNotes } from "../releaseNotes";

const Home = () => {
  const [showReleaseNotes, setShowReleaseNotes] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const lastVersionSeen = localStorage.getItem("lastVersionSeen");

      if (lastVersionSeen !== releaseNotes.version) {
        setShowReleaseNotes(true);
      }
    }
  }, []);

  return (
    <>
      <Navbar />

      <main
        id="main-content"
        className="flex w-full flex-col items-center justify-start p-4 md:p-8"
      >
        <AgarCalculator />
      </main>
      <AlertDialog.Root open={showReleaseNotes}>
        <AlertDialog.Overlay className="full fixed inset-0 w-full bg-black/50" />

        <AlertDialog.Content className="fixed left-1/2 top-1/2 w-11/12 max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded bg-lilac-900 p-4">
          <AlertDialog.Title className="pb-4 text-3xl ">
            Version 1.1.0
          </AlertDialog.Title>

          <AlertDialog.Description asChild>
            <div className="flex flex-col gap-2">
              <p className="text-sm md:text-base">
                {true}
                Thank you to{" "}
                <span className="text-rose">Katherina Resente</span> for your
                continued support
              </p>
              <h3 className="pt-4 text-lg text-teal-100">What&apos;s new?</h3>
              <ul className="flex flex-col gap-2 text-sm md:text-base">
                {releaseNotes.features.map((feat, idx) => (
                  <li key={idx}>{`- ${feat}`}</li>
                ))}
              </ul>
            </div>
          </AlertDialog.Description>

          <div className="flex justify-center pt-16">
            <AlertDialog.Cancel
              asChild
              className="rounded-md bg-lilac-700 px-8 py-2 font-semibold hover:bg-teal-200 hover:text-lilac-900 focus:bg-teal-200 focus:text-lilac-900"
            >
              <button
                onClick={() => {
                  setShowReleaseNotes(false);
                  localStorage.setItem("lastVersionSeen", releaseNotes.version);
                }}
              >
                Close
              </button>
            </AlertDialog.Cancel>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default Home;
