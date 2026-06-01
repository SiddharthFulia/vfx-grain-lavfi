#!/usr/bin/env bash
# Subtle high-ISO sensor noise.
set -euo pipefail

IN="${1:-input.mp4}"
OUT="${2:-digital.mp4}"
G="${3:-5}"

FILTER="\
noise=c0s=${G}:c0f=t+u:c1s=$((G/2)):c1f=t:c2s=$((G/2)):c2f=t,\
format=yuv420p"

ffmpeg -y -i "$IN" -vf "$FILTER" -c:v libx264 -crf 18 -preset slow -c:a copy "$OUT"
