<template>
  <div class="row full-width justify-between">
    <div class="col-xs-3 col-md q-pa-xs" v-for="(_, name, i) in app.char.attributes" :key="name">
      <attribute-pill v-model="app.char.attributes[name]" :name="name"
        :disadvantage="disadv(short(name))" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { AttrShort } from "./models";

import { useCharacterStore } from "@/stores/character-store";
import { short } from "@/lib/misc";

import AttributePill from "./AttributePill.vue";

const app = useCharacterStore();

const disadv = (attr: AttrShort): boolean => {
  if (app.armour?.penalty.includes(attr)) return true;

  switch (attr) {
    case "STR":
      if (app.char.statuses.WOUND) return true;
      break;
    case "AGL":
      if (app.char.statuses.WOUND) return true;
      break;
    case "PER":
      if (app.char.statuses.BLIND) return true;
      break;
    case "WIL":
      if (app.char.statuses.FEAR) return true;
      break;
    case "KNO":
      if (app.char.statuses.CONFUSION) return true;
      break;
    case "CHA":
      if (app.char.statuses.FEAR) return true;
      break;
    case "STE":
      if (app.char.statuses.CONFUSION) return true;
      break;
  }
  return false;
};
</script>
