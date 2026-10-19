import { abilities, type AblLong, type AblShort } from "../components/models.ts";

export const short = (v: AblLong): AblShort => {
  for (const key of Object.keys(abilities) as (keyof typeof abilities)[]) {
    if (abilities[key] == v) return key;
  }
  return "STR";
};

export const long = (v: AblShort): AblLong => abilities[v];
