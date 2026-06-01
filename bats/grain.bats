#!/usr/bin/env bats

setup() {
  ROOT="$(cd "$BATS_TEST_DIRNAME/.." && pwd)"
  bash "$ROOT/bats/setup_fixtures.sh"
  IN="$ROOT/bats/fixtures/in.mp4"
  OUT_DIR="$(mktemp -d)"
}

teardown() {
  rm -rf "$OUT_DIR"
}

@test "grain-kodak-vision3.sh exits 0 and produces output" {
  run "$ROOT/scripts/grain-kodak-vision3.sh" "$IN" "$OUT_DIR/kodak.mp4"
  [ "$status" -eq 0 ]
  [ -s "$OUT_DIR/kodak.mp4" ]
}

@test "grain-super16.sh exits 0" {
  run "$ROOT/scripts/grain-super16.sh" "$IN" "$OUT_DIR/s16.mp4"
  [ "$status" -eq 0 ]
  [ -s "$OUT_DIR/s16.mp4" ]
}

@test "grain-super8.sh exits 0" {
  run "$ROOT/scripts/grain-super8.sh" "$IN" "$OUT_DIR/s8.mp4"
  [ "$status" -eq 0 ] || { echo "status=$status"; echo "$output"; false; }
  [ -s "$OUT_DIR/s8.mp4" ]
}

@test "grain-clean-digital.sh exits 0" {
  run "$ROOT/scripts/grain-clean-digital.sh" "$IN" "$OUT_DIR/dig.mp4"
  [ "$status" -eq 0 ]
  [ -s "$OUT_DIR/dig.mp4" ]
}
