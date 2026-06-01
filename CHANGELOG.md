# Changelog

All notable changes to `vfx-grain-lavfi` are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [0.1.0] - 2026-06-01

### Added
- 14 Bash filter chains:
  - `grain-kodak-vision3.sh`, `grain-super16.sh`, `grain-super8.sh`, `grain-clean-digital.sh`
  - `halation.sh`, `chromatic-aberration.sh`, `vignette.sh`
  - `gate-weave.sh`, `lens-breathing.sh`
  - `bleach-bypass.sh`, `teal-orange.sh`, `desaturate-mute.sh`
  - `lut-apply.sh`, `stack-cinematic.sh`
- TypeScript chain builders for all of the above (`src/chains/`).
- `composeChain` utility with deterministic numeric formatting.
- CLI helper: `vfx-grain-lavfi build --stock <s> --grade <g> --halation N --vignette --ca N`.
- vitest inline snapshots verifying TS output matches Bash strings.
- bats smoke tests against an auto-generated 1s/320x240 fixture.
- GitHub Actions CI: shellcheck + vitest + bats.
- Docs: STOCKS.md, PARAMETERS.md, RECIPES.md.
- Examples: per-target `Makefile`, narrated `sample-recipe.md`.

[0.1.0]: https://github.com/SiddharthFulia/vfx-grain-lavfi/releases/tag/v0.1.0
