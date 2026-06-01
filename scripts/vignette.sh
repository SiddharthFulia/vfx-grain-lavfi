#!/usr/bin/env bash
# Radial darkening toward the corners.
set -euo pipefail

IN="${1:-input.mp4}"
OUT="${2:-vignetted.mp4}"
ANGLE="${3:-PI/5}"

FILTER="\
vignette=angle=${ANGLE}:mode=forward:eval=init,\
format=yuv420p"

ffmpeg -y -i "$IN" -vf "$FILTER" -c:v libx264 -crf 18 -preset slow -c:a copy "$OUT"
