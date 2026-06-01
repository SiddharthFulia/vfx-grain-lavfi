#!/usr/bin/env bash
# Sub-pixel frame jitter to simulate a film print wobbling in the gate.
set -euo pipefail

IN="${1:-input.mp4}"
OUT="${2:-weave.mp4}"
A="${3:-2}"

FILTER="\
pad=iw+2*${A}:ih+2*${A}:${A}:${A}:black,\
crop=iw-2*${A}:ih-2*${A}:'${A}+${A}*sin(n/3)':'${A}+${A}*cos(n/5)',\
format=yuv420p"

ffmpeg -y -i "$IN" -vf "$FILTER" -c:v libx264 -crf 18 -preset slow -c:a copy "$OUT"
