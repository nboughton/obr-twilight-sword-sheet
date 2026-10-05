<template>
  <div class="column">
    <q-input label="Name" v-model="store.char.bio.name" dense />
    <q-input label="Kin" v-model="store.char.bio.kin" dense />
    <q-input label="Origin" v-model="store.char.bio.origin" dense />
    <q-input label="Way" v-model="store.char.bio.way" dense />
  </div>
</template>

<script setup lang="ts">
import { useCharacterStore } from "@/stores/character-store";

const store = useCharacterStore();
</script>
