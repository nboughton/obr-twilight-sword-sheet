<template>
  <div class="column q-mb-sm">
    <div class="row">
      <q-input class="col" label="Name" v-model="store.char.bio.name" dense />
      <q-input class="col" label="Kin" v-model="store.char.bio.kin" dense />
    </div>
    <div class="row">
      <q-input class="col" label="Origin" v-model="store.char.bio.origin" dense />
      <q-input class="col" label="Way" v-model="store.char.bio.way" dense />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCharacterStore } from "@/stores/character-store";

const store = useCharacterStore();
</script>
