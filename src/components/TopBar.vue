<template>
  <div class="row q-mb-sm full-width justify-between">
    <attributes />
  </div>
  <div class="row q-mb-sm q-px-xs full-width justify-between">
    <q-btn-group class="col bg-grey-3 text-black" rounded outline spread>
      <q-btn @click="editValue('hearts', 'max')">
        <svg-icon colour-empty="pink" colour-filled="red"
          :path="mdiHeart"
          :fill-pc="app.char.hearts.cur / app.char.hearts.max" />
        <q-tooltip>Set Max Hearts</q-tooltip>
      </q-btn>
      <q-separator vertical />
      <q-btn :label="app.char.hearts.cur" @click="editValue('hearts', 'cur')" />
    </q-btn-group>

    <q-btn-group class="col bg-grey-3 text-black q-mx-sm" rounded outline spread>
      <q-btn disable>
        <svg-icon :path="mdiShield" />
      </q-btn>
      <q-separator vertical />
      <q-btn disable>{{ app.armour?.value ?? 0 }}</q-btn>
    </q-btn-group>

    <q-btn-group class="col bg-grey-3 text-black" rounded outline spread>
      <q-btn @click="editValue('stamina', 'max')">
        <svg-icon colour-empty="lightblue" colour-filled="blue"
          :path="mdiRhombus"
          :fill-pc="app.char.stamina.cur / app.char.stamina.max" />
        <q-tooltip>Set Max Stamina</q-tooltip>
      </q-btn>
      <q-separator vertical />
      <q-btn :label="app.char.stamina.cur" @click="editValue('stamina', 'cur')" />
    </q-btn-group>
  </div>
</template>

<script setup lang="ts">
import { mdiHeart, mdiRhombus, mdiShield } from "@mdi/js";

import { useQuasar } from "quasar";
import { useCharacterStore } from "@/stores/character-store";

import SvgIcon from "./SvgIcon.vue";
import Attributes from "./Attributes.vue";

const app = useCharacterStore();

const $q = useQuasar();
const editValue = (v: "hearts" | "stamina", m: "max" | "cur") =>
  $q.dialog({
    title: `${m == "cur" ? "current" : m} ${v}`.toUpperCase(),

    cancel: true,
    prompt: {
      label: `${v}`,
      model: `${app.char[v][m]}`,
      type: "number",
      max: m == "cur" ? app.char[v].max : 100,
      min: 0,
    },
  }).onOk((val) => app.char[v][m] = val);
</script>
