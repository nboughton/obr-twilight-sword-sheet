<template>
  <q-expansion-item class="column q-mb-sm q-mx-sm rounded-borders"
    :default-opened="app.char.bio.kin.length == 0" header-class="text-h6 q-px-none"
    :label="`${app.char.bio.name} (${app.char.bio.kin}, ${app.char.bio.way})`">
    <div class="row q-px-sm">
      <q-input class="col-6" label="Name" v-model="app.char.bio.name" dense />
      <q-input class="col" label="Kin" v-model="app.char.bio.kin" dense />
      <q-input class="col-2" label="Hope" type="number" v-model.number="app.char.hope" dense />
    </div>
    <div class="row q-px-sm">
      <q-input class="col" label="Origin" v-model="app.char.bio.origin" dense borderless />
      <q-input class="col" label="Way" v-model="app.char.bio.way" dense borderless />
    </div>
  </q-expansion-item>
</template>

<script setup lang="ts">
import { useCharacterStore } from "@/stores/character-store";

const app = useCharacterStore();
</script>
