<template>
  <div class="column">
    <div class="row justify-end q-mb-sm">
      <q-btn class="col-shrink" v-if="edit" icon="add_circle" flat dense rounded
        @click="addAbility" />
      <q-toggle class="col-shrink" v-model="edit" icon="edit" dense />
    </div>
    <class-ability v-for="(_, key) in store.char.feats" v-model="store.char.feats[key]!"
      :key="`abl-${key}`" :edit="edit" @delete="removeAbility(key)" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { useQuasar } from "quasar";
import { useCharacterStore } from "@/stores/character-store";

import ClassAbility from "./ClassAbility.vue";
import { create } from "@/lib/create.js";

const store = useCharacterStore();
const edit = ref(false);

const $q = useQuasar();
const addAbility = () =>
  $q.dialog({
    title: "New Feat or Spell",
    ok: true,
    cancel: true,
    options: {
      items: ["feat", "spell"].map((i) => ({ label: i, value: i })),
      type: "radio",
      model: "feat",
    },
  }).onOk((v) => store.char.feats.push(v == "feat" ? create.feat() : create.spell()));
const removeAbility = (index: number) =>
  $q.dialog({
    title: `Remove ${store.char.feats[index]?.name}?`,
    ok: true,
    cancel: true,
  }).onOk(() => store.char.feats.splice(index, 1));
</script>
