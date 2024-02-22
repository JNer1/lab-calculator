type ReleaseNotes = {
  version: string;
  features: string[];
};

export const releaseNotes: ReleaseNotes[] = [
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
