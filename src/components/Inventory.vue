<template>
  <div class="column">
    <div class="row items-center q-mb-sm">
      <span class="col-grow text-bold">
        Encumberence {{ encTotal }}/{{ store.char.abilities.Strength * 2 }}
      </span>
      <q-btn class="col-shrink" icon="add_circle" v-if="edit" @click="addItem" rounded dense flat />
      <q-toggle class="col-shrink" v-model="edit" icon="edit" dense />
    </div>

    <item v-for="(i, v) in store.char.inventory" :key="i.id" v-model="store.char.inventory[v]!"
      :edit="edit" @delete="removeItem(v)" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

import { itemClasses } from "./models";
import { create } from "@/lib/create.js";

import { useQuasar } from "quasar";
import { useCharacterStore } from "@/stores/character-store";

import Item from "./Item.vue";

const store = useCharacterStore();
const edit = ref(false);

const encTotal = computed((): number => {
  let total = 0;
  for (let i of store.char.inventory) {
    if (i.class == "item") total += i.slot;
    else if ((i.class == "weapon" || i.class == "armour") && !i.equipped) total += i.slot;
  }
  return total;
});

const $q = useQuasar();
const addItem = () =>
  $q.dialog({
    title: "New Item Type",
    ok: true,
    cancel: true,
    options: {
      items: Object.keys(itemClasses).map((v) => ({ label: v, value: v })),
      type: "radio",
      model: "item",
    },
  }).onOk((v) => store.char.inventory.push(create.item(v)));

const removeItem = (index: number) =>
  $q.dialog({
    title: `Delete ${store.char.inventory[index]?.name}?`,
    ok: true,
    cancel: true,
  }).onOk(() => store.char.inventory.splice(index, 1));
</script>
