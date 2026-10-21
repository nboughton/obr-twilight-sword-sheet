import { acceptHMRUpdate, defineStore } from "pinia";
import { Armour, Character, CharacterStore, Dice, Status, statuses } from "../components/models.ts";
import { create } from "../lib/create.ts";
import { exportFile, Notify } from "quasar";
import { sum } from "../lib/misc.ts";
import { roll } from "../lib/dice.ts";

export const useCharacterStore = defineStore("character", {
  state: () => ({
    characters: [],
    config: {
      char: 0,
      durability: false,
      dark: false,
    },
  } as CharacterStore),

  getters: {
    char: (state): Character => state.characters[state.config.char] as Character,
    armour: (state): Armour | undefined =>
      state.characters[state.config.char]?.inventory.find((i) =>
        i.class == "armour" && i.equipped
      ) as Armour | undefined,
  },

  actions: {
    newChar() {
      this.characters.push(create.character());
      this.config.char = this.characters.length - 1;
    },
    removeChar(index: number) {
      if (this.characters.length > 1) {
        this.characters.splice(index, 1);
        this.config.char = this.characters.length - 1;
      }
    },
    recover(t: "hearts" | "stamina", d: Dice) {
      const n = sum(roll(d));
      const cur = +this.char[t].cur;
      const max = +this.char[t].max;

      Notify.create({
        message: `${(n + cur) <= max ? n : "full"} ${t} recovered`,
        color: `${t == "hearts" ? "red" : "blue"}`,
        position: "top",
      });

      if (cur + n > max) this.char[t].cur = max;
      else this.char[t].cur = +cur + +n;
      this.char.feats.filter((a) => a.per == "Short").forEach((b) => b.expended = false);
    },
    fullRecover() {
      for (const v of ["hearts", "stamina"]) {
        const max = this.char[v as "hearts" | "stamina"].max;
        this.char[v as "hearts" | "stamina"].cur = max;
      }
      this.char.feats.filter((a) => a.per == "Long").forEach((b) => b.expended = false);
    },
    clearStatusEffects() {
      for (const s of Object.keys(statuses)) this.char.statuses[s as Status] = false;
    },

    exportData() {
      const now = new Date();
      exportFile(
        `TwilightSwordCharacters-${now.getFullYear()}-${now.getMonth()}-${now.getDate()}.json`,
        JSON.stringify({
          characters: this.characters,
          config: this.config,
        }),
      );
    },

    loadData(d: CharacterStore) {
      //if (d satisfies DBStore) {
      this.config = d.config;
      d.characters.forEach((lChar) => {
        let overwrite = false;
        this.characters.forEach((sChar, idx) => {
          if (sChar.id == lChar.id) {
            this.characters[idx] = lChar;
            overwrite = true;
            return;
          }
        });
        if (!overwrite) this.characters.push(lChar);
      });
    },
  },
  persist: true,
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCharacterStore, import.meta.hot));
}
