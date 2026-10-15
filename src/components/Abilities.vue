<template>
  <div class="column q-px-sm">
    <q-btn-group class="q-my-xs shadow-1" v-for="(val, name) in store.char.abilities" :key="name"
      rounded
      spread>
      <q-btn :label="name" disable />
      <q-btn :label="val" @click="edit(name)" />
    </q-btn-group>
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from "quasar";
import { abilities, AblLong, AblShort } from "./models";

import { useCharacterStore } from "@/stores/character-store";

const store = useCharacterStore();
const short = (v: AblLong): AblShort => {
  for (let key of Object.keys(abilities) as (keyof typeof abilities)[]) {
    if (abilities[key] == v) return key;
  }
  return "STR";
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
