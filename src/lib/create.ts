import { uid } from "quasar";
import { Armour, Character, Feat, Item, ItemClass, Spell, Weapon } from "../components/models.ts";

export const create = {
  character: (): Character => ({
    id: uid(),
    bio: {
      name: "New Character",
      kin: "",
      origin: "",
      way: "",
    },
    boon: false,
    hope: 1,
    hearts: { max: 0, cur: 0 },
    stamina: { max: 0, cur: 0 },
    abilities: {
      "Strength": 0,
      "Agility": 0,
      "Vitality": 0,
      "Perception": 0,
      "Will": 0,
      "Knowledge": 0,
      "Charisma": 0,
      "Stealth": 0,
    },
    statuses: {
      "POISON": false,
      "STUN": false,
      "CONFUSION": false,
      "WOUND": false,
      "FEAR": false,
      "FREEZE": false,
      "BLIND": false,
      "SILENCE": false,
      "BURN": false,
      "K.O.": false,
    },
    zin: {
      green: 0,
      blue: 0,
      red: 0,
    },
    inventory: [],
    feats: [],
  }),

  item: (itemClass: ItemClass): Item | Weapon | Armour => {
    const item: Item = {
      id: uid(),
      name: "",
      class: itemClass,
      desc: "",
      slot: 1,
    };

    switch (itemClass) {
      case "weapon":
        return Object.assign(item, {
          type: "M",
          equipped: false,
          tags: [],
          damage: "1d8",
        }) as Weapon;
      case "armour":
        return Object.assign(item, {
          type: "Clothing",
          penalty: [],
          value: 0,
        }) as Armour;
      default:
        return item;
    }
  },

  feat: (): Feat => ({
    name: "",
    text: "",
  }),

  spell: (): Spell => ({
    name: "",
    text: "",
    roll: "-",
    range: "Self",
    duration: "Instant",
  }),
};
