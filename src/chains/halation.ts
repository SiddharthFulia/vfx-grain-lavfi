import { num } from '../composeChain.js';

export interface HalationOpts {
  intensity?: number;
  threshold?: number;
  blur?: number;
}

export function halation(opts: HalationOpts = {}): string {
  const i = opts.intensity ?? 0.35;
  const t = opts.threshold ?? 0.78;
  const b = opts.blur ?? 12;
  return [
    `split=2[base][hl]`,
    `[hl]lumakey=threshold=${num(t)}:tolerance=0.12,boxblur=${b}:1,colorchannelmixer=rr=1.0:gg=0.55:bb=0.35[bloom]`,
    `[base][bloom]blend=all_mode=screen:all_opacity=${num(i)}`,
    `format=yuv420p`,
  ].join(';');
}
