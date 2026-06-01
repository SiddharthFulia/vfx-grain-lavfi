# Contributing

Welcome! `vfx-grain-lavfi` is a collection of *real, working* FFmpeg filter graphs.
The bar is that every chain must run on a vanilla FFmpeg build with no plugins.

## Adding a new stock or effect

1. **Bash first.** Write `scripts/<your-effect>.sh`. Follow the existing template:
   - `#!/usr/bin/env bash` + `set -euo pipefail`
   - Top comment block: what it emulates, when to use it, sane param ranges
   - Positional args: `IN`, `OUT`, then numeric knobs with defaults
   - Build `FILTER=...` then `ffmpeg -y -i "$IN" -vf "$FILTER" ... "$OUT"`
2. **TS mirror.** Add `src/chains/<your-effect>.ts` exporting a function that returns the *exact same* filter string.
3. **Snapshot test.** Add an inline snapshot in `tests/chains.snapshot.test.ts`. The test passes only when the TS string matches what the Bash script would build.
4. **bats smoke test.** Add a case to `bats/grain.bats` or `bats/halation.bats` asserting the script exits 0 and writes a non-empty file.
5. **Doc it.** Update `docs/STOCKS.md` (visual notes) and `docs/PARAMETERS.md` (each knob).

## Style

- Indent: 2 spaces (bash, ts, md tables)
- No trailing whitespace
- ShellCheck must pass clean: `npm run lint:shell`
- Vitest must pass: `npm test`
- Prefer real ffmpeg filters over external binaries. If you reach for `python`, `ImageMagick`, etc., this isn't the repo.

## Running tests locally

```bash
npm install
npm run build
npm test                # vitest snapshot
npm run lint:shell      # shellcheck
bash bats/setup_fixtures.sh
bats bats               # script smoke tests (requires ffmpeg + bats)
```

## Commit style

Conventional commits — `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`.

## License

By contributing you agree that your work is released under the MIT license of this repository.
