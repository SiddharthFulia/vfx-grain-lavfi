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

@test "halation.sh exits 0" {
  run "$ROOT/scripts/halation.sh" "$IN" "$OUT_DIR/h.mp4"
  [ "$status" -eq 0 ]
  [ -s "$OUT_DIR/h.mp4" ]
}

@test "chromatic-aberration.sh exits 0" {
  run "$ROOT/scripts/chromatic-aberration.sh" "$IN" "$OUT_DIR/ca.mp4"
  [ "$status" -eq 0 ]
  [ -s "$OUT_DIR/ca.mp4" ]
}

@test "vignette.sh exits 0" {
  run "$ROOT/scripts/vignette.sh" "$IN" "$OUT_DIR/v.mp4"
  [ "$status" -eq 0 ]
  [ -s "$OUT_DIR/v.mp4" ]
}

@test "bleach-bypass.sh exits 0" {
  run "$ROOT/scripts/bleach-bypass.sh" "$IN" "$OUT_DIR/b.mp4"
  [ "$status" -eq 0 ]
  [ -s "$OUT_DIR/b.mp4" ]
}

@test "teal-orange.sh exits 0" {
  run "$ROOT/scripts/teal-orange.sh" "$IN" "$OUT_DIR/to.mp4"
  [ "$status" -eq 0 ]
  [ -s "$OUT_DIR/to.mp4" ]
}

@test "stack-cinematic.sh exits 0" {
  run "$ROOT/scripts/stack-cinematic.sh" "$IN" "$OUT_DIR/cine.mp4"
  [ "$status" -eq 0 ]
  [ -s "$OUT_DIR/cine.mp4" ]
}
