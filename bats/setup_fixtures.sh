#!/usr/bin/env bash
# Generate a 1s/320x240 fixture clip for bats smoke tests.
set -euo pipefail

DIR="$(cd "$(dirname "$0")" && pwd)/fixtures"
mkdir -p "$DIR"

if [[ ! -f "$DIR/in.mp4" ]]; then
  ffmpeg -y -f lavfi -i "testsrc=duration=1:size=320x240:rate=24" \
         -pix_fmt yuv420p "$DIR/in.mp4" >/dev/null 2>&1
fi
echo "fixture: $DIR/in.mp4"
