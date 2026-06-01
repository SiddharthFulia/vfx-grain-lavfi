#!/usr/bin/env bash
# Bleach-bypass grade: high contrast, low saturation, silver retention.
set -euo pipefail

IN="${1:-input.mp4}"
OUT="${2:-bleach.mp4}"

FILTER="\
split=2[a][b];\
[a]eq=saturation=0.25:contrast=1.35,\
curves=master='0/0.05 0.25/0.18 0.75/0.85 1/0.92'[base];\
[b]hue=s=0,curves=master='0/0 0.5/0.5 1/1'[silver];\
[base][silver]blend=all_mode=softlight:all_opacity=0.55,\
format=yuv420p"

ffmpeg -y -i "$IN" -vf "$FILTER" -c:v libx264 -crf 18 -preset slow -c:a copy "$OUT"
