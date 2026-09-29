# Resolved lockfile versions

The final `yarn.lock` resolves the alerted package families as follows. When the dashboard alert was scoped to a package name that is no longer present, the lockfile no longer contains that package.

| Alerted package | GitHub minimum | Locked resolution(s) |
| --- | --- | --- |
| `next` | `15.5.24` | `15.5.24` |
| `tar` | `7.5.21` | `7.5.22` |
| `glob` | `10.5.0` | `10.5.0` |
| `flatted` | `3.4.2` | `3.4.4` |
| `minimatch` | `10.2.3` | `3.1.5`, `9.0.9`, `10.2.6` (each on its corresponding supported major line) |
| `brace-expansion` | `2.1.2` | `1.1.21`, `2.1.7` |
| `@isaacs/brace-expansion` | `5.0.1` | package no longer present; current `minimatch@10.2.6` resolves `brace-expansion@5.0.12` |
| `nanoid` | `3.3.18` | `3.3.19` |
| `svgo` | `3.3.5` | `3.3.5` |
| `@babel/plugin-transform-modules-systemjs` | `7.29.4` | `7.29.8` |
| `ip-address` | `10.5.1` | `10.7.2` |
| `browserslist` | `4.28.7` | `4.29.2` |
| `postcss` | `8.5.23` | `8.5.28` |
| `js-yaml` | `4.3.2` | `4.3.2` |
| `@babel/runtime` | `7.26.10` | `7.29.7` |
| `picomatch` | `4.0.4` | `2.3.2`, `4.0.7` (patched supported major resolutions) |
| `@babel/core` | `7.29.6` | `7.29.7` |
| `postcss-selector-parser` | `6.1.3` | `6.1.4` |

`yarn why postcss` confirms that the app, Next.js 15.5.24, and Tailwind all resolve to `postcss@8.5.28`; this avoids Next.js's older exact PostCSS pin.

The `yarn install --immutable` log is saved as `yarn-install-immutable.log`; the successful production build, including lint and type checking, is saved as `yarn-build.log`.
