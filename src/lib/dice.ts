import type { Dice } from "../components/models.ts";

export const rnd = (d: number): number => Math.ceil(Math.random() * d);

export const roll = (d: Dice): number[] => {
  const dv = d.split(/(d|D)/);
  if (dv.length != 2) throw new Error("Invalid dice string");

  const n = +dv[0]!;
  const s = +dv[1]!;

  const r = [];
  for (let i = 0; i < n; i++) {
    r.push(rnd(s));
  }
  return r;
};
