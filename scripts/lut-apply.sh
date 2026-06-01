#!/usr/bin/env bash
# Apply a 3D LUT (.cube) to a video.
set -euo pipefail

IN="${1:-input.mp4}"
LUT="${2:-lut.cube}"
OUT="${3:-graded.mp4}"

if [[ ! -f "$LUT" ]]; then
  echo "LUT file not found: $LUT" >&2
  exit 2
fi

FILTER="lut3d=file='${LUT}':interp=tetrahedral,format=yuv420p"

ffmpeg -y -i "$IN" -vf "$FILTER" -c:v libx264 -crf 18 -preset slow -c:a copy "$OUT"
