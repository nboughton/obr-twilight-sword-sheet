import { attributes, type AttrLong, type AttrShort } from "../components/models.ts";

export const short = (v: AttrLong): AttrShort => {
  for (const key of Object.keys(attributes) as (keyof typeof attributes)[]) {
    if (attributes[key] == v) return key;
  }
  return "STR";
};

export const long = (v: AttrShort): AttrLong => attributes[v];

export const sum = (n: number[]): number => {
  let t = 0;
  for (const i of n) t += i;
  return t;
};
