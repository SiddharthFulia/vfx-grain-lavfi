import { num } from '../composeChain.js';

export interface KodakVision3Opts {
  grainStrength?: number;
  halationOpacity?: number;
}

export function kodakVision3(opts: KodakVision3Opts = {}): string {
  const g = opts.grainStrength ?? 8;
  const op = opts.halationOpacity ?? 0.35;
  return [
    `split=2[a][b]`,
    `[a]curves=master='0/0.02 0.5/0.5 1/0.96',noise=alls=${g}:allf=t+u,eq=saturation=1.05:gamma_r=1.02:gamma_b=0.98[base]`,
    `[b]lumakey=threshold=0.78:tolerance=0.1,boxblur=10:1,colorchannelmixer=rr=1.0:gg=0.6:bb=0.45[halo]`,
    `[base][halo]blend=all_mode=screen:all_opacity=${num(op)}`,
    `format=yuv420p`,
  ].join(';');
}

export interface Super16Opts {
  grainStrength?: number;
}

export function super16(opts: Super16Opts = {}): string {
  const g = opts.grainStrength ?? 14;
  return [
    `curves=blue='0/0.04 0.5/0.5 1/0.95':red='0/0 0.5/0.48 1/1'`,
    `noise=alls=${g}:allf=t+u`,
    `eq=saturation=0.95:contrast=1.05`,
    `unsharp=3:3:-0.4:3:3:0.0`,
    `format=yuv420p`,
  ].join(',');
}

export interface Super8Opts {
  grainStrength?: number;
}

export function super8(opts: Super8Opts = {}): string {
  const g = opts.grainStrength ?? 26;
  return [
    `scale=iw*0.55:ih*0.55:flags=neighbor`,
    `scale=iw/0.55:ih/0.55:flags=bilinear`,
    `colorchannelmixer=rr=1.08:gg=1.0:bb=0.88`,
    `noise=alls=${g}:allf=t+u`,
    `gblur=sigma=0.6`,
    `curves=master='0/0.08 0.4/0.45 1/0.92'`,
    `eq=saturation=0.92`,
    `format=yuv420p`,
  ].join(',');
}

export interface CleanDigitalOpts {
  grainStrength?: number;
}

export function cleanDigital(opts: CleanDigitalOpts = {}): string {
  const g = opts.grainStrength ?? 5;
  const half = Math.floor(g / 2);
  return [
    `noise=c0s=${g}:c0f=t+u:c1s=${half}:c1f=t:c2s=${half}:c2f=t`,
    `format=yuv420p`,
  ].join(',');
}
