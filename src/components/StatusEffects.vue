<template>
  <q-btn-group class="column full-width" vertical rounded flat>
    <q-btn class="row text-black" v-for="(val, name) in store.char.statuses"
      :key="name" :color="val ? StatusIcon[name].colour : 'grey-3'"
      :label="name" size="md" rounded
      @click="store.char.statuses[name] = !store.char.statuses[name]" />
  </q-btn-group>
</template>

<script setup lang="ts">
import { StatusIcon } from "./models";

import { useCharacterStore } from "@/stores/character-store";

const store = useCharacterStore();
</script>
