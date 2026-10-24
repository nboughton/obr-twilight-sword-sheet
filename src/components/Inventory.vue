<template>
  <div class="column">
    <div class="row items-center justify-between q-mb-sm">
      <q-btn class="col-3" icon="mdi-hexagon-slice-6" color="green" :label="app.char.zin.green"
        rounded outline @click="editZin('green')" />
      <q-btn class="col-3" icon="mdi-hexagon-slice-6" color="blue" :label="app.char.zin.blue"
        rounded outline @click="editZin('blue')" />
      <q-btn class="col-3" icon="mdi-hexagon-slice-6" color="red" :label="app.char.zin.red"
        rounded outline @click="editZin('red')" />
    </div>
    <div class="row items-center q-mb-sm">
      <div class="col text-bold">
        <div class="row">
          Backpack {{ encTotal }}/{{ (app.char.attributes.Strength * 2) + +app.char.invMod }}
        </div>
        <div class="row">
          Equipped {{ equippedItems }}/3
          | {{ app.char.inventory.filter((i) => i.class == "armour" && i.equipped).length }}/1 Armour
        </div>
      </div>
      <q-btn class="col-shrink q-mr-xs" icon="mdi-cog" v-if="edit" @click="invConf" rounded dense
        flat />
      <q-btn class="col-shrink q-mr-xs" icon="add_circle" v-if="edit" @click="addItem" rounded dense
        flat />
      <q-toggle class="col-shrink" v-model="edit" icon="edit" />
    </div>

    <q-btn-toggle class="row q-mb-sm" v-model="filter" :options="[
       {label: 'All', value: 'all'},
       {label: 'Items', value: 'item'},
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
  let t = 0;
  app.char.inventory.filter((i) => !i.equipped).forEach((i) => t += i.slot);
  return t;
});

const equippedItems = computed((): number => {
  let total = 0;
  let small = 0;
  let heavy = 0;
  for (let item of app.char.inventory.filter((i) => i.class != "armour" && i.equipped)) {
    if (item.class == "weapon") {
      if (item.tags.includes("SMALL")) small++;
      else if (item.tags.includes("HEAVY")) heavy++;
      else total++;
    } else total++;
  }

  total += Math.floor(small / 2) + small % 2;
  total += heavy * 2;
  return total;
});

const $q = useQuasar();
const addItem = () =>
  $q.dialog({
    title: "New Item Type".toUpperCase(),
    cancel: true,
    options: {
      items: Object.keys(itemClasses).map((v) => ({ label: v, value: v })),
      type: "radio",
      model: "item",
    },
  }).onOk((v) => app.char.inventory.unshift(create.item(v)));

const removeItem = (index: number) =>
  $q.dialog({
    title: `Delete ${app.char.inventory[index]?.name}?`.toUpperCase(),
    cancel: true,
  }).onOk(() => app.char.inventory.splice(index, 1));

const invConf = () =>
  $q.dialog({
    title: "Extra Slots".toUpperCase(),
    cancel: true,
    prompt: {
      model: `${app.char.invMod}`,
      type: "number",
    },
  }).onOk((v) => app.char.invMod = +v);

const editZin = (colour: "green" | "blue" | "red") =>
  $q.dialog({
    title: `${colour} zin`.toUpperCase(),
    cancel: true,
    prompt: {
      type: "number",
      model: `${app.char.zin[colour]}`,
    },
  }).onOk((v) => app.char.zin[colour] = +v);
</script>
