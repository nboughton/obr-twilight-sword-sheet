import { acceptHMRUpdate, defineStore } from "pinia";
import { Armour, Character, CharacterStore } from "../components/models.ts";
import { create } from "../lib/create.ts";
import { exportFile } from "quasar";

export const useCharacterStore = defineStore("character", {
  state: () => ({
    characters: [],
    config: {
      char: 0,
      durability: false,
      dark: true,
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
