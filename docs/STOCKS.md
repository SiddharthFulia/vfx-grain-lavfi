# Stocks — parameters & visual notes

A reference for each emulated stock: which knobs to turn, what it'll look like,
and when to reach for it.

---

## Kodak Vision3 250D (`grain-kodak-vision3.sh`)

**The flagship.** Modern color negative used for nearly every major feature
shot on 35mm since 2007. Fine grain, gentle highlight halation, neutral skin tones.

| Param | Default | Range | Effect |
|---|---|---|---|
| `grain_strength` | 8 | 0-30 | luma noise amplitude |
| (built-in) halation opacity | 0.35 | 0.0-0.7 | warm bloom on highlights |

**Use when:** drama, narrative, anything where you want to flatter faces.

**Avoid when:** action / music videos that need bite — try Super 16 instead.

---

## Super 16mm (`grain-super16.sh`)

Medium grain with a slight cyan shift in the shadows. The indie / documentary
sweet spot. Reads expensive without screaming "filmic".

| Param | Default | Range | Effect |
|---|---|---|---|
| `grain` | 14 | 6-22 | grain coarseness |

**Use when:** indie shorts, docs, music videos with mid-budget look.

---

## Super 8mm (`grain-super8.sh`)

Coarse grain, warm cast, edge softness, lifted blacks. The faded
home-movie / memory aesthetic.

| Param | Default | Range | Effect |
|---|---|---|---|
| `grain` | 26 | 18-40 | grain coarseness |

**Use when:** flashback sequences, lo-fi montage, nostalgia.

---

## Clean digital (`grain-clean-digital.sh`)

Subtle ISO-1600-ish sensor noise. No color shift, no halation.

| Param | Default | Range | Effect |
|---|---|---|---|
| `grain` | 5 | 2-12 | noise floor |

**Use when:** breaking up sterile gradients, dehancing OLED-perfect footage.

---

## Single-effect modules

| Script | Knob | Default | When to use |
|---|---|---|---|
| `halation.sh` | intensity, threshold | 0.35, 0.78 | mood / dreamy |
| `chromatic-aberration.sh` | shift px | 2 | edge realism, sci-fi |
| `vignette.sh` | angle | PI/5 | focus attention |
| `gate-weave.sh` | amplitude px | 2 | film projection cue |
| `lens-breathing.sh` | amount, period | 0.01, 120 | organic life on locked-off |

## Grades

| Script | Look |
|---|---|
| `bleach-bypass.sh` | Saving Private Ryan, Minority Report |
| `teal-orange.sh` | every Hollywood blockbuster 2010-2020 |
| `desaturate-mute.sh` | Nordic noir, prestige TV pilot |
| `lut-apply.sh` | bring your own (.cube) |

## Stacks

| Script | What it composes |
|---|---|
| `stack-cinematic.sh` | teal-orange grade → grain → halation → vignette → gate-weave |
