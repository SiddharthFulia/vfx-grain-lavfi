#!/usr/bin/env bash
# Super 16mm: medium grain, slight cyan shadow shift.
set -euo pipefail

IN="${1:-input.mp4}"
OUT="${2:-super16.mp4}"
G="${3:-14}"

FILTER="\
curves=blue='0/0.04 0.5/0.5 1/0.95':red='0/0 0.5/0.48 1/1',\
noise=alls=${G}:allf=t+u,\
eq=saturation=0.95:contrast=1.05,\
unsharp=3:3:-0.4:3:3:0.0,\
format=yuv420p"

ffmpeg -y -i "$IN" -vf "$FILTER" -c:v libx264 -crf 18 -preset slow -c:a copy "$OUT"
