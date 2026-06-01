export interface AberrationOpts {
  shift?: number;
}

export function aberration(opts: AberrationOpts = {}): string {
  const s = opts.shift ?? 2;
  return [
    `format=gbrp`,
    `rgbashift=rh=${s}:rv=0:gh=0:gv=0:bh=-${s}:bv=0`,
    `format=yuv420p`,
  ].join(',');
}
