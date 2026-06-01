#!/usr/bin/env bash
# Slow zoom oscillation simulating a focus puller hunting.
set -euo pipefail

IN="${1:-input.mp4}"
OUT="${2:-breathing.mp4}"
AMT="${3:-0.01}"
PER="${4:-120}"

FILTER="\
zoompan=z='1+${AMT}*sin(2*PI*on/${PER})':d=1:s=iw:s=ih:fps=25,\
format=yuv420p"

ffmpeg -y -i "$IN" -vf "$FILTER" -c:v libx264 -crf 18 -preset slow -c:a copy "$OUT"
