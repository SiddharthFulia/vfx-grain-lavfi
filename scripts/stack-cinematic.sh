#!/usr/bin/env bash
# Full cinematic stack: grade -> grain -> halation -> vignette -> gate weave.
set -euo pipefail

IN="${1:-input.mp4}"
OUT="${2:-cinematic.mp4}"

FILTER="\
curves=red='0/0 0.4/0.42 0.7/0.78 1/1':\
blue='0/0.06 0.4/0.46 0.7/0.62 1/0.92',\
eq=saturation=1.08:contrast=1.06,\
split=2[g][h];\
[g]noise=alls=10:allf=t+u[grain];\
[h]lumakey=threshold=0.78:tolerance=0.1,\
boxblur=10:1,\
colorchannelmixer=rr=1.0:gg=0.55:bb=0.35[bloom];\
[grain][bloom]blend=all_mode=screen:all_opacity=0.32,\
vignette=angle=PI/5,\
pad=iw+4:ih+4:2:2:black,\
crop=iw-4:ih-4:'2+2*sin(n/3)':'2+2*cos(n/5)',\
format=yuv420p"

ffmpeg -y -i "$IN" -vf "$FILTER" -c:v libx264 -crf 18 -preset slow -c:a copy "$OUT"
