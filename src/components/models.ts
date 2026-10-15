export interface CharacterStore {
  characters: Character[];
  config: {
    char: number;
    durability: boolean;
  };
}

export type Dice = `${number}${"d" | "D"}${2 | 3 | 4 | 6 | 8 | 10 | 12 | 20}`;

export const isDice = (v: unknown): v is Dice => {
  return typeof v == "string" && /^\d+[dD](2|3|4|6|8|10|12|20)$/.test(v);
};

export const elements = {
  Fire: "Fire",
  Ice: "Ice",
  Wind: "Wind",
  Earth: "Earth",
  Thunder: "Thunder",
  Water: "Water",
  Darkness: "Darkness",
  Light: "Light",
} as const;

export type Element = keyof typeof elements;

export interface Affinity {
  weak: Element;
  resist?: Element;
}

export const elAffinities: Record<Element, Affinity> = {
  Fire: { weak: "Water", resist: "Ice" },
  Ice: { weak: "Fire", resist: "Wind" },
  Wind: { weak: "Ice", resist: "Earth" },
  Earth: { weak: "Wind", resist: "Thunder" },
  Thunder: { weak: "Earth", resist: "Water" },
  Water: { weak: "Thunder", resist: "Fire" },
  Darkness: { weak: "Light" },
  Light: { weak: "Darkness" },
};

export interface Character {
  id: string;
  bio: {
    name: string;
    kin: string;
    origin: string;
    way: string;
  };
  boon: boolean;
  hope: number;
  hearts: MaxCur;
  stamina: MaxCur;

  abilities: Record<AblLong, number>;
  statuses: Record<Status, boolean>;

  zin: {
    green: number; // copper
    blue: number; // silver
    red: number; // gold
  };

  inventory: Item[];
  feats: Feat[];
}

export const abilities = {
  STR: "Strength",
  AGL: "Agility",
  VIT: "Vitality",
  PER: "Perception",
  WIL: "Will",
  KNO: "Knowledge",
  CHA: "Charisma",
  STE: "Stealth",
} as const;

export type AblShort = keyof typeof abilities;
export type AblLong = (typeof abilities)[keyof typeof abilities];

export const statuses = {
  POISON: "At the beginning of your Turn, make a Vitality roll. If you fail, you take 1D4 damage.",
  STUN:
    "At the beginning of your Turn, make a Vitality roll. If you fail you are paralyzed and skip your Turn.",
  CONFUSION: "You have Disadvantage on KNO and STE.",
  WOUND: "You have Disadvantage on STR and AGL.",
  FEAR: "You have Disadvantage on WIL and CHA.",
  FREEZE: "You can't take reactions, and you need to dash to move.",
  BLIND: "You have Disadvantage on PER and to all rolls to attack or dodge.",
  SILENCE: "You can't speak, and you can't cast spells.",
  BURN: "At the beginning of your Turn, take 1 damage.",
  KO:
    "You can't act or walk by yourself, you can't use feats or spells, and you automatically fail every roll.",
} as const;

export type Status = keyof typeof statuses;

export const StatusIcon: Record<Status, { icon: string; colour: string }> = {
  POISON: { icon: "mdi-chart-bubble", colour: "green-9" },
  STUN: { icon: "mdi-flash", colour: "yellow-9" },
  CONFUSION: { icon: "mdi-head-question", colour: "blue-9" },
  WOUND: { icon: "mdi-liquid-spot", colour: "red" },
  FEAR: { icon: "mdi-head-alert", colour: "purple-5" },
  FREEZE: { icon: "mdi-snowflake", colour: "blue-5" },
  BLIND: { icon: "mdi-eye-off", colour: "green-5" },
  SILENCE: { icon: "mdi-chat-processing", colour: "pink" },
  BURN: { icon: "mdi-fire", colour: "orange" },
  KO: { icon: "mdi-skull", colour: "purple-9" },
} as const;

export const ranges = {
  "Self": "Self",
  "Close": "Close",
  "Near": "Near",
  "Far": "Far",
} as const;

export type Range = keyof typeof ranges;

export type Item = InvItem | Weapon | Armour;

export const itemClasses = {
  "item": "item",
  "weapon": "weapon",
  "armour": "armour",
} as const;

export type ItemClass = keyof typeof itemClasses;

export interface ItemBase {
  id: string;
  name: string;
  class: ItemClass;
  desc: string;
  slot: number;
}

export interface InvItem extends ItemBase {
  class: "item";
}

export const wpnTags = {
  "ACCURATE":
    "Gain +1 to your attack rolls with this weapon. This also applies to arcane missiles.",
  "ARCANE":
    "This weapon can be used as a ranged weapon to shoot arcane missiles rolling Knowledge. Arcane missiles reach up to Far and deal 1D4 damage.",
  "BOOMERANG": "When thrown it always comes back unless you score a critical failure.",
  "DEFENSIVE": "Gain +1 to parry rolls with this weapon.",
  "ELEMENTAL":
    "This weapon deals +1D4 elemental damage. This also applies to arcane missiles. See page 103.",
  "FINESSE": "You can roll Agility to attack with this weapon.",
  "HEAVY":
    "Deals double damage to objects. One equipped heavy weapon counts as two equipped weapons.",
  "MAGIC": "This weapon can cast spells. See page 101.",
  "SMALL":
    "Easy to hide. Cannot parry. Two equipped small weapons of the same type count as one equipped weapon. Small ranged weapons ignore Disadvantage when shooting Close.",
  "THROWN":
    "Can be thrown within Near rolling Strength. When you throw a finesse weapon roll Agility. You need an action to retrieve a thrown weapon.",
  "TWO-HANDED": "Must be used with two hands.",
  "VERSATILE": "When used with both hands it counts as a two-handed weapon and deals +1 damage.",
} as const;

export type WpnTag = keyof typeof wpnTags;

export type DmgMod = `+${Dice | number}`;

export type Dmg = `${Dice}${DmgMod | ""}`;

export const isDmgStr = (v: unknown): boolean => {
  return typeof v == "string" &&
    /^\d+[dD](2|3|4|6|8|10|12|20)(?:|\+\d+(|[dD](2|3|4|6|8|10|12|20)))$/.test(v);
};

export interface Weapon extends ItemBase {
  class: "weapon";
  type: "M" | "R" | "S";
  equipped: boolean;
  tags: WpnTag[];
  range: Range;
  element?: Element;
  durability?: number;
  damage: Dmg;
}

export const armourTypes = {
  "Clothing": "Clothing",
  "Light": "Light",
  "Medium": "Medium",
  "Heavy": "Heavy",
} as const;

export type ArmourType = keyof typeof armourTypes;

export interface Armour extends ItemBase {
  class: "armour";
  type: ArmourType;
  penalty: AblShort[];
  equipped: boolean;
  // Can probably just put these in the .desc field
  // resist: (Element | "HOT 1" | "HOT 2" | "COLD 1" | "COLD 2")[];
  // immune: Element[];
  value: number;
}

export interface Feat {
  name: string;
  text: string;
}

export type Duration =
  | "Instant"
  | `${number} Round${"s" | ""}`
  | `${Dice} Rounds`
  | "Until time passes";

export interface Spell extends Feat {
  roll: AblShort | "-";
  range: Range;
  duration: Duration;
}

export interface MaxCur {
  max: number;
  cur: number;
}
