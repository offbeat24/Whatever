# Dependabot patch baselines

Checked in the authenticated GitHub Dependabot UI on 2026-09-29. GitHub showed 82 open alerts in `yarn.lock`; the patch versions below are the dashboard's recommended minimums for resolving each affected package family.

| Package family | Open alerts | Recommended minimum |
| --- | ---: | --- |
| `next` | 34 | `15.5.24` |
| `tar` | 12 | `7.5.21` |
| `glob` | 1 | `10.5.0` |
| `flatted` | 1 | `3.4.2` |
| `minimatch` | 3 | `10.2.3` |
| `brace-expansion` | 2 | `2.1.2` |
| `@isaacs/brace-expansion` | 1 | `5.0.1` |
| `nanoid` | 4 | `3.3.18` |
| `svgo` | 4 | `3.3.5` |
| `@babel/plugin-transform-modules-systemjs` | 1 | `7.29.4` |
| `ip-address` | 3 | `10.5.1` |
| `browserslist` | 1 | `4.28.7` |
| `postcss` | 4 | `8.5.23` |
| `js-yaml` | 5 | `4.3.2` |
| `@babel/runtime` | 1 | `7.26.10` |
| `picomatch` | 3 | `4.0.4` |
| `@babel/core` | 1 | `7.29.6` |
| `postcss-selector-parser` | 1 | `6.1.3` |
| **Total** | **82** | |

The `next` alert detail included advisory [GHSA-p293-qw3h-jr36](https://github.com/vercel/next.js/security/advisories/GHSA-p293-qw3h-jr36). The official [Next.js 15 upgrade guide](https://nextjs.org/docs/app/guides/upgrading/version-15) states that App Router requires React 19; this repository uses the App Router.

The latest alert #151, opened on 2026-09-29, recommends `tar` `7.5.21` or later; the updated lockfile resolves `tar@7.5.22`. [Alert #151](https://github.com/offbeat24/Whatever/security/dependabot/151)

Dashboard: https://github.com/offbeat24/Whatever/security/dependabot
