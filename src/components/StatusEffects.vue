<template>
  <div class="column q-px-sm">
    <q-btn class="q-my-xs" v-for="(val, name) in store.char.statuses"
      :key="name" :color="val ? StatusIcon[name].colour : 'grey'"
      :icon-right="StatusIcon[name].icon" :label="name" size="md" rounded
      @click="store.char.statuses[name] = !store.char.statuses[name]" no-caps>
      <span v-if="val"> {{ statuses[name] }}</span>
    </q-btn>
  </div>
</template>

<script setup lang="ts">
import { statuses, StatusIcon } from "./models";

import { useCharacterStore } from "@/stores/character-store";

const store = useCharacterStore();
</script>

<style lang="css" scoped>
.outline {
  border-radius: 10px;
  padding: 5px;
  margin-top: 5px;
}
</style>
