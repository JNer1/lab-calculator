# Lab Calculator

<p align="center">
  Your companion for media preparation in the laboratory
</p>

<div align="center">
  <img width="50%" alt="image showing the agar calculator" src="https://github.com/user-attachments/assets/01183c2e-1d4a-48d1-aef5-a09ce2bf94c6" />
</div>

We all had that time in the lab where forgot how to compute how much agar to put or what amount of antibiotic to add for stock solutions.
Other times, it can just be out of laziness.

Lab calculator is here to make that as easy as possible, so now all you have to worry about is contamination instead of computation.

## Antibiotic Calculator

You can also calculate your antibiotic stock solutions. Whether your antibiotics are in liquid or powder forms, the Antibiotic Calculator can accommodate
your needs.

<div align="center">
  <img width="50%" alt="image showing the antibiotic calculator" src="https://github.com/user-attachments/assets/6c0b1cd8-34c7-42c1-b2f1-70e6166f9102" />
</div>

## Development

Use Node.js 26 or later (`nvm use`) and the pnpm version recorded in
`package.json`.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Before submitting changes:

```sh
pnpm test
pnpm typecheck
pnpm lint
pnpm build
pnpm format:check
```

The tests cover calculation units, invalid and incomplete input, impossible
dilutions, product potency, small quantities, and input interactions.

## Calculation assumptions

- Medium mass in grams is the recipe in g/L multiplied by final volume in mL,
  divided by 1,000.
- Agar uses percent **weight/volume**: grams per 100 mL of final preparation.
  Additional agar calculations assume the medium base contains no agar.
- Liquid antibiotic preparation uses `stock concentration × stock volume =
target concentration × final volume`. Both concentrations must use the same
  units. The stock volume is included in the final volume.
- Powder with a mass concentration in μg/mL uses concentration multiplied by
  final volume, divided by 1,000, to obtain mg. This assumes the concentration
  refers to the weighed product. Active ingredient equivalents may need a
  separate purity or potency correction from the product documentation.
- Powder with an activity concentration in units/mL requires product- or
  lot-specific potency in units/mg. Required mass in mg is target concentration
  multiplied by final volume, divided by potency.

Inputs stay as strings while editing. Missing or malformed values never become
zero: affected results show “—”. Malformed or physically invalid values receive
inline errors; unfinished or empty input receives an error after leaving the
field. Stock concentration, recipe concentration, final volume, and potency must
be positive. Target concentration and agar percentage may be zero. Ordinary
decimal notation is supported, with at most 100 characters after trimming;
scientific notation and localized decimal separators are not accepted.

Calculations use an isolated Decimal.js constructor with 20 significant digits
and half-up rounding. Only display values are rounded to at most four significant
digits. Small quantities use mg, μg, or μL; very small or large results use
scientific notation so a positive quantity never appears as zero. Display digits
do not imply that a balance or pipette has the corresponding resolution.

Changing between mass and activity concentration units clears concentration and
potency inputs because the values cannot be reinterpreted as equivalent units.

## Dependency migration notes

The project uses Next.js 16, React 19, Tailwind CSS 4, ESLint 10, and the TypeScript
7 compiler. Tailwind configuration now lives in `styles/globals.css`, its PostCSS
plugin replaces the old Tailwind/Autoprefixer setup, and ESLint uses flat config.
Page metadata uses the Next.js Metadata API.

The TypeScript 7 compiler is installed as `typescript-native` and runs through
`pnpm typecheck`. Next.js and typescript-eslint still require the TypeScript 6
JavaScript API, so `typescript` intentionally stays on 6.0.3. Remove that
compatibility dependency once both tools support the new compiler API. Next.js
also checks types during builds using that API.

Next.js's React, import, and accessibility ESLint plugins still declare ESLint 9
peer ranges. `@eslint/compat` adapts their rule APIs for ESLint 10; narrowly scoped
pnpm peer rules record that compatibility decision. Revisit these adapters when
upstream plugins support ESLint 10 directly.

At the time of this upgrade, `pnpm audit --prod` reports no known vulnerabilities.
The full audit reports the moderate development-only minimatch advisory
[GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249) through
the latest lint tooling. A blanket override to minimatch 11 would change the API
used by older lint plugins, so no incompatible override is applied.

## Release history

“What’s new” in the shared footer opens the release history without interrupting
calculator use. An indicator identifies unread updates; opening the dialog marks
the current version as seen. Browser storage remembers this across visits, with
an in-memory fallback when storage is blocked.

Keep `releaseNotes.ts` newest first. Its current entry uses the version from
`package.json`. For a new release, archive the previous entry with its literal
version, bump the package version, and write the new current notes. Tests check
version consistency, ordering, and duplicate versions.
