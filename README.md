# vfx-grain-lavfi

> A library of FFmpeg `lavfi` filter chains for emulating film grain, halation, gate weave, lens breathing, vignette, chromatic aberration, bleach-bypass grade, and cinematic color tones — every chain is reproducible from CLI alone. No plugins. No custom shaders. No DaVinci dependency.

Each filter chain ships as:

1. A self-contained Bash script (`scripts/*.sh`) — runs anywhere FFmpeg runs.
2. A portable TypeScript helper (`src/chains/*.ts`) that constructs the same `-filter_complex` string for programmatic pipelines.

The TS output is verified against the Bash strings by vitest snapshot tests, and the scripts are smoke-tested with `bats` against a tiny generated fixture mp4.

---

## Gallery

| Stock | Script | What it emulates |
|---|---|---|
| Kodak Vision3 250D | `grain-kodak-vision3.sh` | Modern color negative, fine grain, soft halation |
| Super 16mm | `grain-super16.sh` | Medium grain, slight cyan shadow shift |
| Super 8mm | `grain-super8.sh` | Coarse grain, warm cast, edge softness |
| Clean digital | `grain-clean-digital.sh` | Subtle high-ISO sensor noise, no halation |
| Halation only | `halation.sh` | Warm highlight bloom |
| Chromatic aberration | `chromatic-aberration.sh` | Per-channel translation |
| Vignette | `vignette.sh` | Radial darkening |
| Gate weave | `gate-weave.sh` | Sub-pixel frame jitter |
| Lens breathing | `lens-breathing.sh` | Slow zoom oscillation |
| Bleach bypass | `bleach-bypass.sh` | High-contrast, low-sat grade |
| Teal & orange | `teal-orange.sh` | Hollywood blockbuster grade |
| Mute desat | `desaturate-mute.sh` | Subdued color |
| Apply LUT | `lut-apply.sh` | Any `.cube` 3D LUT |
| Full stack | `stack-cinematic.sh` | grade → grain → halation → vignette |

> Render placeholders live in `docs/stills/`. Drop your own PNGs to populate the gallery.

---

## Install

```bash
# 1. FFmpeg (4.4+)
ffmpeg -version

# 2. Clone
git clone https://github.com/SiddharthFulia/vfx-grain-lavfi.git
cd vfx-grain-lavfi

# 3. Optional: TypeScript helpers
npm install
npm run build
```

---

## Usage

### Bash

```bash
./scripts/grain-kodak-vision3.sh input.mp4 output.mp4
./scripts/stack-cinematic.sh raw.mp4 final.mp4
```

### TypeScript

```ts
import { kodakVision3, halation, vignette, composeChain } from 'vfx-grain-lavfi';

const filter = composeChain([
  kodakVision3({ grainStrength: 8 }),
  halation({ intensity: 0.35, threshold: 0.78 }),
  vignette({ angle: 'PI/5' }),
]);

// → use in any ffmpeg invocation
// ffmpeg -i in.mp4 -vf "${filter}" out.mp4
```

### CLI helper

```bash
npx vfx-grain-lavfi build --stock super16 --halation 0.4 --vignette
```

---

## Docs

- [docs/STOCKS.md](./docs/STOCKS.md) — parameters & visual notes per stock
- [docs/PARAMETERS.md](./docs/PARAMETERS.md) — every numeric knob explained
- [docs/RECIPES.md](./docs/RECIPES.md) — stacks for Reels / shorts / films / music videos

---

## License

MIT © 2026 Siddharth Fulia
