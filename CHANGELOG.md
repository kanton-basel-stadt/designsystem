# Changelog

## [2.0.0] - 2026-09-01

### Breaking

- Upgrade from Tailwind CSS v3.4 to v4. The unplugin now ships `tailwindcss` and `@tailwindcss/postcss` v4. This requires **Safari 16.4+, Chrome 111+, or Firefox 128+**.
- Tailwind v4 no longer supports `safelist`, `corePlugins`, or `separator` in the JavaScript config. `tailwindOptions.config.safelist` is ignored. Use `@source inline("…")` in CSS instead (see below).
- Custom classes defined in `@layer components` can no longer be `@apply`'d. Convert those classes to `@utility` if something applies them.
- Several Tailwind utilities changed meaning. In this package: `outline-none` → `outline-hidden` (keeps a forced-colors focus ring), `flex-shrink-0` → `shrink-0`, and bare `border` utilities now get an explicit colour. **Your own templates** may still need the same updates.

### Changed

- Load the existing `tailwind.config.ts` from CSS via `@config` (hybrid setup; the JS theme is unchanged).
- Replace `postcss-hexrgba` / `postcss-nesting` with Tailwind v4's built-in import, nesting, and prefixing.
- Pin `max-w-prose` to `836px` so v4's default `65ch` does not shrink `.container`.
- `.button` sets `cursor-pointer` to preserve the v3 Preflight look (v4 buttons default to `cursor: default`).

### Migration

After upgrading the package, rebuild your app. Then check the following in **your** CSS and markup (the design-system sources are already updated).

**1. Safelist** — if you passed `tailwindOptions.config.safelist`, move those class names into your CSS:

```css
@import "@kanton-basel-stadt/designsystem/assets/css/tailwind.css";

@source inline("prose lg:hidden");
```

**2. Extra CSS** — keep `@import` of the design-system CSS first. Component styles can stay in `@layer components`. Classes you `@apply` or use with variants (`hover:`, `md:`, …) must be `@utility`:

```css
@import "@kanton-basel-stadt/designsystem/assets/css/tailwind.css";

@layer components {
  .my-card {
    padding: 20px;
  }
}

@utility my-chip {
  @apply rounded-full px-10 text-sm;
}
```

**3. Vue / Svelte `<style>` blocks** that use `@apply`, `@variant`, or `theme()` need a reference to the design-system entry (plain `<style>`, not `lang="postcss"`):

```vue
<style>
@reference "@kanton-basel-stadt/designsystem/assets/css/tailwind.css";
.foo {
  @apply text-blue-900;
}
</style>
```

**4. Utility renames in your HTML** (only where you used them):

| v3                                    | v4                                     |
| ------------------------------------- | -------------------------------------- |
| `outline-none` (invisible focus ring) | `outline-hidden`                       |
| `flex-shrink-0` / `flex-grow-0`       | `shrink-0` / `grow-0`                  |
| `shadow-sm`                           | `shadow-xs` (v4 `shadow-sm` is larger) |
| `border` / `border-b` with no colour  | add a colour, e.g. `border-gray-200`   |

`tailwindOptions.config` (content paths, theme, plugins) is still deep-merged as before. See the [Tailwind v4 upgrade guide](https://tailwindcss.com/docs/upgrade-guide) for the full list of framework changes.

## [1.2.3] - 2026-07-22

### Changed

- move table.css from dir typography to dir sections
- increase the font size of table headers from 12 to 16px
- update table header color from green-500 to green-700

## [1.2.2] - 2026-07-21

### Changed

- increase the size of the pre-heading (h2) font from 12 to 14px

## [1.2.1] - 2026-06-01

### Added

- new color variant "red" for the component tag
- add new icon "submit-doc"

### Changed

- reduce the right padding of the tag component from 20 to 10

## [1.2.0] - 2026-05-26

### Changed

- fieldset title in green
- stepper navigation better placement
- pagination color for step navigation
- removed 2 icons: map-pin-coloured.svg and pin.svg
- help box open icon

### Added

- help box close icon

## [1.1.5] - 2026-03-26

### Added

- Accessibility improvements across the design system.

## [1.1.4] - 2025-03-27

### Fixed

- Path transformation in the `transformIds` unplugin.

## [1.1.3] - 2025-03-21

### Fixed

- Source map warnings when using certain build tools (including Vite).

## [1.1.2] - 2025-03-21

### Changed

- Inline SVG icons are emitted as Base64.
- Dependencies updated; tests wait for asset loading where needed.
- CI: removed upload of built examples (with a temporary re-add for debugging Astro font loading on Windows).

## [1.1.1] - 2025-03-20

### Added

- End-to-end tests; expanded unit tests and related bug fixes.
- New icon and convenience styling for the help box.

### Changed

- Icons updated to newer versions.
- Vitest hook timeout increased to 150s.

### Fixed

- Typos in the README.

## [1.1.0] - 2025-01-15

### Added

- Tailwind can be configured through the plugin configuration.

## [1.0.2] - 2025-01-10

### Fixed

- `package-lock.json` and dependency updates.

## [1.0.1] - 2024-12-17

### Fixed

- `package.json`: correct repository URL and publish script for npm.

## [1.0.0] - 2024-12-17

First public release of the Basel-Stadt digital design system unplugin and assets.

### Added

- Core CSS, symbols (including `data-symbol` for CSS-driven animation), and Storybook-oriented integration.
- Tailwind defaults: content globs (including MDX), blocklist, and compatibility updates for Storybook.
- Icon pipeline: TypeScript types for icons, Vite/Storybook fixes, and unplugin adjustments for reliable icon resolution and transforms.
- Components and styles: toggle switch variant (label on the left), fieldset legend styling, and assorted style updates.
- Examples and docs: extended Vite vanilla example, README and packaging prep for npm.
- Issue templates for GitHub.

### Changed

- Unplugin source licensed under GNU GPL (as documented at the time of release).

### Fixed

- Icon loading and colour import issues in Vite/Storybook setups.
- Tests and paths adjusted for Windows and CI.

[1.1.5]: https://github.com/kanton-basel-stadt/designsystem/compare/v1.1.4...v1.1.5
[1.1.4]: https://github.com/kanton-basel-stadt/designsystem/compare/v1.1.3...v1.1.4
[1.1.3]: https://github.com/kanton-basel-stadt/designsystem/compare/v1.1.2...v1.1.3
[1.1.2]: https://github.com/kanton-basel-stadt/designsystem/compare/v1.1.1...v1.1.2
[1.1.1]: https://github.com/kanton-basel-stadt/designsystem/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/kanton-basel-stadt/designsystem/compare/v1.0.2...v1.1.0
[1.0.2]: https://github.com/kanton-basel-stadt/designsystem/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/kanton-basel-stadt/designsystem/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/kanton-basel-stadt/designsystem/releases/tag/v1.0.0
