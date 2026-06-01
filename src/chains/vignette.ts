export interface VignetteOpts {
  angle?: string;
  mode?: 'forward' | 'backward';
}

export function vignette(opts: VignetteOpts = {}): string {
  const a = opts.angle ?? 'PI/5';
  const m = opts.mode ?? 'forward';
  return [
    `vignette=angle=${a}:mode=${m}:eval=init`,
    `format=yuv420p`,
  ].join(',');
}

export interface GateWeaveOpts {
  amplitude?: number;
}

export function gateWeave(opts: GateWeaveOpts = {}): string {
  const a = opts.amplitude ?? 2;
  return [
    `pad=iw+2*${a}:ih+2*${a}:${a}:${a}:black`,
    `crop=iw-2*${a}:ih-2*${a}:'${a}+${a}*sin(n/3)':'${a}+${a}*cos(n/5)'`,
    `format=yuv420p`,
  ].join(',');
}

export interface LensBreathingOpts {
  amount?: number;
  period?: number;
}

export function lensBreathing(opts: LensBreathingOpts = {}): string {
  const amt = opts.amount ?? 0.01;
  const per = opts.period ?? 120;
  return [
    `zoompan=z='1+${amt}*sin(2*PI*on/${per})':d=1:s=iw:s=ih:fps=25`,
    `format=yuv420p`,
  ].join(',');
}
