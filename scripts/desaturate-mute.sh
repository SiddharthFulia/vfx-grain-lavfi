#!/usr/bin/env bash
# Subdued muted palette.
set -euo pipefail

IN="${1:-input.mp4}"
OUT="${2:-mute.mp4}"
SAT="${3:-0.7}"

FILTER="\
eq=saturation=${SAT}:contrast=1.02:brightness=-0.02,\
format=yuv420p"

ffmpeg -y -i "$IN" -vf "$FILTER" -c:v libx264 -crf 18 -preset slow -c:a copy "$OUT"
