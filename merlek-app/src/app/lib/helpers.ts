// https://github.com/chrokh/fp-games/blob/master/001-snake/base.js

export const adjust = (n: any) => (f: (arg0: any) => void) => (xs: any) =>
  mapi((x: any) => (i: any) => (i === n ? f(x) : x))(xs);

export const dropFirst = (xs: { slice: (arg0: number) => void }) => xs.slice(1);

export const dropLast = (xs: {
  slice: (arg0: number, arg1: number) => void;
  length: number;
}) => xs.slice(0, xs.length - 1);

export const id = (x: any) => x;

export const k = (x: any) => (y: any) => x;

export const map = (f: (y: any) => any) => (xs: { map: (arg0: any) => void }) =>
  xs.map(f);

export const mapi = (f: {
  (x: any): (i: any) => any;
  (arg0: any): (arg0: any) => void;
}) => (xs: { map: (arg0: (x: any, i: any) => any) => void }) =>
  xs.map((x: any, i: any) => f(x)(i));

export const merge = (o1: any) => (o2: any) => Object.assign({}, o1, o2);

export const mod = (x: number) => (y: number) => ((y % x) + x) % x; // http://bit.ly/2oF4mQ7

export const objOf = (key: string) => (v: any) => ({ [key]: v });

export const pipe = (...fns: any[]) => (x: any) =>
  [...fns].reduce((acc, f) => f(acc), x);

export const prop = (key: string | number) => (o: { [x: string]: any }) =>
  o[key];

export const range = (n: number) => (m: number) =>
  Array.apply(null, Array(m - n)).map((_: any, i: number) => n + i);

export const rep = (c: any) => (n: any) => map(k(c))(range(0)(n));

export const rnd = (min: number) => (max: number) =>
  Math.floor(Math.random() * max) + min;

export const spec = (o: { [x: string]: (arg0: any) => void }) => (x: any) =>
  Object.keys(o)
    .map(key => objOf(key)(o[key](x)))
    .reduce((acc, o2) => Object.assign(acc, o2));
