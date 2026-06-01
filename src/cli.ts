#!/usr/bin/env node
import {
  composeChain,
  kodakVision3,
  super16,
  super8,
  cleanDigital,
  halation,
  vignette,
  aberration,
  tealOrange,
  bleachBypass,
  desaturate,
} from './index.js';

type Stock = 'kodak' | 'super16' | 'super8' | 'digital';

interface Args {
  stock?: Stock;
  halation?: number;
  vignette?: boolean;
  ca?: number;
  grade?: 'teal-orange' | 'bleach' | 'mute';
}

function parse(argv: string[]): Args {
  const a: Args = {};
  for (let i = 0; i < argv.length; i++) {
    const k = argv[i];
    const v = argv[i + 1];
    if (k === '--stock' && v) {
      a.stock = v as Stock;
      i++;
    } else if (k === '--halation' && v) {
      a.halation = Number(v);
      i++;
    } else if (k === '--vignette') {
      a.vignette = true;
    } else if (k === '--ca' && v) {
      a.ca = Number(v);
      i++;
    } else if (k === '--grade' && v) {
      a.grade = v as Args['grade'];
      i++;
    }
  }
  return a;
}

function stockChain(s: Stock | undefined): string {
  switch (s) {
    case 'kodak':
      return kodakVision3();
    case 'super16':
      return super16();
    case 'super8':
      return super8();
    case 'digital':
      return cleanDigital();
    default:
      return '';
  }
}

function gradeChain(g: Args['grade']): string {
  switch (g) {
    case 'teal-orange':
      return tealOrange();
    case 'bleach':
      return bleachBypass();
    case 'mute':
      return desaturate();
    default:
      return '';
  }
}

function main(): void {
  const [cmd, ...rest] = process.argv.slice(2);
  if (cmd !== 'build') {
    process.stderr.write(
      'usage: vfx-grain-lavfi build --stock <kodak|super16|super8|digital> ' +
        '[--grade teal-orange|bleach|mute] [--halation N] [--vignette] [--ca N]\n',
    );
    process.exit(1);
  }
  const args = parse(rest);
  const parts: string[] = [];
  parts.push(gradeChain(args.grade));
  parts.push(stockChain(args.stock));
  if (args.halation !== undefined) parts.push(halation({ intensity: args.halation }));
  if (args.ca !== undefined) parts.push(aberration({ shift: args.ca }));
  if (args.vignette) parts.push(vignette());
  process.stdout.write(composeChain(parts) + '\n');
}

main();
