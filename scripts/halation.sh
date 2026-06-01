#!/usr/bin/env bash
# Warm highlight bloom around hot specular highlights.
set -euo pipefail

IN="${1:-input.mp4}"
OUT="${2:-halated.mp4}"
INT="${3:-0.35}"
THR="${4:-0.78}"

FILTER="\
split=2[base][hl];\
[hl]lumakey=threshold=${THR}:tolerance=0.12,\
boxblur=12:1,\
colorchannelmixer=rr=1.0:gg=0.55:bb=0.35[bloom];\
[base][bloom]blend=all_mode=screen:all_opacity=${INT},\
format=yuv420p"

ffmpeg -y -i "$IN" -vf "$FILTER" -c:v libx264 -crf 18 -preset slow -c:a copy "$OUT"
