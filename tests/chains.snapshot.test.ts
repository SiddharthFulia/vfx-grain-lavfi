import { describe, it, expect } from 'vitest';
import {
  kodakVision3,
  super16,
  super8,
  cleanDigital,
} from '../src/chains/grain.js';
import { halation } from '../src/chains/halation.js';
import { aberration as ca } from '../src/chains/aberration.js';
import {
  vignette,
  gateWeave,
  lensBreathing,
} from '../src/chains/vignette.js';
import {
  bleachBypass,
  tealOrange,
  desaturate,
  applyLut,
} from '../src/chains/grade.js';

describe('grain chains', () => {
  it('kodakVision3 defaults', () => {
    expect(kodakVision3()).toMatchInlineSnapshot(
      `"split=2[a][b];[a]curves=master='0/0.02 0.5/0.5 1/0.96',noise=alls=8:allf=t+u,eq=saturation=1.05:gamma_r=1.02:gamma_b=0.98[base];[b]lumakey=threshold=0.78:tolerance=0.1,boxblur=10:1,colorchannelmixer=rr=1.0:gg=0.6:bb=0.45[halo];[base][halo]blend=all_mode=screen:all_opacity=0.35;format=yuv420p"`,
    );
  });

  it('kodakVision3 custom grain', () => {
    expect(kodakVision3({ grainStrength: 12, halationOpacity: 0.5 })).toContain(
      'noise=alls=12:allf=t+u',
    );
  });

  it('super16 defaults', () => {
    expect(super16()).toMatchInlineSnapshot(
      `"curves=blue='0/0.04 0.5/0.5 1/0.95':red='0/0 0.5/0.48 1/1',noise=alls=14:allf=t+u,eq=saturation=0.95:contrast=1.05,unsharp=3:3:-0.4:3:3:0.0,format=yuv420p"`,
    );
  });

  it('super8 defaults', () => {
    expect(super8()).toMatchInlineSnapshot(
      `"scale=iw*0.55:ih*0.55:flags=neighbor,scale=iw/0.55:ih/0.55:flags=bilinear,colorchannelmixer=rr=1.08:gg=1.0:bb=0.88,noise=alls=26:allf=t+u,gblur=sigma=0.6,curves=master='0/0.08 0.4/0.45 1/0.92',eq=saturation=0.92,format=yuv420p"`,
    );
  });

  it('cleanDigital halves chroma noise', () => {
    expect(cleanDigital({ grainStrength: 10 })).toContain(
      'noise=c0s=10:c0f=t+u:c1s=5:c1f=t:c2s=5:c2f=t',
    );
  });
});

describe('halation', () => {
  it('default chain matches bash', () => {
    expect(halation()).toMatchInlineSnapshot(
      `"split=2[base][hl];[hl]lumakey=threshold=0.78:tolerance=0.12,boxblur=12:1,colorchannelmixer=rr=1.0:gg=0.55:bb=0.35[bloom];[base][bloom]blend=all_mode=screen:all_opacity=0.35;format=yuv420p"`,
    );
  });
});

describe('aberration', () => {
  it('default shift=2', () => {
    expect(ca()).toMatchInlineSnapshot(
      `"format=gbrp,rgbashift=rh=2:rv=0:gh=0:gv=0:bh=-2:bv=0,format=yuv420p"`,
    );
  });

  it('honours custom shift', () => {
    expect(ca({ shift: 4 })).toContain('rh=4');
    expect(ca({ shift: 4 })).toContain('bh=-4');
  });
});

describe('vignette & friends', () => {
  it('vignette defaults', () => {
    expect(vignette()).toMatchInlineSnapshot(
      `"vignette=angle=PI/5:mode=forward:eval=init,format=yuv420p"`,
    );
  });

  it('gateWeave default amplitude', () => {
    expect(gateWeave()).toMatchInlineSnapshot(
      `"pad=iw+2*2:ih+2*2:2:2:black,crop=iw-2*2:ih-2*2:'2+2*sin(n/3)':'2+2*cos(n/5)',format=yuv420p"`,
    );
  });

  it('lensBreathing default', () => {
    expect(lensBreathing()).toMatchInlineSnapshot(
      `"zoompan=z='1+0.01*sin(2*PI*on/120)':d=1:s=iw:s=ih:fps=25,format=yuv420p"`,
    );
  });
});

describe('grade', () => {
  it('bleachBypass', () => {
    expect(bleachBypass()).toMatchInlineSnapshot(
      `"split=2[a][b];[a]eq=saturation=0.25:contrast=1.35,curves=master='0/0.05 0.25/0.18 0.75/0.85 1/0.92'[base];[b]hue=s=0,curves=master='0/0 0.5/0.5 1/1'[silver];[base][silver]blend=all_mode=softlight:all_opacity=0.55;format=yuv420p"`,
    );
  });

  it('tealOrange default saturation = 1.18', () => {
    expect(tealOrange()).toContain('eq=saturation=1.18');
  });

  it('desaturate default', () => {
    expect(desaturate()).toMatchInlineSnapshot(
      `"eq=saturation=0.7:contrast=1.02:brightness=-0.02,format=yuv420p"`,
    );
  });

  it('applyLut emits lut3d', () => {
    expect(applyLut({ file: 'foo.cube' })).toBe(
      "lut3d=file='foo.cube':interp=tetrahedral,format=yuv420p",
    );
  });
});
