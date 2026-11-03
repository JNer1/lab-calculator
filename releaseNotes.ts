import { version } from "./package.json";

export type ReleaseNote = {
  version: string;
  features: string[];
};

// Keep releases newest first. The current release uses package.json's version.
export const releaseNotes: readonly ReleaseNote[] = [
  {
    version,
    features: [
      "Invalid inputs now show helpful errors instead of producing misleading results.",
      "Small quantities use appropriate units so nonzero amounts stay visible.",
      "Activity-based antibiotic powders now require product potency.",
      "Preparation guidance is shorter and clearer.",
      "Release history is available from What’s new on every page.",
    ],
  },
  {
    version: "1.2.1",
    features: [
      "Inputs are now wider to be easier to click",
      "Now using Geist Mono font",
      "Centered footer text",
    ],
  },
  {
    version: "1.2.0",
    features: ["You can now support Lab Calculator with donations"],
  },
  {
    version: "1.1.0",
    features: [
      "You can now input your desired agar powder percentage",
      "Calculations are now done with more precision, ensuring more accurate answers",
      "Contrast between the shades of lilac are improved for better readability",
    ],
  },
];
