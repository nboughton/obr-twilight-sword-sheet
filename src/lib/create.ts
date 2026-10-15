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
    stamina: { max: 3, cur: 3 },
    abilities: {
      Strength: 0,
      Agility: 0,
      Vitality: 0,
      Perception: 0,
      Will: 0,
      Knowledge: 0,
      Charisma: 0,
      Stealth: 0,
    },
    statuses: {
      POISON: false,
      STUN: false,
      CONFUSION: false,
      WOUND: false,
      FEAR: false,
      FREEZE: false,
      BLIND: false,
      SILENCE: false,
      BURN: false,
      KO: false,
    },
    zin: {
      green: 0,
      blue: 0,
      red: 0,
    },
    inventory: [],
    feats: [],
  }),

  item: (itemClass: ItemClass): Item => {
    const item = {
      id: uid(),
      name: "",
      class: itemClass,
      desc: "",
      slot: 1,
    };

    switch (itemClass) {
      case "weapon":
        return {
          ...item,
          type: "M",
          equipped: false,
          tags: [],
          range: "Close",
          damage: "1d8",
        } as Weapon;

      case "armour":
        return {
          ...item,
          type: "Clothing",
          penalty: [],
          value: 0,
          equipped: false,
        } as Armour;

      default:
        return item as Item;
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
