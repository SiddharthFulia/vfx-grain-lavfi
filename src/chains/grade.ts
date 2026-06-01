import { num } from '../composeChain.js';

export function bleachBypass(): string {
  return [
    `split=2[a][b]`,
    `[a]eq=saturation=0.25:contrast=1.35,curves=master='0/0.05 0.25/0.18 0.75/0.85 1/0.92'[base]`,
    `[b]hue=s=0,curves=master='0/0 0.5/0.5 1/1'[silver]`,
    `[base][silver]blend=all_mode=softlight:all_opacity=0.55`,
    `format=yuv420p`,
  ].join(';');
}

export interface TealOrangeOpts {
  strength?: number;
}

export function tealOrange(opts: TealOrangeOpts = {}): string {
  const s = opts.strength ?? 0.6;
  const sat = 1.0 + 0.3 * s;
  return [
    `curves=red='0/0 0.4/0.42 0.7/0.78 1/1':blue='0/0.08 0.4/0.46 0.7/0.62 1/0.9'`,
    `eq=saturation=${num(sat)}:contrast=1.05`,
    `format=yuv420p`,
  ].join(',');
}

export interface DesaturateOpts {
  saturation?: number;
}

export function desaturate(opts: DesaturateOpts = {}): string {
  const s = opts.saturation ?? 0.7;
  return [
    `eq=saturation=${num(s)}:contrast=1.02:brightness=-0.02`,
    `format=yuv420p`,
  ].join(',');
}

export interface LutOpts {
  file: string;
  interp?: 'nearest' | 'trilinear' | 'tetrahedral';
}

export function applyLut(opts: LutOpts): string {
  const interp = opts.interp ?? 'tetrahedral';
  return `lut3d=file='${opts.file}':interp=${interp},format=yuv420p`;
}
