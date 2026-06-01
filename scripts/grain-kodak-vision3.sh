#!/usr/bin/env bash
# Kodak Vision3 250D: fine grain + warm highlight halation.
set -euo pipefail

IN="${1:-input.mp4}"
OUT="${2:-vision3.mp4}"
G="${3:-8}"

FILTER="\
split=2[a][b];\
[a]curves=master='0/0.02 0.5/0.5 1/0.96',\
noise=alls=${G}:allf=t+u,\
eq=saturation=1.05:gamma_r=1.02:gamma_b=0.98[base];\
[b]lumakey=threshold=0.78:tolerance=0.1,\
boxblur=10:1,\
colorchannelmixer=rr=1.0:gg=0.6:bb=0.45[halo];\
[base][halo]blend=all_mode=screen:all_opacity=0.35,\
format=yuv420p"

ffmpeg -y -i "$IN" -vf "$FILTER" -c:v libx264 -crf 18 -preset slow -c:a copy "$OUT"
