<template>
  <router-view v-if="ready" />
</template>

<script setup lang="ts">
import { onBeforeMount, ref, watch } from "vue";
import { useCharacterStore } from "./stores/character-store";
import { useQuasar } from "quasar";

const ready = ref(false);

const $q = useQuasar();
const app = useCharacterStore();

onBeforeMount(() => {
  $q.dark.set(app.config.dark);

  if (app.characters.length == 0) {
    app.newChar();
  }
  ready.value = true;
});

watch(
  () => app.config.dark,
  () => $q.dark.set(app.config.dark),
);
</script>
