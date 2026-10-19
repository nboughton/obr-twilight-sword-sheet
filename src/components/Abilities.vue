<template>
  <q-btn-group class="column full-width" vertical rounded flat>
    <q-btn-group :class="`${disadvantage(short(name)) ? 'bg-red text-white' : ''} q-my-xs `"
      v-for="(val, name) in store.char.abilities" :key="name" rounded spread>
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

const store = useCharacterStore();

const disadvantage = (abl: AblShort): boolean => {
  if (store.armour?.penalty.includes(abl)) return true;

  switch (abl) {
    case "STR":
      if (store.char.statuses.WOUND) return true;
      break;
    case "AGL":
      if (store.char.statuses.WOUND) return true;
      break;
    case "PER":
      if (store.char.statuses.BLIND) return true;
      break;
    case "WIL":
      if (store.char.statuses.FEAR) return true;
      break;
    case "KNO":
      if (store.char.statuses.CONFUSION) return true;
      break;
    case "CHA":
      if (store.char.statuses.FEAR) return true;
      break;
    case "STE":
      if (store.char.statuses.CONFUSION) return true;
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
      model: `${store.char.abilities[name]}`,
      type: "number",
      min: 0,
      max: 10,
    },
  }).onOk((v) => store.char.abilities[name] = v);
</script>
