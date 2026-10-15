<template>
  <div class="column">
    <div class="row items-center">
      <span class="col-grow">Inventory</span>
      <q-btn class="col-shrink" icon="add" v-if="edit" @click="addItem" />
      <q-toggle class="col-shrink" v-model="edit" />
    </div>

    <item v-for="(i, v) in store.char.inventory" :key="i.id" v-model="store.char.inventory[v]!"
      :edit="edit" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { itemClasses } from "./models";
import { create } from "@/lib/create.js";

import { useQuasar } from "quasar";
import { useCharacterStore } from "@/stores/character-store";

import Item from "./Item.vue";

const store = useCharacterStore();
const edit = ref(false);

const $q = useQuasar();
const addItem = () =>
  $q.dialog({
    title: "New Item Type",
    ok: true,
    cancel: true,
    options: {
      items: [Object.keys(itemClasses)],
      type: "radio",
      model: "item",
    },
  }).onOk((v) => store.char.inventory.push(create.item(v)));
</script>
