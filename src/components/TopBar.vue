<template>
  <div class="row q-mb-sm q-px-sm full-width justify-between">
    <attributes />
  </div>
  <div class="row q-mb-sm q-px-sm full-width justify-between">
    <q-btn-group class="bg-grey-3 text-black" rounded outline>
      <q-btn :label="app.char.hearts.max" @click="editValue('hearts', 'max')" />
      <q-separator vertical />
      <q-btn disable>
        <svg-icon colour-empty="grey" colour-filled="red"
          :path="mdiHeart"
          :fill-pc="app.char.hearts.cur / app.char.hearts.max" />
      </q-btn>
      <q-separator vertical />
      <q-btn :label="app.char.hearts.cur" @click="editValue('hearts', 'cur')" />
    </q-btn-group>

    <q-btn-group class="bg-grey-3 text-black" rounded outline>
      <q-btn disable>
        <svg-icon :path="mdiShield" />
      </q-btn>
      <q-separator vertical />
      <q-btn disable>{{ armour != 0 ? armour.value : 0 }}</q-btn>
    </q-btn-group>

    <q-btn-group class="bg-grey-3 text-black" rounded outline>
      <q-btn :label="app.char.stamina.max" @click="editValue('stamina', 'max')" />
      <q-separator vertical />
      <q-btn disable>
        <svg-icon colour-empty="grey" colour-filled="blue"
          :path="mdiRhombus"
          :fill-pc="app.char.stamina.cur / app.char.stamina.max" />
      </q-btn>
      <q-separator vertical />

      <q-btn :label="app.char.stamina.cur" @click="editValue('stamina', 'cur')" />
    </q-btn-group>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { Armour } from "./models.js";
import { mdiHeart, mdiRhombus, mdiShield } from "@mdi/js";

import { useQuasar } from "quasar";
import { useCharacterStore } from "@/stores/character-store";

import SvgIcon from "./SvgIcon.vue";
import Attributes from "./Attributes.vue";

const app = useCharacterStore();

const armour = computed(() =>
  app.char.inventory.filter((i) => i.class == "armour").find((i) => (i as Armour).equipped) as
    | Armour
    | undefined ?? 0
);

const $q = useQuasar();
const editValue = (v: "hearts" | "stamina", m: "max" | "cur") =>
  $q.dialog({
    title: `Edit ${m == "cur" ? "current" : m} ${v}`,
    cancel: true,
    ok: true,
    prompt: {
      label: `${v}`,
      model: `${app.char[v][m]}`,
      type: "number",
      max: m == "cur" ? app.char[v].max : 100,
      min: 0,
    },
  }).onOk((val) => app.char[v][m] = val);
</script>
