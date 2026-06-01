#!/usr/bin/env bash
# Hollywood teal-shadow / orange-skin grade.
set -euo pipefail

IN="${1:-input.mp4}"
OUT="${2:-teal-orange.mp4}"
S="${3:-0.6}"

FILTER="\
curves=red='0/0 0.4/0.42 0.7/0.78 1/1':\
blue='0/0.08 0.4/0.46 0.7/0.62 1/0.9',\
eq=saturation=$(awk "BEGIN{printf \"%.3f\", 1.0+0.3*${S}}"):contrast=1.05,\
format=yuv420p"

ffmpeg -y -i "$IN" -vf "$FILTER" -c:v libx264 -crf 18 -preset slow -c:a copy "$OUT"
