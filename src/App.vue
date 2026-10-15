<template>
  <router-view v-if="ready" />
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { useCharacterStore } from "./stores/character-store";

const ready = ref(false);

const store = useCharacterStore();
onBeforeMount(() => {
  if (store.characters.length == 0) {
    store.newChar();
  }
  ready.value = true;
});
</script>
