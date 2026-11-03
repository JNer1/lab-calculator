"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useState, useSyncExternalStore } from "react";
import { releaseNotes, type ReleaseNote } from "../releaseNotes";

const storageKey = "lastVersionSeen";

function subscribeToStorage(onChange: () => void) {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

function getLastVersionSeen() {
  try {
    return window.localStorage.getItem(storageKey);
  } catch {
    return null;
  }
}

const getServerVersion = () => undefined;

export default function ReleaseNotesDialog({
  releases = releaseNotes,
}: {
  releases?: readonly ReleaseNote[];
}) {
  const [open, setOpen] = useState(false);
  const [seenVersion, setSeenVersion] = useState<string | null>(null);
  const lastVersionSeen = useSyncExternalStore(
    subscribeToStorage,
    getLastVersionSeen,
    getServerVersion,
  );
  const latest = releases[0];

  if (!latest) return null;

  const hasUnread =
    lastVersionSeen !== undefined &&
    lastVersionSeen !== latest.version &&
    seenVersion !== latest.version;

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (nextOpen) {
      // Remember this visit even when the browser blocks persistent storage.
      setSeenVersion(latest.version);
      try {
        window.localStorage.setItem(storageKey, latest.version);
      } catch {
        // Reading release notes must remain available without local storage.
      }
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-sm text-sm text-lilac-100 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-200"
        >
          What’s new
          {hasUnread && (
            <>
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full bg-teal-200"
              />
              <span className="sr-only"> (new updates)</span>
            </>
          )}
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-50 flex max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 flex-col rounded-md bg-lilac-900 p-4 shadow-xl md:p-6">
          <div className="flex shrink-0 items-start justify-between gap-4">
            <Dialog.Title className="text-2xl font-bold">
              What’s new
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                className="rounded-md bg-lilac-700 px-4 py-2 text-sm font-semibold hover:bg-teal-200 hover:text-lilac-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-200"
              >
                Close
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Description className="mt-2 shrink-0 text-sm text-lilac-100">
            Updates to Lab Calculator, newest first.
          </Dialog.Description>
          <div
            role="region"
            aria-label="Release history"
            tabIndex={0}
            className="mt-6 min-h-0 overflow-y-auto overscroll-contain pr-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-200"
          >
            <div className="flex flex-col gap-6">
              {releases.map((release) => (
                <section
                  key={release.version}
                  aria-label={`Version ${release.version}`}
                >
                  <h3 className="mb-2 text-lg font-semibold text-teal-100">
                    Version {release.version}
                  </h3>
                  <ul className="list-disc space-y-2 pl-5 text-sm">
                    {release.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
            <p className="mt-6 text-sm text-lilac-100">
              Thank you to <span className="text-rose">Katherina Resente</span>{" "}
              for your continued support.
            </p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
