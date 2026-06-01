# Sample recipe — "indie short film"

A walk-through that takes a flat, log-ish digital clip and lands on something
that reads as a Sundance short.

## 1. Tame contrast

If your source is BT.709 with crushed shadows, start with a quick lift:

```bash
ffmpeg -i raw.mp4 -vf "curves=master='0/0.04 1/0.96'" lift.mp4
```

## 2. Apply a stock

```bash
./scripts/grain-super16.sh lift.mp4 stage1.mp4
```

Super 16 is the safe default — it grades like 35mm but reads as warmer and
younger. Bump grain to `18` if you want it to feel more "Moonlight",
drop to `10` for "Past Lives".

## 3. Halation on the highlights

```bash
./scripts/halation.sh stage1.mp4 stage2.mp4 0.4 0.78
```

Halation is what your eye reads as "this was shot on film, not a phone".
Even at 0.2 intensity it's the single biggest perceptual win.

## 4. Vignette + weave

```bash
./scripts/vignette.sh stage2.mp4 stage3.mp4 PI/5
./scripts/gate-weave.sh stage3.mp4 final.mp4 2
```

Vignette focuses the eye toward face/centre composition.
Gate weave is the subliminal "this is film" cue — set amplitude to 1 if you
plan to overlay text or graphics later.

## One-shot

The bundled stack does all four in one filter graph (faster, only one encode):

```bash
./scripts/stack-cinematic.sh raw.mp4 final.mp4
```

## TypeScript equivalent

```ts
import { composeChain, super16, halation, vignette, gateWeave } from 'vfx-grain-lavfi';

const filter = composeChain([
  super16({ grainStrength: 14 }),
  halation({ intensity: 0.4, threshold: 0.78 }),
  vignette({ angle: 'PI/5' }),
  gateWeave({ amplitude: 2 }),
]);

// → spawn ffmpeg with `-vf ${filter}`
```
