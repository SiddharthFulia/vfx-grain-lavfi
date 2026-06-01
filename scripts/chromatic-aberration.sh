#!/usr/bin/env bash
# Per-channel translation to mimic uncorrected lens dispersion.
set -euo pipefail

IN="${1:-input.mp4}"
OUT="${2:-ca.mp4}"
S="${3:-2}"

FILTER="\
format=gbrp,\
rgbashift=rh=${S}:rv=0:gh=0:gv=0:bh=-${S}:bv=0,\
format=yuv420p"

ffmpeg -y -i "$IN" -vf "$FILTER" -c:v libx264 -crf 18 -preset slow -c:a copy "$OUT"
