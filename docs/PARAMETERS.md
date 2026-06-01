# Parameters — every knob explained

A flat reference for every numeric or expression parameter exposed by the
scripts and TypeScript chain builders.

---

## Grain (`noise` filter)

- `alls=N` — global noise strength applied to all planes. 0 = nothing, 100 = unwatchable. Sane: 5-30.
- `allf=t+u` — `t` = temporal (changes per frame, looks like film grain), `u` = uniform distribution. Drop `u` for a more Gaussian look.
- `c0s / c1s / c2s` — per-plane noise. c0 = luma (Y), c1 = chroma (U), c2 = chroma (V). For "real" digital noise, push c0 ~2x more than c1/c2.

## Halation (`lumakey` + `boxblur` + `blend`)

- `threshold` (0.0-1.0) — luma level above which a pixel is considered a highlight. 0.78 = top ~22% of values bloom.
- `tolerance` (0.0-0.2) — soft edge of the key. Higher = smoother bloom.
- `boxblur=R:P` — `R` = radius in pixels, `P` = power (iterations). Bigger R = wider bloom but more expensive.
- `colorchannelmixer=rr=1:gg=0.55:bb=0.35` — the bloom's color. This particular triple is warm orange — the canonical halation tint. Cooler stocks (Fuji) use `gg=0.6:bb=0.55`.
- `blend=all_mode=screen:all_opacity=O` — `O` 0-1 is final intensity.

## Chromatic aberration (`rgbashift`)

- `rh / rv` — Red plane horizontal / vertical shift in pixels.
- `gh / gv` — Green.
- `bh / bv` — Blue.
- Realistic: split R and B in opposite directions (+s and -s) on a single axis.

## Vignette (`vignette` filter)

- `angle` — falloff aggressiveness expressed as an FFmpeg expression. `PI/4` ≈ heavy, `PI/5` ≈ medium, `PI/6` ≈ subtle, `PI/7+` ≈ nearly invisible.
- `mode` — `forward` darkens corners (standard), `backward` brightens them (rarely useful).

## Gate weave (`pad` + `crop`)

- `amplitude` — pad/crop slack in pixels.
- Per-frame offset uses `'A+A*sin(n/3)'` and `'A+A*cos(n/5)'`. `n` is the frame number. The 3 and 5 are the divisors — coprime = non-repeating pattern.

## Lens breathing (`zoompan`)

- `amount` (0.005-0.02) — fractional zoom amplitude. 0.01 = ±1% zoom.
- `period` (60-240 frames) — frames per breath cycle. At 24fps, 120 = ~5s per breath.
- Expression: `z='1+amount*sin(2*PI*on/period)'`. `on` = output frame number.

## Bleach bypass (`split` + `eq` + `curves` + `blend`)

The grade is two streams blended:

1. **Base** — heavy contrast (`contrast=1.35`) + low sat (`saturation=0.25`) + curves that crush highlights & raise shadows.
2. **Silver** — desaturated copy used as a softlight overlay (`all_opacity=0.55`).

Lower softlight opacity → less silvery, more naturally desaturated.

## Teal & Orange (`curves` + `eq`)

- Red curve: lift mids slightly, leave whites alone → warm skin tones.
- Blue curve: raise shadows toward teal, drop highlights → cool blacks.
- `saturation` slider derived from `strength` arg: `1.0 + 0.3 * strength`.

## LUT (`lut3d`)

- `file` — path to `.cube` file.
- `interp` — `nearest` (fast, blocky), `trilinear` (default in many tools), `tetrahedral` (most accurate; this lib's default).
