<template>
  <q-expansion-item class="column q-mb-sm q-mx-sm rounded-borders"
    :default-opened="store.char.bio.name.length == 0" header-class="text-h6 q-px-none"
    :label="`${store.char.bio.name} (${store.char.bio.kin}, ${store.char.bio.way})`">
    <div class="row q-px-sm">
      <q-input class="col" label="Name" v-model="store.char.bio.name" dense />
      <q-input class="col" label="Kin" v-model="store.char.bio.kin" dense />
    </div>
    <div class="row q-px-sm">
      <q-input class="col" label="Origin" v-model="store.char.bio.origin" dense borderless />
      <q-input class="col" label="Way" v-model="store.char.bio.way" dense borderless />
    </div>
  </q-expansion-item>
</template>

<script setup lang="ts">
import { useCharacterStore } from "@/stores/character-store";

const store = useCharacterStore();
</script>
