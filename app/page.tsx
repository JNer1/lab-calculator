"use client";

import * as AlertDialog from "@radix-ui/react-alert-dialog";
import AgarCalculator from "../components/AgarCalculator";
import Navbar from "../components/Navbar";
import { releaseNotes } from "../releaseNotes";

const Home = () => {
  const lastVersionSeen = localStorage.getItem("lastVersionSeen");

  return (
    <>
      <Navbar />

      <main
        id="main-content"
        className="flex min-h-screen w-full flex-col items-center justify-start p-4 lg:p-8"
      >
        <AgarCalculator />
      </main>
      <AlertDialog.Root defaultOpen={lastVersionSeen !== releaseNotes.version}>
        <AlertDialog.Overlay className="full fixed inset-0 w-full bg-black/50" />

        <AlertDialog.Content className="fixed left-1/2 top-1/2 w-4/5 max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded bg-lilac-900 p-8">
          <AlertDialog.Title className="pb-4 text-3xl ">
            Version 1.1.0
          </AlertDialog.Title>

          <AlertDialog.Description asChild>
            <div className="flex flex-col gap-2">
              <p>
                Thank you to{" "}
                <span className="text-rose">Katherina Resente</span> for your
                continued support
              </p>
              <h3 className="text-lg text-teal-100">Features</h3>
              <ul>
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
                  localStorage.setItem("lastVersionSeen", releaseNotes.version);
                }}
              >
                Close
              </button>
            </AlertDialog.Cancel>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <footer className="border-t border-lilac-700 p-8 text-center">
        <p>Because we all forget how to compute</p>
      </footer>
    </>
  );
};

export default Home;
