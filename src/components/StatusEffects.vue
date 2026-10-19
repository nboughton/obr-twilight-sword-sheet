<template>
  <q-btn-group class="column full-width" vertical rounded flat>
    <q-btn class="row text-black" v-for="(val, name) in app.char.statuses"
      :key="name" :color="val ? StatusIcon[name].colour : 'grey-3'"
      :label="name" size="md" rounded
      @click="app.char.statuses[name] = !app.char.statuses[name]" />
  </q-btn-group>
</template>

<script setup lang="ts">
import { StatusIcon } from "./models";

import { useCharacterStore } from "@/stores/character-store";

const app = useCharacterStore();
</script>
