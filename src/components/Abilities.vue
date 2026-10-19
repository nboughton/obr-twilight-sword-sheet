<template>
  <q-btn-group class="column full-width" vertical rounded flat>
    <q-btn-group :class="`${disadvantage(short(name)) ? 'bg-red text-white' : ''} q-my-xs `"
      v-for="(val, name) in app.char.abilities" :key="name" rounded spread>
      <q-btn :label="short(name)" disable />
      <q-btn :label="val" @click="edit(name)" />
    </q-btn-group>
  </q-btn-group>
</template>

<script setup lang="ts">
import { useQuasar } from "quasar";
import { abilities, AblLong, AblShort } from "./models";

import { useCharacterStore } from "@/stores/character-store";
import { short } from "@/lib/misc";

const app = useCharacterStore();

const disadvantage = (abl: AblShort): boolean => {
  if (app.armour?.penalty.includes(abl)) return true;

  switch (abl) {
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

const $q = useQuasar();
const edit = (name: AblLong) =>
  $q.dialog({
    title: `Edit ${name}`,
    cancel: true,
    ok: true,
    prompt: {
      label: "Value",
      model: `${app.char.abilities[name]}`,
      type: "number",
      min: 0,
      max: 10,
    },
  }).onOk((v) => app.char.abilities[name] = v);
</script>
