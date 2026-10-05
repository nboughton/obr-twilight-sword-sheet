import { acceptHMRUpdate, defineStore } from "pinia";
import { Character, CharacterStore } from "../components/models.ts";
import { create } from "../lib/create.ts";

export const useCharacterStore = defineStore("character", {
  state: () => ({
    characters: [],
    config: {
      char: 0,
    },
  } as CharacterStore),

  getters: {
    char: (state): Character => state.characters[state.config.char] as Character,
  },

  actions: {
    new() {
      this.characters.push(create.character());
      this.config.char = this.characters.length - 1;
    },
  },
  persist: true,
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCharacterStore, import.meta.hot));
}
