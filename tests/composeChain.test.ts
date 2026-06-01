import { describe, it, expect } from 'vitest';
import { composeChain, num } from '../src/composeChain.js';

describe('composeChain', () => {
  it('joins parts with commas', () => {
    expect(composeChain(['eq=saturation=0.9', 'format=yuv420p'])).toBe(
      'eq=saturation=0.9,format=yuv420p',
    );
  });

  it('drops empty entries', () => {
    expect(composeChain(['a=1', '', '   ', 'b=2'])).toBe('a=1,b=2');
  });

  it('strips trailing commas from each part', () => {
    expect(composeChain(['a=1,', 'b=2,,'])).toBe('a=1,b=2');
  });

  it('returns empty string for all-empty input', () => {
    expect(composeChain(['', '   '])).toBe('');
  });
});

describe('num', () => {
  it('keeps integers integer', () => {
    expect(num(5)).toBe('5');
  });

  it('trims trailing zeros', () => {
    expect(num(0.5)).toBe('0.5');
    expect(num(0.35)).toBe('0.35');
  });

  it('respects digit cap', () => {
    expect(num(0.123456, 3)).toBe('0.123');
  });

  it('handles common saturation 1.18', () => {
    expect(num(1.18)).toBe('1.18');
  });
});
