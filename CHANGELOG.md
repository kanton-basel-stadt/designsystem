# Changelog

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
