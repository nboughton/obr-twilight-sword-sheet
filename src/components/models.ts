export interface CharacterStore {
  characters: Character[];
  config: {
    char: number;
    durability: boolean;
    dark: boolean;
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

export const elIcon: Record<Element, { icon: string; colour: string }> = {
  Fire: { icon: "mdi-fire", colour: "red" },
  Ice: { icon: "mdi-snowflake", colour: "blue" },
  Wind: { icon: "mdi-weather-windy", colour: "green" },
  Earth: { icon: "mdi-grass", colour: "brown" },
  Thunder: { icon: "mdi-flash", colour: "yellow-9" },
  Water: { icon: "mdi-water", colour: "blue" },
  Darkness: { icon: "mdi-moon-waxing-crescent", colour: "grey-9" },
  Light: { icon: "mdi-brightness-7", colour: "grey-6" },
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

  attributes: Record<AttrLong, number>;
  statuses: Record<Status, boolean>;

  zin: {
    green: number; // copper
    blue: number; // silver
    red: number; // gold
  };

  inventory: Item[];
  invMod: number;
  feats: ClassAbility[];
}

export const attributes = {
  STR: "Strength",
  AGL: "Agility",
  VIT: "Vitality",
  PER: "Perception",
  WIL: "Will",
  KNO: "Knowledge",
  CHA: "Charisma",
  STE: "Stealth",
} as const;

export type AttrShort = keyof typeof attributes;
export type AttrLong = (typeof attributes)[keyof typeof attributes];

export const statuses = {
  POISON: "On your Turn start, roll VIT. If you fail, take 1D4 dmg",
  STUN: "On your Turn start, roll VIT. If you fail skip your Turn",
  CONFUSION: "Disadvantage on KNO and STE",
  WOUND: "Disadvantage on STR and AGL",
  FEAR: "Disadvantage on WIL and CHA",
  FREEZE: "Can't take reactions, and you need to dash to move",
  BLIND: "Disadvantage on PER, attack, and dodge",
  SILENCE: "Can't speak, and can't cast spells",
  BURN: "On your Turn start, take 1 dmg",
  KO: "Can't act or walk by yourself, can't use feats or spells, auto-fail every roll",
} as const;

export type Status = keyof typeof statuses;

export const StatusIcon: Record<Status, { icon: string; colour: string }> = {
  POISON: { icon: "mdi-chart-bubble", colour: "green-4" },
  STUN: { icon: "mdi-flash", colour: "yellow-4" },
  CONFUSION: { icon: "mdi-head-question", colour: "blue-4" },
  WOUND: { icon: "mdi-liquid-spot", colour: "red-4" },
  FEAR: { icon: "mdi-head-alert", colour: "purple-3" },
  FREEZE: { icon: "mdi-snowflake", colour: "blue-3" },
  BLIND: { icon: "mdi-eye-off", colour: "green-3" },
  SILENCE: { icon: "mdi-chat-processing", colour: "pink-3" },
  BURN: { icon: "mdi-fire", colour: "orange-4" },
  KO: { icon: "mdi-skull", colour: "purple-4" },
} as const;

export const ranges = {
  "Self": "Self",
  "Close": "Close",
  "Near": "Near",
  "Far": "Far",
} as const;

export type Range = keyof typeof ranges;

export type Item = MiscItem | Weapon | Armour;

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
  attuned?: boolean;
  equipped: boolean;
  desc: string;
  slot: number;
}

export interface MiscItem extends ItemBase {
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

// Type: Icon
export const wpnTypes = {
  "Melee": "mdi-sword",
  "Ranged": "mdi-bow-arrow",
  "Shield": "mdi-shield",
} as const;

export type WpnType = keyof typeof wpnTypes;

export interface Weapon extends ItemBase {
  class: "weapon";
  type: WpnType;
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
  penalty: AttrShort[];
  // Can probably just put these in the .desc field
  // resist: (Element | "HOT 1" | "HOT 2" | "COLD 1" | "COLD 2")[];
  // immune: Element[];
  value: number;
}

export const rests = {
  "Short": "Short",
  "Long": "Long",
} as const;

export type Rest = keyof typeof rests | "-";

export interface ClassAbilityBase {
  type: "feat" | "spell";
  per: Rest;
  expended?: boolean;
  name: string;
  text: string;
}

export interface Feat extends ClassAbilityBase {
  type: "feat";
}

export type Duration =
  | "Instant"
  | `${number} Round${"s" | ""}`
  | `${Dice} Rounds`
  | "Until time passes";

export interface Spell extends ClassAbilityBase {
  type: "spell";
  roll: AttrShort | "-";
  range: Range;
  duration: string;
}

export type ClassAbility = Feat | Spell;

export interface MaxCur {
  max: number;
  cur: number;
}
