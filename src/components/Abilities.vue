<template>
  <div class="column">
    <div class="row items-center justify-between q-mb-sm">
      <span class="col" v-if="app.char.feats.length == 0">
        Toggle Edit mode to get started <q-icon name="arrow_right" size="sm"/>
      </span>
      <q-btn-toggle v-else class="col" v-model="filter" :options="[
        { label: 'All', value: 'all' },
        { label: 'Feats', value: 'feat' },
        { label: 'Spells', value: 'spell'}
      ]" flat rounded spread dense />
      <q-btn class="col-shrink" v-if="edit" icon="add_circle" flat dense rounded
        @click="addAbility" />
      <q-toggle class="col-shrink" v-model="edit" icon="edit" />
    </div>

    <div v-for="(feat, key) in app.char.feats" :key="`abl-${key}`">
      <class-ability v-if="(filter == feat.type) || filter == 'all'" v-model="app.char.feats[key]!"
        :edit="edit" @delete="removeAbility(key)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { useQuasar } from "quasar";
import { useCharacterStore } from "@/stores/character-store";

import ClassAbility from "./ClassAbility.vue";
import { create } from "@/lib/create.js";

const app = useCharacterStore();
const edit = ref(false);
const filter = ref("all");

const $q = useQuasar();
const addAbility = () =>
  $q.dialog({
    title: "New Feat or Spell",
    cancel: true,

    options: {
      items: ["feat", "spell"].map((i) => ({ label: i, value: i })),
      type: "radio",
      model: "feat",
    },
  }).onOk((v) => app.char.feats.push(v == "feat" ? create.feat() : create.spell()));
const removeAbility = (index: number) =>
  $q.dialog({
    title: `Remove ${app.char.feats[index]?.name}?`,
    cancel: true,
  }).onOk(() => app.char.feats.splice(index, 1));
</script>
