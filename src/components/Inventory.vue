<template>
  <div class="column">
    <div class="row items-center q-mb-sm">
      <span class="col-grow text-bold">
        Backpack {{ encTotal }}/{{ app.char.abilities.Strength * 2 }}
        | equipped {{ app.char.inventory.filter((i) => i.class == "weapon" && i.equipped).length }} Weapon(s)
        | {{ app.char.inventory.filter((i) => i.class == "armour" && i.equipped).length }} Armour
      </span>
      <q-btn class="col-shrink" icon="add_circle" v-if="edit" @click="addItem" rounded dense flat />
      <q-toggle class="col-shrink" v-model="edit" icon="edit" dense />
    </div>

    <q-btn-toggle class="row q-mb-sm" v-model="filter" :options="[
       {label: 'All', value: 'all'},
       {label: 'Weapons', value: 'weapon'},
       {label: 'Armour', value: 'armour'}
    ]" flat rounded spread dense />
    <div v-for="(i, v) in app.char.inventory" :key="i.id">
      <item v-if="(filter == i.class) || filter == 'all'" v-model="app.char.inventory[v]!"
        :edit="edit" @delete="removeItem(v)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

import { itemClasses } from "./models";
import { create } from "@/lib/create";

import { useQuasar } from "quasar";
import { useCharacterStore } from "@/stores/character-store";

import Item from "./Item.vue";

const app = useCharacterStore();
const edit = ref(false);
const filter = ref("all");

const encTotal = computed((): number => {
  let total = 0;
  for (let i of app.char.inventory) {
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
  }).onOk((v) => app.char.inventory.push(create.item(v)));

const removeItem = (index: number) =>
  $q.dialog({
    title: `Delete ${app.char.inventory[index]?.name}?`,
    ok: true,
    cancel: true,
  }).onOk(() => app.char.inventory.splice(index, 1));
</script>
