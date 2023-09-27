"use client";

import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useState } from "react";
import Link from "next/link";
import GlobeSvg from "./GlobeSvg";
import HeartSvg from "./HeartSvg";

const DonationDialog = () => {
  const [showDonationDialog, setShowDonationDialog] = useState(false);

  return (
    <AlertDialog.Root open={showDonationDialog}>
      <AlertDialog.Trigger asChild>
        <button
          className="w-fit text-rose/50 transition-colors  duration-150 hover:text-rose focus:text-rose"
          onClick={() => {
            setShowDonationDialog(true);
          }}
        >
          <div className="flex items-center justify-center gap-2">
            <HeartSvg />
            <span>Support Me Here</span>
          </div>
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Overlay className="full fixed inset-0 w-full bg-black/50" />

      <AlertDialog.Content
        className="fixed left-1/2  top-1/2 w-11/12  max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded bg-lilac-900 p-4 text-lilac-100 md:p-8 "
        onEscapeKeyDown={() => {
          setShowDonationDialog(false);
        }}
      >
        <AlertDialog.Title className="pb-8 text-xl md:text-3xl">
          Where are you from?
        </AlertDialog.Title>

        <AlertDialog.Description asChild>
          <div className="flex w-full justify-around gap-4 text-sm text-rose md:text-base">
            <Link
              href={"/support"}
              className={
                "flex w-1/2 flex-col items-center justify-center gap-4 bg-lilac-700 p-4 hover:bg-lilac-500 md:py-8"
              }
              onClick={() => {
                setShowDonationDialog(false);
              }}
            >
              <span className="h-3/4 text-4xl">PH</span>
              <span>Philippines</span>
            </Link>
            <a
              href="https://ko-fi.com/javierneri"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-1/2 flex-col items-center justify-center gap-4 bg-lilac-700 p-4 transition-colors duration-150 hover:bg-lilac-500  md:py-8"
            >
              <div className="flex h-3/4 items-center justify-center">
                <GlobeSvg width="2.25rem" height="2.25rem" />
              </div>
              <span>International</span>
            </a>
          </div>
        </AlertDialog.Description>

        <div className="flex justify-center pt-16">
          <AlertDialog.Cancel
            asChild
            className="rounded-md bg-lilac-700 px-8 py-2 font-semibold hover:bg-teal-200 hover:text-lilac-900 focus:bg-teal-200 focus:text-lilac-900"
          >
            <button
              onClick={() => {
                setShowDonationDialog(false);
              }}
            >
              Cancel
            </button>
          </AlertDialog.Cancel>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DonationDialog;
