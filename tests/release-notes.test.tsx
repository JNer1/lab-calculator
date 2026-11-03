import "./dom";
import React from "react";
import assert from "node:assert/strict";
import { afterEach, mock, test } from "node:test";
import { act, cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ReleaseNotesDialog from "../components/ReleaseNotesDialog";
import { releaseNotes } from "../releaseNotes";
import { version } from "../package.json";

afterEach(() => {
  cleanup();
  mock.restoreAll();
  window.localStorage.clear();
});

test("release history stays closed until requested, marks updates seen on open, and can be reopened", async () => {
  const user = userEvent.setup();
  render(<ReleaseNotesDialog />);
  const trigger = screen.getByRole("button", { name: /What’s new/ });
  assert.match(trigger.textContent ?? "", /new updates/);
  assert.equal(screen.queryByRole("dialog"), null);
  assert.equal(window.localStorage.getItem("lastVersionSeen"), null);

  await user.click(trigger);
  const dialog = screen.getByRole("dialog", { name: "What’s new" });
  assert.equal(screen.queryByRole("alertdialog"), null);
  assert.equal(window.localStorage.getItem("lastVersionSeen"), version);
  assert.equal(dialog.parentElement, document.body); // Radix portal
  assert.deepEqual(
    screen
      .getAllByRole("heading", { level: 3 })
      .map((heading) => heading.textContent),
    releaseNotes.map((release) => `Version ${release.version}`),
  );
  assert.equal(
    document.getElementById(dialog.getAttribute("aria-describedby")!)
      ?.textContent,
    "Updates to Lab Calculator, newest first.",
  );

  await user.click(screen.getByRole("button", { name: "Close" }));
  assert.equal(screen.queryByRole("dialog"), null);
  assert.equal(document.activeElement, trigger);
  assert.doesNotMatch(trigger.textContent ?? "", /new updates/);
  await user.click(trigger);
  assert.ok(screen.getByRole("dialog"));
  await user.keyboard("{Escape}");
  assert.equal(screen.queryByRole("dialog"), null);
});

test("a previously seen release has no unread indicator and remains accessible", async () => {
  window.localStorage.setItem("lastVersionSeen", version);
  const user = userEvent.setup();
  render(<ReleaseNotesDialog />);
  const trigger = screen.getByRole("button", { name: "What’s new" });
  await user.click(trigger);
  assert.ok(screen.getByRole("dialog"));
});

test("another tab marking the current release seen updates the indicator", () => {
  window.localStorage.setItem("lastVersionSeen", "1.2.1");
  render(<ReleaseNotesDialog />);
  const trigger = screen.getByRole("button", { name: /new updates/ });
  act(() => {
    window.localStorage.setItem("lastVersionSeen", version);
    window.dispatchEvent(
      new window.StorageEvent("storage", {
        key: "lastVersionSeen",
        newValue: version,
      }),
    );
  });
  assert.doesNotMatch(trigger.textContent ?? "", /new updates/);
  assert.equal(screen.queryByRole("dialog"), null);
});

test("blocked storage still allows opening, dismissing, and remembering the visit in memory", async () => {
  const storagePrototype = Object.getPrototypeOf(window.localStorage);
  mock.method(storagePrototype, "getItem", () => {
    throw new Error("Storage blocked");
  });
  mock.method(storagePrototype, "setItem", () => {
    throw new Error("Storage blocked");
  });
  const user = userEvent.setup();
  render(<ReleaseNotesDialog />);
  const trigger = screen.getByRole("button", { name: /What’s new/ });
  await user.click(trigger);
  assert.ok(screen.getByRole("dialog"));
  await user.click(screen.getByRole("button", { name: "Close" }));
  assert.doesNotMatch(trigger.textContent ?? "", /new updates/);
  await user.click(trigger);
  assert.ok(screen.getByRole("dialog"));
});

test("empty release history renders safely", () => {
  const { container } = render(<ReleaseNotesDialog releases={[]} />);
  assert.equal(container.textContent, "");
  assert.equal(screen.queryByRole("button"), null);
});

test("the current release matches the package version and history is newest first", () => {
  assert.equal(releaseNotes[0].version, version);
  const versions = releaseNotes.map((release) => release.version);
  assert.deepEqual(
    versions,
    [...versions].sort((a, b) =>
      b.localeCompare(a, undefined, { numeric: true }),
    ),
  );
  assert.equal(new Set(versions).size, versions.length);
});
