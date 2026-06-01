# Recipes — recommended stacks by format

Battle-tested combinations for the formats most people are actually editing for.

---

## Instagram Reels / TikTok / YouTube Shorts

Tight on time, watched on phones with auto-brightness, viewer attention < 3s.
Goal: stand out in feed without screaming "filtered".

```bash
# 1. punch the grade, 2. light grain, 3. soft halation
./scripts/teal-orange.sh raw.mp4 stage1.mp4 0.4
./scripts/grain-clean-digital.sh stage1.mp4 stage2.mp4 6
./scripts/halation.sh stage2.mp4 final.mp4 0.25 0.82
```

Or the single-graph version:

```ts
composeChain([
  tealOrange({ strength: 0.4 }),
  cleanDigital({ grainStrength: 6 }),
  halation({ intensity: 0.25, threshold: 0.82 }),
]);
```

---

## Indie short film

Going to festivals or Vimeo Staff Picks. Watched on laptops, sometimes TVs.
Goal: read as "shot on film", flatter faces, hide digital sharpness.

```bash
./scripts/grain-super16.sh raw.mp4 stage1.mp4 14
./scripts/halation.sh stage1.mp4 stage2.mp4 0.4 0.78
./scripts/vignette.sh stage2.mp4 stage3.mp4 PI/5
./scripts/gate-weave.sh stage3.mp4 final.mp4 2
```

---

## Music video

Punchy. Saturated. Frame-level interest.

```bash
./scripts/grain-super8.sh raw.mp4 stage1.mp4 28
./scripts/chromatic-aberration.sh stage1.mp4 stage2.mp4 3
./scripts/halation.sh stage2.mp4 final.mp4 0.5 0.7
```

---

## Documentary / corporate / interview

Cleanly graded, gentle dehancement. Read as "professional" not "stylized".

```bash
./scripts/desaturate-mute.sh raw.mp4 stage1.mp4 0.85
./scripts/grain-clean-digital.sh stage1.mp4 final.mp4 4
```

---

## Horror / thriller

Cold, gritty, eyes drawn to faces in shadow.

```bash
./scripts/bleach-bypass.sh raw.mp4 stage1.mp4
./scripts/grain-super16.sh stage1.mp4 stage2.mp4 18
./scripts/vignette.sh stage2.mp4 final.mp4 PI/4
```

---

## Sci-fi / cyberpunk

Lens artifacts loud and proud.

```ts
composeChain([
  tealOrange({ strength: 0.8 }),
  cleanDigital({ grainStrength: 7 }),
  halation({ intensity: 0.5, threshold: 0.7 }),
  aberration({ shift: 3 }),
  vignette({ angle: 'PI/4' }),
]);
```

---

## Wedding / nostalgia

Warm, soft, slightly faded. Read as "memory".

```bash
./scripts/grain-super8.sh raw.mp4 stage1.mp4 22
./scripts/halation.sh stage1.mp4 stage2.mp4 0.45 0.74
./scripts/lens-breathing.sh stage2.mp4 final.mp4 0.012 90
```
