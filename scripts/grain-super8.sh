#!/usr/bin/env bash
# Super 8mm: coarse grain, warm cast, edge softening.
set -euo pipefail

IN="${1:-input.mp4}"
OUT="${2:-super8.mp4}"
G="${3:-26}"

FILTER="\
scale='2*round(iw*0.55/2):2*round(ih*0.55/2)':flags=neighbor,\
scale='2*round(iw/0.55/2):2*round(ih/0.55/2)':flags=bilinear,\
colorchannelmixer=rr=1.08:gg=1.0:bb=0.88,\
noise=alls=${G}:allf=t+u,\
gblur=sigma=0.6,\
curves=master='0/0.08 0.4/0.45 1/0.92',\
eq=saturation=0.92,\
format=yuv420p"

ffmpeg -y -i "$IN" -vf "$FILTER" -c:v libx264 -crf 20 -preset slow -c:a copy "$OUT"
